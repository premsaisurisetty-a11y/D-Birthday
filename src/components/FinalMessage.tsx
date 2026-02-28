import { motion } from "framer-motion";
import { useMemo } from "react";

const FinalMessage = () => {
  const confetti = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 6,
      size: 8 + Math.random() * 14,
      emoji: ["❤", "💕", "✨", "💖", "🌸"][Math.floor(Math.random() * 5)],
    })), []);

  return (
    <section className="py-24 md:py-40 px-6 relative overflow-hidden min-h-screen flex items-center">
      {/* Falling hearts */}
      {confetti.map((c) => (
        <span
          key={c.id}
          className="absolute animate-float-heart pointer-events-none"
          style={{
            left: `${c.left}%`,
            fontSize: `${c.size}px`,
            "--duration": `${c.duration}s`,
            "--delay": `${c.delay}s`,
          } as React.CSSProperties}
        >
          {c.emoji}
        </span>
      ))}

      {/* Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full bg-accent/10 blur-[150px]" />
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <span className="text-6xl md:text-7xl block mb-8">🎁</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground mb-8 leading-tight"
        >
          I choose you.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="font-display text-3xl md:text-5xl text-gradient-gold mb-12"
        >
          Today. Tomorrow. Always.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="font-body text-lg md:text-xl text-muted-foreground italic"
        >
          You are the best thing that ever happened to me. 💕
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.8 }}
          className="mt-16"
        >
          <span className="text-4xl animate-gentle-pulse inline-block">💝</span>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalMessage;
