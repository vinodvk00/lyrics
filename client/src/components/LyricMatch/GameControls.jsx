import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RefreshCw, Music, Headphones } from "lucide-react";

const GameControls = ({
    loading,
    lyricSnippet,
    userGuess,
    checkingAnswer,
    answerRevealed,
    generateLyricSnippet,
    handleGuessChange,
    handleKeyPress,
    checkAnswer
}) => {
    return (
        <>
            <Button
                onClick={generateLyricSnippet}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all border-0 py-6 text-lg"
                disabled={loading}
            >
                {loading ? (
                    <>
                        <RefreshCw className="mr-2 h-6 w-6 animate-spin" />
                        Generating...
                    </>
                ) : (
                    <>
                        <Music className="mr-2 h-6 w-6" />
                        {lyricSnippet ? "New Lyric Snippet" : "Generate Lyric Snippet"}
                    </>
                )}
            </Button>

            {lyricSnippet && (
                <div className="mt-8 space-y-6">
                    <div>
                        <label htmlFor="guess" className="text-lg font-medium text-gray-300 flex items-center">
                            <Headphones className="h-5 w-5 text-blue-400 mr-2" />
                            Your Guess:
                        </label>
                        <Input
                            id="guess"
                            value={userGuess}
                            onChange={handleGuessChange}
                            onKeyPress={handleKeyPress}
                            placeholder="Enter song title"
                            className={`mt-2 bg-gray-800 border-gray-700 text-white focus:ring-purple-500 focus:border-purple-500 py-6 text-lg ${answerRevealed ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={checkingAnswer || answerRevealed}
                        />
                    </div>

                    <Button
                        onClick={checkAnswer}
                        disabled={!userGuess || !lyricSnippet || checkingAnswer || answerRevealed}
                        className={`w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 transition-all border-0 py-6 text-lg ${answerRevealed ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {checkingAnswer ? (
                            <>
                                <RefreshCw className="mr-2 h-6 w-6 animate-spin" />
                                Checking...
                            </>
                        ) : (
                            "Check Answer"
                        )}
                    </Button>
                </div>
            )}
        </>
    );
};

export default GameControls;