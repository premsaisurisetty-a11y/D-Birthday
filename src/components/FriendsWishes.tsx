import { motion } from "framer-motion";
import { useState } from "react";

const sampleWishes = [
  { name: "Prem", message: "Happy Birthday my love! You make every day brighter. ❤️", emoji: "💕" },
  { name: "Best Friend", message: "HBD queen! 🎉 You deserve the world and more!", emoji: "👑" },
  { name: "A Close Friend", message: "Wishing you endless joy and laughter! You're amazing! 🌟", emoji: "✨" },
  { name: "Someone Special", message: "May this year bring you everything your heart desires! 🎂", emoji: "🎁" },
];

const FriendsWishes = () => {
  const [wishes, setWishes] = useState(sampleWishes);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && message.trim()) {
      setWishes(prev => [...prev, { name: name.trim(), message: message.trim(), emoji: "💌" }]);
      setName("");
      setMessage("");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section className="py-24 md:py-32 px-6 relative">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-6xl text-foreground mb-4">
            Messages From All of Us 💌
          </h2>
          <p className="text-muted-foreground font-body text-lg italic">
            Words from people who love you
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {wishes.map((wish, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-card p-6 md:p-8 hover:glow-pink transition-all duration-300"
            >
              <span className="text-3xl block mb-3">{wish.emoji}</span>
              <p className="font-body text-foreground/90 text-lg italic mb-4 leading-relaxed">
                "{wish.message}"
              </p>
              <p className="font-display text-primary text-xl">— {wish.name}</p>
            </motion.div>
          ))}
        </div>

        {/* Submit a wish */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card p-8 md:p-10 max-w-2xl mx-auto"
        >
          <h3 className="font-display text-2xl md:text-3xl text-foreground text-center mb-6">
            Leave a Birthday Wish ✍️
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <textarea
              placeholder="Write your wish here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            />
            <button
              type="submit"
              className="w-full glass-card py-3 text-primary font-display text-lg hover:glow-pink transition-all duration-300 cursor-pointer"
            >
              Send Wish 💕
            </button>
            {submitted && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center font-display text-accent text-lg"
              >
                Thank you for your wish! 🎉
              </motion.p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default FriendsWishes;
