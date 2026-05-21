import { Hexagon, Github, Twitter, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mx-auto max-w-7xl px-4 py-16">
      <div className="glass-strong rounded-3xl p-10">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <a href="#" className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-neon-purple to-neon-cyan glow-purple">
                <Hexagon className="h-5 w-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-display text-xl font-bold">
                Skill<span className="text-gradient">Mint</span>
              </span>
            </a>
            <p className="mt-4 max-w-sm text-sm text-white/60">
              The premium Web3 onboarding platform. Mint personalized NFT badges without ever touching ETH.
            </p>
            <div className="mt-5 flex gap-3">
              {[Github, Twitter, Globe].map((I, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-black/30 text-white/70 transition hover:border-neon-cyan/50 hover:text-neon-cyan"
                >
                  <I className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-white/50">Team</div>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <li>Frontend · You</li>
              <li>Smart Contracts</li>
              <li>UGF Integration</li>
            </ul>
          </div>

          <div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-white/50">Project</div>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <li>About Us</li>
              <li>Base Sepolia</li>
              <li>UGF Relayer</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row">
          <span>© 2026 SkillMint Inc. All rights reserved.</span>
          <span className="font-mono">Built on Base Sepolia · Powered by UGF</span>
        </div>
      </div>
    </footer>
  );
}
