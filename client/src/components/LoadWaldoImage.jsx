import React from "react";
import VerifyCoordinates from "./VerifyCoordinates";
import GameTimeStart from "./GameTimeStart";

function LoadWaldoImage() {
  //set state variables
  const [gameStatus, setGameStatus] = React.useState(false);
  const [startTime, setStartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");
  const [guessCoordinates, setGuessCoordinates] = React.useState([]);
  const [displayElapsedTime, setDisplayElapsedTime] = React.useState(0);

  React.useEffect(() => {
    let interval = null;

    if (gameStatus && endTime === "") {
      interval = setInterval(() => {
        setDisplayElapsedTime((displayElapsedTime) => displayElapsedTime + 1);
      }, 1000);
    }

    //clean-up
    return () => {
      clearInterval(interval);
    };
  }, [gameStatus, endTime]);

  async function startSession() {
    await fetch("http://localhost:3000/api/session/start", {
      method: "POST",
      credentials: "include",
    });
  }

  return (
    <>
      <div className="start-button-container">
        <button
          className="start-button"
          onClick={() => {
            setGameStatus(true);
            GameTimeStart({ setStartTime });
            startSession();
          }}
        >
          Start Game
        </button>
      </div>
      {/* add logic to only show timer when game is running */}
      <div className="timer">{displayElapsedTime} seconds</div>
      <div className="image-container">
        <img
          src="http://localhost:3000/api"
          className={gameStatus ? "waldo-image" : "waldo-image-hide"}
          alt="waldo-image-full-screen"
          onClick={
            //verify game is running before testing coordinates
            gameStatus
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
