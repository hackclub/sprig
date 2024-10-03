/*
@title: English Checkers
@author: Oakchris1955
@tags: ['retro']
@addedOn: 2023-01-04

This is a port of the english variant of the popular game, checkers, also known as draughts
The rules can be found here: https://en.wikipedia.org/wiki/English_draughts#Rules


Instructions: 

Moving the selection sprite:

Move the selection sprite by pressing the WASD keys.


Moving a piece:

When the selection sprite is on the same tile with the piece which you wanna move, press the J key to select that piece (pressing the J key a second time unselects that piece).

Upon selecting a piece, one of two things may happen:
    1) Nothing will occur either because the selected piece has no available moves, because it isn't a friendly piece or because there are other friendly pieces with mandatory jumps (see below).
       In either case, the current player should select another friendly piece
    2) If none of the above apply, the piece on the same tile with the selection sprite will be selected.
       The background of the tile the piece is in will be painted dark gold.
       One or more black squares adjacent to the selected piece will be painted cyan. Those indicate available moves
       The player must then move the selection sprite to one of those squares.
       Pressing J moves the piece to the selected square, passing the turn to the next player.


Mandatory jumps:

If a player has the option to jump, they must do so. They cannot make any other moves that don't involve jumping or select pieces that don't have such moves.

If the current player's pieces have the opportunity to perform a jump, the square which they occupy will be highlighted in orange.


Kings:

When a piece reaches the end of the board (that is, a black piece reaches the rightmost column or a white piece reaches the leftmost column),
it is crowned a king. Unlike normal pieces, kings can move (and jump) in both directions


Winning the game:

In order to end the game, a player must either lose all their pieces or have no available moves to make. When that happens, the opponent wins


Resetting the board:

Upon winning the game, the board will automatically reset. If, however, for any other reason, the players want to reset the board mid-game,
all they have to do is simply press the K key. This will start a 5-second countdown until the board is reset which can be cancelled by pressing the L key.


Note on multiple jumps:

In most english checkers games, multiple jumps are possible. I chose to leave this feature out since I think it gives each player performing multiple jumps an unfair advantage.
Furthermore, I have tested this game extensively and during that testing period, I saw no piece configuration that could result in a multiple jump.

*/

const whiteRegular = "w";
const whiteKing = "W";
const blackRegular = "b";
const blackKing = "B";

const PLAYER_PIECES = [
  whiteRegular,
  whiteKing,
  blackRegular,
  blackKing,
];

const lightBackground = "l";
const darkBackground = "d";

const selection = "s";
const selectedPiece = "S";
const possibleMoves = "m";
const mandatoryMove = "M";

