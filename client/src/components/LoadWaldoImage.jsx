import React from "react";
import VerifyCoordinates from "./VerifyCoordinates";
import GameTimeStart from "./GameTimeStart";
import UserForm from "./UserForm";

function LoadWaldoImage() {
  //set state variables
  const [gameStatus, setGameStatus] = React.useState(false);
  const [startTime, setStartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");
  const [guessCoordinates, setGuessCoordinates] = React.useState([]);
  const [displayElapsedTime, setDisplayElapsedTime] = React.useState(0);
  const [gameOver, setGameOver] = React.useState(false);

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
    const res = await fetch("http://localhost:3000/api/session/start", {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json();
  }

  // async function confirmEndGame() {
  //   try {
  //     const res = await fetch("http://localhost:3000/api/session/end", {
  //       method: "GET",
  //       credentials: "include",
  //     });
  //     const data = await res.json();
  //     console.log("Confirm end game:", data.hasOwnProperty("endTime"));
  //     return data.hasOwnProperty("endTime");
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  function imageClickHandler(event) {
    console.log("calling imageClickHandler");
    //verify game is running before testing coordinates
    if (!gameStatus) {
      return;
    }

    VerifyCoordinates({
      event,
      setGameStatus,
      startTime,
      setEndTime,
      guessCoordinates,
      setGuessCoordinates,
      setGameOver,
    });

    // setTimeout(() => {
    //   // console.log("call confirmEndGame");
    //   const gameEnded = confirmEndGame();
    //   console.log("within setTimeout setter:", gameEnded);
    // }, 250);
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
      <div className="timer">{displayElapsedTime} seconds</div>
      {gameOver ? <UserForm /> : null}
      <div className="image-container">
        <img
          src="http://localhost:3000/api"
          className={gameStatus ? "waldo-image" : "waldo-image-hide"}
          alt="waldo-image-full-screen"
          onClick={imageClickHandler}
        />
      </div>
    </>
  );
}

export default LoadWaldoImage;
