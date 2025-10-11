import React from "react";

function GameTimeStart({ setStartTime }) {
  const startTime = Date.now();
  setStartTime(startTime);
  console.log("Game Started at: ", startTime);
}

export default GameTimeStart;
