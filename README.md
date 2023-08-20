# Tenzies

In the Tenzies game, you roll the dice until all dice are the same number.

**https://tenzies-rolzix.vercel.app/**

![Tenzies](https://github.com/Rolzix/Tenzies/assets/107266349/426e3c94-6c34-474f-a6aa-b19a79616d89)

## What you might not find in other Tenzies projects (non-tutorial features):

- [x] Roll with spacebar
- [x] Language selector and fully translated to English and Finnish

- [x] Statistics:
  - [x] Number of rolls in the current game
  - [x] Your luckiest game (least amount of rolls)
  - [x] Your fastest game (least amount of time to win)
  - [x] Reset statistics

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, React, react-i18next, Vite

This is a React project created with Vite. The game is a single-page application with a single component. The component is divided into two smaller components; Dice and Statistics. The game logic is in the App component. The dice are rolled with a random number generator. The game is won when all dice are the same number. The statistics are saved in the local storage. Resetting the statistics overwrites local storage with default values.

## Lessons Learned:

Notable Firsts:

- React

  - React-i18next
  - React-confetti
  - Conditional rendering
  - Local storage with React

- Vite
  - Development server
  - Building
  - Deployment
