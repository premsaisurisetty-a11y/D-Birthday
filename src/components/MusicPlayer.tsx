import { useState, useRef, useEffect, useCallback } from "react";
import { Volume2, VolumeX } from "lucide-react";

const MUSIC_URL = "/music/background.mp3";

const MusicPlayer = () => {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const hasStarted = useRef(false);

  const startPlayback = useCallback(() => {
    if (audioRef.current && !hasStarted.current) {
      hasStarted.current = true;
      audioRef.current.muted = false;
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(() => {});
      // Remove listeners after first interaction
      document.removeEventListener("click", startPlayback);
      document.removeEventListener("touchstart", startPlayback);
      document.removeEventListener("scroll", startPlayback);
    }
  }, []);

  useEffect(() => {
    // Try autoplay immediately
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.play().then(() => {
        hasStarted.current = true;
      }).catch(() => {
        // Autoplay blocked — wait for first user interaction
        document.addEventListener("click", startPlayback);
        document.addEventListener("touchstart", startPlayback);
        document.addEventListener("scroll", startPlayback);
      });
    }
    return () => {
      document.removeEventListener("click", startPlayback);
      document.removeEventListener("touchstart", startPlayback);
      document.removeEventListener("scroll", startPlayback);
    };
  }, [startPlayback]);

  const toggleMute = () => {
    if (audioRef.current) {
      const newMuted = !isMuted;
      audioRef.current.muted = newMuted;
      if (!newMuted && audioRef.current.paused) {
        audioRef.current.play().catch(() => {});
      }
      setIsMuted(newMuted);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={MUSIC_URL} loop />
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
