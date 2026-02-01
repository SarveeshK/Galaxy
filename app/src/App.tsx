import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Starfield from './components/Starfield';
import SoundManager from './components/SoundManager';
import RadialMenu from './components/RadialMenu';
import Hero from './sections/Hero';
import PrizePool from './sections/PrizePool';
import Association from './sections/Association';
import FlagshipEvent from './sections/FlagshipEvent';
import Events from './sections/Events';
import Workshops from './sections/Workshops';
import Timeline from './sections/Timeline';
import About from './sections/About';
import Login from './sections/Login';
import Register from './sections/Register';
import EventDetail from './sections/EventDetail';
import Contact from './sections/Contact';
import { Menu, Home, Sparkles } from 'lucide-react';

type View = 'home' | 'login' | 'register' | 'event-detail';
type EventType = 'questx' | 'forcecoders' | 'codemania' | 'nexus' | 'gitwars' | 'openquiz' | 'ai-trends' | null;

function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedEvent, setSelectedEvent] = useState<EventType>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'q' || e.key === 'Q') {
        setIsMenuOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
      if (e.key === ' ' && e.target === document.body) {
        e.preventDefault();
        // Space toggles sound - handled by SoundManager
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleEventClick = (eventId: EventType) => {
    setSelectedEvent(eventId);
    setCurrentView('event-detail');
    window.scrollTo(0, 0);
  };

  const handleNavigate = (view: View) => {
    if (view === 'register') {
      window.open('https://forms.google.com/placeholder-galaxy2k26', '_blank');
      return;
    }
    setCurrentView(view);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const handleMenuNavigate = useCallback((section: string) => {
    setIsMenuOpen(false);
    setCurrentView('home');
    setTimeout(() => {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden">
      {/* Starfield Background with Asteroids */}
      <Starfield />

      {/* Grid Pattern Overlay */}
      <div className="fixed inset-0 grid-pattern pointer-events-none z-[1]" />

      {/* Aurora Background */}
      <div className="fixed inset-0 aurora-bg pointer-events-none z-[2]" />

      {/* Sound Manager */}
      <SoundManager />

      {/* Menu Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        onClick={() => setIsMenuOpen(true)}
        className="fixed top-6 left-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/40 hover:shadow-purple-500/60 transition-all hover:scale-110 group"
      >
        <Menu className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />

        {/* Glow ring */}
        <span className="absolute inset-0 rounded-full border border-purple-400/30 animate-ping" />
      </motion.button>

      {/* Keyboard Hint */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5 }}
        className="fixed top-24 left-6 z-40 glass rounded-lg px-3 py-2 flex items-center gap-2 border border-white/10"
      >
        <span className="text-white/50 text-xs">Press</span>
        <span className="text-purple-400 font-bold keyboard-hint text-sm">Q</span>
        <span className="text-white/50 text-xs">for menu</span>
      </motion.div>

      {/* Home Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2 }}
        onClick={scrollToTop}
        className="fixed top-6 right-24 z-50 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-all border border-white/10 hover:border-purple-400/30 group"
        title="Go to Top"
      >
        <Home className="w-5 h-5 text-white/70 group-hover:text-purple-400 transition-colors" />
      </motion.button>

      {/* Galaxy Logo Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.3 }}
        onClick={scrollToTop}
        className="fixed top-6 right-6 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all hover:scale-110"
        title="Galaxy 2K26"
      >
        <Sparkles className="w-5 h-5 text-white" />
      </motion.button>

      {/* Radial Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <RadialMenu
            onClose={() => setIsMenuOpen(false)}
            onNavigate={handleMenuNavigate}
            onAuthNavigate={handleNavigate}
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {currentView === 'home' && (
          <motion.main
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10"
          >
            <Hero onRegister={() => handleNavigate('register')} onLogin={() => handleNavigate('login')} />
            <PrizePool />
            <Association />
            <FlagshipEvent onLearnMore={() => handleEventClick('questx')} />
            <Events onEventClick={handleEventClick} />
            <Workshops />
            <Timeline />
            <About />
            <Contact />
          </motion.main>
        )}

        {currentView === 'login' && (
          <motion.div
            key="login"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative z-10 min-h-screen flex items-center justify-center p-4"
          >
            <Login
              onBack={() => handleNavigate('home')}
              onRegister={() => handleNavigate('register')}
            />
          </motion.div>
        )}

        {currentView === 'register' && (
          <motion.div
            key="register"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative z-10 min-h-screen flex items-center justify-center p-4"
          >
            <Register
              onBack={() => handleNavigate('home')}
              onLogin={() => handleNavigate('login')}
            />
          </motion.div>
        )}

        {currentView === 'event-detail' && selectedEvent && (
          <motion.div
            key="event-detail"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="relative z-10"
          >
            <EventDetail
              eventId={selectedEvent}
              onBack={() => handleNavigate('home')}
              onRegister={() => handleNavigate('register')}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
