import express from 'express';
import { generateLyric, checkGuess } from '../controllers/lyricController.js';

const router = express.Router();

router.get('/generate-lyric', generateLyric);
router.post('/check-guess', checkGuess);

export default router;
