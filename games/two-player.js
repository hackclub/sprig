
setScreenSize(300, 300*.8)

setLegend({
  r: sprite_red,
  g: sprite_b,
  b: sprite_beaker,
  p: sprite_p,
  2: sprite_p,
  "#": sprite_xzx
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