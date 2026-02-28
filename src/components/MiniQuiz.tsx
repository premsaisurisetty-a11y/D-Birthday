import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const questions = [
  {
    q: "What's Delisha's favorite thing to do?",
    options: ["Shopping 🛍️", "Spending time with Prem 💕", "Sleeping 😴", "Dancing 💃"],
    answer: 1,
  },
  {
    q: "What makes Delisha smile the most?",
    options: ["Surprises 🎁", "Food 🍕", "Compliments 🥰", "All of the above ✨"],
    answer: 3,
  },
  {
    q: "Delisha's best quality is…",
    options: ["Her kindness 💛", "Her humor 😂", "Her beauty 🌸", "Everything! 💖"],
    answer: 3,
  },
  {
    q: "What does Prem love most about Delisha?",
    options: ["Her smile 😊", "Her voice 🎵", "Her heart ❤️", "Literally everything 💕"],
    answer: 3,
  },
];

const resultMessages = [
  { min: 0, max: 1, text: "You need to know Delisha better! 😜", emoji: "🤔" },
  { min: 2, max: 2, text: "Not bad! You know her a little! 😊", emoji: "👍" },
  { min: 3, max: 3, text: "Great job! You're a true friend! 🌟", emoji: "🎉" },
  { min: 4, max: 4, text: "Perfect! You know Delisha's heart! 💖", emoji: "👑" },
];

const MiniQuiz = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleAnswer = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);
    const isCorrect = optionIndex === questions[currentQ].answer;
    if (isCorrect) setScore(prev => prev + 1);

    setTimeout(() => {
      setSelectedAnswer(null);
      if (currentQ + 1 < questions.length) {
        setCurrentQ(prev => prev + 1);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const getResult = () => resultMessages.find(r => score >= r.min && score <= r.max) || resultMessages[3];

  const restart = () => {
    setCurrentQ(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  return (
    <section className="py-24 md:py-32 px-6 relative">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[400px] h-[400px] rounded-full bg-secondary/10 blur-[100px]" />
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-6xl text-foreground mb-4">
            How Well Do You Know Delisha? 🧠
          </h2>
          <p className="text-muted-foreground font-body text-lg italic">
            Take this fun quiz!
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={currentQ}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="glass-card p-8 md:p-10"
            >
              <p className="font-body text-sm text-muted-foreground mb-2">
                Question {currentQ + 1} of {questions.length}
              </p>
              <h3 className="font-display text-2xl md:text-3xl text-foreground mb-8">
                {questions[currentQ].q}
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {questions[currentQ].options.map((opt, i) => {
                  const isSelected = selectedAnswer === i;
                  const isCorrect = i === questions[currentQ].answer;
                  return (
                    <motion.button
                      key={i}
                      whileHover={{ scale: selectedAnswer === null ? 1.02 : 1 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => selectedAnswer === null && handleAnswer(i)}
                      className={`w-full text-left px-5 py-4 rounded-xl border font-body text-lg transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? isCorrect
                            ? "border-accent bg-accent/20 text-foreground"
                            : "border-destructive bg-destructive/20 text-foreground"
                          : "border-border/50 bg-muted/30 text-foreground/80 hover:bg-muted/50"
                      }`}
                    >
                      {opt}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="glass-card p-8 md:p-12 text-center glow-gold"
            >
              <span className="text-6xl block mb-4">{getResult().emoji}</span>
              <p className="font-display text-3xl md:text-4xl text-foreground mb-4">
                {score}/{questions.length} Correct!
              </p>
              <p className="font-body text-xl text-muted-foreground italic mb-8">
                {getResult().text}
              </p>
              <button
                onClick={restart}
                className="glass-card px-6 py-3 text-primary font-display text-lg hover:glow-pink transition-all duration-300 cursor-pointer"
              >
                Try Again 🔄
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MiniQuiz;
