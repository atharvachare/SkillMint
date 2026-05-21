import { motion } from "framer-motion";

export function Confetti({ count = 40 }: { count?: number }) {
  const colors = [
    "var(--neon-purple)",
    "var(--neon-cyan)",
    "var(--neon-blue)",
    "var(--neon-pink)",
    "oklch(0.85 0.17 85)",
  ];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 0.4;
        const duration = 1.6 + Math.random() * 1.4;
        const size = 4 + Math.random() * 6;
        const color = colors[i % colors.length];
        const rotate = Math.random() * 360;
        return (
          <motion.span
            key={i}
            className="absolute top-0 rounded-sm"
            style={{
              left: `${left}%`,
              width: size,
              height: size * 0.4,
              background: color,
              boxShadow: `0 0 10px ${color}`,
            }}
            initial={{ y: -20, opacity: 1, rotate }}
            animate={{ y: "120%", opacity: [1, 1, 0], rotate: rotate + 360 }}
            transition={{ duration, delay, ease: "easeIn" }}
          />
        );
      })}
    </div>
  );
}
