import React from "react";

function WrongGuess() {
  console.log("WrongGuess component called");
  return (
    <div className="wrong-guess-banner">
      <p>Try again!</p>
    </div>
  );
}

export default WrongGuess;
