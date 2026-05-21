import { motion } from "framer-motion";
import { NftCard } from "./NftCard";
import { BADGES, type Badge } from "./BadgeSelector";

export interface MintedNft {
  id: string;
  name: string;
  level: string;
  badgeId: string;
  tokenId: string;
}

const SEED: MintedNft[] = [
  { id: "s1", name: "Ada Sato", level: "Expert", badgeId: "ai", tokenId: "0142" },
  { id: "s2", name: "Mateo Ruiz", level: "Advanced", badgeId: "bc", tokenId: "0231" },
  { id: "s3", name: "Priya Nair", level: "Expert", badgeId: "hack", tokenId: "0309" },
  { id: "s4", name: "Liam Chen", level: "Intermediate", badgeId: "web", tokenId: "0418" },
  { id: "s5", name: "Zara Ali", level: "Expert", badgeId: "wiz", tokenId: "0527" },
];

export function Gallery({ minted }: { minted: MintedNft[] }) {
  const all = [...minted, ...SEED];

  return (
    <section id="gallery" className="relative mx-auto max-w-7xl px-4 py-24">
      <div className="absolute inset-x-10 top-20 -z-10 h-80 rounded-full bg-neon-cyan/10 blur-[120px]" />
      <div className="mb-14 text-center">
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-neon-cyan">Live Gallery</div>
        <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
          Recently <span className="text-gradient">minted</span> badges
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/60">
          A glimpse into the SkillMint network. Every badge below was minted gaslessly.
        </p>
      </div>

      <div className="-mx-4 overflow-x-auto px-4 pb-6 [scrollbar-width:thin]">
        <div className="flex gap-6 lg:grid lg:grid-cols-3 xl:grid-cols-4 lg:gap-6">
          {all.map((nft, i) => {
            const badge: Badge = BADGES.find((b) => b.id === nft.badgeId) ?? BADGES[0];
            const isMine = minted.some((m) => m.id === nft.id);
            return (
              <motion.div
                key={nft.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 8) * 0.05 }}
                whileHover={{ y: -8 }}
                className="relative w-[280px] shrink-0 lg:w-auto"
              >
                {isMine && (
                  <div className="absolute -top-2 left-1/2 z-20 -translate-x-1/2 rounded-full bg-gradient-to-r from-neon-purple to-neon-cyan px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white shadow-[0_0_20px_oklch(0.65_0.28_295/0.6)]">
                    Yours
                  </div>
                )}
                <NftCard
                  name={nft.name}
                  title={badge.title}
                  level={nft.level}
                  theme={badge.theme}
                  icon={badge.icon}
                  tokenId={nft.tokenId}
                  rarity={badge.rarity}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
