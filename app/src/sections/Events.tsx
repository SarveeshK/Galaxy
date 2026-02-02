import { motion } from 'framer-motion';
import { ArrowRight, Code, Users, GitBranch, Zap, FileQuestion, Shield, Sparkles } from 'lucide-react';
import SpotlightCard from '../components/SpotlightCard';
import ScrollFloat from '../components/ScrollFloat';

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
    color: 'from-gray-100 to-gray-300',
    size: 'large',
  },
  {
    id: 'forcecoders' as const,
    name: 'FORCECODERS',
    type: 'TECHNICAL',
    description: 'Code like tourist, hack like grandmaster',
    icon: Code,
    color: 'from-gray-300 to-gray-400',
    size: 'small',
  },
  {
    id: 'codemania' as const,
    name: 'CODEMANIA',
    type: 'TECHNICAL',
    description: 'Beat the clock, beat the rivals in bids',
    icon: Zap,
    color: 'from-gray-400 to-gray-500',
    size: 'small',
  },
  {
    id: 'gitwars' as const,
    name: 'GIT WARS',
    type: 'NON TECHNICAL',
    description: 'Clone. Commit. Conquer.',
    icon: GitBranch,
    color: 'from-gray-600 to-gray-500',
    size: 'small',
  },
  {
    id: 'nexus' as const,
    name: 'NEXUS',
    type: 'TECHNICAL',
    description: 'Marvel-themed cybersecurity CTF',
    icon: Shield,
    color: 'from-gray-500 to-gray-400',
    size: 'small',
  },
  {
    id: 'openquiz' as const,
    name: 'OPEN QUIZ',
    type: 'QUIZ',
    description: 'Tech in movies, wheel of tech, code auction',
    icon: FileQuestion,
    color: 'from-gray-400 to-gray-300',
    size: 'medium',
  },
];

export default function Events({ onEventClick }: EventsProps) {
  const techEvents = events.filter(e => e.type === 'TECHNICAL');
  const nonTechEvents = events.filter(e => e.type === 'NON TECHNICAL' || e.type === 'QUIZ');


  //...
  const EventCard = ({ event, index }: { event: typeof events[0], index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      viewport={{ once: true }}
      onClick={() => onEventClick(event.id)}
      className={`
        relative group cursor-pointer z-0 hover:z-50 m-4
        ${event.size === 'large' ? 'md:col-span-2 lg:col-span-1' : ''}
        ${event.size === 'medium' ? 'md:col-span-1' : ''}
      `}
    >
      <SpotlightCard className="h-full p-6 md:p-8 group" spotlightColor="rgba(255, 255, 255, 0.15)">
        <div className="flex flex-col h-full">
          {/* Header: Icon + Title */}
          <div className="flex items-center gap-4 mb-6">
            <div className={`
              w-12 h-12 rounded-xl flex items-center justify-center 
              bg-gradient-to-br from-white/10 to-transparent border border-white/5
              group-hover:scale-110 transition-transform duration-300
            `}>
              <event.icon className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
            </div>
            <div>
              <h3 className="font-orbitron text-xl font-bold text-white tracking-wide group-hover:text-purple-300 transition-colors">
                {event.name}
              </h3>
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                {event.type}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
            {event.description}
          </p>

          {/* Action (Hidden by default, reveal on hover or just subtle) */}
          <div className="flex items-center gap-2 text-white/30 group-hover:text-white transition-colors text-xs font-orbitron tracking-widest mt-auto">
            <span>EXPLORE</span>
            <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );

  return (
    <section id="events" className="relative py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-gray-400" />
            <ScrollFloat
              animationDuration={1}
              ease="back.inOut(2)"
              scrollStart="center bottom+=50%"
              scrollEnd="bottom bottom-=40%"
              stagger={0.03}
              containerClassName="font-orbitron text-4xl md:text-6xl font-black text-white"
              textClassName="bg-gradient-to-r from-gray-100 via-gray-300 to-gray-500 bg-clip-text text-transparent"
            >
              EVENTS
            </ScrollFloat>
            <Sparkles className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-white/60 text-lg tracking-wider">
            Explore our lineup of exciting events
          </p>
        </motion.div>

        {/* Technical Events Subsection */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-orbitron text-2xl md:text-3xl font-bold text-white mb-8 border-l-4 border-gray-400 pl-4"
          >
            TECHNICAL <span className="text-gray-400">EVENTS</span>
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {techEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>
        </div>

        {/* Non-Technical Events Subsection */}
        <div>
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-orbitron text-2xl md:text-3xl font-bold text-white mb-8 border-l-4 border-gray-500 pl-4"
          >
            NON-TECHNICAL <span className="text-gray-500">EVENTS</span>
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {nonTechEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
