import { motion } from 'framer-motion';
import { ArrowRight, Calendar, MapPin, Users, Cpu, Box, Shield, Sparkles } from 'lucide-react';

const workshops = [
  {
    id: 1,
    title: 'AI INFRASTRUCTURE',
    subtitle: 'FROM BIG PICTURE TO EVERYDAY REALITY',
    description: 'Understanding AI Infrastructure - From Big Picture to Everyday Reality',
    icon: Cpu,
    date: 'Feb 13',
    time: '10:00 AM - 4:00 PM',
    venue: 'SCPS Lab',
    speakers: [
      { name: 'Industry Expert 1', role: 'Senior Technical Leader' },
      { name: 'Industry Expert 2', role: 'Principal Engineer' },
    ],
    color: 'from-purple-500 to-violet-500',
  },
  {
    id: 2,
    title: 'PRODUCT PROTOTYPING',
    subtitle: 'FOR INDUSTRY APPLICATIONS',
    description: 'Build Industry-Ready Prototypes',
    icon: Box,
    date: 'Feb 14',
    time: '9:00 AM - 3:00 PM',
    venue: 'ECE Lab',
    speakers: [
      { name: 'Industry Expert', role: 'Founder & CEO' },
    ],
    color: 'from-pink-500 to-rose-500',
  },
  {
    id: 3,
    title: 'THREAT DETECTION',
    subtitle: 'MODELLING',
    description: 'Master Cybersecurity Defense Strategies',
    icon: Shield,
    date: 'Feb 14',
    time: '9:00 AM - 3:00 PM',
    venue: 'ECE Lab',
    speakers: [
      { name: 'Security Expert', role: 'Co-Founder, Security Firm' },
    ],
    color: 'from-cyan-500 to-blue-500',
  },
];

export default function Workshops() {
  return (
    <section id="workshops" className="relative py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-cyan-400" />
            <h2 className="font-orbitron text-4xl md:text-6xl font-black text-white">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">WORKSHOPS</span>
            </h2>
            <Sparkles className="w-6 h-6 text-purple-400" />
          </div>
          <p className="text-white/60 text-lg tracking-wider">
            Learn from industry experts
          </p>
        </motion.div>

        {/* Workshops */}
        <div className="space-y-8">
          {workshops.map((workshop, index) => (
            <motion.div
              key={workshop.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.01 }}
              className="glass-strong rounded-3xl overflow-hidden group hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 border border-white/10 hover:border-purple-500/30"
            >
              <div className="grid md:grid-cols-2 gap-8 p-8">
                {/* Left - Image/Icon */}
                <div className={`relative aspect-video md:aspect-auto rounded-2xl overflow-hidden bg-gradient-to-br ${workshop.color} flex items-center justify-center`}>
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9zdmc+')] opacity-50" />
                  <div className="text-center z-10">
                    <workshop.icon className="w-20 h-20 mx-auto text-white/80 mb-4" />
                    <h3 className="font-orbitron text-2xl md:text-3xl font-bold text-white">
                      {workshop.title}
                    </h3>
                    <p className="text-white/70 text-sm mt-2">
                      {workshop.subtitle}
                    </p>
                  </div>
                </div>

                {/* Right - Info */}
                <div className="flex flex-col justify-center">
                  <h3 className="font-orbitron text-2xl font-bold text-white mb-2">
                    {workshop.title}
                  </h3>
                  <p className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent text-sm mb-4 font-semibold">
                    {workshop.subtitle}
                  </p>
                  
                  <p className="text-white/60 mb-6">
                    {workshop.description}
                  </p>

                  {/* Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-white/70">
                      <Calendar className="w-4 h-4 text-purple-400" />
                      <span className="text-sm">{workshop.date}, {workshop.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/70">
                      <MapPin className="w-4 h-4 text-pink-400" />
                      <span className="text-sm">{workshop.venue}</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/70">
                      <Users className="w-4 h-4 text-cyan-400" />
                      <span className="text-sm">{workshop.speakers.length} Speaker{workshop.speakers.length > 1 ? 's' : ''}</span>
                    </div>
                  </div>

                  {/* Speakers */}
                  <div className="mb-6">
                    <p className="text-white/40 text-xs tracking-wider mb-2">SPEAKERS</p>
                    <div className="space-y-2">
                      {workshop.speakers.map((speaker, i) => (
                        <div key={i} className="text-sm">
                          <span className="text-white">{speaker.name}</span>
                          <span className="text-white/50"> - {speaker.role}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 text-white font-orbitron tracking-wider hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 w-fit group/btn font-bold"
                  >
                    LEARN MORE
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
