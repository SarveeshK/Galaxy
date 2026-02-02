import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import Antigravity from './Antigravity';

export default function CustomCursor() {
    const [isMobile, setIsMobile] = useState(false);
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 700 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        window.addEventListener('mousemove', moveCursor);

        return () => {
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('mousemove', moveCursor);
        };
    }, []);

    if (isMobile) return null;

    return (
        <>
            {/* Standard Cursor Dot */}
            <motion.div
                className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[10000] mix-blend-difference"
                style={{
                    x: springX,
                    y: springY,
                    translateX: '-50%',
                    translateY: '-50%'
                }}
            />

            {/* Antigravity Effect */}
            <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }}>
                <Antigravity
                    count={300}
                    magnetRadius={10}
                    ringRadius={10}
                    waveSpeed={0.4}
                    waveAmplitude={1}
                    particleSize={2}
                    lerpSpeed={0.1}
                    color="#cbd5e1" // Metallic Silver (User requested code had purple, keeping theme)
                    autoAnimate={false}
                    particleVariance={1}
                    rotationSpeed={0}
                    depthFactor={1}
                    pulseSpeed={3}
                    particleShape="capsule"
                    fieldStrength={10}
                />
            </div>
        </>
    );
}
