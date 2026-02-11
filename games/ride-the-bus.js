//@title: Ride the Bus
//@author: platoshka

// 1. SPRITE ASSETS 
setLegend(
  ["p", bitmap`
5577222222227755
577..........775
77............77
7..............7
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
7..............7
77............77
577..........775
5577222222227755`],
  ["r", bitmap`
LLLLLLLLLLLLLLLL
L33333333333333L
L33333333333333L
L33333333333333L
L33333333333333L
L33333333333333L
L33333333333333L
L33333333333333L
L33333333333333L
L33333333333333L
L33333333333333L
L33333333333333L
L33333333333333L
L33333333333333L
L33333333333333L
LLLLLLLLLLLLLLLL`], 
  ["b", bitmap`
LLLLLLLLLLLLLLLL
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
LLLLLLLLLLLLLLLL`], 
  ["h", bitmap`
1111111111111111
1111111LL1111111
111111LLLL111111
11111LLLLLL11111
1111LLLLLLLL1111
1111111LL1111111
1111111LL1111111
1111111LL1111111
1111111LL1111111
1111111LL1111111
1111111LL1111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],
  ["l", bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111LL1111111
1111111LL1111111
1111111LL1111111
1111111LL1111111
1111111LL1111111
1111111LL1111111
1111111LL1111111
1111LLLLLLLL1111
11111LLLLLL11111
111111LLLL111111
1111111LL1111111
1111111111111111
1111111111111111`],
  ["i", bitmap`
0000000000000000
0777777777777770
07............70
07..11111111..70
07..11111111..70
07.....11.....70
07.....11.....70
07.....11.....70
07.....11.....70
07.....11.....70
07.....11.....70
07..11111111..70
07..11111111..70
07............70
0777777777777770
0000000000000000`], 
  ["o", bitmap`
0000000000000000
0777777777777770
07............70
07............70
07...111111...70
07..11....11..70
07..1......1..70
07..1......1..70
07..1......1..70
07..1......1..70
07..1......1..70
07..11....11..70
07...111111...70
07............70
0777777777777770
0000000000000000`], 
  ["C", bitmap`
LLLLLLLLLLLLLLLL
L30303030303030L
L03030303030303L
L30303030303030L
L03030303030303L
L30303030303030L
L03030303030303L
L30303030303030L
L03030303030303L
L30303030303030L
L03030303030303L
L30303030303030L
L03030303030303L
L30303030303030L
L03030303030303L
LLLLLLLLLLLLLLLL`]
);

// 2. STATE
let level = 0;
let lastVal = 0;
let secondVal = 0; 
let thirdVal = 0;
let currentReveal = 0; 
let lastCol = "r";
let secondCol = "r";
let thirdCol = "r";

const levels = [
map`
.........
.........
....C....
.........
.........
.r..p..b.
.........`,
map`
.........
.........
....C....
.........
.........
.h..p..l.
.........`,
map`
.........
.........
.C..C..C.
.........
.........
.i..p..o.
.........`,
map`
.........
.........
.C..C..C.
.........
.........
.........
.........`, 
map`
.........
.........
.........
.........
.........
.........
.........`  
];

// 3. UI
function drawUI(showVal = false) {
  clearText();
  addText("RIDE THE BUS", { y: 1, color: "L" });

  if (level === 0) {
    addText("RED OR BLACK?", { y: 3, color: "7" });
    if (showVal) addText(format(lastVal), { y: 5, x: 9, color: "1" });
  } else if (level === 1) {
    addText("HIGHER OR LOWER?", { y: 3, color: "7" });
    addText(format(lastVal), { y: 5, x: 3, color: "1" }); 
    if (showVal) addText(format(currentReveal), { y: 5, x: 10, color: "1" }); 
  } else if (level === 2) {
    addText("INSIDE OR OUTSIDE?", { y: 3, color: "7" });
    addText(format(lastVal), { y: 5, x: 3, color: "1" });
    addText(format(secondVal), { y: 5, x: 9, color: "1" });
    // Moved x to 16 to prevent overlap
    if (showVal) addText(format(thirdVal), { y: 5, x: 16, color: "1" });
  } else if (level === 3) {
    addText("YOU WON THE GAME", { y: 3, color: "3" }); 
    addText(format(lastVal), { y: 5, x: 3, color: "1" });
    addText(format(secondVal), { y: 5, x:9, color: "1" });
    addText(format(thirdVal), { y: 5, x: 16, color: "1" });
    addText("PRESS K TO PLAY AGAIN", { y: 8, color: "0" }); 
  } else if (level === -1) {
    addText("YOU LOST!", { y: 4, color: "1" }); 
    addText("PRESS K TO RESTART", { y: 6, color: "0" }); 
  }
}

