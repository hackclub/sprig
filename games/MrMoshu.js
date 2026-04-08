/*
@title: Mr. Moshu
@author: Jamally Emin
@description: A terminal-themed hacker puzzle game.
@tags: ["hacker", "puzzle", "terminal"]
@addedOn: 2026-04-07
*/
const p = "p";
const w = "w";
const v = "v";
const d = "d";
const k = "k";
const f = "f";
const z = "z";

setLegend(
  [p, bitmap`
....00000000....
...00LLLLLL00...
...0LL00011L0...
..00L000001100..
..0L03300331L0..
..0L0000000110..
..0L0000000110..
..00L000000L00..
...00L0000L00...
....00L1L100....
...00L11L1L0....
..00LLLLL1LL00..
.00LLLLLL11LL00.
.0LLLLLLLLLLLL0.
.0LLLLLLLLLLLL0.
.00000000000000.`], 
  [w, bitmap`
0000000000000000
0777777777777770
0700000000000070
0703300000220070
0703300000220070
0700000000000070
0700000000000070
0700000000000070
0703300000000070
0703300000000070
0700000000000070
0700000000000070
0700000000000070
0700000000000070
0777777777777770
0000000000000000`],
  [v, bitmap`
0LLLLLLLLLLLLLL0
LLLLLLLLLLLLLLLL
L66L66L66L7L111L
LLLLLLLLLLLLLLLL
0LLLLLLLLLLLLLL0
0000000000000000
0LLLLLLLLLLLLLL0
L1L1L1LLLLLLLLLL
L1L1L1L7L7L7L6LL
L1L1L1LLLLLLLLLL
0LLLLLLLLLLLLLL0
0000000000000000
0LLLLLLLLLLLLLL0
L66L66L66L77LLLL
L66L66L66L77LLLL
0LLLLLLLLLLLLLL0`],
  [d, bitmap`
.D...D..D..D....
D.D.DD.DD.D.D...
D.D..D..D.D.D...
D.D..D..D.D.D...
.D...D..D..D....
................
................
.D...D...D...D..
D.D.D.D.D.D.DD..
D.D.D.D.D.D..D..
D.D.D.D.D.D..D..
.D...D...D...D..
................
................
................
................`],
  [k, bitmap`
...0000000000...
..011111111110..
.01000000000010.
.010DD00D000010.
.01D000D0D00010.
.01D000000D0010.
.010DD0D000D010.
.01000000000010.
.01000000000010.
.01000000000010.
.01111111111110.
..000LLLLLL000..
..011111111110..
.01LL1LLLLLLL10.
0111111111111110
0000000000000000`],
  [f, bitmap`
.00033333333000.
0033333333333300
0333333333333330
0333003333003330
3330003333000333
3300003333000033
3300003333000033
3333333333333333
3333330000333333
3333300000033333
3333000330003333
0330003333000330
0030033333300300
.03333333333330.
..000333333300..
....00000000....`],
  [z, bitmap`
.D...D..D...D...
D.D.DD.D.D.D.D..
D.D..D.D.D.D.D..
D.D..D.D.D.D.D..
.D...D..D...D...
................
................
.D..D..D...D....
DD.DD.D.D.D.D...
.D..D.D.D.D.D...
.D..D.D.D.D.D...
.D..D..D...D....
................
................
................
................`],
);

const levels = [
  map`
vwvwvwvwvvwvvv
w..........d.w
w..p.........v
w......d.w...w
v........w...v
w.wvwwvwww...w
v.d.wk.......v
w...w........w
vwvvwvwvwvwvwv`,
  map`
wwwwwwwwwwwww
w.k........dw
w...wwwwwww.w
w...w.....w.w
w.p.w..z....w
w...w.....w.w
w...wwwwwwwww
w-------d---w
wwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwww
wp.wdw....z.wkw
w..w.ww.www.w.w
w.....w..fw...w
w..wwwwwwww.www
w...w..w..d...w
w.www.fw..www.w
w.w.........w.w
w.w.wwwwwww.w.w
w.w.dw....w.w.w
w.wwww.w.ww.w.w
w......w....wdw
wwwwwwwwwwwwwww`
];

let currentLevel = 0;

function setupLevel() {
  setMap(levels[currentLevel]);
}

setupLevel();

onInput("w", () => { const p = getFirst("p"); if(p) p.y -= 1; });
onInput("s", () => { const p = getFirst("p"); if(p) p.y += 1; });
onInput("a", () => { const p = getFirst("p"); if(p) p.x -= 1; });
onInput("d", () => { const p = getFirst("p"); if(p) p.x += 1; });
onInput("i", () => setupLevel());

afterInput(() => {
  const p = getFirst("p");
  if (!p) return;

  getTile(p.x, p.y).forEach(t => {
    if (t.type === "z") { 
      currentLevel = 0; 
      setupLevel(); 
    }
    
    if (t.type === "d") t.remove();
    
    if (t.type === "k") {
      if (getAll("d").length === 0) {
        currentLevel++;
        if (currentLevel >= levels.length) {
            addText("VICTORY", { y: 10, color: [255, 255, 255] });
        } else {
            setupLevel();
        }
      }
    }
  });
});
