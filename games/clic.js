// 1. Define the art for the Normal Player and Big Player
// (You can edit these textures visually inside the Sprig editor)
setLegend(
  ["p", bitmap`
................
................
.....55.........
....5555........
....50.5........
....55..5.......
.....5..5.......
....55..55......
.....5..55......
.....5.55.......
.....555........
.....0.0........
................
................
................
................`],
  ["B", bitmap`
0000000000000000
0000000000000000
00............00
00............00
00....0000....00
00....0000....00
00....0000....00
00....0000....00
00....0000....00
00....0000....00
00....0000....00
00....0000....00
00............00
00............00
0000000000000000
0000000000000000`]
);

// 2. Create a simple 5x5 map grid
// '.' is empty space, 'p' is your starting player
setMap(map`
. . . . .
. . . . .
. . p . .
. . . . .
. . . . .
`);

// 3. Track whether the player is big or small
let isBig = false;

// 4. Handle clicks on the map grid
onInput("click", (x, y) => {
  // Get whatever sprite is sitting at the clicked tile coordinates
  const clickedTile = getTile(x, y);

  // Loop through all items on the clicked tile to see if the player 'p' or 'B' is there
  clickedTile.forEach(sprite => {
    
    // If they clicked the small player, turn them into the BIG player 'B'
    if (sprite.type === "p") {
      sprite.type = "B"; 
    } 
    // OPTIONAL: If they click the big player again, make them small 'p'
    else if (sprite.type === "B") {
      sprite.type = "p";
    }
    
  });
});
