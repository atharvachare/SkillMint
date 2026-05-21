import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Navbar } from "@/components/skillmint/Navbar";
import { NftCard } from "@/components/skillmint/NftCard";
import { BADGES } from "@/components/skillmint/BadgeSelector";
import { Trophy, ShieldCheck, MapPin } from "lucide-react";
import { Footer } from "@/components/skillmint/Footer";

export const Route = createFileRoute("/u/$username")({
  component: PublicProfile,
});

function PublicProfile() {
  const { username } = Route.useParams();
  
  // Mock data for public profile
  const mintedBadges = [
    { ...BADGES[1], level: "Advanced", tokenId: "4092", rarity: BADGES[1].rarity },
    { ...BADGES[0], level: "Expert", tokenId: "1028", rarity: BADGES[0].rarity },
    { ...BADGES[2], level: "Beginner", tokenId: "9283", rarity: BADGES[2].rarity },
  ];

  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-neon-purple/20 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-neon-cyan/15 blur-[150px] rounded-full pointer-events-none" />
      
      <Navbar onConnect={() => {}} address={null} />

      <main className="max-w-6xl mx-auto px-4 py-24 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong rounded-3xl p-8 md:p-12 border border-white/10 mb-12 flex flex-col md:flex-row gap-8 items-center md:items-start"
        >
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-neon-cyan/50 overflow-hidden shadow-[0_0_30px_oklch(0.85_0.18_195/0.4)] shrink-0 bg-black">
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`} 
              alt={username} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center md:text-left flex-1">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white capitalize">{username}</h1>
              <ShieldCheck className="text-neon-cyan h-8 w-8" />
            </div>
            <p className="text-neon-cyan font-mono text-sm uppercase tracking-widest mb-6">Lvl 12 Creator</p>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <div className="glass px-4 py-2 rounded-xl flex items-center gap-2">
                <Trophy className="text-amber-400 h-4 w-4" />
                <span className="text-white text-sm font-medium">3 Badges Minted</span>
              </div>
              <div className="glass px-4 py-2 rounded-xl flex items-center gap-2">
                <MapPin className="text-white/50 h-4 w-4" />
                <span className="text-white/80 text-sm font-medium">San Francisco</span>
              </div>
              <div className="glass px-4 py-2 rounded-xl flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
                <span className="text-white/80 text-sm font-mono truncate max-w-[120px]">0x71C...9B23</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-display font-bold text-white mb-8">Showcase</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {mintedBadges.map((badge, i) => (
              <motion.div
                key={badge.tokenId}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + (i * 0.1) }}
                className="flex justify-center"
              >
                <div className="transform hover:scale-105 transition-transform duration-500 w-full max-w-[320px]">
                  <NftCard
                    name={username}
                    title={badge.title}
                    level={badge.level}
                    theme={badge.theme}
                    icon={badge.icon}
                    tokenId={badge.tokenId}
                    rarity={badge.rarity}
                    floating
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
