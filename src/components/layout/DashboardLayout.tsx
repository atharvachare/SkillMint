import { Link, useNavigate, useLocation } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { AuthUserButton, useAuthUser } from "@/lib/auth";
import { LayoutDashboard, Palette, Compass, User, Hexagon, Menu, X, Wallet, LogOut, Settings, Trophy } from "lucide-react";
import { useEffect, useState } from "react";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isSignedIn, isLoaded } = useAuthUser();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate({ to: "/" });
    }
  }, [isLoaded, isSignedIn, navigate]);

  useEffect(() => {
    if (user?.id) {
      const lastUser = localStorage.getItem("last_active_user");
      if (lastUser && lastUser !== user.id) {
        // User changed! Wipe the old wallet session and cached data
        localStorage.removeItem("setting_wallet_connected");
        localStorage.removeItem("wallet_connected_user_id");
        sessionStorage.clear();
        window.dispatchEvent(new Event("disconnect_wallet"));
      }
      localStorage.setItem("last_active_user", user.id);
    } else if (isLoaded && !isSignedIn) {
      // Logged out
      localStorage.removeItem("last_active_user");
      localStorage.removeItem("setting_wallet_connected");
      localStorage.removeItem("wallet_connected_user_id");
      sessionStorage.clear();
      window.dispatchEvent(new Event("disconnect_wallet"));
    }
  }, [user?.id, isLoaded, isSignedIn]);

  const location = useLocation();

  if (!isLoaded || !isSignedIn) return null;

  return (
    <div className="flex min-h-screen bg-black overflow-hidden relative">
      {/* Mobile Sidebar Overlay */}
      <div 
        className={`fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm transition-opacity md:hidden ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setMobileOpen(false)}
      >
        <aside 
          className={`absolute top-0 left-0 bottom-0 w-72 glass-strong border-r border-white/10 flex flex-col transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
          onClick={e => e.stopPropagation()}
        >
          <div className="p-6 flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-neon-purple to-neon-cyan shadow-[0_0_20px_oklch(0.65_0.28_295/0.6)]">
                <Hexagon className="h-6 w-6 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-display text-2xl font-bold tracking-tight text-white">Skill<span className="text-gradient">Mint</span></span>
            </Link>
            <button onClick={() => setMobileOpen(false)} className="text-white/70 hover:text-white"><X size={24} /></button>
          </div>
          
          <nav className="flex-1 px-4 py-2 space-y-2">
            <NavLink to="/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" onClick={() => setMobileOpen(false)} />
            <NavLink to="/studio" icon={<Palette size={20} />} label="Badge Studio" onClick={() => setMobileOpen(false)} />
            <NavLink to="/explore" icon={<Compass size={20} />} label="Explore" onClick={() => setMobileOpen(false)} />
            <NavLink to="/leaderboard" icon={<Trophy size={20} />} label="Leaderboard" onClick={() => setMobileOpen(false)} />
            <NavLink to="/profile" icon={<User size={20} />} label="Profile" onClick={() => setMobileOpen(false)} />
            <NavLink to="/settings" icon={<Settings size={20} />} label="Settings" onClick={() => setMobileOpen(false)} />
          </nav>
          
          <div className="p-4 border-t border-white/10 space-y-2">
            <button onClick={() => { 
              localStorage.setItem("wallet_disconnected_manually", "true");
              window.dispatchEvent(new Event("disconnect_wallet")); 
              setMobileOpen(false); 
            }} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors">
              <Wallet size={20} /> <span className="font-medium">Disconnect Wallet</span>
            </button>
          </div>
        </aside>
      </div>

      {/* Desktop Sidebar */}
      <aside className="w-64 glass-strong border-r border-white/10 flex-col hidden md:flex z-10 shrink-0">
        <div className="p-6 flex items-center gap-3">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-neon-purple to-neon-cyan shadow-[0_0_20px_oklch(0.65_0.28_295/0.6)]">
              <Hexagon className="h-6 w-6 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-display text-2xl font-bold tracking-tight text-white">
              Skill<span className="text-gradient">Mint</span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          <NavLink to="/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" />
          <NavLink to="/studio" icon={<Palette size={20} />} label="Badge Studio" />
          <NavLink to="/explore" icon={<Compass size={20} />} label="Explore" />
          <NavLink to="/leaderboard" icon={<Trophy size={20} />} label="Leaderboard" />
          <NavLink to="/profile" icon={<User size={20} />} label="Profile" />
          <NavLink to="/settings" icon={<Settings size={20} />} label="Settings" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen relative min-w-0">
        <header className="h-16 md:h-20 glass-strong border-b border-white/10 flex items-center justify-between md:justify-end px-4 md:px-8 shrink-0 z-20">
          <button className="md:hidden text-white/70 hover:text-white p-2" onClick={() => setMobileOpen(true)}>
            <Menu size={24} />
          </button>
          
          <div className="flex items-center gap-4">
            <AuthUserButton afterSignOutUrl="/" appearance={{ elements: { userButtonAvatarBox: "w-8 h-8 md:w-10 md:h-10 border-2 border-neon-cyan/50 shadow-[0_0_20px_oklch(0.65_0.28_295/0.4)]" } }} />
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto relative z-0">
           {/* Ambient background glows */}
           <div className="absolute top-[-10%] right-[-10%] -z-10 w-[600px] h-[600px] bg-neon-purple/20 blur-[150px] rounded-full pointer-events-none" />
           <div className="absolute bottom-[-10%] left-[-10%] -z-10 w-[600px] h-[600px] bg-neon-cyan/20 blur-[150px] rounded-full pointer-events-none" />
           
           <div className="p-4 md:p-8 lg:p-10 h-full max-w-[1600px] mx-auto">
             <motion.div
               key={location.pathname}
               initial={{ opacity: 0, y: 15 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -15 }}
               transition={{ duration: 0.3, ease: "easeOut" }}
             >
               {children}
             </motion.div>
           </div>
        </div>
      </main>
    </div>
  );
}

function NavLink({ to, icon, label, onClick }: { to: string; icon: React.ReactNode; label: string; onClick?: () => void }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors group"
      activeProps={{ className: "bg-white/10 !text-white shadow-[inset_3px_0_0_var(--neon-cyan)]" }}
    >
      <span className="opacity-70 group-hover:opacity-100 transition-opacity">{icon}</span>
      <span className="font-medium">{label}</span>
    </Link>
  );
}
