// TERMINAL HACKER: Mr. Moshu
// Controls: W-A-S-D to move, I to Restart Level.

setLegend(
  ["p", bitmap`
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
  ["w", bitmap`
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
  ["v", bitmap`
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
  ["d", bitmap`
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
  ["k", bitmap`
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
  ["f", bitmap`
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
  ["z", bitmap`
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
w.......d...w
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
wwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwww
w............pw
w..wwwwwwwwww.w
w..w........wfw
w..w.wvvvw....w
wf.w.v...vwww.w
w..w.v.k....w.w
w..w.v...v..w.w
w..w.wvvvw..w.w
w..w........w.w
w.fwwwwwwwwww.w
w.............w
wwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwww
w.d.ww......d.w
w...fw...wf...w
w.k....pww..k.w
w......www....w
w...f.wwwwf...w
w.d....z....d.w
wwwwwwwwwwwwwww`
];

let currentLevel = 0;

function setupLevel() {
  setMap(levels[currentLevel]);
  getAll("f").forEach((f, i) => {
    if (i % 2 === 0) { f.vx = 1; f.vy = 0; }
    else { f.vx = 0; f.vy = 1; }
  });
}

setupLevel();

onInput("w", () => { const p = getFirst("p"); if(p && !getTile(p.x, p.y-1).some(t=>["w","v"].includes(t.type))) p.y -= 1; });
onInput("s", () => { const p = getFirst("p"); if(p && !getTile(p.x, p.y+1).some(t=>["w","v"].includes(t.type))) p.y += 1; });
onInput("a", () => { const p = getFirst("p"); if(p && !getTile(p.x-1, p.y).some(t=>["w","v"].includes(t.type))) p.x -= 1; });
onInput("d", () => { const p = getFirst("p"); if(p && !getTile(p.x+1, p.y).some(t=>["w","v"].includes(t.type))) p.x += 1; });
onInput("i", () => setupLevel());

setInterval(() => {
  getAll("f").forEach(f => {
    let nx = f.x + (f.vx || 0);
    let ny = f.y + (f.vy || 0);
    if (nx < 0 || nx >= width() || ny < 0 || ny >= height() || getTile(nx, ny).some(t => ["w", "v", "k", "z"].includes(t.type))) {
      f.vx *= -1; f.vy *= -1;
    } else { f.x = nx; f.y = ny; }
  });
  const p = getFirst("p");
  if(p && getTile(p.x, p.y).some(t=>t.type === "f")) setupLevel();
}, 350); 

afterInput(() => {
  const p = getFirst("p");
  if (!p) return;

  getTile(p.x, p.y).forEach(t => {
    if (t.type === "z") { 
      alert("SYSTEM VIRUS!"); 
      currentLevel = 0; 
      setupLevel(); 
    }
    
    if (t.type === "d") t.remove();
    
    if (t.type === "k") {
      if (getAll("d").length > 0) {
        alert("ACCESS DENIED: Data cubes required.");
        p.y += 1;
      } else {
        // LEVEL 5: MIRROR SYSTEM LOGIC
        if (currentLevel === 4) {
          if (p.x < 7) { 
            alert("TRAP DETECTED! SYSTEM WIPED.");
            currentLevel = 0;
            setupLevel();
          } else {
            alert("Hint: You take over the system, what are you now? (5 letters)");
            const pass = prompt("FINAL DECRYPTION KEY:");
            if (pass && pass.toLowerCase() === "owner") {
              alert("✓ SYSTEM OVERRIDDEN\nYOU ARE THE NEW OWNER.");
              alert("THE END.");
              currentLevel = 0; 
              setupLevel();
            } else { 
              alert("✖ WRONG"); 
              p.y += 1; 
            }
          }
        } else {
          // köhnə səviyyələrin məntiqi (0, 1, 2, 3)
          const hints = [
            "Hint: Administrator (5)", "Hint: Core Access (4)", 
            "Hint: You are a Hac... (6)", "Hint: Linux command (4)"
          ];
          const codes = ["admin", "root", "hacker", "sudo"];
          
          alert(hints[currentLevel]);
          const pass = prompt("PASSWORD:");
          if (pass && pass.toLowerCase() === codes[currentLevel]) {
            currentLevel++;
            setupLevel();
          } else { 
            p.y += 1; 
          }
        }
      }
    }
  });
});