import { motion } from "framer-motion";
import { Brain, Blocks, Code2, Wand2, Trophy, type LucideIcon } from "lucide-react";

export interface BadgeTheme {
  from: string;       // tailwind gradient start class
  to: string;         // tailwind gradient end class
  accent: string;     // oklch color for glow / borders
  ring: string;       // soft outer glow
}

export interface Badge {
  id: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  gradient: string;
  theme: BadgeTheme;
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
}

export const BADGES: Badge[] = [
  {
    id: "ai",
    title: "AI Engineer",
    desc: "Build intelligent systems with LLMs & ML.",
    icon: Brain,
    gradient: "from-neon-purple to-neon-cyan",
    theme: {
      from: "from-neon-purple",
      to: "to-neon-cyan",
      accent: "oklch(0.65 0.28 295)",
      ring: "oklch(0.65 0.28 295 / 0.55)",
    },
    rarity: "Epic",
  },
  {
    id: "bc",
    title: "Blockchain Builder",
    desc: "Smart contracts, DeFi, and Web3 mastery.",
    icon: Blocks,
    gradient: "from-neon-blue to-neon-cyan",
    theme: {
      from: "from-neon-blue",
      to: "to-neon-cyan",
      accent: "oklch(0.68 0.23 250)",
      ring: "oklch(0.68 0.23 250 / 0.55)",
    },
    rarity: "Legendary",
  },
  {
    id: "web",
    title: "Web Developer",
    desc: "Craft beautiful, modern web experiences.",
    icon: Code2,
    gradient: "from-emerald-400 to-neon-cyan",
    theme: {
      from: "from-emerald-400",
      to: "to-neon-cyan",
      accent: "oklch(0.75 0.18 160)",
      ring: "oklch(0.75 0.18 160 / 0.55)",
    },
    rarity: "Common",
  },
  {
    id: "wiz",
    title: "Smart Contract Wizard",
    desc: "Solidity expert deploying on-chain.",
    icon: Wand2,
    gradient: "from-orange-400 to-neon-pink",
    theme: {
      from: "from-orange-400",
      to: "to-neon-pink",
      accent: "oklch(0.75 0.18 50)",
      ring: "oklch(0.75 0.18 50 / 0.55)",
    },
    rarity: "Rare",
  },
  {
    id: "hack",
    title: "Early Adopter",
    desc: "Shipped, won, and celebrated.",
    icon: Trophy,
    gradient: "from-amber-300 to-orange-500",
    theme: {
      from: "from-amber-300",
      to: "to-orange-500",
      accent: "oklch(0.85 0.17 85)",
      ring: "oklch(0.85 0.17 85 / 0.6)",
    },
    rarity: "Epic",
  },
];

export function BadgeSelector({ selected, onSelect }: { selected: string; onSelect: (id: string) => void }) {
  return (
    <section id="badges" className="relative mx-auto max-w-7xl px-4 py-24">
      <div className="mb-14 text-center">
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-neon-cyan">Step 01</div>
        <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
          Choose your <span className="text-gradient">badge</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/60">
          Five collectible skill badges — each themed with its own colors, glow, and aura.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {BADGES.map((b, i) => {
          const Icon = b.icon;
          const active = selected === b.id;
          return (
            <motion.button
              key={b.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -6, scale: 1.02 }}
              onClick={() => onSelect(b.id)}
              className="group relative rounded-3xl p-[1.5px] text-left transition"
              style={{
                background: active
                  ? `linear-gradient(135deg, ${b.theme.accent}, var(--neon-cyan))`
                  : "oklch(1 0 0 / 0.08)",
                boxShadow: active ? `0 0 40px ${b.theme.ring}` : "none",
              }}
            >
              <div className="h-full rounded-[calc(1.5rem-1.5px)] bg-[oklch(0.14_0.04_280)] p-6 backdrop-blur">
                <div className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${b.gradient} shadow-lg transition-all duration-500`}>
                  <Icon className="h-7 w-7 text-white" strokeWidth={2} />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold flex items-center justify-between">
                  {b.title}
                </h3>
                <div className="mt-2 flex items-center gap-2">
                  <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-md border ${
                    b.rarity === "Legendary" ? "text-amber-400 border-amber-400/30 bg-amber-400/10" :
                    b.rarity === "Epic" ? "text-purple-400 border-purple-400/30 bg-purple-400/10" :
                    b.rarity === "Rare" ? "text-blue-400 border-blue-400/30 bg-blue-400/10" :
                    "text-gray-400 border-gray-400/30 bg-gray-400/10"
                  }`}>
                    {b.rarity}
                  </span>
                </div>
                <p className="mt-3 text-sm text-white/60">{b.desc}</p>
                {active && (
                  <motion.div
                    layout
                    className="mt-4 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest"
                    style={{ background: `${b.theme.accent.replace(")", " / 0.15)")}`, color: b.theme.accent }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: b.theme.accent }} /> Selected
                  </motion.div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
