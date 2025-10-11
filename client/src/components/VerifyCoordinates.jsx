import React from "react";
import ClickCoordinates from "./ClickCoordinates";
import {
  waldo_x_coordinates,
  waldo_y_coordinates,
} from "../utils/WALDO_COORDINATES";
import GameTimeDelta from "./GameTimeDelta";

function VerifyCoordinates({
  event,
  setGameStatus,
  startTime,
  setEndTime,
  guessCoordinates,
  setGuessCoordinates,
}) {
  if (!event) return null;

  const userClickCoordinates = ClickCoordinates(event);
  const nextGuessCoordinates = [...guessCoordinates, userClickCoordinates];
  setGuessCoordinates(nextGuessCoordinates);
  console.log("USER GUESS COORDS:", nextGuessCoordinates);

  const mostRecentGuessIndex = nextGuessCoordinates.length - 1;
  const mostRecentXCoord = nextGuessCoordinates[mostRecentGuessIndex].x;
  const mostRecentYCoord = nextGuessCoordinates[mostRecentGuessIndex].y;

  const correctXCoord = waldo_x_coordinates.includes(mostRecentXCoord);
  const correctYCoord = waldo_y_coordinates.includes(mostRecentYCoord);

  console.log("X Guess: ", mostRecentXCoord);
  console.log("X Coordinates:", waldo_x_coordinates);
  console.log("Y Guess: ", mostRecentYCoord);
  console.log("Y Coordinates:", waldo_y_coordinates);
  console.log("Guess X Correct?: ", correctXCoord);
  console.log("Guess Y Correct?: ", correctYCoord);

  function correctClickHandler() {
    const nextEndTime = Date.now();
    setEndTime(nextEndTime);
    setGameStatus("stop");
    const timeToFind = GameTimeDelta({ startTime, nextEndTime });
    alert(`You found Waldo in ${timeToFind} seconds!`);
  }

  return (
    <>
      {correctXCoord && correctYCoord
        ? correctClickHandler()
        : alert("Guess again!")}
    </>
  );
}

export default VerifyCoordinates;
