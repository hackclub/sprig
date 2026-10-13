/*
@title: Sprig Space Program
@author: Ethan
@description: Like KSP but for the Sprig
@tags: ['space', 'rocket', 'simulation']
@addedOn: 2026-10-12
*/

// ================================================================
//  SPRIG SPACE PROGRAM
//  Goals:  SPACE  ->  ORBIT  ->  HOME
//
//  W = engine on     S = engine off     A / D = tilt
//  I = launch (and later: go home)
//
//  Tip: fly up, then slowly tilt right and fill the ORBIT bar.
// ================================================================

// ---------- TUNING ----------
const TICK_MS = 100;
const DT = 0.1;              // seconds of game time per physics step
const SUBSTEPS = 4;          // normal speed (4x real time)
const FAST_SUBSTEPS = 32;    // automatic fast-forward while coasting
const R = 600000;            // planet radius (m)
const G0 = 9.81;
const MU = G0 * R * R;
const ATMO = 70000;          // edge of space (m)
const SCALE_H = 5600;
const RHO0 = 1.2;
const CAPSULE_MASS = 1000;
const TANK_FUEL = 2600;
const TANK_DRY = 325;
const BOOSTER = { mass: 1500, thrust: 260000, isp: 280 };
const UPPER = { mass: 500, thrust: 120000, isp: 345 };
const ROCKET_CDA = 1.2;
const CAPSULE_CDA = 0.8;
const CHUTE_CDA = 400;
const CHUTE_ALT = 3000;      // parachute opens below this height
const SAFE_LANDING = 12;     // m/s
const MAX_AP = 1000000;      // engine cuts out past this, so you can't get lost in space

const ROCKETS = [
  { name: "SMALL", booster: 3, upper: 0, info: "reaches space" },
  { name: "MEDIUM", booster: 1, upper: 1, info: "can orbit" },
  { name: "BIG", booster: 2, upper: 1, info: "orbits easier" }
];

// ---------- SPRITES ----------
// Keys are handed out from this pool as sprites are generated.
const KEY_POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
let keyIndex = 0;
function nextKey() {
  return KEY_POOL[keyIndex++];
}

// Draw a 16x16 bitmap from a shape function. (u, w) are coordinates in the
// sprite's own frame: w points "forward" (nose), u points sideways.
function raster(angleDeg, shape) {
  const t = angleDeg * Math.PI / 180;
  const s = Math.sin(t), c = Math.cos(t);
  const rows = [];
  for (let py = 0; py < 16; py++) {
    let line = "";
    for (let px = 0; px < 16; px++) {
      const dx = px - 7.5, dy = 7.5 - py;
      const w = dx * s + dy * c;
      const u = dx * c - dy * s;
      line += shape(u, w);
    }
    rows.push(line);
  }
  return "\n" + rows.join("\n") + "\n";
}

function rocketShape(flame) {
  return (u, w) => {
    const au = Math.abs(u);
    if (w > 3.5 && w <= 7.5 && au <= (7.5 - w) * 0.55 + 0.3) return "3";           // nose cone
    if (w > 1.5 && w <= 3.5 && au <= 1.9) return (w > 2 && w < 3.3 && au < 1) ? "7" : "2"; // window
    if (w > -3.5 && w <= 1.5 && au <= 1.9) return (w > -1 && w <= 0) ? "1" : "2";  // body
    if (w > -4.5 && w <= -1.5 && au > 1.9 && au <= 1.9 + (-1.5 - w) * 0.9) return "3"; // fins
    if (w > -4.5 && w <= -3.5 && au <= 1.3) return "L";                             // nozzle
    if (flame && w <= -4.5 && w > -8 && au <= 1.4 - (-4.5 - w) * 0.3) return w > -6.2 ? "6" : "9";
    return ".";
  };
}

function capsuleShape(u, w) {
  const au = Math.abs(u);
  if (w > -4 && w <= -3 && au <= 4.5) return "C";                       // heat shield
  if (w > -3 && w <= 2.5 && au <= 4.5 - (w + 3) * 0.6) {
    if (w > -1.5 && w < 0.5 && au < 1.2) return "7";                    // window
    return "2";
  }
  if (w > 2.5 && w <= 3.5 && au <= 1) return "L";
  return ".";
}

