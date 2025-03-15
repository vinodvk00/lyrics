import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RefreshCw, CheckCircle, XCircle, Music, Headphones, Mic, Volume2, Award } from "lucide-react";

const LyricMatch = () => {
  const [lyricSnippet, setLyricSnippet] = useState("");
  const [userGuess, setUserGuess] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checkingAnswer, setCheckingAnswer] = useState(false);
  const [streak, setStreak] = useState(0);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('lyricMatchHighScore');
    return saved ? parseInt(saved, 10) : 0;
  });

  // API endpoint 
  const API_URL = import.meta.env.VITE_API_URL || '';

  // Save high score to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('lyricMatchHighScore', highScore.toString());
  }, [highScore]);

  // Generate static background circles once on component mount
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
    }));

    setBackgroundCircles(newCircles);
  }, []);

  // Add a state variable for songToken 
  const [songToken, setSongToken] = useState("");

  // In the generateLyricSnippet function, save the token
  const generateLyricSnippet = async () => {
    setLoading(true);
    setResult(null);
    setUserGuess("");

    try {
      const response = await fetch(`/api/generate-lyric`, {
        credentials: 'include' // Important for session cookies, prev i was missing sometimes
      });
      const data = await response.json();

      if (data.success) {
        setLyricSnippet(data.lyricSnippet);
        setSongToken(data.songToken); // Save the song token
      } else {
        throw new Error(data.message || "Failed to fetch lyric snippet");
      }
    } catch (error) {
      console.error("Error generating lyric snippet:", error);
      setLyricSnippet("Error generating lyric snippet. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Then in the checkAnswer function, include songToken in the request
  const checkAnswer = async () => {
    if (!userGuess || !lyricSnippet || checkingAnswer) return;

    setCheckingAnswer(true);

    try {
      const response = await fetch(`/api/check-guess`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userGuess,
          songToken // Include the songToken
        }),
        credentials: 'include' // Important for session cookies
      });

      const data = await response.json();

      if (data.success) {
        const isCorrect = data.isCorrect;

        if (isCorrect) {
          const newStreak = streak + 1;
          setStreak(newStreak);

          const pointsEarned = 10 * newStreak;
          const newScore = score + pointsEarned;
          setScore(newScore);

          // Update high score if applicable
          if (newScore > highScore) {
            setHighScore(newScore);
          }
        } else {
          setStreak(0);
        }

        setResult({
          correct: isCorrect,
          message: data.message,
          pointsEarned: isCorrect ? 10 * (streak + 1) : 0
        });
      } else {
        throw new Error(data.message || "Failed to check answer");
      }
    } catch (error) {
      console.error("Error checking answer:", error);
      setResult({
        correct: false,
        message: "Error checking answer. Please try again."
      });
    } finally {
      setCheckingAnswer(false);
    }
  };

  // Handle enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && userGuess && !checkingAnswer) {
      checkAnswer();
    }
  };

  // Sound wave animation
  const SoundWave = () => (
    <div className="flex items-end justify-center h-16 gap-1 my-4">
      {[...Array(24)].map((_, i) => (
        <div
          key={i}
          className="bg-purple-500 w-1 rounded-full animate-pulse"
          style={{
            height: `${Math.max(15, Math.sin(i / 3) * 40 + 15)}px`, // Removed random for consistency
            animationDelay: `${i * 0.07}s`,
            opacity: lyricSnippet ? 1 : 0.3
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4 overflow-hidden">
      {/* Fixed background that extends beyond the viewport */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-purple-950 to-gray-900" />

      {/* Fixed background circles with stable animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <style jsx>{`
          @keyframes float-0 { 0%, 100% { transform: translate(-50%, -50%); } 50% { transform: translate(-60%, -55%); } }
          @keyframes float-1 { 0%, 100% { transform: translate(-50%, -50%); } 50% { transform: translate(-40%, -60%); } }
          @keyframes float-2 { 0%, 100% { transform: translate(-50%, -50%); } 50% { transform: translate(-45%, -40%); } }
          @keyframes float-3 { 0%, 100% { transform: translate(-50%, -50%); } 50% { transform: translate(-55%, -45%); } }
          @keyframes float-4 { 0%, 100% { transform: translate(-50%, -50%); } 50% { transform: translate(-48%, -52%); } }
          @keyframes float-5 { 0%, 100% { transform: translate(-50%, -50%); } 50% { transform: translate(-52%, -48%); } }
          @keyframes float-6 { 0%, 100% { transform: translate(-50%, -50%); } 50% { transform: translate(-47%, -53%); } }
          @keyframes float-7 { 0%, 100% { transform: translate(-50%, -50%); } 50% { transform: translate(-53%, -47%); } }
        `}</style>

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
              animation: `float-${circle.id} ${circle.animationDuration} infinite ease-in-out`,
              transform: `translate(-50%, -50%)`,
            }}
          />
        ))}
      </div>

      {/* Main content container */}
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 relative z-10">
        {/* Left panel - visible only on large screens */}
        <div className="hidden lg:flex lg:w-1/3 flex-col justify-center items-center p-6 bg-gray-900/40 backdrop-blur-sm rounded-xl border border-gray-800 shadow-xl">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-pink-600/30 to-blue-600/30 rounded-full blur-xl animate-pulse"></div>
            <Headphones className="h-24 w-24 text-purple-400 relative z-10" />
          </div>

          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text text-center">
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

        {/* Main game card with fixed heights */}
        <Card className="lg:w-2/3 w-full h-auto border-0 bg-gray-900/80 backdrop-blur-sm shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-blue-600/10 pointer-events-none"></div>

          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500"></div>

          <CardHeader className="relative z-10">
            <div className="flex justify-center mb-2">
              <Headphones className="h-10 w-10 text-purple-400 lg:hidden" />
            </div>
            <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text">
              Lyric Match
            </CardTitle>
            <CardDescription className="text-center text-gray-400">
              Test your music knowledge - name that tune!
            </CardDescription>
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
            <SoundWave />
          </CardHeader>

          <CardContent className="space-y-6 relative z-10">
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

            {/* Lyric content with fixed height */}
            {lyricSnippet && (
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

                <div className="mt-8 space-y-6">
                  <div>
                    <label htmlFor="guess" className="text-lg font-medium text-gray-300 flex items-center">
                      <Headphones className="h-5 w-5 text-blue-400 mr-2" />
                      Your Guess:
                    </label>
                    <Input
                      id="guess"
                      value={userGuess}
                      onChange={(e) => setUserGuess(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Enter song title"
                      className="mt-2 bg-gray-800 border-gray-700 text-white focus:ring-purple-500 focus:border-purple-500 py-6 text-lg"
                      disabled={checkingAnswer}
                    />
                  </div>

                  <Button
                    onClick={checkAnswer}
                    disabled={!userGuess || !lyricSnippet || checkingAnswer}
                    className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 transition-all border-0 py-6 text-lg"
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
              </div>
            )}

            {/* Result alert with consistent height */}
            {result && (
              <Alert className={`p-6 ${result.correct ? "bg-green-900/50 border border-green-700" : "bg-red-900/50 border border-red-700"}`}>
                {result.correct ? (
                  <CheckCircle className="h-6 w-6 text-green-400" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-400" />
                )}
                <AlertTitle className="text-xl font-bold text-white ml-2">
                  {result.correct ? "Correct!" : "Incorrect!"}
                </AlertTitle>
                <AlertDescription className="text-gray-300 ml-2">
                  {result.message}
                  {result.correct && (
                    <div className="mt-2 text-lg text-green-300 font-bold">+{result.pointsEarned} points!</div>
                  )}
                </AlertDescription>
              </Alert>
            )}
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