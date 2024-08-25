// console.log("Hello world!");

// Declare our variables for our 2D Array, score, row, and column
let board;
let score = 0;
let rows = 4;
let columns = 4;
let is2048Exist = false;
let is4096Exist = false;
let is8192Exist = false;

// Create a function to set the game
// start of setGame()
function setGame() {
  // Initialize the 4x4 game board with all tiles set to 0.
  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  // Create the gameboard on the HTML document
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      //console.log(`[r${r}-c${c}]`);

      // Create div element representing a tile
      let tile = document.createElement("div");

      // Set ID for each tile based on its coordinates.
      tile.id = r.toString() + "-" + c.toString();

      // getting the number from the board
      // wherein the board is currently being set to 0
      let num = board[r][c];

      // Update the tile's appearance based on the value.
      updateTile(tile, num);

      // Place the tile inside the board in the right place.
      document.getElementById("board").append(tile);
    }
  }

  // Random Tile
  setTwo();
  setTwo();
}
// end of setGame()

// start of updateTile()

function updateTile(tile, num) {
  // clear the tile text
  tile.innerText = "";

  // clear the classList to avoid multiple classes
  tile.classList.value = "";

  // add class named "tile" to the classList of the tile, for the styling.
  tile.classList.add("tile");

  // to check if the current num parameter is not zero
  if (num > 0) {
    // set the tile's text to the number based on the num value.
    tile.innerText = num.toString();

    if (num <= 4096) {
      tile.classList.add("x" + num.toString());
    } else {
      tile.classList.add("x8192");
    }
  }
}

// end of updateTile()

// start of window.onload

window.onload = function () {
  setGame();
};

// end of window.onload

// start of handleSlide()

function handleSlide(e) {
  // check the keydown event
  // console.log(e.code);

  // Check if the pressed key is one of the arrow keys.
  if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.code)) {
    e.preventDefault();

    if (e.code == "ArrowLeft") {
      slideLeft();
      setTwo();
    } else if (e.code == "ArrowRight") {
      slideRight();
      setTwo();
    } else if (e.code == "ArrowUp") {
      slideUp();
      setTwo();
    } else if (e.code == "ArrowDown") {
      slideDown();
      setTwo();
    }

    document.getElementById("score").innerText = score;

    // use setTimeout to delay the alert
    setTimeout(() => {
      if (hasLost()) {
        alert("Game Over! You have lost the game. Game will restart.");
        // reset the game
        restartGame();
        alert("Press enter to restart.");
      } else {
        checkWin();
      }
    }, 100); //delay time in miliseconds
  }
}

// When any key is pressed, the handleSlide() is called to handle the key press.
document.addEventListener("keydown", handleSlide);

// end of handleSlide()

// start of filterZero(tiles)

function filterZero(tiles) {
  // create a new array by removing the zeroes
  return tiles.filter((num) => num != 0);
}

// end of filterZero(tiles)

// start of slide(tiles)
// function for sliding and merging tiles
function slide(tiles) {
  tiles = filterZero(tiles);

  for (let i = 0; i < tiles.length; i++) {
    // if two adjacent numbers are equal
    if (tiles[i] == tiles[i + 1]) {
      // merge by doubling the first value
      tiles[i] *= 2;
      // set the second value to zero
      tiles[i + 1] = 0;

      score += tiles[i];
    }
  }

  tiles = filterZero(tiles);

  //Add zeroes back
  while (tiles.length < 4) {
    tiles.push(0);
  }

  return tiles;
}

//end of slide(tiles)

// start of slideLeft()

function slideLeft() {
  for (let r = 0; r < rows; r++) {
    // store cuurent row in the row variable
    let row = board[r];

    // This is for line animation
    let originalRow = row.slice();

    // slide function will return a new value for a specific row (merge)
    row = slide(row);

    // Updated row values in the board.
    board[r] = row;

    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];

      // line for animation
      // if current line is not equal to the original tile apply animation
      if (originalRow[c] !== num && num !== 0) {
        // should specify the animation style and duration
        tile.style.animation = "slide-from-right 0.1s";

        // remove the animation after completion
        setTimeout(() => {
          tile.style.animation = "";
        }, 300);
      }

      updateTile(tile, num);
    }
  }
}

// end of slideLeft()

// start of slideRight()

function slideRight() {
  for (let r = 0; r < rows; r++) {
    // store cuurent row in the row variable
    let row = board[r];

    // This is for line animation
    let originalRow = row.slice();

    // reverse the row array since it is sliding right
    row.reverse();

    // slide function will return a new value for a specific row (merge)
    row = slide(row);

    row.reverse();

    // Updated row values in the board.
    board[r] = row;

    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];

      // line for animation
      // if current line is not equal to the original tile apply animation
      if (originalRow[c] !== num && num !== 0) {
        // should specify the animation style and duration
        tile.style.animation = "slide-from-left 0.1s";

        // remove the animation after completion
        setTimeout(() => {
          tile.style.animation = "";
        }, 300);
      }

      updateTile(tile, num);
    }
  }
}

// end of slideRight()

// start of slideUp()

