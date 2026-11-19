/*
@title: Explore Chicago: The Deep Dish Mystery
@author: Chaitanya Kulkarni
@description: Find the stolen Famous Deep Dish Pizza Recipie
@tags: ['adventure', 'mystery', 'puzzle']
@addedOn: 2026-11-16
*/


// --- SPRITE LEGEND ---
const p = "p"; // Player (Alex)
const w = "w"; // Wall
const b = "b"; // Brick (Museum/Loop)
const t = "t"; // Tree
const r = "r"; // Water
const g = "g"; // Grass (Background)
const f = "f"; // Floor (Background)
const d = "d"; // Door / Area Exit
const n = "n"; // Maria (NPC)
const q = "q"; // Tony (NPC)
const v = "v"; // Vince (Suspect)
const u = "u"; // Curator (NPC)
const z = "z"; // Citizen (NPC)
const k = "k"; // Clue
const c = "c"; // Crate (Push block)
const s = "s"; // Sign
const m = "m"; // The Bean
const e = "e"; // Train
const l = "l"; // Lamp
const i = "i"; // Pizza
const o = "o"; // Pillar
const a = "a"; // Artifact
const y = "y"; // Fence
const h = "h"; // Goal (for crate)
const _ = "_"; // Blue Text Box Background

setLegend(
  [p, bitmap`
................
......0000......
.....099990.....
.....099990.....
.....0LLLL0.....
.....0L0L00.....
......0LL0......
....00111100....
...0111111110...
...0111111110...
....01111110....
.....000000.....
.....0550550....
.....0550550....
.....00..00.....
................`],
  [w, bitmap`
0000000000000000
0888888888888880
0855555555555580
0858888888888580
0858555555558580
0858588888858580
0858585555858580
0858585885858580
0858585885858580
0858585555858580
0858588888858580
0858555555558580
0858888888888580
0855555555555580
0888888888888880
0000000000000000`],
  [b, bitmap`
0000000000000000
0222222222222220
0200000200000020
0222222222222220
0002000000200000
0222222222222220
0200000200000020
0222222222222220
0002000000200000
0222222222222220
0200000200000020
0222222222222220
0002000000200000
0222222222222220
0222222222222220
0000000000000000`],
  [t, bitmap`
................
.......3........
......333.......
.....33333......
....3333333.....
.....33333......
....3333333.....
...333333333....
....3333333.....
...333333333....
..33333333333...
.......0........
.......0........
.......0........
......000.......
................`],
  [r, bitmap`
................
...111....111...
..11111..11111..
.11111111111111.
1111111111111111
.11111111111111.
..111111111111..
....11111111....
..111111111111..
.11111111111111.
1111111111111111
.11111111111111.
..111111111111..
...1111111111...
....11111111....
................`],
  [g, bitmap`
................
..33............
..33...33.......
.......33.......
............33..
...33.......33..
...33...........
.........33.....
.........33.....
................
.............33.
..33.........33.
..33............
.......33.......
.......33...33..
............33..`],
  [f, bitmap`
5555555555555555
5666666666666665
5655555555555565
5656666666666565
5656555555556565
5656566666656565
5656565555656565
5656565665656565
5656565665656565
5656565555656565
5656566666656565
5656555555556565
5656666666666565
5655555555555565
5666666666666665
5555555555555555`],
  [d, bitmap`
0000000000000000
0999999999999990
0900000000000090
0909999999999090
0909000000009090
0909099999909090
0909090000909090
0909090990909090
0909090990909090
0909090000909090
0909099999909090
0909000000009090
0909999999999090
0900000000000090
0999999999999990
0000000000000000`],
  [n, bitmap`
................
......0000......
.....022220.....
.....022220.....
.....0LLLL0.....
.....0L0L00.....
......0LL0......
....00222200....
...0222222220...
...0222222220...
....02222220....
.....000000.....
.....0550550....
.....0550550....
.....00..00.....
................`],
  [q, bitmap`
................
......0000......
.....077770.....
.....077770.....
.....0LLLL0.....
.....0L0L00.....
......0LL0......
....00777700....
...0777777770...
...0777777770...
....07777770....
.....000000.....
.....0550550....
.....0550550....
.....00..00.....
................`],
  [v, bitmap`
................
......0000......
.....055550.....
.....055550.....
.....0LLLL0.....
.....0L0L00.....
......0LL0......
....00555500....
...0555555550...
...0555555550...
....05555550....
.....000000.....
.....0550550....
.....0550550....
.....00..00.....
................`],
  [u, bitmap`
................
......0000......
.....033330.....
.....033330.....
.....0LLLL0.....
.....0L0L00.....
......0LL0......
....00333300....
...0333333330...
...0333333330...
....03333330....
.....000000.....
.....0550550....
.....0550550....
.....00..00.....
................`],
  [z, bitmap`
................
......0000......
.....088880.....
.....088880.....
.....0LLLL0.....
.....0L0L00.....
......0LL0......
....00888800....
...0888888880...
...0888888880...
....08888880....
.....000000.....
.....0550550....
.....0550550....
.....00..00.....
................`],
  [k, bitmap`
................
.......9........
......979.......
.....97779......
......979.......
.......9........
................
................
................
................
................
................
................
................
................
................`],
  [c, bitmap`
0000000000000000
0444444444444440
0400000000000040
0404444444444040
0404000000004040
0404044444404040
0404040000404040
0404040440404040
0404040440404040
0404040000404040
0404044444404040
0404000000004040
0404444444444040
0400000000000040
0444444444444440
0000000000000000`],
  [s, bitmap`
................
.77777777777777.
.70000000000007.
.70777777777707.
.70700000000707.
.70707777770707.
.70777777777707.
.70000000000007.
.77777777777777.
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
................`],
  [m, bitmap`
................
.....666666.....
...6666666666...
..666666666666..
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
..666666666666..
...6666666666...
.....666666.....
................
................`],
  [e, bitmap`
................
.55555555555555.
5555555555555555
5005005005005005
5005005005005005
5555555555555555
5555555555555555
.55555555555555.
................
................
0000000000000000
................
................
0000000000000000
................
................`],
  [l, bitmap`
................
......9999......
.....999999.....
.....999999.....
......9999......
.......55.......
.......55.......
.......55.......
.......55.......
.......55.......
.......55.......
.......55.......
.......55.......
.......55.......
......5555......
................`],
  [i, bitmap`
................
......9999......
....99999999....
...9988998899...
..999889988999..
..999999999999..
..998899889999..
..998899889999..
..999999999999..
...9999999999...
....99999999....
......9999......
................
................
................
................`],
  [o, bitmap`
..000000000000..
..077777777770..
..070000000070..
..070777777070..
..070700007070..
..070707707070..
..070707707070..
..070707707070..
..070707707070..
..070707707070..
..070700007070..
..070777777070..
..070000000070..
..077777777770..
..000000000000..
................`],
  [a, bitmap`
................
......9999......
.....997799.....
....99777799....
....99777799....
....99777799....
.....997799.....
......9999......
.......99.......
.......99.......
......9999......
.....999999.....
....99999999....
................
................
................`],
  [y, bitmap`
................
................
.4.4.4.4.4.4.4.4
.4.4.4.4.4.4.4.4
.444444444444444
.4.4.4.4.4.4.4.4
.4.4.4.4.4.4.4.4
.444444444444444
.4.4.4.4.4.4.4.4
.4.4.4.4.4.4.4.4
.4.4.4.4.4.4.4.4
.4.4.4.4.4.4.4.4
.4.4.4.4.4.4.4.4
................
................
................`],
  [h, bitmap`
................
................
....33333333....
....39999993....
....39....93....
....39....93....
....39....93....
....39....93....
....39....93....
....39....93....
....39999993....
....33333333....
................
................
................
................`],
  [_, bitmap`
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888`]
);

