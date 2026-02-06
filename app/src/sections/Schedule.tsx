import { motion } from 'framer-motion';

const scheduleData = [
  {
    category: 'GENERAL',
    events: [
      { name: 'Inauguration', time: '9:00 AM - 10:00 AM', color: 'bg-gray-500' },
    ],
  },
  {
    category: 'FLAGSHIP',
    events: [
      { name: 'Cosmic Hackathon', time: '10:00 AM - 4:30 PM', color: 'bg-slate-400' },
    ],
  },
  {
    category: 'TECH',
    events: [
      { name: 'Force Coders', time: '1:30 PM - 4:00 PM', color: 'bg-zinc-400' },
    ],
  },
  {
    category: 'NON-TECH',
    events: [
      { name: 'Quest X', time: '10:00 AM - 3:00 PM', color: 'bg-neutral-500' },
    ],
  },
  {
    category: 'QUIZ',
    events: [
      { name: 'Open Quiz', time: '10:00 AM - 12:30 PM', color: 'bg-stone-500' },
    ],
  },
];

const day2Schedule = [
  {
    category: 'TECH',
    events: [
      { name: 'Nexus', time: '9:00 AM - 12:30 PM', color: 'bg-slate-500' },
      { name: 'Codemania', time: '10:00 AM - 3:00 PM', color: 'bg-zinc-500' },
    ],
  },
  {
    category: 'NON-TECH',
    events: [
      { name: 'Git Wars', time: '1:30 PM - 4:00 PM', color: 'bg-neutral-400' },
    ],
  },
];

export default function Schedule() {
  return (
    <section id="schedule" className="relative py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="font-orbitron text-4xl md:text-6xl font-black text-white mb-4">
            <span className="bg-gradient-to-r from-gray-200 to-gray-500 bg-clip-text text-transparent">SCHEDULE</span>
          </h2>
          <p className="text-white/60 text-lg tracking-wider">
            Plan your Galaxy 2K26 experience
          </p>
        </motion.div>

        {/* Single Day Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="font-orbitron text-2xl font-bold text-white mb-6 flex items-center gap-4">
            <span className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-500 to-slate-600 flex items-center justify-center text-lg">
              1
            </span>
            FEBRUARY 27, 2026
          </h3>

          <div className="glass-strong rounded-2xl p-6 overflow-x-auto border border-white/10">
            <div className="min-w-[800px]">
              {/* Time Header */}
              <div className="flex mb-4">
                <div className="w-32" />
                <div className="flex-1 flex justify-between text-white/40 text-xs">
                  <span>9:00 AM</span>
                  <span>11:00 AM</span>
                  <span>1:00 PM</span>
                  <span>3:00 PM</span>
                  <span>5:00 PM</span>
                </div>
              </div>

              {/* Events */}
              {[...scheduleData, ...day2Schedule].map((category, catIndex) => (
                <div key={`${category.category}-${catIndex}`} className="flex items-center mb-3">
                  <div className="w-32 text-white/60 text-xs font-orbitron tracking-wider">
                    {category.category}
                  </div>
                  <div className="flex-1 relative h-10">
                    {category.events.map((event, eventIndex) => (
                      <motion.div
                        key={event.name}
                        initial={{ width: 0 }}
                        whileInView={{ width: 'auto' }}
                        transition={{ delay: catIndex * 0.1 + eventIndex * 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                        className={`absolute h-8 rounded-lg ${event.color} flex items-center px-3 cursor-pointer hover:brightness-110 transition-all hover:scale-105`}
                        style={{
                          left: `${(eventIndex * 20)}%`,
                          width: `${Math.random() * 20 + 25}%`,
                        }}
                      >
                        <span className="text-white text-xs font-medium truncate">{event.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
