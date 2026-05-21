import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { Particles } from "./Particles";
import { NftCard } from "./NftCard";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-32">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-neon-purple/30 blur-[120px]" />
      <div className="absolute -right-32 top-40 h-96 w-96 rounded-full bg-neon-cyan/20 blur-[120px]" />
      <Particles count={30} />

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-cyan opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-cyan" />
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-white/70">
                Live on Base Sepolia
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl"
            >
              Gasless NFT{" "}
              <span className="text-gradient-animated">Achievement</span>{" "}
              Platform
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 max-w-xl text-lg text-white/70"
            >
              Mint personalized blockchain badges without holding ETH. Powered by the
              Universal Gas Framework — onboarding the next billion Web3 builders.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <a
                href="#mint"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-neon-purple via-neon-blue to-neon-cyan px-7 py-4 font-semibold text-white animate-pulse-glow"
              >
                <Sparkles className="h-5 w-5" />
                Claim Badge
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </a>
              <a
                href="#features"
                className="glass inline-flex items-center gap-2 rounded-2xl px-7 py-4 font-semibold text-white transition hover:bg-white/10"
              >
                <Zap className="h-5 w-5 text-neon-cyan" />
                Explore Features
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-8"
            >
              {[
                { v: "0 ETH", l: "Required" },
                { v: "<2s", l: "Mint time" },
                { v: "100%", l: "Gasless" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-3xl font-bold text-gradient">{s.v}</div>
                  <div className="mt-1 text-xs uppercase tracking-widest text-white/50">{s.l}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="absolute h-80 w-80 rounded-full bg-neon-purple/30 blur-3xl" />
            <NftCard floating name="Alex Chen" title="Blockchain Builder" level="Expert" />
          </div>
        </div>
      </div>
    </section>
  );
}