// --- GAME STATE ---
let levelIndex = 0;
let cluesCount = 0;
let phase = "title";
let dialogQueue = [];
let dialogText = "";

setSolids([p, w, b, t, r, n, q, v, u, z, c, s, m, e, l, o, a, y]);
setPushables({
  [p]: [c] });

// --- MAPS (Gameplay in top 6 rows, Blue block in bottom 2 rows) ---
const MAPS = [
  // 0: Title Screen (all blue)
  `__________
__________
__________
____p_____
__________
__________
__________
__________`,

  // 1: O'Hare Arrival
  `wwwwwwwwww
w........w
w.n....s.w
wp.......d
w........w
wwwwwwwwww
__________
__________`,

  // 2: Millennium Park 1
  `tttttttttt
t........t
t..z.....t
tp.......d
t........t
tttttttttt
__________
__________`,

  // 3: Millennium Park 2 (The Bean)
  `tttttttttt
t...mm...t
t...mm..kt
tp.......d
t........t
tttttttttt
__________
__________`,

  // 4: The Loop 1
  `bbbbbbbbbb
b........b
b..z...l.b
bp.......d
b........b
bbbbbbbbbb
__________
__________`,

  // 5: The Loop 2 (Puzzle 1)
  // FIX: A solid wall row (y=2) now separates the crate/goal row from the
  // door row, so the crate can never be pushed onto the exit. The player
  // enters from (1,3) and exits via door at (9,3) as normal. Push the crate
  // left onto the goal to collect the clue. Press L to reset if stuck.
  `bbbbbbbbbb
b..h..c..b
bwwwwwww.b
bp.......d
b........b
bbbbbbbbbb
__________
__________`,

  // 6: Navy Pier 1
  `yyyyyyyyyy
y........y
y..z..e..y
yp.......d
y........y
rrrrrrrrrr
__________
__________`,

  // 7: Navy Pier 2 (Chase)
  `yyyyyyyyyy
y...v....y
y........y
dp......ky
y........y
rrrrrrrrrr
__________
__________`,

  // 8: Wrigley Field 1
  `tttttttttt
t..l.....t
t..z.....t
tp.......d
t........t
tttttttttt
__________
__________`,

  // 9: Wrigley Field 2
  // FIX: Added exit door (d) at the right wall. The original map had no
  // door at all, permanently trapping the player after collecting the clue.
  `wwwwwwwwww
w.......sw
w........w
wp......kd
w........w
wwwwwwwwww
__________
__________`,

  // 10: Museum Campus
  `tttttttttt
t........t
t...u....t
tp.......d
t........t
tttttttttt
__________
__________`,

  // 11: Field Museum (Puzzle 2)
  // Safe: pillars at y=2 and the ceiling at y=0 prevent the crate from
  // ever reaching row 3 where the exit door lives. Press L to reset if stuck.
  `bbbbbbbbbb
b...c..h.b
b..o..o..b
bp.......d
b........b
bbbbbbbbbb
__________
__________`,

  // 12: Willis Tower Lobby
  // FIX: If the player lacks 5 clues, the sign blocks forward progress.
  // The updated willis dialog now tells the player to press L to go back.
  `wwwwwwwwww
w...o.o..w
w..s.....w
wp.......w
w...o.o..w
wwwwwwwwww
__________
__________`,

  // 13: Skydeck (Confrontation)
  `yyyyyyyyyy
y........y
y...v....y
yp.......y
y........y
yyyyyyyyyy
__________
__________`,

  // 14: Victory
  `bbbbbbbbbb
b.l....l.b
b.n.i.q..b
b...p....b
b........b
bbbbbbbbbb
__________
__________`
];

