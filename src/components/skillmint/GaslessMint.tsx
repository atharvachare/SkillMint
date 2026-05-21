import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Sparkles, Loader2, CheckCircle2, Fuel, Zap, Coins, GraduationCap, ExternalLink, X, Download, type LucideIcon } from "lucide-react";
import type { BadgeTheme } from "./BadgeSelector";
import { NftCard } from "./NftCard";
import { Confetti } from "./Confetti";
import { blockchainService } from "@/lib/blockchain";
import { dbService } from "@/lib/db";

type Status = "idle" | "minting" | "success";

interface Props {
  theme: BadgeTheme;
  title: string;
  name: string;
  level: string;
  icon: LucideIcon;
  address: string | null;
  description: string;
  rarity?: "Common" | "Rare" | "Epic" | "Legendary";
  onMinted: (tx: string, tokenId: string) => void;
}

export function GaslessMint({ theme, title, name, level, icon, address, description, rarity, onMinted }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [step, setStep] = useState(0);
  const [tx, setTx] = useState("");
  const [tokenId, setTokenId] = useState("");
  const steps = ["Signing meta-tx…", "UGF relaying gas…", "Minting on Base Sepolia…", "Badge minted!"];

  const mint = async () => {
    if (!address) {
      alert("Please connect your wallet first to mint an NFT.");
      return;
    }
    
    setStatus("minting");
    setStep(0);
    
    try {
      // Simulate step progression purely for UI feeling while tx is pending
      const id = setInterval(() => {
        setStep(prev => (prev < 2 ? prev + 1 : prev));
      }, 3000);

      const { hash, tokenId } = await blockchainService.mintNFT(address, name, title, level, theme.accent, description);
      
      clearInterval(id);
      setStep(3); // "Badge minted!"
      
      setTimeout(() => {
        setTx(hash);
        setTokenId(tokenId || "unknown");
        setStatus("success");
        onMinted(hash, tokenId || "unknown");
        
        // Save to Database Scaffold
        dbService.saveMint({
           address,
           badgeId: title.toLowerCase().replace(/\s+/g, '-'),
           tokenId: tokenId || "unknown",
           txHash: hash,
           rarity: rarity || "Common",
           xpEarned: rarity === "Legendary" ? 1000 : rarity === "Epic" ? 500 : rarity === "Rare" ? 250 : 100
        }).catch(err => console.warn("DB save failed (mocked)", err));

      }, 600);
      
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to mint NFT");
      setStatus("idle");
    }
  };

  const reset = () => { setStatus("idle"); setStep(0); };

  return (
    <section id="mint" className="relative mx-auto max-w-5xl px-4 py-24">
      <div
        className="absolute inset-x-10 top-10 -z-10 h-80 rounded-full blur-[100px] transition-colors duration-700"
        style={{ background: theme.accent.replace(")", " / 0.18)") }}
      />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="neon-border glass-strong relative overflow-hidden rounded-3xl p-8 md:p-12"
      >
        <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-neon-cyan">Step 03</div>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
              Mint without <span className="text-gradient">ETH</span>
            </h2>
            <p className="mt-3 max-w-lg text-white/60">
              UGF sponsors the gas fee invisibly. Zero ETH required to claim your badge.
            </p>
          </div>
          <span className="rounded-full border border-neon-cyan/40 bg-neon-cyan/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-neon-cyan">
            Powered by UGF
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { i: Coins, t: "Pay in USDC", d: "Stable & predictable" },
            { i: Fuel, t: "Gas Sponsored", d: "Via UGF relayer" },
            { i: GraduationCap, t: "Beginner-friendly", d: "No ETH learning curve" },
            { i: Zap, t: "Instant settlement", d: "< 2 seconds" },
          ].map((f) => (
            <div key={f.t} className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <f.i className="h-5 w-5 text-neon-cyan" />
              <div className="mt-3 text-sm font-semibold">{f.t}</div>
              <div className="text-xs text-white/50">{f.d}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-6">
          {/* Demo banner removed since real contract is required */}

          <AnimatePresence mode="wait">
            {status === "idle" && (
              <motion.button
                key="claim"
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={mint}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group relative inline-flex items-center gap-3 rounded-2xl px-10 py-5 text-lg font-bold text-white animate-pulse-glow"
                style={{ background: `linear-gradient(90deg, ${theme.accent}, var(--neon-cyan))` }}
              >
                <Sparkles className="h-5 w-5" />
                Claim Badge NFT
              </motion.button>
            )}

            {status === "minting" && (
              <motion.div
                key="minting"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="w-full max-w-md space-y-4"
              >
                <div className="flex items-center justify-center gap-3 text-white">
                  <Loader2 className="h-5 w-5 animate-spin text-neon-cyan" />
                  <span className="font-mono text-sm">{steps[step]}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full"
                    style={{ background: `linear-gradient(90deg, ${theme.accent}, var(--neon-cyan))` }}
                    initial={{ width: "0%" }}
                    animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="grid grid-cols-4 gap-1 text-center font-mono text-[10px] uppercase tracking-widest text-white/40">
                  {steps.map((s, i) => (
                    <span key={s} className={i <= step ? "text-neon-cyan" : ""}>
                      {`0${i + 1}`}
                    </span>
                  ))}
                </div>

                <div className="mt-8 relative h-24 overflow-hidden rounded-2xl border border-white/10 bg-black/40 flex items-center justify-center">
                   <motion.div
                     animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.95, 1.05, 0.95] }}
                     transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                     className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"
                   />
                   <div className="relative z-10 flex flex-col items-center gap-2">
                     <motion.div
                       animate={{ rotate: 360 }}
                       transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                       className="w-8 h-8 rounded-full border-2 border-dashed border-neon-cyan/50"
                     />
                     <span className="font-mono text-[10px] uppercase tracking-widest text-white/50">
                        {step === 0 ? "Awaiting Signature" : step === 1 ? "Relaying via UGF" : step === 2 ? "Awaiting Confirmation" : "Finalizing..."}
                     </span>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Success modal */}
      <AnimatePresence>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] grid place-items-center bg-black/80 p-4 backdrop-blur-md"
            onClick={reset}
          >
            <Confetti count={50} />
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-[oklch(0.13_0.04_280)] p-8 md:p-10"
              style={{ boxShadow: `0 0 80px ${theme.ring}` }}
            >
              <button
                onClick={reset}
                aria-label="Close"
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
                <div>
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                    className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-neon-cyan glow-cyan"
                  >
                    <CheckCircle2 className="h-9 w-9 text-white" />
                  </motion.div>
                  <h3 className="mt-5 font-display text-3xl font-bold md:text-4xl">
                    NFT Minted <span className="text-gradient-animated">Successfully</span>
                  </h3>
                  <p className="mt-2 text-white/60">
                    Your <span className="text-white">{title}</span> badge is now live on Base Sepolia.
                  </p>

                  <div className="mt-5 space-y-2 font-mono text-xs">
                    <div className="flex items-center justify-between rounded-lg border border-white/10 bg-black/40 px-3 py-2">
                      <span className="text-white/50">Token ID</span>
                      <span className="text-neon-cyan">#{tokenId}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-white/10 bg-black/40 px-3 py-2">
                      <span className="text-white/50">Tx Hash</span>
                      <a 
                        href={`https://sepolia.basescan.org/tx/${tx}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neon-cyan hover:underline underline-offset-2"
                      >
                        {tx.slice(0, 10)}…{tx.slice(-8)}
                      </a>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={`/u/${name.toLowerCase().replace(/\s+/g, '')}`}
                      className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white hover:scale-105 transition-transform"
                      style={{ background: `linear-gradient(90deg, ${theme.accent}, var(--neon-cyan))`, boxShadow: `0 0 30px ${theme.ring}` }}
                    >
                      View Profile <ExternalLink className="h-4 w-4" />
                    </a>
                    <button
                      onClick={() => {
                         const link = document.createElement('a');
                         link.download = `${title.replace(/\s+/g, '-')}-Certificate.png`;
                         link.href = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='; // Placeholder for canvas generation
                         link.click();
                      }}
                      className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-black/40 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                    >
                      Get Certificate <Download className="h-4 w-4" />
                    </button>
                    <button
                      onClick={reset}
                      className="rounded-xl border border-white/20 px-5 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10"
                    >
                      Mint another
                    </button>
                  </div>

                  {/* Social Sharing */}
                  <div className="mt-6 border-t border-white/10 pt-5">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-white/50 mb-3">Share your achievement</p>
                    <div className="flex gap-3">
                      <a 
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`I just minted the ${title} badge gasless on Base Sepolia using SkillMint! 🚀\n\nCheck out my Web3 achievement profile at skillmint.app/u/${name.toLowerCase().replace(/\s+/g, '')}`)}`}
                        target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-lg bg-[#1DA1F2]/20 text-[#1DA1F2] border border-[#1DA1F2]/30 px-4 py-2 text-xs font-bold hover:bg-[#1DA1F2]/30 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.96H5.078z"></path></svg>
                        Share
                      </a>
                      <a 
                        href="https://www.linkedin.com/sharing/share-offsite/?url=https://skillmint.app"
                        target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-lg bg-[#0A66C2]/20 text-[#0A66C2] border border-[#0A66C2]/30 px-4 py-2 text-xs font-bold hover:bg-[#0A66C2]/30 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        Share
                      </a>
                    </div>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20, rotate: -4 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mx-auto w-[260px] animate-float"
                >
                  <NftCard
                    name={name}
                    title={title}
                    level={level}
                    theme={theme}
                    icon={icon}
                    tokenId={tokenId}
                    rarity={rarity}
                  />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
