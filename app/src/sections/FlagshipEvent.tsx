import { motion } from 'framer-motion';
import { ArrowRight, Rocket, Calendar, Users, Trophy, Sparkles } from 'lucide-react';

interface FlagshipEventProps {
  onLearnMore: () => void;
}

export default function FlagshipEvent({ onLearnMore }: FlagshipEventProps) {
  return (
    <section id="flagship" className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Label */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center text-purple-400 text-sm tracking-[0.3em] mb-6 font-orbitron flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            FLAGSHIP EVENT
            <Sparkles className="w-4 h-4" />
          </motion.div>

          {/* Main Card */}
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="glass-strong rounded-3xl overflow-hidden border border-white/10 hover:border-purple-500/30 transition-all duration-500"
          >
            <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
              {/* Event Poster */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="relative aspect-square md:aspect-auto rounded-2xl overflow-hidden bg-gradient-to-br from-purple-900/40 via-pink-900/30 to-cyan-900/40 flex items-center justify-center border border-white/10"
              >
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9zdmc+')] opacity-50" />
                
                {/* Animated rings */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-4 rounded-full border border-dashed border-purple-400/20"
                />
                
                <div className="text-center z-10">
                  <Rocket className="w-24 h-24 mx-auto text-purple-400 mb-4" />
                  <h3 className="font-orbitron text-4xl md:text-5xl font-black text-white mb-2">
                    COSMIC
                  </h3>
                  <h3 className="font-orbitron text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                    HACKATHON
                  </h3>
                  <p className="text-white/60 text-sm mt-4 tracking-wider">
                    36-HOUR HYBRID HACKATHON
                  </p>
                </div>
                
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent" />
              </motion.div>

              {/* Event Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                className="flex flex-col justify-center"
              >
                <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white mb-4">
                  COSMIC <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">HACKATHON</span>
                </h2>
                
                <p className="text-white/60 text-lg mb-6 leading-relaxed">
                  From idea to impact—design, document, build, and present innovative solutions. 
                  Join us for an epic 36-hour journey of creativity, coding, and collaboration.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                      <Users className="w-5 h-5 text-purple-400" />
                    </div>
                    <span className="text-white/70">Team Size: 2-4 Members</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-pink-400" />
                    </div>
                    <span className="text-white/70">Duration: 36 Hours</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-cyan-400" />
                    </div>
                    <span className="text-white/70">Prizes Worth ₹50,000+</span>
                  </div>
                </div>

                <motion.button
                  onClick={onLearnMore}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 text-white font-orbitron tracking-wider hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 w-fit group font-bold"
                >
                  LEARN MORE
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
