# 🎵 Lyric Match

A dynamic web application that tests users' music knowledge by generating AI-powered lyric snippets and challenging them to guess the song titles.

## 🌟 Features

- **AI-Generated Lyrics**: Utilizes Google's Gemini AI to generate unique lyric snippets
- **Real-time Scoring**: Track your current score and maintain high scores
- **Streak System**: Build streaks for bonus points
- **Responsive Design**: Seamless experience across all devices
- **Interactive UI**: Beautiful animations and transitions
- **Session Management**: Secure token-based validation

## 🛠️ Tech Stack

- **Frontend**:
  - React + Vite
  - TailwindCSS
  - Shadcn/ui Components
  - Lucide Icons

- **Backend**:
  - Node.js
  - Express.js
  - Google Generative AI (Gemini)
  - Express Session

## 🚀 Getting Started

1. **Clone the repository**
```bash
git clone https://github.com/vinodvk00/lyrics
cd lyric-match
```

2. **Set up environment variables**

Create `.env` in root directory:
```env
GEMINI_API_KEY=your_api_key
SESSION_SECRET=your_secret
PORT=3000
CORS_ORIGIN=http://localhost:5173
```

Create `.env` in client directory:
```env
VITE_API_URL=http://localhost:3000
```

3. **Install dependencies**
```bash
# Install server dependencies
npm install

# Install client dependencies
cd client
npm install
```

4. **Run the application**
```bash
# Start backend server (from root directory)
npm run dev

# Start frontend development server (from client directory)
npm run dev
```

## 🎮 How to Play

1. Click "Generate Lyric Snippet" to get a new lyric
2. Read the AI-generated lyric snippet
3. Enter your guess for the song title
4. Build streaks and earn bonus points for correct answers
5. Try to beat your high score!

## 🏗️ Project Structure

```
lyric-match/
├── api/                   # Backend server
│   ├── controllers/       # Request handlers
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   └── config/           # Configuration
└── client/               # Frontend React app
    ├── src/
    │   ├── components/   # Reusable components
    │   ├── pages/       # Page components
    │   └── lib/         # Utilities
    └── public/          # Static assets
```

## 🧪 Features to Add

- [ ] Database integration for song storage
- [ ] User authentication and profiles
- [ ] Leaderboard system
- [ ] Different difficulty levels
- [ ] More song categories

## 📝 License

MIT License - feel free to use this project for learning and development!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](#).