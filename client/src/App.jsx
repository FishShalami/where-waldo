import React from "react";
import LoadWaldoImage from "./components/LoadWaldoImage";
import Header from "./components/Header";
import UserForm from "./components/UserForm";

async function fetchLeaderboard() {
  const res = await fetch("/api/leaderboard", { credentials: "include" });
  return res.json(); // [{ username, bestMs }, ...]
}

function App() {
  return (
    <>
      <Header />
      <LoadWaldoImage />
    </>
  );
}

export default App;
