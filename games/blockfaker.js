const log = x => (console.log(x), x);

/* let's get this party started */
const canvas = document.querySelector(".blockfaker");
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

let map, fenceMap;
let goal = { art: art.bush };
let player = { art: art.player };

let level = 0;
const levels = [
`
   

   
          wwwww
      wwwww   w
     w  00    ww
    w  wwwww    w
    w w  www  eww
   w  w 0   wwww
    w   w p w
     ww wwwww
      ww
`,
`



     wwwwwwwwww
     wwww1 1www
     wo    woww
     wo0w0 0oew
     wooww woow
     wwwww1wwww
     wwwwwpwwww
     0wwwwwwwww
`,
];

const legend = { '0': t => t.art == art.crate,
                 '1': t => t.art == art.house,
                 '_': t => t.art != art.crate };
const p = ({ pattern, after }) => {
  const gridify = str => str
    .trim()
    .split('\n')
    .map(x => x.trim().split('').map(x => legend[x]));

  return { pattern: gridify(pattern), after };
}
function apply(patterns, grid) {
  for (const { pattern, after } of patterns) {
    for (let x = 0; x < w; x++)
      for (let y = 0; y < h; y++) {
        let match = true;
        const { entries } = Object;
        for (const [dx, row] of entries(pattern))
          for (const [dy, test] of entries(row)) {
            if (!match) continue;

            let t = map.data[[x + +dx, y + +dy]];
            if (!t) { match = false; continue };

            match &&= test(t);
          }
        if (match) {
          for (const [dx, row] of entries(pattern))
            for (const [dy, test] of entries(row))
              after(map.data[[x + +dx, y + +dy]]);
          return;
        }
      }
  }
}
const clearCrate = t => {
  if (t.art == art.house || t.art == art.crate)
    delete map.data[map.pos(t)];
}
const patterns = [
  p({ pattern: `000`, after: clearCrate }),
  p({ pattern: `111`, after: clearCrate }),
  p({
    pattern: 
      `0
       0
       0`,
    after: clearCrate
  }),
  p({
    pattern: 
      `1
       1
       1`,
    after: clearCrate
  }),
];

const loadLevel = () => {
  map = makeMap();
  fenceMap = makeMap();

  const splentries = (t, s) => Object.entries(t.split(s));
  for (const [y, row] of splentries(levels[level], '\n'))
    for (const [x, letter] of splentries(row, '')) {
           if (letter == ' ') ;
      else if (letter == 'p') map.set(player, x, y);
      else if (letter == 'e') goal = [x, y];
      else if (letter == 'o') fenceMap.set({ art: art.box }, x, y);
      else
        map.set({ art: log(({
          'w': art.wall, 
          '0': art.crate,
          '1': art.house,
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
    if (n > 2) return false;
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

  apply(patterns);
  
  if (goal+"" == map.pos(player))
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
  drawMap(fenceMap, 0.5);
  drawTile(art.bush, ...goal, 0, 0.7 + 0.05*Math.sin(Date.now() / 240));

  requestAnimationFrame(frame);
});
