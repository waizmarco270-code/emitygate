
'use client';
import React, { useState, useRef, useEffect } from 'react';

// Adapted from https://github.com/transitive-bullshit/react-starfield
interface StarfieldProps {
  starCount?: number;
  starColor?: [number, number, number];
  speedFactor?: number;
  backgroundColor?: string;
  className?: string;
}

const Starfield: React.FC<StarfieldProps> = ({
  starCount = 1000,
  starColor = [255, 255, 255],
  speedFactor = 0.05,
  backgroundColor,
  className,
  ...rest
}) => {
  const [stars, setStars] = useState<
    {
      x: number;
      y: number;
      z: number;
    }[]
  >([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const initStars = () => {
      const newStars = Array.from({ length: starCount }, () => ({
        x: Math.random() * 2 - 1,
        y: Math.random() * 2 - 1,
        z: Math.random(),
      }));
      setStars(newStars);
    };
    initStars();
  }, [starCount]);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;
    
    let animationFrameId: number;

    const render = () => {
      if (backgroundColor) {
        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, dimensions.width, dimensions.height);
      } else {
        context.clearRect(0, 0, dimensions.width, dimensions.height);
      }


      const cx = dimensions.width / 2;
      const cy = dimensions.height / 2;
      
      const focalLength = dimensions.width / 2;

      context.fillStyle = `rgb(${starColor[0]}, ${starColor[1]}, ${starColor[2]})`;

      const updatedStars = stars.map((star) => {
        let { x, y, z } = star;
        z -= speedFactor * 0.01;

        if (z <= 0) {
          x = Math.random() * 2 - 1;
          y = Math.random() * 2 - 1;
          z = 1;
        }

        const screenX = x * focalLength / z + cx;
        const screenY = y * focalLength / z + cy;
        const radius = (1 - z) * 2;
        const opacity = (1 - z) * 0.8 + 0.2;

        context.beginPath();
        context.arc(screenX, screenY, radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(${starColor[0]}, ${starColor[1]}, ${starColor[2]}, ${opacity})`;
        context.fill();

        return { x, y, z };
      });

      setStars(updatedStars);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [stars, dimensions, speedFactor, starColor, backgroundColor]);
  
  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
      }}
       className={className}
      {...rest}
    >
       <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        style={{ position: 'absolute', top: 0, left: 0 }}
      />
    </div>
  );
};

export default Starfield;
