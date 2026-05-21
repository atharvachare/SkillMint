import { motion } from "framer-motion";
import { Check, X, Zap, AlertTriangle } from "lucide-react";

const TRAD = [
  "Need ETH to start",
  "Complex onboarding flow",
  "Gas fee confusion",
  "Seed phrase friction",
];

const NEW = [
  "Pay with USDC",
  "Beginner friendly UX",
  "Fully gasless minting",
  "One-click claim flow",
];

export function Comparison() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-24">
      <div className="mb-14 text-center">
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-neon-cyan">The Difference</div>
        <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
          No <span className="text-gradient">ETH</span> required
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/60">
          Compare the legacy Web3 onboarding to the SkillMint + UGF experience.
        </p>
      </div>

      <div className="relative grid items-stretch gap-6 lg:grid-cols-[1fr_auto_1fr]">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-red-500/20 bg-red-500/[0.04] p-8 backdrop-blur"
        >
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-red-500/15 text-red-400">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-red-400/80">Legacy</div>
              <h3 className="font-display text-xl font-bold">Traditional Web3</h3>
            </div>
          </div>
          <ul className="mt-6 space-y-3">
            {TRAD.map((t, i) => (
              <motion.li
                key={t}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3 rounded-xl border border-red-500/10 bg-black/30 px-4 py-3 text-sm text-white/70"
              >
                <span className="grid h-6 w-6 place-items-center rounded-full bg-red-500/15 text-red-400">
                  <X className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                {t}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Glowing divider */}
        <div className="relative hidden items-center justify-center lg:flex">
          <div className="h-full w-px bg-gradient-to-b from-transparent via-neon-cyan to-transparent" />
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="absolute grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-neon-purple to-neon-cyan glow-purple"
          >
            <Zap className="h-6 w-6 text-white" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="neon-border relative overflow-hidden rounded-3xl p-8 backdrop-blur"
          style={{ background: "oklch(0.16 0.04 280 / 0.6)" }}
        >
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-neon-cyan/20 blur-3xl" />
          <div className="relative flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-neon-purple to-neon-cyan glow-purple">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-neon-cyan">SkillMint + UGF</div>
              <h3 className="font-display text-xl font-bold">The new way</h3>
            </div>
          </div>
          <ul className="relative mt-6 space-y-3">
            {NEW.map((t, i) => (
              <motion.li
                key={t}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3 rounded-xl border border-neon-cyan/15 bg-black/30 px-4 py-3 text-sm text-white/85"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", delay: i * 0.08 + 0.1 }}
                  className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-neon-purple to-neon-cyan text-white shadow-[0_0_15px_oklch(0.85_0.18_195/0.6)]"
                >
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </motion.span>
                {t}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
