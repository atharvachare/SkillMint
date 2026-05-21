import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthUser } from "@/lib/auth";
import { useState, useEffect } from "react";
import { Moon, Sun, CheckCircle2, Wallet, LogOut } from "lucide-react";
import { blockchainService } from "@/lib/blockchain";

export const Route = createFileRoute("/settings")({
  component: Settings,
});

function Settings() {
  const { user } = useAuthUser();
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [theme, setTheme] = useState("dark");
  const [walletConnected, setWalletConnected] = useState(true);
  const [walletAddress, setWalletAddress] = useState("0x71C...9B23");
  const [toast, setToast] = useState<string | null>(null);

  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    // Load persisted state
    const savedEmail = localStorage.getItem("setting_email_notifs");
    if (savedEmail !== null) setEmailNotifs(savedEmail === "true");

    const savedTheme = localStorage.getItem("setting_theme") || "dark";
    setTheme(savedTheme);
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    const savedWallet = localStorage.getItem("setting_wallet_connected");
    if (savedWallet === "false") setWalletConnected(false);
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const toggleEmail = () => {
    const next = !emailNotifs;
    setEmailNotifs(next);
    localStorage.setItem("setting_email_notifs", next.toString());
    showToast("Preferences saved");
  };

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("setting_theme", next);
    if (next === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    showToast("Theme updated");
  };

  const disconnectWallet = () => {
    setWalletConnected(false);
    localStorage.setItem("setting_wallet_connected", "false");
    localStorage.setItem("wallet_disconnected_manually", "true");
    localStorage.removeItem("wallet_connected_user_id"); // ensure this is cleared
    // Trigger global disconnect event to sync with other components
    window.dispatchEvent(new Event("disconnect_wallet"));
    showToast("Wallet disconnected");
  };

  const connectWallet = async () => {
    if (isConnecting) return;
    setIsConnecting(true);
    
    try {
      const addr = await blockchainService.connectWallet(user?.id);
      setWalletConnected(true);
      setWalletAddress(addr);
      localStorage.setItem("setting_wallet_connected", "true");
      showToast("Wallet connected");
    } catch (err: any) {
      console.error(err);
      if (err.code === -32002) {
        showToast("MetaMask request already pending. Open extension.");
      } else {
        showToast(err.message || "Failed to connect wallet");
      }
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8 pb-20 relative">
        <header>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-display font-bold text-white"
          >
            Settings
          </motion.h1>
          <p className="text-white/60 mt-2">Manage your account preferences and integrations.</p>
        </header>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-strong rounded-3xl p-6 md:p-8 border border-white/10"
        >
          <h2 className="text-xl font-bold text-white mb-6">Profile Information</h2>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <img src={user?.imageUrl} alt="Profile" className="w-16 h-16 rounded-full border-2 border-neon-cyan/50 shadow-[0_0_15px_rgba(0,240,255,0.3)]" />
              <div>
                <p className="text-white font-medium text-lg">{user?.fullName}</p>
                <p className="text-white/60">{user?.primaryEmailAddress?.emailAddress}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-strong rounded-3xl p-6 md:p-8 border border-white/10"
        >
          <h2 className="text-xl font-bold text-white mb-6">Preferences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div 
               onClick={toggleEmail}
               className="flex items-center justify-between p-5 rounded-2xl bg-black/40 border border-white/5 hover:border-white/20 transition-all cursor-pointer group hover:bg-white/5"
             >
               <div>
                 <p className="text-white font-medium">Email Notifications</p>
                 <p className="text-white/50 text-sm mt-1">Receive updates for mints</p>
               </div>
               <div className={`w-12 h-6 rounded-full relative transition-colors ${emailNotifs ? 'bg-neon-cyan/80 shadow-[0_0_15px_oklch(0.85_0.18_195/0.3)]' : 'bg-white/10'}`}>
                 <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${emailNotifs ? 'right-1' : 'left-1'}`}></div>
               </div>
             </div>
             
             <div 
               onClick={toggleTheme}
               className="flex items-center justify-between p-5 rounded-2xl bg-black/40 border border-white/5 hover:border-white/20 transition-all cursor-pointer group hover:bg-white/5"
             >
               <div>
                 <p className="text-white font-medium">App Theme</p>
                 <p className="text-white/50 text-sm mt-1">Toggle interface style</p>
               </div>
               <div className={`w-14 h-8 rounded-full relative transition-colors flex items-center px-1 border border-white/10 ${theme === 'dark' ? 'bg-black' : 'bg-white/90'}`}>
                 <div className={`absolute w-6 h-6 rounded-full flex items-center justify-center transition-all ${theme === 'dark' ? 'left-1 bg-white/10' : 'right-1 bg-black/10'}`}>
                    {theme === 'dark' ? <Moon size={14} className="text-white" /> : <Sun size={14} className="text-black" />}
                 </div>
               </div>
             </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-strong rounded-3xl p-6 md:p-8 border border-white/10"
        >
          <h2 className="text-xl font-bold text-white mb-6">Connected Wallets</h2>
          <div className="space-y-4">
             {walletConnected ? (
               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-black/40 border border-white/5 hover:border-white/20 transition-all">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center p-2.5 shadow-sm">
                     <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="MetaMask" className="w-full h-full" />
                   </div>
                   <div>
                     <div className="flex items-center gap-2">
                       <p className="text-white font-medium">MetaMask</p>
                       <span className="px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-bold bg-emerald-400/20 text-emerald-400 border border-emerald-400/30">Connected</span>
                     </div>
                     <p className="text-white/50 text-sm font-mono mt-1">{walletAddress}</p>
                   </div>
                 </div>
                 <button 
                   onClick={disconnectWallet}
                   className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-red-400 border border-red-400/30 hover:bg-red-400/10 transition-colors w-full sm:w-auto"
                 >
                   <LogOut size={16} /> Disconnect
                 </button>
               </div>
             ) : (
               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-black/40 border border-white/5 hover:border-white/20 transition-all border-dashed">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center p-2.5 border border-white/10">
                     <Wallet className="w-6 h-6 text-white/40" />
                   </div>
                   <div>
                     <p className="text-white font-medium">No Wallet Connected</p>
                     <p className="text-white/50 text-sm mt-1">Connect to mint badges</p>
                   </div>
                 </div>
                 <button 
                   onClick={connectWallet}
                   disabled={isConnecting}
                   className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-black transition-colors w-full sm:w-auto ${isConnecting ? 'bg-white/50 cursor-not-allowed' : 'bg-white hover:bg-white/90'}`}
                 >
                   {isConnecting ? (
                     <span className="flex items-center gap-2">
                       <span className="h-4 w-4 rounded-full border-2 border-black/20 border-t-black animate-spin" />
                       Waiting...
                     </span>
                   ) : "Connect MetaMask"}
                 </button>
               </div>
             )}
          </div>
        </motion.div>

        {/* Global Toast */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="fixed bottom-8 right-8 z-50 glass-strong border border-white/20 px-6 py-4 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex items-center gap-3"
            >
              <CheckCircle2 className="text-neon-cyan w-5 h-5" />
              <span className="text-white font-medium">{toast}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}
