import React from "react";
import LoadWaldoImage from "./components/LoadWaldoImage";
import Header from "./components/Header";

async function sendScore() {
  await fetch("http://localhost:3000/api/score", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username }),
  });
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
