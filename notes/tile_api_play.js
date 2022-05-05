
setScreenSize(300, 300*.8)

setLegend({
  r: sprite_red,
  g: sprite_b,
  b: sprite_beaker,
  p: sprite_p,
  "#": sprite_xzx
})

makeSolid(["p", "#", "r"])

makePushable({
  "p": ["#"],
  "#": ["#"]
})


addLayer(`
rrrrrrrrrr
r........r
r........r
r........r
r...r....r
r...r....r
r...r....r
rrrrrrrrrr
`)

addLayer(`
..........
..........
..........
..........
..........
..........
..........
..........

`)


// addLayer(`
// rr
// gr

// `)

// addLayer(`
// p.
// ..
// `)
addTile(4, 3, "#")
addTile(5, 3, "g")

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


// addRule("p #", (player, box) => {
//   box.x += player.dx;
//   box.y += player.dy;
// })

// addRule("p r", (player, wall) => {
//   player.x += player.dx;
//   player.y += player.dy;
// })

// get offset squares or go within range

onTileCollision("p", "#", (player, box) => {
  box.x += player.dx;
  box.y += player.dy;

  player.x += box.dx;
  player.y += box.dy;
})

onTileCollision(["p", "#"], "r", (tile0, wall) => {
  tile0.x -= tile0.dx;
  tile0.y -= tile0.dy;
})



start()

/////////////////////////////////////

// [0, 0] is corner
// player has last, left, right, top, bottom
// map[player.x - 1]
// undo, restart, action

legend({
  c: sprite_c,
  a: sprite_a,
  t: sprite_t,
})

let letter = ["c", "a", "t"];

// 1 = 1

// (bx-ax)^2 + (by-ay)^2 = .25^2
// (cx-ax)^2 + (cy-ay)^2 = .8^2
// (cx-bx)^2 + (cy-by)^2 = .6^2


setMap({
  "b": brown,
    "t": tan
},
`
bbbbbbbbbbb
bbbbbbbbbbb
bbbtttttbbb
bbbtttttbbb
bbbtttttbbb
bbbtttttbbb
bbbtttttbbb
bbbbbbbbbbb
bbbbbbbbbbb
`)

let player = addPlayer({
  sprite: ""
    
})



onInput("up", _ => {
  player.y += 1;
})

onInput("down", _ => {
  player.y -= 1;
})

onInput("left", _ => {
  player.x -= 1;
})

onInput("right", _ => {
  player.x += 1;
})

// background
// squares

// push things
// pull things
// replace things
// pull over distance

onInput(action => { // "move"
  const last = getTile(player.x, player.y);
  
  if (action === "right") player.x += 1;
  if (action === "left") player.x -= 1;
  if (action === "up") player.y += 1;
  if (action === "down") player.y -= 1;
  if (action === "a") player.y -= 2;
  if (action === "b") player.y -= 1;
  
  if (last === "sand") {
      last = "brushed"
  }

  if (getTile(player.lastX, player.lastY) === "sand") {
    setTile(player.lastX, player.lastY, "brushed")
  }

  replace()
})

makeSolid("rock", "brushed")

onTick(_ => {
  if (!map.includes("sand")) console.log("you win")
  
    player.remove();
  
    replace("drawn", "arrow");
    replace(["player", "stone"], ["sand", "stone"])

  replace(
    `
        f
      fff
    `,
    `
      f.f
    `
  )
})

/////////////////////////////////////




const width = 10;
const height = 8;

const screenWidth = 300*width/height;
const screenHeight = 300;
setScreenSize(screenWidth, screenHeight)

// TODO: need background

const key = {
  r: sprite_red,
  b: sprite_black,
  p: sprite_p,
  s: sprite_b,
  g: sprite_xzx
  // could do multiple like this
  // y: [sprite_r, sprite_b]
}

const attributes = {
  r: [],
  b: []
}

const solids = ["b", "p"];

const map = `
  bbbbbbbbbb
  brbrrrrrrb
  brrrgrrrrb
  brrrrrrrrb
  bgbrgrrrrb
  bgbrgrrrrb
  bgbrgrrrrb
  bbbbbbbbbb
`.split("").filter(ch => ch.match(/\S/));

const sprites = `
  ..........
  ..........
  ..s.......
  .ps.s.....
  ..........
  ..........
`.split("").filter(ch => ch.match(/\S/));

for (let i = 0; i < width; i += 1) {
  for (let j = 0; j < height; j += 1) {
    const blockSize = screenWidth/width/32 // - 0.01;
    add({
      sprite: key[map[j*width+i]],
      // solid: solids.includes(map[j*width+i]),
      origin: [.5, .5],
      tags: [map[j*width+i]],
      x: screenWidth/width*i + screenWidth/width/2,
      y: screenHeight/height*j + screenHeight/height/2,
      scale: [ 
        screenWidth/width/32, 
        screenHeight/height/32
      ]
    })
    
    if (sprites[j*width+i] === ".") continue;
    
    add({
      sprite: key[sprites[j*width+i]],
      // solid: solids.includes(sprites[j*width+i]),
      tags: [sprites[j*width+i]],
      origin: [.5, .5],
      zIndex: 10,
      x: screenWidth/width*i + screenWidth/width/2,
      y: screenHeight/height*j + screenHeight/height/2,
      scale: [ 
        screenWidth/width/32, 
        screenHeight/height/32
      ]
    })
  }
}

// solid

function moveleft (collides, bgBlock) {
  if (bgBlock === "wall") return
  
  if (bgBlock !== "brick") {
    moveMeLeft
  }
}

onInput("keypress", data => {
  const player = every("p", p => p)[0];
  const playerX = player.x;
  
  
  const leftBlocks = map()
  if (data === "d" || data === "ArrowRight") {
    every("p", s => {
      s.x += screenWidth/width;
    })
  }

  if (data === "a" || data === "ArrowLeft") {
    every("p", s => {
      s.x -= screenWidth/width;
    })
  }

  if (data === "w" || data === "ArrowUp") {
    every("p", s => {
      s.y -= screenHeight/height;
    })
  }

  if (data === "s" || data === "ArrowDown") {
    every("p", s => {
      s.y += screenHeight/height;
    })
  }

})

// start the game
start();

//////////////////////

