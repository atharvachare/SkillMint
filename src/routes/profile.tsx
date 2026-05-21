import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuthUser } from "@/lib/auth";
import { Share2, Clock, MapPin, Link as LinkIcon, Trophy } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/profile")({
  component: Profile,
});

function Profile() {
  const { user } = useAuthUser();

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong rounded-3xl p-10 border border-white/10 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-neon-purple/40 to-neon-cyan/40" />
          
          <div className="relative pt-16 flex flex-col items-center text-center">
            <img 
              src={user?.imageUrl || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"} 
              alt="Profile" 
              className="w-32 h-32 rounded-full border-4 border-black shadow-[0_0_30px_rgba(0,240,255,0.3)] bg-black object-cover"
            />
            <h1 className="text-3xl font-bold text-white mt-4">{user?.fullName || "Web3 Creator"}</h1>
            <p className="text-white/50 font-mono mt-1 text-sm">{user?.primaryEmailAddress?.emailAddress}</p>
            
            <div className="mt-4 flex items-center justify-center gap-2">
               <div className="bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_oklch(0.85_0.18_195/0.2)]">
                 Level 4
               </div>
               <div className="bg-neon-purple/10 border border-neon-purple/30 text-neon-purple px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_oklch(0.65_0.28_295/0.2)]">
                 1,250 XP
               </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-white/60">
               <span className="flex items-center gap-2"><MapPin size={16} className="text-neon-cyan" /> Global Network</span>
               <span className="flex items-center gap-2"><Clock size={16} className="text-neon-purple" /> Joined Recently</span>
               <span className="flex items-center gap-2"><LinkIcon size={16} className="text-neon-blue" /> Base Sepolia</span>
            </div>

            <button 
              onClick={() => {
                 const username = user?.fullName?.toLowerCase().replace(/\s+/g, '') || 'creator';
                 window.open(`/u/${username}`, '_blank');
              }}
              className="mt-8 flex items-center gap-2 rounded-xl bg-white/5 px-8 py-3 text-sm font-bold text-white hover:bg-white/10 transition-colors border border-white/10 hover:border-neon-cyan/50 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
            >
              <Share2 size={16} /> View Public Profile
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-strong rounded-3xl p-8 border border-white/10">
             <h3 className="text-xl font-bold text-white mb-6">Achievements</h3>
             <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-white/5"><span className="text-white/60">Badges Owned</span><span className="font-bold text-white text-lg">3</span></div>
                <div className="flex justify-between items-center py-3 border-b border-white/5"><span className="text-white/60">Global Rank</span><span className="font-bold text-neon-cyan text-lg">Top 15%</span></div>
                <div className="flex justify-between items-center py-3"><span className="text-white/60">Status</span><span className="font-bold text-emerald-400 text-lg">Active</span></div>
             </div>
           </motion.div>

           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-strong rounded-3xl p-8 border border-white/10 flex items-center justify-center text-center min-h-[250px]">
             <div>
               <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white/40 border border-white/10">
                 <Trophy size={24} />
               </div>
               <h3 className="text-xl font-bold text-white mb-2">No badges yet</h3>
               <p className="text-white/50 text-sm mb-6 max-w-[200px] mx-auto">Head to the studio to claim your first gasless NFT.</p>
             </div>
           </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
