import { motion } from 'framer-motion';

const scheduleData = [
  {
    category: 'GENERAL',
    events: [
      { name: 'Inauguration', time: '9:00 AM - 10:00 AM', color: 'bg-yellow-500' },
    ],
  },
  {
    category: 'FLAGSHIP',
    events: [
      { name: 'Cosmic Hackathon', time: '10:00 AM - 4:30 PM', color: 'bg-orange-500' },
    ],
  },
  {
    category: 'TECH',
    events: [
      { name: 'Force Coders', time: '1:30 PM - 4:00 PM', color: 'bg-pink-500' },
    ],
  },
  {
    category: 'NON-TECH',
    events: [
      { name: 'Quest X', time: '10:00 AM - 3:00 PM', color: 'bg-cyan-500' },
    ],
  },
  {
    category: 'QUIZ',
    events: [
      { name: 'Open Quiz', time: '10:00 AM - 12:30 PM', color: 'bg-amber-500' },
    ],
  },
  {
    category: 'WORKSHOP',
    events: [
      { name: 'AI Infrastructure', time: '10:00 AM - 4:00 PM', color: 'bg-emerald-500' },
    ],
  },
];

const day2Schedule = [
  {
    category: 'TECH',
    events: [
      { name: 'Nexus', time: '9:00 AM - 12:30 PM', color: 'bg-purple-500' },
      { name: 'Codemania', time: '10:00 AM - 3:00 PM', color: 'bg-rose-500' },
    ],
  },
  {
    category: 'NON-TECH',
    events: [
      { name: 'Git Wars', time: '1:30 PM - 4:00 PM', color: 'bg-blue-500' },
    ],
  },
  {
    category: 'WORKSHOP',
    events: [
      { name: 'Product Prototyping', time: '9:00 AM - 3:00 PM', color: 'bg-teal-500' },
      { name: 'Threat Detection', time: '9:00 AM - 3:00 PM', color: 'bg-violet-500' },
    ],
  },
];

export default function Schedule() {
  return (
    <section id="schedule" className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-orbitron text-4xl md:text-6xl font-black text-white mb-4">
            <span className="gradient-text">SCHEDULE</span>
          </h2>
          <p className="text-white/60 text-lg tracking-wider">
            Plan your Galaxy 2K26 experience
          </p>
        </motion.div>

        {/* Day 1 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="font-orbitron text-2xl font-bold text-white mb-6 flex items-center gap-4">
            <span className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-lg">
              1
            </span>
            DAY 1 - FEBRUARY 13, 2026
          </h3>

          <div className="glass-strong rounded-2xl p-6 overflow-x-auto">
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
              {scheduleData.map((category, catIndex) => (
                <div key={category.category} className="flex items-center mb-3">
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

        {/* Day 2 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="font-orbitron text-2xl font-bold text-white mb-6 flex items-center gap-4">
            <span className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center text-lg">
              2
            </span>
            DAY 2 - FEBRUARY 14, 2026
          </h3>

          <div className="glass-strong rounded-2xl p-6 overflow-x-auto">
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
              {day2Schedule.map((category, catIndex) => (
                <div key={category.category} className="flex items-center mb-3">
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
                          left: `${(eventIndex * 25)}%`,
                          width: `${Math.random() * 15 + 30}%`,
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
