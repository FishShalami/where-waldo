import React from "react";
import ClickCoordinates from "./ClickCoordinates";
import {
  waldo_x_coordinates,
  waldo_y_coordinates,
} from "../utils/WALDO_COORDINATES";

function VerifyCoordinates({
  event,
  setGameStatus,
  startTime,
  setEndTime,
  guessCoordinates,
  setGuessCoordinates,
  setGameOver,
}) {
  //bail if the game isn't running
  if (!event) return null;

  const userClickCoordinates = ClickCoordinates(event);
  const nextGuessCoordinates = [...guessCoordinates, userClickCoordinates];
  setGuessCoordinates(nextGuessCoordinates);
  console.log("USER GUESS COORDS:", nextGuessCoordinates);

  const mostRecentGuessIndex = nextGuessCoordinates.length - 1;
  const mostRecentXCoord = nextGuessCoordinates[mostRecentGuessIndex].xPct;
  const mostRecentYCoord = nextGuessCoordinates[mostRecentGuessIndex].yPct;

  const correctXCoord = waldo_x_coordinates.includes(mostRecentXCoord);
  const correctYCoord = waldo_y_coordinates.includes(mostRecentYCoord);
  const correctCoords = correctXCoord && correctYCoord;
  // console.log("X Guess: ", mostRecentXCoord);
  // console.log("X Coordinates:", waldo_x_coordinates);
  // console.log("Y Guess: ", mostRecentYCoord);
  // console.log("Y Coordinates:", waldo_y_coordinates);
  // console.log("Guess X Correct?: ", correctXCoord);
  // console.log("Guess Y Correct?: ", correctYCoord);

  async function endSession() {
    await fetch("http://localhost:3000/api/session/end", {
      method: "POST",
      credentials: "include",
    });
  }

  function correctClick() {
    const nextEndTime = Date.now();
    setEndTime(nextEndTime);
    setGameStatus(false);
    // const timeToFind = GameTimeDelta({ startTime, nextEndTime });
    //attaches timestamp marking game end to session cookie
    endSession();
    setGameOver(true);
  }

  function clickHandler(correctCoords) {
    console.log("clickHandler called");

    if (!correctCoords) {
      alert("Guess again");
      return;
    }
    correctClick();
  }

  return <>{clickHandler(correctCoords)}</>;
}

export default VerifyCoordinates;
