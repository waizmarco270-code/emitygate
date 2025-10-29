
'use client';

import { useTheme } from "next-themes";

const GalaxyBackground = () => {
    const { theme } = useTheme();

    // The nebula effect is primarily handled in globals.css for performance
    // This component just sets up the structure.
    // The radial gradients create the soft cloud shapes, and the nebula-glow animation
    // pulses their opacity to give a "living" feel.
    // We add a subtle starfield in the back for more depth.

    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-background">
             <div
              className="absolute top-0 right-0 bottom-0 left-0 bg-[radial-gradient(circle_500px_at_50%_200px,hsl(var(--primary)/0.15),transparent),radial-gradient(circle_400px_at_20%_80%,hsl(var(--accent)/0.1),transparent),radial-gradient(circle_600px_at_80%_70%,hsl(var(--primary)/0.1),transparent)]"
              style={{
                animation: 'nebula-glow 12s alternate infinite',
              }}
            />
            {/* Optional: A very subtle, slow-moving starfield can be added here for more depth */}
            {/* For now, the pure nebula provides a cleaner look */}
        </div>
    );
};

export default GalaxyBackground;
