import { useRef, useEffect, useCallback } from "react";

const MUSIC_URL = "/music/background.mp3";

const MusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const hasStarted = useRef(false);

  const startPlayback = useCallback(() => {
    if (audioRef.current && !hasStarted.current) {
      hasStarted.current = true;
      audioRef.current.muted = false;
      audioRef.current.volume = 1;
      audioRef.current.play().catch(() => {});
      document.removeEventListener("click", startPlayback);
      document.removeEventListener("touchstart", startPlayback);
      document.removeEventListener("scroll", startPlayback);
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 1;
      audioRef.current.play().then(() => {
        hasStarted.current = true;
      }).catch(() => {
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

  return <audio ref={audioRef} src={MUSIC_URL} loop />;
};

export default MusicPlayer;
