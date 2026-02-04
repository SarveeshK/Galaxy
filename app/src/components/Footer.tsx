import { Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
    onNavigate: (view: 'home' | 'events' | 'about') => void;
}

export default function Footer({ onNavigate }: FooterProps) {
    return (
        <footer className="relative bg-black border-t border-white/10 pt-20 pb-10 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-[128px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-[128px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Brand Column */}
                    <div className="space-y-6">
                        <h2 className="font-orbitron text-3xl font-bold text-white tracking-wider">
                            GALAXY 2K26
                        </h2>
                        <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                            The National Level Technical Symposium organized by the Department of ECE, Government College of Engineering, Erode.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white hover:scale-110 transition-all duration-300">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white hover:scale-110 transition-all duration-300">
                                <Youtube size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Navigation Column */}
                    <div className="space-y-6">
                        <h3 className="font-orbitron text-sm font-bold text-cyan-400 tracking-widest uppercase">
                            Navigation
                        </h3>
                        <ul className="space-y-4">
                            {['Home', 'Events', 'Timeline', 'About'].map((item) => (
                                <li key={item}>
                                    <button
                                        onClick={() => {
                                            const target = item.toLowerCase();
                                            if (target === 'timeline') onNavigate('home');
                                            else onNavigate(target as any);
                                        }}
                                        className="text-white/60 hover:text-white transition-colors text-sm"
                                    >
                                        {item}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div className="space-y-6">
                        <h3 className="font-orbitron text-sm font-bold text-cyan-400 tracking-widest uppercase">
                            Contact
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-white/60 text-sm">
                                <MapPin size={18} className="text-purple-400 shrink-0 mt-0.5" />
                                <span>Department of ECE,<br />Government College of Engineering,<br />Erode - 638316</span>
                            </li>
                            <li className="flex items-center gap-3 text-white/60 text-sm">
                                <Mail size={18} className="text-purple-400 shrink-0" />
                                <span>galaxyece2k26@gmail.com</span>
                            </li>
                            <li className="flex items-center gap-3 text-white/60 text-sm">
                                <Phone size={18} className="text-purple-400 shrink-0" />
                                <span>+91 98765 43210</span>
                            </li>
                        </ul>
                    </div>

                    {/* Coordinators Column */}
                    <div className="space-y-6">
                        <h3 className="font-orbitron text-sm font-bold text-cyan-400 tracking-widest uppercase mb-4">
                            Faculty Coordinators
                        </h3>
                        <div className="space-y-4 mb-8">
                            <div>
                                <p className="text-white font-medium text-sm">Dr. P. Kaliram</p>
                                <p className="text-white/40 text-xs">Prof Dept ECE</p>
                            </div>
                        </div>

                        <h3 className="font-orbitron text-sm font-bold text-cyan-400 tracking-widest uppercase mb-4">
                            Student Coordinators
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-white font-medium text-sm">Mr. Nithishkumar V</p>
                                <p className="text-white/40 text-xs">Student Secretary</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-white/40 text-xs text-center md:text-left">
                        © 2026 Galaxy Symposium. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="text-white/40 hover:text-white text-xs transition-colors">Privacy Policy</a>
                        <a href="#" className="text-white/40 hover:text-white text-xs transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
