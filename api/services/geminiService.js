import { GoogleGenerativeAI } from "@google/generative-ai";
import config from "../config/index.js";

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(config.geminiApiKey);
const model = genAI.getGenerativeModel({ model: config.geminiModel });

export const generateLyricSnippet = async (songTitle, artist) => {
    const prompt = `Generate a short, original lyric snippet (2-3 lines) of the song "${songTitle}" by ${artist}. 
  Make it recognizable enough that someone familiar with the song could guess it, but don't use any line which includes the title.
  Return ONLY the lyric snippet text, nothing else.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
};

export const checkGuessAccuracy = async (
    userGuess,
    correctTitle,
    correctArtist
) => {
    const prompt = `You are evaluating a music guessing game.
  
  Correct song: "${correctTitle}" by ${correctArtist}
  User guess: "${userGuess}"
  
  Determine if the user's guess is correct or not. Be somewhat lenient - accept the guess if:
  1. It contains the main part of the song title (even with minor typos)
  2. It contains a very common alternative name for the song
  3. If they only guessed the artist correctly but not the song title, it's still incorrect
  
  IMPORTANT: Respond with ONLY a raw JSON object with NO markdown formatting, code blocks, or additional text. 
  Your entire response should be a valid JSON object in this exact format:
  {
    "isCorrect": true/false,
    "explanation": "brief explanation of why it's correct or incorrect"
  }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();

    try {
        // Remove any markdown code block formatting if present
        const jsonText = text.replace(/```json|```/g, '').trim();
        return JSON.parse(jsonText);
    } catch (error) {
        console.error("Failed to parse Gemini response:", text);
        // Fallback to basic matching if parsing fails
        const isCorrect = userGuess
            .toLowerCase()
            .includes(correctTitle.toLowerCase());
        return {
            isCorrect,
            explanation: isCorrect ? "Match found" : "No match found",
        };
    }
};