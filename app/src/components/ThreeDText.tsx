import { motion } from 'framer-motion';

interface ThreeDTextProps {
    text: string;
    className?: string;
}

export default function ThreeDText({ text, className = '' }: ThreeDTextProps) {
    // CSS Text Shadow for 3D effect
    // We stack shadows to create depth
    const textShadow = `
    0px 1px 0px #c7c7c7,
    0px 2px 0px #b9b9b9,
    0px 3px 0px #a8a8a8,
    0px 4px 0px #979797,
    0px 5px 0px #868686,
    0px 6px 0px #757575,
    0px 7px 0px #646464,
    0px 8px 7px rgba(0,0,0,0.4),
    0px 9px 10px rgba(0,0,0,0.2)
  `;

    // For a more neon/cyberpunk 3D effect suitable for Galaxy theme
    const neonShadow = `
    0 0 5px rgba(188, 19, 254, 0.5),
    0 0 10px rgba(188, 19, 254, 0.3),
    0px 1px 0px #8a1cba,
    0px 2px 0px #6e1694,
    0px 3px 0px #52106e,
    0px 4px 5px rgba(0,0,0,0.5)
  `;

    return (
        <div className={`relative perspective-1000 ${className}`}>
            <motion.h2
                initial={{ rotateX: 90, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                transition={{
                    duration: 0.8,
                    ease: [0.17, 0.55, 0.55, 1],
                    delay: 0.2
                }}
                className="font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 relative z-10 text-center tracking-wide"
                style={{
                    textShadow: neonShadow,
                    transformStyle: 'preserve-3d',
                }}
            >
                {text}
            </motion.h2>

            {/* Reflection/Glow layer */}
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute top-0 left-0 w-full h-full text-purple-500 blur-md -z-10 select-none"
                aria-hidden="true"
            >
                {text}
            </motion.span>
        </div>
    );
}
