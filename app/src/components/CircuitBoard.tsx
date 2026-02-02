import { useEffect, useRef } from 'react';

export default function CircuitBoard() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        // Circuit Configuration
        const gridSize = 40; // Size of the grid cells
        const nodeCount = 40; // Number of fixed nodes/chips
        const signalCount = 12; // Number of active signals

        // Nodes (simulating chips or junctions)
        const nodes: { x: number, y: number }[] = [];

        // Signals (moving pulses)
        const signals: {
            x: number,
            y: number,
            path: { x: number, y: number }[],
            targetIndex: number,
            speed: number,
            color: string,
            phase: number, // For heartbeat rhythm
            isHeartbeat: boolean // Special mode for some signals
        }[] = [];

        // Initialize Nodes
        for (let i = 0; i < nodeCount; i++) {
            const gx = Math.floor(Math.random() * (width / gridSize)) * gridSize;
            const gy = Math.floor(Math.random() * (height / gridSize)) * gridSize;
            nodes.push({ x: gx, y: gy });
        }

        // Helper to generate a random path on the grid
        const generatePath = (startX: number, startY: number, length: number) => {
            const path = [{ x: startX, y: startY }];
            let cx = startX;
            let cy = startY;

            for (let i = 0; i < length; i++) {
                const dir = Math.floor(Math.random() * 4);
                if (dir === 0) cy -= gridSize;
                else if (dir === 1) cx += gridSize;
                else if (dir === 2) cy += gridSize;
                else if (dir === 3) cx -= gridSize;

                // Keep in bounds
                if (cx < 0) cx = 0;
                if (cy < 0) cy = 0;
                if (cx > width) cx = width;
                if (cy > height) cy = height;

                path.push({ x: cx, y: cy });
            }
            return path;
        };

        // Initialize Signals
        const colors = ['#00f3ff', '#bc13fe', '#00ff9d'];

        for (let i = 0; i < signalCount; i++) {
            const startNode = nodes[Math.floor(Math.random() * nodes.length)];
            const path = generatePath(startNode.x, startNode.y, 10 + Math.random() * 20);
            signals.push({
                x: path[0].x,
                y: path[0].y,
                path: path,
                targetIndex: 1,
                // Much slower speed: 0.5 to 1.5 pixels per frame
                speed: 0.5 + Math.random() * 1.0,
                color: colors[Math.floor(Math.random() * colors.length)],
                phase: Math.random() * Math.PI * 2,
                isHeartbeat: Math.random() > 0.6 // 40% chance to be a "heartbeat" signal
            });
        }

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            // Draw faint grid/trace lines
            ctx.strokeStyle = 'rgba(100, 100, 255, 0.03)';
            ctx.lineWidth = 1;

            ctx.beginPath();
            for (let i = 0; i < nodes.length - 1; i++) {
                // Draw more connections for a denser "circuit" feel
                if (Math.random() > 0.3) {
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[i + 1].x, nodes[i].y);
                    ctx.lineTo(nodes[i + 1].x, nodes[i + 1].y);
                }
            }
            ctx.stroke();

            // Draw Nodes
            nodes.forEach(node => {
                ctx.fillStyle = 'rgba(0, 200, 255, 0.2)';
                ctx.beginPath();
                // Slightly larger nodes
                ctx.arc(node.x, node.y, 2.5, 0, Math.PI * 2);
                ctx.fill();
            });

            // Update and Draw Signals
            const time = Date.now();

            signals.forEach(signal => {
                // Heartbeat Logic
                // Subtler pulsing for a premium feel
                const pulseSpeed = signal.isHeartbeat ? 0.005 : 0.002;
                const baseScale = signal.isHeartbeat ? 1.3 : 1.0; // Reduced base scale difference
                const pulse = Math.sin(time * pulseSpeed + signal.phase);

                // Uniform but "alive" scaling
                const scale = signal.isHeartbeat
                    ? 1.1 + 0.2 * pulse  // Subtle variation (0.9x to 1.3x)
                    : 1.0 + 0.05 * pulse;

                // Move towards target
                const target = signal.path[signal.targetIndex];
                const dx = target.x - signal.x;
                const dy = target.y - signal.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < signal.speed) {
                    signal.x = target.x;
                    signal.y = target.y;
                    signal.targetIndex++;

                    if (signal.targetIndex >= signal.path.length) {
                        const startNode = nodes[Math.floor(Math.random() * nodes.length)];
                        signal.path = generatePath(startNode.x, startNode.y, 10 + Math.random() * 20);
                        signal.x = signal.path[0].x;
                        signal.y = signal.path[0].y;
                        signal.targetIndex = 1;
                    }
                } else {
                    signal.x += (dx / dist) * signal.speed;
                    signal.y += (dy / dist) * signal.speed;
                }

                // Draw Signal Head
                // Refiined glow
                ctx.shadowBlur = (8 * scale) * baseScale; // Reduced max blur significantly
                ctx.shadowColor = signal.color;
                ctx.fillStyle = signal.color;
                ctx.beginPath();
                // Standard radius: 2.5px base
                ctx.arc(signal.x, signal.y, 2.5 * scale * baseScale, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;

                // Draw Tail
                const prev = signal.path[signal.targetIndex - 1];
                if (prev) {
                    const grad = ctx.createLinearGradient(signal.x, signal.y, prev.x, prev.y);
                    grad.addColorStop(0, signal.color);
                    grad.addColorStop(1, 'rgba(0,0,0,0)');
                    ctx.strokeStyle = grad;
                    // Thicker tail
                    ctx.lineWidth = 3 * scale;
                    ctx.beginPath();
                    ctx.moveTo(signal.x, signal.y);
                    ctx.lineTo(prev.x, prev.y);
                    ctx.stroke();
                }
            });

            requestAnimationFrame(draw);
        };

        const animationId = requestAnimationFrame(draw);

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[1]"
            style={{ opacity: 0.6 }} // Increased base opacity for visibility
        />
    );
}
