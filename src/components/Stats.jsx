import React from "react";
export default function Stats(props) {
  return (
    <div className="stats">
      {/* Stats: */}
      Roll count: {props.count}
      <br />
      {props.highScores.highScore < Infinity ? (
        <>Best luck: {props.highScores.highScore} rolls</>
      ) : null}
      <br />
      {props.highScores.bestTime < Infinity ? (
        <>
          Fastest game:
          <br /> {props.highScores.bestTime} seconds
        </>
      ) : null}
    </div>
  );
}
