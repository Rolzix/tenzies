import React from "react";

export default function Dice(props) {
  return (
    <div className="die">
      <h1>{props.value}</h1>
    </div>
  );
}
