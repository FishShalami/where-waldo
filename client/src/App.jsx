// import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  fetch("http://localhost:3000/api");

  return (
    <>
      <div>
        <img
          src="http://localhost:3000/api"
          className="waldo-image"
          alt="waldo-image-full-screen"
        />
      </div>
    </>
  );
}

export default App;
