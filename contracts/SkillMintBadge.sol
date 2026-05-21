// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SkillMintBadge is ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    // We pass initialOwner to the Ownable constructor to comply with OpenZeppelin v5
    constructor(address initialOwner) ERC721("SkillMint Badge", "SKILL") Ownable(initialOwner) {}

    /**
     * @dev Mints a new badge to the specified address with the given metadata URI.
     * @param to The address to mint the badge to.
     * @param tokenURI The metadata URI (e.g., IPFS link or base64 JSON).
     * @return The ID of the newly minted token.
     */
    function mintBadge(address to, string memory tokenURI) public returns (uint256) {
        // In a production environment with a relayer, you might restrict this 
        // to only be callable by the relayer address or owner. 
        // For the hackathon/demo, we allow public minting so the frontend can call it directly.
        uint256 tokenId = _nextTokenId++;
        _mint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        
        return tokenId;
    }
}
