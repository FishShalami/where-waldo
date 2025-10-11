import React from "react";
import VerifyCoordinates from "./VerifyCoordinates";
import GameTimeStart from "./GameTimeStart";

function LoadWaldoImage() {
  const [gameStatus, setGameStatus] = React.useState("stop");
  const [startTime, setStartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");
  const [guessCoordinates, setGuessCoordinates] = React.useState([]);

  return (
    <>
      <div>
        <button
          onClick={() => {
            setGameStatus("run");
            GameTimeStart({ setStartTime });
          }}
        >
          Start Game
        </button>
      </div>
      <div
        className="image-container"
        onClick={
          gameStatus === "run"
            ? (event) =>
                VerifyCoordinates({
                  event,
                  setGameStatus,
                  startTime,
                  setEndTime,
                  guessCoordinates,
                  setGuessCoordinates,
                })
            : undefined
        }
      >
        <img
          src="http://localhost:3000/api"
          className="waldo-image"
          alt="waldo-image-full-screen"
        />
      </div>
    </>
  );
}

export default LoadWaldoImage;
