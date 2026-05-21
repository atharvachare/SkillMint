import { motion } from "framer-motion";
import { Hexagon } from "lucide-react";

export function Navbar({ onConnect, address }: { onConnect: () => void; address: string | null }) {
  const links = [
    { label: "Badges", href: "#badges" },
    { label: "Mint", href: "#mint" },
    { label: "Gallery", href: "#gallery" },
    { label: "How it works", href: "#how" },
    { label: "Features", href: "#features" },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-4 z-50 mx-auto w-full max-w-7xl px-4 md:px-8 transition-all"
    >
      <div className="glass-strong flex items-center justify-between rounded-2xl px-5 py-3 md:py-4">
        <a href="#" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-neon-purple to-neon-cyan shadow-[0_0_20px_oklch(0.65_0.28_295/0.6)]">
            <Hexagon className="h-5 w-5 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-display text-xl font-bold tracking-tight">
            Skill<span className="text-gradient">Mint</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-white/70 transition hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <button
          onClick={onConnect}
          className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-neon-purple via-neon-blue to-neon-cyan px-4 py-2 text-sm font-semibold text-white shadow-[0_0_20px_oklch(0.65_0.28_295/0.5)] transition hover:shadow-[0_0_30px_oklch(0.65_0.28_295/0.8)]"
        >
          {address ? `${address.slice(0, 6)}…${address.slice(-4)}` : "Connect Wallet"}
        </button>
      </div>
    </motion.header>
  );
}
