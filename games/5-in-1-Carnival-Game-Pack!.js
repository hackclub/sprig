/*
@title: 5-in-1 Carnival Game Pack!
@author: Ada Dyer
@tags: []
@addedOn: 2023-01-07

This game was made so you wouldn't have to upload something to your Sprig every time you want to play something different - but sadly, the Sprig doesn't take files this large. :'(

Use WASD to move, and J to exit any game. In the piano game, press L to play a selected note.

Thanks to:
snow - "Racer"
Logan Fick - "BRICK DODGER"
Akeell - "Music!"
PerrinPerson - "Zooter"

*/


var px = 1;
var py = 1;
var mapNat = [];
//LIB
function getMapV2(){
  var map = [];
  for(var i = 0; i < height(); i++){
    map.push([]);
    for(var j = 0; j < width(); j++){
      map[i].push([]);
      var tile = getTile(j, i);
      for(var k = 0; k < tile.length; k++){
        map[i][j].push(tile[k].type);
      }
    }
  }
  return map;
}
function setMapV2(map){
  var tempMap = "";
  for(var i = 0; i < map.length; i++){
    for(var j = 0; j < map[i].length; j++){
      tempMap += ".";
    }
    tempMap += "\n";
  }
  setMap(tempMap);
  for(var i = 0; i < map.length; i++){
    for(var j = 0; j < map[i].length; j++){
      for(var k = 0; k < map[i][j].length; k++){
        addSprite(j, i, map[i][j][k]);
      }
    }
  }
}
function trimMapV2(x, y, w, h, map){
  var map2 = [];
  var mapWidth = map[0].length;
  var mapHeight = map.length;
  x = Math.max(Math.min(mapWidth-w, x), 0);
  y = Math.max(Math.min(mapHeight-h, y), 0);
  for(var i = 0; i < h; i++){
    map2.push([]);
    for(var j = 0; j < w; j++){
      map2[i].push([]);
      for(var k = 0; k < map[i+y][j+x].length; k++){
        map2[i][j].push(map[i+y][j+x][k]);
      }
    }
  }
  return map2;
}
// end LIB

// Let the games begin! 

class RaceGame {
  constructor() {}

  startGame() {
    setBackground(asphalt);
    addText("Racer", {color: color`3`})

    self.spawnCones = setInterval(() => {
        let cones = getAll(cone)

        if (cones.length < 7) {
          addSprite(0, Math.floor(Math.random() * 5), "^")
        }

        for (let c = 0; c < cones.length; c++) {
          if (cones[c].x > 8) {
            clearTile(cones[c].x, cones[c].y)
          } else {
            cones[c].x += 1
          }
        }
      }, 200)
  }
  
  endGame() {
    clearText()
    setBackground(bg);
    clearInterval(self.spawnCones)
  }

  onW() {
    getFirst(car).y -= 1
  }

  onS() {
    getFirst(car).y += 1
  }

}

class WhackOrpheus {
  constructor() {}

  startGame() {
    addText("Whack Orpheus!", {color: color`H`})
    addSprite(0, 0, "s")
    addSprite(Math.floor(Math.random() * 5), Math.floor(Math.random() * 3), "o")

    self.moveOrphy = setInterval(() => {
      let o = getFirst(orpheus)
      let i = getTile(o.x, o.y)

      o.x = Math.floor(Math.random() * 5)
      o.y = Math.floor(Math.random() * 3)
      
      if (i[0]) {
        // console.log(i)
        if (i[0]._type == "s") {
          addText("You caught him!", {color: color`H`})
          setTimeout(()=> {
            clearText()
            addText("Whack Orpheus!", {color: color`H`})
          }, 1000)
        }
      }
      
    }, 500)
  }
  
  endGame() {
    clearText()
    clearInterval(self.moveOrphy)
  }

  onW() {
    getFirst(selector).y -= 1
  }

  onS() {
    getFirst(selector).y += 1
  }

  onA() {
    getFirst(selector).x -= 1
  }

  onD() {
    getFirst(selector).x += 1
  }

}

class Piano {
  constructor() {}

  startGame() {
    setBackground(table);
    addText("Piano", {color: color`2`})
    addSprite(1, 1, "u")

    self.song = ""
  }

