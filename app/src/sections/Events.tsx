import { motion } from 'framer-motion';
import { ArrowRight, Code, Users, Brain, GitBranch, Zap, FileQuestion, Presentation, Shield, Sparkles } from 'lucide-react';

interface EventsProps {
  onEventClick: (eventId: 'questx' | 'forcecoders' | 'codemania' | 'nexus' | 'gitwars' | 'openquiz' | 'ai-trends') => void;
}

const events = [
  {
    id: 'questx' as const,
    name: 'QUESTX',
    type: 'NON TECHNICAL',
    description: 'Fun challenges to boost creativity and teamwork',
    icon: Users,
    color: 'from-purple-500 to-violet-500',
    size: 'large',
  },
  {
    id: 'forcecoders' as const,
    name: 'FORCECODERS',
    type: 'TECHNICAL',
    description: 'Code like tourist, hack like grandmaster',
    icon: Code,
    color: 'from-violet-500 to-fuchsia-500',
    size: 'small',
  },
  {
    id: 'codemania' as const,
    name: 'CODEMANIA',
    type: 'TECHNICAL',
    description: 'Beat the clock, beat the rivals in bids',
    icon: Zap,
    color: 'from-fuchsia-500 to-pink-500',
    size: 'small',
  },
  {
    id: 'ai-trends' as const,
    name: 'AI INFRASTRUCTURE',
    type: 'WORKSHOP',
    description: 'From big picture to everyday reality',
    icon: Brain,
    color: 'from-pink-500 to-rose-500',
    size: 'large',
  },
  {
    id: 'gitwars' as const,
    name: 'GIT WARS',
    type: 'NON TECHNICAL',
    description: 'Clone. Commit. Conquer.',
    icon: GitBranch,
    color: 'from-rose-500 to-orange-500',
    size: 'small',
  },
  {
    id: 'nexus' as const,
    name: 'NEXUS',
    type: 'TECHNICAL',
    description: 'Marvel-themed cybersecurity CTF',
    icon: Shield,
    color: 'from-orange-500 to-amber-500',
    size: 'small',
  },
  {
    id: 'openquiz' as const,
    name: 'OPEN QUIZ',
    type: 'QUIZ',
    description: 'Tech in movies, wheel of tech, code auction',
    icon: FileQuestion,
    color: 'from-amber-500 to-yellow-500',
    size: 'medium',
  },
  {
    id: 'ai-trends' as const,
    name: 'PRODUCT PROTOTYPING',
    type: 'WORKSHOP',
    description: 'Build industry-ready prototypes',
    icon: Presentation,
    color: 'from-cyan-500 to-blue-500',
    size: 'medium',
  },
];

export default function Events({ onEventClick }: EventsProps) {
  return (
    <section id="events" className="relative py-20 px-4">
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
            <Sparkles className="w-6 h-6 text-purple-400" />
            <h2 className="font-orbitron text-4xl md:text-6xl font-black text-white">
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">EVENTS</span>
            </h2>
            <Sparkles className="w-6 h-6 text-pink-400" />
          </div>
          <p className="text-white/60 text-lg tracking-wider">
            Explore our lineup of exciting events
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              viewport={{ once: true }}
              onClick={() => onEventClick(event.id)}
              whileHover={{ scale: 1.03, y: -5 }}
              className={`
                relative group cursor-pointer rounded-2xl overflow-hidden interactive-card
                ${event.size === 'large' ? 'md:col-span-2 lg:col-span-1' : ''}
                ${event.size === 'medium' ? 'md:col-span-1' : ''}
              `}
            >
              {/* Card Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${event.color} opacity-10 group-hover:opacity-25 transition-opacity duration-500`} />
              <div className="absolute inset-0 glass" />

              {/* Border Glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${event.color} opacity-40 blur-sm`} />
              </div>

              {/* Content */}
              <div className="relative p-6 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className={`text-xs tracking-wider mb-2 bg-gradient-to-r ${event.color} bg-clip-text text-transparent font-semibold`}>
                      {event.type}
                    </p>
                    <h3 className="font-orbitron text-xl md:text-2xl font-bold text-white group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-500 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                      {event.name}
                    </h3>
                  </div>
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${event.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <event.icon className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Description */}
                <p className="text-white/60 text-sm mb-4 flex-grow">
                  {event.description}
                </p>

                {/* Arrow */}
                <div className="flex items-center gap-2 text-white/40 group-hover:text-purple-400 transition-colors">
                  <span className="text-xs tracking-wider">EXPLORE</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
