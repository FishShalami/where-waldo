import React from "react";
import VerifyCoordinates from "./VerifyCoordinates";

function LoadWaldoImage() {
  const [guessCoordinates, setGuessCoordinates] = React.useState([]);
  return (
    <div
      className="image-container"
      onClick={(event) =>
        VerifyCoordinates({ event, guessCoordinates, setGuessCoordinates })
      }
    >
      <img
        src="http://localhost:3000/api"
        className="waldo-image"
        alt="waldo-image-full-screen"
      />
    </div>
  );
}

export default LoadWaldoImage;