  recordNote() {
    let s = getFirst(selector2)
    let i = getTile(s.x, s.y)

    // console.log(i)
    
    if (i[0]._type == "3") {
        playTune(a)
        self.song += "a"
      } else if (i[0]._type == "4") {
        playTune(b)
        self.song += "b"
      } else if (i[0]._type == "5") {
        playTune(c)
        self.song += "c"
      } else if (i[0]._type == "6") {
        playTune(d)
        self.song += "d"
      } else if (i[0]._type == "7") {
        playTune(e)
        self.song += "e"
      } 

      if (i[1]) {
        if (i[1]._type == "r") {
          for (let i = 0; i < self.song.length; i ++) {
            setTimeout(() => {
              let n = self.song[i]
              if (n == "a") {
                playTune(a)
              } else if (n == "b") {
                playTune(b)
              } else if (n == "c") {
                playTune(c)
              } else if (n == "d") {
                playTune(d)
              } else if (n == "e") {
                playTune(e)
              }
            }, 300 * i)
          }
        }
      }
  }

  endGame() {
    clearText()
    setBackground(bg);
  }
  
  onW() {
    getFirst(selector2).y -= 1
  }

  onS() {
    getFirst(selector2).y += 1
  }

  onA() {
    getFirst(selector2).x -= 1
  }

  onD() {
    getFirst(selector2).x += 1
  }
}

class ZombieShooter {

  constructor() {}
  
  startGame() {
    setBackground(asphalt);
    addText("Zombie Shooter", {color: color`2`})

    self.spawnZomb = setInterval(() => {
        let zomb = getAll(zombie)
        let bull = getAll(bullet)

        if (zomb.length < 10) {
          addSprite(10, Math.floor(Math.random() * 7), "z")
        }


        for (let z = 0; z < zomb.length; z++) {
          if (zomb[z].x < 1) {
            clearTile(zomb[z].x, zomb[z].y)
          } else {
            let changeItUp = Math.random()
            if (changeItUp < 0.6) {
              zomb[z].x -= 1
            } else if (0.6 < changeItUp < 0.8) {
              zomb[z].y += 1
            } else if (0.8 < changeItUp < 1) {
              zomb[z].y -= 1
            } 
          }
        }

        for (let b = 0; b < bull.length; b++) {
          let i = getTile(bull[b].x, bull[b].y)
          if (i[0]) {
            if (i[0]._type == "z") {
              clearTile(bull[b].x, bull[b].y)
            }
          }
          bull[b].x += 1
        }
      }, 200)

    
  }

  onW() {
    getFirst(player).y -= 1
  }

  onS() {
    getFirst(player).y += 1
  }

  onA() {
    getFirst(player).x -= 1
  }

  onD() {
    getFirst(player).x += 1
  }

  shoot() {
    let p = getFirst(player)

    addSprite(p.x, p.y, "#")
  }

  endGame() {
    clearText()
    setBackground(bg);
    clearInterval(spawnZomb)
  }

  
}

// and now let the games end

// music
let a = tune`
500,
500: f4-500,
15000`
let b = tune`
500,
500: a4-500,
15000`
let c = tune`
500,
500: c5-500,
15000`
let d = tune`
500,
500: e5-500,
15000`
let e = tune`
500,
500: g5-500,
15000`
let opendoor = tune`
256.4102564102564,
256.4102564102564: d4~256.4102564102564,
256.4102564102564: e4~256.4102564102564,
256.4102564102564: f4~256.4102564102564,
7179.48717948718`

// create games
var game = "none"
let race = new RaceGame()
let whack = new WhackOrpheus()
let piano = new Piano()
let zomb = new ZombieShooter()

// 
const player = "p";
const hedge = "w";
const bg = "b";
const gravel = "g";
const building = "_"
const building2 = "2"
const portal_1 = "a"
const car = "c"
const cone = "^"
const asphalt = "-"
const portal_2 = "d"
const selector = "s"
const hole = "*"
const orpheus = "o"
const portal_3 = "v"
const table = "t"
const snd1 = "3"
const snd2 = "4"
const snd3 = "5"
const snd4 = "6"
const snd5 = "7"
const selector2 = "u"
const playback = "r"
const sign_1 = "x"
const zombie = "z"
const portal_4 = "y"
const bullet = "#"
const balloons = "&"
const sign_2 = "("
const person1 = ")"
const person2 = "0"

