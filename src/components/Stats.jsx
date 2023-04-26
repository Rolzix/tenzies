import React from "react";
export default function Stats(props) {
  return (
    <div>
      <br />
      Stats:
      <br /> Roll count: {props.count}
      <br />
      {props.highScores.highScore < Infinity ? (
        <>Best luck: {props.highScores.highScore} rolls</>
      ) : null}
      <br />
      {props.highScores.bestTime < Infinity ? (
        <>Fastest game: {props.highScores.bestTime} seconds</>
      ) : null}
    </div>
  );
}
