import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthSignInButton, useAuthUser } from "@/lib/auth";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Hexagon } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { isSignedIn } = useAuthUser();

  return (
    <div className="relative min-h-screen overflow-hidden bg-black selection:bg-neon-cyan/30 font-inter">
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-neon-purple/20 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-neon-cyan/10 blur-[150px] rounded-full pointer-events-none" />
      
      <header className="fixed top-6 left-0 right-0 z-50 mx-auto w-full max-w-7xl px-4">
        <div className="glass-strong flex items-center justify-between rounded-2xl px-6 py-4 border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl">
          <a href="#" className="flex items-center gap-3 group">
             <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-neon-purple to-neon-cyan shadow-[0_0_20px_oklch(0.65_0.28_295/0.6)] group-hover:scale-105 transition-transform">
              <Hexagon className="h-6 w-6 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-display text-2xl font-bold tracking-tight text-white">
              Skill<span className="text-gradient">Mint</span>
            </span>
          </a>
          
          <div className="flex items-center gap-4">
            {isSignedIn ? (
              <Link 
                to="/dashboard" 
                className="rounded-xl bg-white text-black px-6 py-2.5 text-sm font-bold hover:bg-white/90 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                Go to Dashboard
              </Link>
            ) : (
              <AuthSignInButton mode="modal">
                <button className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-neon-purple via-neon-blue to-neon-cyan px-7 py-3 text-sm font-bold text-white shadow-[0_0_20px_oklch(0.65_0.28_295/0.5)] transition hover:shadow-[0_0_30px_oklch(0.65_0.28_295/0.8)] hover:scale-105">
                  Continue with Google
                </button>
              </AuthSignInButton>
            )}
          </div>
        </div>
      </header>

      <main className="relative z-10 pt-32 md:pt-40 pb-20 md:pb-32 flex flex-col items-center justify-center text-center px-4 md:px-8">
         <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.7, ease: "easeOut" }}
           className="max-w-4xl mx-auto w-full"
         >
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan text-[10px] md:text-xs font-mono mb-6 md:mb-8 font-semibold tracking-widest">
             <Sparkles size={14} className="shrink-0" /> THE NEW STANDARD FOR WEB3
           </div>
           
           <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-display font-bold text-white tracking-tighter leading-[1.1] md:leading-[1.05] mb-4 md:mb-6 drop-shadow-2xl px-2">
             Mint <span className="text-gradient block mt-1 md:mt-2 pb-1 md:pb-2">Gasless</span> Achievements.
           </h1>
           
           <p className="text-base md:text-xl text-white/50 max-w-xl md:max-w-2xl mx-auto mb-8 md:mb-12 font-light leading-relaxed px-2">
             The premium Web3 onboarding platform. Mint personalized NFT badges on Base Sepolia without ever touching ETH. Powered by Universal Gas Framework.
           </p>

           <div className="flex flex-wrap items-center justify-center gap-4">
             {isSignedIn ? (
               <Link 
                 to="/studio" 
                 className="flex items-center justify-center w-full sm:w-auto gap-2 rounded-2xl bg-white text-black px-8 py-3.5 md:py-4 font-bold text-base md:text-lg hover:scale-105 active:scale-95 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.2)]"
               >
                 Launch Studio <ArrowRight size={20} />
               </Link>
             ) : (
               <AuthSignInButton mode="modal">
                 <button className="flex items-center justify-center w-full sm:w-auto gap-2 rounded-2xl bg-gradient-to-r from-neon-purple via-neon-blue to-neon-cyan px-8 py-3.5 md:py-4 font-bold text-base md:text-lg text-white hover:scale-105 active:scale-95 transition-transform shadow-[0_0_50px_oklch(0.65_0.28_295/0.5)]">
                   Get Started <ArrowRight size={20} />
                 </button>
               </AuthSignInButton>
             )}
           </div>
         </motion.div>
         
         {/* Miniature Live Mint Preview */}
         <motion.div 
           initial={{ opacity: 0, y: 40 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.3, duration: 0.7 }}
           className="mt-20 md:mt-24 relative max-w-5xl mx-auto w-full group perspective-1000 px-4 md:px-0"
         >
           <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 rounded-3xl pointer-events-none" />
           <div className="glass-strong rounded-3xl border border-white/10 p-3 md:p-6 transform transition-transform duration-700 md:group-hover:-translate-y-2 md:hover:shadow-[0_20px_80px_rgba(0,240,255,0.15)]">
             <div className="bg-black/80 rounded-2xl md:rounded-[2rem] border border-white/5 overflow-hidden relative aspect-video md:aspect-[16/7] flex items-center justify-center">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-luminosity md:scale-105 md:group-hover:scale-100 transition-transform duration-1000"></div>
               <div className="relative z-10 text-center px-4">
                 <div className="w-16 h-16 md:w-24 md:h-24 bg-neon-cyan/10 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-4 md:mb-6 backdrop-blur-xl border border-neon-cyan/30 animate-pulse shadow-[0_0_40px_rgba(0,240,255,0.3)]">
                    <Hexagon size={32} className="text-neon-cyan md:w-12 md:h-12" strokeWidth={1.5} />
                 </div>
                 <h3 className="text-2xl md:text-4xl font-display font-bold text-white mb-2 md:mb-3 tracking-tight">Canva meets Web3</h3>
                 <p className="text-white/60 text-sm md:text-lg font-light max-w-md mx-auto">Experience the smoothest minting studio ever built.</p>
               </div>
             </div>
           </div>
         </motion.div>
      </main>
    </div>
  );
}
