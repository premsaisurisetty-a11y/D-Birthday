import { motion } from "framer-motion";

const memories = [
  { id: 1, caption: "The day you made my world brighter ☀️", rotate: "-3deg" },
  { id: 2, caption: "Your smile that lights up everything ✨", rotate: "2deg" },
  { id: 3, caption: "Our little adventures together 🌸", rotate: "-1deg" },
  { id: 4, caption: "The moment I knew you were the one 💫", rotate: "3deg" },
  { id: 5, caption: "Every second with you is magic 🌙", rotate: "-2deg" },
  { id: 6, caption: "My favorite person in the world 💕", rotate: "1deg" },
];

const MemoriesGallery = () => {
  return (
    <section id="memories" className="py-24 md:py-32 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-6xl text-foreground mb-4">
            Our Memories 📸
          </h2>
          <p className="text-muted-foreground font-body text-lg italic">
            Every photo tells our story
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {memories.map((memory, i) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ scale: 1.05, rotate: 0 }}
              className="polaroid-frame cursor-pointer group"
              style={{ "--rotate": memory.rotate } as React.CSSProperties}
            >
              {/* Replace these placeholder colors with your actual photos */}
              <div className="aspect-[4/3] rounded-sm overflow-hidden bg-muted flex items-center justify-center">
                <span className="text-muted-foreground font-body text-lg text-center px-4">
                  Upload your photo here 📷
                </span>
              </div>
              <p className="absolute bottom-3 left-0 right-0 text-center font-display text-sm text-background/80 group-hover:text-background transition-colors">
                {memory.caption}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MemoriesGallery;
