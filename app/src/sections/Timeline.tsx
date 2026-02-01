import { motion } from 'framer-motion';
import { Users, ClipboardCheck, Coffee, Code, Trophy, Clock, Sparkles } from 'lucide-react';

const timelineEvents = [
  {
    time: '08:00 AM',
    title: 'Team Check-in',
    description: 'Teams come together at the venue to kick off the Galaxy 2K26 Symposium, setting the tone for collaboration and innovation throughout the day.',
    icon: Users,
    color: 'from-purple-500 to-violet-500',
  },
  {
    time: '09:00 AM',
    title: 'Inauguration Ceremony',
    description: 'The official opening ceremony with keynote speeches from faculty and industry experts, followed by the unveiling of the event.',
    icon: Trophy,
    color: 'from-violet-500 to-fuchsia-500',
  },
  {
    time: '10:00 AM',
    title: 'Events Begin',
    description: 'Technical and non-technical events commence across multiple venues. Participants engage in coding challenges, quizzes, and creative competitions.',
    icon: Code,
    color: 'from-fuchsia-500 to-pink-500',
  },
  {
    time: '11:00 AM',
    title: 'Refreshment Time',
    description: 'Participants take a quick break to recharge with morning snacks. It is a brief interval to refresh before heading into the next phase.',
    icon: Coffee,
    color: 'from-pink-500 to-rose-500',
  },
  {
    time: '12:30 PM',
    title: 'Lunch Break',
    description: 'Participants take a break to refresh, recharge, and prepare for the next phase of the symposium.',
    icon: Coffee,
    color: 'from-rose-500 to-orange-500',
  },
  {
    time: '01:30 PM',
    title: 'Workshops Continue',
    description: 'Industry experts conduct hands-on workshops covering AI Infrastructure, Product Prototyping, and Threat Detection.',
    icon: ClipboardCheck,
    color: 'from-orange-500 to-amber-500',
  },
  {
    time: '04:00 PM',
    title: 'Final Events',
    description: 'The concluding events and competitions wrap up as teams prepare for the final presentations and evaluations.',
    icon: Clock,
    color: 'from-amber-500 to-yellow-500',
  },
  {
    time: '05:00 PM',
    title: 'Prize Distribution',
    description: 'Winners are announced and celebrated for their innovative solutions and hard work throughout the symposium.',
    icon: Trophy,
    color: 'from-yellow-500 to-cyan-500',
  },
  {
    time: '05:30 PM',
    title: 'End of Day 1',
    description: 'The first day officially concludes. Teams reflect on their experiences and prepare for Day 2.',
    icon: Clock,
    color: 'from-cyan-500 to-blue-500',
  },
  {
    time: 'Next Day',
    title: 'Day 2 - Continuation',
    description: 'More workshops, events, and the grand finale with final presentations and closing ceremony.',
    icon: Sparkles,
    color: 'from-blue-500 to-purple-500',
  },
];

export default function Timeline() {
  return (
    <section id="timeline" className="relative py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-white mb-4">
            Symposium <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Timings</span>
          </h2>
          <p className="text-white/60 max-w-xl">
            A detailed timeline of the Galaxy 2K26 events and activities.
          </p>
        </motion.div>

        {/* Venue Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mb-12 glass rounded-xl py-4 px-6 inline-block mx-auto w-full max-w-md border border-purple-500/20"
        >
          <span className="text-purple-400 font-semibold tracking-wider">VENUE: </span>
          <span className="text-white font-semibold tracking-wider">GCEE Auditorium</span>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line - Galaxy Gradient */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-pink-500 via-cyan-500 to-purple-500 md:-translate-x-1/2 rounded-full" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                viewport={{ once: true }}
                className={`relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
              >
                {/* Time - Left Side on desktop */}
                <div className={`flex-1 pl-12 md:pl-0 mb-2 md:mb-0 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <span className="font-orbitron text-xl md:text-2xl font-bold text-white/90">
                    {event.time}
                  </span>
                </div>

                {/* Dot on the line */}
                <div className="absolute left-2 md:left-1/2 md:-translate-x-1/2 z-10">
                  <motion.div
                    whileHover={{ scale: 1.3 }}
                    className={`w-5 h-5 rounded-full bg-gradient-to-br ${event.color} border-2 border-white/30 shadow-lg shadow-purple-500/30`}
                  />
                </div>

                {/* Content Card */}
                <div className="flex-1 pl-12 md:pl-0">
                  <motion.div
                    whileHover={{ scale: 1.02, x: index % 2 === 0 ? 5 : -5 }}
                    className="glass rounded-xl p-5 hover:bg-white/10 transition-all duration-300 group cursor-pointer border border-white/10 hover:border-purple-500/30"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${event.color} flex items-center justify-center`}>
                        <event.icon className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="font-semibold text-lg text-white group-hover:text-purple-400 transition-colors">
                        {event.title}
                      </h3>
                    </div>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {event.description}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
