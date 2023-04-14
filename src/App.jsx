import React, { useState, useEffect } from "react";
import Dice from "./components/Die.jsx";
import "./App.css";

function allNewDice() {
  let dice = [];
  for (let i = 0; i < 10; i++) {
    dice.push(Math.floor(Math.random() * 6) + 1);
  }
  return dice;
}

console.log(allNewDice());

function App() {
  return (
    <div className="App">
      <main>
        <section className="gameArea">
          <h1>Tenzies</h1>
          <div className="dice">
            <Dice value={1} />
            <Dice value={2} />
            <Dice value={3} />
            <Dice value={4} />
            <Dice value={5} />
            <Dice value={6} />
            <Dice value={7} />
            <Dice value={8} />
            <Dice value={9} />
            <Dice value={1} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
