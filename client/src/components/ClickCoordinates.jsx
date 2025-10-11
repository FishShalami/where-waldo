import React from "react";

function ClickCoordinates(event) {
  const clickCoords = {
    x: event.clientX,
    y: event.clientY,
  };
  // console.log(clickCoords);
  return clickCoords;
}

export default ClickCoordinates;
