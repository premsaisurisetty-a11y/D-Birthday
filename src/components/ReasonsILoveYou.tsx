import { motion } from "framer-motion";

const reasons = [
  { text: "Your smile", emoji: "😊" },
  { text: "Your kindness", emoji: "💛" },
  { text: "The way you understand me", emoji: "🤝" },
  { text: "Your beautiful soul", emoji: "✨" },
  { text: "How you make everything better", emoji: "🌸" },
  { text: "Your laughter", emoji: "😄" },
  { text: "The way you look at me", emoji: "👀" },
  { text: "Your strength", emoji: "💪" },
  { text: "How safe I feel with you", emoji: "🏠" },
  { text: "Everything about you", emoji: "💖" },
];

const ReasonsILoveYou = () => {
  return (
    <section className="py-24 md:py-32 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-6xl text-foreground mb-4">
            Reasons I Love You 💖
          </h2>
          <p className="text-muted-foreground font-body text-lg italic">
            And this is just the beginning…
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {reasons.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="glass-card p-5 text-center cursor-default group"
            >
              <span className="text-3xl block mb-3 group-hover:scale-125 transition-transform duration-300">
                {reason.emoji}
              </span>
              <p className="font-body text-sm md:text-base text-foreground/85">
                {reason.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReasonsILoveYou;
