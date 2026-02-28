import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const CANDLE_COUNT = 5;

const BirthdaySurprise = () => {
  const [showSurprise, setShowSurprise] = useState(false);
  const [candles, setCandles] = useState(Array(CANDLE_COUNT).fill(true));
  const [confettiBurst, setConfettiBurst] = useState(false);

  const blowCandle = (index: number) => {
    setCandles(prev => {
      const next = [...prev];
      next[index] = false;
      return next;
    });
  };

  const handleSurpriseClick = () => {
    setShowSurprise(true);
    setConfettiBurst(true);
    setTimeout(() => setConfettiBurst(false), 3000);
  };

  return (
    <section className="py-24 md:py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]" />
      </div>

      {/* Confetti burst */}
      <AnimatePresence>
        {confettiBurst && Array.from({ length: 40 }).map((_, i) => (
          <motion.span
            key={i}
            initial={{
              opacity: 1,
              x: "50vw",
              y: "50vh",
              scale: 0,
            }}
            animate={{
              opacity: 0,
              x: `${Math.random() * 100}vw`,
              y: `${Math.random() * 100}vh`,
              scale: 1,
              rotate: Math.random() * 720,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 + Math.random() * 1.5, ease: "easeOut" }}
            className="fixed z-50 pointer-events-none text-xl"
          >
            {["🎉", "🎊", "✨", "💖", "🌟", "🎀", "💕"][Math.floor(Math.random() * 7)]}
          </motion.span>
        ))}
      </AnimatePresence>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <span className="text-8xl md:text-9xl block mb-8">🎂</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-display text-4xl md:text-6xl text-foreground mb-8"
        >
          Happy Birthday! 🎉
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-body text-xl md:text-2xl text-muted-foreground italic leading-relaxed mb-12"
        >
          Today isn't just your birthday…<br />
          it's the day my favorite person was born.
        </motion.p>

        {/* Birthday Cake with Candles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-12"
        >
          <p className="font-display text-xl text-primary mb-4">
            Tap the candles to blow them out! 🕯️
          </p>
          <div className="flex justify-center gap-6 md:gap-8 mb-4">
            {candles.map((lit, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center cursor-pointer"
                onClick={() => blowCandle(i)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence>
                  {lit && (
                    <motion.span
                      initial={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="text-2xl md:text-3xl animate-gentle-pulse"
                    >
                      🔥
                    </motion.span>
                  )}
                </AnimatePresence>
                {!lit && <span className="text-2xl md:text-3xl opacity-30">💨</span>}
                <span className="text-3xl md:text-4xl">🕯️</span>
              </motion.div>
            ))}
          </div>
          {candles.every(c => !c) && (
            <motion.p
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="font-display text-2xl text-accent mt-4"
            >
              🎉 Make a wish, Delisha! 🎉
            </motion.p>
          )}
        </motion.div>

        {/* Surprise Button */}
        {!showSurprise ? (
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1 }}
            onClick={handleSurpriseClick}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="glass-card px-8 py-4 text-primary font-display text-xl md:text-2xl hover:glow-gold transition-all duration-500 cursor-pointer"
          >
            Click for a Surprise 🎁
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="glass-card p-8 md:p-12 glow-pink"
          >
            <p className="font-body text-lg md:text-xl text-foreground/90 leading-relaxed italic">
              Delisha, you are the reason my world is full of color. Every laugh we share,
              every moment we spend together — it all means more to me than you'll ever know.
              You deserve all the happiness in the universe, and I will always be here to make
              sure you feel loved, valued, and cherished. 💕
            </p>
            <div className="mt-6 flex justify-center gap-2">
              {["❤️", "💖", "💕", "💗", "💝"].map((h, i) => (
                <motion.span
                  key={i}
                  animate={{ y: [0, -10, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                  className="text-2xl md:text-3xl"
                >
                  {h}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-12 flex justify-center gap-3"
        >
          {["🎈", "🎁", "🎊", "💝", "🎈"].map((emoji, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
              className="text-3xl md:text-4xl"
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BirthdaySurprise;
