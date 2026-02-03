import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Pause, Play, Volume2, VolumeX, SkipForward, SkipBack } from 'lucide-react';

const playlist = [
    {
        title: "Interstellar",
        artist: "Hans Zimmer",
        url: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=music-112907.mp3",
    },
    {
        title: "Cosmic Journey",
        artist: "Galaxy Studio",
        url: "https://cdn.pixabay.com/download/audio/2022/10/25/audio_106734d82b.mp3?filename=electronic-future-beats-117997.mp3",
    },
    {
        title: "Starlight",
        artist: "Neon Sky",
        url: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=light-15121.mp3",
    }
];

export default function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        audioRef.current = new Audio(playlist[currentTrackIndex].url);
        audioRef.current.loop = true;
        audioRef.current.volume = volume;

        return () => {
            audioRef.current?.pause();
            audioRef.current = null;
        };
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.src = playlist[currentTrackIndex].url;
            if (isPlaying) audioRef.current.play().catch(() => setIsPlaying(false));
        }
    }, [currentTrackIndex]);


    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(() => setIsPlaying(false));
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.muted = isMuted;
        }
    }, [isMuted]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume])

    const togglePlay = () => setIsPlaying(!isPlaying);
    const toggleMute = () => setIsMuted(!isMuted);
    const nextTrack = () => setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
    const prevTrack = () => setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);

    return (
        <div className="fixed bottom-6 left-6 z-50 flex items-end">
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, x: -20, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -20, scale: 0.9 }}
                        className="mb-4 bg-black/80 backdrop-blur-xl border border-white/10 p-4 rounded-xl shadow-2xl w-64 absolute bottom-16 left-0"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center animate-pulse-slow">
                                <Music className="w-5 h-5 text-white" />
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-white text-sm font-bold truncate font-orbitron">{playlist[currentTrackIndex].title}</p>
                                <p className="text-white/50 text-xs truncate">{playlist[currentTrackIndex].artist}</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mb-2">
                            <button onClick={prevTrack} className="p-1 hover:text-white text-gray-400 transition-colors"><SkipBack className="w-4 h-4" /></button>
                            <button
                                onClick={togglePlay}
                                className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform"
                            >
                                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                            </button>
                            <button onClick={nextTrack} className="p-1 hover:text-white text-gray-400 transition-colors"><SkipForward className="w-4 h-4" /></button>
                        </div>

                        <div className="flex items-center gap-2">
                            <button onClick={toggleMute} className="text-gray-400 hover:text-white">
                                {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                            </button>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={(e) => setVolume(parseFloat(e.target.value))}
                                className="w-full h-1 bg-white/20 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                            />
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsExpanded(!isExpanded)}
                className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all shadow-lg ${isPlaying
                        ? 'bg-blue-600/20 border-blue-500/50 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                        : 'bg-white/10 border-white/20 text-white/70 hover:bg-white/20 hover:text-white'
                    }`}
            >
                <span className="relative">
                    {isPlaying ? (
                        <span className="flex gap-0.5 items-end h-4">
                            <motion.span animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1 bg-current rounded-full" />
                            <motion.span animate={{ height: [8, 16, 8] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.1 }} className="w-1 bg-current rounded-full" />
                            <motion.span animate={{ height: [4, 10, 4] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} className="w-1 bg-current rounded-full" />
                        </span>
                    ) : (
                        <Music className="w-5 h-5" />
                    )}
                </span>
            </motion.button>
        </div>
    );
}
