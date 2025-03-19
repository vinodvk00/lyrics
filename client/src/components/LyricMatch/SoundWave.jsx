const SoundWave = ({ active }) => (
    <div className="flex items-end justify-center h-16 gap-1 my-4">
        {[...Array(24)].map((_, i) => (
            <div
                key={i}
                className="bg-purple-500 w-1 rounded-full animate-pulse"
                style={{
                    height: `${Math.max(15, Math.sin(i / 3) * 40 + 15)}px`,
                    animationDelay: `${i * 0.07}s`,
                    opacity: active ? 1 : 0.3
                }}
            />
        ))}
    </div>
);

export default SoundWave;