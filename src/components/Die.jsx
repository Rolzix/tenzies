import React from "react";
export default function Dice(props) {
  return (
    <div
      className="die"
      onClick={props.holdDice}
      style={{ backgroundColor: props.isHeld ? "#59E391" : "White" }}
    >
      <h1>{props.value}</h1>
    </div>
  );
}
