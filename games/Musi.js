/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started
*/

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}
const button1 = "a"
const button2 = "b"
const button3 = "c"
const button4 = "d"
const marker = "m"
const corner1 = "w"
const corner2 = "x"
const corner3 = "y"
const corner4 = "z"
const faceplate = "p"
const b1s = tune`
500: C4-500,
15500` 
const b2s = tune`
500: D4/500 + D5/500,
15500`
const b3s = tune`
500: E4^500 + E5^500,
15500`
const b4s = tune`
500: F4-500 + F5-500,
15500`
var c1 = getRndInteger(1, 5)
var c2 = getRndInteger(1, 5)
var c3 = getRndInteger(1, 5)
var c4 = getRndInteger(1, 5)
var a1 = 0
var a2 = 0
var a3 = 0
var a4 = 0
var an = 1
const wt = tune`
37.5: C4-37.5 + C5/37.5,
37.5: D4/37.5 + D5-37.5,
37.5: E4-37.5 + E5/37.5,
37.5: F4/37.5 + F5-37.5,
37.5: G4-37.5 + G5/37.5,
37.5: A4/37.5 + A5-37.5,
37.5: B4-37.5 + B5/37.5,
37.5: C5/37.5,
900`
const lt = tune`
37.5: C4-37.5,
37.5: C4-37.5 + D4-37.5,
37.5: C4-37.5,
37.5: C4-37.5 + D4-37.5,
37.5: C4-37.5,
1012.5`

setLegend(

  [ button1, bitmap`
L111111111111111
L333333333333331
L333333333333331
L333333333333331
L333333333333331
L333333888333333
L333338888333331
L333388888333333
L333338888333333
L333333888333331
L333333333333333
L333333333333331
L333333333333331
L333333333333331
L333333333333331
L111111111111111`],
  [ button2, bitmap`
111111111111111L
1DDDDDDDDDDDDDDL
1DDDDDDDDDDDDDDL
1DDDDDDDDDDDDDDL
1DDDDDDDDDDDDDDL
DDDDDD444DDDDDDL
1DDDDD4444DDDDDL
DDDDDD44444DDDDL
DDDDDD4444DDDDDL
1DDDDD444DDDDDDL
DDDDDDDDDDDDDDDL
1DDDDDDDDDDDDDDL
1DDDDDDDDDDDDDDL
1DDDDDDDDDDDDDDL
1DDDDDDDDDDDDDDL
111111111111111L`],
  [ button3, bitmap`
1111151551511111
1555555555555551
1555555555555551
1555555555555551
1555555555555551
1555555555555551
1555577777555551
1555577777555551
1555577777555551
1555557775555551
1555555755555551
1555555555555551
1555555555555551
1555555555555551
1555555555555551
LLLLLLLLLLLLLLLL`],
  [ button4, bitmap`
LLLLLLLLLLLLLLLL
1HHHHHHHHHHHHHH1
1HHHHHHHHHHHHHH1
1HHHHHHHHHHHHHH1
1HHHHHHHHHHHHHH1
1HHHHHH8HHHHHHH1
1HHHHH888HHHHHH1
1HHHH88888HHHHH1
1HHHH88888HHHHH1
1HHHH88888HHHHH1
1HHHHHHHHHHHHHH1
1HHHHHHHHHHHHHH1
1HHHHHHHHHHHHHH1
1HHHHHHHHHHHHHH1
1HHHHHHHHHHHHHH1
11111H1HH1H11111`],
  [ marker, bitmap`
2222222222222222
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2222222222222222`],
  [ corner1, bitmap`
0000000000000000
02HHHHHHHHHHHHHH
032LLLLLLLLLLLLL
03L1HHHHHHHHHHHH
03L3111111111111
03L31LLLLLLLLLLL
03L31LLLLLLLLLLL
03L31LLLLLLLLLLL
03L31LLLLLLLLLLL
03L31LLLLLLLLLLL
03L31LLLLLLLLLLL
03L31LLLLLLLLLLL
03L31LLLLLLLLLLL
03L31LLLLLLLLLLL
03L31LLLLLLLLLLL
03L31LLLLLLLLLLL`],
  [ corner2, bitmap`
0000000000000000
HHHHHHHHHHHHHH20
LLLLLLLLLLLLL2D0
HHHHHHHHHHHH1LD0
111111111111DLD0
LLLLLLLLLLL1DLD0
LLLLLLLLLLL1DLD0
LLLLLLLLLLL1DLD0
LLLLLLLLLLL1DLD0
LLLLLLLLLLL1DLD0
LLLLLLLLLLL1DLD0
LLLLLLLLLLL1DLD0
LLLLLLLLLLL1DLD0
LLLLLLLLLLL1DLD0
LLLLLLLLLLL1DLD0
LLLLLLLLLLL1DLD0`],
  [ corner3, bitmap`
03L31LLLLLLLLLLL
03L31LLLLLLLLLLL
03L31LLLLLLLLLLL
03L31LLLLLLLLLLL
03L31LLLLLLLLLLL
03L31LLLLLLLLLLL
03L31LLLLLLLLLLL
03L31LLLLLLLLLLL
03L31LLLLLLLLLLL
03L31LLLLLLLLLLL
03L31LLLLLLLLLLL
03L3111111111111
03L1555555555555
032LLLLLLLLLLLLL
0255555555555555
0000000000000000`],
  [ corner4, bitmap`
LLLLLLLLLLL1DLD0
LLLLLLLLLLL1DLD0
LLLLLLLLLLL1DLD0
LLLLLLLLLLL1DLD0
LLLLLLLLLLL1DLD0
LLLLLLLLLLL1DLD0
LLLLLLLLLLL1DLD0
LLLLLLLLLLL1DLD0
LLLLLLLLLLL1DLD0
LLLLLLLLLLL1DLD0
LLLLLLLLLLL1DLD0
111111111111DLD0
5555555555551LD0
LLLLLLLLLLLLL2D0
5555555555555520
0000000000000000`],
  [ faceplate, bitmap`
LLLL1H1HH1H1LLLL
LLLL1H1HH1H1LLLL
LLLL1H1HH1H1LLLL
LLLL1H1HH1H1LLLL
11111H1HH1H11111
333336FHHF644444
11111FFHHFF11111
3333333004444444
3333333004444444
11111FF55FF11111
333336F55F644444
1111151551511111
LLLL15155151LLLL
LLLL15155151LLLL
LLLL15155151LLLL
LLLL15155151LLLL`]
  
  
)