function format(v) {
  return v === 11 ? "J" : v === 12 ? "Q" : v === 13 ? "K" : v === 14 ? "A" : v.toString();
}

// 4. LOGIC
function reset() {
  level = 0; lastVal = 0; secondVal = 0; thirdVal = 0; currentReveal = 0;
  setMap(levels[0]);
  drawUI();
}

function loseGame() {
  setTimeout(() => {
    level = -1;
    setMap(levels[4]);
    drawUI();
  }, 1000);
}

onInput("k", () => {
  if (level === 3 || level === -1) {
    reset();
    return;
  }
  
  const p = getFirst("p");
  const tiles = getTile(p.x, p.y);
  
  let card;
  // Level 1 logic targets column 4
  if (level === 0) card = getAll("C").find(c => c.x === 4);
  else if (level === 1) card = getAll("C").find(c => c.x === 4);
  else if (level === 2) card = getAll("C").find(c => c.x === 7);

  if (!card) return;
  
  const cx = card.x; 
  const cy = card.y;
  const val = Math.floor(Math.random() * 13) + 2;
  const col = Math.random() > 0.5 ? "r" : "b";

  if (level === 0) {
    const isRed = tiles.find(t => t.type === "r");
    const isBlack = tiles.find(t => t.type === "b");
    if (!isRed && !isBlack) return;
    
    card.remove();
    addSprite(cx, cy, col); 
    lastVal = val;
    lastCol = col;
    drawUI(true);

    if ((isRed && col === "r") || (isBlack && col === "b")) {
      setTimeout(() => { 
        level = 1; 
        setMap(levels[1]); 
        // Force draw the previous card in its new spot
        addSprite(1, 2, lastCol);
        drawUI(); 
      }, 1000);
    } else {
      loseGame();
    }
  } 
  else if (level === 1) {
    const isHi = tiles.find(t => t.type === "h");
    const isLo = tiles.find(t => t.type === "l");
    if (!isHi && !isLo) return;

    currentReveal = val; 
    secondCol = col;
    card.remove();
    addSprite(cx, cy, col); 
    drawUI(true);

    if ((isHi && val > lastVal) || (isLo && val < lastVal)) {
      setTimeout(() => { 
        secondVal = val; 
        level = 2; 
        setMap(levels[2]); 
        const cs = getAll("C");
        if(cs[0]) cs[0].remove();
        if(cs[1]) cs[1].remove();
        addSprite(1, 2, lastCol);
        addSprite(4, 2, secondCol);
        drawUI(); 
      }, 1000);
    } else {
      loseGame();
    }
  }
  else if (level === 2) {
    const isIn = tiles.find(t => t.type === "i");
    const isOut = tiles.find(t => t.type === "o");
    if (!isIn && !isOut) return;

    thirdVal = val;
    thirdCol = col;
    card.remove();
    addSprite(cx, cy, col); 
    drawUI(true);

    const min = Math.min(lastVal, secondVal);
    const max = Math.max(lastVal, secondVal);

    if ((isIn && val > min && val < max) || (isOut && (val < min || val > max))) {
      setTimeout(() => {
        level = 3;
        setMap(levels[3]);
        const finalCs = getAll("C");
        finalCs.forEach(c => c.remove());
        addSprite(1, 2, lastCol);
        addSprite(4, 2, secondCol);
        addSprite(7, 2, thirdCol);
        drawUI();
      }, 1500);
    } else {
      loseGame();
    }
  }
});

onInput("a", () => { const p = getFirst("p"); if (level >= 0 && level < 3 && p.x > 0) p.x-- });
onInput("d", () => { const p = getFirst("p"); if (level >= 0 && level < 3 && p.x < 8) p.x++ });

setMap(levels[0]);
drawUI();