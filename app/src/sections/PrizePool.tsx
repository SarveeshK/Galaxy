import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Trophy, Sparkles } from 'lucide-react';

export default function PrizePool() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const targetAmount = 100000;

  useEffect(() => {
    if (isInView) {
      const duration = 2500;
      const steps = 75;
      const increment = targetAmount / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= targetAmount) {
          setCount(targetAmount);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView]);

  return (
    <section id="prize-pool" className="relative py-20 px-4">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-500/20 to-cyan-500/20 rounded-3xl blur-3xl" />
          
          {/* Card */}
          <div className="relative glass-strong rounded-3xl p-8 md:p-12 text-center animate-float border border-purple-500/20">
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-purple-500/50 rounded-tl-3xl" />
            <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-pink-500/50 rounded-tr-3xl" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-cyan-500/50 rounded-bl-3xl" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-purple-500/50 rounded-br-3xl" />
            
            {/* Sparkles */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="absolute top-4 right-4"
            >
              <Sparkles className="w-6 h-6 text-pink-400 animate-pulse" />
            </motion.div>
            
            {/* Trophy Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="mb-6"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <Trophy className="w-10 h-10 text-white" />
              </div>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="text-white/60 text-sm tracking-[0.3em] mb-4 font-orbitron"
            >
              PRIZE POOL
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-2"
            >
              <span className="text-4xl md:text-6xl font-orbitron text-purple-400">₹</span>
              <span className="text-5xl md:text-7xl lg:text-8xl font-orbitron font-black bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
                {count.toLocaleString()}
              </span>
              <span className="text-3xl md:text-5xl font-orbitron text-pink-400">+</span>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="text-white/40 text-sm mt-4 tracking-wider"
            >
              WORTH OF EXCITING PRIZES TO BE WON
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
