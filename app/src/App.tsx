import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ClickSpark from './components/ClickSpark';
import Galaxy from './components/Galaxy';
import SoundManager from './components/SoundManager';

import RadialMenu from './components/RadialMenu';
import Hero from './sections/Hero';
// import FlagshipEvent from './sections/FlagshipEvent';
import Events from './sections/Events';
import Timeline from './sections/Timeline';
import About from './sections/About';
import Register from './sections/Register';
import EventDetail from './sections/EventDetail';
import Contact from './sections/Contact';
import { Menu, Home } from 'lucide-react';

type View = 'home' | 'register' | 'event-detail';
type EventType = string | null;

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
    <ClickSpark
      sparkColor='#fff'
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <div className="relative min-h-screen bg-black overflow-x-hidden">

        {/* Galaxy Background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Galaxy
            mouseInteraction={true}
            glowIntensity={0.3}
            speed={0.7}
            hueShift={140}
            transparent={false}
          />
        </div>

        {/* Note: SplashCursor removed as requested */}

        {/* Grid Pattern Overlay */}
        <div className="fixed inset-0 grid-pattern pointer-events-none z-[1]" />

        {/* Sound Manager */}
        <SoundManager />

        {/* Menu Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          onClick={() => setIsMenuOpen(true)}
          className="fixed top-6 left-6 z-50 w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg hover:bg-white/20 transition-all hover:scale-110 group"
        >
          <Menu className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:rotate-90 transition-transform duration-300" />

          {/* Glow ring */}
          <span className="absolute inset-0 rounded-full border border-white/30 animate-pulse" />
        </motion.button>

        {/* Keyboard Hint */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5 }}
          className="fixed top-24 left-6 z-40 glass rounded-lg px-3 py-2 hidden md:flex items-center gap-2 border border-white/10"
        >
          <span className="text-white/50 text-xs">Press</span>
          <span className="text-white font-bold keyboard-hint text-sm">Q</span>
          <span className="text-white/50 text-xs">for menu</span>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 }}
          onClick={scrollToTop}
          className="fixed top-6 right-6 z-50 w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg hover:bg-white/20 transition-all hover:scale-110 group"
          title="Go to Top"
        >
          <Home className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-white transition-colors" />

          {/* Glow ring */}
          <span className="absolute inset-0 rounded-full border border-white/30 animate-pulse" />
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
              <Hero onRegister={() => handleNavigate('register')} />
              <Events onEventClick={handleEventClick} />
              <Timeline />
              <About />
              <Contact />
            </motion.main>
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
                onLogin={() => { }} // No-op since login is removed
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
    </ClickSpark>
  );
}

export default App;

