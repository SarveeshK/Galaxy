

interface AuroraProps {
    colorStops: string[];
    amplitude?: number;
    blend?: number;
}

export default function Aurora({
    colorStops = ["#7cff67", "#B19EEF", "#5227FF"],
    amplitude = 1.0,
    blend = 0.5,
}: AuroraProps) {
    return (
        <div className="absolute inset-0 z-[-1] overflow-hidden bg-black pointer-events-none">
            <div className="relative w-full h-full opacity-60 filter blur-[60px] md:blur-[100px] saturate-200">
                {colorStops.map((color, index) => (
                    <div
                        key={index}
                        className="absolute rounded-full mix-blend-screen animate-aurora-flow"
                        style={{
                            backgroundColor: color,
                            width: `${40 * amplitude}vw`,
                            height: `${40 * amplitude}vw`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            opacity: blend,
                            animationDelay: `${index * -5}s`,
                            animationDuration: `${15 + index * 5}s`,
                        }}
                    />
                ))}
                {/* Second Layer for depth */}
                {colorStops.map((color, index) => (
                    <div
                        key={`layer2-${index}`}
                        className="absolute rounded-full mix-blend-color-dodge animate-aurora-flow-reverse"
                        style={{
                            backgroundColor: color,
                            width: `${50 * amplitude}vw`,
                            height: `${50 * amplitude}vw`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            opacity: blend * 0.8,
                            animationDelay: `${index * -7}s`,
                            animationDuration: `${20 + index * 5}s`,
                        }}
                    />
                ))}
            </div>

            {/* Noise Texture Overlay for "Premium" feel */}
            <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJnoiPjxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIwLjY1IiBudW1PY3RhdmVzUD0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9XYxMDAlIiBmaWx0ZXI9InVybCgjZykiIG9wYWNpdHk9IjAuNCIvPjwvc3ZnPg==')]" />
        </div>
    );
}
