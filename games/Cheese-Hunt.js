/*
@title: Cheese-Hunt
@author: Sophia E
@tags: ['puzzle']
@addedOn: 2024-04-15
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

*/

const player = "p";
const box = "b";
const decoy = "d";
const cheese = "c";
const floor = "f";
const playerCheese = "r";
const trap = "t";
const entertunnel = "e";
const exittunnel = "x";
const wall = "w";
const bigTrap = "q";

const hit = tune `
146.34146341463415: A5^146.34146341463415,
146.34146341463415: B5^146.34146341463415,
4390.243902439024`;
const errorHit = tune `
133.33333333333334: C4/133.33333333333334 + D4/133.33333333333334,
133.33333333333334: D4/133.33333333333334 + C4/133.33333333333334,
4000.0000000000005`;
const trapHit = tune `
103.44827586206897: D4-103.44827586206897 + C4/103.44827586206897 + A5/103.44827586206897 + B5-103.44827586206897,
103.44827586206897: E4-103.44827586206897 + C4/103.44827586206897 + B5/103.44827586206897 + A5-103.44827586206897,
103.44827586206897: D4-103.44827586206897 + C4/103.44827586206897 + A5/103.44827586206897 + B5-103.44827586206897,
103.44827586206897: E4-103.44827586206897 + C4/103.44827586206897 + B5/103.44827586206897 + A5-103.44827586206897,
103.44827586206897: D4-103.44827586206897 + C4/103.44827586206897 + A5/103.44827586206897 + B5-103.44827586206897,
2793.1034482758623`;
const tunnelSound = tune `
84.26966292134831: A4^84.26966292134831 + B4-84.26966292134831,
84.26966292134831: E4^84.26966292134831 + F4-84.26966292134831,
84.26966292134831: G4^84.26966292134831 + A4-84.26966292134831,
84.26966292134831: C5^84.26966292134831 + D5-84.26966292134831,
2359.550561797753`;

