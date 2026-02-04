import React, { useRef, useEffect } from "react";

interface ClickSparkProps {
    sparkColor?: string;
    sparkSize?: number;
    sparkRadius?: number;
    sparkCount?: number;
    duration?: number;
    easing?: string;
    children?: React.ReactNode;
}

interface Spark {
    x: number;
    y: number;
    angle: number;
    startTime: number;
}

const ClickSpark: React.FC<ClickSparkProps> = ({
    sparkColor = "#fff",
    sparkSize = 10,
    sparkRadius = 15,
    sparkCount = 8,
    duration = 400,
    easing = "ease-out",
    children,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const sparks = useRef<Spark[]>([]);
    const startTime = useRef<number | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const parent = canvas.parentElement;
        if (!parent) return;

        let resizeTimeout: number;

        const resizeCanvas = () => {
            const { width, height } = parent.getBoundingClientRect();
            if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width;
                canvas.height = height;
            }
        };

        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = window.setTimeout(resizeCanvas, 100);
        };

        // Initial sizing
        resizeCanvas();

        // Observer for safer resizing
        const observer = new ResizeObserver(() => {
            requestAnimationFrame(() => resizeCanvas());
        });
        observer.observe(parent);

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            observer.disconnect();
            clearTimeout(resizeTimeout);
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;

        const easeFunc = (t: number) => {
            switch (easing) {
                case "linear": return t;
                case "ease-in": return t * t;
                case "ease-in-out": return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
                default: return t * (2 - t); // ease-out
            }
        };

        const draw = (timestamp: number) => {
            if (!startTime.current) startTime.current = timestamp;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            sparks.current = sparks.current.filter((spark) => {
                const elapsed = timestamp - spark.startTime;
                if (elapsed >= duration) return false;

                const progress = elapsed / duration;
                const easedProgress = easeFunc(progress);

                const distance = easedProgress * sparkRadius;
                const lineLength = sparkSize * (1 - easedProgress);

                // Calculate positions
                const x1 = spark.x + distance * Math.cos(spark.angle);
                const y1 = spark.y + distance * Math.sin(spark.angle);
                const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
                const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

                // Draw spark line
                ctx.strokeStyle = sparkColor;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();

                return true;
            });

            if (sparks.current.length > 0) {
                animationId = requestAnimationFrame(draw);
            } else {
                startTime.current = null;
            }
        };

        const handleClick = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const now = performance.now();

            for (let i = 0; i < sparkCount; i++) {
                sparks.current.push({
                    x,
                    y,
                    angle: (2 * Math.PI * i) / sparkCount,
                    startTime: now,
                });
            }

            if (!startTime.current) {
                startTime.current = now;
                animationId = requestAnimationFrame(draw);
            }
        };

        const parent = canvas.parentElement;
        if (parent) {
            parent.addEventListener("click", handleClick);
        }

        return () => {
            if (parent) parent.removeEventListener("click", handleClick);
            cancelAnimationFrame(animationId);
        };
    }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration, easing]);

    return (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <canvas
                ref={canvasRef}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    pointerEvents: "none",
                    zIndex: 9999,
                }}
            />
            {children}
        </div>
    );
};

export default ClickSpark;
