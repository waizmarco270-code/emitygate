
'use client';

const GalaxyBackground = () => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-background">
            <div
              className="absolute top-0 right-0 bottom-0 left-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)]"
              style={{
                animation: 'nebula-glow 8s alternate infinite',
              }}
            />
            <div id="stars-far" className="w-full h-[200%] absolute top-0 left-0 bg-[url(/assets/stars-far.png)] bg-repeat-y" style={{ animation: 'animStar-far 200s linear infinite' }} />
            <div id="stars-mid" className="w-full h-[200%] absolute top-0 left-0 bg-[url(/assets/stars-mid.png)] bg-repeat-y" style={{ animation: 'animStar-mid 100s linear infinite' }} />
            <div id="stars-near" className="w-full h-[200%] absolute top-0 left-0 bg-[url(/assets/stars-near.png)] bg-repeat-y" style={{ animation: 'animStar 50s linear infinite' }} />
        </div>
    );
};

export default GalaxyBackground;
