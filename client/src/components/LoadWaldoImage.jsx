import React from "react";
import VerifyCoordinates from "./VerifyCoordinates";
import GameTimeStart from "./GameTimeStart";
import UserForm from "./UserForm";
const API = import.meta.env.VITE_API_URL;

function LoadWaldoImage({ messageSuccess, setMessageSuccess }) {
  //set state variables
  const [gameStatus, setGameStatus] = React.useState(false);
  const [startTime, setStartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");
  const [guessCoordinates, setGuessCoordinates] = React.useState([]);
  const [displayElapsedTime, setDisplayElapsedTime] = React.useState(0);
  const [gameOver, setGameOver] = React.useState(false);
  const [startButtonActive, setStartButtonActive] = React.useState(true);

  //counter for the UI
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

  //move this into a useEffect()?
  async function startSession() {
    const res = await fetch(`${API}/api/session/start`, {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json();
  }

  return (
    <>
      <div className="start-button-container">
        <button
          disabled={!startButtonActive}
          className="start-button"
          onClick={() => {
            setGameStatus(true);
            GameTimeStart({ setStartTime });
            startSession();
            setStartButtonActive(false);
          }}
        >
          Start Game
        </button>
      </div>

      <div className="timer">{displayElapsedTime} seconds</div>

      {gameOver ? (
        <UserForm
          messageSuccess={messageSuccess}
          setMessageSuccess={setMessageSuccess}
        />
      ) : null}

      <VerifyCoordinates
        gameStatus={gameStatus}
        setGameStatus={setGameStatus}
        startTime={startTime}
        setEndTime={setEndTime}
        guessCoordinates={guessCoordinates}
        setGuessCoordinates={setGuessCoordinates}
        setGameOver={setGameOver}
      />
    </>
  );
}

export default LoadWaldoImage;
