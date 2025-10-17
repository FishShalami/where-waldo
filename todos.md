**To-Dos**

- Set-up back-end user time tracking and sessions
  - Set-up script to seed db with data
  - Set-up queries for db
  - Collect user name on completion
- Style the UI
  - Add a scoreboard at the bottom, fetch user scores
  - Change user feedback on guess location to pop-up on bottom of page instead of alert

**Set CORS policy**

**_Server_**

```
import cors from "cors";

app.use(cors({
  origin: "http://localhost:5173", // your React dev server
  credentials: true,               // allow cookies
}));

app.use(cookieSession({
  name: "waldo_sess",
  secret: process.env.COOKIE_SESSION_SECRET,
  httpOnly: true,
  sameSite: "lax",                 // works cross-site if top-level nav; for iframes use "none"
  secure: process.env.NODE_ENV === "production",
}));
```

**_Client/React_**

```
// Always include credentials when you need the session cookie
await fetch("http://localhost:3000/api/session/start", {
  method: "POST",
  credentials: "include",
});

await fetch("http://localhost:3000/api/score", {
  method: "POST",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ username }),
});

const res = await fetch("http://localhost:3000/api/leaderboard", {
  credentials: "include",
});
const data = await res.json();

```

**React Snippets**

Start a game (server sets start time)

```
async function startGame() {
  const res = await fetch("/api/session/start", { method: "POST", credentials: "include" });
  const data = await res.json();
  // Optionally display local timer from now; server will still be authoritative.
}
```

Submit score (username + server-computed time)

```
async function submitScore(username: string) {
  const res = await fetch("/api/score", {
    method: "POST",
    credentials: "include", // IMPORTANT: send cookie
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username }),
  });
  const data = await res.json();
  if (!res.ok) {
    // show error to user (e.g., "No active game session" or validation)
    throw new Error(data.error || "Submit failed");
  }
  return data; // { ok, username, elapsedMs, scoreId }
}
```

Load leaderboard

```
async function fetchLeaderboard() {
  const res = await fetch("/api/leaderboard", { credentials: "include" });
  return res.json(); // [{ username, bestMs }, ...]
}
```
