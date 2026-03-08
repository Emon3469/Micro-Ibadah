const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const routineRoutes = require("./routes/routineRoutes");
const duaRoutes = require("./routes/duaRoutes");
const quranRoutes = require("./routes/quranRoutes");
const progressRoutes = require("./routes/progressRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");
const adminRoutes = require("./routes/adminRoutes");
const groupRoutes = require("./routes/groupRoutes");
const journalRoutes = require("./routes/journalRoutes");
const rpgRoutes = require("./routes/rpgRoutes");
const aiCoachRoutes = require("./routes/aiCoachRoutes");
const duaBoardRoutes = require("./routes/duaBoardRoutes");
const challengeRoutes = require("./routes/challengeRoutes");

const app = express();

const normalizeOrigin = (value) => String(value || "").trim().replace(/\/$/, "");

const allowedOrigins = new Set(
  [
    process.env.CLIENT_URL,
    process.env.FRONTEND_URL,
    ...(process.env.CLIENT_URLS || "").split(","),
    "http://localhost:5173",
    "http://localhost:4173",
  ]
    .map(normalizeOrigin)
    .filter(Boolean)
);

if (allowedOrigins.size === 0) {
  console.warn("CORS warning: no explicit frontend origin configured. Allowing all origins.");
}

app.use(
  cors({
    origin: (origin, callback) => {
      const requestOrigin = normalizeOrigin(origin);
      if (!origin || allowedOrigins.size === 0 || allowedOrigins.has(requestOrigin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({ status: "ok", message: "Micro-Ibadah API is running" });
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "Micro-Ibadah API" });
});

app.use("/api/auth", authRoutes);
app.use("/api/routines", routineRoutes);
app.use("/api/duas", duaRoutes);
app.use("/api/quran", quranRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/journal", journalRoutes);
app.use("/api/rpg", rpgRoutes);
app.use("/api/ai-coach", aiCoachRoutes);
app.use("/api/dua-board", duaBoardRoutes);
app.use("/api/challenges", challengeRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: "Server error" });
});

module.exports = app;
