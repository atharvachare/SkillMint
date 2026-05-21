import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useState, useMemo } from "react";
import { WalletSection } from "@/components/skillmint/WalletSection";
import { BadgeSelector, BADGES } from "@/components/skillmint/BadgeSelector";
import { Personalize } from "@/components/skillmint/Personalize";
import { GaslessMint } from "@/components/skillmint/GaslessMint";
import { blockchainService } from "@/lib/blockchain";
import { useAuthUser } from "@/lib/auth";
import { motion } from "framer-motion";
import { useEffect } from "react";

export const Route = createFileRoute("/studio")({
  component: Studio,
});

function Studio() {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [selected, setSelected] = useState("bc");
  const [name, setName] = useState("Creator Name");
  const [title, setTitle] = useState(BADGES[1].title);
  const [level, setLevel] = useState("Expert");
  const [description, setDescription] = useState("");

  const { user } = useAuthUser();
  const badge = useMemo(() => BADGES.find((b) => b.id === selected) ?? BADGES[0], [selected]);

  useEffect(() => {
    // Force form fields to reset to defaults for new user sessions
    setSelected("bc");
    setName("");
    setTitle(BADGES[1].title);
    setLevel("Expert");
    setDescription("");
  }, [user?.id]);

  useEffect(() => {
    const handleDisconnect = () => {
      setAddress(null);
      localStorage.removeItem("wallet_connected_user_id");
    };
    window.addEventListener("disconnect_wallet", handleDisconnect);
    
    // Check if already connected for THIS specific user
    blockchainService.checkConnection(user?.id).then((addr) => {
      if (addr) setAddress(addr);
      else setAddress(null); // Clear address if different user
    });

    return () => window.removeEventListener("disconnect_wallet", handleDisconnect);
  }, [user?.id]);

  const connect = async () => {
    if (address) { 
      localStorage.setItem("wallet_disconnected_manually", "true");
      localStorage.removeItem("wallet_connected_user_id");
      window.dispatchEvent(new Event("disconnect_wallet"));
      setAddress(null); 
      return; 
    }
    
    if (isConnecting) return;
    setIsConnecting(true);
    
    try {
      const connectedAddress = await blockchainService.connectWallet(user?.id);
      setAddress(connectedAddress);
    } catch (err: any) {
      console.error(err);
      if (err.code === -32002) {
        alert("MetaMask connection request is already pending. Please open the MetaMask extension manually to approve or reject.");
      } else {
        alert(err.message || "Failed to connect wallet");
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const onSelectBadge = (id: string) => {
    setSelected(id);
    const b = BADGES.find((x) => x.id === id);
    if (b) setTitle(b.title);
  };

  const onMinted = (tx: string, tokenId: string) => {
    console.log("Minted!", tx, tokenId);
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto pb-16 md:pb-24">
        <header className="mb-6 md:mb-10 text-center pt-4 md:pt-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-display font-bold text-white mb-2 md:mb-4 px-2"
          >
            Badge <span className="text-gradient">Studio</span>
          </motion.h1>
          <p className="text-white/60 text-sm md:text-base max-w-xl mx-auto px-4">Customize your NFT achievement badge and mint it entirely gas-free on Base Sepolia.</p>
        </header>

        <div className="space-y-6 md:space-y-8">
          <div className="[&>section]:!py-0">
            <WalletSection address={address} onConnect={connect} isConnecting={isConnecting} />
          </div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-strong rounded-3xl p-6 md:p-10 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-8">1. Select Template</h2>
            <div className="[&>section]:!py-0">
              <BadgeSelector selected={selected} onSelect={onSelectBadge} />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-strong rounded-3xl p-5 md:p-10 border border-white/10">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-6 md:mb-8">2. Personalize</h2>
            <div className="[&>section]:!py-0">
              <Personalize
                name={name}
                title={title}
                level={level}
                description={description}
                setName={setName}
                setTitle={setTitle}
                setLevel={setLevel}
                setDescription={setDescription}
                badge={badge}
              />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-strong rounded-3xl border border-white/10 overflow-hidden relative">
             <div className="[&>section]:!py-8 md:[&>section]:!py-12">
               <GaslessMint
                  theme={badge.theme}
                  title={title}
                  name={name}
                  level={level}
                  description={description}
                  icon={badge.icon}
                  rarity={badge.rarity}
                  onMinted={onMinted}
                  address={address}
               />
             </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
