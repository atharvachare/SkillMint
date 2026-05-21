import { motion } from "framer-motion";
import { Fuel, Palette, Network, Sparkles, Smile, Zap } from "lucide-react";

const FEATURES = [
  { i: Fuel, t: "Gasless Transactions", d: "UGF abstracts away ETH gas fees — your users never see them." },
  { i: Palette, t: "Personalized NFTs", d: "Every badge is uniquely tailored with name, skill, and level." },
  { i: Network, t: "Base Sepolia Native", d: "Built directly on Coinbase's L2 — fast and EVM-compatible." },
  { i: Sparkles, t: "Web3 Made Simple", d: "Beautiful UX that hides the complexity of crypto." },
  { i: Smile, t: "Beginner-Friendly", d: "No seed phrases, no gas calculators, no friction." },
  { i: Zap, t: "Fast Transactions", d: "Sub-2-second confirmation, even at peak load." },
];

export function Features() {
  return (
    <section id="features" className="relative mx-auto max-w-7xl px-4 py-24">
      <div className="mb-14 text-center">
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-neon-cyan">Why SkillMint</div>
        <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
          Built for the <span className="text-gradient">next billion</span>
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.t}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -6 }}
            className="group relative rounded-3xl p-[1px] transition"
            style={{ background: "linear-gradient(135deg, oklch(1 0 0 / 0.1), oklch(1 0 0 / 0.02))" }}
          >
            <div className="h-full rounded-[calc(1.5rem-1px)] bg-[oklch(0.14_0.04_280)] p-6 transition group-hover:bg-[oklch(0.16_0.05_285)]">
              <div className="inline-grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-neon-purple/30 to-neon-cyan/30 transition group-hover:from-neon-purple group-hover:to-neon-cyan">
                <f.i className="h-6 w-6 text-neon-cyan transition group-hover:text-white" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold">{f.t}</h3>
              <p className="mt-2 text-sm text-white/60">{f.d}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