function chuteShape(u, w) {
  const au = Math.abs(u);
  // canopy
  const cy = 4.5;
  if (w >= 3.5 && (au / 7.5) * (au / 7.5) + ((w - cy) / 3.5) * ((w - cy) / 3.5) <= 1) {
    return (Math.floor((u + 8) / 2.5) % 2) ? "3" : "2";
  }
  // lines
  if (w > -2.5 && w < 3.5) {
    const k = (w + 2.5) / 6; // 0 at capsule, 1 at canopy
    if (Math.abs(au - (1 + k * 6)) < 0.5) return "L";
  }
  // small capsule
  const cw = w + 5.5;
  if (cw > -2.5 && cw <= -1.8 && au <= 3) return "C";
  if (cw > -1.8 && cw <= 2.5 && au <= 3 - (cw + 1.8) * 0.55) return (au < 0.8 && cw > -0.8 && cw < 0.6) ? "7" : "2";
  return ".";
}

function boomShape(u, w) {
  const d = Math.sqrt(u * u + w * w);
  const a = Math.atan2(u, w);
  const spike = 5.5 + 2 * Math.cos(a * 7);
  if (d < 2.5) return "2";
  if (d < 4) return "6";
  if (d < spike) return d < spike - 1.5 ? "9" : "3";
  return ".";
}

function tankShape(u, w) {
  const au = Math.abs(u);
  if (au > 4.5) return ".";
  if (Math.abs(w - 5) < 0.6 || Math.abs(w + 5) < 0.6) return "9";
  if (u < -3.5) return "1";
  return "2";
}

function boosterEngineShape(u, w) {
  const au = Math.abs(u);
  if (w > 3 && au <= 4.5) return "L";
  if (w <= 3 && w > -7.5 && au <= 2 + (3 - w) * 0.25) return w > 1.5 ? "0" : "1";
  if (w <= 3 && w > -4 && au > 4.5 && au <= 6) return "3"; // fins
  return ".";
}

function upperEngineShape(u, w) {
  const au = Math.abs(u);
  if (w <= -6 && au <= 4.5) return (Math.floor((u + 8) / 2) % 2) ? "6" : "0"; // decoupler
  if (w > 3 && au <= 4.5) return "L";
  if (w <= 3 && w > -6 && au <= 1 + (3 - w) * 0.3) return "1";
  return ".";
}

function solid(ch) {
  return () => ch;
}

function grassShape(u, w) {
  if (w > 5.5) return "4";
  if (w > 3.5) return (Math.abs(u * 3.7 + w * 1.3) % 3 < 1.2) ? "D" : "4";
  return (Math.abs(u * 2.3 - w * 3.1) % 5 < 0.8) ? "L" : "C";
}

function dirtShape(u, w) {
  return (Math.abs(u * 2.3 - w * 3.1) % 5 < 0.8) ? "L" : "C";
}

function padShape(u, w) {
  if (w > 5.5) return "1";
  if (w > 4.5) return "L";
  if (Math.abs(u) > 5 && w > -8) return "L";
  return (Math.abs(u * 2.3 - w * 3.1) % 5 < 0.8) ? "L" : "C";
}

function cloudShape(u, w) {
  const b1 = (u + 2) * (u + 2) / 20 + w * w / 6;
  const b2 = (u - 3) * (u - 3) / 12 + (w - 1.5) * (w - 1.5) / 6;
  if (b1 <= 1 || b2 <= 1) return (w < -1) ? "1" : "2";
  return ".";
}

function starShape(u, w) {
  const pts = [[-5, 4], [4, 6], [2, -3], [-3, -6], [6, -1]];
  for (let i = 0; i < pts.length; i++) {
    if (Math.abs(u - pts[i][0]) < 0.6 && Math.abs(w - pts[i][1]) < 0.6) return i === 1 ? "6" : "2";
  }
  return ".";
}

// Build the legend. Order = drawing order (earlier is drawn on top).
const legend = [];
function add(shape, angle) {
  const k = nextKey();
  legend.push([k, raster(angle || 0, shape)]);
  return k;
}
const BOOM = add(boomShape);
const CHUTE = add(chuteShape);
const CAPSULE = add(capsuleShape);
const ROCKET_FLAME = [];
const ROCKET = [];
for (let i = 0; i < 16; i++) ROCKET_FLAME.push(add(rocketShape(true), i * 22.5));
for (let i = 0; i < 16; i++) ROCKET.push(add(rocketShape(false), i * 22.5));
const TANK = add(tankShape);
const BOOSTER_ENGINE = add(boosterEngineShape);
const UPPER_ENGINE = add(upperEngineShape);
const CLOUD = add(cloudShape);
const STAR = add(starShape);
const PAD = add(padShape);
const GRASS = add(grassShape);
const DIRT = add(dirtShape);
const SKY_LOW = add(solid("7"));
const SKY_HIGH = add(solid("5"));
const SPACE = add(solid("0"));
const VAB_WALL = add((u, w) => (Math.abs(u) > 7 || Math.abs(w) > 7) ? "0" : "L");
setLegend(...legend);

