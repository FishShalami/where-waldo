import React from "react";
import ClickCoordinates from "./ClickCoordinates";
import {
  waldo_x_coordinates,
  waldo_y_coordinates,
} from "../utils/WALDO_COORDINATES";

function VerifyCoordinates({ event, guessCoordinates, setGuessCoordinates }) {
  const userClickCoordinates = ClickCoordinates(event);
  const nextGuessCoordinates = [...guessCoordinates, userClickCoordinates];
  setGuessCoordinates(nextGuessCoordinates);
  console.log("USER GUESS COORDS:", nextGuessCoordinates);

  const mostRecentGuessIndex = nextGuessCoordinates.length - 1;
  const mostRecentXCoord = nextGuessCoordinates[mostRecentGuessIndex].x;
  const mostRecentYCoord = nextGuessCoordinates[mostRecentGuessIndex].y;
  //   const correctGuessMessage = alert("You found Waldo!");
  //   const wrongGuessMessage = alert("Guess again!");
  const correctXCoord = waldo_x_coordinates.includes(mostRecentXCoord);
  const correctYCoord = waldo_y_coordinates.includes(mostRecentYCoord);

  console.log("X Guess: ", mostRecentXCoord);
  console.log("X Coordinates:", waldo_x_coordinates);
  console.log("Guess Correct?: ", correctXCoord);

  return (
    <>
      {correctXCoord && correctYCoord
        ? alert("You found Waldo!")
        : alert("Guess again!")}
    </>
  );
}

export default VerifyCoordinates;
