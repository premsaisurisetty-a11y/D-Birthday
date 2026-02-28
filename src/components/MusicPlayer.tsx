import { useRef, useEffect, useState } from "react";
import { Music, VolumeX } from "lucide-react";

const MUSIC_URL = "/music/background.mp3";

const MusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const playAudio = async () => {
      try {
        if (audioRef.current) {
          audioRef.current.volume = 1;
          await audioRef.current.play();
          setIsPlaying(true);
        }
      } catch (err) {
        console.log("Autoplay prevented by browser, waiting for user interaction");
        setIsPlaying(false);
      }
    };

    // Try to auto-play
    playAudio();

    // Secondary attempt on first interaction
    const handleInteraction = () => {
      if (!isPlaying && audioRef.current) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => { });
      }
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
      document.removeEventListener("touchmove", handleInteraction);
      document.removeEventListener("scroll", handleInteraction);
      document.removeEventListener("wheel", handleInteraction);
    };

    document.addEventListener("click", handleInteraction);
    document.addEventListener("touchstart", handleInteraction);
    document.addEventListener("touchmove", handleInteraction);
    document.addEventListener("scroll", handleInteraction);
    document.addEventListener("wheel", handleInteraction);

    return () => {
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
      document.removeEventListener("touchmove", handleInteraction);
      document.removeEventListener("scroll", handleInteraction);
      document.removeEventListener("wheel", handleInteraction);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => { });
      }
    }
  };

  // Expose a global method to force play (used by Hero button)
  useEffect(() => {
    (window as any).forcePlayMusic = () => {
      if (!isPlaying && audioRef.current) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => { });
      }
    };
    return () => {
      delete (window as any).forcePlayMusic;
    };
  }, [isPlaying]);

  return (
    <>
      <audio ref={audioRef} src={MUSIC_URL} loop />
      <button
        onClick={togglePlay}
        className="fixed bottom-6 left-6 z-50 p-4 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary hover:bg-primary/30 transition-all duration-300 hover:scale-110 active:scale-95"
        style={{ boxShadow: "0 0 20px rgba(255, 105, 180, 0.4)" }}
        title={isPlaying ? "Pause Music" : "Play Music"}
      >
        {isPlaying ? (
          <Music className="w-6 h-6 animate-pulse" />
        ) : (
          <VolumeX className="w-6 h-6 text-muted-foreground" />
        )}
      </button>
    </>
  );
};

export default MusicPlayer;