const EMPTY_MAP = [
  "..........",
  "..........",
  "..........",
  "..........",
  "..........",
  "..........",
  "..........",
  ".........."
].join("\n");

// ---------- SOUNDS ----------
const sfxLiftoff = tune`
120: c3-120 + g2-120,
120: d3-120 + a2-120,
120: e3-120 + b2-120,
240: g3-240 + d3-240`;
const sfxStage = tune`
60: c5^60,
60: c4^60`;
const sfxGoal = tune`
100: c5~100,
100: e5~100,
100: g5~100,
300: c6~300`;
const sfxCrash = tune`
80: c3/80 + g2/80,
80: a2/80 + e2/80,
80: f2/80 + c2/80,
300: c2/300`;
const sfxChute = tune`
60: g4~60,
60: c5~60`;
const sfxClick = tune`
40: c6^40`;
const sfxLanded = tune`
150: c5~150,
150: e5~150,
150: g5~150,
150: e5~150,
450: c6~450`;

// ---------- STATE ----------
let mode = "title"; // title | build | flight | result
let pick = 1;
let best = { space: false, orbit: false, home: false };
let f = null;
let resultTicks = 0;
let resultLines = [];
let specks = [];

function buildStages(r) {
  const stages = [{
    thrust: BOOSTER.thrust, isp: BOOSTER.isp,
    dry: BOOSTER.mass + r.booster * TANK_DRY,
    fuel: r.booster * TANK_FUEL
  }];
  if (r.upper > 0) {
    stages.push({
      thrust: UPPER.thrust, isp: UPPER.isp,
      dry: UPPER.mass + r.upper * TANK_DRY,
      fuel: r.upper * TANK_FUEL
    });
  }
  return stages;
}

function newFlight() {
  const stages = buildStages(ROCKETS[pick]);
  let fuelMax = 0;
  stages.forEach(s => fuelMax += s.fuel);
  return {
    alt: 0, vr: 0, vt: 0, down: 0,
    head: 0,             // 0..15 in 22.5 degree steps; 0 = up, 4 = right
    engine: false,
    stages: stages, stageIdx: 0, fuelMax: fuelMax,
    capsuleOnly: false,
    chute: "none",       // none | armed | open
    launched: false, fast: false,
    maxAlt: 0,
    msg: "", msgTicks: 0,
    goals: { space: false, orbit: false, home: false },
    crashed: false
  };
}

function activeStage() {
  if (f.capsuleOnly) return null;
  return f.stages[f.stageIdx];
}

function fuelLeft() {
  if (f.capsuleOnly) return 0;
  let n = 0;
  for (let i = f.stageIdx; i < f.stages.length; i++) n += f.stages[i].fuel;
  return n;
}

function rocketMass() {
  let m = CAPSULE_MASS;
  if (!f.capsuleOnly) {
    for (let i = f.stageIdx; i < f.stages.length; i++) m += f.stages[i].dry + f.stages[i].fuel;
  }
  return m;
}

function speed() {
  return Math.sqrt(f.vr * f.vr + f.vt * f.vt);
}

// Highest and lowest points of the path you're on (above the ground).
function orbit() {
  const r = R + f.alt;
  const energy = (f.vr * f.vr + f.vt * f.vt) / 2 - MU / r;
  const h = r * f.vt;
  if (energy >= 0) return { ap: Infinity, pe: Infinity };
  const a = -MU / (2 * energy);
  const e = Math.sqrt(Math.max(0, 1 + 2 * energy * h * h / (MU * MU)));
  return { ap: a * (1 + e) - R, pe: a * (1 - e) - R };
}

// 0 = going straight up, 1 = in orbit
function orbitProgress() {
  const pe = orbit().pe;
  return Math.max(0, Math.min(1, (pe + R) / (R + ATMO)));
}

function say(text, ticks) {
  f.msg = text;
  f.msgTicks = ticks || 20;
}

function burning() {
  const st = activeStage();
  return f.engine && st && st.fuel > 0;
}

