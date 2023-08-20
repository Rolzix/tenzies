import React, { useState, useEffect } from "react";
import Dice from "./components/Die.jsx";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Stats from "./components/Stats.jsx";
import { useTranslation } from "react-i18next";
import enFlag from "./assets/English_language.svg";
import fiFlag from "./assets/Flag_of_Finland.svg";
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
  const { t, i18n } = useTranslation();
  const languages = [
    { code: "en", native: "English" },
    { code: "fi", native: "Finnish" },
  ];
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
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleTrans = (code) => {
    i18n.changeLanguage(code);
  };

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

  useEffect(() => {
    // Update window dimensions when the window is resized
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
    setCount((count) => count + 1);
    if (tenzies) {
      // New game starts here
      console.log("new dice!");
      setDice(allNewDice());
      setCount(0);
      startTime = new Date().getTime();
    }
  }

  useEffect(() => {
    function handleKeyDown(event) {
      if (
        event.key === " " &&
        event.target.tagName !== "INPUT" &&
        event.target.tagName !== "TEXTAREA"
      ) {
        event.preventDefault();
        roll();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function toggleStats() {
    setStats(!stats);
  }

  function resetStats() {
    setHighScores({
      highScore: Infinity.toString(),
      bestTime: Infinity.toString(),
    });
  }

  const ConfettiScreen = () => {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 999,
          pointerEvents: "none",
        }}
      >
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
        />
      </div>
    );
  };

  return (
    <div className="App">
      <main>
        <section className="gameArea">
          <h1>Tenzies</h1>
          <div className="language-buttons instructions">
            {" "}
            Select language:
            {/* add svg image */}
            <img src={enFlag} alt="Fi" onClick={() => handleTrans("en")} />
            <img src={fiFlag} alt="En" onClick={() => handleTrans("fi")} />
          </div>
          <p className="instructions">
            {t("instructions")}
            <br />
          </p>
          <div className="dice">{diceElements}</div>
          <button className="button--roll" onClick={roll}>
            {tenzies ? t("newGame") : t("roll")}
          </button>
        </section>
        {tenzies && ConfettiScreen()}
      </main>
      <div className="statsContainer">
        <button className="button--stats" onClick={toggleStats}>
          {stats ? t("hideStats") : t("showStats")}
        </button>
        {stats && (
          <Stats
            rollCount={t("rollCount")}
            luck={t("luck")}
            rolls={t("rolls")}
            fastest={t("fastest")}
            resetStatsT={t("resetStatsT")}
            seconds={t("seconds")}
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
