const log = x => (console.log(x), x);

/* let's get this party started */
const canvas = document.querySelector(".plantsvsmankind");
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

let map = {};
const onMap = (x, y) => x < w && x >= 0 &&
                        y < h && y >= 0;
const mapSet = (obj, x, y) =>
  map[[floor(x), floor(y)]] = obj;
const mapNeighbors = (x, y) => {
  return [
    [x-1, y  ],
    [x+1, y  ],
    [x  , y+1],
    [x  , y-1],
  ];
}
const mapPos = obj => {
  for (const pos in map)
    if (map[pos] == obj)
      return pos.split(",").map(x => +x);
}
const mapMove = (obj, nx, ny) => {
  for (const pos in map)
    if (map[pos] == obj)
      delete map[pos];
  mapSet(obj, nx, ny);
}

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

const defenders = [
  { art: art.ent,   cost: 2, attackFreq: 3000 },
  { art: art.squid, cost: 5, attackFreq: 2000 },
];

let cursor, hp, meats, placing, start;
let restarts = -1;
const channels = () => Math.min(5, 1+floor((Date.now() - start) / 16000));
function restart() {
  restarts++;
  cursor = [w/2, h/2];
  hp = 3;
  meats = 10;
  placing = -1;
  start = Date.now();

  map = {};
  for (let x = 0; x < w; x++)
    for (let y = 0; y < h; y++) {
      let dx = (w/2 - x - 0.5) * 0.8,
          dy = h/2 - y;

      if (!(y % 2 || abs(dx) > 5 || abs(dy) > 5))
        continue;

      let img = art.grass;
      if (random() < 0.1)
        img = art.flower;

      if (Math.sqrt(dx*dx + dy*dy) > 7)
        img = art.trees;
      if (Math.sqrt(dx*dx + dy*dy) > 8)
        img = [art.oak, art.pine][round(random())];
      mapSet({ art: img }, x, y); 
    }
  mapSet({ art: art.rip   }, 2, 10);
  mapSet({ art: art.cross }, 1, 7);

  mapSet({ art: art.house  }, w-3, h-10);
  mapSet({ art: art.house  }, w-3,   9);
  mapSet({ art: art.castle }, w-2,   7);

  let myRestarts = restarts;
  let t = 10000;
  setTimeout(function spawnEnemy() {
    if (restarts != myRestarts) return;

    t = Math.max(t * 0.9, 6000);

    let man = { art: art.player };
    let x = w-5,
        y = 4 + 2*floor(random() * channels());
    mapSet(man, x, y);
    let march = setInterval(() => {
      if (!mapPos(man)) {
        clearInterval(march);
        return;
      }

      if (x > 3) {
        if (fireVsMan(man, x, y)) return;
        mapMove(man, x, y);
        x--;
      } else {
        hp--;
        if (hp < 1) restart();
        else delete map[[x+1, y]];
        clearInterval(march);
      }
    }, 100); // 1100);

    setTimeout(spawnEnemy, t);
  }, 800);
}
restart();

function fireVsMan(fireOrMan, x, y) {
  const tile = map[[x, y]];
  const img = tile?.art;
  if ([art.fire, art.player].includes(img) && img != fireOrMan?.art) {
    const fireOrManPos = mapPos(fireOrMan);
    delete map[[x, y]];
    delete map[mapPos(fireOrMan)];

    const manPos = img == art.player ? [x, y] : fireOrManPos;
    mapSet({ art: art.meat }, ...manPos);
    return true;
  }
}

canvas.setAttribute("tabindex", "1");
canvas.onkeydown = ev => {
  let [x, y] = cursor;
  if (ev.key == "w") y -= 2;
  if (ev.key == "s") y += 2;
  if (ev.key == "a") x--;
  if (ev.key == "d") x++;
  const clamp = (x, min, max) => Math.max(min, Math.min(max, x));
  const rowMax = 15;
  cursor = [clamp(x, 4, rowMax), clamp(y, 4, 12)];

  if (ev.key == "Tab") {
    ev.preventDefault();

    if (!defenders[placing+1])
      placing = -1;
    else
      placing++;
  }

  if (ev.key == " ") {
    if (defenders[placing]) {
      const { cost, art: img, attackFreq } = defenders[placing];
      if (cost > meats) return;

      meats -= cost;
      let pos = [...cursor]
      const defender = { art: img };
      mapSet(defender, ...pos);
      setInterval(() => { /* defender shooting interval */
        if (!mapPos(defender)) {
          clearInterval(move);
          return;
        }

        let [x, y] = pos;
        let fire = { art: art.fire };
        mapSet(fire, ++x, y);
        let move = setInterval(() => { /* fireball moving interval */
          if (!mapPos(fire)) {
            clearInterval(move);
            return;
          }

          x++;
          if (fireVsMan(fire, x, y)) return;
          if (x > rowMax) {
            delete map[[x-1, y]];
            clearInterval(move);
            return;
          }
          mapMove(fire, x, y);
        }, 300);
      }, attackFreq);
      placing = -1;
    }
  }

  if (map[cursor]?.art == art.meat) {
    delete map[cursor];
    meats++;
  }
}

requestAnimationFrame(function frame(now) {
  ctx.fillStyle = "rgb(47, 43, 49)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < channels(); i++)
    drawTile(art.pointer, w-5, 4 + 2*i, 2, 0.7 + 0.12*sin(Date.now() / 80));

  for (const pos in map) {
    const [x, y] = pos.split(",").map(x => +x);
    if (y == 0) continue;
    const img = map[pos].art;
    drawTile(img, x, y, (img == art.fire) ? 3 : 0);
  }

  for (let i = 0; i < 3; i++)
    drawTile((i < hp) ? art.heart_full : art.heart_empty, i, 0);

  drawTile(art.meat, 5, 0);
  ctx.font = "24px serif";
  ctx.fillStyle = "gold";
  ctx.fillText(meats, 198, 25);
  let cost;
  if (cost = defenders[placing]?.cost) {
    const { width } = ctx.measureText(meats);
    ctx.font = "24px serif bold";
    ctx.fillStyle = "crimson";
    ctx.fillText(' - ' + cost, width + 198, 25);
  }

  {
    let img = art.box;
    let freq = 100;
    let amp = 0.08;
    let alpha = 0.45;
    if (defenders[placing]) {
      let cost;
      ({ art: img, cost } = defenders[placing]);
      if (cost > meats)
        alpha = 0.3, freq = 300, amp = 0.04;
      else
        alpha = 0.6, freq = 85;
    }
    drawTile(img, ...cursor, 0, alpha + amp*Math.sin(Date.now() / freq));
  }

  requestAnimationFrame(frame);
});
