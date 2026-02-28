import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

const MUSIC_URL = "/music/background.mp3";

const MusicPlayer = () => {
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(() => {
        // Autoplay blocked — user must interact first
      });
    }
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      if (isMuted) {
        audioRef.current.play().catch(() => {});
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={MUSIC_URL} loop muted />
      <button
        onClick={toggleMute}
        className="fixed top-6 right-6 z-50 glass-card p-3 rounded-full text-primary hover:glow-pink transition-all duration-300 hover:scale-110"
        aria-label={isMuted ? "Unmute music" : "Mute music"}
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
    </>
  );
};

export default MusicPlayer;
