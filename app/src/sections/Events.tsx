import { motion } from 'framer-motion';
import { ArrowRight, Code, Users, GitBranch, Zap, FileQuestion, Shield, Sparkles } from 'lucide-react';
import SpotlightCard from '../components/SpotlightCard';
import ScrollFloat from '../components/ScrollFloat';
import StarBorder from '../components/StarBorder';

interface EventsProps {
  onEventClick: (eventId: string) => void;
}

const events = [
  // Technical Events
  {
    id: 'project-war',
    name: 'PROJECT WAR',
    type: 'TECHNICAL',
    description: 'Showcase your innovative projects and compete for glory',
    icon: Code,
    color: 'from-blue-400 to-blue-600',
    size: 'large',
    price: 200,
  },
  {
    id: 'paper-presentation',
    name: 'PAPER PRESENTATION',
    type: 'TECHNICAL',
    description: 'Present your research and ideas to a panel of experts',
    icon: FileQuestion,
    color: 'from-purple-400 to-purple-600',
    size: 'small',
    price: 200,
  },
  {
    id: 'arduino-hackathon',
    name: 'ARDUINO HACKATHON',
    type: 'TECHNICAL',
    description: 'Build and program embedded systems in a race against time',
    icon: GitBranch,
    color: 'from-green-400 to-emerald-600',
    size: 'small',
    price: 200,
  },
  {
    id: 'circuit-debugging',
    name: 'CIRCUIT DEBUGGING',
    type: 'TECHNICAL',
    description: 'Find faults and fix circuits to prove your hardware skills',
    icon: Shield,
    color: 'from-red-400 to-rose-600',
    size: 'small',
    price: 200,
  },
  {
    id: 'chase-and-build',
    name: 'CHASE AND BUILD',
    type: 'TECHNICAL',
    description: 'A thrilling event to test your speed and building skills',
    icon: Zap, // Placeholder icon
    color: 'from-teal-400 to-green-500',
    size: 'medium',
    price: 200,
  },

  // Non-Technical Events
  {
    id: 'ai-prompt-battle',
    name: 'AI PROMPT BATTLE',
    type: 'NON TECHNICAL',
    description: 'Master the art of prompting in this AI showdown',
    icon: Zap,
    color: 'from-yellow-400 to-orange-500',
    size: 'small',
    price: 150,
  },
  {
    id: 'ipl-auction',
    name: 'IPL AUCTION',
    type: 'NON TECHNICAL',
    description: 'Strategize and build your dream team in this auction simulation',
    icon: Users,
    color: 'from-indigo-400 to-blue-500',
    size: 'large',
    price: 150,
  },
  {
    id: 'hintdrop',
    name: 'HINTDROP',
    type: 'NON TECHNICAL',
    description: 'Follow the clues and solve the mystery',
    icon: Zap,
    color: 'from-pink-400 to-rose-500',
    size: 'small',
    price: 150,
  },
  {
    id: 'short-film',
    name: 'SHORT FILM',
    type: 'NON TECHNICAL',
    description: 'Express your creativity through the lens',
    icon: Users,
    color: 'from-amber-400 to-orange-500',
    size: 'small',
    price: 150,
  },
  {
    id: 'spin-and-win',
    name: 'SPIN AND WIN',
    type: 'NON TECHNICAL',
    description: 'Try your luck and win exciting prizes',
    icon: Zap,
    color: 'from-cyan-400 to-blue-500',
    size: 'small',
    price: 150,
  },
  {
    id: 'stranger-things',
    name: 'STRANGER THINGS',
    type: 'FLAGSHIP',
    description: 'Enter the upside down in this themed event',
    icon: Shield,
    color: 'from-red-500 to-black',
    size: 'small',
    price: 200,
  },
];

export default function Events({ onEventClick }: EventsProps) {
  const techEvents = events.filter(e => e.type === 'TECHNICAL');
  const nonTechEvents = events.filter(e => e.type === 'NON TECHNICAL' || e.type === 'QUIZ');
  const flagshipEvents = events.filter(e => e.type === 'FLAGSHIP');


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
      <StarBorder as="div" className="w-full h-full" color={event.color.split(' ')[1].replace('to-', '')} speed="5s">
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

            {/* Action & Price */}
            <div className="mt-auto flex items-center justify-between">
              <div className="flex items-center gap-2 text-white/30 group-hover:text-white transition-colors text-xs font-orbitron tracking-widest">
                <span>EXPLORE</span>
                <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="text-white/50 font-orbitron font-bold text-sm bg-white/5 px-2 py-1 rounded border border-white/10 group-hover:border-white/30 transition-colors">
                ₹{(event as any).price}
              </div>
            </div>
          </div>
        </SpotlightCard>
      </StarBorder>
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
          </div>
          <p className="text-white/60 text-lg tracking-wider">
            Explore our lineup of exciting events
          </p>
        </motion.div>

        {/* Flagship Events Subsection */}
        {flagshipEvents.length > 0 && (
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative p-8 rounded-3xl border border-white/20 bg-white/5 backdrop-blur-sm overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 opacity-30 pointer-events-none"></div>

              <motion.h3
                className="font-orbitron text-2xl md:text-3xl font-bold text-white mb-8 border-l-4 border-gray-400 pl-4 flex items-center gap-3"
              >
                FLAGSHIP <span className="text-gray-400">EVENT</span>
                <Sparkles className="w-6 h-6 text-white animate-pulse" />
              </motion.h3>

              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-12 justify-center">
                {flagshipEvents.map((event, index) => (
                  <div key={event.id} className="lg:col-span-2">
                    {/* Centering the single flagship event if strictly one, or listing them */}
                    <EventCard event={event} index={index} />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

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
