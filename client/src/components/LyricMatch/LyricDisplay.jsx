import { Mic, Volume2 } from "lucide-react";

const LyricDisplay = ({ lyricSnippet }) => (
    <div className="mt-8">
        <div className="flex items-center mb-2">
            <Mic className="h-5 w-5 text-pink-400 mr-2" />
            <h3 className="text-lg font-medium text-gray-300">Lyric Snippet:</h3>
        </div>
        <div className="bg-gray-800 p-8 rounded-md border border-gray-700 text-center italic text-white relative overflow-hidden h-48 flex flex-col justify-center">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-500/5 to-transparent pointer-events-none"></div>
            <Volume2 className="h-6 w-6 text-gray-600 mb-4 mx-auto" />
            <p className="text-xl">"{lyricSnippet}"</p>
        </div>
    </div>
);

export default LyricDisplay;