import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SpotlightCard from '../components/SpotlightCard';
import ScrollFloat from '../components/ScrollFloat';
import StarBorder from '../components/StarBorder';
import { COMBOS } from '../data/combos';
import { eventData } from '../data/events';

interface EventsProps {
  onEventClick: (eventId: string) => void;
  onRegister: (comboId: string) => void;
}

// Transform eventData record to array for rendering
const events = Object.entries(eventData).map(([id, data]) => ({
  id,
  ...data
}));

export default function Events({ onEventClick, onRegister }: EventsProps) {
  const techEvents = events.filter(e => e.type === 'TECHNICAL');
  const nonTechEvents = events.filter(e => e.type === 'NON TECHNICAL');
  const flagshipEvents = events.filter(e => e.type === 'FLAGSHIP');
  const hackathonEvents = events.filter(e => e.type === 'HACKATHON');


  const EventCard = ({ event, index }: { event: typeof events[0], index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      viewport={{ once: true }}
      onClick={() => onEventClick(event.id)}
      className={`
        relative group cursor-pointer z-0 hover:z-50
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
              {event.tagline}
            </p>

            {/* Action & Price */}
            <div className="mt-auto flex items-center justify-between">
              <div className="flex items-center gap-2 text-white/30 group-hover:text-white transition-colors text-xs font-orbitron tracking-widest">
                <span>EXPLORE</span>
                <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </SpotlightCard>
      </StarBorder>
    </motion.div>
  );

  return (
    <section id="events" className="relative pt-16 pb-12 md:pt-24 px-4 transition-all ease-in-out duration-500">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-4 md:mb-8"
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

        {/* Static Tooltip CTA */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex justify-center mb-4 relative"
        >
          <button
            onClick={() => document.getElementById('galactic-passes')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-6 py-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full border border-white/20 hover:border-white/50 transition-all backdrop-blur-md flex items-center gap-2"
          >
            <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 rounded-full transition-colors" />
            <span className="relative text-xs md:text-sm font-orbitron tracking-widest text-purple-100 group-hover:text-white transition-colors uppercase">
              GET THE BEST VALUE WITH GALACTIC PASSES
            </span>
            <ArrowRight className="w-4 h-4 text-purple-300 group-hover:text-white group-hover:translate-x-1 transition-transform" />
          </button>
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
              </motion.h3>
              <div className="flex flex-col items-center md:grid md:grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 w-full">
                {flagshipEvents.map((event, index) => (
                  <div key={event.id} className="w-full max-w-md md:max-w-none lg:col-span-2">
                    <EventCard event={event} index={index} />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* Hackathon Subsection */}
        {hackathonEvents.length > 0 && (
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative p-8 rounded-3xl border border-white/20 bg-white/5 backdrop-blur-sm overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 via-transparent to-gray-500/10 opacity-30 pointer-events-none"></div>
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="font-orbitron text-2xl md:text-3xl font-bold text-white mb-8 border-l-4 border-gray-400 pl-4"
              >
                HACKATHON <span className="text-gray-400">EVENT</span>
              </motion.h3>
              <div className="flex flex-col items-center md:grid md:grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 w-full">
                {hackathonEvents.map((event, index) => (
                  <div key={event.id} className="w-full max-w-md md:max-w-none lg:col-span-2">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
            {nonTechEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>
        </div>

        {/* GALACTIC ACCESS PASSES - COMBO SHOWCASE */}
        <div className="my-20" id="galactic-passes">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-orbitron text-2xl md:text-3xl font-bold text-white mb-8 border-l-4 border-gray-400 pl-4"
          >
            GALACTIC <span className="text-gray-400">ACCESS PASSES</span>
          </motion.h3>

          {/* Mobile Swipe Hint */}
          <div className="md:hidden flex items-center justify-end gap-2 text-white/50 text-xs font-orbitron tracking-widest mb-4 pr-4 animate-pulse">
            <span>SWIPE TO VIEW PASSES</span>
            <ArrowRight className="w-3 h-3" />
          </div>

          {/* Horizontal Scroll Container */}
          <div className="overflow-x-auto pb-8 -mx-4 px-4 scrollbar-hide">
            <div className="flex gap-6 w-max md:w-full md:grid md:grid-cols-2 lg:grid-cols-3">
              {COMBOS.map((combo, index) => (
                <motion.div
                  key={combo.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="w-[300px] md:w-auto"
                >
                  <SpotlightCard
                    className="h-full border border-white/10 bg-white/5 rounded-2xl p-6 hover:border-white/40 transition-colors group relative overflow-hidden"
                    spotlightColor="rgba(255, 255, 255, 0.1)"
                  >



                    {/* Flagship Badge */}
                    {(combo.id === 'PREMIUM' || combo.id === 'ELITE') && (
                      <div className="absolute top-0 right-0 bg-gradient-to-bl from-red-600 to-red-900 text-white text-[9px] font-bold px-3 py-1.5 rounded-bl-xl z-20 font-orbitron tracking-wider shadow-md">
                        INCLUDES FLAGSHIP
                      </div>
                    )}

                    <div className="flex flex-col h-full pt-6"> {/* Added pt-6 for badge spacing */}
                      <h4 className="font-orbitron font-bold text-xl text-white mb-2 group-hover:text-gray-300 transition-colors">{combo.name}</h4>
                      <div className="text-3xl font-bold text-white font-orbitron mb-4">
                        ₹{combo.price} <span className="text-sm text-white/40 font-normal">/ member</span>
                      </div>

                      <div className="w-full h-px bg-white/10 mb-4"></div>

                      <p className="text-slate-400 text-sm mb-4 flex-grow italic">"{combo.description}"</p>

                      <div className="bg-black/40 rounded-lg p-3 border border-white/5 mb-6">
                        <p className="text-xs text-white/60 uppercase tracking-widest font-bold mb-1">INCLUDES</p>
                        <p className="text-xs text-white">{combo.condition}</p>
                      </div>

                      <button
                        onClick={() => {
                          if (onRegister) onRegister(combo.id);
                        }}
                        className="w-full py-3 bg-white/10 border border-white/20 rounded-lg text-white font-orbitron font-bold tracking-wider hover:bg-white hover:text-black hover:border-white transition-all uppercase text-sm"
                      >
                        GET PASS
                      </button>
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