setLegend(
  [ whiteRegular, bitmap`
................
................
................
..000000000000..
.00222222222200.
0022222222222200
0222222222222220
0022222222222200
0202222222222020
0220000000000220
0222222222222220
0022222222222200
.00222222222200.
..000000000000..
................
................` ],
  [ whiteKing, bitmap`
................
................
..000000000000..
.00222222222200.
0022222222222200
0222222222222220
0022222222222200
0202222222222020
0220000000000220
0022222222222200
0202222222222020
0220000000000220
0022222222222200
.00222222222200.
..000000000000..
................` ],
  [ blackRegular, bitmap`
................
................
................
..LLLLLLLLLLLL..
.LL0000000000LL.
LL000000000000LL
L00000000000000L
LL000000000000LL
L0L0000000000L0L
L00LLLLLLLLLL00L
L00000000000000L
LL000000000000LL
.LL0000000000LL.
..LLLLLLLLLLLL..
................
................` ],
  [ blackKing, bitmap`
................
................
..LLLLLLLLLLLL..
.LL0000000000LL.
LL000000000000LL
L00000000000000L
LL000000000000LL
L0L0000000000L0L
L00LLLLLLLLLL00L
LL000000000000LL
L0L0000000000L0L
L00LLLLLLLLLL00L
LL000000000000LL
.LL0000000000LL.
..LLLLLLLLLLLL..
................` ],
  [ lightBackground, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111` ],
  [ darkBackground, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL` ],
  [ selection, bitmap`
666..........666
66............66
6..............6
................
................
................
................
................
................
................
................
................
................
6..............6
66............66
666..........666` ],
  [ selectedPiece, bitmap`
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF` ],
  [ possibleMoves, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777` ],
  [ mandatoryMove, bitmap`
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999` ],
);

setBackground(darkBackground);

const BOARD = map`
blbl.lwl
lbl.lwlw
blbl.lwl
lbl.lwlw
blbl.lwl
lbl.lwlw
blbl.lwl
lbl.lwlw`;

setMap(BOARD);

function arrToObj(coords) {
  return argsToObj(coords[0], coords[1]);
}

function argsToObj(x, y) {
  return {
    x: x,
    y: y
  };
}

/*
  This game use 2 kinds of coordinate systems:
    1) The x-y coordinates of a tile in the map (the XY system)
    2) The number of dark squares from the left and top of the map,
       not including the current one (the Board system)
  
  For example, the selectionCoords variable stores its coordinates using the Board system.
  On the other hand, when using getFirst(selection), the coordinates are in the XY system
*/
function translateBoardToXY({x, y}) {
  return [x, y * 2 + x % 2];
}

function translateXYToBoard({x, y}) {
  return [x, (y - x % 2) / 2];
}

function hasPieces({x, y}, pieces = PLAYER_PIECES) {
  return getTile(x, y)
    .filter(
      (sprite) => pieces.includes(sprite.type)
    )
    .length !== 0;
}

/**
 * Return a number of possible moves for a piece in those coordinates.
 * Note: that the coordinates are in the Board format
 */
function findPossibleMoves({x, y}) {
  /*
    CONTINUE: not done searching yet, move one more square
    REGULAR: this move DOESN'T capture any enemy pieces
    CAPTURING: this move DOES capture enemy pieces
    FAILED: this move isn't valid
  */
  const moveTypes = {
    CONTINUE: 0,
    REGULAR: 1,
    CAPTURING: 2,
    FAILED: 3,
  };
  
  // Checks if a piece can be moved to these coordinates
  function findPossibleMove(x, y, firstRun) {
    const currentTile = getTile
      .apply(null, translateBoardToXY(argsToObj(x, y)))
      // filter out non-piece sprites, such as the selection sprite
      .filter((piece) => PLAYER_PIECES.includes(piece.type));

    // If no pieces found on given tile...
    if (currentTile.length === 0) {
      // ...and this isn't the first run of the for-loop...
      if (!firstRun) {
        // ...this is an attacking move
        return moveTypes.CAPTURING;
      } else {
        // ...otherwise, it is a regular move
        return moveTypes.REGULAR;
      }
    // If a piece was found on given tile...
    } else {
      // ...and it is a friendly piece, this is an invalid move.
      if (nowPlaying.includes(currentTile[0].type)) return moveTypes.FAILED;
    }

    // If none of the above conditions were met, continue searching
    return moveTypes.CONTINUE;
  }

  // If this returns true, then the for-loop within which this function runs must immediately break
  function loopHandler(x, y, firstRun, move) {
    switch (findPossibleMove(x, y, firstRun)) {
      case moveTypes.CAPTURING:
        move.isCapturing = true;
      case moveTypes.REGULAR:
        move.squaresMoved++;
        move.x = x;
        move.y = y;
        break;
      case moveTypes.FAILED:
        move.squaresMoved = 0;
        break;
      case moveTypes.CONTINUE:
        return false;
    }

    return true;
  }

  // Check if a point is within the board. The coordinates are in the Board format
  function isInBounds(x, y) {
    return x >= 0 && x < width() && y >= 0 && y < height() / 2;
  }

  // Find all possible moves
  const moves = [];
  // If the piece in the current tile is a king, sets variable to both movement modifiers, otherwise sets only one modifier, depending on piece color
  // 
  // Conditional variable assignment by Valentin on StackOverflow: https://stackoverflow.com/a/60437140/
  const movementModifiers =
    (getTile.apply(null, translateBoardToXY(argsToObj(x, y))).some((piece) => piece.type === nowPlaying[1])) && [ -1, 1 ] ||
    nowPlaying === PLAYERS.BLACK && [ 1 ] ||
    [ -1 ];

  // For each movement modifier, find possible moves
  for (const movementModifier of movementModifiers) {
    const startY = y + (x % 2);
    const startX = x + movementModifier;
  
    const firstMove = {
      x: startX,
      y: startY,
      squaresMoved: 0,
      isCapturing: false
    };
    forloop: for (let x = startX, y = startY, firstRun = true; isInBounds(x, y); x += movementModifier, y += (x + 1) % 2, firstRun = false) {
      if (loopHandler(x, y, firstRun, firstMove)) break;
    }
  
    const secondMove = {
      x: startX,
      y: startY,
      squaresMoved: 0,
      isCapturing: false
    };
    forloop: for (let x = startX, y = startY - 1, firstRun = true; isInBounds(x, y); x += movementModifier, y -= x % 2, firstRun = false) {
      if (loopHandler(x, y, firstRun, secondMove)) break;
    }
  
    moves.push(...[firstMove, secondMove].filter((move) => move.squaresMoved !== 0));
  }
  
  return moves;
}

function setMandatoryMoves() {
  // For each kind of piece the current player has...
  nowPlaying.forEach(
    // Get all tiles with them
    (pieceType) => tilesWith(pieceType)
      .flat()
      .filter((sprite) => sprite.type === pieceType)
      .forEach((piece) => {
        // Check if any of the possible moves for that piece is capturing an enemy piece
        if (findPossibleMoves(arrToObj(translateXYToBoard(piece))).some((move) => move.isCapturing)) {
          // If yet, add a mandatoryMove sprite there
          addSprite(piece.x, piece.y, mandatoryMove);
        }
      })
  )
}

const DIRECTIONS = {
  Y_PLUS: 0,
  Y_MINUS: 1,
  X_PLUS: 2,
  X_MINUS: 3,
};

/** 
 * PIECE: select a piece to move
 * MOVE: make a valid move with the currently selected piece
 */
const SELECTION_TYPES = {
  PIECE: 0,
  MOVE: 1,
};

let selectionType = SELECTION_TYPES.PIECE;
// As already mentioned before, these are in the Board format
let selectionCoords = { x: 0, y: 0 };

// Move selectionSprite to specified direction
function moveSelection(direction) {
  switch (direction) {
    case DIRECTIONS.Y_PLUS:
      selectionCoords.y++;
      break;
    case DIRECTIONS.Y_MINUS:
      selectionCoords.y--;
      break;
    case DIRECTIONS.X_PLUS:
      selectionCoords.x++;
      break;
    case DIRECTIONS.X_MINUS:
      selectionCoords.x--;
      break;
  }

  // Prevent selection coords from going out-of-bounds
  selectionCoords.x = Math.max(selectionCoords.x, 0);
  selectionCoords.x = Math.min(selectionCoords.x, width() - 1);
  selectionCoords.y = Math.max(selectionCoords.y, 0);
  selectionCoords.y = Math.min(selectionCoords.y, height() / 2 - 1);

  // Update the selectionSprite
  updateSelectionSprite();
}

// Re-render the selectionSprite according to selectionCoords
function updateSelectionSprite() {
  const [x, y] = translateBoardToXY(selectionCoords);

  const selectionSprite = getFirst(selection);

  if (selectionSprite === undefined) {
    // If the selection sprite doesn't exist, create it
    addSprite(x, y, selection);
  } else {
    // Otherwise, just update its x and y coords
    selectionSprite.x = x;
    selectionSprite.y = y;
  }
}
// Omitting this will make the selectionSprite appear only after the user clicks one of the wasd buttons
updateSelectionSprite();


const PLAYERS = {
  BLACK: [blackRegular, blackKing],
  WHITE: [whiteRegular, whiteKing],
};
// The player with the darker-coloured pieces moves first.
let nowPlaying = PLAYERS.BLACK;


/**
 * Crowns the piece on the given coordinates if possible
 * Note: that the coordinates are in the Board format
 */
function crownPieceIfPossible({x, y}) {  
  const regularType = nowPlaying[0], 
        kingType = nowPlaying[1];
  
  const piece = getTile.apply(null, translateBoardToXY(argsToObj(x, y)))
    .filter((piece) => piece.type === regularType)[0];

  // If no piece was found in the given coordinates, return
  if (piece === undefined) return;

  // It is normally called a kingsRow, but here the entire board has been turned 90 degrees, so...
  const kingsColumn = nowPlaying === PLAYERS.BLACK ? width() - 1 : 0;
  
  // If the given tile is in the kingsColumn, crown it
  if (piece.x === kingsColumn) {
    // Remove the piece
    piece.remove();

    // Add a new king piece at the same location
    addSprite(piece.x, piece.y, kingType);
  }
}

/**
 * Let the next player play
 */
function nextPlayer() {
  switch (nowPlaying) {
    case PLAYERS.BLACK:
      nowPlaying = PLAYERS.WHITE;
      break;
    case PLAYERS.WHITE:
      nowPlaying = PLAYERS.BLACK;
      break;
  }
}

// If this is true, the "i" button which resets the game is enabled
let gameOver = false;

/**
 * Check whether the game should be considered over. If yes, set the gameOver variable to true
 */
function isGameOver() {
  // Check the available moves for the current player
  const availableMoves = nowPlaying.map(
    (pieceType) => tilesWith(pieceType)
      .flat()
      .filter((sprite) => sprite.type === pieceType)
      .map((piece) => findPossibleMoves(arrToObj(translateXYToBoard(piece))))
  ).flat(2).length;

  // If the current playing player has no available moves, then it is game over
  if (availableMoves === 0) {
    // Determine the winning player by choosing the next player
    nextPlayer();

    // Show a message on the screen
    const winnerPlayer = nowPlaying === PLAYERS.BLACK ? "Black" : "White";
    addText("Game over!", { y: 5, color: color`3` });
    addText(`${winnerPlayer} has won!`, { y: 6, color: color`3` });
    addText("Press \"i\"", { y: 9, color: color`3` });
    addText("to play again", { y: 10, color: color`3` });

    // Enable the "i" (reset) button
    gameOver = true;
  }
}

/**
 * Resets the board to its starting position
 */
function resetBoard() {
  // Set the gameOver variable to false
  gameOver = false;
  // Reset board
  setMap(BOARD);
  // Clear text
  clearText();
  // Set current player to Black
  nowPlaying = PLAYERS.BLACK;
  // Set selection sprite coords to top-left corner
  selectionCoords = { x: 0, y: 0 };
  // Update the selection sprite
  updateSelectionSprite();
  // Set selection mode to PIECE
  changeToPiece();
}

// A generic function to quickly change the selection type to PIECE and make the necessary changes on the board
function changeToPiece() {
  // Remove the selectedPiece sprite (if it exists)
  const selectedPieceSprite = getFirst(selectedPiece);
  if (selectedPieceSprite !== undefined) selectedPieceSprite.remove();
  
  // Remove all possibleMoves sprites
  tilesWith(possibleMoves)
    .flat()
    .filter((sprite) => sprite.type === possibleMoves)
    .forEach((sprite) => sprite.remove());

  // Also remove all mandatory move sprites...
  tilesWith(mandatoryMove)
    .flat()
    .filter((sprite) => sprite.type === mandatoryMove)
    .forEach((sprite) => sprite.remove());
  
  // ...so that we can recalculate them
  setMandatoryMoves();

  // Lastly, set the selection type to PIECE
  selectionType = SELECTION_TYPES.PIECE;
}

onInput("w", () => {
  moveSelection(DIRECTIONS.Y_MINUS);
});

onInput("a", () => {
  moveSelection(DIRECTIONS.X_MINUS);
});

onInput("s", () => {
  moveSelection(DIRECTIONS.Y_PLUS);
});

onInput("d", () => {
  moveSelection(DIRECTIONS.X_PLUS);
});

onInput("j", () => {
  // Get the selection sprite
  const selectionSprite = getFirst(selection);
  
  switch (selectionType) {
    case SELECTION_TYPES.PIECE:
      // Check if current tile has any pieces to select
      if (hasPieces(selectionSprite, nowPlaying)) {
        // Check if the piece must make a mandatory move (in case there are any)
        const pieceHasMandatoryMove = getTile
          .apply(null, translateBoardToXY(selectionCoords))
          .some((piece) => piece.type === mandatoryMove);
        if (tilesWith(mandatoryMove).length === 0 || pieceHasMandatoryMove) {
          // Find all possible moves for that tile
          const possibleMovesFound = findPossibleMoves(selectionCoords);
  
          // If found any moves...
          if (possibleMovesFound.length !== 0) {
            // Add the possibleMovesFound sprite to the corresponding squares
            possibleMovesFound.forEach((move) => {
              // If the piece has a mandatory move to make, then the move must be a capturing one
              if (!pieceHasMandatoryMove || move.isCapturing) {
                addSprite.apply(null, [ ...translateBoardToXY(argsToObj(move.x, move.y)), possibleMoves ])
              }
            })
  
            // Add the selectedPiece sprite
            addSprite(selectionSprite.x, selectionSprite.y, selectedPiece);
  
            // Set the selection type to MOVE
            selectionType = SELECTION_TYPES.MOVE;
          }
        }
      }
      break;
    case SELECTION_TYPES.MOVE:     
      // Get an array of all the sprites in the same tile with the selectionSprite
      const tileSprites = getTile(selectionSprite.x, selectionSprite.y);

      // Check if there is a selected piece on the same tile
      const selectedPieceSprite = tileSprites.filter((sprite) => sprite.type === selectedPiece)[0];
      if (selectedPieceSprite !== undefined) {
        // If yes, change selection type to piece
        changeToPiece();
        break;
      }

      // Check if there a possible move where the selected piece can jump on the same tile
      const possibleMovesSprite = tileSprites.filter((sprite) => sprite.type === possibleMoves)[0];
      if (possibleMovesSprite !== undefined) {
        const selectedTile = getFirst(selectedPiece);
        const pieceToMove = getTile(selectedTile.x, selectedTile.y).filter((piece) => nowPlaying.includes(piece.type))[0];

        // Remove all pieces in between starting and landing square
        //
        // Note: it is assumed that no friendly piece is inbetween those two spots,
        // since the move would be invalid if it would, so we just remove the first (and only) piece in that tile
        const signX = Math.sign(possibleMovesSprite.x - pieceToMove.x);
        const signY = Math.sign(possibleMovesSprite.y - pieceToMove.y);
        for (let x = pieceToMove.x + signX, y = pieceToMove.y + signY;
          signX > 0 ? possibleMovesSprite.x > x : possibleMovesSprite.x < x &&
          signY > 0 ? possibleMovesSprite.y > y : possibleMovesSprite.y < y;
          x += signX, y += signY) {
          getTile(x, y)[0].remove();
        }
        
        // Move the piece to the landing square
        pieceToMove.x = possibleMovesSprite.x;
        pieceToMove.y = possibleMovesSprite.y;

        // Crown the piece if it is possible
        crownPieceIfPossible(arrToObj(translateXYToBoard(pieceToMove)));

        // Let the next player play
        nextPlayer();
        
        // Change selection type to piece
        changeToPiece();

        // Check if game is over
        isGameOver();
        break;
      }
      break;
  }
});

onInput("i", () => {
  // If the game is over reset the board
  if (gameOver) resetBoard();
});

// Press "k" and wait 5 seconds to reset board, press "l" to cancel
let cancelButtonPressed = false;
let resetTimeoutRunning = false;

onInput("k", () => {
  // Only start a timeout for resetting the board if there isn't one already in progress
  if (!resetTimeoutRunning && !gameOver) {
    resetTimeoutRunning = true;

    // It takes 5 seconds to reset the board. This way the user has time to cancel the action
    let secondsLeft = 5;
    const intervalMs = 100;

    // A recursive function to decrement the secondsLeft variable until it is equal to 0
    function nextSecond() {
      // Clear all text in screen
      clearText();

      // If the cancel button isn't pressed
      if (!cancelButtonPressed) {
        // If there are no seconds left, reset the board
        if (secondsLeft <= 0) {
          resetTimeoutRunning = false;
          resetBoard();
        } else {
          // Otherwise, print a message on the screen
          addText("Resetting board in", { y: 6, color: color`3` });
          addText(`${Math.ceil(secondsLeft)} seconds`, { y: 7, color: color`3` });
          addText("Press \"l\" to cancel", { y: 9, color: color`3` });
          // Reduce secondsLeft variable by 1
          secondsLeft -= intervalMs / 1000;
          // Run again in 100ms (0.1 seconds)
          setTimeout(nextSecond, intervalMs)
        }
      // If it is, drop timeout
      } else {
        resetTimeoutRunning = false;
        cancelButtonPressed = false;
      }
    }

    // Run the function
    nextSecond()
  }
});

onInput("l", () => {
  // If the reset board timeout is running, set the cancelButtonPressed variable to true
  if (resetTimeoutRunning) cancelButtonPressed = true;
});
