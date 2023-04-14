import React, { useState, useEffect } from "react";
import Dice from "./components/Die.jsx";
import "./App.css";

/**
 * Challenge: Create a `Roll Dice` button that will re-roll
 * all 10 dice
 *
 * Clicking the button should generate a new array of numbers
 * and set the `dice` state to that new array (thus re-rendering
 * the array to the page)
 */

function App() {
  function allNewDice() {
    let dice = [];
    for (let i = 0; i < 10; i++) {
      dice.push(Math.floor(Math.random() * 6) + 1);
    }
    return dice;
  }

  const [dice, setDice] = useState(allNewDice());

  // useEffect(() => {
  //   allNewDice();
  // }, []);

  let diceElements = dice.map((die, index) => {
    return <Dice value={die} key={index} />;
  });

  return (
    <div className="App">
      <main>
        <section className="gameArea">
          <h1>Tenzies</h1>
          <div className="dice">{diceElements}</div>
          <button
            className="button--roll"
            onClick={() => setDice(allNewDice())}
          >
            Roll
          </button>
        </section>
      </main>
    </div>
  );
}

export default App;
