import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
import { Trophy, Activity, Wallet, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-10">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight"
            >
              Welcome back, <span className="text-gradient">Creator</span>
            </motion.h1>
            <p className="text-white/60 mt-3 max-w-xl text-lg">Ready to mint your next achievement?</p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="glass-strong rounded-2xl p-4 flex items-center gap-5 border border-white/10"
          >
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-neon-purple to-neon-cyan p-0.5">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center font-bold text-lg text-white">
                  Lvl 4
                </div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1.5 font-medium">
                <span className="text-white/70">1,250 XP</span>
                <span className="text-neon-cyan">2,000 XP to Lvl 5</span>
              </div>
              <div className="w-48 h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-neon-purple to-neon-cyan w-[62%] rounded-full shadow-[0_0_10px_oklch(0.85_0.18_195/0.5)]" />
              </div>
            </div>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard icon={<Trophy />} label="Badges Minted" value="3" delay={0.1} trend="+1 this week" />
          <StatCard icon={<Activity />} label="Total XP" value="1,250" delay={0.2} trend="+250 this week" />
          <StatCard icon={<Wallet />} label="Gas Saved" value="$42.50" delay={0.3} trend="+$14.20 this week" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="lg:col-span-2 glass-strong rounded-3xl p-8 md:p-10 border border-white/10 relative overflow-hidden group min-h-[300px] flex flex-col justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute right-0 bottom-0 w-64 h-64 bg-neon-cyan/10 blur-[100px] rounded-full" />
            
            <h3 className="text-3xl font-bold mb-3 text-white relative z-10">Continue Minting</h3>
            <p className="text-white/60 mb-8 max-w-md relative z-10 text-lg">Head to the studio to customize and mint your new Base Sepolia badges gaslessly.</p>
            <div className="relative z-10">
              <Link to="/studio" className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-white/90 transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                Open Badge Studio <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="glass-strong rounded-3xl p-6 border border-white/10 flex flex-col h-full"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Live Activity</h3>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-mono text-white/50 uppercase">Live</span>
              </div>
            </div>
            
            <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <ActivityItem user="Alex" action="minted" badge="Early Adopter" time="Just now" />
              <ActivityItem user="Sarah" action="leveled up to" badge="Lvl 5" time="2m ago" />
              <ActivityItem user="David" action="minted" badge="Frontend Expert" time="15m ago" />
              <ActivityItem user="You" action="minted" badge="Early Adopter" time="2h ago" />
              <ActivityItem user="You" action="connected" badge="MetaMask" time="1d ago" />
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatCard({ icon, label, value, delay, trend }: { icon: any, label: string, value: string, delay: number, trend?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="glass-strong p-6 rounded-2xl border border-white/5 flex items-center gap-5 hover:border-neon-cyan/30 transition-colors group relative overflow-hidden"
    >
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full group-hover:scale-150 transition-transform duration-500 blur-xl" />
      <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-neon-purple/20 to-neon-cyan/20 border border-white/10 flex items-center justify-center text-neon-cyan group-hover:scale-110 transition-transform shadow-[inset_0_0_15px_rgba(255,255,255,0.05)]">
        {icon}
      </div>
      <div className="relative z-10">
        <div className="text-white/50 text-sm font-medium mb-1">{label}</div>
        <div className="text-3xl font-display font-bold text-white tracking-tight">{value}</div>
        {trend && <div className="text-emerald-400 text-xs font-medium mt-1">{trend}</div>}
      </div>
    </motion.div>
  )
}

function ActivityItem({ user, action, badge, time }: { user: string, action: string, badge: string, time: string }) {
  return (
    <div className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0 hover:bg-white/5 px-3 rounded-xl transition-colors cursor-default group">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center font-bold text-sm text-white shadow-sm">
        {user.charAt(0)}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-white/90 truncate">
          <span className="font-semibold text-white">{user}</span> <span className="text-white/60">{action}</span> <span className="text-neon-cyan font-medium">{badge}</span>
        </p>
        <p className="text-xs text-white/40 font-mono mt-0.5">{time}</p>
      </div>
    </div>
  )
}
