const Screen = require("./screen");
const Cursor = require("./cursor");
const { winningArrays } = require("../utilities/utility");

class ConnectFour {
  constructor() {
    this.playerTurn = "O";

    this.grid = [
      [" ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " "],
    ];

    this.cursor = new Cursor(6, 7);

    // Initialize a 6x7 connect-four grid
    Screen.initialize(6, 7);
    Screen.setGridlines(true);

    // Replace this with real commands
    Screen.addCommand("t", "test command (remove)", ConnectFour.testCommand);

    this.cursor.setBackgroundColor();
    Screen.render();
  }

  // Remove this
  static testCommand() {
    console.log("TEST COMMAND");
  }

  static checkWin(grid) {
    // Return 'X' if player X wins
    // Return 'O' if player O wins
    // Return 'T' if the game is a tie
    // Return false if the game has not ended

    const flatten = (grid) => {
      let result = [];

      for (let el of grid) {
        if (Array.isArray(el)) result = result.concat(flatten(el));
        else result.push(el);
      }

      return result;
    };

    let roundWon = false;
    let playerWon = undefined;
    let gameState = flatten(grid);

    for (let i = 0; i < winningArrays.length; i++) {
      const winComb = winningArrays[i];
      let a = gameState[winComb[0]];
      let b = gameState[winComb[1]];
      let c = gameState[winComb[2]];
      let d = gameState[winComb[3]];

      if (a === " " || b === " " || c === " " || d === " ") continue;
      if (a === b && b === c && c === d) {
        roundWon = true;
        playerWon = a;
        break;
      }
    }

    if (roundWon) return playerWon;

    let roundDraw = !gameState.includes(" ");
    if (roundDraw) return "T";
    else return false;
  }

  static endGame(winner) {
    if (winner === "O" || winner === "X") {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === "T") {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }
}

module.exports = ConnectFour;