setSolids([])

let level = 0
const levels = [
  map`
wdx
apb
ycz`
]

setMap(levels[level])


function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
function RndCode() {
  c1 = getRndInteger(1, 5)
  c2 = getRndInteger(1, 5)
  c3 = getRndInteger(1, 5)
  c4 = getRndInteger(1, 5)
  
  if (c1 == 1) {
    playTune(b1s)
    addSprite(1,1, marker)
  } else if (c1 == 2) {
    playTune(b2s)
  } else if (c1 == 3) {
    playTune(b3s)
  } else if (c1 == 4) {
    playTune(b4s)
  }
  sleep(300)
  if (c2 == 1) {
    playTune(b1s)
  } else if (c2 == 2) {
    playTune(b2s)
  } else if (c2 == 3) {
    playTune(b3s)
  } else if (c2 == 4) {
    playTune(b4s)
  }
  sleep(300)
  if (c3 == 1) {
    playTune(b1s)
  } else if (c3 == 2) {
    playTune(b2s)
  } else if (c3 == 3) {
    playTune(b3s)
  } else if (c3 == 4) {
    playTune(b4s)
  }
  sleep(300)
  if (c4 == 1) {
    playTune(b1s)
  } else if (c4 == 2) {
    playTune(b2s)
  } else if (c4 == 3) {
    playTune(b3s)
  } else if (c4 == 4) {
    playTune(b4s)
  }
}
RndCode()
function ea(n) {
  if (an == 1) {
        a1 = n
        an += 1
    } else if (an == 2) {
        a2 = n
        an += 1
    } else if (an == 3) {
        a3 = n
        an += 1
    } else if (an == 4) {
        a4 = n
        an += 1
    }
   
}
function resetvars() {
      a1 = 0
      a2 = 0
      a3 = 0
      a4 = 0
      c1 = 0
      c2 = 0
      c3 = 0
      c4 = 0

  
}
function check() {
  if (an == 5) {
    if (a1 == c1 && a2 == c2 && a3 == c3 && a4 == c4) {

      an = 1
      resetvars();
      sleep(500)
      RndCode();

      
    } else {
    an = 1
    sleep(100)
    playTune(lt);
    }
  }
}

onInput("w", () => {
  playTune(b3s);
  ea(3)
  check();



})
onInput("s", () => {
  playTune(b4s);
  ea(4)
  check();

})
onInput("a", () => {
  playTune(b1s);
  ea(1)
  check();

})
onInput("d", () => {
  playTune(b2s);
  ea(2)
  check();
})
afterInput(() => {

})
