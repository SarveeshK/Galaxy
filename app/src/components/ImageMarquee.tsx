import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface ImageMarqueeProps {
    images: string[];
    speed?: number;
    direction?: 'left' | 'right';
}

export default function ImageMarquee({ images, speed = 20, direction = 'left' }: ImageMarqueeProps) {
    const [width, setWidth] = useState(0);
    const marqueeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (marqueeRef.current) {
            // Calculate total width of one set of images plus gaps
            const totalWidth = marqueeRef.current.scrollWidth / 2;
            setWidth(totalWidth);
        }
    }, [images]);

    return (
        <div className="relative w-full overflow-hidden py-10 group">
            {/* Gradient Masks for seamless edge fading */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

            <motion.div
                className="flex gap-6 w-max"
                ref={marqueeRef}
                animate={{
                    x: direction === 'left' ? [-width, 0] : [0, -width],
                }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: width ? width / speed : 20,
                        ease: "linear",
                    },
                }}
            >
                {/* Render images twice for seamless loop */}
                {[...images, ...images].map((src, index) => (
                    <div
                        key={index}
                        className="relative w-64 h-40 md:w-80 md:h-52 flex-shrink-0 rounded-xl overflow-hidden border border-white/10 group-hover:border-purple-500/50 transition-colors duration-300"
                    >
                        <img
                            src={src}
                            alt={`Glimpse ${index}`}
                            className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 hover:scale-110"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
