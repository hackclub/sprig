// @title: Health_Bar_Tutorial
// @author: Hugh Wilks

// I needed to make a health bar for a game I was making and it was a bit
// difficult to figure out due to some very specific rules when making sprites.
// Probably because the sprite is being redefined, there can't be any other sprites 
// on the same tile as the health bar or they'll cover it up. You can use 
// setBackground() to get around it. 
// There is probably a better way to do this, but here's what I came up with:

const healthBar = "a";
const bg = "b";
const otherSprite = "c";
const cutout = "d";

setLegend(
  [ healthBar, bitmap`
................
................
................
................
................
4444444444444444
4444444444444444
4444444444444444
4444444444444444
................
................
................
................
................
................
................` ],
  [ cutout, bitmap`
5555555555555555
5577555555555555
5755755555775555
5555555557557555
5555555555555555
5555555555555555
................
................
5555555555555555
5555555555555555
5557755555555555
5575575555555555
5555555555555555
5555555557755555
5555555575575555
5555555555555555` ],
  [ otherSprite, bitmap`
................
....33333333....
...33......33...
..3.........33..
.33........3.33.
.3........3...3.
.3.......3....3.
.3......3.....3.
.3.....3......3.
.3....3.......3.
.3...3........3.
.33.3........33.
..33.........3..
...33......33...
....33333333....
................` ],
  [ bg, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDD0DDDDD0DD
DDDDDDDDDDDDDDDD
DDD0DDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDD0DDDDDDD0DD
DDDDDDDDD0DDDDDD
D0DDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDD0DDDD
DDDDDDDDDDDDDDDD
DDDDD0DDDDDDDDDD
DDDDDDDDDDDDDDDD
DD0DDDDDDDDDDD0D
DDDDDDDDDDDDDDDD` ]
);

setBackground(bg);

let level = 0;
const levels = [
  map`
.`,
];

setMap(levels[level]);

// You can test other sprites on the same tile:
// addSprite(0, 0, otherSprite);
// It will always end up in front, but it still works, so you can use it if
// you want. For example... (comment the otherSprite line)
// addSprite(0, 0, cutout);
// Since the cutout sprite has a cutout, you can still see some of the bar

function leng(chr, len) {
  // This is a helper function for the change() method
  let res = ``;
  while (len > 0) {
    res += chr;
    len -= 1;
  }
  return res
}

// The max health this bar can support is 16, but since the function
// changes health before setting the bar, this line is fine.
let health = 17;

function change() {
  // Right now it just cycles, but you can set health from to 0 to 16
  // This is a fancy way of saying health-=1 except it restarts when it's done
  health += 16;
  health %= 17;
  // Random health
  //health = Math.floor(Math.random()*15);
  
  // This line is fancy, it basically makes the last character (1 in this case) the
  // empty bar color, the first character (4) the full bar color, and the middle
  // one (2) is what's added to the second number to make the "almost empty" color.
  // For example, 4 (first) + 2 (middle) = 6 (yellow)
  
  //           (first)                     (middle)           (last)
  let temp = leng(4+Math.floor((16-health)/11)*2, health) + leng(1, 16-health);
  // For a constant color bar:
  // let temp = leng(4, health) + leng(1, 16-health);
  let temp2 = `
................
................
................
................
................
` +  temp  +   `
` +  temp  +   `
` +  temp  +   `
` +  temp  +   `
................
................
................
................
................
................
................`;
  
  // This redefines what the bar looks like
  setLegend([ healthBar, temp2 ]);
  
  addSprite(0, 0, healthBar);
}

change(); // This line makes sure the bar starts as soon as the program does
let interval = setInterval(change, 500); // This line makes it loop

// Feel free to use this in your projects!
