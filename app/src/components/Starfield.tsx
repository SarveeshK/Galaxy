import { useEffect, useRef, useCallback } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
}

interface Asteroid {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  active: boolean;
}

const galaxyColors = [
  'rgba(255, 255, 255, ',   // White
  'rgba(226, 232, 240, ',   // Slate-200
  'rgba(148, 163, 184, ',   // Slate-400
  'rgba(203, 213, 225, ',   // Slate-300
];

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const asteroidsRef = useRef<Asteroid[]>([]);
  const animationRef = useRef<number | null>(null);
  const lastAsteroidTime = useRef(0);

  const spawnAsteroid = useCallback((canvas: HTMLCanvasElement) => {
    const side = Math.floor(Math.random() * 4);
    let x, y, speedX, speedY;

    const size = Math.random() * 20 + 10;
    const speed = Math.random() * 1.5 + 0.8;

    switch (side) {
      case 0:
        x = Math.random() * canvas.width;
        y = -60;
        speedX = (Math.random() - 0.5) * speed * 0.5;
        speedY = speed;
        break;
      case 1:
        x = canvas.width + 60;
        y = Math.random() * canvas.height;
        speedX = -speed;
        speedY = (Math.random() - 0.5) * speed * 0.5;
        break;
      case 2:
        x = Math.random() * canvas.width;
        y = canvas.height + 60;
        speedX = (Math.random() - 0.5) * speed * 0.5;
        speedY = -speed;
        break;
      default:
        x = -60;
        y = Math.random() * canvas.height;
        speedX = speed;
        speedY = (Math.random() - 0.5) * speed * 0.5;
    }

    return {
      x,
      y,
      size,
      speedX,
      speedY,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.08,
      opacity: 1,
      active: true,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initStars = () => {
      const starCount = Math.floor((canvas.width * canvas.height) / 3000);
      starsRef.current = [];

      for (let i = 0; i < starCount; i++) {
        const colorIndex = Math.floor(Math.random() * galaxyColors.length);
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          speed: Math.random() * 0.02 + 0.01,
          twinkleSpeed: Math.random() * 0.01 + 0.005,
          twinklePhase: Math.random() * Math.PI * 2,
          color: galaxyColors[colorIndex],
        });
      }
    };

    const drawStar = (star: Star) => {
      const twinkle = Math.sin(star.twinklePhase) * 0.4 + 0.6;
      const currentOpacity = star.opacity * twinkle;

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = `${star.color}${currentOpacity})`;
      ctx.fill();

      // Enhanced glow for larger stars - Silver/White
      if (star.size > 1.8) {
        const gradient = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, star.size * 3
        );
        gradient.addColorStop(0, `${star.color}${currentOpacity * 0.4})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    };

    const drawAsteroid = (asteroid: Asteroid) => {
      ctx.save();
      ctx.translate(asteroid.x, asteroid.y);
      ctx.rotate(asteroid.rotation);

      // Draw Tech Debris (Geometric Shapes)
      ctx.beginPath();
      const points = 5; // Pentagons/Polygons looks more techy
      ctx.moveTo(asteroid.size, 0);
      for (let i = 1; i < points; i++) {
        const angle = (i / points) * Math.PI * 2;
        ctx.lineTo(Math.cos(angle) * asteroid.size, Math.sin(angle) * asteroid.size);
      }
      ctx.closePath();

      // Metallic Gradient
      const gradient = ctx.createLinearGradient(-asteroid.size, -asteroid.size, asteroid.size, asteroid.size);
      gradient.addColorStop(0, `rgba(203, 213, 225, ${asteroid.opacity * 0.8})`); // Slate-300
      gradient.addColorStop(0.5, `rgba(71, 85, 105, ${asteroid.opacity * 0.8})`); // Slate-700
      gradient.addColorStop(1, `rgba(15, 23, 42, ${asteroid.opacity * 0.8})`);   // Slate-900

      ctx.fillStyle = gradient;
      ctx.fill();

      // Tech Border
      ctx.strokeStyle = `rgba(148, 163, 184, ${asteroid.opacity * 0.6})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // "Circuit" detail - simple line inside
      ctx.beginPath();
      ctx.moveTo(-asteroid.size * 0.5, 0);
      ctx.lineTo(asteroid.size * 0.5, 0);
      ctx.strokeStyle = `rgba(255, 255, 255, ${asteroid.opacity * 0.3})`;
      ctx.stroke();

      ctx.restore();
    };

    const drawNebula = () => {
      // Very faint grey/blue fog
      const nebula1 = ctx.createRadialGradient(
        canvas.width * 0.5, canvas.height * 0.5, 0,
        canvas.width * 0.5, canvas.height * 0.5, canvas.width * 0.8
      );
      nebula1.addColorStop(0, 'rgba(30, 41, 59, 0.05)'); // Deep Slate
      nebula1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = nebula1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw nebula background
      drawNebula();

      // Update and draw stars
      starsRef.current.forEach(star => {
        star.twinklePhase += star.twinkleSpeed;
        star.y += star.speed;

        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }

        drawStar(star);
      });

      // Spawn asteroids randomly (every 12-20 seconds) - NO SOUND
      const now = Date.now();
      if (now - lastAsteroidTime.current > 12000 + Math.random() * 8000) {
        if (asteroidsRef.current.length < 2) {
          asteroidsRef.current.push(spawnAsteroid(canvas));
          lastAsteroidTime.current = now;
        }
      }

      // Update and draw asteroids
      asteroidsRef.current = asteroidsRef.current.filter(asteroid => {
        if (!asteroid.active) return false;

        asteroid.x += asteroid.speedX;
        asteroid.y += asteroid.speedY;
        asteroid.rotation += asteroid.rotationSpeed;

        if (
          asteroid.x < -100 ||
          asteroid.x > canvas.width + 100 ||
          asteroid.y < -100 ||
          asteroid.y > canvas.height + 100
        ) {
          return false;
        }

        drawAsteroid(asteroid);
        return true;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initStars();
    animationRef.current = requestAnimationFrame(animate);

    window.addEventListener('resize', () => {
      resizeCanvas();
      initStars();
    });

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [spawnAsteroid]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      style={{ background: 'black' }}
    />
  );
}
