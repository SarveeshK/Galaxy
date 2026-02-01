import { motion } from 'framer-motion';
import { ChevronDown, Sparkles, Rocket } from 'lucide-react';

interface HeroProps {
  onRegister: () => void;
  onLogin: () => void;
}

export default function Hero({ onRegister, onLogin }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Animated Galaxy Logo - Top Center */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-16 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-purple-600/30 via-pink-500/20 to-cyan-500/30 border border-purple-500/30 flex items-center justify-center backdrop-blur-sm relative"
        >
          {/* Inner rotating ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-2 rounded-full border border-dashed border-pink-400/30"
          />
          <div className="text-center z-10">
            <Rocket className="w-10 h-10 md:w-12 md:h-12 mx-auto text-purple-400 mb-1" />
            <span className="text-purple-400 font-orbitron text-xs tracking-widest">GALAXY</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <div className="text-center z-10 max-w-5xl mx-auto pt-24">
        {/* College Name */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-bold text-xl md:text-3xl text-white mb-4 tracking-wide"
        >
          Government College of Engineering, Erode
        </motion.h2>

        {/* Event Name */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8, type: 'spring' }}
          className="font-orbitron text-5xl md:text-7xl lg:text-9xl font-black mb-4"
        >
          <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent text-glow">GALAXY</span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8, type: 'spring' }}
          className="font-orbitron text-4xl md:text-6xl lg:text-7xl font-black mb-6"
        >
          <span className="text-white text-glow-purple">2K26</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.8 }}
          className="font-orbitron text-lg md:text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-8 tracking-wider"
        >
          The Beginning of New Era
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-cyan-400 text-lg md:text-xl tracking-[0.2em] mb-2 font-orbitron"
        >
          NATIONAL LEVEL TECHNICAL SYMPOSIUM
        </motion.p>

        {/* Association */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-8"
        >
          <p className="text-white/50 text-sm tracking-[0.3em] mb-2">AN INITIATIVE OF THE</p>
          <p className="text-purple-400 text-xl md:text-2xl font-semibold tracking-wide">
            Electronics and Communication Engineering Association
          </p>
          <p className="text-white/60 text-sm tracking-[0.2em] mt-2">PRESENTS</p>
        </motion.div>

        {/* Date */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-white/80 text-xl md:text-2xl font-orbitron tracking-wider mb-4"
        >
          FEB 13 & 14, 2026
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Be part of <span className="text-purple-400 font-semibold">Galaxy 2K26</span> on{' '}
          <span className="text-pink-400 font-semibold">13th & 14th of February</span> to celebrate creativity
          and technical brilliance. Experience over 36 hours of continuous coding, creativity, and engineering excellence.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <button
            onClick={onRegister}
            className="px-10 py-4 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 text-white font-orbitron tracking-wider font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 group"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              REGISTER NOW
            </span>
          </button>
          <button
            onClick={onLogin}
            className="px-10 py-4 rounded-full glass text-white font-orbitron tracking-wider hover:bg-white/10 transition-all duration-300 border border-white/20 hover:border-purple-500/50 group"
          >
            LOGIN
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-white/40 text-xs tracking-wider">SCROLL</span>
          <ChevronDown className="w-5 h-5 text-purple-400" />
        </motion.div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-2 h-2 rounded-full bg-purple-500 animate-twinkle" />
      <div className="absolute top-1/3 right-20 w-1 h-1 rounded-full bg-pink-400 animate-twinkle" />
      <div className="absolute bottom-1/4 left-1/4 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-twinkle" />
      <div className="absolute top-2/3 right-1/3 w-1 h-1 rounded-full bg-violet-400 animate-twinkle" />
    </section>
  );
}
