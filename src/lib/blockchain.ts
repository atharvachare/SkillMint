import { BrowserProvider, Contract, type Eip1193Provider } from "ethers";

// Base Sepolia Network configuration
export const BASE_SEPOLIA_CHAIN_ID = 84532; // 0x14a34

// Replace with the actual deployed contract address on Base Sepolia
export const NFT_CONTRACT_ADDRESS = import.meta.env.VITE_NFT_CONTRACT_ADDRESS || ""; 

// Minimal ERC721 ABI for minting
export const NFT_ABI = [
  "function mintBadge(address to, string memory tokenURI) public returns (uint256)",
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)"
];

declare global {
  interface Window {
    ethereum?: Eip1193Provider;
  }
}

export class BlockchainService {
  private provider: BrowserProvider | null = null;

  async checkConnection(currentUserId?: string): Promise<string | null> {
    if (!window.ethereum) return null;

    // NEVER auto-reconnect if the user explicitly disconnected
    if (localStorage.getItem("wallet_disconnected_manually") === "true") {
      return null;
    }

    const expectedUserId = currentUserId || "anonymous";
    const storedUserId = localStorage.getItem("wallet_connected_user_id");
    
    if (storedUserId !== expectedUserId) {
      // Different user logged in, or no user connected previously.
      // Do NOT auto-connect.
      return null;
    }

    this.provider = new BrowserProvider(window.ethereum);
    try {
      const accounts = await this.provider.send("eth_accounts", []);
      if (accounts && accounts.length > 0) {
        await this.checkAndSwitchNetwork();
        return accounts[0];
      }
    } catch (e) {
      console.warn("Failed to check wallet connection", e);
    }
    return null;
  }

  async connectWallet(currentUserId?: string): Promise<string> {
    if (!window.ethereum) {
      throw new Error("MetaMask is not installed. Please install it to continue.");
    }
    
    // Clear manual disconnect flag since user explicitly clicked Connect
    localStorage.removeItem("wallet_disconnected_manually");
    
    const expectedUserId = currentUserId || "anonymous";
    localStorage.setItem("wallet_connected_user_id", expectedUserId);

    // Request accounts natively first to ensure MetaMask popup triggers reliably
    const accounts = (await window.ethereum.request({ method: "eth_requestAccounts" })) as string[];
    if (!accounts || accounts.length === 0) {
      throw new Error("No accounts found");
    }

    this.provider = new BrowserProvider(window.ethereum);
    
    // Check network
    await this.checkAndSwitchNetwork();

    return accounts[0];
  }

  async checkAndSwitchNetwork() {
    if (!this.provider) return;
    
    const network = await this.provider.getNetwork();
    if (Number(network.chainId) !== BASE_SEPOLIA_CHAIN_ID) {
      try {
        await this.provider.send("wallet_switchEthereumChain", [
          { chainId: "0x14a34" } // 84532 in hex
        ]);
      } catch (error: any) {
        // In ethers v6, the underlying JSON-RPC error is often wrapped
        const errorCode = error.info?.error?.code || error.error?.code || error.code;
        
        // This error code indicates that the chain has not been added to MetaMask
        if (errorCode === 4902) {
          await this.provider.send("wallet_addEthereumChain", [
            {
              chainId: "0x14a34",
              chainName: "Base Sepolia",
              rpcUrls: ["https://sepolia.base.org"],
              nativeCurrency: {
                name: "Ethereum",
                symbol: "ETH",
                decimals: 18
              },
              blockExplorerUrls: ["https://sepolia.basescan.org"]
            }
          ]);
        } else {
          throw error;
        }
      }
    }
  }

  // Prepares the metadata for the NFT
  generateMetadataURI(name: string, title: string, level: string, themeAccent: string, description?: string): any {
    const metadata = {
      name: `${title} Badge - ${name}`,
      description: description || `Achievement badge for ${name} - ${level} level.`,
      attributes: [
        { trait_type: "User", value: name },
        { trait_type: "Badge", value: title },
        { trait_type: "Level", value: level },
        { trait_type: "Theme", value: themeAccent }
      ]
    };
    
    return metadata;
  }

  // Uploads metadata to IPFS (or generates base64 fallback)
  async uploadToIPFS(metadata: any): Promise<string> {
    // In a full production environment, you'd post to Pinata here:
    // const pinataJwt = import.meta.env.VITE_PINATA_JWT;
    // ...
    
    // For now, generate a 100% real and on-chain valid base64 data URI
    return `data:application/json;base64,${btoa(JSON.stringify(metadata))}`;
  }

  // Scaffolding for UGF Gasless Relayer
  async relayGaslessTransaction(userAddress: string, tokenURI: string): Promise<{ hash: string, tokenId?: string } | null> {
    const relayerUrl = import.meta.env.VITE_UGF_RELAYER_URL || "";
    
    if (!relayerUrl) {
      console.warn("UGF Relayer URL not configured. Falling back to direct user-paid transaction.");
      return null;
    }

    console.log("Submitting meta-tx to UGF Relayer at:", relayerUrl);
    // 1. Sign meta-transaction message (EIP-712)
    // 2. Send signature + data to relayer backend
    // 3. Relayer broadcasts tx, paying gas
    // return { hash: "0x...", tokenId: "..." }
    return null;
  }

  isContractConfigured(): boolean {
    return !!NFT_CONTRACT_ADDRESS && NFT_CONTRACT_ADDRESS !== "0x0000000000000000000000000000000000000000";
  }

  async mintNFT(userAddress: string, name: string, title: string, level: string, themeAccent: string, description?: string): Promise<{ hash: string, tokenId?: string }> {
    if (!window.ethereum) throw new Error("MetaMask is not installed");
    
    if (!this.provider) {
      this.provider = new BrowserProvider(window.ethereum);
    }

    const signer = await this.provider.getSigner();
    
    // Create contract instance
    const contract = new Contract(NFT_CONTRACT_ADDRESS, NFT_ABI, signer);
    
    const metadata = this.generateMetadataURI(name, title, level, themeAccent, description);
    const tokenURI = await this.uploadToIPFS(metadata);

    // Attempt Gasless Relayer flow first
    const relayedTx = await this.relayGaslessTransaction(userAddress, tokenURI);
    if (relayedTx) return relayedTx;

    if (!NFT_CONTRACT_ADDRESS || NFT_CONTRACT_ADDRESS === "0x0000000000000000000000000000000000000000") {
      throw new Error("Smart contract not configured. Please add VITE_NFT_CONTRACT_ADDRESS to your .env file to enable real minting.");
    }

    const tx = await contract.mintBadge(userAddress, tokenURI);
    
    // Wait for transaction confirmation
    const receipt = await tx.wait();
    
    // Parse logs to extract exact token ID from Transfer event (from address(0) to user)
    let mintedTokenId = "Unknown";
    for (const log of receipt.logs) {
      try {
        const parsedLog = contract.interface.parseLog(log);
        if (parsedLog && parsedLog.name === "Transfer") {
          mintedTokenId = parsedLog.args[2].toString();
          break;
        }
      } catch (e) {
        // Ignore logs that don't match the contract interface
      }
    }

    return {
      hash: tx.hash,
      tokenId: mintedTokenId
    };
  }
}

export const blockchainService = new BlockchainService();
