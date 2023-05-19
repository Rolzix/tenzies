/* eslint-disable react/prop-types */
import React from "react";
export default function Stats(props) {
  return (
    <div className="stats">
      {/* Stats: */}
      Roll count: {props.count}
      <br />
      {props.highScores.highScore < Infinity ? (
        <>
          Best luck: {props.highScores.highScore} rolls <br />
        </>
      ) : null}
      {props.highScores.bestTime < Infinity ? (
        <>
          Fastest game:
          <br /> {props.highScores.bestTime} seconds <br />
        </>
      ) : null}
      <button className="button--resetStats" onClick={props.resetStats}>
        Reset stats
      </button>
    </div>
  );
}