function slideUp() {
  for (let c = 0; c < columns; c++) {
    // create a temporary array col that represents the column
    let col = [board[0][c], board[1][c], board[2][c], board[3][c]];

    let originalColumn = col.slice();

    col = slide(col);

    for (let r = 0; r < rows; r++) {
      //set  the value of board array back to the values of the modified column
      board[r][c] = col[r];

      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];

      // line for animation
      // if current line is not equal to the original tile apply animation
      if (originalColumn[r] !== num && num !== 0) {
        // should specify the animation style and duration
        tile.style.animation = "slide-from-bottom 0.1s";

        // remove the animation after completion
        setTimeout(() => {
          tile.style.animation = "";
        }, 300);
      }

      updateTile(tile, num);
    }
  }
}

// end of slideUp()

// start of slideDown()

function slideDown() {
  for (let c = 0; c < columns; c++) {
    // create a temporary array col that represents the column
    let col = [board[0][c], board[1][c], board[2][c], board[3][c]];

    let originalColumn = col.slice();

    col.reverse();

    col = slide(col);

    col.reverse();

    for (let r = 0; r < rows; r++) {
      //set  the value of board array back to the values of the modified column
      board[r][c] = col[r];

      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];

      // line for animation
      // if current line is not equal to the original tile apply animation
      if (originalColumn[r] !== num && num !== 0) {
        // should specify the animation style and duration
        tile.style.animation = "slide-from-top 0.1s";

        // remove the animation after completion
        setTimeout(() => {
          tile.style.animation = "";
        }, 300);
      }

      updateTile(tile, num);
    }
  }
}

// end of slideDown()

// start of hasEmptyTile()
// check whether the game board contains an empty space

function hasEmptyTile() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      // Check if current tile is empty
      if (board[r][c] == 0) {
        return true;
      }
    }
  }
  // no tile == 0
  return false;
}

// end of hasEmptyTile()

// start of setTwo()
// add a new random 2 tile in the game board.
function setTwo() {
  // check if has empty
  if (!hasEmptyTile()) {
    return;
  }

  // Declare a value found tile
  let found = false;

  // this will run until random empty tile is found
  while (!found) {
    // Math.random() - generates random number based on the given condition
    // Math.floor() - rounds down to the nearest integer
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * columns);
    // if the position value is zero set the value to 2
    if (board[r][c] == 0) {
      board[r][c] = 2;
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      tile.innerText = "2";
      tile.classList.add("x2");
    }

    //Set the found variable to true
    found = true;
  }
}

// end of setTwo()

// start of checkWin()

function checkWin() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      // check if the current tile is a winning tile
      if (board[r][c] == 2048 && is2048Exist == false) {
        alert("You Win! You got 2048!");
        is2048Exist = true; // once 2048 exists alert message will pop once.
      } else if (board[r][c] == 4096 && is4096Exist == false) {
        alert("You are unstoppable at 4096!");
        is4096Exist = true; // once 4096 exists alert message will pop once.
      } else if (board[r][c] == 8192 && is8192Exist == false) {
        alert("Victory you have reached the peak! 8192!");
        is8192Exist = true; // once 8192 exists
      }
    }
  }
}

// end of checkWin()

// start of hasLost()
// chec if the board is full
function hasLost() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (board[r][c] == 0) {
        return false; // return false if there's an empty tile
      }

      const currentTile = board[r][c];

      // check if the adjacent tile is possible for merging
      if (
        (r > 0 && board[r - 1][c] === currentTile) ||
        (r < rows - 1 && board[r + 1][c] === currentTile) ||
        (c > 0 && board[r][c - 1] === currentTile) ||
        (c < columns - 1 && board[r][c + 1] === currentTile)
      ) {
        return false;
      }
    }
  }

  return true;
}

// end of hasLost()

// start of restartGame()
// RestartGame by replacing all values into zero.
function restartGame() {
  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  score = 0;
  setTwo(); // new tile
}
// end of restartGame()

// FOR MOBILE DEVICES

// Declare variables touch input
let startX = 0;
let startY = 0;

// event listener to capture touch inputs and assign the x and y coordinates in the startX and startY
document.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
});

// check if touching and prevent scrolling
// input targets any element that includes the word tile.

document.addEventListener(
  "touchmove",
  (e) => {
    if (!e.target.className.includes("tile")) {
      return;
    }

    e.preventDefault(); // disable scrolling
  },
  { passive: false }
);

// will listen for touchend event
document.addEventListener("touchend", (e) => {
  // check if element with className tile is triggered
  if (!e.target.className.includes("tile")) {
    return;
  }

  // calculates the difference between initial position and final position
  let diffX = startX - e.changedTouches[0].clientX;
  let diffY = startY - e.changedTouches[0].clientY;

  // check if the swipe is for horizontal or vertical
  // horizonta > vertical
  if (Math.abs(diffX) > Math.abs(diffY)) {
    // horizontal swipe
    if (diffX > 0) {
      slideLeft();
      setTwo();
    } else {
      slideRight();
      setTwo();
    }
  } else {
    // vertical swipe
    if (diffY > 0) {
      slideUp();
      setTwo();
    } else {
      slideDown();
      setTwo();
    }
  }

  document.getElementById("score").innerText = score;

  // use setTimeout to delay the alert
  setTimeout(() => {
    if (hasLost()) {
      alert("Game Over! You have lost the game. Game will restart.");
      // reset the game
      restartGame();
      alert("Press enter to restart.");
    } else {
      checkWin();
    }
  }, 100); //delay time in miliseconds

});
