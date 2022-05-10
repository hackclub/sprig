const log = x => (console.log(x), x);

/* let's get this party started */
const canvas = document.querySelector(".axechess");
const ctx = canvas.getContext('2d');

const TILE_PX = 32;
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
    "flower",      "bush",        "trees",
    "heart_full",  "heart_empty"
  ].map(x => new Promise(res => {
    let img = new Image();
    img.src = `img/${x}.png`;
    img.onload = () => res([x, img]);
    return img;
  }))
));

let mouse = { x: 0, y: 0 };
let mouseTile = () => [floor(mouse.x / TILE_PX),
                       floor(mouse.y / TILE_PX)];
canvas.onmousemove = ev => mouse = { x: ev.offsetX, y: ev.offsetY };

const { sign, abs, floor, cos, sin, random } = Math;
const cardinalDelta = (a, b) => {
    let [dx, dy] = [a[0] - b[0],
                    a[1] - b[1]];
    if (abs(dx) > abs(dy)) dy = 0, dx = sign(dx) || 1;
    else                   dx = 0, dy = sign(dy) || 1;
    return [dx, dy];
};
const onMap = (x, y) => x < w && x >= 0 &&
                        y < h && y >= 0;

let map = {};
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

let state = "movin";
const player = { art: art.ghost };
let hp = 3;

let level = 0;
const levels = [
  () => {
    map = {};
    state = "movin";
    mapSet(player, 7, 7);
    mapSet({ art: art.axe },  9, 7);
    mapSet({ art: art.axe }, 10, 7);
    mapSet({ art: art.axe }, 11, 7);

    mapSet({ art: art.door},  6, 4);
    mapSet({ art: art.snek},  3, 7);
  },
  () => {
    map = {};
    state = "movin";
    mapSet(player, 7, 7);
    mapSet({ art: art.axe },  9, 7);
    mapSet({ art: art.axe },  9, 6);
    mapSet({ art: art.axe },  9, 5);

    mapSet({ art: art.door},  5, 4);
    mapSet({ art: art.axe },  3, 7);
  },
  () => {
    map = {};
    state = "movin";
    mapSet(player, w/2, h/2);

    const circle = [
      'axe', 'snek',
      'axe', 'axe',
      'axe', 'axe',
      'axe', 'snek',
      'axe', 'axe',
      'axe'
    ];
    for (const [i, img] of Object.entries(circle)) {
      const t = i / circle.length * Math.PI * 2;

      mapSet(
        { art: art[img] },
        w/2 + cos(t) * 6,
        h/2 + sin(t) * 6
      );
    }
  },
];
levels[level]();


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

const axeFSM = {
  throwin: {
    draw() {
      const [dx, dy] = cardinalDelta(mouseTile(), mapPos(player));
      this.lastDelta = [dx, dy];
      let [x, y] = mapPos(player);
      drawTile(art.axe, x+dx, y+dy, Date.now() / 500);
    },
    mousedown(ev) {
      const axe = { art: art.axe };

      let [dx, dy] = this.lastDelta;
      let [x, y] = mapPos(player);
      x += dx, y += dy;

      state = "flyin";
      mapSet(axe, x, y);
      axeFSM.flyin.axe = axe;
      axeFSM.flyin.dir = [dx, dy];
    }
  },
  movin: {
    moves() {
      let ret = [];

      const tryGo = (dx, dy) => {
        let [x, y] = mapPos(player);
        while (!map[[x+dx, y+dy]] && onMap(x+dx, y+dy))
          x += dx, y += dy;

        let wins = false;
        if (map[[x+dx, y+dy]]?.art == art.door)
          x += dx, y += dy, wins = true;

        let underMouse = mouseTile()+"" == ""+[x, y];
        ret.push({ x, y, underMouse, wins });
      };

      for (const dx of [1, -1]) tryGo(dx, 0);
      for (const dy of [1, -1]) tryGo(0, dy);
      return ret;
    },
    draw() {
      for (const { x, y, underMouse} of this.moves()) {
        let alpha = 0.4 + 0.07*Math.sin(x + y + Date.now()/300);
        if (underMouse)
          alpha += 0.4;

        drawTile(art.ghost, x, y, 0, alpha);
      }
    },
    mousedown() {
      for (const { x, y, underMouse, wins } of this.moves())
        if (underMouse) {
          mapMove(player, x, y);

          if (wins) {
            levels[++level]();
            return;
          }

          if (mapNeighbors(x, y).some(pos => map[pos]?.art == art.snek))
            if (hp-- < 1)
              alert("you died."),
              level = 0,
              levels[level]();

          let localAxePos = mapNeighbors(x, y).find(pos => map[pos]?.art == art.axe);
          if (localAxePos) {
            delete map[localAxePos];
            state = "throwin";
            return;
          }

          state = "movin";
        }
    },
  },
  flyin: {
    tick() {
      const [dx, dy] = this.dir;
      let [x, y] = mapPos(this.axe);
      x += dx, y += dy;

      if (map[[x, y]] || !onMap(x+dx, y+dy))
        state = "movin";

      if (map[[x, y]]?.art != art.axe)
        mapMove(this.axe, x, y);
    }
  },
};

canvas.setAttribute("tabindex", "1");
canvas.onkeydown = ev => {
  if (ev.key == "r")
    levels[level]();
};

canvas.onmousedown = () => {
  if (axeFSM[state].mousedown)
      axeFSM[state].mousedown();
};
setInterval(() => {
  if (axeFSM[state].tick)
      axeFSM[state].tick();
}, 200);

requestAnimationFrame(function frame(now) {
  ctx.fillStyle = "rgb(47, 43, 49)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 3; i++)
    drawTile((i < hp) ? art.heart_full : art.heart_empty, i, 0);

  for (const pos in map) {
    const [x, y] = pos.split(",").map(x => +x);
    drawTile(map[pos].art, x, y);
  }

  if (axeFSM[state].draw)
      axeFSM[state].draw();

  requestAnimationFrame(frame);
});
