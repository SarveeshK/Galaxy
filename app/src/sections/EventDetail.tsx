import { motion } from 'framer-motion';
import { ArrowLeft, Users, Calendar, MapPin, ChevronRight, Clock } from 'lucide-react';
import TiltedCard from '../components/TiltedCard';
import SpotlightCard from '../components/SpotlightCard';

import { eventData } from '../data/events';

interface EventDetailProps {
  eventId: string;
  onBack: () => void;
  onRegister: () => void;
}

export default function EventDetail({ eventId, onBack, onRegister }: EventDetailProps) {
  const event = eventData[eventId] || eventData['project-war'];
  const Icon = event.icon;


  return (
    <div className="relative min-h-screen pt-20 pb-24 md:py-20 px-4 overflow-x-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          className="mb-8 flex items-center gap-2 px-4 py-2 rounded-full glass text-white/70 hover:text-white hover:bg-white/10 transition-all border border-white/10 hover:border-white/30 sticky top-4 md:static z-50 bg-black/80 md:bg-black/20 md:backdrop-blur-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-orbitron">BACK</span>
        </motion.button>

        {/* Event Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 md:mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <p className="text-white/60 text-sm tracking-[0.3em] font-orbitron">
              {event.type === 'FLAGSHIP' ? 'FLAGSHIP EVENT' :
                event.type === 'TECHNICAL' ? 'TECHNICAL EVENT' :
                  'NON TECH EVENT'}
            </p>
          </div>
          <h1 className="font-orbitron text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
            {event.name}
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto px-4">
            {event.tagline}
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-8 pb-12">
          {/* Order for Mobile: Poster -> Details -> Description */}

          {/* Center - Event Poster (First on Mobile) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 lg:order-2 flex flex-col justify-start items-center"
          >
            <div className="w-full max-w-[300px] h-[400px] mx-auto mb-8 lg:mb-0">
              <TiltedCard
                imageSrc={event.posterImage}
                altText={event.name}
                captionText={event.name}
                containerHeight="100%"
                containerWidth="100%"
                imageHeight="100%"
                imageWidth="100%"
                rotateAmplitude={12}
                scaleOnHover={1.05}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={!event.posterImage}
                overlayContent={
                  !event.posterImage && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                      <div className="text-6xl mb-4 text-white z-10">
                        {Icon && <Icon size={64} className="text-white" />}
                      </div>
                      <h3 className="font-orbitron text-3xl font-bold text-white mb-2 z-10">
                        {event.name}
                      </h3>
                      <p className="text-white/70 text-sm z-10">GALAXY 2K26</p>
                    </div>
                  )
                }
              >
                {!event.posterImage && (
                  <div className={`w-full h-full bg-gradient-to-br ${event.color} relative overflow-hidden rounded-[15px]`}>
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9zdmc+')] opacity-50" />
                  </div>
                )}
              </TiltedCard>
            </div>

            {/* Register Button - Mobile (Visible only on small screens) */}
            <motion.button
              onClick={onRegister}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="lg:hidden w-full max-w-sm py-4 rounded-xl bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 text-white font-orbitron tracking-wider font-bold hover:shadow-lg hover:shadow-white/20 transition-all duration-300 mb-8"
            >
              REGISTER NOW
            </motion.button>

          </motion.div>

          {/* Left - Event Info (Second on Mobile) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1 lg:order-1 space-y-4"
          >
            {/* Team Size */}
            <motion.div whileHover={{ scale: 1.02 }}>
              <SpotlightCard className="glass rounded-2xl p-6 border border-white/10" spotlightColor="rgba(255, 255, 255, 0.1)">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-5 h-5 text-gray-400" />
                  <span className="text-white/60 text-xs tracking-wider">TEAM SIZE</span>
                </div>
                <p className="text-white text-xl font-orbitron">{event.teamSize}</p>
              </SpotlightCard>
            </motion.div>

            {/* Date & Time */}
            <motion.div whileHover={{ scale: 1.02 }}>
              <SpotlightCard className="glass rounded-2xl p-6 border border-white/10" spotlightColor="rgba(255, 255, 255, 0.1)">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span className="text-white/60 text-xs tracking-wider">DATE AND TIME</span>
                </div>
                <p className="text-white text-xl font-orbitron">{event.date}</p>
                <div className="flex items-center gap-2 mt-2 text-white/70">
                  <Clock className="w-4 h-4" />
                  <span>{event.time}</span>
                </div>
              </SpotlightCard>
            </motion.div>

            {/* Venue */}
            <motion.div whileHover={{ scale: 1.02 }}>
              <SpotlightCard className="glass rounded-2xl p-6 border border-white/10" spotlightColor="rgba(255, 255, 255, 0.1)">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="text-white/60 text-xs tracking-wider">VENUE</span>
                </div>
                <p className="text-white text-xl font-orbitron">{event.venue}</p>
              </SpotlightCard>
            </motion.div>

            {/* Coordinators */}
            <motion.div whileHover={{ scale: 1.02 }}>
              <SpotlightCard className="glass rounded-2xl p-6 border border-white/10" spotlightColor="rgba(255, 255, 255, 0.1)">
                <span className="text-white/60 text-xs tracking-wider block mb-4">COORDINATORS</span>
                <div className="space-y-3">
                  {event.coordinators.map((coord, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-white font-orbitron tracking-wide">{coord.name}</span>
                      <a href={`tel:${coord.phone}`} className="text-white/50 text-sm hover:text-white transition-colors">{coord.phone}</a>
                    </div>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>
          </motion.div>

          {/* Right - Description/Rounds (Third on Mobile) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-1 lg:order-3"
          >
            {/* Register Button - Desktop (Hidden on mobile) */}
            <motion.button
              onClick={onRegister}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden lg:block w-full mb-8 py-4 rounded-xl bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 text-white font-orbitron tracking-wider font-bold hover:shadow-lg hover:shadow-white/20 transition-all duration-300"
            >
              REGISTER NOW
            </motion.button>

            <div className="flex items-center justify-between mb-6">
              <span className="text-white/60 text-xs tracking-wider">DESCRIPTION</span>
              {!event.description && (
                <span className="bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent text-sm font-semibold">{event.rounds.length} Rounds</span>
              )}
            </div>

            {event.description ? (
              <SpotlightCard className="glass rounded-2xl p-6 border border-white/10" spotlightColor="rgba(255, 255, 255, 0.15)">
                <p className="text-white/80 leading-loose tracking-wide whitespace-pre-line font-orbitron text-sm">
                  {event.description}
                </p>
              </SpotlightCard>
            ) : (
              <div className="space-y-4">
                {event.rounds.map((round, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <SpotlightCard className="glass rounded-2xl p-6 border border-white/10" spotlightColor="rgba(255, 255, 255, 0.15)">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-sm">R{i + 1}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-orbitron font-bold mb-2 group-hover:text-gray-300 transition-colors">
                            {round.name}
                          </h4>
                          <p className="text-white/60 text-sm leading-relaxed">
                            {round.description}
                          </p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all" />
                      </div>
                    </SpotlightCard>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
