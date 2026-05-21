import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Gallery } from "@/components/skillmint/Gallery";
import { motion } from "framer-motion";

export const Route = createFileRoute("/explore")({
  component: Explore,
});

function Explore() {
  const recentMints = [
    { id: "1", name: "Alice Web3", level: "Expert", badgeId: "bc", tokenId: "1023" },
    { id: "2", name: "Bob.eth", level: "Intermediate", badgeId: "web", tokenId: "1024" },
    { id: "3", name: "Charlie", level: "Master", badgeId: "ai", tokenId: "1025" },
    { id: "4", name: "Diana Dev", level: "Beginner", badgeId: "wiz", tokenId: "1026" },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8 pb-20">
         <header className="mb-8 pt-8 text-center md:text-left">
          <motion.h1 initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} className="text-4xl font-display font-bold text-white">Community <span className="text-gradient">Explore</span></motion.h1>
          <motion.p initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} transition={{delay:0.1}} className="text-white/60 mt-2 text-lg">Discover achievement badges minted by developers worldwide.</motion.p>
        </header>

        <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.2}} className="glass-strong rounded-3xl p-8 md:p-12 border border-white/10">
          <div className="[&>section]:!py-0">
            <Gallery minted={recentMints} />
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