// ---------- PHYSICS ----------
function physicsStep() {
  const r = R + f.alt;
  let ar = -MU / (r * r) + f.vt * f.vt / r;
  let at = -f.vr * f.vt / r;

  if (burning()) {
    const st = activeStage();
    let thrust = st.thrust;
    let burn = thrust / (st.isp * G0) * DT;
    if (burn > st.fuel) {
      thrust *= st.fuel / burn;
      burn = st.fuel;
    }
    const a = thrust / rocketMass();
    st.fuel -= burn;
    const t = f.head * 22.5 * Math.PI / 180;
    ar += a * Math.cos(t);
    at += a * Math.sin(t);
  }

  f.vr += ar * DT;
  f.vt += at * DT;

  if (f.alt < ATMO) {
    const rho = RHO0 * Math.exp(-f.alt / SCALE_H);
    const cda = f.chute === "open" ? CHUTE_CDA : (f.capsuleOnly ? CAPSULE_CDA : ROCKET_CDA);
    const k = 0.5 * rho * cda / rocketMass();
    const scale = 1 / (1 + k * speed() * DT);
    f.vr *= scale;
    f.vt *= scale;
  }

  f.alt += f.vr * DT;
  f.down += f.vt * DT;

  if (!f.launched) {
    if (f.alt <= 0) {
      f.alt = 0;
      f.vr = 0;
      f.vt = 0;
    } else if (f.alt > 2) {
      f.launched = true;
    }
  }
}

function checkEvents() {
  if (f.alt > f.maxAlt) f.maxAlt = f.alt;

  // Automatic staging: when a stage runs dry, drop it and light the next one.
  const st = activeStage();
  if (st && st.fuel <= 0) {
    if (f.stageIdx < f.stages.length - 1) {
      f.stageIdx++;
      say("STAGE 2!", 15);
      playTune(sfxStage);
    } else if (f.engine) {
      f.engine = false;
      say("OUT OF FUEL", 20);
    }
  }

  // Don't let anyone fly off forever.
  if (f.engine && orbit().ap > MAX_AP) {
    f.engine = false;
    say("TOO FAST! ENGINE OFF", 25);
  }

  if (!f.goals.space && f.alt >= ATMO) {
    f.goals.space = true;
    say("SPACE!", 25);
    playTune(sfxGoal);
  }
  if (!f.goals.orbit && f.alt >= ATMO && orbit().pe >= ATMO) {
    f.goals.orbit = true;
    say("ORBIT!! I = GO HOME", 40);
    playTune(sfxGoal);
  }

  // Falling back down with the engine off? Head home automatically.
  if (f.launched && f.vr < 0 && f.alt < 10000 && !f.capsuleOnly && !burning()) {
    goHome();
  }

  if (f.chute === "armed" && f.alt < CHUTE_ALT) {
    f.chute = "open";
    say("PARACHUTE!", 20);
    playTune(sfxChute);
  }

  // Fast-forward while coasting, but slow down for the landing.
  const nearGround = f.vr < 0 && (f.chute === "open" ? f.alt < 150 : f.alt < 3000);
  f.fast = f.launched && !burning() && !nearGround;

  if (f.launched && f.alt <= 0) {
    const v = speed();
    f.alt = 0;
    if (v <= SAFE_LANDING) {
      if (f.goals.space) f.goals.home = true;
      playTune(sfxLanded);
      endFlight("LANDED SAFE!", f.goals.space ? "Welcome home!" : "Now try for space");
    } else {
      f.crashed = true;
      playTune(sfxCrash);
      endFlight("CRASHED!", "Too fast!");
    }
  }
}

function goHome() {
  if (!f.launched || f.capsuleOnly) return;
  f.capsuleOnly = true;
  f.engine = false;
  f.chute = "armed";
  // If we're in orbit, slow down just enough to fall back in.
  let n = 0;
  while (orbit().pe > 30000 && n < 200) {
    f.vt *= 0.98;
    n++;
  }
  say("GOING HOME", 20);
  playTune(sfxStage);
}

function endFlight(title, sub) {
  if (f.goals.space) best.space = true;
  if (f.goals.orbit) best.orbit = true;
  if (f.goals.home) best.home = true;
  resultLines = [title, sub];
  resultTicks = 0;
  mode = "result";
  render();
}

