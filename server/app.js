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

// allow secure cookies behind Netlify proxy
app.set("trust proxy", 1);

const staticDir = path.join(process.cwd(), "public");
const allowedOrigin = process.env.CLIENT_ORIGIN;

app.use(
  cors({
    origin: allowedOrigin
      ? allowedOrigin.split(",").map((origin) => origin.trim())
      : true,
    credentials: true,
  })
);

app.use(
  cookieSession({
    name: "waldo_sess",
    secret: process.env.COOKIE_SESSION_SECRET,
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: undefined,
  })
);

app.use(express.json());
app.use(express.static(staticDir));

// GET routes
app.get("/api", (req, res) => {
  res.sendFile(path.join(staticDir, "waldo_beach.jpg"));
});

app.get("/api/leaderboard", async (req, res) => {
  try {
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
});

app.post("/api/session/start", (req, res) => {
  if (!req.session) req.session = {};
  req.session.gameStart = Date.now();
  res.status(200).json({ ok: true, startedAt: req.session.gameStart });
});

app.post("/api/session/end", (req, res) => {
  if (!req.session) req.session = {};
  req.session.gameEnd = Date.now();
  res.status(200).json({
    ok: true,
    startedAt: req.session.gameStart,
    endedAt: req.session.gameEnd,
  });
});

app.get("/api/session/end", (req, res) => {
  const endTime = req.session?.gameEnd;
  const startTime = req.session?.gameStart;
  if (!startTime || !endTime) {
    return res.status(400).json({ error: "No completed session" });
  }

  const delta = (endTime - startTime) / 1000;
  res.status(200).json({ delta });
});

app.post("/api/score", async (req, res) => {
  try {
    const { username } = req.body || {};
    if (!username || typeof username !== "string") {
      return res.status(400).json({ error: "Invalid username" });
    }

    if (!req.session?.gameStart) {
      return res.status(400).json({ error: "No active game session" });
    }
    if (!req.session?.gameEnd) {
      return res.status(400).json({ error: "Game hasn't ended" });
    }

    const elapsedMs = req.session.gameEnd - req.session.gameStart;
    if (elapsedMs < 1000) {
      return res.status(400).json({ error: "Elapsed time too small" });
    }
    if (elapsedMs > 1000 * 60) {
      return res.status(400).json({ error: "You took too long!" });
    }

    const player = await prisma.player.upsert({
      where: { username },
      update: {},
      create: { username },
    });

    const score = await prisma.score.create({
      data: {
        elapsedMs,
        playerId: player.id,
      },
    });

    req.session = null;

    res.status(201).json({ ok: true, username, elapsedMs, scoreId: score.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to submit score" });
  }
});

export default app;

if (process.env.NETLIFY_LOCAL) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`app listening on ${PORT}!`));
}
