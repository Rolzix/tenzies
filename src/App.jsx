import React, { useState, useEffect } from "react";
import Dice from "./components/Die.jsx";
import "./App.css";

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
        </section>
      </main>
    </div>
  );
}

export default App;
