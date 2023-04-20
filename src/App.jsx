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
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    let allHeld = true;
    let allSame = true;
    let firstDie = dice[0].value;
    for (let i = 0; i < dice.length; i++) {
      if (!dice[i].isHeld) {
        allHeld = false;
      }
      if (dice[i].value !== firstDie) {
        allSame = false;
      }
    }
    if (allHeld && allSame) {
      setTenzies(true);
      console.log("You won!");
    }
  }, [dice]);

  function holdDice(id) {
    let newDice = dice.map((die) => {
      if (die.id === id) {
        die.isHeld = !die.isHeld;
      }
      return die;
    });
    setDice(newDice);
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

  function roll() {
    setDice((oldDice) => {
      let newDice = oldDice.map((die) => {
        if (!die.isHeld) {
          die.value = Math.floor(Math.random() * 6) + 1;
        }
        return die;
      });
      return newDice;
    });
  }

  return (
    <div className="App">
      <main>
        <section className="gameArea">
          <h1>Tenzies</h1>
          <p className="instructions">
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
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
