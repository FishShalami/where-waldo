// imports
import express from "express";
import path from "path";
import dotenv from "dotenv";
import cookieSession from "cookie-session";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();

// add viewer engine

// add passport session
app.use(
  cookieSession({
    name: "waldo_sess",
    secret: process.env.COOKIE_SESSION_SECRET,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: undefined,
  })
);

app.use(express.json());
// send static files from public
app.use(express.static("public"));

// routes
app.get("/api", (req, res) => {
  // res.json({ message: "Hello from server!" });
  res.sendFile(path.resolve("public/waldo_beach.jpg"));
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

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log(`app listening on ${PORT}!`);
});
