import React from "react";

function ClickCoordinates(e) {
  const img = e.currentTarget; // the <img>
  const xPct = Math.round((e.nativeEvent.offsetX / img.clientWidth) * 1000); // 0..1
  const yPct = Math.round((e.nativeEvent.offsetY / img.clientHeight) * 1000); // 0..1
  console.log("X: ", xPct);
  console.log("Y: ", yPct);
  return { xPct, yPct };
}

export default ClickCoordinates;
