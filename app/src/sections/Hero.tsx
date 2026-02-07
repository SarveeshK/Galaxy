import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import ShinyText from '../components/ShinyText'; // Trigger HMR


import Countdown from '../components/Countdown';
import StarBorder from '../components/StarBorder';

interface HeroProps {
  onRegister: () => void;
  onViewEvents: () => void;
}

export default function Hero({ onRegister, onViewEvents }: HeroProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">


      {/* Main Content */}
      <div className="text-center z-10 max-w-5xl mx-auto pt-24">

        {/* Logos Container */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-6 mb-4 md:mb-8"
        >
          {/* GCEE Logo - Interactive Flippable */}
          <motion.div
            className="w-32 h-32 md:w-40 md:h-40 relative group perspective-1000 cursor-pointer"
            initial={false}
            animate={{ rotateY: isFlipped ? 180 : 0, scale: isFlipped ? 1.1 : 1 }}
            whileHover={{ rotateY: 180, scale: 1.1 }}
            onTap={() => setIsFlipped(!isFlipped)}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Glow behind - adjusted for flip */}
            <div className="absolute inset-0 bg-white/5 group-hover:bg-white/20 blur-3xl rounded-full transition-all duration-500 -z-10" />

            {/* Logo Image */}
            <img
              src="/gcee-logo.png"
              alt="GCEE Logo"
              className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] filter brightness-0 invert"
              style={{ backfaceVisibility: "visible" }}
            />
          </motion.div>
        </motion.div>

        {/* College Name - 3D Effect */}
        <div className="mb-6 relative group">
          <h1 className="relative font-orbitron text-xl md:text-3xl lg:text-4xl font-extrabold tracking-wider text-center px-4 leading-relaxed text-metallic-premium mb-2">
            GOVERNMENT COLLEGE OF ENGINEERING, ERODE
          </h1>
          <h2 className="relative font-orbitron text-sm md:text-lg lg:text-xl font-bold tracking-wider text-center px-4 leading-relaxed text-metallic-premium mb-2 opacity-90">
            ASSOCIATION OF ECE PRESENTS
          </h2>
        </div>


        <div className="flex flex-col items-center justify-center mb-4 md:mb-8 z-20">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full max-w-5xl mx-auto px-4 mb-2 md:mb-4 z-10"
          >
            <img
              src="/galaxy-logo-final.png"
              alt="GALAXY"
              className="w-full h-auto object-contain drop-shadow-[0_0_35px_rgba(255,255,255,0.2)]"
            />
          </motion.div>
          <ShinyText
            text="2K26"
            disabled={false}
            speed={3}
            className="select-none font-orbitron font-bold text-5xl md:text-[100px] lg:text-[120px] tracking-[0.2em] drop-shadow-[0_0_25px_rgba(255,255,255,0.3)] z-0 text-center transform scale-y-90"
            color="#e2e8f0" // Slate 200 (Silver)
            shineColor="#ffffff"
            spread={120}
            direction="left"
          />
        </div>

        {/* Removed redundant motion.h1 since ShinyText handles animation/rendering */}

        <motion.h2
          initial={{ opacity: 0, letterSpacing: '0.1em' }}
          animate={{ opacity: 1, letterSpacing: '0.3em' }}
          transition={{ delay: 0.6, duration: 1.5, ease: "circOut" }}
          className="font-orbitron text-xl md:text-3xl lg:text-4xl font-bold mb-10 text-center"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 via-white to-slate-400 uppercase tracking-[0.3em] drop-shadow-lg">
            WHERE AI MEETS THE UNIVERSE
          </span>
        </motion.h2>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100px" }}
          transition={{ delay: 0.8, duration: 1 }}
          className="h-px bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto mb-8"
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="font-orbitron text-base md:text-lg text-slate-300 mb-12 tracking-widest uppercase"
        >
          Engineering The Future Intelligence
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-white/50 text-sm md:text-base tracking-[0.5em] mb-2 font-orbitron"
        >
          NATIONAL LEVEL TECHNICAL SYMPOSIUM
        </motion.p>

        {/* Date */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-white/80 text-xl md:text-2xl font-orbitron tracking-wider mb-6 md:mb-10"
        >
          FEB 27, 2026
        </motion.p>

        {/* Countdown Timer */}
        <div className="flex justify-center w-full mb-8">
          <Countdown />
        </div>

        {/* Registration Deadline Badge */}
        <div className="flex justify-center w-full mb-10">
          <StarBorder
            as="div"
            className="px-12 md:px-24 py-5 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10"
            color="#e2e8f0" // Silver/Platinum
            speed="4s"
          >
            <span className="text-slate-200 font-orbitron text-sm md:text-base tracking-widest font-bold flex items-center gap-3">
              REGISTRATION CLOSES ON FEB 26
              <span className="hidden md:flex items-center gap-3">
                <span className="text-white">•</span>
                <span className="text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]">HURRY UP!</span>
              </span>
            </span>
          </StarBorder>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
        >
          <button
            onClick={onRegister}
            className="group relative px-12 py-5 overflow-hidden rounded-lg border border-white/20 bg-white/10 backdrop-blur-md text-white font-orbitron tracking-[0.2em] text-lg font-bold uppercase transition-all duration-300 hover:bg-white/20 hover:border-white/40 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]"
          >
            <div className="absolute inset-0 w-1 bg-white transition-all duration-[250ms] ease-out group-hover:w-full opacity-5" />
            <span className="relative flex items-center gap-3">
              REGISTER NOW
            </span>
          </button>

          <button
            onClick={onViewEvents}
            className="group relative px-12 py-5 overflow-hidden rounded-lg border border-white/20 bg-white/10 backdrop-blur-md text-white font-orbitron tracking-[0.2em] text-lg font-bold uppercase transition-all duration-300 hover:bg-white/20 hover:border-white/40 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]"
          >
            <div className="absolute inset-0 w-1 bg-white transition-all duration-[250ms] ease-out group-hover:w-full opacity-5" />
            <span className="relative flex items-center gap-3">
              VIEW EVENTS
            </span>
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="absolute bottom-1 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-white/40 text-xs tracking-wider">SCROLL</span>
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </motion.div>
      </motion.div>

      {/* Decorative Elements */}
    </section>
  );
}
