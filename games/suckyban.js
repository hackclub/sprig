// const log = x => (console.log(x), x);
const log = (x) => x;

/* let's get this party started */
const canvas = document.querySelector(".suckyban");
const ctx = canvas.getContext('2d');

const TILE_PX = 32;
const w = Math.floor((160*4)/TILE_PX);
const h = Math.floor((128*4)/TILE_PX);

canvas.style.width = (canvas.width = w*TILE_PX) + 'px';
canvas.style.height = (canvas.height = h*TILE_PX) + 'px';
ctx.imageSmoothingEnabled = false;

const art = Object.fromEntries(await Promise.all(
  [
    "arrow",        "crate",       "meat",        "rip",
    "axe",          "door",        "oak",         "snek",
    "bag",          "fire",        "pine",        "sword",
    "bed",          "ghost",       "player",      "trident",
    "bow",          "grass",       "pot",         "turtle",
    "box",          "potion",      "wall",        "palm",
    "flower",       "bush",        "trees",
    "womanArmor",   "womanPurple", "cursor",      "pointer",
    "castle",       "coin",        "crab",        "cross",
    "ent",          "eye",         "house",       "hut",
    "manBlueArmor", "manGreen",    "manHelm",
    "manHooded",    "manRedArmor", "orc",         "slime",
    "squid",        "heart_full",  "heart_empty"
  ].map(x => new Promise(res => {
    let img = new Image();
    img.src = `img/${x}.png`;
    img.onload = () => res([x, img]);
    return img;
  }))
));

const { sign, abs, round, floor, cos, sin, random } = Math;

const onMap = (x, y) => x < w && x >= 0 &&
                        y < h && y >= 0;
const mapNeighbors = (x, y) => {
  return [
    [x-1, y  ],
    [x+1, y  ],
    [x  , y+1],
    [x  , y-1],
  ];
}
const makeMap = () => ({
  data: {},
  set(obj, x, y) {
    this.data[[floor(x), floor(y)]] = obj;
  },
  pos(obj) {
    for (const pos in this.data)
      if (this.data[pos] == obj)
        return pos.split(",").map(x => +x);
  },
  move(obj, nx, ny) {
    for (const pos in this.data)
      if (this.data[pos] == obj)
        delete this.data[pos];
    this.set(obj, nx, ny);
  }
})

let map, goalMap;
let player = { art: art.player };

let level = 0;
const levels = [
`



      wwwwwwwww
      w    ooow
      w w wowow
      w w  ooow
      w xxx w w
      w xpx   w
      w xxxww w
      w       w
      wwwwwwwww
`,
`


     wwwwwwwwwww
     w    p    w
     w x x x x w
     w  x x x  w
     w w x x w w
     w w  x  w w
     w ww o ww w
     w w o o w w
     wwwo o owww
      wo o o ow
      wwwwwwwww
`,
];

const loadLevel = () => {
  map = makeMap();
  goalMap = makeMap();

  const splentries = (t, s) => Object.entries(t.split(s));
  for (const [y, row] of splentries(levels[level], '\n'))
    for (const [x, letter] of splentries(row, '')) {
           if (letter == ' ') ;
      else if (letter == 'p') map.set(player, x, y);
      else if (letter == 'o') goalMap.set({ art: art.box }, x, y);
      else
        map.set({ art: log(({
          'w': art.wall, 
          'x': art.crate,
        })[letter]) }, x, y);
    }
}
loadLevel();

canvas.setAttribute("tabindex", "1");
canvas.onkeydown = ev => {
  let dx = 0, dy = 0;
  if (ev.key == "w") dy--;
  if (ev.key == "s") dy++;
  if (ev.key == "a") dx--;
  if (ev.key == "d") dx++;
  if (ev.key == "r") { return loadLevel() };

  let n = 0;
  (function push(tile) {
    if (n > 1) return false;
    n++;

    let [x, y] = map.pos(tile);
    x += dx, y += dy;

    const intheway = map.data[[x, y]];
    if (intheway) {
      if (intheway.art == art.wall || !push(map.data[[x, y]], x+dx, y+dy))
        return false;
    }
    map.move(tile, x, y);
    return true;
  })(player);
  
  if (Object.keys(goalMap.data).every(pos => 
    map.data[pos]?.art == art.crate &&
        goalMap.data[pos]?.art == art.box
  ))
    level++,
    loadLevel();
};

/* rot should be 0..3 */
const drawTile = (art, x, y, rot=0, alpha=1) => {
  ctx.save();
  ctx.translate(floor(x)*TILE_PX + TILE_PX/2,
                floor(y)*TILE_PX + TILE_PX/2);
  ctx.rotate(floor(rot)%4 * Math.PI/2);
  ctx.globalAlpha = alpha;
  ctx.drawImage(art, TILE_PX/-2, TILE_PX/-2, TILE_PX, TILE_PX);
  ctx.globalAlpha = 1;
  ctx.restore();
}

requestAnimationFrame(function frame(now) {
  ctx.fillStyle = "rgb(47, 43, 49)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const drawMap = (map, alpha) => {
    for (const pos in map.data) {
      const [x, y] = pos.split(",").map(x => +x);
      drawTile(map.data[pos].art, x, y, 0, alpha);
    }
  };
  drawMap(map);
  drawMap(goalMap, 0.5);

  requestAnimationFrame(frame);
});
