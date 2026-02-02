import React, { useRef, useEffect } from 'react';

interface AntigravityProps {
    count?: number;
    magnetRadius?: number;
    ringRadius?: number;
    waveSpeed?: number;
    waveAmplitude?: number;
    particleSize?: number;
    lerpSpeed?: number;
    color?: string;
    autoAnimate?: boolean;
    particleVariance?: number;
    rotationSpeed?: number;
    depthFactor?: number;
    pulseSpeed?: number;
    particleShape?: 'circle' | 'square' | 'capsule';
    fieldStrength?: number;
}

const Antigravity: React.FC<AntigravityProps> = ({
    count = 300,
    magnetRadius = 100,
    ringRadius = 100,
    waveSpeed = 0.4,
    waveAmplitude = 1,
    particleSize = 2,
    lerpSpeed = 0.1,
    color = '#e2e8f0', // Default to silver/metallic
    autoAnimate = false,
    particleVariance = 1,
    rotationSpeed = 0,
    depthFactor = 1,
    pulseSpeed = 3,
    particleShape = 'circle',
    fieldStrength = 10,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let particles: Particle[] = [];
        let animationFrameId: number;
        let mouseX = -1000;
        let mouseY = -1000;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        class Particle {
            x: number;
            y: number;
            baseX: number;
            baseY: number;
            size: number;
            vx: number;
            vy: number;
            angle: number;
            targetX: number;
            targetY: number;

            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                this.baseX = this.x;
                this.baseY = this.y;
                this.size = Math.random() * particleSize * particleVariance + 1;
                this.vx = 0;
                this.vy = 0;
                this.angle = Math.random() * Math.PI * 2;
                this.targetX = this.x;
                this.targetY = this.y;
            }

            update() {
                // Floating motion
                this.angle += 0.01 * waveSpeed;
                this.baseX += Math.cos(this.angle) * 0.5 * waveAmplitude;
                this.baseY += Math.sin(this.angle) * 0.5 * waveAmplitude;

                // Mouse Interaction / Magnetism
                const dx = mouseX - this.x;
                const dy = mouseY - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;

                // Ring formation logic
                // If within magnetRadius, particles assume ring position
                if (distance < magnetRadius + 200) { // Influence area
                    const angleToMouse = Math.atan2(dy, dx);
                    // Target position on the ring
                    // We want them to swarm the ring
                    const targetRingX = mouseX - Math.cos(angleToMouse) * ringRadius;
                    const targetRingY = mouseY - Math.sin(angleToMouse) * ringRadius;

                    // Smooth lerp to ring
                    this.x += (targetRingX - this.x) * lerpSpeed;
                    this.y += (targetRingY - this.y) * lerpSpeed;
                } else {
                    // Return to base floating (or just float around current pos)
                    // For "Antigravity", they usually just float until disturbed
                    // Let's make them loosely follow/float
                    this.x += (this.baseX - this.x) * 0.02;
                    this.y += (this.baseY - this.y) * 0.02;
                }

                // Screen wrap or bounce? screen wrap for base?
                // Let's just update base positions to stay within screen
                if (this.baseX < 0) this.baseX = canvas!.width;
                if (this.baseX > canvas!.width) this.baseX = 0;
                if (this.baseY < 0) this.baseY = canvas!.height;
                if (this.baseY > canvas!.height) this.baseY = 0;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                if (particleShape === 'square') {
                    ctx.rect(this.x, this.y, this.size, this.size);
                } else if (particleShape === 'capsule') {
                    ctx.ellipse(this.x, this.y, this.size, this.size * 2, this.angle, 0, Math.PI * 2);
                } else {
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                }
                ctx.fillStyle = color;
                ctx.globalAlpha = 0.6;
                ctx.fill();
                ctx.globalAlpha = 1.0;
            }
        }

        const init = () => {
            particles = [];
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);

        resize();
        init();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [count, magnetRadius, ringRadius, waveSpeed, waveAmplitude, particleSize, lerpSpeed, color, particleShape]);

    return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[999]" />;
};

export default Antigravity;
