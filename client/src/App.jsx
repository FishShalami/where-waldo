// import { useState } from "react";

function App() {
  function handleClick(event) {
    const clickCoords = {
      x: event.clientX,
      y: event.clientY,
    };
    console.log(clickCoords);
  }

  return (
    <>
      <div className="image-container" onClick={handleClick}>
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
