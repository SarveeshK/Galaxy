import { motion } from 'framer-motion';
import { ArrowLeft, Users, Calendar, MapPin, ChevronRight, Clock, Sparkles } from 'lucide-react';

interface EventDetailProps {
  eventId: string;
  onBack: () => void;
  onRegister: () => void;
}

const eventData: Record<string, {
  name: string;
  tagline: string;
  teamSize: string;
  date: string;
  time: string;
  venue: string;
  rounds: { name: string; description: string }[];
  coordinators: { name: string; phone: string }[];
  color: string;
  icon: string;
}> = {
  'questx': {
    name: 'QUESTX',
    tagline: 'FUN AND CHALLENGING ACTIVITIES TO BOOST CREATIVITY, ANALYTICAL SKILLS, AND TEAMWORK',
    teamSize: '4 Members',
    date: 'Feb 13',
    time: '10:00 AM - 3:00 PM',
    venue: 'Classrooms',
    rounds: [
      { name: 'Creative & Fun Challenges', description: 'Unleash creativity, think fast, and have fun as a team. Includes Limbo, Memory Game, Grid Pictionary, Emoji Decoding, Connections, and Meme Creation to encourage innovation, humour, observation skills, and collaboration.' },
      { name: 'Escape Room Challenge', description: 'Solve together, escape together, beat the clock. Participants use personal belongings to solve puzzles and unlock clues, testing teamwork, strategic thinking, and problem-solving under pressure.' },
    ],
    coordinators: [
      { name: 'Coordinator 1', phone: '9876543210' },
      { name: 'Coordinator 2', phone: '9876543211' },
    ],
    color: 'from-purple-500 to-violet-500',
    icon: '🔍',
  },
  'forcecoders': {
    name: 'FORCECODERS',
    tagline: 'CODE LIKE TOURIST. HACK LIKE A GRANDMASTER.',
    teamSize: 'Individual',
    date: 'Feb 13',
    time: '1:30 PM - 4:00 PM',
    venue: 'Computer Center',
    rounds: [
      { name: 'Coding Phase', description: 'Solve fast, code clean, survive the leaderboard.' },
      { name: 'Hacking Phase', description: 'Exploit weaknesses and defend your logic.' },
    ],
    coordinators: [
      { name: 'Coordinator 1', phone: '9876543210' },
    ],
    color: 'from-violet-500 to-fuchsia-500',
    icon: '⚡',
  },
  'codemania': {
    name: 'CODEMANIA',
    tagline: 'BEAT THE CLOCK. BEAT THE RIVALS IN BIDS.',
    teamSize: '4 Members',
    date: 'Feb 13',
    time: '10:00 AM - 3:00 PM',
    venue: 'Computer Center',
    rounds: [
      { name: 'Tech Spectrum', description: 'Spot the tech. Spin the wheel. Stay in the game.' },
      { name: 'BidRush', description: 'Bid smart. Predict right. Win big.' },
    ],
    coordinators: [
      { name: 'Coordinator 1', phone: '9876543210' },
    ],
    color: 'from-fuchsia-500 to-pink-500',
    icon: '💻',
  },
  'nexus': {
    name: 'NEXUS',
    tagline: 'MARVEL-THEMED BEGINNER-FRIENDLY CYBERSECURITY CTF WITH MISSION-BASED CHALLENGES',
    teamSize: '3 Members',
    date: 'Feb 14',
    time: '9:00 AM - 12:30 PM',
    venue: 'AI and Cloud Computing Labs',
    rounds: [
      { name: 'Infinity Stone Missions', description: 'Capture the flags and restore balance to the system.' },
    ],
    coordinators: [
      { name: 'Coordinator 1', phone: '9876543210' },
    ],
    color: 'from-pink-500 to-rose-500',
    icon: '🛡️',
  },
  'gitwars': {
    name: 'GIT WARS',
    tagline: 'CLONE. COMMIT. CONQUER.',
    teamSize: '3 Members',
    date: 'Feb 14',
    time: '9:00 AM - 12:30 PM',
    venue: 'Classrooms',
    rounds: [
      { name: 'Code Charades', description: 'Act fast, decode words, earn your advantage.' },
      { name: 'Flash Memory', description: 'Choose wisely or crash into uncertainty.' },
    ],
    coordinators: [
      { name: 'Coordinator 1', phone: '9876543210' },
    ],
    color: 'from-rose-500 to-orange-500',
    icon: '🌌',
  },
  'openquiz': {
    name: 'OPEN QUIZ',
    tagline: 'TECH IN MOVIES, WHEEL OF TECH, CODE AUCTION.',
    teamSize: '3 Members',
    date: 'Feb 13',
    time: '10:00 AM - 12:30 PM',
    venue: 'D Block Conference Hall',
    rounds: [
      { name: 'Tech Spectrum', description: 'Spot the tech. Spin the wheel. Stay in the game.' },
      { name: 'BidRush', description: 'Bid smart. Predict right. Win big.' },
    ],
    coordinators: [
      { name: 'Coordinator 1', phone: '9876543210' },
    ],
    color: 'from-orange-500 to-amber-500',
    icon: '🎯',
  },
  'ai-trends': {
    name: 'AI AND EMERGING TRENDS',
    tagline: 'PAPER PRESENTATION ON CUTTING-EDGE AI TECHNOLOGIES',
    teamSize: '2 Members',
    date: 'Feb 13',
    time: '10:00 AM - 3:00 PM',
    venue: 'Seminar Hall',
    rounds: [
      { name: 'Paper Submission', description: 'Submit your research paper on AI and emerging trends.' },
      { name: 'Presentation', description: 'Present your findings to expert panel.' },
    ],
    coordinators: [
      { name: 'Coordinator 1', phone: '9876543210' },
    ],
    color: 'from-cyan-500 to-blue-500',
    icon: '🤖',
  },
};

