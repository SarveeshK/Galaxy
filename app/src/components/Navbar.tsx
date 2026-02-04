import { motion } from 'framer-motion';
import { Home, Calendar, Info } from 'lucide-react';

interface NavbarProps {
    currentView: string;
    onNavigate: (view: 'home' | 'events' | 'about') => void;
}

export default function Navbar({ currentView, onNavigate }: NavbarProps) {
    const navItems = [
        { id: 'home', label: 'HOME', icon: Home },
        { id: 'events', label: 'EVENTS', icon: Calendar },
        { id: 'about', label: 'ABOUT', icon: Info },
    ] as const;

    return (
        <motion.nav
            initial={{ y: -100, x: "-50%", opacity: 0 }}
            animate={{ y: 0, x: "-50%", opacity: 1 }}
            className="fixed top-8 left-1/2 z-50"
        >
            <div className="flex items-center gap-1 bg-black/80 backdrop-blur-md border border-white/10 rounded-full p-1.5 pl-4 pr-1.5 md:p-2 md:pl-6 md:pr-2 shadow-2xl shadow-purple-500/10">

                {/* Logo / Brand (Optional, keeping it simple for now or integrated) 
            User image showed a logo on top, but navbar might be separate. 
            I'll stick to the pill menu for navigation.
        */}

                {/* Logo Removed for Centered Look */}

                <div className="flex items-center gap-1">
                    {navItems.map((item) => {
                        const isActive = currentView === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => onNavigate(item.id)}
                                className={`
                  relative px-3 md:px-6 py-2 md:py-2.5 rounded-full flex items-center gap-2 transition-all duration-300
                  ${isActive ? 'text-black' : 'text-white/70 hover:text-white'}
                `}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-pill"
                                        className="absolute inset-0 bg-white rounded-full"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10 text-xs font-bold font-orbitron tracking-wider flex items-center gap-2">
                                    {/* Icon only on mobile maybe? or always text */}
                                    {item.label}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Contact/Register Button separate? Or just part of flow. 
            User image shows: HOME | ABOUT | CONTACT in pill. 
            User request: "Home , Events , About"
        */}
            </div>
        </motion.nav>
    );
}