setLegend(
  [player, bitmap`
................
.......555......
.......5555.....
.......666......
.......666......
........6.......
......33333.....
......33333.....
......33333.....
......33333.....
......35553.....
......65556.....
.......555......
.......555......
.......555......
.......555......`],
  [hedge, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [bg, bitmap`
4444444444444444
44D4444444444444
4D44444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444D44
44444444444444D4
4444444444444444
4444D44444444444
444D444444444444
4444444444444444
4444444444444444`],
  [gravel, bitmap`
1111111111L11111
1L11111111111111
1111111111111111
1111111111111L11
1111111L11111111
1111111111111111
1L11111111111111
1111111111111111
111111111111111L
1111111111111111
1111111L11111111
L111111111111111
1111111111111111
11111111111111L1
1111111111111111
1L1111111L111111`],
  [building, bitmap`
5555555555555555
5555555555555555
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],
  [building2, bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555`],
  [portal_1, bitmap`
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHH00H
HHHHHHHHHHHHH00H
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH`],
  [car, bitmap`
................
................
...000......000.
...HHHHHHHHHHH9.
..9HHHHH1111113.
.99HHHH11111L1H.
.HHHHHH11111L1H.
.HHHHHH11111L1H.
.HHHHHH11111L1H.
.HHHHHH11111L1H.
.99HHHH11111L1H.
..9HHHHH1111113.
...HHHHHHHHHHH9.
...000......000.
................
................`],
  [cone, bitmap`
................
................
................
.......66.......
.......66.......
......9999......
......6666......
.....666666.....
.....999999.....
....66666666....
....66666666....
...9999999999...
...6666666666...
.66666666666666.
................
................`],
  [asphalt, bitmap`
6600006666000066
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
6600006666000066`],
  [portal_2, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666660066
6666666666660066
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666`],
  [selector, bitmap`
6666666666666666
6666666666666666
66............66
66............66
66............66
66............66
66............66
66............66
66............66
66............66
66............66
66............66
66............66
66............66
6666666666666666
6666666666666666`],
  [hole, bitmap`
................
................
................
................
................
................
................
................
................
................
................
..000000000000..
..000000000000..
..000000000000..
................
................`],
  [orpheus,  bitmap`
................
..0000000000....
..0222222220....
..0202022220....
..0822288220....
..0222222220....
..0000002220....
.....0222220....
.....0222220....
.....0222220....
.....0222220....
..000022222000..
..000002220000..
..000000000000..
................
................`], 
  [portal_3, bitmap`
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999990099
9999999999990099
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999`],
  [table, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [snd1, bitmap`
................
................
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
................
................`],
  [snd2, bitmap`
................
................
..999999999999..
..999999999999..
..999999999999..
..999999999999..
..999999999999..
..999999999999..
..999999999999..
..999999999999..
..999999999999..
..999999999999..
..999999999999..
..999999999999..
................
................`],
  [snd3, bitmap`
................
................
..666666666666..
..666666666666..
..666666666666..
..666666666666..
..666666666666..
..666666666666..
..666666666666..
..666666666666..
..666666666666..
..666666666666..
..666666666666..
..666666666666..
................
................`],
  [snd4, bitmap`
................
................
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
................
................`],
  [snd5, bitmap`
................
................
..777777777777..
..777777777777..
..777777777777..
..777777777777..
..777777777777..
..777777777777..
..777777777777..
..777777777777..
..777777777777..
..777777777777..
..777777777777..
..777777777777..
................
................`],
  [selector2, bitmap`
0000000000000000
0000000000000000
00............00
00............00
00............00
00............00
00............00
00............00
00............00
00............00
00............00
00............00
00............00
00............00
0000000000000000
0000000000000000`],
  [playback, bitmap`
................
................
................
.....00.........
.....000........
.....0000.......
.....00000......
.....000000.....
.....0000000....
.....000000.....
.....00000......
.....0000.......
.....000........
.....00.........
................
................`],
  [sign_1, bitmap`
................
................
.......CC.......
.CCCCCCCCCCCCCC.
.CCCCCCCCCCCCCC.
.C00C00C00C000C.
.CCCCCCCCCCCCCC.
.C000C0C000C00C.
.CCCCCCCCCCCCCC.
.C0C0C000C00C0C.
.CCCCCCCCCCCCCC.
.......CC.......
.......CC.......
....D..DC.D.....
.....DDCDDDD....
....DDDDDDD.....`],
  [portal_4, bitmap`
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888880088
8888888888880088
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888`],
  [zombie, bitmap`
.......0000.....
.......DDD0.....
.......D3D0.....
.......DDD0.....
........DD......
.DDLDDLLLLL.....
.D.LLLLLLLL.....
....111LLLD.....
.......LLDD.....
.......LLLL.....
....D..5555.....
....DDD5555.....
....DD5555D.....
.........D5.....
.........55.....
........DDD.....`],
  [bullet, bitmap`
................
................
................
................
................
................
................
.....2222222....
.....2222222....
................
................
................
................
................
................
................`],
  [balloons, bitmap`
.777............
77777666........
777776666.......
777776666..333..
.77766666.33333.
..7..666..33333.
..0...6...33333.
..0....0...333..
..0....0....3...
...0...0...0....
....0...0..0....
.....0..0..0....
......0.0.0.....
.......000......
........0.......
................`],
  [sign_2, bitmap`
................
................
.......CC.......
.CCCCCCCCCCCCCC.
.CCCCCCCCCCCCCC.
.C00C00C00C000C.
.CCCCCCCCCCCCCC.
.C000C0C000C00C.
.CCCCCCCCCCCCCC.
.C0C0C000C00C0C.
.CCCCCCCCCCCCCC.
.......CC.......
.......CC.......
....D..DC.D.....
.....DDCDDDD....
....DDDDDDD.....`],
  [person1, bitmap`
................
......CCCCC.....
......C666C.8...
......C666C888..
.....CC6668888..
.....CCC6CC8888.
.....CHHHH8888..
.....CHHHHHC8...
......HHHHH.2...
......HHHHHH6...
......H555......
......6555......
.......555......
.......555......
.......555......
.......555......`],
  [person2, bitmap`
.333............
33333.CCCCC.....
33333.C6CCC.....
33333.C666C.....
.333..C666C.....
..3.....6.......
..0...55555.....
..0...55555.....
...0..55555.....
....6555555.....
.......0005.....
.......0006.....
.......000......
.......000......
.......000......
.......000......`]
);


setSolids([player, hedge, building2, car, cone, zombie, person1, person2, balloons]);

let level = 0;
const levels = [
  map`
......ww.2222222222222222....ww........w.w...w...w...
.p....ww.____a_____d_____.)..wwwwwwww....w.w.w.wwwww.
.g....ww0....g.....g.........ww...w.w..w.w.w.w.......
.g.ww.ww.gggggggggggggggg....ww.w.w.w..w.w.w.w.wwwww.
.g.ww.ww.gggggggggggggggg....ww.w.w...)w.w.w.w.....w.
.g....ww.gg0...........gg....ww.w......w.w.w.wwwww.w.
.g.ww.ww.gg.2222222222.gg....ww.wwwwwwww...w.......w.
.g.ww.ww.gg.2222222222.gg....ww........wwwwwwwwwwwww.
.g....ww.gg.2222222222.gg....ww..wwwww.w...w....w....
.g.ww.ww.gg.2222222222.gg....wwwww.....w.w.w.wwww.w..
.g.ww....gg.__v____y__.gg....ww..w.w.w.w.w.w....w.w..
.g....&(&gg...g....g.).gg....ww..w.w.w.w.w.w......w..
.gggggggggggggggggggggggg....ww..w.www.w.wwwwwwwwwwww
.........gg.....0......gg...)ww.ww.w.w.w..w....w.....
...ww....gg.&gggggggg&.gg....ww....w.wow..w..w.w.w.ww
...ww.ww.gg.gggggggggg.gg....ww.wwwwwwww..w..w.w.w...
......ww.gg.gggggggggg.gg....ww........w.0w..w.w.w...
...ww.ww.gg.gggggggggg.gg....wwwwwwwww....w..w.w.w.w.
...ww.ww.gg.&gggggggg&.gg....ww...........w..w.w.w.w.
......ww.gg...g....g...gg....ww.wwwwwww.w.ww.w.w.w.w.
...ww.ww.gggggggggggggggg..x.ww.......w.w....www.w.w.
...ww.ww.gggggggggggggggg....wwwwwwww.w.w........w.w.
......ww................ggggg.........w.wwwwwwwwwwww.
...0..ww..0..........).......wwwwwwww.w.w............
......ww.....................ww.......w.w............`,
  map`
