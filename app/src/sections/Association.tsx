import { motion } from 'framer-motion';
import { Network, Cpu, Wifi, Globe, Zap, Database } from 'lucide-react';

const partners = [
  { name: 'IEEE', icon: Globe },
  { name: 'IETE', icon: Wifi },
  { name: 'ISTE', icon: Network },
  { name: 'IEI', icon: Zap },
  { name: 'CSI', icon: Cpu },
  { name: 'ACM', icon: Database },
];

export default function Association() {
  return (
    <section id="association" className="relative py-24 px-4 border-y border-white/5 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="md:w-1/3 text-center md:text-left"
          >
            <h3 className="font-orbitron text-3xl font-bold text-white mb-4">
              STRATEGIC <br />
              <span className="text-gray-500">PARTNERS</span>
            </h3>
            <p className="text-gray-400 leading-relaxed text-sm">
              Collaborating with leading technical bodies to foster innovation and excellence in engineering.
            </p>
          </motion.div>

          {/* Grid Side */}
          <div className="md:w-2/3 grid grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="group flex flex-col items-center gap-3"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/30 transition-all duration-300">
                  <partner.icon className="w-8 h-8 text-gray-500 group-hover:text-white transition-colors" />
                </div>
                <span className="font-orbitron text-[10px] tracking-widest text-gray-600 group-hover:text-white transition-colors">{partner.name}</span>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