export default function EventDetail({ eventId, onBack, onRegister }: EventDetailProps) {
  const event = eventData[eventId] || eventData['questx'];

  return (
    <section className="relative min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          className="mb-8 flex items-center gap-2 px-4 py-2 rounded-full glass text-white/70 hover:text-white hover:bg-white/10 transition-all border border-white/10 hover:border-purple-500/30"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-orbitron">BACK</span>
        </motion.button>

        {/* Event Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <p className="text-white/60 text-sm tracking-[0.3em] font-orbitron">
              NON TECHNICAL
            </p>
            <Sparkles className="w-5 h-5 text-pink-400" />
          </div>
          <h1 className="font-orbitron text-4xl md:text-6xl font-black text-white mb-4">
            {event.name}
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            {event.tagline}
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left - Event Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {/* Team Size */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="glass rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-all"
            >
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-5 h-5 text-purple-400" />
                <span className="text-white/60 text-xs tracking-wider">TEAM SIZE</span>
              </div>
              <p className="text-white text-xl font-orbitron">{event.teamSize}</p>
            </motion.div>

            {/* Date & Time */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="glass rounded-2xl p-6 border border-white/10 hover:border-pink-500/30 transition-all"
            >
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-5 h-5 text-pink-400" />
                <span className="text-white/60 text-xs tracking-wider">DATE AND TIME</span>
              </div>
              <p className="text-white text-xl font-orbitron">{event.date}</p>
              <div className="flex items-center gap-2 mt-2 text-white/70">
                <Clock className="w-4 h-4" />
                <span>{event.time}</span>
              </div>
            </motion.div>

            {/* Venue */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="glass rounded-2xl p-6 border border-white/10 hover:border-cyan-500/30 transition-all"
            >
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="w-5 h-5 text-cyan-400" />
                <span className="text-white/60 text-xs tracking-wider">VENUE</span>
              </div>
              <p className="text-white text-xl font-orbitron">{event.venue}</p>
            </motion.div>

            {/* Coordinators */}
            <div className="glass rounded-2xl p-6 border border-white/10">
              <span className="text-white/60 text-xs tracking-wider block mb-4">COORDINATORS</span>
              <div className="space-y-3">
                {event.coordinators.map((coord, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-white">{coord.name}</span>
                    <span className="text-white/50 text-sm">{coord.phone}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Center - Event Poster */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1"
          >
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className={`aspect-[3/4] rounded-3xl bg-gradient-to-br ${event.color} flex items-center justify-center relative overflow-hidden border border-white/10`}
            >
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9zdmc+')] opacity-50" />
              <div className="text-center z-10">
                <div className="text-6xl mb-4">{event.icon}</div>
                <h3 className="font-orbitron text-3xl font-bold text-white mb-2">
                  {event.name}
                </h3>
                <p className="text-white/70 text-sm">GALAXY 2K26</p>
              </div>
            </motion.div>

            {/* Register Button */}
            <motion.button
              onClick={onRegister}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full mt-6 py-4 rounded-xl bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 text-white font-orbitron tracking-wider font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
            >
              REGISTER NOW
            </motion.button>
          </motion.div>

          {/* Right - Rounds */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-white/60 text-xs tracking-wider">ROUNDS</span>
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent text-sm font-semibold">{event.rounds.length} Rounds</span>
            </div>

            <div className="space-y-4">
              {event.rounds.map((round, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="glass rounded-2xl p-6 group hover:bg-white/10 transition-all cursor-pointer border border-white/10 hover:border-purple-500/30"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">R{i + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-orbitron font-bold mb-2 group-hover:text-purple-400 transition-colors">
                        {round.name}
                      </h4>
                      <p className="text-white/60 text-sm leading-relaxed">
                        {round.description}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Learn More */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-6 py-4 rounded-xl glass text-white font-orbitron tracking-wider hover:bg-white/10 transition-all flex items-center justify-center gap-2 group border border-white/10 hover:border-purple-500/30"
            >
              LEARN MORE
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
