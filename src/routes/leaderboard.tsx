import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
import { Trophy, TrendingUp, Users, Fuel } from "lucide-react";
import { useEffect, useState } from "react";
import { dbService } from "@/lib/db";

export const Route = createFileRoute("/leaderboard")({
  component: Leaderboard,
});

function Leaderboard() {
  const [leaders, setLeaders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dbService.getLeaderboard()
      .then(setLeaders)
      .finally(() => setLoading(false));
  }, []);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8 pb-20">
        <header className="mb-8 pt-8">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-display font-bold text-white flex items-center gap-3"
          >
            <Trophy className="text-amber-400 h-10 w-10" /> Leaderboard
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/60 mt-2 text-lg"
          >
            Top creators and XP earners on the SkillMint network.
          </motion.p>
        </header>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-strong rounded-3xl p-6 border border-white/10 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-6 opacity-10 text-neon-cyan"><Users size={64} /></div>
             <div className="text-white/50 font-mono text-xs uppercase tracking-widest mb-2">Total Creators</div>
             <div className="text-4xl font-bold text-white">12,408</div>
             <div className="mt-4 text-xs font-semibold text-emerald-400 flex items-center gap-1 bg-emerald-400/10 w-max px-2 py-1 rounded-full"><TrendingUp size={12}/> +15% this week</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-strong rounded-3xl p-6 border border-white/10 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-6 opacity-10 text-neon-purple"><Trophy size={64} /></div>
             <div className="text-white/50 font-mono text-xs uppercase tracking-widest mb-2">Total Badges Minted</div>
             <div className="text-4xl font-bold text-white">45,912</div>
             <div className="mt-4 text-xs font-semibold text-emerald-400 flex items-center gap-1 bg-emerald-400/10 w-max px-2 py-1 rounded-full"><TrendingUp size={12}/> +22% this week</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-strong rounded-3xl p-6 border border-white/10 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-6 opacity-10 text-amber-400"><Fuel size={64} /></div>
             <div className="text-white/50 font-mono text-xs uppercase tracking-widest mb-2">ETH Gas Saved</div>
             <div className="text-4xl font-bold text-amber-400">14.2 ETH</div>
             <div className="mt-4 text-xs font-semibold text-white/50">Covered by UGF Relayer</div>
          </motion.div>
        </div>

        {/* Leaderboard Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-strong rounded-3xl p-8 border border-white/10">
          <h2 className="text-xl font-bold text-white mb-6">Top XP Earners</h2>
          {loading ? (
             <div className="animate-pulse space-y-4">
               {[1,2,3,4,5].map(i => <div key={i} className="h-16 bg-white/5 rounded-xl w-full" />)}
             </div>
          ) : (
            <div className="space-y-3">
               {leaders.map((leader, i) => (
                 <div key={leader.rank} className="flex items-center justify-between p-4 rounded-2xl bg-black/40 border border-white/5 hover:border-white/10 transition-colors">
                   <div className="flex items-center gap-4">
                     <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        i === 0 ? 'bg-amber-400/20 text-amber-400 border border-amber-400/50 shadow-[0_0_15px_rgba(251,191,36,0.3)]' :
                        i === 1 ? 'bg-slate-300/20 text-slate-300 border border-slate-300/50' :
                        i === 2 ? 'bg-amber-700/20 text-amber-600 border border-amber-700/50' :
                        'bg-white/5 text-white/50'
                     }`}>
                       #{leader.rank}
                     </div>
                     <div>
                       <div className="text-white font-bold text-lg">{leader.name}</div>
                       <div className="text-white/50 font-mono text-xs">{leader.address}</div>
                     </div>
                   </div>
                   <div className="text-right">
                     <div className="text-neon-cyan font-bold">{leader.xp.toLocaleString()} XP</div>
                     <div className="text-white/50 text-xs">{leader.level}</div>
                   </div>
                 </div>
               ))}
            </div>
          )}
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