// Made sure ALL strings are exactly 20 characters or shorter!
const DIALOGS = {
  "intro": ["Alex! Finally.", "The Golden Crust", "recipe is gone!", "Go to the Park.", "Look near the Bean."],
  "citizen1": ["Chicago is nice.", "But watch out...", "Someone suspicious", "was running east."],
  "bean": ["It's 'The Bean'!", "Look! A receipt!", "A flour receipt.", "(Clue 1 Found!)"],
  "tony": ["I am Tony.", "Chef at Giordano's.", "That Vince kid...", "He ruined us!", "Check the Pier."],
  "pier": ["Lake Michigan...", "The thief was here.", "He dropped a key.", "(Clue 3 Found!)"],
  "vince1": ["You're fast, Alex!", "But not fast enough!", "Catch me if you can!"],
  "wrigley": ["Wrigley Field!", "Found a ticket stub.", "Note: Meet at Tower", "(Clue 4 Found!)"],
  "curator": ["The Golden Crust?", "It's a legendary", "piece of history.", "Solve the vault", "to find the truth."],
  "puzzle": ["VAULT UNLOCKED!", "Inside: Vince's map!", "He is at the Tower!", "(Clue 5 Found!)"],
  // FIX: Tell the player they can press L to go back and collect more clues
  // instead of being stuck with no exit at Willis Tower.
  "willis": ["ELEVATOR LOCKED.", "Need all 5 clues!", "Press L to go back", "and find more clues."],
  "vince_final": ["End of the line!", "Fine, take it!", "The Golden Crust", "is yours again.", "Happy eating!"],
  "victory": ["THE RECIPE IS SAFE!", "Giordano's is open!", "BEST PIZZA EVER.", "THE END."]
};

