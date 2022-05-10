/* let's get this party started */
const canvas = document.querySelector(".brokenzengarden");
canvas.setAttribute("tabindex", "1");
const ctx = canvas.getContext('2d');

const TILE_PX = 48;
const w = Math.floor((160*4)/TILE_PX);
const h = Math.floor((128*4)/TILE_PX);

canvas.style.width = (canvas.width = w*TILE_PX) + 'px';
canvas.style.height = (canvas.height = h*TILE_PX) + 'px';
ctx.imageSmoothingEnabled = false;

const art = Object.fromEntries(await Promise.all(
  [
    "arrow",       "crate",       "meat",        "rip",
    "axe",         "door",        "oak",         "snek",
    "bag",         "fire",        "pine",        "sword",
    "bed",         "ghost",       "player",      "trident",
    "bow",         "grass",       "pot",         "turtle",
    "box",         "potion",      "wall",        "palm",
    "flower",      "bush",        "trees"
  ].map(x => new Promise(res => {
    let img = new Image();
    img.src = `img/${x}.png`;
    img.onload = () => res([x, img]);
    return img;
  }))
));

function loop(handler) {
  canvas.onkeydown = ev => handler({ key: ev.key });
  handler({});
}

/* ENGINE FUNCTIONS */
const grid = () => {
  const ret = [...Array(w)].map(() => [...Array(h)].map(x => ({})));
  for (const tile of ret.flat())
    tile.grid = ret;
  ret.get = tag => ret.flat().filter(x => x.art == art[tag]);
  return ret;
}

const xyOfTile = tile => {
  for (const [x, row] of Object.entries(tile.grid)) {
    const y = row.indexOf(tile);
    if (y >= 0)
      return [+x, y];
  }
  throw new Error("no such tile!");
}

const push = (tile, dir, onObstruct=()=>false) => {
  let dx, dy;
  dx = dy = 0;

       if (dir ==    "up") dy--;
  else if (dir ==  "down") dy++;
  else if (dir ==  "left") dx--;
  else if (dir == "right") dx++;
  else throw new Error("no such direction!");

  const [x, y] = xyOfTile(tile);

  let obstructor;
  let goes = 1;

  const cb = () => (goes--, onObstruct(obstructor, dir, () => goes++));

  do {
    obstructor = tile.grid[x + dx];
    if (!obstructor) return false;
    obstructor = obstructor[y + dy]
    if (!obstructor) return false;

    if (!obstructor.art) {
      tile.grid[x][y] = obstructor;
      tile.grid[x + dx][y + dy] = tile;
      return true;
    }
  } while((cb(), goes > 0));
  return false;
}

const { floor, random } = Math;
const choose = arr => arr[floor(random() * arr.length)];
/* .. */

function draw(grids) {
  const { width, height } = canvas;
  ctx.fillStyle = "rgb(47, 43, 49)";
  ctx.fillRect(0, 0, width, height);

  const { entries } = Object;
  for (const grid of grids)
    for (const [x, row] of entries(grid))
      for (const [y, tile] of entries(row))
        if (tile.art)
          ctx.drawImage(tile.art, x*TILE_PX, y*TILE_PX, TILE_PX, TILE_PX);
}

const p = ({ legend, pattern, after }) => {
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

            let t = grid[x + +dx];
            if (!t) { match = false; continue };
            t = t[y + +dy];
            if (!t) { match = false; continue };

            match &&= test(t);
          }
        if (match) {
          for (const [dx, row] of entries(pattern))
            for (const [dy, test] of entries(row))
              after(grid[x + +dx][y + +dy]);
          return;
        }
      }
  }
}


 
/* USERLAND */
const trees = [art.oak, art.palm, art.pine];

const main = grid();

const grass = grid();
for (let x = 0; x < w; x++)
  for (let y = 0; y < h; y++)
    grass[x][y].art = art.grass;

const reset = () => {
  const [player] = main.get("player");
  if (player) delete player.art;

  for (let x = 0; x < 7; x++)
    for (let y = 0; y < 6; y++)
      grass[3 + x][2 + y].art = choose(trees);
}
const lvl = (function *() {
  const ghost = (x, y) => {
    main[x][y].art = art.ghost;
    delete grass[x][y].art;
  }

  reset();
  main[2][2].art = art.player;
  ghost(5, 5);
  yield;
  reset();
  main[2][2].art = art.player;
  ghost(5, 6);
  ghost(8, 4);
  yield;
  reset();
  main[2][2].art = art.player;
  ghost(5, 6);
  ghost(8, 4);
  ghost(8, 6);
  yield;
  alert("you win");
})();
lvl.next();


const clearCrate = t => {
  if (t.art == art.crate)
    delete t.art;
}
const legend = { 'c': t => t.art == art.crate,
                 '_': t => t.art != art.crate };
const patterns = [
  p({
    legend,
    pattern: 
      `ccc`,
    after: clearCrate
  }),
  p({
    legend,
    pattern: 
      `c
       c
       c`,
    after: clearCrate
  }),
];

let won;
loop(ev => {
  let [player] = main.get("player");
  if (!player) {
    if (ev.key == 'r')
      (reset(), [player] = main.get("player"));
    else
      return;
  }

  const [x, y] = xyOfTile(player);
       if (ev.key == 'w') push(player,    "up");
  else if (ev.key == 's') push(player,  "down");
  else if (ev.key == 'a') push(player,  "left");
  else if (ev.key == 'd') push(player, "right");

  const [nx, ny] = xyOfTile(player);
  if (grass[nx][ny].art == art.flower) {
    player.art = art.fire;

    setTimeout(() => {
      player.art = art.meat;
      draw([grass, main]);
    }, 1000);
  }

  if (trees.includes(grass[x][y].art)) {
    grass[x][y].art = art.fire;

    setTimeout(() => {
      grass[x][y].art = art.flower;
      draw([grass, main]);
    }, 300);
  }

  if (!grass.flat().some(x => trees.includes(x.art)))
    lvl.next(), draw([grass, main]);

  draw([grass, main]);
});
/* ... */
