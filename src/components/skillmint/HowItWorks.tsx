import { motion } from "framer-motion";
import { MousePointerClick, Fuel, Cpu, Award, ArrowRight } from "lucide-react";

const flow = [
  { i: MousePointerClick, t: "User Action", d: "Click to mint" },
  { i: Fuel, t: "UGF Handles Gas", d: "Sponsor relayer signs" },
  { i: Cpu, t: "Transaction Executes", d: "Base Sepolia confirms" },
  { i: Award, t: "NFT Minted", d: "Badge in wallet" },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative mx-auto max-w-7xl px-4 py-24">
      <div className="mb-16 text-center">
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-neon-cyan">Architecture</div>
        <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
          How <span className="text-gradient">UGF</span> works
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/60">
          The Universal Gas Framework abstracts gas away from your users — fully invisible onboarding.
        </p>
      </div>

      <div className="flex flex-col items-stretch gap-4 lg:flex-row lg:items-center">
        {flow.map((f, i) => (
          <div key={f.t} className="flex flex-1 items-center gap-4 lg:flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="neon-border glass-strong flex-1 rounded-2xl p-6 text-center"
            >
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-neon-purple to-neon-cyan glow-purple">
                <f.i className="h-7 w-7 text-white" />
              </div>
              <div className="mt-4 font-mono text-[10px] uppercase tracking-widest text-neon-cyan">
                Step 0{i + 1}
              </div>
              <div className="mt-1 font-display text-lg font-bold">{f.t}</div>
              <div className="mt-1 text-sm text-white/60">{f.d}</div>
            </motion.div>

            {i < flow.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.15 }}
                className="flex shrink-0 items-center justify-center text-neon-cyan"
              >
                <ArrowRight className="h-6 w-6 lg:hidden rotate-90" />
                <ArrowRight className="hidden h-6 w-6 lg:block" />
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
