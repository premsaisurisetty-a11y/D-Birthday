import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const scrollToMemories = () => {
    document.getElementById("memories")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)", opacity: 0.7 }} />
      </div>

      {/* Sparkles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <span
          key={i}
          className="absolute animate-sparkle text-accent"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${6 + Math.random() * 10}px`,
            "--duration": `${2 + Math.random() * 4}s`,
            "--delay": `${Math.random() * 5}s`,
          } as React.CSSProperties}
        >
          ✦
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
          Happy Birthday,{" "}
          <span className="text-gradient-romantic">My Love</span> ❤️
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-muted-foreground font-body text-xl md:text-2xl italic mb-12"
        >
          This little corner of the internet is only for you.
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
