// imports
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cookieSession from "cookie-session";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

dotenv.config();

const app = express();

// resolve __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// add viewer engine

// CORS (allow client origin; reflect origin by default)
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || true,
    credentials: true,
  })
);

// session cookie
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
// send static files from public
app.use(express.static(path.join(__dirname, "public")));

// routes
app.get("/api", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "waldo_beach.jpg"));
});

//for testing cookies on write to req.session
app.get("/api/session/start", (req, res) => {
  req.session ||= {};
  req.session.testValue = (req.session.testValue || 0) + 1;
  res.json({
    message: "Session touched",
    testValue: req.session.testValue,
  });
});

export default app;
if (process.env.NETLIFY_LOCAL) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`app listening on ${PORT}!`));
}