const CHAPTERS = [
  "O'HARE AIRPORT", "MILLENNIUM PARK", "THE BEAN", "THE LOOP", "DOWNTOWN STREETS",
  "NAVY PIER WEST", "NAVY PIER EAST", "WRIGLEYVILLE", "WRIGLEY FIELD",
  "MUSEUM CAMPUS", "FIELD MUSEUM", "WILLIS TOWER", "SKYDECK", "VICTORY!"
];

const INVENTORY_NAMES = [
  "1: Pizza Receipt",
  "2: Crate Key",
  "3: Rusty Pier Key",
  "4: Wrigley Ticket",
  "5: Tower Map"
];

// --- LOGIC ---

function loadLevel(index) {
  levelIndex = index;
  setMap(MAPS[index]);

  if ([2, 3, 6, 7, 8, 10, 13].includes(index)) setBackground(g);
  else if ([0].includes(index)) setBackground(_);
  else setBackground(f);

  // Gateway at Willis Tower (Add door dynamically if 5 clues collected)
  if (index === 12 && cluesCount >= 5) {
    getTile(9, 3).forEach(spr => spr.remove());
    addSprite(9, 3, d);
  }

  // Trigger Victory Sequence
  if (index === 14) {
    playTune("C4-1 E4-1 G4-1 C5-4");
    phase = "victory";
    queueDialog("victory");
  }
}

function queueDialog(key) {
  dialogQueue = [...DIALOGS[key]];
  if (phase !== "victory") phase = "dialog";
  advanceDialog();
}

function advanceDialog() {
  if (dialogQueue.length > 0) {
    dialogText = dialogQueue.shift();
    playTune("C4-1");
  } else {
    if (phase === "dialog") phase = "play";
    dialogText = "";
  }
  showHUD();
}

// ----------------------------------------------------
// UI Logic: All Y values are set to 12, 13, 14, or 15 
// which places them STRICTLY inside the blue box!
// ----------------------------------------------------
function showHUD() {
  clearText();

  if (phase === "title") {
    addText("THE DEEP DISH", { x: 3, y: 3, color: color`0` });
    addText("MYSTERY", { x: 6, y: 5, color: color`0` });
    addText("WASD TO MOVE", { x: 4, y: 9, color: color`0` });
    addText("I TO INTERACT", { x: 3, y: 11, color: color`0` });
    addText("PRESS W TO START", { x: 2, y: 14, color: color`0` });

  } else if (phase === "inventory") {
    addText("--- INVENTORY ---", { x: 1, y: 12, color: color`0` });
    // FIX: Clamp index to avoid going out of bounds when cluesCount > 5
    // (can happen if the player resets and re-solves a puzzle after backtracking).
    const clampedIdx = Math.min(cluesCount, INVENTORY_NAMES.length);
    let latestClue = clampedIdx > 0 ? INVENTORY_NAMES[clampedIdx - 1] : "NO ITEMS YET";
    addText(`LATEST:`, { x: 1, y: 13, color: color`0` });
    addText(latestClue, { x: 1, y: 14, color: color`0` });
    addText("PRESS J TO CLOSE", { x: 1, y: 15, color: color`0` });

  } else if (phase === "dialog" || phase === "victory") {
    addText(dialogText, { x: 1, y: 13, color: color`0` });
    addText("K: NEXT", { x: 11, y: 15, color: color`0` });

  } else {
    // Standard HUD
    addText(CHAPTERS[levelIndex - 1] || "", { x: 1, y: 13, color: color`0` });
    addText(`CLUES: ${cluesCount}/5`, { x: 1, y: 14, color: color`0` });
    addText("J:INV", { x: 13, y: 14, color: color`0` });
    // FIX: Show context-sensitive L key hint.
    // Puzzle levels → reset in place. All other levels → go back one area.
    if (levelIndex === 5 || levelIndex === 11) {
      addText("L:RESET PUZZLE", { x: 1, y: 15, color: color`0` });
    } else if (levelIndex > 1) {
      addText("L:BACK", { x: 1, y: 15, color: color`0` });
    }
  }
}

