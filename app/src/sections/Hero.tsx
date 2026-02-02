import { motion } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';
import ThreeDText from '../components/ThreeDText';
import MetallicText from '../components/MetallicText';

interface HeroProps {
  onRegister: () => void;
}

export default function Hero({ onRegister }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">


      {/* Main Content */}
      <div className="text-center z-10 max-w-5xl mx-auto pt-24">

        {/* Logos Container */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-6 mb-8"
        >
          {/* GCEE Logo - Interactive Flippable */}
          <motion.div
            className="w-32 h-32 md:w-40 md:h-40 relative group perspective-1000 cursor-pointer"
            whileHover={{ rotateY: 180, scale: 1.1 }}
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
        <div className="mb-6">
          <ThreeDText
            text="GOVERNMENT COLLEGE OF ENGINEERING, ERODE"
            className="text-lg md:text-2xl lg:text-3xl tracking-wider opacity-80 text-gray-300"
          />
        </div>



        <div className="relative mb-4 flex justify-center">
          <MetallicText
            text="GALAXY"
            fontSize={120}
            fontWeight={900}
            className="w-full h-auto cursor-pointer"
            lightColor="#ffffff"
            darkColor="#434343"
            chromaticSpread={1.5}
            liquid={0.8}
            speed={0.2}
            mouseAnimation={true}
          />
        </div>

        {/* Removed redundant motion.h1 since ShinyText handles animation/rendering */}

        <motion.h2
          initial={{ opacity: 0, letterSpacing: '0.1em' }}
          animate={{ opacity: 1, letterSpacing: '0.3em' }}
          transition={{ delay: 0.6, duration: 1.5, ease: "circOut" }}
          className="font-orbitron text-xl md:text-3xl lg:text-4xl font-bold mb-10 text-center"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 via-white to-gray-500 uppercase tracking-[0.3em] drop-shadow-lg">
            The beginning of new era
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
          className="font-orbitron text-base md:text-lg text-gray-400 mb-12 tracking-widest uppercase"
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

        {/* Association */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-8"
        >
          <p className="text-white/30 text-xs tracking-[0.3em] mb-2">POWERED BY</p>
          <p className="text-gray-200 text-lg md:text-xl font-semibold tracking-wide">
            Electronics and Communication Engineering Association
          </p>
        </motion.div>

        {/* Date */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-white/80 text-xl md:text-2xl font-orbitron tracking-wider mb-8"
        >
          FEB 27, 2026
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
        >
          <button
            onClick={onRegister}
            className="group relative px-12 py-5 overflow-hidden rounded-none border border-white/10 bg-white/5 text-white font-orbitron tracking-[0.2em] text-sm uppercase transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]"
          >
            <div className="absolute inset-0 w-1 bg-white transition-all duration-[250ms] ease-out group-hover:w-full opacity-5" />
            <span className="relative flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
              INITIALIZE REGISTRATION
            </span>
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
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </motion.div>
      </motion.div>

      {/* Decorative Elements */}
    </section>
  );
}
