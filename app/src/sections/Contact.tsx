import { motion } from 'framer-motion';
import { Phone, MapPin, Sparkles, Rocket } from 'lucide-react';

const coordinators = [
  {
    name: 'Nithish Kumar',
    phone: '+91 63823 10115',
    initial: 'NK',
    color: 'from-purple-500 to-violet-500',
  },
  {
    name: 'Ashwathi S Nair',
    phone: '+91 91506 39036',
    initial: 'AN',
    color: 'from-violet-500 to-fuchsia-500',
  },
  {
    name: 'Azhagu Murugan',
    phone: '+91 84384 05545',
    initial: 'AM',
    color: 'from-fuchsia-500 to-pink-500',
  },
  {
    name: 'Yazhini',
    phone: '+91 63820 76172',
    initial: 'Y',
    color: 'from-pink-500 to-rose-500',
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-white">
              Contact <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Us</span>
            </h2>
            <Sparkles className="w-6 h-6 text-pink-400" />
          </div>
          <p className="text-white/60">
            For queries related to Galaxy 2K26
          </p>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {coordinators.map((coordinator, index) => (
            <motion.div
              key={coordinator.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="glass rounded-2xl p-6 text-center hover:bg-white/10 transition-all group border border-white/10 hover:border-purple-500/30"
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${coordinator.color} flex items-center justify-center shadow-lg group-hover:shadow-purple-500/30 transition-shadow`}>
                <span className="text-white font-bold text-lg">{coordinator.initial}</span>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-purple-400 transition-colors">{coordinator.name}</h3>
              <div className="flex items-center justify-center gap-2 text-white/60 text-sm">
                <Phone className="w-4 h-4" />
                <span>{coordinator.phone}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 text-center border border-white/10"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="w-6 h-6 text-purple-400" />
            <span className="text-white font-semibold">Venue</span>
          </div>
          <p className="text-white/70">
            GCEE Auditorium<br />
            Government College of Engineering, Erode<br />
            Chithode, Erode - 638 316, Tamil Nadu
          </p>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-white/10"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Rocket className="w-5 h-5 text-purple-400" />
              <p className="text-white/40 text-sm">
                © 2026 Galaxy 2K26. All rights reserved.
              </p>
            </div>
            <p className="text-white/40 text-sm">
            </p>
          </div>
        </motion.footer>
      </div>
    </section>
  );
}
