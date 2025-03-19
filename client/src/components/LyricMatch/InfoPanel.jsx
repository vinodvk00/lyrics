import { Headphones, Award } from "lucide-react";

const InfoPanel = ({ highScore }) => (
    <div className="hidden lg:flex lg:w-1/3 flex-col justify-center items-center p-6 bg-gray-900/40 backdrop-blur-sm rounded-xl border border-gray-800 shadow-xl">
        <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-pink-600/30 to-blue-600/30 rounded-full blur-xl animate-pulse"></div>
            <Headphones className="h-24 w-24 text-purple-400 relative z-10" />
        </div>

        <h2 className="text-4xl font-bold mb-6 p-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text text-center">
            Test Your Music Knowledge
        </h2>

        <div className="space-y-4 text-center">
            <p className="text-gray-300 text-lg">Identify songs from lyric snippets</p>
            <p className="text-gray-300 text-lg">Build your streak for bonus points</p>
            <p className="text-gray-300 text-lg">Challenge yourself and friends</p>
        </div>

        <div className="mt-12">
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700">
                <div className="flex items-center mb-4 justify-center">
                    <Award className="h-6 w-6 text-yellow-400 mr-2" />
                    <h3 className="text-xl font-medium text-white">High Score</h3>
                </div>
                <div className="text-5xl font-bold text-center bg-gradient-to-r from-yellow-400 to-amber-500 text-transparent bg-clip-text">
                    {highScore}
                </div>
            </div>
        </div>
    </div>
);

export default InfoPanel;