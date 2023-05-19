import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  debug: true,
  fallbackLng: "fi",
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  // language resources
  resources: {
    en: {
      translation: {
        welcome: "Welcome to React",
        instructions:
          "Roll until all dice are the same. Click each die to freeze it at its current value between rolls.",
        newGame: "New Game",
        roll: "Roll",
        hideStats: "Hide stats",
        showStats: "Show stats",
        rollCount: "Roll count: ",
        luck: "Best luck: ",
        rolls: "rolls",
        fastest: "Fastest: ",
        seconds: "seconds",
        resetStatsT: "Reset stats",
      },
    },
    fi: {
      translation: {
        welcome: "Tervetuloa!",
        instructions:
          "Pyöräytä noppia kunnes kaikki nopat ovat samoja. Klikkaa noppaa jäädyttääksesi sen arvon pyöräytyksien välillä.",
        newGame: "Uusi peli",
        roll: "Pyöräytä",
        hideStats: "Piilota tilastot",
        showStats: "Näytä tilastot",
        rollCount: "Pyöräytyksiä: ",
        luck: "Paras tuuri: ",
        rolls: "pyöräytystä",
        fastest: "Nopein: ",
        seconds: "sekuntia",
        resetStatsT: "Nollaa tilastot",
      },
    },
  },
});

export default i18n;
