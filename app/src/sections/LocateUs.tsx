import { motion } from 'framer-motion';
import { MapPin, Clock } from 'lucide-react';
import SpotlightCard from '../components/SpotlightCard';

export default function LocateUs() {
    const handleGetDirections = () => {
        window.open('https://maps.app.goo.gl/wftGBdHzgDS7MoTf7?g_st=aw', '_blank');
    };

    return (
        <section id="locate-us" className="relative py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <SpotlightCard className="backdrop-blur-xl bg-black/40 rounded-[30px] p-8 md:p-12 border border-white/10" spotlightColor="rgba(255, 255, 255, 0.1)">

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Column: Details */}
                        <div className="space-y-8">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="font-orbitron text-2xl md:text-3xl font-bold text-white tracking-wider"
                            >
                                GALAXY 2K26 WILL BE HELD AT:
                            </motion.h2>

                            <div className="space-y-6">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                    className="flex items-start gap-4"
                                >
                                    <MapPin className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0" />
                                    <p className="text-white/80 text-lg leading-relaxed">
                                        Department of Electronics and Communication,<br />
                                        Government College of Engineering, Erode – 638316
                                    </p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                    className="flex items-center gap-4"
                                >
                                    <Clock className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                                    <p className="text-white/80 text-lg">
                                        February 27, 2026, 09:00 AM onwards
                                    </p>
                                </motion.div>
                            </div>

                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleGetDirections}
                                className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-orbitron font-bold text-lg px-8 py-4 rounded-lg shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:bg-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300 tracking-wider"
                            >
                                GET DIRECTIONS
                            </motion.button>
                        </div>

                        {/* Right Column: Map */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="w-full h-[400px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative group transform-gpu"
                            style={{ transform: 'translateZ(0)' }} // Force hardware acceleration
                        >
                            {/* Overlay instructions */}
                            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="text-white/80 text-xs font-orbitron tracking-wider">Use ctrl + scroll to zoom</span>
                            </div>

                            <iframe
                                src="https://maps.google.com/maps?q=Department+of+Electronics+and+Communication+Engineering,+Government+College+of+Engineering,+Erode&t=&z=17&ie=UTF8&iwloc=&output=embed"
                                width="100%"
                                height="100%"
                                style={{ border: 0, pointerEvents: 'auto' }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="w-full h-full rounded-2xl"
                                title="Department of Electronics and Communication, GCE Erode"
                            ></iframe>
                        </motion.div>
                    </div>
                </SpotlightCard>
            </div>
        </section>
    );
}
