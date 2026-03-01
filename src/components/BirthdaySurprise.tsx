import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ref, set, onValue, remove } from "firebase/database";
import { db } from "@/lib/firebase";
import { Pencil, Trash2 } from "lucide-react";
import Cake from "./Cake";

const CANDLE_COUNT = 5;

const BirthdaySurprise = () => {
  const [showSurprise, setShowSurprise] = useState(false);
  const [candles, setCandles] = useState(Array(CANDLE_COUNT).fill(true));
  const [confettiBurst, setConfettiBurst] = useState(false);
  const [premWish, setPremWish] = useState("");
  const [premWishSubmitted, setPremWishSubmitted] = useState(false);

  useEffect(() => {
    const wishRef = ref(db, 'prem_wish');
    const unsubscribe = onValue(wishRef, (snapshot) => {
      const data = snapshot.val();
      if (data && data.message) {
        setPremWish(data.message);
        setPremWishSubmitted(true);
      } else {
        setPremWish("");
        setPremWishSubmitted(false);
      }
    });
    return () => unsubscribe();
  }, []);

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
    <section id="surprise" className="py-24 md:py-32 px-6 relative overflow-hidden">
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
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-12"
        >
          <div className="flex flex-col items-center">
            <p className="font-display text-xl text-primary mb-2">
              Tap the candles to blow them out! 🕯️
            </p>
            <Cake
              candles={candles}
              onBlowCandle={blowCandle}
              allBlown={candles.every(c => !c)}
            />
          </div>
          {candles.every(c => !c) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 flex flex-col items-center w-full"
            >
              <p className="font-display text-2xl text-accent mb-6">
                🎉 Make a wish, Delisha! 🎉
              </p>

              {!premWishSubmitted ? (
                <div className="w-full max-w-md bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <h3 className="font-display text-xl text-primary mb-3">Write A Wish To Prem 💌</h3>
                  <textarea
                    value={premWish}
                    onChange={(e) => setPremWish(e.target.value)}
                    placeholder="Your special message for Prem..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none mb-4"
                  />
                  <button
                    onClick={() => {
                      if (premWish.trim()) {
                        const wishRef = ref(db, 'prem_wish');
                        set(wishRef, {
                          message: premWish.trim()
                        });
                        setPremWishSubmitted(true);
                      }
                    }}
                    className="w-full glass-card py-2 text-primary font-display text-lg hover:glow-pink transition-all duration-300 cursor-pointer"
                  >
                    Send Wish 💕
                  </button>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full max-w-md glass-card p-6 border border-primary/30 relative group mt-4"
                >
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button
                      onClick={() => setPremWishSubmitted(false)}
                      className="p-2 rounded-full hover:bg-muted/50 text-muted-foreground hover:text-primary transition-all duration-300"
                      title="Edit Wish"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => {
                        const wishRef = ref(db, 'prem_wish');
                        remove(wishRef);
                      }}
                      className="p-2 rounded-full hover:bg-muted/50 text-muted-foreground hover:text-destructive transition-all duration-300"
                      title="Delete Wish"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <p className="font-body text-foreground/90 text-lg italic mb-4 leading-relaxed whitespace-pre-wrap mt-2">
                    "{premWish}"
                  </p>
                  <p className="font-display text-primary text-xl glow-pink">— Prem's Special Wish Received 💕</p>
                </motion.div>
              )}
            </motion.div>
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
