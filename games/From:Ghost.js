(function () {
  "use strict";

  const W = 320;
  const H = 240;
  const SCALE = 3;
  const TILE = 16;
  const PLAYER_SPEED = 1.15;
  const INTERACT_DIST = 22;

  const C = {
    black: "#0a0a0a",
    dark: "#1a1a1a",
    mid: "#2a2a2a",
    wood: "#3d2b1f",
    woodL: "#5c4033",
    woodD: "#2a1c14",
    floor: "#2e2419",
    floorL: "#3a2f22",
    wall: "#1e1a16",
    crack: "#0f0c0a",
    dust: "#4a3f32",
    candle: "#ffcc66",
    candleG: "#ffaa33",
    ghost: "#aaccff",
    ghostA: "rgba(170,204,255,0.45)",
    paper: "#c8b89a",
    key: "#8a7a4a",
    book: "#1a0a0a",
    bookR: "#3a1010",
    eyes: "#e0e0e0",
    skin: "#c8a882",
    hair: "#2a1c10",
    shirt: "#2a3a4a",
    pants: "#1a1a2a",
    shoe: "#111111",
    bag: "#3a2a1a",
    light: "#fff8e0",
    red: "#aa2222",
    green: "#2a4a2a",
    blue: "#2a2a4a",
    white: "#e8e0d0",
    gray: "#5a5a5a",
    yellow: "#c8a830"
  };

  let canvas, ctx;
  let state = "title";
  let room = "entrance";
  let player = {
    x: 160, y: 180, dir: 0, frame: 0, walking: false,
    flashlight: true, name: "Alex"
  };
  let keys = {};
  let clues = 0;
  const maxClues = 6;
  let flags = {
    doorLocked: false, diary: false, symbol: false, blackBook: false,
    key: false, bell: false, mirror: false, ghostSeen: false, girlMet: false,
    libraryOpen: false, basementOpen: false, flashlightFail: false,
    finalTriggered: false
  };
  let dialogue = null;
  let shake = 0;
  let flicker = 0;
  let ghostAlpha = 0;
  let ghostX = 160, ghostY = 80;
  let screenDistort = 0;
  let introStep = 0;
  let endingStep = 0;
  let endingTimer = 0;
  let message = null;
  let messageTimer = 0;
  let audioCtx = null;
  let lastStep = 0;
  let time = 0;
  let objects = {};
  let collisions = {};
  let currentGhost = null;

  function initAudio() {
    try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {}
  }
  function playTone(freq, dur, type, vol) {
    if (!audioCtx) return;
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.type = type || "sine";
    o.frequency.value = freq;
    g.gain.value = vol || 0.08;
    o.connect(g); g.connect(audioCtx.destination);
    o.start();
    g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + dur);
    o.stop(audioCtx.currentTime + dur);
  }
  function sfxFoot() { playTone(80 + Math.random() * 40, 0.06, "triangle", 0.04); }
  function sfxInteract() { playTone(220, 0.08, "square", 0.05); }
  function sfxDoor() { playTone(120, 0.15, "sawtooth", 0.06); setTimeout(function () { playTone(90, 0.2, "sawtooth", 0.04); }, 80); }
  function sfxBell() { playTone(440, 0.4, "sine", 0.1); setTimeout(function () { playTone(330, 0.5, "sine", 0.07); }, 100); }
  function sfxGhost() { playTone(60, 0.8, "sawtooth", 0.05); playTone(90, 0.6, "triangle", 0.04); }
  function sfxFlicker() { playTone(30, 0.05, "square", 0.03); }
  function sfxWhisper() {
    if (!audioCtx) return;
    const b = audioCtx.createBuffer(1, audioCtx.sampleRate * 0.4, audioCtx.sampleRate);
    const d = b.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * 0.15 * Math.exp(-i / (d.length * 0.3));
    const s = audioCtx.createBufferSource();
    s.buffer = b;
    const g = audioCtx.createGain();
    g.gain.value = 0.12;
    s.connect(g); g.connect(audioCtx.destination);
    s.start();
  }
  function sfxDrone() { playTone(40, 1.5, "sine", 0.04); }

  function rect(x, y, w, h, col) {
    ctx.fillStyle = col;
    ctx.fillRect(Math.floor(x), Math.floor(y), w, h);
  }
  function pixel(x, y, col) { rect(x, y, 1, 1, col); }
  function text(str, x, y, col, size) {
    ctx.fillStyle = col || C.white;
    ctx.font = (size || 8) + "px monospace";
    ctx.fillText(str, x, y);
  }
  function centerText(str, y, col, size) {
    ctx.fillStyle = col || C.white;
    ctx.font = (size || 8) + "px monospace";
    const m = ctx.measureText(str);
    ctx.fillText(str, (W - m.width) / 2, y);
  }
  function dist(ax, ay, bx, by) { return Math.hypot(ax - bx, ay - by); }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  function makeGrid(w, h) {
    const g = [];
    for (let y = 0; y < h; y++) {
      g[y] = [];
      for (let x = 0; x < w; x++) g[y][x] = false;
    }
    return g;
  }
  function fillBorder(g, w, h) {
    for (let x = 0; x < w; x++) { g[0][x] = true; g[h - 1][x] = true; }
    for (let y = 0; y < h; y++) { g[y][0] = true; g[y][w - 1] = true; }
  }
  function block(g, x, y, w, h) {
    for (let dy = 0; dy < h; dy++)
      for (let dx = 0; dx < w; dx++)
        if (g[y + dy] && g[y + dy][x + dx] !== undefined) g[y + dy][x + dx] = true;
  }

  function initRooms() {
    collisions.entrance = makeGrid(20, 15);
    fillBorder(collisions.entrance, 20, 15);
    block(collisions.entrance, 2, 3, 3, 2);
    block(collisions.entrance, 14, 3, 3, 2);
    block(collisions.entrance, 1, 10, 2, 3);
    block(collisions.entrance, 17, 10, 2, 3);

    objects.entrance = [
      { id: "door_front", x: 10 * TILE, y: 14 * TILE, w: 16, h: 8, solid: true, type: "door", label: "Front Door" },
      { id: "table_l", x: 2 * TILE, y: 3 * TILE, w: 48, h: 32, solid: true, type: "examine", text: "Dust covers everything. A faded photograph of the mansion sits here." },
      { id: "table_r", x: 14 * TILE, y: 3 * TILE, w: 48, h: 32, solid: true, type: "examine", text: "Candles, long extinguished. Wax has dripped onto the floor." },
      { id: "diary", x: 4 * TILE + 8, y: 4 * TILE, w: 12, h: 10, solid: false, type: "clue", clue: "diary", text: "The pages are yellowed. One entry stands out:\n\nIf the house knocks three times,\ndo not answer.\n\nIt already knows you are here." },
      { id: "painting_e", x: 9 * TILE, y: 1 * TILE, w: 32, h: 24, solid: true, type: "examine", text: "A stern-looking man. The eyes seem to follow you." },
      { id: "window_l", x: 1 * TILE, y: 5 * TILE, w: 8, h: 24, solid: true, type: "examine", text: "Boarded up from the outside. Only darkness beyond." },
      { id: "window_r", x: 18 * TILE, y: 5 * TILE, w: 8, h: 24, solid: true, type: "examine", text: "The glass is cracked. Rain stains the frame." },
      { id: "door_gallery", x: 19 * TILE, y: 7 * TILE, w: 8, h: 24, solid: false, type: "door", target: "gallery", px: 24, py: 112 },
      { id: "door_corridor", x: 0, y: 7 * TILE, w: 8, h: 24, solid: false, type: "door", target: "corridor", px: 290, py: 112 },
      { id: "stairs", x: 8 * TILE, y: 1 * TILE, w: 64, h: 16, solid: true, type: "examine", text: "The stairs lead up into darkness. They look unstable." }
    ];

    collisions.gallery = makeGrid(20, 15);
    fillBorder(collisions.gallery, 20, 15);
    block(collisions.gallery, 3, 4, 2, 3);
    block(collisions.gallery, 15, 4, 2, 3);
    block(collisions.gallery, 9, 6, 2, 2);

    objects.gallery = [
      { id: "door_ent", x: 0, y: 7 * TILE, w: 8, h: 24, solid: false, type: "door", target: "entrance", px: 290, py: 120 },
      { id: "door_lib", x: 19 * TILE, y: 7 * TILE, w: 8, h: 24, solid: false, type: "door", target: "library", px: 24, py: 112, locked: true },
      { id: "portrait1", x: 3 * TILE, y: 2 * TILE, w: 32, h: 40, solid: true, type: "examine", text: "An elegant woman in old-fashioned dress. Her smile feels forced." },
      { id: "portrait2", x: 8 * TILE, y: 2 * TILE, w: 32, h: 40, solid: true, type: "examine", text: "A young girl holding a doll. Something about the eyes feels off." },
      { id: "portrait3", x: 13 * TILE, y: 2 * TILE, w: 32, h: 40, solid: true, type: "clue", clue: "symbol", text: "This one is different. The frame is newer.\nBehind it you find a carved symbol:\na diamond with a cross.\nIt feels familiar." },
      { id: "pedestal", x: 9 * TILE, y: 6 * TILE, w: 32, h: 32, solid: true, type: "examine", text: "Empty. Something once stood here." },
      { id: "candle_g1", x: 5 * TILE, y: 10 * TILE, w: 8, h: 16, solid: false, type: "examine", text: "Cold. The wax is blackened." },
      { id: "candle_g2", x: 14 * TILE, y: 10 * TILE, w: 8, h: 16, solid: false, type: "examine", text: "A faint scent of smoke lingers." }
    ];

    collisions.library = makeGrid(20, 15);
    fillBorder(collisions.library, 20, 15);
    block(collisions.library, 2, 2, 4, 5);
    block(collisions.library, 14, 2, 4, 5);
    block(collisions.library, 7, 8, 6, 3);

    objects.library = [
      { id: "door_gal", x: 0, y: 7 * TILE, w: 8, h: 24, solid: false, type: "door", target: "gallery", px: 290, py: 112 },
      { id: "shelf_l", x: 2 * TILE, y: 2 * TILE, w: 64, h: 80, solid: true, type: "examine", text: "Rows of moldy books. Most titles are illegible." },
      { id: "shelf_r", x: 14 * TILE, y: 2 * TILE, w: 64, h: 80, solid: true, type: "examine", text: "History and family records. Dust everywhere." },
      { id: "blackbook", x: 9 * TILE + 4, y: 9 * TILE, w: 16, h: 12, solid: false, type: "clue", clue: "blackBook", text: "A heavy black tome. The cover is warm." },
      { id: "table_lib", x: 7 * TILE, y: 8 * TILE, w: 96, h: 48, solid: true, type: "examine", text: "Papers scattered. One page shows the same diamond symbol." },
      { id: "chair_lib", x: 10 * TILE, y: 11 * TILE, w: 16, h: 16, solid: true, type: "examine", text: "The leather is cracked. Someone sat here recently." },
      { id: "symbol_panel", x: 9 * TILE, y: 1 * TILE, w: 32, h: 16, solid: true, type: "puzzle", puzzle: "symbol", text: "A panel with a diamond-shaped recess." }
    ];

    collisions.corridor = makeGrid(20, 15);
    fillBorder(collisions.corridor, 20, 15);
    block(collisions.corridor, 4, 3, 2, 2);
    block(collisions.corridor, 14, 3, 2, 2);
    block(collisions.corridor, 9, 10, 2, 2);

    objects.corridor = [
      { id: "door_ent2", x: 19 * TILE, y: 7 * TILE, w: 8, h: 24, solid: false, type: "door", target: "entrance", px: 24, py: 120 },
      { id: "door_base", x: 9 * TILE, y: 14 * TILE, w: 32, h: 8, solid: false, type: "door", target: "basement", px: 160, py: 32, locked: true },
      { id: "key", x: 5 * TILE, y: 4 * TILE, w: 12, h: 8, solid: false, type: "clue", clue: "key", text: "A heavy iron key. The tag reads: B-1" },
      { id: "box1", x: 14 * TILE, y: 3 * TILE, w: 32, h: 32, solid: true, type: "examine", text: "Tools and rags. Nothing useful." },
      { id: "pipe", x: 1 * TILE, y: 5 * TILE, w: 16, h: 64, solid: true, type: "examine", text: "Rusted pipes run along the wall. They groan faintly." },
      { id: "note", x: 10 * TILE, y: 11 * TILE, w: 12, h: 10, solid: false, type: "examine", text: "The key opens more than doors. It opens memory." }
    ];

    collisions.basement = makeGrid(20, 15);
    fillBorder(collisions.basement, 20, 15);
    block(collisions.basement, 3, 3, 3, 3);
    block(collisions.basement, 14, 3, 3, 3);
    block(collisions.basement, 8, 8, 4, 3);

    objects.basement = [
      { id: "door_up", x: 9 * TILE, y: 0, w: 32, h: 12, solid: false, type: "door", target: "corridor", px: 160, py: 200 },
      { id: "bell", x: 4 * TILE, y: 4 * TILE, w: 20, h: 24, solid: true, type: "clue", clue: "bell", text: "An old brass bell. The clapper is missing." },
      { id: "mirror", x: 15 * TILE, y: 3 * TILE, w: 24, h: 40, solid: true, type: "clue", clue: "mirror", text: "The glass is clouded." },
      { id: "boxes", x: 8 * TILE, y: 8 * TILE, w: 64, h: 48, solid: true, type: "examine", text: "Rotting wood and old machinery parts." },
      { id: "symbol_b", x: 10 * TILE, y: 1 * TILE, w: 32, h: 16, solid: true, type: "examine", text: "The same diamond-cross symbol is carved everywhere here." },
      { id: "machine", x: 2 * TILE, y: 10 * TILE, w: 40, h: 32, solid: true, type: "examine", text: "Gears and levers, frozen with rust." },
      { id: "final_door", x: 18 * TILE, y: 6 * TILE, w: 16, h: 48, solid: true, type: "examine", text: "Just a wall... for now.", hidden: true }
    ];
  }

  function drawPlayer(px, py, dir, frame) {
    ctx.save();
    const f = Math.floor(frame) % 2;
    rect(px - 5, py + 6, 10, 3, "rgba(0,0,0,0.4)");
    const legOff = player.walking ? (f === 0 ? -1 : 1) : 0;
    if (dir === 0 || dir === 3) {
      rect(px - 3, py + 2 + legOff, 2, 5, C.pants);
      rect(px + 1, py + 2 - legOff, 2, 5, C.pants);
      rect(px - 3, py + 6 + legOff, 2, 2, C.shoe);
      rect(px + 1, py + 6 - legOff, 2, 2, C.shoe);
    } else {
      rect(px - 2, py + 2, 4, 5, C.pants);
      rect(px - 2, py + 6, 4, 2, C.shoe);
    }
    rect(px - 4, py - 4, 8, 7, C.shirt);
    if (dir !== 3) rect(px - 5, py - 3, 3, 5, C.bag);
    rect(px - 4, py - 11, 8, 7, C.skin);
    rect(px - 4, py - 13, 8, 3, C.hair);
    if (dir === 0) {
      pixel(px - 2, py - 9, C.eyes);
      pixel(px + 1, py - 9, C.eyes);
      rect(px - 1, py - 7, 2, 1, "#a07050");
    } else if (dir === 3) {
      rect(px - 4, py - 11, 8, 7, C.hair);
    } else if (dir === 1) {
      pixel(px - 2, py - 9, C.eyes);
    } else {
      pixel(px + 1, py - 9, C.eyes);
    }
    if (player.flashlight && !flags.flashlightFail) {
      ctx.globalAlpha = 0.12;
      ctx.fillStyle = C.light;
      ctx.beginPath();
      ctx.moveTo(px, py - 4);
      if (dir === 0) { ctx.lineTo(px - 20, py + 40); ctx.lineTo(px + 20, py + 40); }
      else if (dir === 3) { ctx.lineTo(px - 20, py - 50); ctx.lineTo(px + 20, py - 50); }
      else if (dir === 1) { ctx.lineTo(px - 50, py - 20); ctx.lineTo(px - 50, py + 20); }
      else { ctx.lineTo(px + 50, py - 20); ctx.lineTo(px + 50, py + 20); }
      ctx.fill();
      ctx.globalAlpha = 1;
    }
    if (dir === 0 || dir === 2) {
      rect(px + 4, py - 2, 3, 5, C.skin);
      rect(px + 5, py + 2, 2, 3, C.yellow);
    } else if (dir === 1) {
      rect(px - 7, py - 2, 3, 5, C.skin);
      rect(px - 7, py + 2, 2, 3, C.yellow);
    }
    ctx.restore();
  }

  function drawGhost(gx, gy, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha || 0.6;
    rect(gx - 5, gy - 8, 10, 14, C.ghost);
    rect(gx - 4, gy - 16, 8, 8, C.ghost);
    pixel(gx - 2, gy - 13, "#203040");
    pixel(gx + 1, gy - 13, "#203040");
    rect(gx - 5, gy - 18, 2, 10, "#8090b0");
    rect(gx + 3, gy - 18, 2, 10, "#8090b0");
    rect(gx - 6, gy + 4, 12, 6, C.ghostA);
    ctx.restore();
  }

  function drawRoom() {
    for (let ty = 0; ty < 15; ty++) {
      for (let tx = 0; tx < 20; tx++) {
        const col = (tx + ty) % 2 === 0 ? C.floor : C.floorL;
        rect(tx * TILE, ty * TILE, TILE, TILE, col);
      }
    }
    for (let tx = 0; tx < 20; tx++) {
      rect(tx * TILE, 0, TILE, 12, C.wall);
      if (tx % 3 === 0) rect(tx * TILE + 6, 2, 1, 8, C.crack);
    }
    for (let ty = 0; ty < 15; ty++) {
      rect(0, ty * TILE, 8, TILE, C.wall);
      rect(W - 8, ty * TILE, 8, TILE, C.wall);
    }
    if (room === "entrance") drawEntrance();
    else if (room === "gallery") drawGallery();
    else if (room === "library") drawLibrary();
    else if (room === "corridor") drawCorridor();
    else if (room === "basement") drawBasement();
  }

  function drawEntrance() {
    for (let i = 0; i < 4; i++) rect(8 * TILE - i * 2, 12 - i * 3, 64 + i * 4, 4, C.wood);
    rect(2 * TILE, 3 * TILE, 48, 28, C.wood);
    rect(2 * TILE + 2, 3 * TILE + 2, 44, 8, C.woodL);
    rect(14 * TILE, 3 * TILE, 48, 28, C.wood);
    rect(4 * TILE, 3 * TILE - 6, 3, 8, C.candle);
    pixel(4 * TILE + 1, 3 * TILE - 8, C.candleG);
    rect(16 * TILE, 3 * TILE - 6, 3, 8, C.candle);
    rect(9 * TILE, 13 * TILE, 32, 20, C.woodD);
    rect(9 * TILE + 4, 13 * TILE + 4, 24, 12, C.wood);
    pixel(11 * TILE, 14 * TILE + 4, C.yellow);
    rect(1 * TILE, 5 * TILE, 10, 28, "#0a1520");
    rect(18 * TILE + 6, 5 * TILE, 10, 28, "#0a1520");
    if (!flags.diary) {
      rect(4 * TILE + 8, 4 * TILE, 10, 7, C.paper);
      rect(4 * TILE + 9, 4 * TILE + 1, 8, 1, C.woodD);
    }
  }

  function drawGallery() {
    const ports = [[3, 2], [8, 2], [13, 2]];
    for (let i = 0; i < ports.length; i++) {
      const tx = ports[i][0], ty = ports[i][1];
      rect(tx * TILE - 2, ty * TILE - 2, 36, 44, C.wood);
      rect(tx * TILE, ty * TILE, 32, 40, i === 2 ? "#201818" : "#1a1520");
      rect(tx * TILE + 10, ty * TILE + 8, 12, 14, C.skin);
      rect(tx * TILE + 8, ty * TILE + 6, 16, 4, C.hair);
    }
    rect(9 * TILE, 6 * TILE, 32, 28, C.wood);
    rect(9 * TILE + 4, 6 * TILE - 4, 24, 6, C.woodL);
    rect(5 * TILE, 10 * TILE, 4, 12, C.candle);
    rect(14 * TILE, 10 * TILE, 4, 12, C.candle);
  }

  function drawLibrary() {
    for (let i = 0; i < 5; i++) {
      rect(2 * TILE, 2 * TILE + i * 14, 64, 12, C.wood);
      for (let b = 0; b < 6; b++) {
        const bc = [C.book, C.bookR, C.blue, C.green, C.woodD][b % 5];
        rect(2 * TILE + 4 + b * 10, 2 * TILE + i * 14 + 2, 8, 8, bc);
      }
    }
    for (let i = 0; i < 5; i++) {
      rect(14 * TILE, 2 * TILE + i * 14, 64, 12, C.wood);
      for (let b = 0; b < 6; b++) {
        const bc = [C.bookR, C.book, C.green, C.blue, C.wood][b % 5];
        rect(14 * TILE + 4 + b * 10, 2 * TILE + i * 14 + 2, 8, 8, bc);
      }
    }
    rect(7 * TILE, 8 * TILE, 96, 40, C.wood);
    rect(7 * TILE + 4, 8 * TILE + 4, 88, 8, C.woodL);
    if (!flags.blackBook) {
      rect(9 * TILE + 4, 9 * TILE, 16, 10, C.book);
      rect(9 * TILE + 5, 9 * TILE + 1, 14, 2, C.red);
    }
    rect(9 * TILE, 1 * TILE, 32, 14, C.woodD);
    if (flags.symbol) {
      ctx.strokeStyle = C.yellow;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(10 * TILE + 8, 1 * TILE + 3);
      ctx.lineTo(10 * TILE + 16, 1 * TILE + 10);
      ctx.lineTo(10 * TILE + 8, 1 * TILE + 13);
      ctx.lineTo(10 * TILE, 1 * TILE + 8);
      ctx.closePath();
      ctx.stroke();
    }
  }

  function drawCorridor() {
    rect(1 * TILE, 4 * TILE, 8, 80, C.gray);
    rect(1 * TILE + 2, 4 * TILE, 4, 80, "#3a3a3a");
    rect(14 * TILE, 3 * TILE, 32, 28, C.wood);
    rect(14 * TILE + 2, 3 * TILE + 2, 28, 8, C.woodL);
    if (!flags.key) {
      rect(5 * TILE, 4 * TILE, 10, 6, C.key);
      rect(5 * TILE + 8, 4 * TILE + 1, 4, 4, C.key);
    }
    rect(10 * TILE, 11 * TILE, 12, 8, C.paper);
  }

  function drawBasement() {
    rect(0, 0, W, H, "rgba(0,0,0,0.28)");
    rect(8 * TILE, 8 * TILE, 64, 44, C.woodD);
    rect(8 * TILE + 4, 8 * TILE + 4, 56, 10, C.wood);
    rect(2 * TILE, 10 * TILE, 40, 30, C.gray);
    rect(2 * TILE + 4, 10 * TILE + 4, 12, 12, "#2a2a2a");
    if (!flags.bell) {
      rect(4 * TILE + 4, 4 * TILE, 12, 8, C.key);
      rect(4 * TILE + 6, 4 * TILE + 8, 8, 12, C.key);
    }
    rect(15 * TILE, 3 * TILE, 24, 40, C.wood);
    rect(15 * TILE + 2, 3 * TILE + 2, 20, 36, "#1a2030");
    for (let i = 0; i < 3; i++) rect(10 * TILE + i * 12, 1 * TILE + 4, 6, 6, C.crack);
    if (flags.finalTriggered) {
      rect(18 * TILE, 5 * TILE, 16, 64, C.woodD);
      rect(18 * TILE + 2, 5 * TILE + 4, 12, 56, C.black);
    }
  }

  function roomName() {
    const names = {
      entrance: "ENTRANCE HALL",
      gallery: "PORTRAIT GALLERY",
      library: "LIBRARY",
      corridor: "SERVICE CORRIDOR",
      basement: "BASEMENT"
    };
    return names[room] || room.toUpperCase();
  }

  function drawHUD() {
    rect(0, 0, W, 14, "rgba(0,0,0,0.75)");
    text("FROM GHOST", 4, 10, C.white, 7);
    text("ROOM: " + roomName(), 86, 10, C.paper, 7);
    text("CLUES: " + clues + "/" + maxClues, 214, 10, C.yellow, 7);
    rect(0, H - 12, W, 12, "rgba(0,0,0,0.7)");
    text("E: INVESTIGATE   WASD: MOVE   SPACE: ADVANCE", 4, H - 4, C.gray, 6);
  }

  function startDialogue(lines, onDone) {
    dialogue = { lines: lines, onDone: onDone, idx: 0 };
    state = "dialogue";
  }
  function advanceDialogue() {
    if (!dialogue) return;
    dialogue.idx++;
    if (dialogue.idx >= dialogue.lines.length) {
      const cb = dialogue.onDone;
      dialogue = null;
      state = "play";
      if (cb) cb();
    }
  }
  function drawDialogue() {
    if (!dialogue) return;
    const line = dialogue.lines[dialogue.idx];
    rect(8, H - 70, W - 16, 58, "rgba(10,10,15,0.92)");
    rect(8, H - 70, W - 16, 2, C.wood);
    const words = String(line).split(" ");
    let y = H - 58;
    let row = "";
    ctx.font = "8px monospace";
    for (let i = 0; i < words.length; i++) {
      const test = row + words[i] + " ";
      if (ctx.measureText(test).width > W - 30) {
        text(row, 16, y, C.white, 8);
        y += 11;
        row = words[i] + " ";
      } else row = test;
    }
    text(row, 16, y, C.white, 8);
    text("[SPACE / ENTER]", W - 90, H - 16, C.gray, 6);
  }

  function tryInteract() {
    const objs = objects[room] || [];
    let closest = null;
    let cd = INTERACT_DIST;
    for (let i = 0; i < objs.length; i++) {
      const o = objs[i];
      if (o.hidden && !flags.finalTriggered) continue;
      const ox = o.x + o.w / 2;
      const oy = o.y + o.h / 2;
      const d = dist(player.x, player.y, ox, oy);
      if (d < cd) { cd = d; closest = o; }
    }
    if (!closest) { showMsg("Nothing here."); return; }
    sfxInteract();
    handleObject(closest);
  }

  function handleObject(o) {
    if (o.type === "door") {
      if (o.locked) {
        if (o.target === "library" && flags.symbol) {
          o.locked = false;
          flags.libraryOpen = true;
          showMsg("The door unlocks with a soft click.");
          sfxDoor();
          return;
        }
        if (o.target === "basement" && flags.key) {
          o.locked = false;
          flags.basementOpen = true;
          showMsg("The rusty key turns. The door opens.");
          sfxDoor();
          return;
        }
        showMsg("It's locked.");
        return;
      }
      if (o.target) {
        changeRoom(o.target, o.px, o.py);
        sfxDoor();
      } else if (o.id === "door_front") {
        if (!flags.doorLocked) {
          flags.doorLocked = true;
          startDialogue(["You push the front door.", "It will not budge.", "The lock clicks from the inside.", "You are trapped."]);
          sfxDoor();
        } else {
          showMsg("Still locked. No way out.");
        }
      }
      return;
    }

    if (o.type === "clue") {
      if (o.clue === "diary" && !flags.diary) {
        flags.diary = true; clues++;
        startDialogue(["You found an OLD DIARY.", o.text, "A chill runs down your spine."]);
        return;
      }
      if (o.clue === "symbol" && !flags.symbol) {
        flags.symbol = true; clues++;
        startDialogue(["You examine the strange portrait.", o.text, "The symbol is burned into your mind."], function () {
          const d = objects.gallery.find(function (x) { return x.id === "door_lib"; });
          if (d) d.locked = false;
          flags.libraryOpen = true;
        });
        return;
      }
      if (o.clue === "blackBook" && !flags.blackBook) {
        flags.blackBook = true; clues++;
        startDialogue([
          "You open the BLACK BOOK.",
          "A list of names... people who entered this house.",
          "At the bottom, written in fresh ink:",
          "  " + player.name,
          "Your name.",
          "How is this possible?"
        ], triggerGhostGirl);
        return;
      }
      if (o.clue === "key" && !flags.key) {
        flags.key = true; clues++;
        startDialogue(["You pick up a RUSTY KEY.", o.text, "It feels heavier than it should."]);
        return;
      }
      if (o.clue === "bell" && !flags.bell) {
        flags.bell = true; clues++;
        startDialogue([
          "You examine the BROKEN BELL.",
          "The clapper is missing.",
          "You touch the rim...",
          "IT RINGS.",
          "A deep, impossible sound fills the basement."
        ], function () {
          sfxBell();
          shake = 20;
          setTimeout(sfxGhost, 400);
          checkFinal();
        });
        return;
      }
      if (o.clue === "mirror" && !flags.mirror) {
        flags.mirror = true; clues++;
        startDialogue([
          "You look into the OLD MIRROR.",
          "Your reflection is... wrong.",
          "You stop moving.",
          "The reflection continues for a moment.",
          "Then it turns its head to look at you."
        ], function () {
          screenDistort = 40;
          shake = 25;
          sfxWhisper();
          checkFinal();
        });
        return;
      }
      showMsg("You already checked this.");
      return;
    }

    if (o.type === "puzzle") {
      if (o.puzzle === "symbol") {
        if (flags.symbol) showMsg("The symbol fits. Something clicks in the house.");
        else showMsg("A diamond-shaped recess. You need the matching symbol.");
      }
      return;
    }

    if (o.type === "examine") {
      startDialogue([o.text]);
    }
  }

  function showMsg(t) { message = t; messageTimer = 120; }
  function changeRoom(target, px, py) {
    room = target;
    player.x = px;
    player.y = py;
    if (Math.random() < 0.3 && flags.diary) { flicker = 15; sfxFlicker(); }
  }

  function triggerGhostGirl() {
    if (flags.girlMet) return;
    flags.girlMet = true;
    currentGhost = { x: 200, y: 100 };
    sfxGhost();
    startDialogue([
      "...",
      "A figure appears between the shelves.",
      "GIRL: You came back.",
      player.name + ": I have never been here before.",
      "GIRL: The house remembers. You always come back.",
      "She fades into the dust."
    ], function () { currentGhost = null; });
  }

  function triggerGalleryGhost() {
    if (flags.ghostSeen || !flags.symbol) return;
    flags.ghostSeen = true;
    ghostX = 160; ghostY = 80; ghostAlpha = 0.7;
    sfxGhost();
    setTimeout(function () { ghostAlpha = 0; showMsg("It vanished..."); }, 1800);
  }

  function checkFinal() {
    if (flags.bell && flags.mirror && !flags.finalTriggered) {
      flags.finalTriggered = true;
      setTimeout(startFinalSequence, 1500);
    }
  }
  function startFinalSequence() {
    state = "event";
    endingStep = 0;
    endingTimer = 0;
    sfxDrone();
  }

  function onKeyDown(e) {
    keys[e.code] = true;
    if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) >= 0) e.preventDefault();
    if (state === "title" && (e.code === "Enter" || e.code === "Space")) {
      state = "intro"; introStep = 0; initAudio(); return;
    }
    if (state === "intro" && (e.code === "Enter" || e.code === "Space")) {
      introStep++;
      if (introStep > 4) {
        state = "play";
        room = "entrance";
        player.x = 160; player.y = 180;
        flags.doorLocked = true;
        startDialogue(["The heavy door swings shut behind you.", "A lock clicks.", "You are alone in the dark entrance hall."]);
      }
      return;
    }
    if (state === "dialogue" && (e.code === "Space" || e.code === "Enter")) { advanceDialogue(); return; }
    if (state === "ending" && (e.code === "Enter" || e.code === "Space")) { resetGame(); return; }
    if (state === "play" && e.code === "KeyE") tryInteract();
  }
  function onKeyUp(e) { keys[e.code] = false; }

  function resetGame() {
    state = "title";
    room = "entrance";
    player.x = 160; player.y = 180; player.dir = 0; player.frame = 0; player.walking = false;
    player.flashlight = true;
    clues = 0;
    flags = {
      doorLocked: false, diary: false, symbol: false, blackBook: false,
      key: false, bell: false, mirror: false, ghostSeen: false, girlMet: false,
      libraryOpen: false, basementOpen: false, flashlightFail: false,
      finalTriggered: false
    };
    dialogue = null; currentGhost = null; ghostAlpha = 0; message = null;
    initRooms();
  }

  function update() {
    time++;
    if (shake > 0) shake--;
    if (flicker > 0) flicker--;
    if (screenDistort > 0) screenDistort--;
    if (messageTimer > 0) messageTimer--;
    if (ghostAlpha > 0) ghostAlpha -= 0.01;

    if (state === "event") {
      endingTimer++;
      if (endingStep === 0 && endingTimer > 50) {
        endingStep = 1; endingTimer = 0;
        startDialogue(["The basement falls completely silent.", "Even the pipes stop groaning."], function () {
          endingStep = 2; endingTimer = 0; state = "event";
        });
      }
      if (endingStep === 2 && endingTimer > 20) {
        endingStep = 3;
        const fd = objects.basement.find(function (x) { return x.id === "final_door"; });
        if (fd) { fd.hidden = false; fd.text = "A door that was not there before."; }
        startDialogue(["A door appears in the far wall.", "Where there was only stone."], function () {
          endingStep = 4; endingTimer = 0; state = "event";
        });
      }
      if (endingStep === 4 && endingTimer > 30) {
        endingStep = 5;
        flags.flashlightFail = true;
        startDialogue([
          "Your flashlight flickers...",
          "Then dies.",
          "A voice whispers your name:",
          "\"" + player.name + "...\"",
          "You are still trapped inside.",
          "The mansion is not done with you."
        ], function () { state = "ending"; });
      }
      return;
    }
    if (state !== "play") return;

    let dx = 0, dy = 0;
    if (keys.KeyW || keys.ArrowUp) { dy = -1; player.dir = 3; }
    if (keys.KeyS || keys.ArrowDown) { dy = 1; player.dir = 0; }
    if (keys.KeyA || keys.ArrowLeft) { dx = -1; player.dir = 1; }
    if (keys.KeyD || keys.ArrowRight) { dx = 1; player.dir = 2; }
    player.walking = dx !== 0 || dy !== 0;
    if (player.walking) {
      player.frame += 0.15;
      if (time - lastStep > 12) { sfxFoot(); lastStep = time; }
    }
    const nx = player.x + dx * PLAYER_SPEED;
    const ny = player.y + dy * PLAYER_SPEED;
    if (!solidAt(nx, player.y)) player.x = nx;
    if (!solidAt(player.x, ny)) player.y = ny;
    player.x = clamp(player.x, 12, W - 12);
    player.y = clamp(player.y, 20, H - 16);

    if (room === "gallery" && flags.symbol && !flags.ghostSeen && player.x > 100) triggerGalleryGhost();
    if (time % 400 === 0 && Math.random() < 0.4) { flicker = 8; sfxFlicker(); }
  }

  function solidAt(x, y) {
    const tx = Math.floor(x / TILE);
    const ty = Math.floor(y / TILE);
    const g = collisions[room];
    if (!g || !g[ty] || g[ty][tx] === undefined) return true;
    if (g[ty][tx]) return true;
    const objs = objects[room] || [];
    for (let i = 0; i < objs.length; i++) {
      const o = objs[i];
      if (!o.solid) continue;
      if (x > o.x && x < o.x + o.w && y > o.y && y < o.y + o.h) return true;
    }
    return false;
  }

  function draw() {
    ctx.save();
    if (shake > 0) ctx.translate((Math.random() - 0.5) * shake * 0.5, (Math.random() - 0.5) * shake * 0.5);
    if (screenDistort > 0) ctx.translate((Math.random() - 0.5) * 3, 0);

    if (state === "title") drawTitle();
    else if (state === "intro") drawIntro();
    else if (state === "ending") drawEnding();
    else {
      drawRoom();
      if (ghostAlpha > 0) drawGhost(ghostX, ghostY, ghostAlpha);
      if (currentGhost) drawGhost(currentGhost.x, currentGhost.y, 0.65);
      drawPlayer(player.x, player.y, player.dir, player.frame);
      if (room === "basement") {
        ctx.fillStyle = "rgba(0,0,0,0.4)";
        ctx.fillRect(0, 0, W, H);
        if (player.flashlight && !flags.flashlightFail) {
          const grd = ctx.createRadialGradient(player.x, player.y, 10, player.x, player.y, 70);
          grd.addColorStop(0, "rgba(0,0,0,0)");
          grd.addColorStop(1, "rgba(0,0,0,0.7)");
          ctx.fillStyle = grd;
          ctx.fillRect(0, 0, W, H);
        } else if (flags.flashlightFail) {
          ctx.fillStyle = "rgba(0,0,0,0.75)";
          ctx.fillRect(0, 0, W, H);
        }
      } else {
        const grd = ctx.createRadialGradient(W / 2, H / 2, 60, W / 2, H / 2, 180);
        grd.addColorStop(0, "rgba(0,0,0,0)");
        grd.addColorStop(1, "rgba(0,0,0,0.55)");
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, W, H);
      }
      if (flicker > 0 && flicker % 3 < 2) {
        ctx.fillStyle = "rgba(0,0,0,0.4)";
        ctx.fillRect(0, 0, W, H);
      }
      drawHUD();
      if (dialogue) drawDialogue();
      if (message && messageTimer > 0) {
        rect(40, 30, W - 80, 20, "rgba(0,0,0,0.8)");
        centerText(message, 44, C.paper, 8);
      }
    }
    ctx.restore();
  }

  function drawTitle() {
    rect(0, 0, W, H, C.black);
    rect(60, 100, 200, 80, C.wall);
    rect(80, 70, 40, 40, C.wall);
    rect(160, 60, 50, 50, C.wall);
    rect(100, 140, 30, 40, C.black);
    rect(90, 110, 16, 16, "#0a1520");
    rect(180, 110, 16, 16, "#0a1520");
    centerText("FROM GHOST", 50, C.white, 16);
    centerText("PART ONE", 70, C.paper, 10);
    centerText("Press ENTER to begin", 200, C.gray, 8);
    if (Math.floor(time / 30) % 2 === 0) drawGhost(260, 160, 0.25);
  }

  function drawIntro() {
    rect(0, 0, W, H, C.black);
    const lines = [
      "You found an old photograph\nin your grandmother's attic.",
      "It showed a mansion\nyou had never seen before.",
      "Yet something about it\nfelt familiar.",
      "The address led you here.\nThe door was unlocked.",
      "You stepped inside."
    ];
    if (introStep < lines.length) {
      const parts = lines[introStep].split("\n");
      for (let i = 0; i < parts.length; i++) centerText(parts[i], 100 + i * 14, C.paper, 9);
    }
    centerText("[SPACE]", H - 20, C.gray, 7);
  }

  function drawEnding() {
    rect(0, 0, W, H, C.black);
    centerText("TO BE CONTINUED", 90, C.white, 14);
    centerText("FROM GHOST — PART ONE", 120, C.paper, 10);
    centerText("COMPLETE", 140, C.gray, 9);
    centerText("The protagonist remains inside.", 170, C.dust, 7);
    centerText("PRESS ENTER TO RETURN TO TITLE", 210, C.gray, 7);
  }

  function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
  }

  function init() {
    canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    canvas.style.width = (W * SCALE) + "px";
    canvas.style.height = (H * SCALE) + "px";
    document.body.appendChild(canvas);
    ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    initRooms();
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    canvas.addEventListener("click", function () {
      if (state === "title") { state = "intro"; introStep = 0; initAudio(); }
      else if (state === "intro") {
        introStep++;
        if (introStep > 4) {
          state = "play"; flags.doorLocked = true;
          startDialogue(["The heavy door swings shut behind you.", "A lock clicks.", "You are alone."]);
        }
      } else if (state === "dialogue") advanceDialogue();
      else if (state === "ending") resetGame();
      else if (state === "play") tryInteract();
    });
    loop();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();