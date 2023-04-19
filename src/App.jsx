import React, { useState, useEffect } from "react";
import Dice from "./components/Die.jsx";
import { nanoid } from "nanoid";
import "./App.css";
function App() {
  function allNewDice() {
    let dice = [];
    for (let i = 0; i < 10; i++) {
      const die = Math.floor(Math.random() * 6) + 1;
      dice.push({ value: die, isHeld: false, id: nanoid() });
    }
    return dice;
  }

  const [dice, setDice] = useState(allNewDice());

  // useEffect(() => {
  //   allNewDice();
  // }, []);

  function holdDice(id) {
    console.log(id);
  }

  let diceElements = dice.map((die, index) => {
    return (
      <Dice
        value={die.value}
        key={index}
        isHeld={die.isHeld}
        holdDice={() => holdDice(die.id)}
        id={die.id}
      />
    );
  });

  function roll(event) {
    setDice(allNewDice());
  }

  return (
    <div className="App">
      <main>
        <section className="gameArea">
          <h1>Tenzies</h1>
          <div className="dice">{diceElements}</div>
          <button className="button--roll" onClick={roll}>
            Roll
          </button>
        </section>
      </main>
    </div>
  );
}

export default App;
