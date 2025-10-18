// imports
import express from "express";
import path from "path";
import dotenv from "dotenv";
import cookieSession from "cookie-session";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

dotenv.config();

const prisma = new PrismaClient();

const app = express();

// add viewer engine

//set cors policy for react server
app.use(
  cors({
    origin: "http://localhost:5173", // your React dev server
    credentials: true, // allow cookies
  })
);

// add passport session
app.use(
  cookieSession({
    name: "waldo_sess",
    secret: process.env.COOKIE_SESSION_SECRET,
    httpOnly: true,
    sameSite: "lax", // works cross-site if top-level nav; for iframes use "none"
    secure: process.env.NODE_ENV === "production",
  })
);

app.use(express.json());
// send static files from public
app.use(express.static("public"));

// GET ROUTES
app.get("/api", (req, res) => {
  // res.json({ message: "Hello from server!" });
  res.sendFile(path.resolve("public/waldo_beach.jpg"));
});

/**
 * GET /api/leaderboard
 * Returns top N players by best (min) elapsed time.
 * For simplicity: top 10.
 */
app.get("/api/leaderboard", async (req, res) => {
  // Best score per user
  const best = await prisma.$queryRawUnsafe(`
    SELECT p.username, MIN(s."elapsedMs") as "bestMs"
    FROM "Score" s
    JOIN "Player" p ON p.id = s."playerId"
    GROUP BY p.username
    ORDER BY "bestMs" ASC
    LIMIT 10
  `);

  res.json(
    best.map((row) => ({
      username: row.username,
      bestMs: Number(row.bestMs),
    }))
  );
});

// POST ROUTES

/**
 * POST /api/session/start
 * Creates a new game session, recording server-authoritative start time.
 * Call this when the user clicks "Start".
 */
app.post("/api/session/start", (req, res) => {
  // New session each time start is pressed:
  req.session = {
    gameStart: Date.now(),
  };
  res.status(200).json({ ok: true, startedAt: req.session.gameStart });
});

//game end
app.post("/api/session/end", (req, res) => {
  req.session = {
    gameEnd: Date.now(),
  };
  res.status(200).json({ ok: true, endedAt: req.session.gameEnd });
});

/**
 * POST /api/score
 * Body: { username: string }
 * Uses server time to compute elapsed from session.gameStart
 */
app.post("/api/score", async (req, res) => {
  try {
    const { username } = req.body || {};
    if (!username || typeof username !== "string") {
      return res.status(400).json({ error: "Invalid username" });
    }

    //check start time is in cookie
    if (!req.session?.gameStart) {
      return res.status(400).json({ error: "No active game session" });
    }

    //check end time is in cookie
    if (!req.session?.gameEnd) {
      return res.status(400).json({ error: "Game hasn't ended" });
    }

    const elapsedMs = req.session.gameEnd - req.session.gameStart;
    // Simple sanity checks (optional):
    if (elapsedMs < 1000) {
      return res.status(400).json({ error: "Elapsed time too small" });
    }
    if (elapsedMs > 1000 * 60) {
      return res.status(400).json({ error: "You took too long!" });
    }

    // Ensure username exists (unique)
    const player = await prisma.player.upsert({
      where: { username },
      update: {}, // we don't change username
      create: { username },
    });

    // Persist score
    const score = await prisma.score.create({
      data: {
        elapsedMs,
        playerId: player.id,
      },
    });

    // Invalidate session start to prevent duplicate submissions without a new game
    req.session = null;

    res.status(201).json({ ok: true, username, elapsedMs, scoreId: score.id });
  } catch (err) {
    // Handle unique constraint errors etc.
    console.error(err);
    res.status(500).json({ error: "Failed to submit score" });
  }
});

//for testing cookies on write to req.session
// app.get("/api/session/start", (req, res) => {
//   req.session ||= {};
//   req.session.testValue = (req.session.testValue || 0) + 1;
//   res.json({
//     message: "Session touched",
//     testValue: req.session.testValue,
//   });
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log(`app listening on ${PORT}!`);
});
