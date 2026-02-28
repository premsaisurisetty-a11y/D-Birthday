import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isOver, setIsOver] = useState(false);

  useEffect(() => {
    const getTargetDate = () => {
      const now = new Date();
      // We only count down to March 2nd of the current year.
      // E.g., once March 2nd 2026 hits, it stops and stays at 0.
      return new Date(now.getFullYear(), 2, 2, 0, 0, 0, 0);
    };

    const update = () => {
      const now = new Date();
      const end = getTargetDate();
      const diff = end.getTime() - now.getTime();

      if (diff <= 0) {
        setIsOver(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
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
            {isOver ? "Happy Birthday! 🎉" : "Birthday Countdown ⏰"}
          </h2>
          <p className="text-muted-foreground font-body text-lg italic mb-10">
            {isOver ? "It's finally here! Enjoy your special day! ❤️" : "Make every moment count!"}
          </p>
        </motion.div>

        <div className="flex justify-center flex-wrap gap-4 md:gap-6">
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
      </div>
    </section>
  );
};

export default CountdownTimer;
