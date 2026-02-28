import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const LETTER_TEXT = `From the moment you came into my life, everything changed. The colors got brighter, the music got sweeter, and my heart found its home.

You are the first thought in my morning and the last whisper in my night. Every day with you feels like a gift I never knew I deserved.

Thank you for being you — for your laughter that fills my soul, for your warmth that melts every worry, for your love that makes everything beautiful.

I don't know what I did to deserve you, but I promise to spend every day making you feel as special as you make me feel.

You are my forever. My always. My everything.

With all my love,
Yours ❤️`;

const LoveLetter = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          setIsTyping(true);
        }
      },
      { threshold: 0.4 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!isTyping) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i < LETTER_TEXT.length) {
        setDisplayedText(LETTER_TEXT.slice(0, i + 1));
        i++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [isTyping]);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-6 relative">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-6xl text-foreground mb-4">
            A Letter For You 💌
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card p-8 md:p-12 relative glow-pink"
        >
          {/* Subtle glow behind */}
          <div className="absolute -inset-1 rounded-2xl bg-primary/5 blur-xl -z-10" />
          
          <p className="font-body text-lg md:text-xl text-foreground/90 leading-relaxed whitespace-pre-line">
            {displayedText}
            {isTyping && <span className="typing-cursor ml-1">&nbsp;</span>}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default LoveLetter;
