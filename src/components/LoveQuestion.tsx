import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoveQuestion = () => {
  const [selectedScore, setSelectedScore] = useState<number | null>(null);

  const handleSelect = (score: number) => {
    setSelectedScore(score);
  };

  return (
    <section className="py-24 px-6 relative overflow-hidden bg-background">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display text-4xl md:text-5xl text-foreground mb-12 leading-tight"
        >
          How Much Do You Love Prem? ❤️
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
          {Array.from({ length: 11 }).map((_, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelect(i)}
              className={`w-12 h-12 md:w-16 md:h-16 rounded-full font-display text-xl md:text-2xl flex items-center justify-center transition-all duration-300 ${
                selectedScore === i
                  ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(255,105,180,0.6)]"
                  : "glass-card text-foreground hover:glow-pink hover:text-primary"
              }`}
            >
              {i}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {selectedScore !== null && (
            <motion.div
              key={selectedScore}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`glass-card p-6 md:p-8 inline-block max-w-xl mx-auto w-full transition-all duration-500 ${selectedScore === 10 ? 'glow-pink border-primary/50' : ''}`}
            >
              {selectedScore < 10 ? (
                <div className="space-y-3">
                  <p className="font-display text-2xl text-accent">Wait...</p>
                  <p className="font-body text-xl md:text-2xl text-foreground/90 italic">
                    Only a {selectedScore}? Try again! I know it's higher than that! 🥺
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="font-display text-3xl md:text-4xl text-primary glow-pink mb-4">
                    10/10! I Knew It! 💕
                  </p>
                  <p className="font-body text-lg md:text-xl text-foreground/80 italic leading-relaxed">
                    And I love you infinity times more! Every little thing about you makes my heart skip a beat. You mean the absolute world to me, Delisha. 💖
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default LoveQuestion;
