import { motion } from "framer-motion";
import { NftCard } from "./NftCard";
import type { Badge } from "./BadgeSelector";

interface Props {
  name: string;
  title: string;
  level: string;
  setName: (v: string) => void;
  setTitle: (v: string) => void;
  setLevel: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  badge: Badge;
}
import { Sparkles, Loader2 } from "lucide-react";
import { useState } from "react";

const LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"];

export function Personalize({ name, title, level, setName, setTitle, setLevel, description, setDescription, badge }: Props) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateAI = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const msgs = [
        `An elite ${title} who has mastered the art of Web3 engineering. Recognized as a ${level} pioneer in the ecosystem.`,
        `Forged in the depths of Base Sepolia. This badge commemorates ${name}'s ascension to ${level} ${title} status.`,
        `A rare on-chain attestation. ${name} has proven exceptional skills and is hereby recognized as a ${level} ${title}.`
      ];
      setDescription(msgs[Math.floor(Math.random() * msgs.length)]);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-24">
      <div className="mb-14 text-center">
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-neon-cyan">Step 02</div>
        <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
          Personalize your <span className="text-gradient">NFT</span>
        </h2>
      </div>

      <div className="grid items-start gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-strong rounded-3xl p-8 space-y-6 min-w-0 w-full"
        >
          <Field label="Your Name">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Chen"
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-neon-cyan focus:shadow-[0_0_20px_oklch(0.85_0.18_195/0.3)]"
            />
          </Field>
          <Field label="Badge Title">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Blockchain Builder"
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-neon-cyan focus:shadow-[0_0_20px_oklch(0.85_0.18_195/0.3)]"
            />
          </Field>
          <Field label="Skill Level">
            <div className="flex flex-wrap gap-2">
              {LEVELS.map((l) => (
                <button
                  key={l}
                  onClick={() => setLevel(l)}
                  className={`rounded-xl border px-3 py-2.5 text-xs sm:text-sm font-medium transition ${
                    level === l
                      ? "border-neon-cyan bg-neon-cyan/15 text-neon-cyan shadow-[0_0_15px_oklch(0.85_0.18_195/0.3)]"
                      : "border-white/10 bg-black/20 text-white/70 hover:border-white/30"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </Field>
          
          <Field label="Description (Metadata)">
            <div className="relative">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Optional description for your NFT metadata"
                className="w-full h-24 rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-neon-cyan focus:shadow-[0_0_20px_oklch(0.85_0.18_195/0.3)] resize-none"
              />
              <button 
                onClick={generateAI}
                disabled={isGenerating}
                className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-lg bg-neon-purple/20 border border-neon-purple/50 px-3 py-1.5 text-xs font-semibold text-neon-purple hover:bg-neon-purple/30 transition-colors disabled:opacity-50"
              >
                {isGenerating ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                AI Enhance
              </button>
            </div>
          </Field>

          <div
            className="rounded-2xl border p-4 text-sm text-white/70 transition-colors duration-500"
            style={{
              borderColor: badge.theme.accent.replace(")", " / 0.35)"),
              background: badge.theme.accent.replace(")", " / 0.10)"),
            }}
          >
            <span className="font-mono text-xs uppercase tracking-widest" style={{ color: badge.theme.accent }}>
              Live preview · {badge.title}
            </span>
            <p className="mt-1">Your NFT updates in real time as you customize it.</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <NftCard
            name={name || "Your Name"}
            title={title || "Badge Title"}
            level={level}
            theme={badge.theme}
            icon={badge.icon}
            rarity={badge.rarity}
            floating
          />
        </motion.div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-[11px] uppercase tracking-widest text-white/60">{label}</span>
      {children}
    </label>
  );
}
