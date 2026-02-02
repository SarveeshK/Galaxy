import { motion } from 'framer-motion';
import { Sparkles, Trophy, ArrowRight, Star } from 'lucide-react';

interface FlagshipEventProps {
  onLearnMore: () => void;
}

export default function FlagshipEvent({ onLearnMore }: FlagshipEventProps) {
  return (
    <section id="flagship" className="relative py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="glass-premium rounded-[2rem] p-1 md:p-2 overflow-hidden border border-white/10 shadow-2xl">
          <div className="bg-black/90 rounded-[1.8rem] relative overflow-hidden">

            {/* Background Texture */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gray-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="grid lg:grid-cols-2 gap-12 p-8 md:p-16 relative z-10 items-center">

              {/* Content Side */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="space-y-10"
              >
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                  <Star className="w-3 h-3 text-white fill-white animate-pulse" />
                  <span className="text-xs font-orbitron tracking-[0.3em] text-white">FLAGSHIP EVENT</span>
                </div>

                <div>
                  <h2 className="font-orbitron text-5xl md:text-7xl font-black text-white leading-tight mb-2">
                    COSMIC
                  </h2>
                  <h2 className="font-orbitron text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-white to-gray-400 leading-tight">
                    HACKATHON
                  </h2>
                </div>

                <p className="text-gray-400 text-lg max-w-lg leading-relaxed border-l-2 border-white/10 pl-6">
                  A 24-hour intense coding battle where innovation meets execution.
                  Solve real-world problems and claim the ultimate title.
                </p>

                <div className="flex flex-wrap gap-6 pt-4">
                  <div className="glass px-8 py-5 rounded-none border-l-4 border-white">
                    <p className="text-[10px] text-gray-500 tracking-[0.2em] mb-2 uppercase">PRIZE POOL</p>
                    <p className="text-3xl font-bold font-orbitron text-white">₹15,000</p>
                  </div>
                  <div className="glass px-8 py-5 rounded-none border-l-4 border-gray-500">
                    <p className="text-[10px] text-gray-500 tracking-[0.2em] mb-2 uppercase">DURATION</p>
                    <p className="text-3xl font-bold font-orbitron text-white">24h</p>
                  </div>
                </div>

                <button
                  onClick={onLearnMore}
                  className="group flex items-center gap-6 text-white font-orbitron tracking-[0.2em] mt-8 hover:text-gray-300 transition-colors"
                >
                  <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500 relative overflow-hidden">
                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform relative z-10" />
                  </div>
                  <span className="text-sm border-b border-transparent group-hover:border-white/50 transition-all pb-1">VIEW DETAILS</span>
                </button>
              </motion.div>

              {/* Visual Side */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative aspect-square md:aspect-[4/3] lg:aspect-square rounded-[2rem] overflow-hidden glass-premium border border-white/10 flex items-center justify-center group"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* 3D Holo Effect */}
                <div className="relative z-10">
                  <Trophy className="w-48 h-48 text-white/5 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] group-hover:text-white/20 transition-all duration-700 vector-float" />
                </div>

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-[80%] h-[80%] border border-dashed border-white/10 rounded-full animate-[spin_20s_linear_infinite]" />
                  <div className="absolute w-[60%] h-[60%] border border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
