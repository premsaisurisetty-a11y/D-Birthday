import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";
import memory1 from "@/assets/memory-1.png";
import memory2 from "@/assets/memory-2.png";
import memory3 from "@/assets/memory-3.png";
import memory4 from "@/assets/memory-4.png";
import memory5 from "@/assets/memory-5.jpg";
import memory6 from "@/assets/memory-6.png";

const memories = [
  { id: 1, src: memory1, caption: "The day you made my world brighter ☀️", rotate: "-3deg" },
  { id: 2, src: memory2, caption: "Your smile that lights up everything ✨", rotate: "2deg" },
  { id: 3, src: memory3, caption: "Our little adventures together 🌸", rotate: "-1deg" },
  { id: 4, src: memory4, caption: "The moment I knew you were the one 💫", rotate: "3deg" },
  { id: 5, src: memory5, caption: "Every second with you is magic 🌙", rotate: "-2deg" },
  { id: 6, src: memory6, caption: "My favorite person in the world 💕", rotate: "1deg" },
];

const MemoriesGallery = () => {
  const [selectedImage, setSelectedImage] = useState<typeof memories[0] | null>(null);

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
          <p className="font-display text-2xl md:text-3xl text-primary mb-2">
            Delisha & Prem 💕
          </p>
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
              onClick={() => setSelectedImage(memory)}
            >
              <div className="aspect-[4/3] rounded-sm overflow-hidden">
                <img
                  src={memory.src}
                  alt={memory.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <p className="absolute bottom-3 left-0 right-0 text-center font-display text-sm text-background/80 group-hover:text-background transition-colors">
                {memory.caption}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen Preview */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white/80 hover:text-white z-[101]"
            >
              <X size={32} />
            </button>
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={selectedImage.src}
              alt={selectedImage.caption}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="absolute bottom-8 left-0 right-0 text-center font-display text-lg text-white/90">
              {selectedImage.caption}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MemoriesGallery;
