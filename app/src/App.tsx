import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ClickSpark from './components/ClickSpark';
import Galaxy from './components/Galaxy';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Hero from './sections/Hero';
import About from './sections/About';
import Events from './sections/Events';
import Timeline from './sections/Timeline';
import Register from './sections/Register';
import EventDetail from './sections/EventDetail';
import LocateUs from './sections/LocateUs';

type View = 'home' | 'events' | 'about' | 'event-detail' | 'register';

function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const handleEventClick = (id: string) => {
    setSelectedEventId(id);
    setCurrentView('event-detail');
  };

  const handleBack = () => {
    setSelectedEventId(null);
    setCurrentView('events'); // Go back to events list
  };

  const handleNavigate = (view: 'home' | 'events' | 'about') => {
    setSelectedEventId(null);
    setCurrentView(view);
  };

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-purple-500/30">

      {/* Galaxy Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Galaxy
          mouseRepulsion
          mouseInteraction
          density={1}
          glowIntensity={0.1}
          saturation={0}
          hueShift={140}
          twinkleIntensity={0.2}
          rotationSpeed={0}
          repulsionStrength={1.5}
          autoCenterRepulsion={0}
          starSpeed={0.4}
          speed={1}
        />
      </div>

      <ClickSpark
        sparkColor='#fff'
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      />

      {/* Navbar - Visible on all pages except maybe explicit full screens if needed, but keeping it always on is standard */}
      <Navbar currentView={currentView === 'event-detail' ? 'events' : currentView} onNavigate={handleNavigate} />

      <AnimatePresence mode="wait">
        {currentView === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <main>
              <Hero onRegister={() => setCurrentView('register')} />
              <Timeline />
              <LocateUs />
            </main>
            <Footer onNavigate={handleNavigate} />
          </motion.div>
        )}

        {currentView === 'events' && (
          <motion.div
            key="events"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="pt-24" // Spacing for navbar
          >
            <Events onEventClick={handleEventClick} />
            <Footer onNavigate={handleNavigate} />
          </motion.div>
        )}

        {currentView === 'about' && (
          <motion.div
            key="about"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="pt-24 min-h-screen flex flex-col justify-between"
          >
            <About />
            <Footer onNavigate={handleNavigate} />
          </motion.div>
        )}

        {currentView === 'event-detail' && selectedEventId && (
          <motion.div
            key="event-detail"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-md"
          >
            <EventDetail
              eventId={selectedEventId}
              onBack={handleBack}
              onRegister={() => setCurrentView('register')}
            />
          </motion.div>
        )}

        {currentView === 'register' && (
          <motion.div
            key="register"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-md"
          >
            <div className="p-4 pt-20"> {/* Add padding for close button if needed or just navbar */}
              <button
                onClick={() => setCurrentView('home')}
                className="fixed top-6 right-6 z-50 px-6 py-2 bg-white/10 rounded-full backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all font-orbitron text-sm"
              >
                CLOSE
              </button>
              <Register
                onBack={() => setCurrentView('home')}
                onLogin={() => { }} // No-op for now
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
