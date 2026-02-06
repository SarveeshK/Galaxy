import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Clock, MapPin } from 'lucide-react';
import SpotlightCard from '../components/SpotlightCard';

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const schedule = [
    {
      date: 'FEB 27',
      time: '10:00 AM',
      title: 'REGISTRATION OPENS',
      description: 'Registration opens for all events and workshops via Google Forms.',
    },
    {
      date: 'FEB 27',
      time: '11:59 PM',
      title: 'REGISTRATION CLOSES',
      description: 'Last date to register for all events. No spot registrations available.',
    },
    {
      date: 'FEB 27',
      time: '09:00 AM',
      title: 'GALAXY 2K26',
      description: 'The main event day. All events, workshops, and flagship competitions.',
    },
  ];

  return (
    <section id="timeline" ref={containerRef} className="relative py-16 md:py-24 px-4 overflow-hidden">
      {/* Background Tech Lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-white to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 relative z-10"
        >
          <h2 className="font-orbitron text-4xl md:text-6xl font-black text-white mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-300 via-white to-slate-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">TIMELINE</span>
          </h2>
          <div className="h-1 w-24 bg-white/20 mx-auto rounded-full" />
        </motion.div>

        <div className="relative">
          {/* Central Line - Base */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2" />

          {/* Central Line - Animated Fill */}
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white to-transparent md:-translate-x-1/2 shadow-[0_0_15px_rgba(255,255,255,0.5)]"
          />

          <div className="space-y-16">
            {schedule.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row gap-12 relative ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
              >
                {/* Timeline Node */}
                <div className="absolute left-4 md:left-1/2 -translate-x-[5px] md:-translate-x-[5px] w-[11px] h-[11px] z-10 mt-8">
                  <div className="absolute inset-0 bg-white rounded-full animate-pulse-glow" />
                  <div className="absolute inset-[-4px] border border-white/30 rounded-full animate-ping opacity-20" />
                </div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="ml-12 md:ml-0 md:w-1/2 md:px-12"
                >
                  <SpotlightCard className="w-full p-3 md:p-5" spotlightColor="rgba(255, 255, 255, 0.1)">

                    <div className="flex flex-col gap-1">
                      {/* Date & Time Row */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-white/5 pb-2 mb-1">
                        <span className="text-sm font-bold text-slate-300 tracking-wider uppercase">
                          {item.date}
                        </span>

                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 w-fit">
                          <Clock className="w-3 h-3 text-slate-300" />
                          <span className="text-xs font-orbitron text-slate-300">{item.time}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-orbitron text-lg md:text-xl font-bold text-white group-hover:text-slate-200 transition-colors">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-400 text-xs leading-relaxed max-w-sm">
                        {item.description}
                      </p>

                      {/* Location or Extra Info */}
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                        <MapPin className="w-3 h-3" />
                        <span>Main Auditorium</span>
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>

                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
