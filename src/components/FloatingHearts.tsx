import { useMemo } from "react";

const FloatingHearts = () => {
  const hearts = useMemo(() =>
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 12 + Math.random() * 20,
      duration: 6 + Math.random() * 8,
      delay: Math.random() * 10,
      opacity: 0.15 + Math.random() * 0.25,
    })), []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute animate-float-heart text-primary"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            "--duration": `${h.duration}s`,
            "--delay": `${h.delay}s`,
            opacity: h.opacity,
          } as React.CSSProperties}
        >
          ❤
        </span>
      ))}
    </div>
  );
};

export default FloatingHearts;
