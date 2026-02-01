import { useEffect, useRef, useState, useCallback } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export default function SoundManager() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio('/space-ambient.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    // Try to play immediately
    const playAudio = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play()
          .then(() => {
            setIsMuted(false);
            // Remove listeners once played
            document.removeEventListener('click', playAudio);
            document.removeEventListener('keydown', playAudio);
          })
          .catch((error) => {
            console.log("Autoplay blocked, waiting for interaction:", error);
          });
      }
    };

    playAudio();

    // Add interaction listeners to retry play
    document.addEventListener('click', playAudio);
    document.addEventListener('keydown', playAudio);

    return () => {
      document.removeEventListener('click', playAudio);
      document.removeEventListener('keydown', playAudio);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleSound = useCallback(() => {
    if (!audioRef.current) return;

    if (isMuted) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsMuted(false);
          })
          .catch((error) => {
            console.error("Audio playback failed:", error);
          });
      }
    } else {
      audioRef.current.pause();
      setIsMuted(true);
    }
  }, [isMuted]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Sound toggle button */}
      <button
        onClick={toggleSound}
        className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-all group border border-white/10 hover:border-purple-500/30"
        title={isMuted ? 'Enable Space Ambience' : 'Mute Space Sound'}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
        ) : (
          <Volume2 className="w-5 h-5 text-purple-400 animate-pulse" />
        )}

        {/* Sound waves animation when playing */}
        {!isMuted && (
          <>
            <span className="absolute inset-0 rounded-full border border-purple-400/30 animate-ping" />
            <span className="absolute -inset-2 rounded-full border border-purple-400/10 animate-pulse" />
          </>
        )}
      </button>

      {/* Keyboard hint */}
      <div className="glass rounded-lg px-3 py-1.5 flex items-center gap-2 border border-white/10">
        <Music className="w-3 h-3 text-purple-400" />
        <span className="text-white/50 text-xs keyboard-hint">SPACE for sound</span>
      </div>
    </div>
  );
}
