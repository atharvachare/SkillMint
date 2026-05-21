import { motion } from "framer-motion";
import { Sparkles, type LucideIcon } from "lucide-react";
import type { BadgeTheme } from "./BadgeSelector";

interface Props {
  name?: string;
  title?: string;
  level?: string;
  floating?: boolean;
  theme?: BadgeTheme;
  icon?: LucideIcon;
  tokenId?: string;
  rarity?: "Common" | "Rare" | "Epic" | "Legendary";
}

const DEFAULT_THEME: BadgeTheme = {
  from: "from-neon-purple",
  to: "to-neon-cyan",
  accent: "oklch(0.65 0.28 295)",
  ring: "oklch(0.65 0.28 295 / 0.55)",
};

export function NftCard({
  name = "Your Name",
  title = "AI Engineer",
  level = "Expert",
  floating,
  theme = DEFAULT_THEME,
  icon: Icon = Sparkles,
  tokenId = "0001",
  rarity,
}: Props) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ rotateY: 8, rotateX: -4, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 120 }}
      className={`relative w-full max-w-sm rounded-3xl p-[2px] ${floating ? "animate-float" : ""}`}
      style={{
        background: `linear-gradient(135deg, ${theme.accent}, var(--neon-cyan), var(--neon-pink))`,
        boxShadow: `0 0 60px ${theme.ring}`,
      }}
    >
      <div className="relative overflow-hidden rounded-[calc(1.5rem-2px)] bg-gradient-to-br from-[oklch(0.16_0.05_290)] to-[oklch(0.12_0.04_260)] p-6">
        <motion.div
          className="absolute -inset-1/2 opacity-30"
          style={{
            background: `conic-gradient(from 0deg, transparent, ${theme.accent}, transparent, var(--neon-cyan), transparent)`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />

        {/* Shine sweep */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(110deg, transparent 30%, oklch(1 0 0 / 0.18) 50%, transparent 70%)",
          }}
          animate={{ x: ["-120%", "120%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 }}
        />

        <div className="relative z-10 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neon-cyan">SkillMint</span>
          <span className="rounded-full border border-white/10 bg-black/30 px-2 py-0.5 font-mono text-[10px] text-white/70">
            #{tokenId}
          </span>
        </div>

        <motion.div
          layout
          className="relative z-10 mt-8 flex aspect-square items-center justify-center rounded-2xl border border-white/10"
          style={{
            background: `linear-gradient(135deg, ${theme.accent.replace(")", " / 0.35)")}, oklch(0.85 0.18 195 / 0.2), ${theme.accent.replace(")", " / 0.3)")})`,
          }}
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-4 rounded-full border border-dashed border-white/20"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className={`relative grid h-24 w-24 place-items-center rounded-2xl bg-gradient-to-br ${theme.from} ${theme.to}`}
            style={{ boxShadow: `0 0 40px ${theme.ring}` }}
          >
            <Icon className="h-12 w-12 text-white" strokeWidth={1.5} />
          </motion.div>
        </motion.div>

        <div className="relative z-10 mt-6 space-y-1">
          <div className="font-mono text-[10px] uppercase tracking-widest text-white/50">Awarded to</div>
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-2xl font-bold text-white"
          >
            {name}
          </motion.div>
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gradient-animated text-lg font-semibold"
          >
            {title}
          </motion.div>
          <div className="flex items-center justify-between pt-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/50">Level</span>
            <div className="flex items-center gap-2">
              {rarity && (
                <span className={`px-2 py-0.5 rounded border text-[9px] uppercase tracking-widest font-bold ${
                    rarity === "Legendary" ? "text-amber-400 border-amber-400/30 bg-amber-400/10" :
                    rarity === "Epic" ? "text-purple-400 border-purple-400/30 bg-purple-400/10" :
                    rarity === "Rare" ? "text-blue-400 border-blue-400/30 bg-blue-400/10" :
                    "text-gray-400 border-gray-400/30 bg-gray-400/10"
                }`}>
                  {rarity}
                </span>
              )}
              <span className="font-mono text-xs" style={{ color: theme.accent }}>{level}</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-4 flex items-center justify-between border-t border-white/10 pt-3 font-mono text-[10px] text-white/40">
          <span>Minted on Base Sepolia</span>
          <span>UGF · Gasless</span>
        </div>
      </div>
    </motion.div>
  );
}
