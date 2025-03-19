import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Headphones } from "lucide-react";

import BackgroundEffects from "./BackgroundEffects";
import InfoPanel from "./InfoPanel";
import ScorePanel from "./ScorePanel";
import SoundWave from "./SoundWave";
import GameControls from "./GameControls";
import LyricDisplay from "./LyricDisplay";
import ResultAlert from "./ResultAlert";
import { useLyricGame } from "./hooks/useLyricGame";

const LyricMatch = () => {
    const {
        gameState,
        highScore,
        generateLyricSnippet,
        checkAnswer,
        handleGuessChange,
        handleKeyPress
    } = useLyricGame();

    const {
        lyricSnippet, userGuess, result, loading,
        checkingAnswer, streak, score, answerRevealed
    } = gameState;

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4 overflow-hidden">
            <BackgroundEffects />

            <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 relative z-10">
                <InfoPanel highScore={highScore} />

                <Card className="lg:w-2/3 w-full h-auto border-0 bg-gray-900/80 backdrop-blur-sm shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-blue-600/10 pointer-events-none"></div>
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500"></div>

                    <CardHeader className="relative z-10">
                        <div className="flex justify-center mb-2">
                            <Headphones className="h-10 w-10 text-purple-400 lg:hidden" />
                        </div>
                        <CardTitle className="text-3xl p-2 font-bold text-center bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text">
                            Lyric Match
                        </CardTitle>
                        <CardDescription className="text-center text-gray-400">
                            Test your music knowledge - name that tune!
                        </CardDescription>

                        <ScorePanel score={score} streak={streak} highScore={highScore} />
                        <SoundWave active={!!lyricSnippet} />
                    </CardHeader>

                    <CardContent className="space-y-6 relative z-10">
                        <GameControls
                            loading={loading}
                            lyricSnippet={lyricSnippet}
                            userGuess={userGuess}
                            checkingAnswer={checkingAnswer}
                            answerRevealed={answerRevealed}
                            generateLyricSnippet={generateLyricSnippet}
                            handleGuessChange={handleGuessChange}
                            handleKeyPress={handleKeyPress}
                            checkAnswer={checkAnswer}
                        />

                        {lyricSnippet && <LyricDisplay lyricSnippet={lyricSnippet} />}
                        {result && <ResultAlert result={result} />}
                    </CardContent>

                    <CardFooter className="text-sm text-gray-500 text-center relative z-10 border-t border-gray-800 mt-4 pt-6 flex justify-between">
                        <div className="w-full text-center">
                            <p className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text font-medium">
                                Expand your musical horizons one lyric at a time!
                            </p>
                            <div className="mt-4 flex justify-center gap-2">
                                <div className="h-1 w-12 rounded-full bg-purple-500/50"></div>
                                <div className="h-1 w-12 rounded-full bg-pink-500/50"></div>
                                <div className="h-1 w-12 rounded-full bg-blue-500/50"></div>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default LyricMatch;