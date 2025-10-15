import React from "react";
import VerifyCoordinates from "./VerifyCoordinates";
import GameTimeStart from "./GameTimeStart";

function LoadWaldoImage() {
  //set state variables
  const [gameStatus, setGameStatus] = React.useState("stop");
  const [startTime, setStartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");
  const [guessCoordinates, setGuessCoordinates] = React.useState([]);

  return (
    <>
      <div className="start-button-container">
        <button
          className="start-button"
          onClick={() => {
            setGameStatus("run");
            GameTimeStart({ setStartTime });
          }}
        >
          Start Game
        </button>
      </div>
      <div className="image-container">
        <img
          src="http://localhost:3000/api"
          className="waldo-image"
          alt="waldo-image-full-screen"
          onClick={
            //verify game is running before testing coordinates
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
        />
      </div>
    </>
  );
}

export default LoadWaldoImage;
