import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Home } from 'lucide-react';
import ClickSpark from './components/ClickSpark';
import Galaxy from './components/Galaxy';

import PillNav from './components/PillNav';
import RadialMenu from './components/RadialMenu';
import Footer from './components/Footer';

import Hero from './sections/Hero';
import About from './sections/About';
import Events from './sections/Events';
import Timeline from './sections/Timeline';
import Register from './sections/Register';
import EventDetail from './sections/EventDetail';
import LocateUs from './sections/LocateUs';

type View = 'home' | 'events' | 'about' | 'event-detail' | 'register';

const NAV_ITEMS = [
  { label: 'Home', id: 'home' },
  { label: 'Events', id: 'events' },
  { label: 'About', id: 'about' },
];

function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Initialize history state and URL params on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get('view') as View;
    const idParam = params.get('id');

    if (viewParam) {
      setCurrentView(viewParam);
      if (idParam) setSelectedEventId(idParam);
      // Ensure state is set for this history entry if missing
      if (!window.history.state) {
        window.history.replaceState({ view: viewParam, eventId: idParam }, '');
      }
    } else {
      // Default to home
      if (!window.history.state) {
        window.history.replaceState({ view: 'home' }, '');
      }
    }

    const handlePopState = (event: PopStateEvent) => {
      const state = event.state;
      if (state) {
        setCurrentView(state.view);
        setSelectedEventId(state.eventId || null);
      } else {
        // Fallback: Check URL again or default
        const currentParams = new URLSearchParams(window.location.search);
        const currentViewParam = currentParams.get('view') as View;
        if (currentViewParam) {
          setCurrentView(currentViewParam);
          setSelectedEventId(currentParams.get('id'));
        } else {
          setCurrentView('home');
          setSelectedEventId(null);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Generic navigation helper
  const navigateTo = (view: View, eventId: string | null = null) => {
    // Prevent pushing duplicate state if same view
    if (currentView === view && selectedEventId === eventId) return;

    const url = `?view=${view}${eventId ? `&id=${eventId}` : ''}`;
    window.history.pushState({ view, eventId }, '', url);
    setCurrentView(view);
    setSelectedEventId(eventId);
  };

  const handleEventClick = (id: string) => {
    navigateTo('event-detail', id);
  };

  const handleBack = () => {
    // If there is history to go back to, use it (triggers popstate)
    // Otherwise manually navigate
    if (window.history.length > 1) {
      window.history.back();
    } else {
      navigateTo('events');
    }
  };

  const handleNavigate = (view: 'home' | 'events' | 'about') => {
    navigateTo(view);
  };

  return (
    <div className="relative min-h-screen text-white selection:bg-purple-500/30">

      {/* Galaxy Background - Fixed and behind everything */}
      <div className="fixed inset-0 z-[-1]">
        <div className="absolute inset-0 bg-black/80 z-0" /> {/* Dark overlay to ensure text readability */}
        <Galaxy
          mouseRepulsion
          mouseInteraction
          density={window.innerWidth < 768 ? 0.5 : 1}
          glowIntensity={0.3} // Increased glow
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
      >

        {/* Main Views - Static/Instant Switching */}
        {currentView === 'home' && (
          <div>
            <main>
              <Hero onRegister={() => navigateTo('register')} onViewEvents={() => navigateTo('events')} />
              <Timeline />
              <LocateUs />
            </main>
            <Footer onNavigate={handleNavigate} />
          </div>
        )}

        {currentView === 'events' && (
          <div className="pt-24">
            <Events onEventClick={handleEventClick} />
            <Footer onNavigate={handleNavigate} />
          </div>
        )}

        {currentView === 'about' && (
          <div className="pt-24 min-h-screen flex flex-col justify-between">
            <About />
            <Footer onNavigate={handleNavigate} />
          </div>
        )}

        {/* Modals - Animate In/Out */}
        <AnimatePresence>
          {currentView === 'event-detail' && selectedEventId && (
            <motion.div
              key="event-detail"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm"
            >
              <EventDetail
                eventId={selectedEventId}
                onBack={handleBack}
                onRegister={() => navigateTo('register')}
              />
            </motion.div>
          )}

          {currentView === 'register' && (
            <motion.div
              key="register"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm"
            >
              <div className="p-4 pt-20"> {/* Add padding for close button if needed or just navbar */}
                <button
                  onClick={handleBack}
                  className="fixed top-6 right-6 z-50 px-6 py-2 bg-white/10 rounded-full backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all font-orbitron text-sm"
                >
                  CLOSE
                </button>
                <Register
                  onBack={handleBack}
                  onLogin={() => { }} // No-op for now
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </ClickSpark>

      <div className="hidden md:block">
        <PillNav
          items={NAV_ITEMS}
          activeId={currentView === 'event-detail' ? 'events' : currentView}
          onNavigate={(id) => handleNavigate(id as any)}
        />
      </div>

      {/* Mobile Navigation Controls */}
      <div className={`md:hidden ${['register', 'event-detail'].includes(currentView) ? 'hidden' : ''}`}>
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="fixed top-6 left-6 z-[60] p-3 bg-black/40 backdrop-blur-md border border-white/20 rounded-full text-white shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:bg-white/20 transition-all cursor-pointer"
          aria-label="Open Menu"
        >
          <Menu size={24} />
        </button>

        <button
          onClick={() => {
            navigateTo('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="fixed top-6 right-6 z-[60] p-3 bg-black/40 backdrop-blur-md border border-white/20 rounded-full text-white shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:bg-white/20 transition-all cursor-pointer"
          aria-label="Go Home"
        >
          <Home size={24} />
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <RadialMenu
              key="radial-menu"
              onClose={() => setIsMobileMenuOpen(false)}
              onNavigate={(id) => {
                handleNavigate(id as any);
                setIsMobileMenuOpen(false);
              }}
              onAuthNavigate={(view) => {
                navigateTo(view as any);
                setIsMobileMenuOpen(false);
              }}
            />
          )}
        </AnimatePresence>
      </div>

    </div >
  );
}

export default App;
