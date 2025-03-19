import { useState, useEffect } from 'react';

const BackgroundEffects = () => {
    const [backgroundCircles, setBackgroundCircles] = useState([]);

    useEffect(() => {
        // Generate static background circles only once
        const newCircles = [...Array(8)].map((_, i) => ({
            id: i,
            width: `${Math.random() * 400 + 100}px`,
            height: `${Math.random() * 400 + 100}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            backgroundColor: [`#8B5CF6`, `#3B82F6`, `#EC4899`, `#8B5CF6`, `#6366F1`][i % 5],
            animationDuration: `${Math.random() * 20 + 30}s`,
            animationName: `float-${i}`,
        }));

        setBackgroundCircles(newCircles);
    }, []);

    return (
        <>
            <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-purple-950 to-gray-900" />
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {/* Use style element without jsx prop */}
                <style>
                {`
                    @keyframes float-0 { 0%, 100% { transform: translate(-50%, -50%); } 50% { transform: translate(-60%, -55%); } }
                    @keyframes float-1 { 0%, 100% { transform: translate(-50%, -50%); } 50% { transform: translate(-40%, -60%); } }
                    @keyframes float-2 { 0%, 100% { transform: translate(-50%, -50%); } 50% { transform: translate(-45%, -40%); } }
                    @keyframes float-3 { 0%, 100% { transform: translate(-50%, -50%); } 50% { transform: translate(-55%, -45%); } }
                    @keyframes float-4 { 0%, 100% { transform: translate(-50%, -50%); } 50% { transform: translate(-48%, -52%); } }
                    @keyframes float-5 { 0%, 100% { transform: translate(-50%, -50%); } 50% { transform: translate(-52%, -48%); } }
                    @keyframes float-6 { 0%, 100% { transform: translate(-50%, -50%); } 50% { transform: translate(-47%, -53%); } }
                    @keyframes float-7 { 0%, 100% { transform: translate(-50%, -50%); } 50% { transform: translate(-53%, -47%); } }
                `}
                </style>

                {backgroundCircles.map((circle) => (
                    <div
                        key={circle.id}
                        className="absolute rounded-full filter blur-3xl opacity-20"
                        style={{
                            width: circle.width,
                            height: circle.height,
                            top: circle.top,
                            left: circle.left,
                            backgroundColor: circle.backgroundColor,
                            animation: `${circle.animationName} ${circle.animationDuration} infinite ease-in-out`,
                            transform: `translate(-50%, -50%)`,
                        }}
                    />
                ))}
            </div>
        </>
    );
};

export default BackgroundEffects;