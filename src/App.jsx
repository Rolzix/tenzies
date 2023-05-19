import React, { useState, useEffect } from "react";
import Dice from "./components/Die.jsx";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Stats from "./components/Stats.jsx";
import "./App.css";

let startTime = new Date().getTime();
let endTime = Infinity;

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
  const [count, setCount] = useState(0);
  const [stats, setStats] = useState(true);
  const [highScores, setHighScores] = useState(
    JSON.parse(localStorage.getItem("highScores")) || {
      highScore: Infinity.toString(),
      bestTime: Infinity.toString(),
    }
  );

  useEffect(() => {
    localStorage.setItem("highScores", JSON.stringify(highScores));
  }, [highScores]);

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
      endTime = new Date().getTime();
      let time = endTime - startTime;
      // convert time to seconds
      time = Math.floor(time / 1000);
      if (time < highScores.bestTime) {
        setHighScores((oldScores) => {
          return { ...oldScores, bestTime: time };
        });
        console.log("New best time!");
      }
      setTenzies(true);
      console.log("You won!");
      if (count < highScores.highScore) {
        setHighScores((oldScores) => {
          return { ...oldScores, highScore: count };
        });
        console.log("New high score!");
      }
    } else {
      setTenzies(false);
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
    setCount(count + 1);
    setDice((oldDice) => {
      let newDice = oldDice.map((die) => {
        if (!die.isHeld) {
          die.value = Math.floor(Math.random() * 6) + 1;
        }
        return die;
      });
      return newDice;
    });
    if (tenzies) {
      // New game starts here
      console.log("new dice!");
      setDice(allNewDice());
      setCount(0);
      startTime = new Date().getTime();
    }
  }

  function toggleStats() {
    setStats(!stats);
  }

  function resetStats() {
    setHighScores({ highScore: Infinity.toString(), bestTime: Infinity });
  }

  return (
    <div className="App">
      <main>
        <section className="gameArea">
          <h1>Tenzies</h1>
          <p className="instructions">
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls. <br />
          </p>
          <div className="dice">{diceElements}</div>
          <button className="button--roll" onClick={roll}>
            {tenzies ? "New Game" : "Roll"}
          </button>
        </section>

        {tenzies && <Confetti />}
      </main>
      <div className="statsContainer">
        <button className="button--stats" onClick={toggleStats}>
          {stats ? "Hide stats" : "Show stats"}
        </button>
        {stats && (
          <Stats
            count={count}
            highScores={highScores}
            resetStats={resetStats}
          />
        )}
      </div>
    </div>
  );
}

export default App;
