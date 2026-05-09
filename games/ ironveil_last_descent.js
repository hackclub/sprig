/*
@title: Ironveil: The Last Descent
@description: You are Kael, last knight of the Ironveil order. The Shadow King stole the Crown of Ages and cursed the vault. Descend through 3 acts, uncover the truth, and face what lies at the bottom. Features: story dialogue between levels, push-block puzzles, lore scrolls, phantom enemies, and hand-crafted pixel art.
@author: sami singh
@tags: ['rpg', 'puzzle', 'adventure', 'story']
@addedOn: 2026-05-08
*/

var P  = "p";
var EN = "e";
var SP = "f";
var BS = "b";
var RV = "v";
var ZM = "z";
var CN = "c";
var KY = "k";
var EX = "d";
var WL = "w";
var FL = "g";
var SK = "s";
var VN = "a";
var HP = "h";
var CH = "x";
var PT = "t";
var SH = "r";
var LR = "o";
var SW = "y";

setLegend(

[P, bitmap`
0000033300000000
0000333330000000
0003CCCCCC300000
000CC5555CC00000
000CC5CC5CC00000
0003CCCCCC300000
0003888888300000
0003817188300000
0003888888300000
0000388883000000
0000038830000000
0000038830000000
0000311113000000
0000300003000000
0000300003000000
0000000000000000`],

[EN, bitmap`
0000000000000000
0000033333300000
0003333113330000
0003301111330000
0003331111330000
0003333333330000
0003333333330000
0000333333300000
0000333333300000
0003333333330000
0003300003330000
0003300003330000
0000330000330000
0000330000330000
0000000000000000
0000000000000000`],

[SP, bitmap`
0000000000000000
0000009990000000
0000099C99000000
0009999C99900000
0009990999900000
0009999999900000
0000999999000000
0000009900000000
0000099990000000
0009999999900000
0009900009900000
0000990009900000
0000099990000000
0000000000000000
0000000000000000
0000000000000000`],

[BS, bitmap`
0330000000003300
3333000000003330
3331300000031330
3331111111113300
0331111111113000
0033111111130000
0003311001130000
0003311111130000
0003333333330000
0003333333330000
0003333333330000
0003300333330000
0003300003330000
0000330000330000
0000330000330000
0000000000000000`],

[RV, bitmap`
0000000000000000
0000009990000000
0000099099000000
0000990099000000
0000999999000000
0000099990000000
0000099990000000
0009999999900000
0009911199900000
0009999999900000
0000999999000000
0000990099000000
0000099990000000
0000009990000000
0000000000000000
0000000000000000`],

[ZM, bitmap`
0000000000000000
0000066666000000
0000666666600000
0006666116660000
0006661661660000
0006666666600000
0006666666600000
0000666666000000
0000666666000000
0006666666600000
0006666666600000
0006600006600000
0006600006600000
0006600006600000
0000000000000000
0000000000000000`],

[CN, bitmap`
0000000000000000
0000005550000000
0000055555000000
0000551555500000
0005551555500000
0005555555500000
0005555555500000
0005511155500000
0005555555500000
0000555555000000
0000055555000000
0000005550000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],

[KY, bitmap`
0000000000000000
0000000000000000
0000055550000000
0000555555000000
0000550055000000
0000555555000000
0000055550000000
0000005500000000
0000005555550000
0000005555550000
0000005500000000
0000005500000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],

[EX, bitmap`
0011111111110000
0178888888710000
0178111118710000
0178100018710000
0178100018710000
0178111118710000
0178888888710000
0178888888710000
0178888888710000
0178111118710000
0178100018710000
0178100018710000
0178111118710000
0178888888710000
0011111111110000
0000000000000000`],

[WL, bitmap`
1111111111111111
1CC1CC1CC1CC1CC1
1CC1CC1CC1CC1CC1
1CC1CC1CC1CC1CC1
1111111111111111
1CC1CC1CC1CC1CC1
1CC1CC1CC1CC1CC1
1CC1CC1CC1CC1CC1
1111111111111111
1CC1CC1CC1CC1CC1
1CC1CC1CC1CC1CC1
1CC1CC1CC1CC1CC1
1111111111111111
1CC1CC1CC1CC1CC1
1CC1CC1CC1CC1CC1
1111111111111111`],

[FL, bitmap`
0000000000000000
0110000000011000
0110000000011000
0000000000000000
0000000000000000
0000011000000110
0000011000000110
0000000000000000
0000000000000000
0110000000011000
0110000000011000
0000000000000000
0000000000000000
0000011000000110
0000011000000110
0000000000000000`],

[SK, bitmap`
0010100101000000
0111100101110000
0111100101110000
1111101111111000
1111111111111000
1111111111111000
1111111111111000
1111111111111000
1111111111111000
1111111111111000
1111111111111000
1111111111111000
1111111111111000
1111111111111000
1111111111111000
1111111111111000`],

[VN, bitmap`
0066600066600000
0666660666660000
0066600066600000
0000000000000000
2222222222222200
2222222222222200
2211111111112200
2211111111112200
2211111111112200
2222222222222200
2222222222222200
0000000000000000
0066600066600000
0666660666660000
0066600066600000
0000000000000000`],

[HP, bitmap`
0000000000000000
0000033000000000
0000333300000000
0003333330000000
0003333330000000
0003313330000000
0003333330000000
0003333330000000
0003313330000000
0003333330000000
0003333330000000
0000333300000000
0000033000000000
0000000000000000
0000000000000000
0000000000000000`],

[CH, bitmap`
0000000000000000
0055555555500000
0058888888500000
0055555555500000
0058885888500000
0058885888500000
0055555555500000
0058888888500000
0058888888500000
0055555555500000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],

[PT, bitmap`
0000077770000000
0000777777000000
0007777777700000
0007770777700000
0007707077700000
0007770777700000
0007777777700000
0007777777700000
0007770777700000
0007707077700000
0007770777700000
0007777777700000
0000777777000000
0000077770000000
0000000000000000
0000000000000000`],

[SH, bitmap`
0000000000000000
0000088880000000
0000888888000000
0008818188800000
0008888888800000
0008818188800000
0008888888800000
0008818188800000
0008888888800000
0000888888000000
0000088880000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],

[LR, bitmap`
0000000000000000
0000000000000000
0000033330000000
0000333333000000
0003333333300000
0003300003300000
0003300003300000
0003333333300000
0000333333000000
0000033330000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],

[SW, bitmap`
0000000000000000
0000000050000000
0000000550000000
0000005550000000
0000055500000000
0000555000000000
0005550000000000
0055500000000000
0555000000000000
0553333000000000
0005533300000000
0000055330000000
0000005533000000
0000000553000000
0000000055000000
0000000000000000`]

);

var state      = "menu";
var level      = 0;
var score      = 0;
var best       = 0;
var hp         = 4;
var maxHp      = 4;
var hasKey     = false;
var ticker     = 0;
var inv        = 0;
var gold       = 0;
var shielded   = false;
var slowed     = 0;
var portalCD   = 0;
var bossHP     = 5;
var dialogStep = 0;
var dialogData = null;
var loreSeen   = 0;
var kills      = 0;
var killFlash  = 0;
var combo      = 0;
var comboTimer = 0;
var hasSword   = false;
var swordCD    = 0;
var milestone  = 0;

function cx(s) {
  var n = Math.floor((20 - s.length) / 2);
  return n < 0 ? 0 : n;
}

var menuMap = map`
..........
..........
..........
..........
..........
..........
..........
..........`;

var loreScrolls = [
  ["Vault: sealed", "by Aldric III.", "None returned."],
  ["Crown bends", "reality itself", "Wear it: see"],
  ["Shadow King:", "His general.", "Betrayal costs"],
  ["Specters are", "fallen knights", "of Ironveil."],
  ["Revenants:", "Lure to spikes", "Unstoppable."],
  ["Ironshield:", "one hit.", "Use it wisely."],
  ["Rune portals", "built by monks", "fled long ago."],
  ["Below citadel", "the true vault", "What sleeps?"],
  ["Boss: 2 forms", "Stay moving.", "No dead ends."],
  ["Ironveil oath:", "Crown first.", "Even their own"]
];

var dialogs = [
  null,
  ["Kael:", "Found a blade.", "This changes", "everything."],
  ["Kael:", "Spike traps.", "Someone reset", "Set recently."],
  ["Guard Captain:", "Turn back now.", "Crown chose", "a new master."],
  ["Kael:", "The air tastes", "wrong. Like", "burnt shadow."],
  ["Inscription:", "He who drinks", "dark becomes", "the dark."],
  ["Kael:", "Rune portals", "still active.", "Someone feeds"],
  ["Shadow Voice:", "Too late.", "Crown already", "chose me."],
  ["Kael:", "I see it now.", "The curse IS", "the Crown."],
  ["Shadow King:", "Finally, Kael.", "I waited for", "worthy to see."]
];

var levelTitles = [
  ["ACT I", "The Entrance"],
  ["ACT I", "The Barracks"],
  ["ACT I", "Inner Maze"],
  ["ACT I", "The Vault"],
  ["ACT II", "Specter Halls"],
  ["ACT II", "Revenant Crypt"],
  ["ACT II", "Zombie Warren"],
  ["ACT II", "Warden Keep"],
  ["ACT III", "Obsidian Halls"],
  ["ACT III", "Final Stand"]
];

var levels = [

map`
wwwwwwwwwwww
wp.c..y....w
w..........w
w..........w
w.www......w
w...w..c...w
w...w......w
w....c...k.w
w.........dw
wwwwwwwwwwww`,

map`
wwwwwwwwwwww
wp.c.......w
w..........w
w.e..www...w
w....w.....w
w....w..c..w
w....w..h..w
w.c.....e.kw
w..s.s....dw
wwwwwwwwwwww`,

map`
wwwwwwwwwwww
wp.c.......w
w..........w
w.wwww.....w
w....w..e..w
w.y..w.....w
w....wwww..w
w....c...k.w
w..c......dw
wwwwwwwwwwww`,

map`
wwwwwwwwwwww
wp..c......w
w..........w
w..y....r..w
w..........w
w....b.....w
w..........w
w..c.....k.w
w....s.s..dw
wwwwwwwwwwww`,

map`
wwwwwwwwwwww
wp.c.......w
w..........w
w...www....w
w...w.f....w
w.a.w......w
w...wwww...w
w..c...a.k.w
w......e..dw
wwwwwwwwwwww`,

map`
wwwwwwwwwwww
wp.c.......w
w.v........w
w....www...w
w....w.....w
w....wt....w
w.c.....t.kw
w...h..v...w
w.........dw
wwwwwwwwwwww`,

map`
wwwwwwwwwwww
wp.c.w.c.h.w
w.....w....w
w..t..w....w
w.....z....w
w....wt....w
w.c..z.....w
w....z...k.w
w.z...s...dw
wwwwwwwwwwww`,

map`
wwwwwwwwwwww
wp.c.r...h.w
w..........w
w.e.www....w
w...w.sbk..w
w...w.s.s..w
w.c.v......w
w......f...w
w.........dw
wwwwwwwwwwww`,

map`
wwwwwwwwwwww
wp.c.y.c.h.w
w..........w
w.z.www.e..w
w...w......w
w...w.a....w
w.f.wwww...w
w....c...k.w
w.s..a....dw
wwwwwwwwwwww`,

map`
wwwwwwwwwwww
wp.c.r..y..w
w..........w
w.f.www.e..w
w...w......w
w.e.w.bv...w
w...wwww...w
w.ef.c...k.w
w.s..a....dw
wwwwwwwwwwww`

];

function showMenu() {
  clearText();
  addText("IRONVEIL", { x: cx("IRONVEIL"), y: 1, color: color`3` });
  addText("Last Descent", { x: cx("Last Descent"), y: 3, color: color`D` });
  addText("- - - - - - -", { x: cx("- - - - - - -"), y: 5, color: color`1` });
  if (best > 0) {
    var bs = "Best: " + best;
    addText(bs, { x: cx(bs), y: 7, color: color`5` });
  }
  addText("Press any key", { x: cx("Press any key"), y: 9, color: color`6` });
  addText("to start!", { x: cx("to start!"), y: 10, color: color`6` });
  addText("WASD: Move", { x: cx("WASD: Move"), y: 12, color: color`7` });
  addText("I: Attack/Move", { x: cx("I: Attack/Move"), y: 13, color: color`5` });
}

function showCard() {
  clearText();
  var pair = levelTitles[level] || ["GENERATED", "Floor " + (level + 1)];
  var act = pair[0];
  var sub = pair[1];
  addText(act, { x: cx(act), y: 3, color: color`7` });
  addText(sub, { x: cx(sub), y: 6, color: color`3` });
  addText("- - - - - - -", { x: cx("- - - - - - -"), y: 9, color: color`1` });
  addText("any key", { x: cx("any key"), y: 11, color: color`6` });
}

function showDialog() {
  clearText();
  var d = dialogData;
  if (!d) return;
  for (var i = 0; i < d.length; i++) {
    var col = i === 0 ? color`5` : color`D`;
    addText(d[i], { x: cx(d[i]), y: 3 + i * 3, color: col });
  }
  var pr = "W - continue";
  addText(pr, { x: cx(pr), y: 13, color: color`6` });
}

function showLore(lines) {
  clearText();
  var hd = "~ Lore Scroll~";
  addText(hd, { x: cx(hd), y: 2, color: color`7` });
  for (var i = 0; i < lines.length; i++) {
    addText(lines[i], { x: cx(lines[i]), y: 5 + i * 2, color: color`D` });
  }
  var pr = "W - continue";
  addText(pr, { x: cx(pr), y: 13, color: color`6` });
}

function showHUD() {
  clearText();
  var hpBar = "";
  for (var i = 0; i < hp; i++) hpBar += "<3";
  for (var i = hp; i < maxHp; i++) hpBar += "..";
  if (shielded) hpBar += "[S]";
  addText(hpBar, { x: 0, y: 0, color: color`3` });
  var ls = "L" + (level + 1) + " G" + gold;
  addText(ls, { x: 20 - ls.length, y: 0, color: color`5` });
  var row2 = "";
  if (hasKey) row2 += "KEY ";
  if (hasSword) row2 += (swordCD > 0 ? ">SW" : "SW "); 
  if (slowed > 0) row2 += "SLW ";
  if (inv > 0) row2 += "INV";
  if (row2.length) addText(row2, { x: 0, y: 1, color: color`7` });
  if (combo > 1) {
    var cmb = "x" + combo + "!";
    addText(cmb, { x: cx(cmb), y: 1, color: color`5` });
  }
  if (score > 0) {
    var sc = "" + score;
    addText(sc, { x: 20 - sc.length, y: 1, color: color`6` });
  }
}

function showGameOver() {
  clearText();
  var t = "KAEL FALLS";
  addText(t, { x: cx(t), y: 1, color: color`3` });
  var lv = "Level " + (level + 1);
  addText(lv, { x: cx(lv), y: 4, color: color`7` });
  var g = "Gold   " + gold;
  addText(g, { x: cx(g), y: 6, color: color`5` });
  var sc = "Score  " + score;
  addText(sc, { x: cx(sc), y: 7, color: color`D` });
  var kl = "Kills  " + kills;
  addText(kl, { x: cx(kl), y: 8, color: color`3` });
  if (score > best) {
    best = score;
    var nb = "NEW BEST!";
    addText(nb, { x: cx(nb), y: 10, color: color`6` });
  }
  var r = "W - menu";
  addText(r, { x: cx(r), y: 13, color: color`7` });
}

function showWin() {
  clearText();
  var t = "CROWN RETURNED";
  addText(t, { x: cx(t), y: 1, color: color`5` });
  var l1 = "Kael emerges.";
  addText(l1, { x: cx(l1), y: 3, color: color`D` });
  var l2 = "Ironveil lives.";
  addText(l2, { x: cx(l2), y: 4, color: color`D` });
  var g = "Gold   " + gold;
  addText(g, { x: cx(g), y: 7, color: color`5` });
  var sc = "Score  " + score;
  addText(sc, { x: cx(sc), y: 8, color: color`D` });
  var kl = "Kills  " + kills;
  addText(kl, { x: cx(kl), y: 9, color: color`3` });
  if (score > best) {
    best = score;
    var lg = "LEGEND!";
    addText(lg, { x: cx(lg), y: 11, color: color`3` });
  }
  var r = "W - menu";
  addText(r, { x: cx(r), y: 13, color: color`7` });
}


function rng(n) {
  ticker = (ticker * 1664525 + 1013904223) & 0x7fffffff;
  return ((ticker >>> 0) % n);
}

function bfsCheck(grid, sr, sc, tr, tc) {
  var W = grid[0].length;
  var H = grid.length;
  var visited = [];
  var i;
  for (i = 0; i < H * W; i++) visited.push(false);
  var queue = [sr * W + sc];
  visited[sr * W + sc] = true;
  while (queue.length > 0) {
    var cur = queue.shift();
    var r = Math.floor(cur / W);
    var c = cur % W;
    if (r === tr && c === tc) return true;
    var dirs = [[-1,0],[1,0],[0,-1],[0,1]];
    for (i = 0; i < 4; i++) {
      var nr = r + dirs[i][0];
      var nc = c + dirs[i][1];
      if (nr >= 0 && nr < H && nc >= 0 && nc < W) {
        var idx = nr * W + nc;
        if (!visited[idx] && grid[nr][nc] !== WL) {
          visited[idx] = true;
          queue.push(idx);
        }
      }
    }
  }
  return false;
}

function generateMap(lvl) {
  var W = 12; var H = 10;
  var attempts = 0;
  var grid, r, c, i;

  while (attempts < 30) {
    attempts++;
    grid = [];
    for (r = 0; r < H; r++) {
      var row = [];
      for (c = 0; c < W; c++) {
        row.push((r === 0 || r === H-1 || c === 0 || c === W-1) ? WL : ".");
      }
      grid.push(row);
    }

    grid[1][1] = P;
    var kr = 1 + rng(3);
    var kc = 7 + rng(3);
    var dr = 6 + rng(2);
    var dc = 8 + rng(2);
    grid[kr][kc] = KY;
    grid[dr][dc] = EX;

    var wallCount = 3 + rng(4);
    for (i = 0; i < wallCount; i++) {
      var wr = 2 + rng(H - 4);
      var wc = 2 + rng(W - 4);
      var wlen = 2 + rng(3);
      var horiz = rng(2) === 0;
      for (var wi = 0; wi < wlen; wi++) {
        var tr2 = horiz ? wr : wr + wi;
        var tc2 = horiz ? wc + wi : wc;
        if (tr2 > 0 && tr2 < H-1 && tc2 > 0 && tc2 < W-1) {
          if (grid[tr2][tc2] === ".") grid[tr2][tc2] = WL;
        }
      }
    }

    if (!bfsCheck(grid, 1, 1, kr, kc)) continue;
    if (!bfsCheck(grid, kr, kc, dr, dc)) continue;

    var diff = Math.min(lvl, 10);
    var enemyTypes = [EN, EN, SP, ZM, RV];
    var numEnemies = 1 + Math.floor(diff / 2);
    var numSpikes = Math.floor(diff / 3);
    var placed = 0;
    var tries = 0;
    while (placed < numEnemies && tries < 50) {
      tries++;
      var er = 2 + rng(H - 4);
      var ec = 3 + rng(W - 5);
      if (grid[er][ec] === ".") {
        grid[er][ec] = enemyTypes[rng(Math.min(3 + Math.floor(diff/4), 5))];
        placed++;
      }
    }
    placed = 0; tries = 0;
    while (placed < numSpikes && tries < 30) {
      tries++;
      var sr2 = 3 + rng(H - 5);
      var sc2 = 2 + rng(W - 4);
      if (grid[sr2][sc2] === ".") { grid[sr2][sc2] = SK; placed++; }
    }

    if (rng(3) === 0) {
      for (tries = 0; tries < 20; tries++) {
        var ir = 1 + rng(H - 3); var ic = 1 + rng(W - 3);
        if (grid[ir][ic] === ".") { grid[ir][ic] = HP; break; }
      }
    }
    if (diff >= 3 && rng(2) === 0) {
      for (tries = 0; tries < 20; tries++) {
        var ir = 1 + rng(H - 3); var ic = 1 + rng(W - 3);
        if (grid[ir][ic] === ".") { grid[ir][ic] = SW; break; }
      }
    }

    var coins = 2 + rng(3);
    placed = 0; tries = 0;
    while (placed < coins && tries < 40) {
      tries++;
      var cr = 1 + rng(H - 3); var cc = 1 + rng(W - 3);
      if (grid[cr][cc] === ".") { grid[cr][cc] = CN; placed++; }
    }

    return grid;
  }
  return null;
}

function applyGeneratedMap(grid) {
  if (!grid) return;
  var rows = [];
  for (var r = 0; r < grid.length; r++) {
    rows.push(grid[r].join(""));
  }
  var mapStr = rows.join("\n");
  setMap(map(mapStr));
}

function startGame() {
  level = 0; score = 0; gold = 0;
  hp = 4; maxHp = 4; hasKey = false;
  shielded = false; slowed = 0;
  ticker = 0; inv = 0; portalCD = 0; bossHP = 5;
  kills = 0; killFlash = 0; combo = 0; comboTimer = 0;
  hasSword = false; swordCD = 0; milestone = 0;
  loadLevel();
}

function loadLevel() {
  hasKey = false; ticker = 0; inv = 0;
  portalCD = 0; bossHP = 5;
  shielded = false; slowed = 0; swordCD = 0;
  if (level < levels.length) {
    setMap(levels[level]);
  } else {
    var gen = generateMap(level + 1);
    if (gen) {
      var rows = [];
      for (var r = 0; r < gen.length; r++) rows.push(gen[r].join(""));
      setMap(map(rows[0] + "\n" + rows[1] + "\n" + rows[2] + "\n" + rows[3] + "\n" + rows[4] + "\n" + rows[5] + "\n" + rows[6] + "\n" + rows[7] + "\n" + rows[8] + "\n" + rows[9]));
    } else {
      setMap(levels[level % levels.length]);
    }
  }
  setBackground(FL);
  setSolids([WL, EX]);
  state = "card";
  showCard();
}

function afterCard() {
  var d = dialogs[level];
  if (d) {
    dialogData = d;
    state = "dialog";
    showDialog();
  } else {
    state = "playing";
    showHUD();
  }
}

function getFreq() {
  return Math.max(1, 2 - Math.floor(level / 5));
}

function isSolid(x, y, avoidTypes) {
  var t = getTile(x, y);
  for (var i = 0; i < t.length; i++) {
    var tp = t[i].type;
    if (tp === WL) return true;
    if (avoidTypes) {
      for (var j = 0; j < avoidTypes.length; j++) {
        if (tp === avoidTypes[j]) return true;
      }
    }
  }
  return false;
}

function stepTo(en, pl, avoidTypes) {
  var dx = pl.x - en.x;
  var dy = pl.y - en.y;
  if (dx === 0 && dy === 0) return;
  var ox = dx > 0 ? 1 : (dx < 0 ? -1 : 0);
  var oy = dy > 0 ? 1 : (dy < 0 ? -1 : 0);
  if (!isSolid(en.x + ox, en.y, avoidTypes) && ox !== 0) {
    en.x += ox; return;
  }
  if (!isSolid(en.x, en.y + oy, avoidTypes) && oy !== 0) {
    en.y += oy; return;
  }
  if (oy !== 0 && !isSolid(en.x + ox, en.y, avoidTypes)) {
    en.x += ox; return;
  }
  if (ox !== 0 && !isSolid(en.x, en.y + oy, avoidTypes)) {
    en.y += oy; return;
  }
  var sides = [1, -1];
  for (var si = 0; si < 2; si++) {
    if (!isSolid(en.x + sides[si], en.y, avoidTypes)) { en.x += sides[si]; return; }
    if (!isSolid(en.x, en.y + sides[si], avoidTypes)) { en.y += sides[si]; return; }
  }
}

function moveEnemies() {
  var pl = getFirst(P);
  if (!pl) return;
  var hazards = [SK, VN];
  var freq = getFreq();

  var grunts = getAll(EN);
  for (var i = 0; i < grunts.length; i++) {
    var d = Math.abs(pl.x - grunts[i].x) + Math.abs(pl.y - grunts[i].y);
    if (d <= 4) { stepTo(grunts[i], pl, hazards); }
    else if (d <= 8 && ticker % 2 === 0) { stepTo(grunts[i], pl, hazards); }
  }

  var specters = getAll(SP);
  for (var i = 0; i < specters.length; i++) {
    var d = Math.abs(pl.x - specters[i].x) + Math.abs(pl.y - specters[i].y);
    if (d <= 9) {
      stepTo(specters[i], pl, hazards);
      if (ticker % freq === 0) stepTo(specters[i], pl, hazards);
    }
  }

  var revs = getAll(RV);
  for (var i = 0; i < revs.length; i++) {
    if (ticker % freq === 0) stepTo(revs[i], pl, []);
  }

  var zombies = getAll(ZM);
  for (var i = 0; i < zombies.length; i++) {
    if (ticker % (freq + 1) === 0) stepTo(zombies[i], pl, hazards);
  }

  var bosses = getAll(BS);
  for (var i = 0; i < bosses.length; i++) {
    stepTo(bosses[i], pl, []);
    if (bossHP <= 2) stepTo(bosses[i], pl, []);
  }
}

function hurt(leech) {
  if (inv > 0) return;
  if (shielded) {
    shielded = false;
    playTune(tune`60: e6^50, 60: c6^50`);
    return;
  }
  hp--;
  if (leech && hp < maxHp) hp++;
  playTune(tune`80: c4^70, 80: a3^70`);
  if (hp <= 0) {
    state = "gameover";
    showGameOver();
    playTune(tune`150: c5^120, 150: b4^120, 200: a4^150, 400: g4^350`);
  } else {
    inv = 10;
  }
}

function tryPortal(pl) {
  if (portalCD > 0) return;
  var pts = getAll(PT);
  for (var i = 0; i < pts.length; i++) {
    if (pts[i].x === pl.x && pts[i].y === pl.y) {
      for (var j = 0; j < pts.length; j++) {
        if (j !== i) {
          pl.x = pts[j].x; pl.y = pts[j].y;
          portalCD = 4;
          playTune(tune`50: a5^40, 50: e6^40, 50: a6^50`);
          return;
        }
      }
    }
  }
}

function tryMove(pl, nx, ny) {
  var t = getTile(nx, ny);
  for (var i = 0; i < t.length; i++) {
    var tp = t[i].type;
    if (tp === WL) return false;
    if (tp === EX && !hasKey) { playTune(tune`80: f4^60`); return false; }
  }
  if (slowed > 0 && ticker % 2 === 1) { slowed--; return false; }
  pl.x = nx; pl.y = ny;
  return true;
}

function checkLore(pl) {
  var scrolls = getAll(LR);
  for (var i = 0; i < scrolls.length; i++) {
    if (scrolls[i].x === pl.x && scrolls[i].y === pl.y) {
      scrolls[i].remove();
      var idx = loreSeen % loreScrolls.length;
      loreSeen++;
      state = "lore";
      showLore(loreScrolls[idx]);
      return true;
    }
  }
  return false;
}

setMap(menuMap);
setBackground(FL);
setSolids([]);
showMenu();

function advanceW() {
  if (state === "menu") { startGame(); return; }
  if (state === "card") { afterCard(); return; }
  if (state === "dialog") {
    dialogData = null;
    state = "playing";
    showHUD();
    return;
  }
  if (state === "lore") {
    state = "playing";
    showHUD();
    return;
  }
  if (state === "gameover" || state === "win") {
    state = "menu";
    setMap(menuMap);
    setBackground(FL);
    setSolids([]);
    showMenu();
    return;
  }
}

function swordHitTile(tx, ty) {
  var tile = getTile(tx, ty);
  var hit = false;
  for (var ti = tile.length - 1; ti >= 0; ti--) {
    var tp = tile[ti].type;
    if (tp === EN || tp === SP || tp === ZM || tp === RV) {
      tile[ti].remove(); kills++; score += 25; hit = true;
    } else if (tp === BS) {
      bossHP--;
      if (bossHP <= 0) { tile[ti].remove(); kills++; score += 200; }
      hit = true;
    }
  }
  return hit;
}
function doSwordAttack(pl) {
  if (!hasSword || swordCD > 0) return false;
  swordCD = 1;
  var hit = false;
  if (swordHitTile(pl.x, pl.y - 1)) hit = true;
  if (swordHitTile(pl.x, pl.y + 1)) hit = true;
  if (swordHitTile(pl.x - 1, pl.y)) hit = true;
  if (swordHitTile(pl.x + 1, pl.y)) hit = true;
  playTune(hit ? tune`50: c6^40, 50: g5^40` : tune`50: f4^40`);
  return true;
}

onInput("w", function() { advanceW(); });

onInput("i", function() {
  if (state !== "playing") { advanceW(); return; }
  var pl = getFirst(P);
  if (!pl) return;
  if (!doSwordAttack(pl)) tryMove(pl, pl.x, pl.y - 1);
});
onInput("k", function() {
  if (state !== "playing") { advanceW(); return; }
  var pl = getFirst(P); if (pl) tryMove(pl, pl.x, pl.y + 1);
});
onInput("j", function() {
  if (state !== "playing") { advanceW(); return; }
  var pl = getFirst(P); if (pl) tryMove(pl, pl.x - 1, pl.y);
});
onInput("l", function() {
  if (state !== "playing") { advanceW(); return; }
  var pl = getFirst(P); if (pl) tryMove(pl, pl.x + 1, pl.y);
});
onInput("a", function() {
  if (state !== "playing") { advanceW(); return; }
  var pl = getFirst(P); if (pl) tryMove(pl, pl.x - 1, pl.y);
});
onInput("d", function() {
  if (state !== "playing") { advanceW(); return; }
  var pl = getFirst(P); if (pl) tryMove(pl, pl.x + 1, pl.y);
});
onInput("s", function() {
  if (state !== "playing") { advanceW(); return; }
  var pl = getFirst(P);
  if (pl) { if (!checkLore(pl)) tryMove(pl, pl.x, pl.y + 1); }
});

afterInput(function() {
  if (state !== "playing") return;

  ticker++;
  moveEnemies();

  var pl = getFirst(P);
  if (!pl) return;

  if (portalCD > 0) { portalCD--; } else { tryPortal(pl); }

  var coins = getAll(CN);
  for (var i = 0; i < coins.length; i++) {
    if (coins[i].x === pl.x && coins[i].y === pl.y) {
      coins[i].remove(); gold++;
      if (comboTimer > 0) { combo++; score += 10 * (1 + combo); } else { combo = 0; score += 10; }
      comboTimer = 4;
      playTune(tune`60: c5^50`);
    }
  }

  var chests = getAll(CH);
  for (var i = 0; i < chests.length; i++) {
    if (chests[i].x === pl.x && chests[i].y === pl.y) {
      chests[i].remove(); gold += 5; score += 50;
      playTune(tune`50: c5^40, 50: e5^40, 50: g5^40, 80: c6^70`);
    }
  }

  var keys = getAll(KY);
  for (var i = 0; i < keys.length; i++) {
    if (keys[i].x === pl.x && keys[i].y === pl.y) {
      keys[i].remove(); hasKey = true; score += 50;
      playTune(tune`80: g5^60, 80: c6^60, 80: e6^80`);
    }
  }

  var vials = getAll(HP);
  for (var i = 0; i < vials.length; i++) {
    if (vials[i].x === pl.x && vials[i].y === pl.y) {
      vials[i].remove();
      if (hp < maxHp) { hp++; playTune(tune`80: e5^60, 80: g5^70`); }
      else { gold += 2; score += 20; playTune(tune`60: c5^50`); }
    }
  }

  var shields = getAll(SH);
  for (var i = 0; i < shields.length; i++) {
    if (shields[i].x === pl.x && shields[i].y === pl.y) {
      shields[i].remove(); shielded = true;
      playTune(tune`60: e6^50, 60: g6^60`);
    }
  }
  var swords = getAll(SW);
  for (var i = 0; i < swords.length; i++) {
    if (swords[i].x === pl.x && swords[i].y === pl.y) {
      swords[i].remove(); hasSword = true;
      playTune(tune`60: c6^50, 80: e6^60, 80: g6^80`);
    }
  }

  var spikes = getAll(SK);
  for (var i = 0; i < spikes.length; i++) {
    if (spikes[i].x === pl.x && spikes[i].y === pl.y) hurt(false);
  }

  var vents = getAll(VN);
  for (var i = 0; i < vents.length; i++) {
    if (vents[i].x === pl.x && vents[i].y === pl.y) {
      hurt(false); slowed = 3;
    }
  }

  checkLore(pl);

  if (state !== "playing") return;

  var ens = getAll(EN);
  for (var i = 0; i < ens.length; i++) {
    if (ens[i].x === pl.x && ens[i].y === pl.y) hurt(false);
  }
  var sps = getAll(SP);
  for (var i = 0; i < sps.length; i++) {
    if (sps[i].x === pl.x && sps[i].y === pl.y) hurt(false);
  }
  var rvs = getAll(RV);
  for (var i = 0; i < rvs.length; i++) {
    if (rvs[i].x === pl.x && rvs[i].y === pl.y) hurt(true);
  }
  var zms = getAll(ZM);
  for (var i = 0; i < zms.length; i++) {
    if (zms[i].x === pl.x && zms[i].y === pl.y) hurt(false);
  }

  var bsArr = getAll(BS);
  for (var i = 0; i < bsArr.length; i++) {
    if (bsArr[i].x === pl.x && bsArr[i].y === pl.y) {
      hurt(false);
    }
  }

  if (state !== "playing") return;

  var exits = getAll(EX);
  for (var i = 0; i < exits.length; i++) {
    if (exits[i].x === pl.x && exits[i].y === pl.y && hasKey) {
      level++;
      score += 100 + level * 20;
      if (level < levels.length) {
        playTune(tune`150: c5^120, 150: e5^120, 150: g5^120, 200: c6^180`);
        loadLevel();
      } else {
        if (level <= levels.length) {
          state = "win";
          showWin();
          playTune(tune`200: c5^180, 200: e5^180, 200: g5^180, 200: c6^180, 200: e6^180, 400: g6^350`);
        } else {
          playTune(tune`150: c5^120, 150: e5^120, 150: g5^120, 200: c6^180`);
          loadLevel();
        }
      }
      return;
    }
  }

  if (inv > 0) inv--;
  if (slowed > 0 && ticker % 2 === 0) slowed--;
  if (comboTimer > 0) comboTimer--; else combo = 0;
  if (killFlash > 0) killFlash--;
  if (swordCD > 0) swordCD--;
  if (state === "playing") showHUD();
});
