
const names = ["Peter", "Billy", "Charlotte", "Sweedal"];

export function playGame(board: any[], rolls: number[]) {
  const players = names.map(name => ({
    name,
    money: 16,
    position: 0,
    bankrupt: false
  }));

  const owners: { [position: number]: number } = {};
  let turn = 0;

  for (const roll of rolls) {
    const playerIndex = turn % 4;
    const player = players[playerIndex];

    if (player.bankrupt) {
      turn++;
      continue;
    }

    const oldPosition = player.position;
    const total = oldPosition + roll;

    player.position = total % board.length;

    if (total >= board.length) {
      player.money += 1;
    }

    const space = board[player.position];

    if (space.type === "property") {
      const owner = owners[player.position];

      if (owner === undefined) {
        if (player.money < space.price) {
          player.bankrupt = true;
          break;
        }

        player.money -= space.price;
        owners[player.position] = playerIndex;
      } else if (owner !== playerIndex) {
        const colour = space.colour;

        const sameColour = board
          .map((item, index) => ({ item, index }))
          .filter(({ item }) =>
            item.type === "property" &&
            item.colour === colour
          );

        const ownsAll = sameColour.every(
          ({ index }) => owners[index] === owner
        );

        // ASSUMPTION: rent is half the price, rounded up.
        const baseRent = Math.ceil(space.price / 2);
        const rent = baseRent * (ownsAll ? 2 : 1);

        if (player.money < rent) {
          player.bankrupt = true;
          break;
        }

        player.money -= rent;
        players[owner].money += rent;
      }
    }

    turn++;
  }

  const highestMoney = Math.max(...players.map(p => p.money));

  const winners = players
    .filter(p => p.money === highestMoney)
    .map(p => p.name);

  return {
    winners,
    players: players.map(p => ({
      name: p.name,
      money: p.money,
      space: board[p.position].name
    }))
  };
}