..........
..........
.........c
..........
..........`,
  map`
******
******
******
******`,
  map`
.......
.......
.34567.
.......
...r...
.......`,
  map`
...........
...........
...........
p..........
...........
...........
...........`
];

setMap(levels[level]);

// console.log("hoi1")
if (game == "none") {
  // console.log("menu setup")
  setBackground(bg);
  mapNat = getMapV2();
  setMapV2(trimMapV2(px-5, py-4, 10, 8, mapNat));
}

setPushables({
  [ player ]: [],
});

onInput("w", () => {
  if (game == "none") {
    setMapV2(mapNat);
    getFirst(player).y -= 1;
    py = getFirst(player).y;
  } else if (game == "1") {
    race.onW()
  } else if (game == "2") {
    whack.onW()
  } else if (game == "3") {
    piano.onW()
  } else if (game == "4") {
    zomb.onW()
  }
});
onInput("a", () => {
  if (game == "none") {
    setMapV2(mapNat);
    getFirst(player).x -= 1;
    px = getFirst(player).x;
  } else if (game == "2") {
    whack.onA()
  } else if (game == "3") {
    piano.onA()
  } else if (game == "4") {
    zomb.onA()
  }
});
onInput("s", () => {
  if (game == "none") {
    setMapV2(mapNat);
    getFirst(player).y += 1;
    py = getFirst(player).y;
  } else if (game == "1") {
    race.onS()
  } else if (game == "2") {
    whack.onS()
  } else if (game == "3") {
    piano.onS()
  } else if (game == "4") {
    zomb.onS()
  }
});
onInput("d", () => {
  if (game == "none") {
    setMapV2(mapNat);
    getFirst(player).x += 1;
    px = getFirst(player).x;
  } else if (game == "2") {
    whack.onD()
  } else if (game == "3") {
    piano.onD()
  } else if (game == "4") {
    zomb.onD()
  }
});

onInput("j", () => {
  if (game == "1") {
    race.endGame()
    game = "none"
    level = 0
    setMap(levels[level])
    setMapV2(mapNat);
    getFirst(player).x += 1;
    px = getFirst(player).x;
  } else if (game == "2") {
    whack.endGame()
    game = "none"
    level = 0
    setMap(levels[level])
    setMapV2(mapNat);
    getFirst(player).x += 1;
    px = getFirst(player).x;
  } else if (game == "3") {
    piano.endGame()
    piano.tune = ""
    game = "none"
    level = 0
    setMap(levels[level])
    setMapV2(mapNat);
    getFirst(player).x += 1;
    px = getFirst(player).x;
  } else if (game == "4") {
    zomb.endGame()
    game = "none"
    level = 0
    setMap(levels[level])
    setMapV2(mapNat);
    getFirst(player).x += 1;
    px = getFirst(player).x;
  }
});

onInput("l", () => {
  if (game == "3") {
    piano.recordNote()
  } else if (game == "4") {
    zomb.shoot()
  }
})

afterInput(() => {
  if (game == "none") {
    mapNat = getMapV2();
    setMapV2(trimMapV2(px-5, py-4, 10, 8, mapNat));

    let p = getFirst(player)
    let i = getTile(p.x, p.y)

    if (i[1]) {
      if (i[1]._type == "a") {
        game = "1"
        level = 1
        setMap(levels[level])

        playTune(opendoor)
        race.startGame()
        
      } else if (i[1]._type == "d") {
        game = "2"
        level = 2
        setMap(levels[level])

        playTune(opendoor)
        whack.startGame()
        
      } else if (i[1]._type == "v") {
        game = "3"
        level = 3
        setMap(levels[level])

        playTune(opendoor)                             
        piano.startGame()
        
      } else if (i[1]._type == "y") {
        game = "4"
        level = 4
        setMap(levels[level])

        playTune(opendoor)
        zomb.startGame()
      }

      if (i[1]._type == "o") {
        addText("Sprig is awesome!", {color: color`0`})
        setTimeout(() => {
          clearText()
        }, 2000)
      } else if (i[1]._type == "x") {
        addText("Hedge Maze", {color: color`0`})
        setTimeout(() => {
          clearText()
        }, 2000)
      } else if (i[1]._type == "(") {
        addText("  Welcome to\n\nSprig Carnival!", { color: color`0`, x: 3})
        setTimeout(() => {
          clearText()
        }, 2000)
      }
    }
  }
});
