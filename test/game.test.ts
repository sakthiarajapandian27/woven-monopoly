
import test from "node:test";
import assert from "node:assert/strict";
import { playGame } from "../src/game.js";

const board = [
  { name: "GO", type: "go" },
  { name: "The Burvale", type: "property", price: 1, colour: "Brown" },
  { name: "Fast Kebabs", type: "property", price: 1, colour: "Brown" }
];

test("game returns four players and a winner", () => {
  const result = playGame(board, [0]);

  assert.equal(result.players.length, 4);
  assert.ok(result.winners.length > 0);
  assert.equal(result.players[0].name, "Peter");
});

test("player buys a property", () => {
  const result = playGame(board, [1]);

  assert.equal(result.players[0].money, 15);
  assert.equal(result.players[0].space, "The Burvale");
});

test("player pays rent to the property owner", () => {
  const result = playGame(board, [1, 1]);

  assert.equal(result.players[0].money, 16);
  assert.equal(result.players[1].money, 15);
});

test("rent doubles when the owner owns the whole colour group", () => {
  const result = playGame(board, [1, 0, 0, 0, 1, 2]);

  assert.equal(result.players[0].money, 16);
  assert.equal(result.players[1].money, 14);
});

test("player receives $1 when passing GO", () => {
  const result = playGame(board, [3]);

  assert.equal(result.players[0].money, 17);
  assert.equal(result.players[0].space, "GO");
});

test("game stops when a player cannot afford a property", () => {
  const expensiveBoard = [
    { name: "GO", type: "go" },
    { name: "Expensive Property", type: "property", price: 20, colour: "Brown" }
  ];

  const result = playGame(expensiveBoard, [1]);

  assert.equal(result.players[0].money, 16);
  assert.equal(result.players[0].space, "Expensive Property");
  assert.ok(result.winners.includes("Peter"));
});

test("game returns all players tied for the most money", () => {
  const result = playGame(board, []);

  assert.deepEqual(result.winners, [
    "Peter",
    "Billy",
    "Charlotte",
    "Sweedal"
  ]);
});
