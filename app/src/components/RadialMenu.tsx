import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  Home,
  Calendar,
  Clock,
  Phone,
  X,
  UserPlus,
  Info
} from 'lucide-react';

interface RadialMenuProps {
  onClose: () => void;
  onNavigate: (section: string) => void;
  onAuthNavigate: (view: 'home' | 'register') => void;
}

const menuItems = [
  { icon: Home, label: 'HOME', section: 'home', angle: 0, color: 'from-slate-100 to-slate-400' },
  { icon: Calendar, label: 'EVENTS', section: 'events', angle: 120, color: 'from-gray-300 to-gray-500' },
  { icon: Info, label: 'ABOUT', section: 'about', angle: 240, color: 'from-slate-400 to-slate-300' },
];

export default function RadialMenu({ onClose, onNavigate, onAuthNavigate }: RadialMenuProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const size = isMobile ? 320 : 500;
  const center = size / 2;
  const innerRadius = isMobile ? 40 : 60;
  const outerRadius = isMobile ? 150 : 240;
  // Recalculate itemAngle based on *current* length (will be less after removal)
  const itemAngle = 360 / menuItems.length;

  const createSectorPath = (index: number) => {
    // Start degrees: Shift -90 (top) and then offset by half an item angle to center the segment
    const startDeg = (index * itemAngle) - 90 - (itemAngle / 2);
    const endDeg = (index * itemAngle) - 90 + (itemAngle / 2);

    const startAngle = startDeg * (Math.PI / 180);
    const endAngle = endDeg * (Math.PI / 180);

    const x1 = center + innerRadius * Math.cos(startAngle);
    const y1 = center + innerRadius * Math.sin(startAngle);
    const x2 = center + outerRadius * Math.cos(startAngle);
    const y2 = center + outerRadius * Math.sin(startAngle);
    const x3 = center + outerRadius * Math.cos(endAngle);
    const y3 = center + outerRadius * Math.sin(endAngle);
    const x4 = center + innerRadius * Math.cos(endAngle);
    const y4 = center + innerRadius * Math.sin(endAngle);

    // Large arc flag: 0 because 360/5 = 72 < 180
    return `M ${x1} ${y1} L ${x2} ${y2} A ${outerRadius} ${outerRadius} 0 0 1 ${x3} ${y3} L ${x4} ${y4} A ${innerRadius} ${innerRadius} 0 0 0 ${x1} ${y1} Z`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/80 backdrop-blur-xl"
      onClick={onClose}
    >
      <div className="absolute inset-0 pointer-events-none" />

      {/* SVG Radial Menu */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        className="relative"
        style={{ width: size, height: size }}
        onClick={(e) => e.stopPropagation()}
      >
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible filter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
          {menuItems.map((item, index) => {
            const midDeg = (index * itemAngle) - 90;
            const midAngle = midDeg * (Math.PI / 180);

            const labelRadius = innerRadius + (outerRadius - innerRadius) * 0.65;
            const labelX = center + labelRadius * Math.cos(midAngle);
            const labelY = center + labelRadius * Math.sin(midAngle);

            return (
              <motion.g
                key={item.label}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 + 0.1 }}
                onClick={() => onNavigate(item.section)}
                className="cursor-pointer group"
                whileHover={{ scale: 1.05, originX: center + 'px', originY: center + 'px', zIndex: 10 }}
              >
                <path
                  d={createSectorPath(index)}
                  className="fill-white/5 stroke-white/10 transition-all duration-300 group-hover:fill-white/20 group-hover:stroke-white/50"
                  strokeWidth="1"
                />

                {/* Sector Icon & Text */}
                <foreignObject x={labelX - 30} y={labelY - 30} width="60" height="60" className="pointer-events-none">
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <item.icon className="w-5 h-5 text-gray-400 mb-1 group-hover:text-white transition-colors duration-300" />
                    <span className="text-[9px] font-orbitron text-gray-400 group-hover:text-white transition-colors duration-300 tracking-wider text-center leading-tight">
                      {item.label}
                    </span>
                  </div>
                </foreignObject>
              </motion.g>
            );
          })}
        </svg>

        {/* Center Close Button */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          onClick={onClose}
          className="absolute top-1/2 left-1/2 w-16 h-16 -ml-8 -mt-8 rounded-full bg-black border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all z-20 group shadow-[0_0_30px_rgba(255,255,255,0.1)]"
        >
          <X className="w-6 h-6 text-white/70 group-hover:rotate-90 transition-transform duration-300" />
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-12"
      >
        <button
          onClick={() => onAuthNavigate('register')}
          className="px-12 py-3 rounded-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 border border-white/10 hover:border-white/30 text-white font-orbitron tracking-[0.2em] text-sm flex items-center gap-3 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all hover:scale-105 active:scale-95"
        >
          <UserPlus className="w-4 h-4" />
          <span>REGISTER</span>
        </button>
      </motion.div>
    </motion.div>
  );
}
