import { motion } from "framer-motion";

const BirthdaySurprise = () => {
  return (
    <section className="py-24 md:py-32 px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]" />
      </div>

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
          className="font-body text-xl md:text-2xl text-muted-foreground italic leading-relaxed"
        >
          Today isn't just your birthday…<br />
          it's the day my favorite person was born.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1 }}
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
