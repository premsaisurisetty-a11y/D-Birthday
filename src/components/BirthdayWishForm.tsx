import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Pencil, Check, X } from "lucide-react";
import { ref, push, onValue, update, remove } from "firebase/database";
import { db } from "@/lib/firebase";

type Wish = { id?: string; name: string; message: string; emoji: string };

const BirthdayWishForm = () => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editMessage, setEditMessage] = useState("");

  useEffect(() => {
    const wishesRef = ref(db, 'wishes');
    const unsubscribe = onValue(wishesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedWishes = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...(value as any)
        }));
        setWishes(loadedWishes);
      } else {
        setWishes([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && message.trim()) {
      const wishesRef = ref(db, 'wishes');
      push(wishesRef, {
        name: name.trim(),
        message: message.trim(),
        emoji: "💌"
      });
      
      setName("");
      setMessage("");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  const handleEdit = (wish: Wish) => {
    if (wish.id) {
      setEditingId(wish.id);
      setEditName(wish.name);
      setEditMessage(wish.message);
    }
  };

  const saveEdit = (id: string) => {
    if (editName.trim() && editMessage.trim()) {
      const wishRef = ref(db, `wishes/${id}`);
      update(wishRef, {
        name: editName.trim(),
        message: editMessage.trim()
      });
      setEditingId(null);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
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
            Birthday Wishes 💌
          </h2>
          <p className="text-muted-foreground font-body text-lg italic">
            Messages filled with love
          </p>
        </motion.div>

        {wishes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {wishes.map((wish, i) => (
              <motion.div
                key={wish.id || i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="glass-card p-6 md:p-8 hover:glow-pink transition-all duration-300 relative group"
              >
                {editingId === wish.id ? (
                  <div className="space-y-3">
                    <span className="text-3xl block mb-2">{wish.emoji}</span>
                    <textarea 
                      value={editMessage}
                      onChange={(e) => setEditMessage(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-muted/50 border border-border/50 text-foreground font-body focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none text-lg italic"
                      rows={3}
                    />
                    <div className="flex items-center gap-2">
                      <span className="font-display text-primary text-xl">—</span>
                      <input 
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="flex-1 px-3 py-1 rounded-lg bg-muted/50 border border-border/50 text-foreground font-display focus:outline-none focus:ring-1 focus:ring-primary/50"
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                       <button onClick={cancelEdit} className="p-2 rounded-full hover:bg-muted text-muted-foreground transition-colors" title="Cancel">
                         <X size={18} />
                       </button>
                       <button onClick={() => saveEdit(wish.id as string)} className="p-2 rounded-full hover:bg-primary/20 text-primary transition-colors" title="Save">
                         <Check size={18} />
                       </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <button 
                      onClick={() => handleEdit(wish)}
                      className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 p-2 rounded-full hover:bg-muted/50 text-muted-foreground hover:text-primary transition-all duration-300"
                      title="Edit Wish"
                    >
                      <Pencil size={18} />
                    </button>
                    <span className="text-3xl block mb-3">{wish.emoji}</span>
                    <p className="font-body text-foreground/90 text-lg italic mb-4 leading-relaxed whitespace-pre-wrap">
                      "{wish.message}"
                    </p>
                    <p className="font-display text-primary text-xl">— {wish.name}</p>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        )}

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
                className="text-center font-display text-accent text-lg mt-4"
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

export default BirthdayWishForm;
