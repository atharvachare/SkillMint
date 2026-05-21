import { motion } from "framer-motion";

export function Particles({ count = 20 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const size = Math.random() * 4 + 2;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 6 + 6;
        const colors = ["var(--neon-purple)", "var(--neon-cyan)", "var(--neon-blue)", "var(--neon-pink)"];
        const color = colors[i % colors.length];
        return (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              background: color,
              boxShadow: `0 0 ${size * 4}px ${color}`,
            }}
            animate={{ y: [0, -40, 0], opacity: [0.2, 0.9, 0.2] }}
            transition={{ duration, repeat: Infinity, delay, ease: "easeInOut" }}
          />
        );
      })}
    </div>
  );
}
