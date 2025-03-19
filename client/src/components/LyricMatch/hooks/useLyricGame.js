import { useState, useEffect, useCallback } from "react";

export const useLyricGame = () => {
    // State management
    const [gameState, setGameState] = useState({
        lyricSnippet: "",
        userGuess: "",
        result: null,
        loading: false,
        checkingAnswer: false,
        streak: 0,
        score: 0,
        answerRevealed: false,
        songToken: "",
    });

    const [highScore, setHighScore] = useState(() => {
        const saved = localStorage.getItem("lyricMatchHighScore");
        return saved ? parseInt(saved, 10) : 0;
    });

    // Destructure game state for easier access in hook functions
    const {
        lyricSnippet,
        userGuess,
        streak,
        score,
        checkingAnswer,
        answerRevealed,
        songToken,
    } = gameState;

    // Save high score to localStorage when it changes
    // TODO: database connection
    useEffect(() => {
        localStorage.setItem("lyricMatchHighScore", highScore.toString());
    }, [highScore]);

    // Generate lyric snippet
    const generateLyricSnippet = useCallback(async () => {
        setGameState((prev) => ({
            ...prev,
            loading: true,
            result: null,
            userGuess: "",
            answerRevealed: false,
        }));

        try {
            const response = await fetch(`/api/generate-lyric`, {
                credentials: "include",
            });
            const data = await response.json();

            if (data.success) {
                setGameState((prev) => ({
                    ...prev,
                    lyricSnippet: data.lyricSnippet,
                    songToken: data.songToken,
                    loading: false,
                }));
            } else {
                throw new Error(
                    data.message || "Failed to fetch lyric snippet"
                );
            }
        } catch (error) {
            console.error("Error generating lyric snippet:", error);
            setGameState((prev) => ({
                ...prev,
                lyricSnippet:
                    "Error generating lyric snippet. Please try again.",
                loading: false,
            }));
        }
    }, []);

    // Check answer
    const checkAnswer = useCallback(async () => {
        if (!userGuess || !lyricSnippet || checkingAnswer || answerRevealed)
            return;

        setGameState((prev) => ({ ...prev, checkingAnswer: true }));

        try {
            const response = await fetch(`/api/check-guess`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userGuess, songToken }),
                credentials: "include",
            });

            const data = await response.json();

            if (data.success) {
                const isCorrect = data.isCorrect;
                const newStreak = isCorrect ? streak + 1 : 0;
                const pointsEarned = isCorrect ? 10 * newStreak : 0;
                const newScore = score + pointsEarned;

                // Update high score if applicable
                if (newScore > highScore) {
                    setHighScore(newScore);
                }

                setGameState((prev) => ({
                    ...prev,
                    result: {
                        correct: isCorrect,
                        message: data.message,
                        pointsEarned: pointsEarned,
                    },
                    streak: newStreak,
                    score: newScore,
                    answerRevealed: !isCorrect,
                    checkingAnswer: false,
                }));
            } else {
                throw new Error(data.message || "Failed to check answer");
            }
        } catch (error) {
            console.error("Error checking answer:", error);
            setGameState((prev) => ({
                ...prev,
                result: {
                    correct: false,
                    message: "Error checking answer. Please try again.",
                },
                checkingAnswer: false,
            }));
        }
    }, [
        userGuess,
        lyricSnippet,
        checkingAnswer,
        answerRevealed,
        streak,
        score,
        songToken,
        highScore,
    ]);

    // Handle guess change
    const handleGuessChange = useCallback((e) => {
        setGameState((prev) => ({ ...prev, userGuess: e.target.value }));
    }, []);

    // Handle enter key press
    const handleKeyPress = useCallback(
        (e) => {
            if (
                e.key === "Enter" &&
                userGuess &&
                !checkingAnswer &&
                !answerRevealed
            ) {
                checkAnswer();
            }
        },
        [userGuess, checkingAnswer, answerRevealed, checkAnswer]
    );

    return {
        gameState,
        highScore,
        generateLyricSnippet,
        checkAnswer,
        handleGuessChange,
        handleKeyPress,
    };
};
