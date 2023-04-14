import React from "react";
// toggle die background when props.isHeld is true
export default function Dice(props) {
  return (
    <div
      className="die"
      style={{ backgroundColor: props.isHeld ? "#59E391" : "White" }}
    >
      <h1>{props.value}</h1>
    </div>
  );
}
