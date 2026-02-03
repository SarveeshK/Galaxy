import { motion } from 'framer-motion';
import { Trophy, Sparkles, TrendingUp } from 'lucide-react';
import GlareHover from '../components/GlareHover';
import ScrollFloat from '../components/ScrollFloat';

export default function PrizePool() {
  return (
    <section id="prize-pool" className="relative py-32 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6"
          >
            <Trophy className="w-4 h-4 text-yellow-500" />
            <span className="text-xs font-orbitron tracking-[0.2em] text-white">REWARDS SYSTEM</span>
          </motion.div>
          <ScrollFloat
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.03}
            containerClassName="font-orbitron text-4xl md:text-7xl font-black text-white mb-6"
            textClassName="text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500 drop-shadow-2xl"
          >
            PRIZE POOL
          </ScrollFloat>
          <p className="text-gray-400 text-lg tracking-wide max-w-xl mx-auto">
            Compete with the best and claim your rewards.
          </p>
        </div>

        {/* Main Vault Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

          {/* Total Prize Pool */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="h-full"
          >
            <GlareHover
              glareColor="#ffffff"
              glareOpacity={0.2}
              borderRadius="2.5rem"
            >
              <div className="glass-premium rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group border border-white/10 flex flex-col justify-center h-full text-center md:text-left">
                <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                  <Sparkles className="w-32 h-32 text-white" />
                </div>

                <p className="font-orbitron text-xs md:text-sm tracking-[0.3em] text-gray-500 mb-4 uppercase">Total Valuation</p>
                <div className="flex items-baseline gap-2 justify-center md:justify-start">
                  <span className="font-orbitron text-5xl md:text-9xl font-black text-white tracking-tighter">
                    ₹40<span className="text-gray-500">K</span>
                  </span>
                  <span className="text-xl md:text-4xl text-gray-500 font-bold">+</span>
                </div>
                <div className="mt-8 flex items-center gap-4 text-green-400 bg-green-400/10 px-4 py-2 rounded-full w-fit">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-xs font-bold tracking-wider">HIGHEST EVER</span>
                </div>
              </div>
            </GlareHover>
          </motion.div>

          {/* Distribution Cards */}
          <div className="grid gap-6">
            {[
              { title: "Flagship Event", amount: "₹15,000", desc: "Cosmic Hackathon" },
              { title: "Technical Events", amount: "₹15,000", desc: "Across 4 Events" },
              { title: "Non-Technical", amount: "₹10,000", desc: "Quiz & Fun Events" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass p-8 rounded-3xl flex items-center justify-between border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all duration-300"
              >
                <div>
                  <h3 className="text-gray-400 text-sm tracking-[0.2em] uppercase mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-xs">{item.desc}</p>
                </div>
                <p className="font-orbitron text-3xl font-bold text-white">{item.amount}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
