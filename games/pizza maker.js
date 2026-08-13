// =====================================================
// PIZZA MAKER — for sprig.hackclub.com 
// Pick your ingredients, bake the pizza, and have it
// judged by a picky customer who compares it to what
// they actually ordered!
//
// Controls:
//  W / S = move the cursor in menus
//  J     = confirm / select / take pizza out / retry
//  K     = confirm toppings and bake / new order
//  I     = go back one step (in the ingredient menus)
// =====================================================

// ---------- SPRITES ----------
const pizzaRaw = "r";
const pizzaGood = "g";
const pizzaBurnt = "x";
const faceHappy = "h";
const faceSad = "z";
const bg = "b";

setLegend(
  [pizzaRaw, bitmap`
................
....111111......
..11111111111...
.1111111111111..
.1122222222211..
111222222222111.
111222222222111.
111222222222111.
111222222222111.
111222222222111.
111222222222111.
.1122222222211..
.1111111111111..
..11111111111...
....111111......
................`],

  [pizzaGood, bitmap`
................
....111111......
..11111111111...
.1111111111111..
.1133333333311..
111333333333111.
111333433433111.
111333333333111.
111334333343111.
111343343334111.
111333333333111.
.1133333333311..
.1111111111111..
..11111111111...
....111111......
................`],

  [pizzaBurnt, bitmap`
................
....000000......
..00000000000...
.0000000000000..
.0000000000000..
000000000000000.
000000000000000.
000000000000000.
000000000000000.
000000000000000.
000000000000000.
.0000000000000..
.0000000000000..
..00000000000...
....000000......
................`],

  [faceHappy, bitmap`
................
....111111......
..11111111111...
.1111111111111..
.1133333333311..
111333333333111.
111331333313111.
111333333333111.
111333333333111.
111333333333111.
111331111113111.
.1133333333311..
.1111111111111..
..11111111111...
....111111......
................`],

  [faceSad, bitmap`
................
....000000......
..00000000000...
.0000000000000..
.0066666666600..
000666666666000.
000660666606000.
000666666666000.
000666666666000.
000666666666000.
000660000006000.
.0066666666600..
.0000000000000..
..00000000000...
....000000......
................`],

  [bg, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666`]
);

setBackground(bg);

const emptyMap = map`
..........
..........
..........
..........
..........
..........
..........
..........`;
setMap(emptyMap);

// ---------- FIXED SPRITE POSITIONS ----------
// Using fixed tile positions (instead of remembered references)
// makes cleanup 100% reliable: we can always clearTile() a spot
// no matter what happened before.
const PIZZA_X = 6;
const PIZZA_Y = 3;
const FACE_X = 8;
const FACE_Y = 5;

// ---------- RECIPE DATA ----------
const CRUSTS = ["Thin", "Deep dish", "Stuffed"];
const SAUCES = ["Tomato", "BBQ", "White", "None"];
const CHEESES = ["Mozzarella", "Extra", "Vegan", "None"];
const TOPPINGS = ["Pepperoni", "Mushrooms", "Olives", "Pineapple", "Onion", "Bacon"];

const PERFECT_MIN = 4; // below this = raw
const BURNT_AT = 12; // at or above this = burnt
const MAX_TOPPINGS = 4;

// ---------- GAME STATE ----------
let state = "TITLE"; // TITLE, ORDER, CRUST, SAUCE, CHEESE, TOPPINGS, BAKE, RESULT
let cursor = 0;
let sel = { crust: 0, sauce: 0, cheese: 0, toppings: [] };
let order = null;
let bakeTicks = 0;
let baking = false;
let lastScore = 0;

// ---------- UTILITY ----------
function randInt(n) {
  return Math.floor(Math.random() * n);
}

function randomOrder() {
  const nTop = 1 + randInt(3); // 1-3 toppings requested

  // build an array of indices 0..TOPPINGS.length-1
  const indices = new Array(TOPPINGS.length);
  for (let i = 0; i < TOPPINGS.length; i++) {
    indices[i] = i;
  }

  // shuffle with Fisher-Yates (no spread/iterators)
  for (let i = indices.length - 1; i > 0; i--) {
    const j = randInt(i + 1);
    const tmp = indices[i];
    indices[i] = indices[j];
    indices[j] = tmp;
  }

  const chosenToppings = new Array(nTop);
  for (let i = 0; i < nTop; i++) {
    chosenToppings[i] = indices[i];
  }

  return {
    crust: randInt(CRUSTS.length),
    sauce: randInt(SAUCES.length),
    cheese: randInt(CHEESES.length),
    toppings: chosenToppings
  };
}

function doneCategory(t) {
  if (t < PERFECT_MIN) return "raw";
  if (t < BURNT_AT) return "perfect";
  return "burnt";
}

function feedbackText(s) {
  if (s >= 90) return "5 stars! Top chef!";
  if (s >= 70) return "Really good!";
  if (s >= 50) return "Not bad.";
  return "The judge frowns...";
}

// ---------- SPRITE HELPERS ----------
function showPizza(type) {
  clearTile(PIZZA_X, PIZZA_Y);
  addSprite(PIZZA_X, PIZZA_Y, type);
}

function hidePizza() {
  clearTile(PIZZA_X, PIZZA_Y);
}

function showFace(type) {
  clearTile(FACE_X, FACE_Y);
  addSprite(FACE_X, FACE_Y, type);
}

function hideFace() {
  clearTile(FACE_X, FACE_Y);
}

function currentListLength() {
  if (state === "CRUST") return CRUSTS.length;
  if (state === "SAUCE") return SAUCES.length;
  if (state === "CHEESE") return CHEESES.length;
  if (state === "TOPPINGS") return TOPPINGS.length;
  return 1;
}

// ---------- GAME LOGIC ----------
function startRound() {
  order = randomOrder();
  sel = { crust: 0, sauce: 0, cheese: 0, toppings: [] };
  bakeTicks = 0;
  cursor = 0;
  hidePizza();
  hideFace();
  state = "ORDER";
  render();
}

function startBaking() {
  showPizza(pizzaRaw);
  bakeTicks = 0;
  baking = true;
  state = "BAKE";
  render();
  tickBake();
}

function tickBake() {
  if (!baking) return;
  setTimeout(() => {
    if (!baking) return;
    bakeTicks++;
    if (bakeTicks >= BURNT_AT) {
      showPizza(pizzaBurnt);
      baking = false;
      finishBaking();
      return;
    } else if (bakeTicks >= PERFECT_MIN) {
      showPizza(pizzaGood);
    }
    render();
    tickBake();
  }, 400);
}

function pullOut() {
  if (state !== "BAKE") return;
  baking = false;
  finishBaking();
}

function finishBaking() {
  computeScore();
  state = "RESULT";
  render();
}

function computeScore() {
  let score = 0;
  if (sel.crust === order.crust) score += 20;
  if (sel.sauce === order.sauce) score += 20;
  if (sel.cheese === order.cheese) score += 20;

  let topScore = 0;
  order.toppings.forEach((i) => {
    if (sel.toppings.includes(i)) topScore += 10;
  });
  const extra = sel.toppings.filter((i) => !order.toppings.includes(i)).length;
  topScore -= extra * 5;
  if (topScore < 0) topScore = 0;
  score += Math.min(30, topScore);

  const cat = doneCategory(bakeTicks);
  if (cat === "perfect") score += 10;
  else score -= 10;

  score = Math.max(0, Math.min(100, score));
  lastScore = score;

  showFace(score >= 60 ? faceHappy : faceSad);
}

// ---------- RENDER ----------
function render() {
  clearText();

  if (state === "TITLE") {
    addText("PIZZA MAKER", { x: 1, y: 1, color: color`3` });
    addText("Press J", { x: 3, y: 5, color: color`0` });
    addText("to start", { x: 3, y: 6, color: color`0` });
    return;
  }

  if (state === "ORDER") {
    addText("Customer order:", { x: 0, y: 0, color: color`0` });
    addText("Base: " + CRUSTS[order.crust], { x: 0, y: 2 });
    addText("Sauce: " + SAUCES[order.sauce], { x: 0, y: 3 });
    addText("Cheese: " + CHEESES[order.cheese], { x: 0, y: 4 });
    addText("Toppings:", { x: 0, y: 5 });
    addText(order.toppings.map((i) => TOPPINGS[i]).join(","), { x: 0, y: 6 });
    addText("J to start", { x: 0, y: 9, color: color`3` });
    return;
  }

  if (state === "CRUST" || state === "SAUCE" || state === "CHEESE") {
    const list = state === "CRUST" ? CRUSTS : state === "SAUCE" ? SAUCES : CHEESES;
    const title = state === "CRUST" ? "Choose the base" : state === "SAUCE" ? "Choose the sauce" : "Choose the cheese";
    addText(title, { x: 0, y: 0, color: color`0` });
    list.forEach((item, i) => {
      const prefix = i === cursor ? "> " : "  ";
      addText(prefix + item, { x: 0, y: 2 + i });
    });
    addText("W/S move J choose", { x: 0, y: 12, color: color`3` });
    addText("I back", { x: 0, y: 13, color: color`3` });
    return;
  }

  if (state === "TOPPINGS") {
    addText("Choose toppings", { x: 0, y: 0, color: color`0` });
    TOPPINGS.forEach((item, i) => {
      const marker = sel.toppings.includes(i) ? "(X) " : "( ) ";
      const prefix = i === cursor ? "> " : "  ";
      addText(prefix + marker + item, { x: 0, y: 2 + i });
    });
    addText("J add/remove", { x: 0, y: 9, color: color`3` });
    addText("K to bake", { x: 0, y: 10, color: color`3` });
    return;
  }

  if (state === "BAKE") {
    addText("Bake the pizza!", { x: 0, y: 0, color: color`0` });
    addText("J to take out", { x: 0, y: 2 });
    const barMax = 14;
    const bar = "#".repeat(Math.min(bakeTicks, barMax)) + "-".repeat(Math.max(0, barMax - bakeTicks));
    addText(bar, { x: 0, y: 4, color: color`1` });
    addText("Status: " + doneCategory(bakeTicks), { x: 0, y: 6 });
    return;
  }

  if (state === "RESULT") {
    addText("Judgment:", { x: 0, y: 0, color: color`0` });
    addText("Score: " + lastScore + "/100", { x: 0, y: 2 });
    addText(feedbackText(lastScore), { x: 0, y: 4 });
    addText("J: same recipe", { x: 0, y: 9, color: color`3` });
    addText("K: new order", { x: 0, y: 10, color: color`3` });
    return;
  }
}

// ---------- INPUT ----------
onInput("j", () => {
  if (state === "TITLE") { startRound(); return; }
  if (state === "ORDER") { state = "CRUST";
    cursor = sel.crust;
    render(); return; }
  if (state === "CRUST") { sel.crust = cursor;
    state = "SAUCE";
    cursor = sel.sauce;
    render(); return; }
  if (state === "SAUCE") { sel.sauce = cursor;
    state = "CHEESE";
    cursor = sel.cheese;
    render(); return; }
  if (state === "CHEESE") { sel.cheese = cursor;
    state = "TOPPINGS";
    cursor = 0;
    render(); return; }
  if (state === "TOPPINGS") {
    const idx = sel.toppings.indexOf(cursor);
    if (idx >= 0) {
      sel.toppings.splice(idx, 1);
    } else if (sel.toppings.length < MAX_TOPPINGS) {
      sel.toppings.push(cursor);
    }
    render();
    return;
  }
  if (state === "BAKE") { pullOut(); return; }
  if (state === "RESULT") {
    // retry with the same order
    sel = { crust: 0, sauce: 0, cheese: 0, toppings: [] };
    bakeTicks = 0;
    hidePizza();
    hideFace();
    state = "CRUST";
    cursor = 0;
    render();
    return;
  }
});

onInput("k", () => {
  if (state === "TOPPINGS") { startBaking(); return; }
  if (state === "RESULT") { startRound(); return; }
});

onInput("w", () => {
  if (state === "CRUST" || state === "SAUCE" || state === "CHEESE" || state === "TOPPINGS") {
    const len = currentListLength();
    cursor = (cursor - 1 + len) % len;
    render();
  }
});

onInput("s", () => {
  if (state === "CRUST" || state === "SAUCE" || state === "CHEESE" || state === "TOPPINGS") {
    const len = currentListLength();
    cursor = (cursor + 1) % len;
    render();
  }
});

onInput("i", () => {
  if (state === "CRUST") { state = "ORDER";
    render(); } else if (state === "SAUCE") { state = "CRUST";
    cursor = sel.crust;
    render(); } else if (state === "CHEESE") { state = "SAUCE";
    cursor = sel.sauce;
    render(); } else if (state === "TOPPINGS") { state = "CHEESE";
    cursor = sel.cheese;
    render(); }
});

// ---------- START ----------
render();