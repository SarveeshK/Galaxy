import { motion } from 'framer-motion';
import { Cpu, Radio, Zap, Sparkles } from 'lucide-react';

const partners = [
  { name: 'IEEE', icon: Cpu, fullName: 'IEEE Student Branch' },
  { name: 'ECEA', icon: Radio, fullName: 'ECE Association' },
  { name: 'INNOVATION', icon: Zap, fullName: 'Innovation Cell' },
];

export default function Association() {
  return (
    <section id="association" className="relative py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-8">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <p className="text-white/60 text-sm tracking-[0.3em] font-orbitron">
              IN ASSOCIATION WITH
            </p>
            <Sparkles className="w-5 h-5 text-pink-400" />
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="group cursor-pointer"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl glass flex items-center justify-center group-hover:bg-purple-500/10 transition-all duration-300 border border-white/10 group-hover:border-purple-400/40 shadow-lg group-hover:shadow-purple-500/20">
                    <partner.icon className="w-10 h-10 md:w-12 md:h-12 text-white/50 group-hover:text-purple-400 transition-colors" />
                  </div>
                  <div className="text-center">
                    <p className="text-white/80 font-orbitron text-sm tracking-wider group-hover:text-purple-400 transition-colors">
                      {partner.name}
                    </p>
                    <p className="text-white/40 text-xs mt-1">
                      {partner.fullName}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
