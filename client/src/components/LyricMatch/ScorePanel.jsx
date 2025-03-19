const ScorePanel = ({ score, streak, highScore }) => (
    <div className="flex justify-between mt-4 p-2 bg-gray-800/40 backdrop-blur-sm rounded-lg border border-gray-700">
        <div className="text-sm font-medium text-gray-300 flex flex-col items-center">
            <span className="text-xs uppercase tracking-wide">Streak</span>
            <span className="text-2xl text-purple-400">{streak}</span>
        </div>
        <div className="text-sm font-medium text-gray-300 flex flex-col items-center">
            <span className="text-xs uppercase tracking-wide">Score</span>
            <span className="text-2xl text-blue-400">{score}</span>
        </div>
        <div className="text-sm font-medium text-gray-300 flex flex-col items-center lg:hidden">
            <span className="text-xs uppercase tracking-wide">High</span>
            <span className="text-2xl text-pink-400">{highScore}</span>
        </div>
    </div>
);

export default ScorePanel;