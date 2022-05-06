
setScreenSize(300, 300*.8)

setLegend({
  r: sprite_red,
  0: sprite_green,
  g: sprite_b,
  b: sprite_beaker,
  p: sprite_p,
  "#": sprite_xzx
})

makeSolid(["p", "#", "r", "0"])

setZOrder(["p","r", "#", "g"]);

makePushable({
  "p": ["#"],
  // "#": ["#"]
})

let level = 0;

const levels = {
  1: `
    ..........
    ..........
    ...p......
    ..........
    ..........
    ..........
    ..........
    ..........
  `,
  0: `
    p..0......
    ...0......
    ...000....
    ..........
    ..........
    ...000....
    ..0.......
    ..0.......
    `
}


addLayer(levels[level])
let player = getTileAll("p")[0];
addTile(player.x - player.dx, player.y - player.dy, "r")

onTileInput("up", _ => {
  if (player.y === 0) return;
  player.y -= 1;

})

onTileInput("down", _ => {
  if (player.y === 7) return;
  player.y += 1;
})

onTileInput("left", _ => {
  if (player.x === 0) return;
  player.x -= 1;
})

onTileInput("right", _ => {
  if (player.x === 9) return;
  player.x += 1;
})

// in what order should collision, push be applied

afterInput(_ => {
  if (player.dy !== 0 || player.dx !==0) {
    addTile(player.x, player.y, "r")
  }
  
  if (getTileAll("r").length === 10*8 - getTileAll("0").length) {
    level++;
    clear();
    if (level in levels) addLayer(levels[level])
    else console.log("you win")
    player = getTileAll("p")[0]
    addTile(player.x - player.dx, player.y - player.dy, "r")
  }
})

// win conditions
// all cells with x also have y
// no cells like such around

start()