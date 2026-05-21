import { motion } from "framer-motion";
import { Wallet, CheckCircle2, Copy } from "lucide-react";
import { useState } from "react";

export function WalletSection({ address, onConnect, isConnecting }: { address: string | null; onConnect: () => void; isConnecting?: boolean }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    if (!address) return;
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section className="relative mx-auto max-w-5xl px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="neon-border glass-strong rounded-3xl p-8 md:p-12"
      >
        <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
          <div className="flex items-start gap-5">
            <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl transition-colors duration-500 ${address ? "bg-gradient-to-br from-emerald-400/20 to-emerald-500/10 shadow-[0_0_30px_rgba(52,211,153,0.2)] border border-emerald-500/20" : "bg-gradient-to-br from-neon-purple to-neon-blue glow-purple border border-white/10"}`}>
              <Wallet className={`h-7 w-7 transition-colors ${address ? "text-emerald-400" : "text-white"}`} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-display text-2xl font-bold">Wallet Status</h3>
                {address && (
                  <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-emerald-400">
                    Base Sepolia
                  </span>
                )}
              </div>
              {address ? (
                <div className="mt-3 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-emerald-400 font-medium">
                    <CheckCircle2 className="h-4 w-4" /> Connected with MetaMask
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={copy}
                      className="group flex items-center gap-2 rounded-lg bg-black/30 px-3 py-2 font-mono text-sm text-white/80 transition hover:bg-black/50 border border-white/5"
                      title={address}
                    >
                      {address.slice(0, 6)}...{address.slice(-4)}
                      <Copy className="h-3.5 w-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                      {copied && <span className="absolute -top-8 right-0 rounded bg-neon-cyan/20 px-2 py-1 text-xs text-neon-cyan backdrop-blur-md border border-neon-cyan/20">Copied!</span>}
                    </button>
                    <a 
                      href={`https://sepolia.basescan.org/address/${address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-white/50 hover:text-white transition-colors underline underline-offset-2"
                    >
                      View on Basescan
                    </a>
                  </div>
                </div>
              ) : (
                <div className="mt-2 space-y-1">
                  <p className="text-sm font-semibold text-white/90">Wallet Not Connected</p>
                  <p className="text-sm text-white/50">
                    Connect your MetaMask to mint gasless NFT badges.
                  </p>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={onConnect}
            disabled={isConnecting}
            className={`rounded-2xl px-6 py-3.5 font-semibold text-white transition-all hover:scale-105 ${address ? "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 shadow-md" : "bg-gradient-to-r from-neon-purple via-neon-blue to-neon-cyan shadow-[0_0_30px_oklch(0.65_0.28_295/0.5)] hover:shadow-[0_0_40px_oklch(0.65_0.28_295/0.8)]"} ${isConnecting ? "opacity-50 cursor-not-allowed hover:scale-100" : ""}`}
          >
            {isConnecting ? (
              <span className="flex items-center gap-2">
                 <span className="h-4 w-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                 Waiting...
              </span>
            ) : address ? "Disconnect" : "Connect MetaMask"}
          </button>
        </div>
      </motion.div>
    </section>
  );
}