setLegend(
  [ player, bitmap`
................
..000......000..
.01110....01110.
.01LL100001LL10.
.01LL111111LL10.
..011111111110..
...0101111010...
8..0101111010...
88.0111881110...
.88.00000000....
..80111111110...
..011118811110..
..010188881010..
...0018888100...
....01100110....
....000..000....` ],
  [ playerCheese, bitmap`
................
..000......000..
.01110....01110.
.01LL100001LL10.
.01LL111111LL10.
..011111111110..
...0101111010...
8..0101111010...
88.0111881110...
.88.00000000....
..80111111110...
..0111188169969.
..0101888896669.
...001888866966.
....01100169669.
....000..000....` ],
  [ box, bitmap `
................
.00000000000000.
.0110CCCCCC0110.
.01CC0CCCC0CC10.
.00CCC0CC0CCC00.
.0C0CCC00CCC0C0.
.0CC0CCC0CC0CC0.
.0CCC0CCC00CCC0.
.0CCC00CCC0CCC0.
.0CC0CC0CCC0CC0.
.0C0CCC00CCC0C0.
.00CCC0CC0CCC00.
.01CC0CCCC0CC10.
.0110CCCCCC0110.
.00000000000000.
................`],
  [ decoy, bitmap `
................
.00000000000000.
.0110CCCCCC0110.
.01CC0CCCC0CC10.
.00CCC0CC0CCC00.
.0C0CCC00CCC0C0.
.0CC0CCC0CC0CC0.
.0CCC0CCC00CCC0.
.0CCC00CCC0CCC0.
.0CC0CC0CCC0CC0.
.0C0CCC00CCC0C0.
.00CCC0CC0CCC00.
.01CC0CCCC0CC10.
.0110CCCCCC0110.
.00000000000000.
................`],
  [ cheese, bitmap`
................
................
................
................
...9999.........
..96666999......
..9669666699....
..99966666669...
..96699999999...
..96666666669...
..96666696669...
..96966666969...
..96666666669...
..9999999999....
................
................` ],
  [ floor, bitmap `
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
C9999999C999999C
CCCCCCCCCCCCCCCC
C999C999999C999C
CCCCCCCCCCCCCCCC
C9999999C999999C
CCCCCCCCCCCCCCCC
C999C999999C999C
CCCCCCCCCCCCCCCC
C9999999C999999C
CCCCCCCCCCCCCCCC
C999C999999C999C
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [ trap, bitmap`
.........0......
........090.....
.......09990....
......0996690...
.....099969690..
....09919L66990.
...09919L9999CC0
..09919L9199CC0.
.09911L9199CC0..
.0C9911199CC0...
.0CC99199CC0....
..0CC999CC0.....
...0CC9CC0......
....0CCC0.......
.....000........
................` ],
  [ entertunnel, bitmap`
................
.....000000.....
...0099999900...
..099CCCCCC990..
..09CC9CCCCC90..
.09CC9CCCCCCC90.
.09C9CCCCC9CC90.
.09CCCCCCCCCC90.
.09C9CCCCCC9C90.
.09CCCCCC9CCC90.
.09CCCC9CC9CC90.
..09CC9C9CCC90..
..099CCCCCC990..
...0099999900...
.....000000.....
................` ],
  [ exittunnel, bitmap`
................
.....000000.....
...0099999900...
..099CCCCCC990..
..09CC9CCCCC90..
.09CC9CCCCCCC90.
.09C9CCCCC9CC90.
.09CCCCCCCCCC90.
.09C9CCCCCC9C90.
.09CCCCCC9CCC90.
.09CCCC9CC9CC90.
..09CC9C9CCC90..
..099CCCCCC990..
...0099999900...
.....000000.....
................` ],
  [ wall, bitmap`
1111111111111111
1111111111111111
1122111111112211
1122111111112211
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1122111111112211
1122111111112211
1111111111111111
1111111111111111` ],
  [ bigTrap, bitmap`
................
.....0....0.....
....010..010....
...01LL00LL10...
.0.0LLLLLLL10.0.
0101LL0000LL1010
0LLL00....00LLL0
00L0........0L00
010..........010
010...0..0...010
0120.020020.0210
.01101122110110.
.01111111111110.
..001110011100..
....000..000....
................` ],

)

setSolids([player, wall]);

let level = 0
const levels = [
  map`
  pb...
  .....
  ...d.
  .d...
  .....`,
  map `
.p.d.
.....
.d.t.
..tb.
.....`,
  map `
p.w.x.
..w...
e.wb.d
..w...
.tw.d.`,
  map `
ptewx.
...w.d
w.wwd.
b..w..
..dwww`,
  map `
..b..
.q.q.
..q..
.q.q.
..p..`,
  map `
.b....
d..d..
wwwww.
qqwqqd
xdwqep`,
  map`
ed.p
qq..
wwww
bd.x`,
  map `
.dwpwd.
.ww.ww.
.......
.wwwww.
.b.w.d.`,
  map `
p......
www.ww.
b.t.weq
.ww.w.w
.ww.t.w
.xw...w`,
  map `
ddddddd
ddddddd
dddpddd
ddddddd
dbddddd`

]

const currentLevel = levels[level];
setMap(currentLevel);


setBackground(floor);

setPushables({
  [ player ]: []
})

// inputs for player movement control
onInput("s", () => {
  getFirst(player).y += 1; // positive y is downwards
});

onInput("d", () => {
  getFirst(player).x += 1;
});

onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});

onInput("k", () => {
  if(checkNext()) {
  
    const position = [getFirst(box).x , getFirst(box).y]

    clearTile(position[0], position[1]);
    addSprite(position[0], position[1], player);
    addSprite(position[0] + 1, position[1], cheese);


    playTune(hit);
    setTimeout(() => {
      checkCheese();
    }, 1600);
  } else {

    const decoyTiles = tilesWith(decoy);
    const decoyTile = decoyTiles[0];

    // console.log(decoyTile[0].x);
    decoyTiles.forEach(checkDecoy);

    function checkDecoy(decoy) {
      if ((getFirst(player).x === decoy[0].x) && (getFirst(player).y === decoy[0].y)) {
        playTune(errorHit);
        clearTile(getFirst(player).x, getFirst(player).y);
        addSprite(decoy[0].x, decoy[0].y, player);
      }
    }
  }
});

function checkNext() {
  let boxPosition = tilesWith(box);
  boxPosition = boxPosition[0]
  boxPositionX = boxPosition[0].x;
  boxPositionY = boxPosition[0].y;

  // console.log(boxPosition[0].x);

  if ((getFirst(player).x === boxPositionX) && (getFirst(player).y === boxPositionY)) {
    return true;
  } else {
    return false;
  }
}

function checkCheese() {

    level = level + 1;
    const currentLevel = levels[level];

    if (currentLevel !== undefined) {
      setMap(currentLevel);

    } else {
      addText("Congrats! you win!", { y: 4, color: color`2` });
    }
}

function checkTrap() {
  const traps = tilesWith(trap);
  // console.log(traps);


  traps.forEach(trapLoop);

  function trapLoop(trap) {
    if ((getFirst(player).x === trap[0].x) && (getFirst(player).y === trap[0].y)) {
      const currentLevel = levels[level]; // get the original map of the level

      // make sure the level exists before we load it
      if (currentLevel !== undefined) {
        clearText("");
        setMap(currentLevel);
        playTune(trapHit);
      }
    }
  }
}

function checkTunnel() {
  const enterLocation = getFirst(entertunnel);
  const exitLocation = getFirst(exittunnel);

  if ((getFirst(player).x === enterLocation.x) && (getFirst(player).y === enterLocation.y)) {
    getFirst(player).x = exitLocation.x;
    getFirst(player).y = exitLocation.y;
    playTune(tunnelSound);
  }

  else if ((getFirst(player).x === exitLocation.x) && (getFirst(player).y === exitLocation.y)) {
    getFirst(player).x = enterLocation.x;
    getFirst(player).y = enterLocation.y;
    playTune(tunnelSound);
  }
}

function bigTrapCheck() {
  const traps = tilesWith(bigTrap);
  // console.log(traps);


  traps.forEach(trapLoop);

  function trapLoop(trap) {
    if ((getFirst(player).x === trap[0].x) && (getFirst(player).y === trap[0].y)) {
      level = level - 1;

      const currentLevel = levels[level]; // get the original map of the level


      // make sure the level exists before we load it
      if (currentLevel !== undefined) {
        clearText("");
        setMap(currentLevel);
        playTune(trapHit);
      }
    }
  }

}

afterInput(() => {
  if ((level === 1) || (level === 2) || (level === 3) || (level === 8)) {
    checkTrap();
  }
  if ((level === 2) || (level === 3) || (level === 5) || (level ===6) || (level === 8)) {
    checkTunnel();
  }
  if ((level === 4) || (level === 5) || (level ===6) || (level === 8)) {
    bigTrapCheck();
  }

})
