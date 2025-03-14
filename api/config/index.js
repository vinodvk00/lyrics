import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT || 3000,
  geminiApiKey: process.env.GEMINI_API_KEY,
  geminiModel: "gemini-2.0-flash"
};