import { motion } from "framer-motion";

const VideoSection = () => {
  return (
    <section className="py-24 md:py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full bg-secondary/10 blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-6xl text-foreground mb-4">
            A Special Message For You 🎬
          </h2>
          <p className="text-muted-foreground font-body text-lg italic">
            Press play and feel the love
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="glass-card p-4 md:p-6 glow-pink"
        >
          <div className="aspect-video rounded-xl overflow-hidden bg-muted flex items-center justify-center">
            <div className="text-center p-8">
              <span className="text-6xl block mb-4">🎥</span>
              <p className="font-display text-2xl md:text-3xl text-foreground mb-2">
                Coming Soon
              </p>
              <p className="font-body text-muted-foreground italic">
                A special video message is being prepared just for you, Delisha! 💕
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoSection;
