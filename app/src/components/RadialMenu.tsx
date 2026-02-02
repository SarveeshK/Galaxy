import { motion } from 'framer-motion';
import {
  Home,
  Calendar,
  Clock,
  Wrench,
  Image,
  Trophy,
  Info,
  Phone,
  X,
  UserPlus,
  Menu,
  Sparkles
} from 'lucide-react';

interface RadialMenuProps {
  onClose: () => void;
  onNavigate: (section: string) => void;
  onAuthNavigate: (view: 'home' | 'register') => void;
}

const menuItems = [
  { icon: Home, label: 'HOME', section: 'hero', angle: 0, color: 'from-slate-100 to-slate-400' }, // Silver
  { icon: Calendar, label: 'EVENTS', section: 'events', angle: 40, color: 'from-gray-300 to-gray-500' }, // Steel
  { icon: Clock, label: 'TIMELINE', section: 'timeline', angle: 120, color: 'from-slate-500 to-slate-700' }, // Slate
  { icon: Wrench, label: 'WORKSHOPS', section: 'workshops', angle: 160, color: 'from-gray-600 to-gray-500' }, // Chrome
  { icon: Trophy, label: 'PRIZES', section: 'prize-pool', angle: 200, color: 'from-zinc-500 to-zinc-400' }, // Aluminum
  { icon: Info, label: 'ABOUT', section: 'about', angle: 240, color: 'from-slate-400 to-slate-300' }, // Platinum
  { icon: Phone, label: 'CONTACT', section: 'contact', angle: 280, color: 'from-gray-300 to-gray-200' }, // Light Steel
  { icon: Sparkles, label: 'ASSOCIATION', section: 'association', angle: 320, color: 'from-zinc-200 to-zinc-100' }, // White Metal
];

export default function RadialMenu({ onClose, onNavigate, onAuthNavigate }: RadialMenuProps) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const size = isMobile ? 320 : 500;
  const center = size / 2;
  const innerRadius = isMobile ? 40 : 60;
  const outerRadius = isMobile ? 150 : 240;
  const itemAngle = 360 / menuItems.length;

  const createSectorPath = (index: number) => {
    // Offset by -90- (itemAngle/2) to center the first item at the top? 
    // Actually, usually 0 is right. We want the first item at top ( -90 degrees). 
    // And we want the item CENTERED at that angle. 
    // So the wedge should go from (Angle - Step/2) to (Angle + Step/2).

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

    // Large arc flag: if angle > 180, use 1. Here angle is 40, so 0.
    return `M ${x1} ${y1} L ${x2} ${y2} A ${outerRadius} ${outerRadius} 0 0 1 ${x3} ${y3} L ${x4} ${y4} A ${innerRadius} ${innerRadius} 0 0 0 ${x1} ${y1} Z`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl"
      onClick={onClose}
    >
      <div className="absolute inset-0 pointer-events-none" />

      {/* Keyboard Hint */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute top-8 left-1/2 -translate-x-1/2 glass rounded-full px-6 py-2 flex items-center gap-3 border border-white/20"
      >
        <Menu className="w-4 h-4 text-white" />
        <span className="text-white/70 text-sm">Press <span className="text-white font-bold keyboard-hint">Q</span> to toggle menu</span>
      </motion.div>

      {/* SVG Radial Menu */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0, rotate: 180 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative"
        style={{ width: size, height: size }}
        onClick={(e) => e.stopPropagation()}
      >
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible filter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
          {menuItems.map((item, index) => {
            // Label stays at the center angle of the sector
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
                transition={{ delay: index * 0.03 + 0.1 }}
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

      {/* Auth Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4"
      >
        <button
          onClick={() => onAuthNavigate('register')}
          className="flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 hover:shadow-lg hover:shadow-white/20 transition-all text-white font-orbitron tracking-wider"
        >
          <UserPlus className="w-4 h-4" />
          <span className="text-sm">REGISTER</span>
        </button>
      </motion.div>
    </motion.div>
  );
}
