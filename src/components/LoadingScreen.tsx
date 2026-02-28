import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: [1, 1.2, 1], opacity: 1 }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="text-7xl md:text-9xl mb-8 filter drop-shadow-[0_0_20px_rgba(255,105,180,0.6)]"
      >
        ❤️
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="font-display text-2xl md:text-4xl text-foreground text-center"
      >
        Loading all the love for <span className="text-gradient-romantic glow-pink">Delisha</span>...
      </motion.p>
      
      {/* Decorative sparkles */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.span
          key={i}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
            y: [-10, 10, -10]
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
          className="absolute text-xl pointer-events-none"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${30 + Math.random() * 40}%`,
          }}
        >
          ✨
        </motion.span>
      ))}
    </div>
  );
};

export default LoadingScreen;
