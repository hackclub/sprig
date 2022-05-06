
setScreenSize(500, 500*.8)


setLegend({
  r: sprite(`
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
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
  `),
  g: sprite(`
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
  `),
  b: sprite(`
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
  `),
  p: sprite(`
................
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
................
  `),
    2: sprite(`
................
................
................
................
.....rrrrrr.....
....rr....rr....
....r..r.r.r....
....rr.....r....
.....r....r.....
.....rrrrrr.....
......r..rr.....
.....rr...r.....
.....r..........
................
................
................
  `),
  "#": sprite(`
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
  `)
})

makeSolid(["p", "2", "#", "r"])

// setZOrder("p", "#", "g");

makePushable({
  "p": ["#"],
  "2": ["#"]
  // "#": ["#"]
})

let level = 0;

const levels = {
  0: `
    rrrrrrrrrr
    r...r....r
    r...r.g..r
    r...r....r
    r2..r.#p.r
    r...r....r
    r...r....r
    rrrrrrrrrr
  `,
  1: `
    rrrrrrrrrr
    r2..r..rgr
    r...r..r.r
    r...r..#.r
    r.#.r..g.r
    rg..r.p#.r
    r...r....r
    rrrrrrrrrr
    `
}


addLayer(levels[level])

let player = getTileAll("p")[0]
let player2 = getTileAll("2")[0]

onTileInput("up", _ => {
  player.y -= 1;
  player2.y -= 1;

  // if (player.dy === 0 || player2.dy === 0) {
  //   player.y -= player.dy;
  //   player2.y -= player2.dy;
  // }
})

onTileInput("down", _ => {
  player.y += 1;
  player2.y += 1;

  if (player.dy === 0 || player2.dy === 0) {
    player.y -= player.dy;
    player2.y -= player2.dy;
  }
})

onTileInput("left", _ => {
  player.x -= 1;
  player2.x -= 1;

  if (player.dx === 0 || player2.dx === 0) {
    player.x -= player.dx;
    player2.x -= player2.dx;
  }
})

onTileInput("right", _ => {
  player.x += 1;
  player2.x += 1;

  // if (player.dx === 0 || player2.dx === 0) {
  //   player.x -= player.dx;
  //   player2.x -= player2.dx;
  // }
})

// in what order should collision, push be applied

afterInput(_ => {
  const hasG = [];
  Object.values(getTileGrid()).forEach(cell => {
    if (cell.map(c => c.type).includes("g")) hasG.push(cell.map(c => c.type));
  })

  if (hasG.every(c => c.includes("#"))) {
    level++;
    clear();
    if (level in levels) addLayer(levels[level])
    else console.log("you win")
    player = getTileAll("p")[0]
    player2 = getTileAll("2")[0]
  }
})

// after win how do we increment to next level

// is it possible to group moves into batches so we don't
// have to play these ordered move games
// issue with that is then moves in after input aren't
// registered, or you need multiple batches

start()