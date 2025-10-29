
'use client';

import React, { useRef, useEffect } from 'react';
import { useMousePosition } from '@/hooks/use-mouse-position';

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosition = useMousePosition();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 150;
    
    let mouse = {
        x: 0,
        y: 0,
        radius: 100
    }
    
    const resizeCanvas = () => {
        if(typeof window !== 'undefined') {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    }

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      baseX: number;
      baseY: number;
      opacity: number;
      twinkleSpeed: number;

      constructor(color: string) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
        this.color = color;
        this.baseX = this.x;
        this.baseY = this.y;
        this.opacity = Math.random();
        this.twinkleSpeed = Math.random() * 0.05;
      }

      update() {
        if(typeof window === 'undefined') return;
        
        mouse.x = mousePosition.x;
        mouse.y = mousePosition.y;
        
        // Mouse interaction
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.size * 0.5;
        let directionY = forceDirectionY * force * this.size * 0.5;

        if (distance < mouse.radius) {
            this.x -= directionX;
            this.y -= directionY;
        } else {
             this.x += this.speedX;
             this.y += this.speedY;
        }

        // Twinkle effect
        this.opacity += this.twinkleSpeed;
        if (this.opacity > 1 || this.opacity < 0) {
            this.twinkleSpeed *= -1;
        }
        this.opacity = Math.max(0, Math.min(1, this.opacity));


        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const init = () => {
      particles = [];
      const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary');
      const particleColor = `hsl(${primaryColor.split(' ').join(', ')})`;
      
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(particleColor));
      }
    };

    const connect = () => {
        let opacityValue = 1;
        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                let dx = particles[a].x - particles[b].x;
                let dy = particles[a].y - particles[b].y;
                let distance = Math.sqrt(dx*dx + dy*dy);

                if (distance < 100) {
                    const combinedOpacity = particles[a].opacity * particles[b].opacity;
                    opacityValue = (1 - (distance/100)) * combinedOpacity;
                    if (!ctx) return;
                    ctx.strokeStyle = `rgba(255, 255, 255, ${opacityValue * 0.2})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const particle of particles) {
        particle.update();
        particle.draw();
      }
      connect();
      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    init();
    animate();

    const handleResize = () => {
        resizeCanvas();
        init();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [mousePosition]); 

  useEffect(() => {
    // This is just to ensure the canvas is resized on initial load after hydration
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    handleResize(); // Also run it once on mount
    window.addEventListener('load', handleResize);
    return () => window.removeEventListener('load', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full -z-10"
    />
  );
};

export default ParticleBackground;
