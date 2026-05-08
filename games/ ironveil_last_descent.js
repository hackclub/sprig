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
wwwwwwwwwwww
wp.c..y....w
w..........w
w..........w
w.w.wwww...w
w.w.....c..w
w.w........w
w....c...k.w
w.....e...dw
wwwwwwwwwwww`;

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
wp.c.w.....w
w....w..c..w
w.e..w.....w
wwww.wwww..w
w....w.....w
w.c..w.h.k.w
w....w.sss.w
w..e......dw
wwwwwwwwwwww`,

map`
wwwwwwwwwwww
wp.c.y.....w
w.wwwwwwww.w
w.w.c......w
w.w....e...w
w.w.c......w
w.wwwwwwww.w
w....c...k.w
w.s.......dw
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
w....sss..dw
wwwwwwwwwwww`,

map`
wwwwwwwwwwww
wp.c..w....w
w.....w.c..w
w.....w....w
w.ww..ww.w.w
w..w.f.w...w
w..w...w.h.w
w..c...a.k.w
w.....e...dw
wwwwwwwwwwww`,

map`
wwwwwwwwwwww
wp.c.w.y...w
w.v..w..c..w
w....wt....w
wwww.w.....w
w....w.....w
w.c.....t.kw
w..h...v...w
w.........dw
wwwwwwwwwwww`,

map`
wwwwwwwwwwww
wp.c.w.c.h.w
w.....w....w
w..t..w....w
wwwwwz.wwwww
w......t...w
w.c..z.....w
w..s..z..k.w
w.z.......dw
wwwwwwwwwwww`,

map`
wwwwwwwwwwww
wp.c.r...h.w
w...w..c...w
w.e.w......w
wwwww.sbk..w
w....w.sss.w
w.c.v......w
w.......f..w
w.........dw
wwwwwwwwwwww`,

map`
wwwwwwwwwwww
wp.c.y.c.h.w
w..wwwwes..w
w.z..ax.e..w
w.e..a.....w
wwwww..www.w
w.f.z....k.w
w.ssa..ss..w
w.s.......dw
wwwwwwwwwwww`,

map`
wwwwwwwwwwww
wp.c.r..y..w
w..twweszf.w
w..f.ssxe..w
w.ea.a.....w
wwwww..wwwww
w.ef.bva.k.w
w.ssas.ss..w
w.e.......dw
wwwwwwwwwwww`,

