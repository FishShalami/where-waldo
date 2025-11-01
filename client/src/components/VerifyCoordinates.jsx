import React from "react";
import ClickCoordinates from "./ClickCoordinates";
import {
  waldo_x_coordinates,
  waldo_y_coordinates,
} from "../utils/WALDO_COORDINATES";
import WrongGuess from "./WrongGuess";
import { api, API } from "../api";

function VerifyCoordinates({
  gameStatus,
  setGameStatus,
  startTime, // not used here but available if needed
  setEndTime,
  guessCoordinates,
  setGuessCoordinates,
  setGameOver,
}) {
  const [wasWrong, setWasWrong] = React.useState(false);

  async function endSession() {
    await api("/api/session/end", { method: "POST" });
  }

  function handleImageClick(event) {
    const click = ClickCoordinates(event);

    const nextGuessCoordinates = [...guessCoordinates, click];
    setGuessCoordinates(nextGuessCoordinates);

    const { xPct, yPct } = click;
    const correctCoords =
      waldo_x_coordinates.includes(xPct) && waldo_y_coordinates.includes(yPct);

    if (!correctCoords) {
      setWasWrong(true);
      window.setTimeout(() => {
        setWasWrong(false);
      }, 1000);
      return;
    }

    const nextEndTime = Date.now();
    setEndTime(nextEndTime);
    setGameStatus(false);
    //attaches timestamp marking game end to session cookie
    endSession();
    setGameOver(true);
  }

  return (
    <>
      {wasWrong && <WrongGuess />}

      <div className="image-container">
        <img
          src={`${API}/api`}
          className={gameStatus ? "waldo-image" : "waldo-image-hide"}
          alt="waldo-image-full-screen"
          onClick={handleImageClick}
        />
      </div>
    </>
  );
}

export default VerifyCoordinates;
