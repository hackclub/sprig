setScreenSize(500, 500*.8)

// playTune([
//   [500, "sine", 64.4, 500, "sine", "c5", 1000],
//   [300, "sine", 87, 300],
//   [500, "sine", "a4", 500],
//   [300],
//   [100, "triangle", 53, 200],
//   [400]
// ], 2)

// can end with tune.end();


setLegend({
  r: sprite`rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr`,
  g: sprite`
................
............r...
....rr......r...
.....rr....r....
......rggggrg...
.....grr..r.gg..
....gg.rr.r..g..
....g...r.r..g..
....g....rr..g..
....g....rr..g..
....g........g..
....gg.......g..
.....gg.....gg..
.......gggggg...
................
................
  `,
  b: sprite`
................
................
................
....0000000.....
....0.....0000..
....0...0....0..
....0...0....0..
....0...0...00..
....0000000.0...
....0...0...0...
....0...0...0...
....0...0...0...
....000000000...
................
................
................
  `,
  p: sprite`................
................
................
................
.....000000.....
....00....00....
....0..0.0.0....
....00.....0....
.....0....0.....
.....000000.....
......0..00.....
.....00...0.....
.....0..........
................
................
................`,
  "0": sprite`
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
  `
})

setSolids(["p", "r", "0"])

setZOrder(["p","r", "0"]);

let level = 0;

const levels = {
  1: map`..........
..........
..........
..........
..........
..........
..........
..........`,
  0: map`p..0....0.
...0....0.
..0000..0.
........0.
..........
..0000....
..0....0..
..0.......`
}


setMap(levels[level])
let player = match("p")[0][0];
addTile(player.x - player.dx, player.y - player.dy, "r")

onInput("up", _ => {
  if (player.y === 0) return;
  player.y -= 1;
  // tune.end();
})

onInput("down", _ => {
  if (player.y === 7) return;
  player.y += 1;
})

onInput("left", _ => {
  if (player.x === 0) return;
  player.x -= 1;
})

onInput("right", _ => {
  if (player.x === 9) return;
  // player.x += 1;
  moveSprite(player, 1, 0)

})

// in what order should collision, push be applied

afterInput(_ => {
  console.log(player)
  if (player.dy !== 0 || player.dx !==0) {
    addTile(player.x, player.y, "r")
  }
  
  if (match("r").length === 10*8 - match("0").length) {
    level++;
    clear();
    if (level in levels) setMap(levels[level])
    else console.log("you win")
    player = match("p")[0][0]
    addTile(player.x - player.dx, player.y - player.dy, "r")
  }
})