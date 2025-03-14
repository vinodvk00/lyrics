import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RefreshCw, CheckCircle, XCircle, Music, Headphones, Mic, Volume2 } from "lucide-react";

const LyricMatch = () => {
  const [lyricSnippet, setLyricSnippet] = useState("");
  const [userGuess, setUserGuess] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [actualSong, setActualSong] = useState("");
  
  // TODO: replace with actual API call
  const generateLyricSnippet = async () => {
    setLoading(true);
    setResult(null);
    setUserGuess("");
    
    try {
      setTimeout(() => {
        const mockLyrics = [
          { lyric: "Just a small town girl, living in a lonely world", song: "Don't Stop Believin'" },
          { lyric: "Is this the real life? Is this just fantasy?", song: "Bohemian Rhapsody" },
          { lyric: "I've been staring at the edge of the water, long as I can remember", song: "How Far I'll Go" }
        ];
        
        const randomLyric = mockLyrics[Math.floor(Math.random() * mockLyrics.length)];
        setLyricSnippet(randomLyric.lyric);
        setActualSong(randomLyric.song);
        setLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error("Error generating lyric snippet:", error);
      setLyricSnippet("Error generating lyric snippet. Please try again.");
      setLoading(false);
    }
  };

  const checkAnswer = () => {
    if (!userGuess || !actualSong) return;
    
    // Case-insensitive comparison
    // TODO: consider using a more robust string comparison library
    const isCorrect = userGuess.toLowerCase() === actualSong.toLowerCase();
    
    setResult({
      correct: isCorrect,
      message: isCorrect 
        ? "Correct! You guessed the song title!" 
        : `Incorrect. The actual song title is "${actualSong}".`
    });
  };

  // Sound wave animation for decorative purposes
  // TODO: consider more responsive animation
  const SoundWave = () => (
    <div className="flex items-end justify-center h-12 gap-1 my-2">
      {[...Array(12)].map((_, i) => (
        <div 
          key={i} 
          className="bg-purple-500 w-1 rounded-full animate-pulse"
          style={{
            height: `${Math.max(15, Math.sin(i / 2) * 35 + Math.random() * 15)}px`,
            animationDelay: `${i * 0.1}s`,
            opacity: lyricSnippet ? 1 : 0.3
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4 bg-gradient-to-br from-gray-900 via-purple-950 to-gray-900">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500 rounded-full filter blur-3xl -translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl translate-x-16 translate-y-16"></div>
        <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-pink-500 rounded-full filter blur-3xl"></div>
      </div>
      
      <Card className="w-full max-w-md border-0 bg-gray-900/80 backdrop-blur-sm shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-blue-600/10 pointer-events-none"></div>
        
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500"></div>
        
        <CardHeader className="relative z-10">
          <div className="flex justify-center mb-2">
            <Headphones className="h-10 w-10 text-purple-400" />
          </div>
          <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text">
            Lyric Match
          </CardTitle>
          <CardDescription className="text-center text-gray-400">
            Test your music knowledge - name that tune!
          </CardDescription>
          <SoundWave />
        </CardHeader>
        
        <CardContent className="space-y-6 relative z-10">
          <Button 
            onClick={generateLyricSnippet} 
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all border-0"
            disabled={loading}
          >
            {loading ? (
              <>
                <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Music className="mr-2 h-5 w-5" />
                Generate Lyric Snippet
              </>
            )}
          </Button>
          
          {lyricSnippet && (
            <div className="mt-6">
              <div className="flex items-center mb-2">
                <Mic className="h-4 w-4 text-pink-400 mr-2" />
                <h3 className="text-sm font-medium text-gray-300">Lyric Snippet:</h3>
              </div>
              <div className="bg-gray-800 p-6 rounded-md border border-gray-700 text-center italic text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-500/5 to-transparent pointer-events-none"></div>
                <Volume2 className="h-5 w-5 text-gray-600 mb-2 mx-auto" />
                "{lyricSnippet}"
              </div>
              
              <div className="mt-6 space-y-4">
                <div>
                  <label htmlFor="guess" className="text-sm font-medium text-gray-300 flex items-center">
                    <Headphones className="h-4 w-4 text-blue-400 mr-2" />
                    Your Guess:
                  </label>
                  <Input
                    id="guess"
                    value={userGuess}
                    onChange={(e) => setUserGuess(e.target.value)}
                    placeholder="Enter song title"
                    className="mt-1 bg-gray-800 border-gray-700 text-white focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                
                <Button 
                  onClick={checkAnswer} 
                  disabled={!userGuess || !lyricSnippet}
                  className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 transition-all border-0"
                >
                  Check Answer
                </Button>
              </div>
            </div>
          )}
          
          {result && (
            <Alert className={result.correct ? "bg-green-900/50 border border-green-700" : "bg-red-900/50 border border-red-700"}>
              {result.correct ? (
                <CheckCircle className="h-5 w-5 text-green-400" />
              ) : (
                <XCircle className="h-5 w-5 text-red-400" />
              )}
              <AlertTitle className="text-white">
                {result.correct ? "Correct!" : "Incorrect!"}
              </AlertTitle>
              <AlertDescription className="text-gray-300">
                {result.message}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        
        <CardFooter className="text-xs text-gray-500 text-center relative z-10 border-t border-gray-800 mt-4 pt-4">
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text font-medium">
            Expand your musical horizons one lyric at a time!
          </span>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LyricMatch;