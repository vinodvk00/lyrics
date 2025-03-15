import express from "express";
import cors from "cors";
import MemoryStore from "memorystore";
import session from "express-session";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import lyricRoutes from "./routes/lyricRoutes.js";

dotenv.config();

const __dirname = path.resolve();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use(
    cors({
        origin: process.env.CORS_ORIGIN || "http://localhost:5173",
        credentials: true,
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"]
    })
);

const MemoryStoreSession = MemoryStore(session);

app.use(
    session({
        cookie: {
            secure: process.env.NODE_ENV === "production" || process.env.RENDER === "true",
            maxAge: 60 * 60 * 1000, // 1 hour
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax'
        },
        store: new MemoryStoreSession({
            checkPeriod: 86400000, // prune expired entries every 24h
        }),
        secret: process.env.SESSION_SECRET || "lyric-match-secret",
        resave: false,
        saveUninitialized: true, // Change this to true for your use case
    })
);

app.use(cookieParser());

// Routes
app.use("/api", lyricRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

// Serve static files if in production
// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "/client/dist")));

//     app.get("*", (req, res) => {
//         res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
//     });
// }

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