// ---------- GAME LOOP ----------
setInterval(() => {
  if (mode === "flight") {
    const steps = f.fast ? FAST_SUBSTEPS : SUBSTEPS;
    for (let i = 0; i < steps && mode === "flight"; i++) {
      physicsStep();
      checkEvents();
    }
    if (mode !== "flight") return;
    if (f.msgTicks > 0) f.msgTicks--;
    moveSpecks(steps);
    render();
  } else if (mode === "result") {
    resultTicks++;
  }
}, TICK_MS);

// ---------- INPUT ----------
function handleKey(key) {
  if (mode === "title") {
    mode = "build";
    render();
    return;
  }
  if (mode === "build") {
    if (key === "a") pick = Math.max(0, pick - 1);
    else if (key === "d") pick = Math.min(ROCKETS.length - 1, pick + 1);
    else if (key === "i") {
      startFlight();
      return;
    }
    playTune(sfxClick);
    render();
    return;
  }
  if (mode === "result") {
    if (resultTicks >= 10 && key === "i") {
      mode = "build";
      render();
    }
    return;
  }
  if (mode !== "flight") return;

  if (!f.launched) {
    if (key === "i" || key === "w") {
      f.engine = true;
      say("LIFTOFF!", 20);
      playTune(sfxLiftoff);
    }
  } else if (key === "w") {
    if (f.capsuleOnly) say("NO ENGINE", 12);
    else if (fuelLeft() <= 0) say("OUT OF FUEL", 12);
    else f.engine = true;
  } else if (key === "s") {
    f.engine = false;
  } else if (key === "a" && f.chute !== "open") {
    f.head = (f.head + 15) % 16;
  } else if (key === "d" && f.chute !== "open") {
    f.head = (f.head + 1) % 16;
  } else if (key === "i") {
    goHome();
  }
  render();
}

["w", "a", "s", "d", "i", "j", "k", "l"].forEach(k => onInput(k, () => handleKey(k)));

function startFlight() {
  f = newFlight();
  mode = "flight";
  specks = [];
  for (let i = 0; i < 7; i++) specks.push({ x: Math.random() * 10, y: Math.random() * 8, kind: null });
  render();
}

// ---------- SCENERY ----------
function speckKind() {
  if (f.alt > 300 && f.alt < 14000 && Math.random() < 0.6) return CLOUD;
  if (f.alt > 30000) return STAR;
  return null;
}

function moveSpecks(steps) {
  const sim = steps * DT;
  const metersPerTile = Math.max(60, speed() * sim / 0.6);
  const dx = -f.vt * sim / metersPerTile;
  const dy = f.vr * sim / metersPerTile;
  for (let i = 0; i < specks.length; i++) {
    const s = specks[i];
    s.x += dx;
    s.y += dy;
    let wrapped = false;
    if (s.x < 0) { s.x += 10; wrapped = true; }
    if (s.x >= 10) { s.x -= 10; wrapped = true; }
    if (s.y < 0) { s.y += 8; wrapped = true; }
    if (s.y >= 8) { s.y -= 8; wrapped = true; }
    if (wrapped || (s.kind === null && Math.random() < 0.05)) s.kind = speckKind();
    if (s.kind === CLOUD && (f.alt >= 14000 || f.alt <= 300)) s.kind = speckKind();
    if (s.kind === STAR && f.alt <= 30000) s.kind = speckKind();
  }
}

// ---------- DRAWING ----------
function fmtDist(m) {
  if (m < 1000) return Math.round(m) + "m";
  if (m < 100000) return (Math.round(m / 100) / 10) + "km";
  return Math.round(m / 1000) + "km";
}

function bar(frac, len) {
  let s = "";
  for (let i = 0; i < len; i++) s += (i < Math.round(frac * len)) ? "=" : "-";
  return s;
}

function render() {
  setMap(EMPTY_MAP); // clear and redraw everything
  clearText();
  if (mode === "title") renderTitle();
  else if (mode === "build") renderBuild();
  else renderFlight();
}

function renderTitle() {
  setBackground(SKY_LOW);
  for (let x = 0; x < 10; x++) addSprite(x, 7, x === 4 ? PAD : GRASS);
  addSprite(4, 6, ROCKET[0]);
  addSprite(0, 1, CLOUD);
  addSprite(9, 2, CLOUD);
  addText("SPRIG SPACE", { y: 1, color: color`2` });
  addText("PROGRAM", { y: 2, color: color`2` });
  addText("KSP,", { y: 5, color: color`0` });
  addText("but for SPRIG,", { y: 6, color: color`0` });
  addText("(basically KSP2)", { y: 7, color: color`0` });
  addText("press any key", { y: 9, color: color`6` });
}

