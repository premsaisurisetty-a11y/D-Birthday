import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isOver, setIsOver] = useState(false);

  useEffect(() => {
    const getEndOfDay = () => {
      const now = new Date();
      const end = new Date(now);
      end.setHours(23, 59, 59, 999);
      return end;
    };

    const update = () => {
      const now = new Date();
      const end = getEndOfDay();
      const diff = end.getTime() - now.getTime();

      if (diff <= 0) {
        setIsOver(true);
        return;
      }

      setTimeLeft({
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section className="py-16 md:py-24 px-6 relative">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-3xl md:text-5xl text-foreground mb-4">
            {isOver ? "Birthday's Over! 🥺" : "Birthday Countdown ⏰"}
          </h2>
          <p className="text-muted-foreground font-body text-lg italic mb-10">
            {isOver ? "But our love continues forever! ❤️" : "Make every moment count!"}
          </p>
        </motion.div>

        {!isOver && (
          <div className="flex justify-center gap-4 md:gap-6">
            {timeUnits.map((unit, i) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="glass-card px-5 py-6 md:px-8 md:py-8 min-w-[90px] md:min-w-[120px]"
              >
                <span className="font-display text-3xl md:text-5xl text-gradient-gold block">
                  {String(unit.value).padStart(2, "0")}
                </span>
                <span className="font-body text-sm md:text-base text-muted-foreground mt-2 block">
                  {unit.label}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CountdownTimer;
