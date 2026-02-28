import { motion } from "framer-motion";
import { useMemo } from "react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const scrollToMemories = () => {
    document.getElementById("memories")?.scrollIntoView({ behavior: "smooth" });
  };

  const balloons = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: 5 + Math.random() * 90,
      delay: Math.random() * 6,
      duration: 8 + Math.random() * 6,
      size: 30 + Math.random() * 25,
      color: ["hsl(340 80% 75%)", "hsl(280 40% 75%)", "hsl(40 90% 70%)", "hsl(200 60% 70%)", "hsl(340 60% 85%)"][Math.floor(Math.random() * 5)],
    })), []);

  const confetti = useMemo(() =>
    Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 4,
      size: 6 + Math.random() * 8,
      emoji: ["✨", "🌸", "💕", "⭐", "🎀"][Math.floor(Math.random() * 5)],
    })), []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)", opacity: 0.75 }} />
      </div>

      {/* Floating Balloons */}
      {balloons.map((b) => (
        <span
          key={b.id}
          className="absolute animate-float-balloon pointer-events-none"
          style={{
            left: `${b.left}%`,
            bottom: "-10%",
            fontSize: `${b.size}px`,
            "--duration": `${b.duration}s`,
            "--delay": `${b.delay}s`,
          } as React.CSSProperties}
        >
          🎈
        </span>
      ))}

      {/* Soft confetti */}
      {confetti.map((c) => (
        <span
          key={`c-${c.id}`}
          className="absolute animate-sparkle pointer-events-none"
          style={{
            left: `${c.left}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${c.size}px`,
            "--duration": `${2 + Math.random() * 4}s`,
            "--delay": `${c.delay}s`,
          } as React.CSSProperties}
        >
          {c.emoji}
        </span>
      ))}

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-accent font-body text-lg md:text-xl tracking-[0.3em] uppercase mb-6"
        >
          A Surprise For You
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground mb-6 leading-tight"
        >
          Happy Birthday{" "}
          <span className="text-gradient-romantic">Delisha</span> ❤️
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-muted-foreground font-body text-xl md:text-2xl italic mb-12 leading-relaxed"
        >
          You are the most beautiful soul I know. Your smile lights up my world,
          and every moment with you is a treasure I hold close to my heart. 💕
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          onClick={scrollToMemories}
          className="glass-card px-8 py-4 text-primary font-display text-xl md:text-2xl hover:glow-pink transition-all duration-500 hover:scale-105 cursor-pointer"
        >
          Start the Surprise 💌
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;
