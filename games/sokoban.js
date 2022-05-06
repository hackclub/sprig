
setScreenSize(300, 300*.8)

setLegend({
  r: sprite_red,
  g: sprite_b,
  b: sprite_beaker,
  p: sprite_p,
  "#": sprite_xzx
})

makeSolid(["p", "#", "r"])

// setZOrder("p", "#", "g");

makePushable({
  "p": ["#"],
  // "#": ["#"]
})

let level = 0;

const levels = {
  0: `
    rrrrrrrrrr
    r........r
    r....#g..r
    r........r
    r...r....r
    r...r....r
    r...r....r
    rrrrrrrrrr
  `,
  1: `
    rrrrrrrrrr
    r......rgr
    r...#..r.r
    r........r
    r.#.r..g.r
    r...r....r
    r...r....r
    rrrrrrrrrr
    `
}


addLayer(levels[level])

let player = addTile(1, 1, "p")

onTileInput("up", _ => {
  player.y -= 1;
})

onTileInput("down", _ => {
  player.y += 1;

})

onTileInput("left", _ => {
  player.x -= 1;
})

onTileInput("right", _ => {
  player.x += 1;
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
    player = addTile(1, 1, "p")
  }
})

// after win how do we increment to next level

// is it possible to group moves into batches so we don't
// have to play these ordered move games
// issue with that is then moves in after input aren't
// registered, or you need multiple batches

start()