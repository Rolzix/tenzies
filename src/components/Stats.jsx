/* eslint-disable react/prop-types */
import React from "react";

export default function Stats(props) {
  return (
    <div className="stats">
      {/* Stats: */}
      {props.rollCount}
      <br /> {props.count}
      <br />
      <br />
      {props.highScores.highScore < Infinity ? (
        <>
          {props.luck} <br />
          {props.highScores.highScore + " "}
          {props.rolls} <br />
          <br />
        </>
      ) : null}
      {props.highScores.bestTime < Infinity ? (
        <>
          {props.fastest}
          <br /> {props.highScores.bestTime + " "}
          {props.seconds} <br />
        </>
      ) : null}
      <button className="button--resetStats" onClick={props.resetStats}>
        {props.resetStatsT}
      </button>
    </div>
  );
}
