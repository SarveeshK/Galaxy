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
  'rgba(139, 92, 246, ',   // Purple
  'rgba(168, 85, 247, ',   // Violet
  'rgba(236, 72, 153, ',   // Pink
  'rgba(6, 182, 212, ',    // Cyan
  'rgba(59, 130, 246, ',   // Blue
  'rgba(255, 255, 255, ',  // White
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
      const starCount = Math.floor((canvas.width * canvas.height) / 2500);
      starsRef.current = [];
      
      for (let i = 0; i < starCount; i++) {
        const colorIndex = Math.floor(Math.random() * galaxyColors.length);
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2.5 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          speed: Math.random() * 0.015 + 0.005,
          twinkleSpeed: Math.random() * 0.015 + 0.005,
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

      // Enhanced glow for larger stars
      if (star.size > 1.8) {
        const gradient = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, star.size * 4
        );
        gradient.addColorStop(0, `${star.color}${currentOpacity * 0.4})`);
        gradient.addColorStop(0.5, `${star.color}${currentOpacity * 0.15})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    };

    const drawAsteroid = (asteroid: Asteroid) => {
      ctx.save();
      ctx.translate(asteroid.x, asteroid.y);
      ctx.rotate(asteroid.rotation);
      
      // Draw asteroid with irregular shape
      ctx.beginPath();
      const points = 7;
      const radii: number[] = [];
      for (let i = 0; i < points; i++) {
        radii.push(asteroid.size * (0.6 + Math.random() * 0.4));
      }
      
      for (let i = 0; i < points; i++) {
        const angle = (i / points) * Math.PI * 2;
        const radius = radii[i];
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      
      // Galaxy gradient fill
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, asteroid.size);
      gradient.addColorStop(0, `rgba(71, 85, 105, ${asteroid.opacity * 0.6})`);
      gradient.addColorStop(0.4, `rgba(51, 65, 85, ${asteroid.opacity * 0.4})`);
      gradient.addColorStop(1, `rgba(30, 41, 59, ${asteroid.opacity * 0.2})`);
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Galaxy glow border
      ctx.shadowColor = 'rgba(139, 92, 246, 0.4)';
      ctx.shadowBlur = 15;
      ctx.strokeStyle = `rgba(168, 85, 247, ${asteroid.opacity * 0.4})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      
      // Crater details
      ctx.beginPath();
      ctx.arc(asteroid.size * 0.3, -asteroid.size * 0.2, asteroid.size * 0.15, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 0, 0, ${asteroid.opacity * 0.3})`;
      ctx.fill();
      
      ctx.restore();
    };

    const drawNebula = () => {
      // Purple nebula
      const nebula1 = ctx.createRadialGradient(
        canvas.width * 0.15, canvas.height * 0.25, 0,
        canvas.width * 0.15, canvas.height * 0.25, canvas.width * 0.5
      );
      nebula1.addColorStop(0, 'rgba(139, 92, 246, 0.1)');
      nebula1.addColorStop(0.4, 'rgba(139, 92, 246, 0.04)');
      nebula1.addColorStop(1, 'rgba(139, 92, 246, 0)');
      ctx.fillStyle = nebula1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Pink nebula
      const nebula2 = ctx.createRadialGradient(
        canvas.width * 0.85, canvas.height * 0.75, 0,
        canvas.width * 0.85, canvas.height * 0.75, canvas.width * 0.4
      );
      nebula2.addColorStop(0, 'rgba(236, 72, 153, 0.08)');
      nebula2.addColorStop(0.5, 'rgba(236, 72, 153, 0.03)');
      nebula2.addColorStop(1, 'rgba(236, 72, 153, 0)');
      ctx.fillStyle = nebula2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Cyan nebula
      const nebula3 = ctx.createRadialGradient(
        canvas.width * 0.5, canvas.height * 0.1, 0,
        canvas.width * 0.5, canvas.height * 0.1, canvas.width * 0.3
      );
      nebula3.addColorStop(0, 'rgba(6, 182, 212, 0.06)');
      nebula3.addColorStop(1, 'rgba(6, 182, 212, 0)');
      ctx.fillStyle = nebula3;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Blue nebula
      const nebula4 = ctx.createRadialGradient(
        canvas.width * 0.7, canvas.height * 0.4, 0,
        canvas.width * 0.7, canvas.height * 0.4, canvas.width * 0.25
      );
      nebula4.addColorStop(0, 'rgba(59, 130, 246, 0.05)');
      nebula4.addColorStop(1, 'rgba(59, 130, 246, 0)');
      ctx.fillStyle = nebula4;
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
      style={{ background: 'radial-gradient(ellipse at center, #0a0514 0%, #000000 100%)' }}
    />
  );
}
