import React from "react";

function GameTimeDelta({ startTime, nextEndTime }) {
  const timeDelta = (nextEndTime - startTime) / 1000;
  return timeDelta;
}

export default GameTimeDelta;