map`
wwwwwwwwwwww
wp.c.r..chww
w..twweszf.w
w..f.ssxea.w
w.e..a.....w
wwwww..wwwww
wxef.bva.k.w
w.ssassss..w
w.e.......dw
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
  addText("W - Start", { x: cx("W - Start"), y: 9, color: color`6` });
  addText("WASD: Move", { x: cx("WASD: Move"), y: 11, color: color`7` });
  addText("W+Sword: Attack", { x: cx("W+Sword: Attack"), y: 13, color: color`5` });
}

function showCard() {
  clearText();
  var pair = levelTitles[level] || ["LEVEL", "" + (level + 1)];
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
  setMap(levels[level]);
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
  var base = Math.max(1, 3 - Math.floor(level / 4));
  return ticker >= 15 ? Math.max(1, base - 1) : base;
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
  var nx, ny;
  if (Math.abs(dx) >= Math.abs(dy)) {
    nx = en.x + (dx > 0 ? 1 : -1);
    if (!isSolid(nx, en.y, avoidTypes)) { en.x = nx; return; }
    if (dy !== 0) { ny = en.y + (dy > 0 ? 1 : -1); if (!isSolid(en.x, ny, avoidTypes)) en.y = ny; }
  } else {
    ny = en.y + (dy > 0 ? 1 : -1);
    if (!isSolid(en.x, ny, avoidTypes)) { en.y = ny; return; }
    if (dx !== 0) { nx = en.x + (dx > 0 ? 1 : -1); if (!isSolid(nx, en.y, avoidTypes)) en.x = nx; }
  }
}

function moveEnemies() {
  var pl = getFirst(P);
  if (!pl) return;
  var hazards = [SK, VN];

  var grunts = getAll(EN);
  for (var i = 0; i < grunts.length; i++) {
    var d = Math.abs(pl.x - grunts[i].x) + Math.abs(pl.y - grunts[i].y);
    if (d <= 6 && ticker % getFreq() === 0) {
      stepTo(grunts[i], pl, hazards);
      if (d <= 2) stepTo(grunts[i], pl, hazards);
    }
  }

  var specters = getAll(SP);
  for (var i = 0; i < specters.length; i++) {
    var d = Math.abs(pl.x - specters[i].x) + Math.abs(pl.y - specters[i].y);
    if (d <= 8) {
      stepTo(specters[i], pl, hazards);
      stepTo(specters[i], pl, hazards);
    }
  }

  var revs = getAll(RV);
  for (var i = 0; i < revs.length; i++) stepTo(revs[i], pl, []);

  var zombies = getAll(ZM);
  for (var i = 0; i < zombies.length; i++) {
    var dz = Math.abs(pl.x - zombies[i].x) + Math.abs(pl.y - zombies[i].y);
    if (ticker % (getFreq() * 2) === 0 || dz <= 2) stepTo(zombies[i], pl, hazards);
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
    if (tp === EN || tp === SP || tp === ZM || tp === RV) {
      if (hasSword && swordCD === 0) {
        t[i].remove();
        kills++; score += 25;
        swordCD = 2;
        playTune(tune`50: c6^40, 50: g5^40`);
        return true;
      }
      hurt(tp === RV);
      return false;
    }
    if (tp === BS) {
      if (hasSword && swordCD === 0) {
        bossHP--;
        swordCD = 2;
        playTune(tune`80: a4^70, 80: f3^70`);
        if (bossHP <= 0) {
          t[i].remove();
          kills++; score += 200;
          playTune(tune`100: c6^80, 100: e6^80, 200: g6^150`);
        }
        return true;
      }
      hurt(false);
      return false;
    }
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

function moveUp() {
  if (state !== "playing") { advanceW(); return; }
  var pl = getFirst(P); if (pl) tryMove(pl, pl.x, pl.y - 1);
}
function moveDown() {
  if (state !== "playing") { advanceW(); return; }
  var pl = getFirst(P); if (pl) tryMove(pl, pl.x, pl.y + 1);
}
function moveLeft() {
  if (state !== "playing") { advanceW(); return; }
  var pl = getFirst(P); if (pl) tryMove(pl, pl.x - 1, pl.y);
}
function moveRight() {
  if (state !== "playing") { advanceW(); return; }
  var pl = getFirst(P); if (pl) tryMove(pl, pl.x + 1, pl.y);
}

onInput("w", function() {
  if (state === "playing") {
    var pl = getFirst(P);
    if (pl) tryMove(pl, pl.x, pl.y - 1);
  } else {
    advanceW();
  }
});
onInput("s", function() {
  if (state === "playing") {
    var pl = getFirst(P);
    if (pl) { if (!checkLore(pl)) tryMove(pl, pl.x, pl.y + 1); }
  } else advanceW();
});
onInput("a", function() {
  if (state !== "playing") { advanceW(); return; }
  var pl = getFirst(P); if (pl) tryMove(pl, pl.x - 1, pl.y);
});
onInput("d", function() {
  if (state !== "playing") { advanceW(); return; }
  var pl = getFirst(P); if (pl) tryMove(pl, pl.x + 1, pl.y);
});
onInput("i", function() { moveUp(); });
onInput("k", function() { moveDown(); });
onInput("j", function() { moveLeft(); });
onInput("l", function() { moveRight(); });

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
        state = "win";
        showWin();
        playTune(tune`200: c5^180, 200: e5^180, 200: g5^180, 200: c6^180, 200: e6^180, 400: g6^350`);
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