function renderBuild() {
  setBackground(VAB_WALL);
  const r = ROCKETS[pick];
  let row = 7;
  addSprite(2, row--, BOOSTER_ENGINE);
  for (let i = 0; i < r.booster; i++) addSprite(2, row--, TANK);
  if (r.upper > 0) {
    addSprite(2, row--, UPPER_ENGINE);
    for (let i = 0; i < r.upper; i++) addSprite(2, row--, TANK);
  }
  addSprite(2, row, CAPSULE);

  addText("PICK A ROCKET", { x: 7, y: 1, color: color`6` });
  addText((pick > 0 ? "<" : " ") + " " + r.name + " " + (pick < ROCKETS.length - 1 ? ">" : " "), { x: 8, y: 4, color: color`2` });
  addText(r.info, { x: 7, y: 6, color: color`1` });
  addText("A/D change", { x: 8, y: 9, color: color`1` });
  addText("I = LAUNCH!", { x: 8, y: 11, color: color`6` });
  addText("BEST " + (best.space ? "*" : "-") + (best.orbit ? "*" : "-") + (best.home ? "*" : "-"), { x: 8, y: 14, color: color`6` });
}

function renderFlight() {
  if (f.alt < 12000) setBackground(SKY_LOW);
  else if (f.alt < 35000) setBackground(SKY_HIGH);
  else setBackground(SPACE);

  // Ground (1 tile = 40 m near the surface; the rocket stays at tile 4,4)
  const groundRow = 5 + Math.floor(f.alt / 40);
  if (groundRow <= 7) {
    const padX = 4 - Math.round(f.down / 40);
    for (let y = groundRow; y <= 7; y++) {
      for (let x = 0; x < 10; x++) {
        if (y === groundRow) addSprite(x, y, x === padX ? PAD : GRASS);
        else addSprite(x, y, DIRT);
      }
    }
  }

  for (let i = 0; i < specks.length; i++) {
    const s = specks[i];
    if (!s.kind) continue;
    const sx = Math.floor(s.x), sy = Math.floor(s.y);
    if ((sx === 4 && sy === 4) || sy >= groundRow) continue;
    addSprite(sx, sy, s.kind);
  }

  if (f.crashed) addSprite(4, 4, BOOM);
  else if (f.chute === "open") addSprite(4, 4, CHUTE);
  else if (f.capsuleOnly) addSprite(4, 4, CAPSULE);
  else addSprite(4, 4, (burning() ? ROCKET_FLAME : ROCKET)[f.head]);

  // HUD
  const label = f.alt >= 12000 ? color`2` : color`0`;
  addText("ALT " + fmtDist(f.alt), { x: 0, y: 0, color: label });
  addText("SPD " + Math.round(speed()), { x: 0, y: 1, color: label });
  if (!f.capsuleOnly) {
    addText("FUEL " + bar(fuelLeft() / f.fuelMax, 5), { x: 10, y: 0, color: fuelLeft() > 0 ? label : color`3` });
  }
  addText("ORBIT " + bar(orbitProgress(), 5), { x: 9, y: 1, color: f.goals.orbit ? color`4` : label });
  if (f.fast && mode === "flight") addText(">>", { x: 18, y: 3, color: color`6` });

  if (mode === "flight") {
    let hint = "";
    if (!f.launched && !f.engine) hint = "I = LAUNCH";
    else if (f.goals.space && !f.capsuleOnly) hint = "I = GO HOME";
    if (hint) addText(hint, { x: 0, y: 14, color: color`6` });
  }

  addText("SPACE", { x: 1, y: 15, color: f.goals.space ? color`4` : color`1` });
  addText("ORBIT", { x: 7, y: 15, color: f.goals.orbit ? color`4` : color`1` });
  addText("HOME", { x: 13, y: 15, color: f.goals.home ? color`4` : color`1` });

  if (mode === "result") {
    addText(resultLines[0], { y: 6, color: color`6` });
    addText(resultLines[1], { y: 7, color: f.alt >= 12000 ? color`2` : color`0` });
    addText("Max " + fmtDist(f.maxAlt), { y: 11, color: color`2` });
    addText("I = fly again", { y: 12, color: color`6` });
  } else if (f.msgTicks > 0) {
    addText(f.msg, { y: 6, color: color`6` });
  }
}

render();