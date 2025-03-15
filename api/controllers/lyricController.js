import * as geminiService from "../services/geminiService.js";
import * as songService from "../services/songService.js";

export const generateLyric = async (req, res) => {
    try {
        const randomSong = songService.getRandomSong();
        const { title, artist } = songService.extractTitleAndArtist(randomSong);

        const lyricSnippet = await geminiService.generateLyricSnippet(
            title,
            artist
        );

        // Store in session but also encrypt and send to client as backup
        req.session.currentSong = randomSong;
        
        // Simple encryption
        // TODO: in production use a proper encryption library
        const encodedSong = Buffer.from(randomSong).toString('base64');
        
        req.session.save((err) => {
            if (err) console.error("Session save error:", err);
            
            res.json({
                success: true,
                lyricSnippet,
                songToken: encodedSong // Send encrypted song data to client
            });
        });
    } catch (error) {
        console.error("Error generating lyric:", error);
        res.status(500).json({
            success: false,
            message: "Failed to generate lyric snippet",
        });
    }
};

export const checkGuess = async (req, res) => {
    try {
        const { userGuess, songToken } = req.body;
        let correctSong = req.session.currentSong;
        
        // Fallback if session data is missing
        if (!correctSong && songToken) {
            try {
                correctSong = Buffer.from(songToken, 'base64').toString();
            } catch (e) {
                console.error("Failed to decode song token:", e);
            }
        }

        if (!userGuess || !correctSong) {
            return res.status(400).json({
                success: false,
                message: "Missing required parameters",
            });
        }

        const { title, artist } =
            songService.extractTitleAndArtist(correctSong);

        // Use Gemini API for intelligent matching
        const result = await geminiService.checkGuessAccuracy(
            userGuess,
            title,
            artist
        );

        res.json({
            success: true,
            isCorrect: result.isCorrect,
            message: result.isCorrect
                ? `Correct! The song was "${title}" by ${artist}.`
                : `Sorry, the correct song was "${title}" by ${artist}.`,
        });
    } catch (error) {
        console.error("Error checking guess:", error);
        res.status(500).json({
            success: false,
            message: "Failed to check guess",
        });
    }
};
