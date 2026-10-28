
import * as fs from "node:fs";
import { playGame } from "./game";

const args = process.argv.slice(2);
const files = args.filter(arg => arg !== "--json");
const jsonOutput = args.includes("--json");

if (files.length !== 2) {
  console.log(
    "Usage: node dist/src/cli.js board.json rolls.json --json"
  );
  process.exit(1);
}

const board = JSON.parse(fs.readFileSync(files[0], "utf8"));
const rolls = JSON.parse(fs.readFileSync(files[1], "utf8"));

const result = playGame(board, rolls);

if (jsonOutput) {
  console.log(JSON.stringify(result, null, 2));
} else {
  console.log("Woven Monopoly Results");
  console.log("Winners:", result.winners.join(", "));
  console.table(result.players);
}