// --- INPUT HANDLERS ---

onInput("w", () => {
  if (phase === "title") { phase = "play"; loadLevel(1); showHUD(); }
  else if (phase === "play") getFirst(p).y -= 1;
});

onInput("s", () => {
  if (phase === "title") { phase = "play"; loadLevel(1); showHUD(); }
  else if (phase === "play") getFirst(p).y += 1;
});

onInput("a", () => {
  if (phase === "title") { phase = "play"; loadLevel(1); showHUD(); }
  else if (phase === "play") getFirst(p).x -= 1;
});

onInput("d", () => {
  if (phase === "title") { phase = "play"; loadLevel(1); showHUD(); }
  else if (phase === "play") getFirst(p).x += 1;
});

onInput("k", () => {
  if (phase === "dialog" || phase === "victory") advanceDialog();
});

onInput("j", () => {
  if (phase === "play") phase = "inventory";
  else if (phase === "inventory") phase = "play";
  showHUD();
});

// FIX: New L key — the only previously-unused input button.
// On puzzle levels (5 & 11): resets the level in-place. This is the
// standard Sokoban convention and prevents any crate-blocks-door dead-end.
// On all other levels from level 2 onwards: travels back one area so the
// player can freely explore, revisit missed clues, or escape a gate like
// Willis Tower (level 12) when they haven't yet collected all 5 clues.
onInput("l", () => {
  if (phase !== "play") return;
  if (levelIndex === 5 || levelIndex === 11) {
    loadLevel(levelIndex); // Reset puzzle in-place
  } else if (levelIndex > 1) {
    loadLevel(levelIndex - 1); // Go back one area
  }
  showHUD();
});

onInput("i", () => {
  if (phase !== "play") return;
  const player = getFirst(p);
  if (!player) return;

  const neighbors = [
    getTile(player.x + 1, player.y), getTile(player.x - 1, player.y),
    getTile(player.x, player.y + 1), getTile(player.x, player.y - 1)
  ];

  neighbors.forEach(tile => {
    tile.forEach(spr => {
      if (spr.type === n) queueDialog("intro");
      if (spr.type === z) queueDialog("citizen1");
      if (spr.type === q) queueDialog("tony");
      if (spr.type === u) queueDialog("curator");

      if (spr.type === v && levelIndex === 7) { queueDialog("vince1"); spr.remove(); }
      if (spr.type === v && levelIndex === 13) {
        queueDialog("vince_final");
        spr.remove();
        addSprite(player.x + 1, player.y, i);
      }

      if (spr.type === s) {
        if (levelIndex === 12 && cluesCount < 5) queueDialog("willis");
        else if (levelIndex === 1) { dialogText = "WELCOME TO O'HARE"; phase = "dialog"; showHUD(); }
        else { dialogText = "KEEP SEARCHING..."; phase = "dialog"; showHUD(); }
      }
    });
  });
});

afterInput(() => {
  if (phase !== "play") return;
  const player = getFirst(p);
  if (!player) return;

  getTile(player.x, player.y).forEach(spr => {
    if (spr.type === k) {
      cluesCount++;
      playTune("E4-1 G4-1 C5-2");
      spr.remove();
      if (levelIndex === 3) queueDialog("bean");
      if (levelIndex === 7) queueDialog("pier");
      if (levelIndex === 9) queueDialog("wrigley");
    }
    if (spr.type === i && levelIndex === 13) { spr.remove(); loadLevel(14); }
    if (spr.type === d) { playTune("C3-1 G3-1"); loadLevel(levelIndex + 1); }
  });

  if (levelIndex === 5 || levelIndex === 11) {
    const crate = getFirst(c);
    const goal = getFirst(h);
    if (crate && goal && crate.x === goal.x && crate.y === goal.y) {
      crate.remove();
      goal.remove();
      cluesCount++;
      playTune("E4-1 G4-1 C5-2");
      if (levelIndex === 11) queueDialog("puzzle");
      else { dialogText = "(Clue 2 Found!)"; phase = "dialog"; }
    }
  }
  showHUD();
});

// --- GAME START ---
loadLevel(0);
showHUD();