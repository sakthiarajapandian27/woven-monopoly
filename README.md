
# Woven Monopoly

A simple command-line Monopoly game implemented in TypeScript and Node.js.

## Requirements

- Node.js
- npm

## Project Structure

```text
woven-monopoly/
├── src/
│   ├── cli.ts
│   └── game.ts
├── test/
│   └── game.test.ts
├── board.json
├── rolls_1.json
├── rolls_2.json
├── rolls_3.json
├── package.json
├── tsconfig.json
├── README.md
└── AI_USAGE.md
```

## Installation

Install the project dependencies:

```bash
npm install
```

## Build

Compile the TypeScript code:

```bash
npm run build
```

The compiled JavaScript files are generated in the `dist` directory.

## Run the Game

Run the game using the board JSON file and a dice-rolls JSON file.

For example:

```bash
npm start -- board.json rolls_1.json
```

To display the result as JSON:

```bash
npm start -- board.json rolls_1.json --json
```

Other sample games can be run using:

```bash
npm start -- board.json rolls_2.json --json
npm start -- board.json rolls_3.json --json
```

### Input Files

- `board.json`: Defines the game board and its spaces.
- `rolls_1.json`: Contains the dice rolls for the first sample game.
- `rolls_2.json`: Contains the dice rolls for the second sample game.
- `rolls_3.json`: Contains a custom sequence of dice rolls.

The board and dice-roll files are supplied to the program as command-line arguments.

## Game Rules Implemented

- Four players participate: Peter, Billy, Charlotte and Sweedal.
- Each player starts with $16.
- Players move according to the supplied dice rolls.
- Players receive $1 when passing GO.
- Unowned properties are purchased when a player lands on them, provided they can afford the price.
- Players pay rent when landing on a property owned by another player.
- Rent doubles when the owner owns every property in that colour group.
- The game stops when a player cannot afford a required property purchase or rent payment.
- The winner is determined by the player or players with the most money remaining.

### Rent Calculation Assumption

The provided board data does not include a rent amount. Therefore, this implementation assumes that base rent is half the property's price, rounded up. Rent is doubled when the owner holds the complete colour group.

This is an implementation assumption and should be checked against the original coding-test requirements.

## Automated Tests

Run the automated tests with:

```bash
npm test
```

This command compiles the TypeScript project and runs the tests using Node.js's built-in test runner.

The current test suite contains seven tests covering:

1. Game setup, player count and winner output.
2. Property purchases.
3. Rent payments.
4. Doubled rent for a complete colour group.
5. Passing GO.
6. Insufficient funds for a property purchase.
7. Tied winners.

The tests verify these specific behaviours under the current implementation and assumptions. They do not establish complete coverage of every possible game scenario.

## Technologies

- TypeScript
- Node.js
- npm
- JSON
- Node.js built-in test runner
