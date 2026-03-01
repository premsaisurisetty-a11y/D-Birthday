import { motion, AnimatePresence } from "framer-motion";

interface CakeProps {
    candles: boolean[];
    onBlowCandle: (index: number) => void;
    allBlown: boolean;
    isCut: boolean;
}

const Cake = ({ candles, onBlowCandle, allBlown, isCut }: CakeProps) => {
    return (
        <div className="relative flex flex-col items-center justify-center py-20 pb-10 scale-90 md:scale-100">
            {/* Plate */}
            <div className="absolute bottom-0 w-64 h-4 bg-muted/30 rounded-full blur-[2px] border border-white/10" />

            {/* Cake Body */}
            <div className="relative w-48 flex flex-col items-center">
                {/* Top Layer */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{
                        y: isCut ? -10 : 0,
                        opacity: 1,
                        rotateX: isCut ? 5 : 0
                    }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className="relative w-32 h-16 bg-[#ff85a2] rounded-t-3xl border-b-4 border-[#f06292] z-30 shadow-lg"
                    style={{ background: "linear-gradient(to bottom, #ff85a2, #f06292)" }}
                >
                    {/* Icing Drips */}
                    <div className="absolute top-0 w-full h-4 bg-white/40 rounded-t-3xl" />
                    <div className="absolute -bottom-2 left-4 w-4 h-6 bg-[#ff85a2] rounded-full z-10" />
                    <div className="absolute -bottom-1 left-12 w-3 h-4 bg-[#ff85a2] rounded-full z-10" />
                    <div className="absolute -bottom-3 left-20 w-4 h-8 bg-[#ff85a2] rounded-full z-10" />

                    {/* Cut Line */}
                    {isCut && (
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full bg-[#d81b60]/50 z-40 origin-top"
                        />
                    )}

                    {/* Candles on Top */}
                    <div className="absolute -top-12 inset-x-0 flex justify-center gap-4 px-2">
                        {candles.map((lit, i) => (
                            <motion.div
                                key={i}
                                className="relative flex flex-col items-center cursor-pointer"
                                onClick={() => !isCut && onBlowCandle(i)}
                                whileHover={!isCut ? { scale: 1.1, y: -5 } : {}}
                                whileTap={!isCut ? { scale: 0.9 } : {}}
                            >
                                <AnimatePresence>
                                    {lit && (
                                        <motion.div
                                            initial={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0, y: -20 }}
                                            className="absolute -top-6 w-4 h-6 bg-orange-400 rounded-full blur-[2px] animate-pulse"
                                            style={{
                                                boxShadow: "0 0 10px #fbbf24, 0 0 20px #f59e0b",
                                                background: "radial-gradient(circle, #fff7ed, #fbbf24, #f59e0b)"
                                            }}
                                        />
                                    )}
                                </AnimatePresence>
                                <div className="w-2 h-10 bg-gradient-to-b from-blue-300 to-blue-500 rounded-full shadow-inner" />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Middle Layer */}
                <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="w-40 h-16 bg-[#f48fb1] border-b-4 border-[#e91e63] z-20 -mt-2 shadow-lg"
                    style={{ background: "linear-gradient(to bottom, #f48fb1, #ec407a)" }}
                >
                    {isCut && (
                        <motion.div
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full bg-[#d81b60]/50 z-40 origin-top"
                        />
                    )}
                </motion.div>

                {/* Bottom Layer */}
                <motion.div
                    initial={{ y: 60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-48 h-20 bg-[#f06292] rounded-b-xl border-b-8 border-[#d81b60] z-10 -mt-2 shadow-2xl relative"
                    style={{ background: "linear-gradient(to bottom, #f06292, #e91e63)" }}
                >
                    {isCut && (
                        <motion.div
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            className="absolute top-0 left-1/2 -translate-x-1/2 w-[4px] h-full bg-[#ad1457]/50 z-40 origin-top"
                        />
                    )}
                </motion.div>
            </div>

            {/* Sprinkles container */}
            <div className="absolute inset-0 pointer-events-none">
                {allBlown && Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 0 }}
                        animate={{
                            opacity: [0, 1, 0],
                            y: [0, -50 - Math.random() * 50],
                            x: [(Math.random() - 0.5) * 100],
                            rotate: Math.random() * 360
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                        className="absolute left-1/2 top-1/2 text-sm"
                    >
                        {["💖", "✨", "🎀", "🌟"][Math.floor(Math.random() * 4)]}
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Cake;
