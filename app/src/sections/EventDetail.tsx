import { motion } from 'framer-motion';
import { ArrowLeft, Users, Calendar, MapPin, ChevronRight, Clock, Sparkles } from 'lucide-react';
import TiltedCard from '../components/TiltedCard';
import SpotlightCard from '../components/SpotlightCard';

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
  posterImage?: string;
  description?: string;
}> = {
  'questx': {
    // ...
    // I need to be careful with the target content matching.
    // I will target the type definition block.

    name: 'QUESTX',
    tagline: 'FUN AND CHALLENGING ACTIVITIES TO BOOST CREATIVITY, ANALYTICAL SKILLS, AND TEAMWORK',
    teamSize: '4 Members',
    date: 'Feb 27',
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
    color: 'from-gray-100 to-gray-300',
    icon: '🔍',
  },
  'project-war': {
    name: 'PROJECT WAR',
    tagline: 'SHOWCASE YOUR INNOVATIVE PROJECTS AND COMPETE FOR GLORY',
    teamSize: '4 Members',
    date: 'Feb 27',
    time: '10:00 AM - 3:00 PM',
    venue: 'Project Lab',
    rounds: [
      { name: 'Project Demo', description: 'Present your working prototype to the judges.' },
      { name: 'Q&A Session', description: 'Defend your project methodology and implementation.' },
    ],
    coordinators: [
      { name: 'Shek allavudhin batsha S', phone: '8778236418' },
      { name: 'Shunmuga Lakshmi V', phone: '8825977538' },
    ],
    color: 'from-blue-400 to-blue-600',
    icon: '🛠️',
  },
  'paper-presentation': {
    name: 'PAPER PRESENTATION',
    tagline: 'PRESENT YOUR RESEARCH AND IDEAS TO A PANEL OF EXPERTS',
    teamSize: '2 Members',
    date: 'Feb 27',
    time: '10:00 AM - 3:00 PM',
    venue: 'Seminar Hall',
    rounds: [
      { name: 'Presentation', description: 'Present your technical paper with visual aids.' },
    ],
    coordinators: [
      { name: 'Michael raj A', phone: '7010617647' },
      { name: 'Jayashree D', phone: '9566272714' },
    ],
    color: 'from-purple-400 to-purple-600',
    icon: '📝',
  },
  'ai-prompt-battle': {
    name: 'AI PROMPT BATTLE',
    tagline: 'MASTER THE ART OF PROMPTING IN THIS AI SHOWDOWN',
    teamSize: 'Individual',
    date: 'Feb 27',
    time: '1:30 PM - 4:00 PM',
    venue: 'Computer Center',
    rounds: [
      { name: 'Prompt Engineering', description: 'Generate the best outputs using AI tools.' },
    ],
    coordinators: [
      { name: 'Sanjay K', phone: '9042469959' },
      { name: 'Abitha A', phone: '9123551977' },
    ],
    color: 'from-yellow-400 to-orange-500',
    icon: '🧠',
  },
  'arduino-hackathon': {
    name: 'ARDUINO HACKATHON',
    tagline: 'BUILD AND PROGRAM EMBEDDED SYSTEMS IN A RACE AGAINST TIME',
    teamSize: '3 Members',
    date: 'Feb 27',
    time: '10:00 AM - 3:00 PM',
    venue: 'Embedded Systems Lab',
    rounds: [
      { name: 'Circuit Building', description: 'Design and assemble the required circuit.' },
      { name: 'Coding & Execution', description: 'Program the Arduino to achieve the task.' },
    ],
    coordinators: [
      { name: 'Mohammed Thoufiq A', phone: '8838651916' },
      { name: 'Arunthathi M', phone: '9025478135' },
    ],
    color: 'from-green-400 to-emerald-600',
    icon: '🤖',
  },
  'circuit-debugging': {
    name: 'CIRCUIT DEBUGGING',
    tagline: 'FIND FAULTS AND FIX CIRCUITS TO PROVE YOUR HARDWARE SKILLS',
    teamSize: '2 Members',
    date: 'Feb 27',
    time: '10:00 AM - 1:00 PM',
    venue: 'Electronics Lab',
    rounds: [
      { name: 'Fault Finding', description: 'Identify errors in the given circuit diagram.' },
      { name: 'Practical Debugging', description: 'Fix the hardware circuit to make it work.' },
    ],
    coordinators: [
      { name: 'Gnaneshkanthan S', phone: '9361696966' },
      { name: 'Jayashree S', phone: '8667373245' },
    ],
    color: 'from-red-400 to-rose-600',
    icon: '🔌',
  },
  'ipl-auction': {
    name: 'IPL AUCTION',
    tagline: 'STRATEGIZE AND BUILD YOUR DREAM TEAM IN THIS AUCTION SIMULATION',
    teamSize: '4 Members',
    date: 'Feb 27',
    time: '10:00 AM - 3:00 PM',
    venue: 'Auditorium',
    rounds: [
      { name: 'Budget Allocation', description: 'Manage your virtual budget to buy players.' },
      { name: 'Team Building', description: 'Assemble the best possible team within constraints.' },
    ],
    coordinators: [
      { name: 'Tharun Kumar P', phone: '9363037379' },
      { name: 'Thahifa Fathima A', phone: '9500974615' },
    ],
    color: 'from-indigo-400 to-blue-500',
    icon: '🏏',
    posterImage: '/ipl-auction-poster.jpg',
    description: `Experience the thrill of a live IPL-style auction where teams compete in real-time bidding.

Test your cricket knowledge, strategy, and decision-making skills under pressure.

Build a strong team, outbid your rivals, and prove your auction mastery.`,
  },
  'hintdrop': {
    name: 'HINTDROP',
    tagline: 'FOLLOW THE CLUES AND SOLVE THE MYSTERY',
    teamSize: '3-4 Members',
    date: 'Feb 27',
    time: '10:00 AM - 1:00 PM',
    venue: 'Campus Grounds',
    rounds: [
      { name: 'Clue Hunting', description: 'Find hidden clues across the location.' },
      { name: 'Puzzle Solving', description: 'Decode the clues to reach the final destination.' },
    ],
    coordinators: [
      { name: 'Sowresh R', phone: '7845321588' },
      { name: 'Bafina A', phone: '9585805225' },
    ],
    color: 'from-pink-400 to-rose-500',
    icon: '🧩',
    posterImage: '/hintdrop-poster.jpg',
    description: `Hint Drop is not about what you know, but how smartly you say it. Easy to play, hard to master, where every clue counts and only the sharpest teams rise to the top.

Simple to Play! Thrilling to Win!`,
  },
  'short-film': {
    name: 'SHORT FILM',
    tagline: 'EXPRESS YOUR CREATIVITY THROUGH THE LENS',
    teamSize: 'Max 3 members per team',
    date: 'Feb 27',
    time: '1:30 PM - 4:00 PM',
    venue: 'Main Auditorium',
    rounds: [
      { name: 'Screening', description: 'Showcase your short film to the audience and judges.' },
      { name: 'Critique', description: 'Receive feedback and scores based on storytelling and technicality.' },
    ],
    coordinators: [
      { name: 'Sudharshan A', phone: '7695827386' },
      { name: 'Dharani S', phone: '7826949987' },
    ],
    color: 'from-amber-400 to-orange-500',
    icon: '🎬',
    posterImage: '/short-film-poster.jpg',
    description: `Short Film Showcase

▫️Unleash your creativity in a quick-fire film challenge. Easy to enter, tough to stand out—where storytelling shines and the best ideas captivate all.

Simple to Submit`,
  },
  'spin-and-win': {
    name: 'SPIN AND WIN',
    tagline: 'WHERE LUCK MEETS STRATEGY',
    teamSize: '3 Members',
    date: 'Feb 27',
    time: 'All Day',
    venue: 'Stalls Area',
    rounds: [
      { name: 'Spin the Wheel', description: 'Spin the wheel and test your fortune.' },
    ],
    coordinators: [
      { name: 'Kaviselvam E', phone: '9585381455' },
      { name: 'Catherin Jersha J S', phone: '7305620340' },
    ],
    color: 'from-cyan-400 to-blue-500',
    icon: '🎰',
    posterImage: '/spin-and-win-poster.jpg',
    description: `Spin and Win is all about luck meeting skill! Teams face the thrill of the spinner, where every turn decides their challenge. Easy, Medium, or Hard—no one knows what’s coming next. Quick thinking, teamwork, and speed are the keys.

Simple to Play! Exciting to Conquer!`,
  },
  'photography': {
    name: 'PHOTOGRAPHY',
    tagline: 'CAPTURE THE MOMENT AND SHOWCASE YOUR PERSPECTIVE',
    teamSize: 'Individual',
    date: 'Feb 27',
    time: 'All Day',
    venue: 'Campus',
    rounds: [
      { name: 'Capture', description: 'Take photos based on the given theme.' },
      { name: 'Showcase', description: 'Submit your best shots for evaluation.' },
    ],
    coordinators: [
      { name: 'Sivakumar L', phone: '9043267073' },
      { name: 'Kayalvizhi V', phone: '9360387845' },
    ],
    color: 'from-teal-400 to-green-500',
    icon: '📸',
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
          className="mb-8 flex items-center gap-2 px-4 py-2 rounded-full glass text-white/70 hover:text-white hover:bg-white/10 transition-all border border-white/10 hover:border-white/30"
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
            <Sparkles className="w-5 h-5 text-gray-400" />
            <p className="text-white/60 text-sm tracking-[0.3em] font-orbitron">
              NON TECHNICAL
            </p>
            <Sparkles className="w-5 h-5 text-gray-400" />
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
              className="glass rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all"
            >
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-5 h-5 text-gray-400" />
                <span className="text-white/60 text-xs tracking-wider">TEAM SIZE</span>
              </div>
              <p className="text-white text-xl font-orbitron">{event.teamSize}</p>
            </motion.div>

            {/* Date & Time */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all"
            >
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-5 h-5 text-gray-400" />
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
              className="glass rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all"
            >
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span className="text-white/60 text-xs tracking-wider">VENUE</span>
              </div>
              <p className="text-white text-xl font-orbitron">{event.venue}</p>
            </motion.div>

            {/* Coordinators */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all"
            >
              <span className="text-white/60 text-xs tracking-wider block mb-4">COORDINATORS</span>
              <div className="space-y-3">
                {event.coordinators.map((coord, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-white">{coord.name}</span>
                    <span className="text-white/50 text-sm">{coord.phone}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Center - Event Poster */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1 mb-12 lg:mb-0"
          >
            <div className="lg:col-span-1 flex flex-col justify-center items-center lg:h-full">
              <TiltedCard
                imageSrc={event.posterImage}
                altText={event.name}
                captionText={event.name}
                containerHeight="400px"
                containerWidth="300px"
                imageHeight="400px"
                imageWidth="300px"
                rotateAmplitude={12}
                scaleOnHover={1.05}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={!event.posterImage}
                overlayContent={
                  !event.posterImage && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                      <div className="text-6xl mb-4 text-white z-10">{event.icon}</div>
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

            {/* Register Button */}
            <motion.button
              onClick={onRegister}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full mt-6 py-4 rounded-xl bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 text-white font-orbitron tracking-wider font-bold hover:shadow-lg hover:shadow-white/20 transition-all duration-300"
            >
              REGISTER NOW
            </motion.button>
          </motion.div>

          {/* Right - Description/Rounds */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
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
                    className="glass rounded-2xl p-6 group hover:bg-white/10 transition-all cursor-pointer border border-white/10 hover:border-white/30"
                  >
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
                  </motion.div>
                ))}
              </div>
            )}

          </motion.div>
        </div>
      </div>
    </section>
  );
}
