# 🌌 SkillMint

**SkillMint** is a premium, decentralized Web3 application that allows users to mint proof-of-skill achievements as elegant, customizable NFTs on the **Base Sepolia** network. Features gasless minting powered by UGF (Unified Gas Relayer), Supabase-backed XP Leaderboards, and high-fidelity 3D card physics.

---

## 🎨 Interactive Experience & Highlights

- **Dynamic NFT Customization Studio**: Real-time customization of skill title, recipient name, badge level, theme colors (Cyan, Emerald, Violet, Rose, Amber), and rarity (Common, Rare, Epic, Legendary).
- **Gasless Minting (UGF Sponsored)**: Meta-transactions allow users to claim their NFT badges with **zero ETH required**. Gas fees are invisibly sponsored.
- **Base Sepolia Settlement**: Immediate minting and real-time transaction tracking on Base Sepolia testnet, with live links to BaseScan.
- **Proof of Skill Certificates**: Instant generation of shareable digital completion certificates alongside the NFT badge.
- **Supabase gamified XP system**: Users earn XP based on badge rarities, climb the global leaderboard, and showcase achievements on public profile routes (`/u/username`).
- **State-of-the-Art UI**: Built with modern glassmorphism aesthetics, responsive layouts, 3D card tilt effects, particle systems, dynamic grids, and smooth framer-motion micro-interactions.

---

## 🛠 Tech Stack

### Frontend & Routing
- **Framework**: [TanStack Start](https://tanstack.com/router/v1) (React 19 & Vite 7)
- **Styling & Motion**: Tailwind CSS v4, Framer Motion, Tailwind Animate
- **Components**: Radix UI Primitives, Lucide React (Icons), Recharts, Sonner
- **Web3 Integration**: Ethers.js v6 (MetaMask/Browser wallet integration)

### Smart Contracts & Blockchain
- **Network**: [Base Sepolia Testnet](https://sepolia.basescan.org)
- **Language**: Solidity `^0.8.20`
- **Standard**: ERC-721 URI Storage (compatible with OpenZeppelin v5)

### Backend & Database
- **Hosting**: Cloudflare Workers / Wrangler
- **Database / Auth**: Supabase (Leaderboards, XP profiles) & Clerk Authentication

---

## 🛡 Smart Contract

The core contract is located at `contracts/SkillMintBadge.sol`. It is built utilizing OpenZeppelin's standard libraries to support standard NFT interfaces and metadata storage.

- **Contract Type**: `ERC721URIStorage`, `Ownable`
- **Solidity Version**: `^0.8.20`
- **Key Functions**:
  - `mintBadge(address to, string memory tokenURI)`: Allows direct minting of proof-of-skill badges containing JSON metadata strings (stored as Base64 data URIs).

---

## 📂 Directory Structure

```text
├── contracts/
│   └── SkillMintBadge.sol           # Solidity ERC721 Smart Contract
├── src/
│   ├── components/
│   │   ├── layout/                  # Page layouts (Navbar, Footer, Sidebar)
│   │   ├── skillmint/               # Core feature components (Studio, NftCard, Wallet, etc.)
│   │   └── ui/                      # Reusable design system UI elements (shadcn/radix)
│   ├── hooks/                       # Custom react hooks (wallet connection, etc.)
│   ├── lib/
│   │   ├── blockchain.ts            # Ethers v6 Base Sepolia service & ABI definitions
│   │   └── db.ts                    # Supabase backend integrations & client
│   ├── routes/                      # TanStack File-Based Routing System
│   │   ├── explore.tsx              # Public NFT gallery explore route
│   │   ├── leaderboard.tsx          # Supabase Leaderboard route
│   │   ├── studio.tsx               # Interactive Minting Studio route
│   │   ├── u.$username.tsx          # Public profiles
│   │   └── index.tsx                # Hero / Marketing landing page
│   ├── main.tsx
│   ├── server.ts                    # Cloudflare Entrypoint for TanStack Start SSR
│   ├── styles.css                   # Global styling sheet & modern custom variables
│   └── tsconfig.json                # TypeScript compilation config
├── wrangler.jsonc                   # Cloudflare Wrangler Configuration
└── package.json                     # Node environment packages & build scripts
```

---

## 🔧 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites
Make sure you have Node.js (v18+) and `npm` or `bun` installed on your machine.

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/atharvachare/SkillMint.git
cd SkillMint
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory and copy the contents from `.env.example`:
```env
# Clerk Auth
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key

# Smart Contract Address on Base Sepolia
VITE_NFT_CONTRACT_ADDRESS=0x8F51CB0a8b7AeA5E20B21B9487701dAc57e2efb8

# Optional: Supabase configuration for Leaderboards & XP (falls back to local mockup if empty)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Run Development Server
Fix local binary executable permissions if needed:
```bash
chmod +x node_modules/.bin/vite
```

Start the TanStack Start development server:
```bash
npm run dev
```
Open **`http://localhost:8080`** in your browser to inspect the application.

---

## ⚡ Deployment & Hosting

### Deploying the Smart Contract
You can deploy `SkillMintBadge.sol` using Remix, Hardhat, or Foundry:
1. Compile the contract using Solidity compiler `0.8.20+`.
2. Deploy to **Base Sepolia Testnet** (`84532`).
3. Update `VITE_NFT_CONTRACT_ADDRESS` in your `.env` file.

### Deploying to Cloudflare
The project is pre-configured for Cloudflare Workers/Pages deployment:
```bash
npm run build
npx wrangler deploy
```

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
