/*
@title: Divine Tree Man Saves A Forest
@author: Rohan Pani (13)
@tags: []
@addedOn: 2024-07-26
The story of this game is to save the forest from invaders like a deadly fungus, Forest fires, and the Zire that started them. 
Remember to look carefully at each level before startinng them. Getting the pushable items stuck softlocks the game and you must restart from the beggining
by pressing i.

Mechanics:
- Push the fungus into the fire to vaporize them.
- WASD to move. i to reset <---VERY IMPORTANT WHEN STARTING OUT
- The Zire can detonate walls if placed on a suspicious wall intoduced in level 3, and can push a certain type of wall introduced in level 5
- there are 4 types of walls. The Zire can interact with 2-3.

There are 7 levels with the 7th one being an end screen.
The mechanics are difficult to use, but once you get the hang of it you could finish the game super quickly.

Finished on July 13, 2024.
*/

const portal = "P"
const wow = "z"
const player = "p"
const background = "b"
const fire = "g"
const fungus = "f"
const wall = "w"  
const Weapon = "W"
const Fungus2 = "U"
const wall2 = "t"
const wall3 = "B"
const portal2 = "q"
const wall4 = "T"
const pit = "I"
const end = "e"

function checkFungusFireCollision() {
  const fungusFireCollision = tilesWith(fungus, fire).length > 0;

  if (fungusFireCollision) {
    getAll(fungus).forEach(sprite => {
      sprite.remove();
    });

    switchLevel();
  }
}

function switchLevel() {
  setMap(level[1]);
}

afterInput(() => {
  checkFungusFireCollision();
});



function checkFungusFireCollision2() {
  const fungusFireCollision2 = tilesWith(Fungus2, fire).length > 0;

  if (fungusFireCollision2) {
    getAll(Fungus2).forEach(sprite => {
      sprite.remove();
    });

    switchLevel2();
  }
}

function switchLevel2() {
  setMap(level[2]);
}

afterInput(() => {
  checkFungusFireCollision2();
});


setLegend(
  [player, bitmap`
................
................
................
......00000.....
.....04444D0....
.....04040D0....
.....04444D0....
.....04333D0....
......04DD0.....
...00000400000..
...DDDD040DDDD..
.......040......
......00D00.....
......0D.40.....
......0D.40.....
......0D.40.....` ],
  [background, bitmap`
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
  [fire, bitmap`
................
................
................
................
................
................
.....33...33....
....333..333....
....393.333.....
...399939333333.
...399999936633.
...36666699333..
...36966663.....
...33999693.....
....3999993.....
.....33333......`],
  [fungus, bitmap`
................
................
.......C........
.......C..C...C.
.....CCC.CC...C.
.....C...C...CC.
....CC..CC...C..
....C...C...CC..
....CC.CC...C...
.....C.C..CCC...
.....00000C.....
....0D22420.....
...002122C0.....
..012224210.....
..00000010......
........0.......`],
  [wall, bitmap`
CC444444C44C4CC4
CC4CC4C4C4CCC4CC
CC4CC4C4DCC4C44C
CC4CCCCDDCC44C44
CC4CDDDCCCC44CC4
44CDCDDCDCCC44CC
44CDCDDCDCDCC444
44CCCCCCDCDDCC44
4CDCCDDCCCCDDCCC
4CCDCCCCCCCCCC44
4CCCDDCDCCDCCC44
44CDCDCDCDCDCCC4
C44CCCCDDCDCC4CC
4CCDDDCCCCCC4CCC
C4CCCCCCCCCCC44C
4CCCC444444CCCC4`],
  [Weapon, bitmap`
.......66.......
.......66.......
..5....66....5..
...4...66...4...
....4..66..4....
.....4.77.4.....
......DDDD......
666667DDDD766666
666667DDDD766666
......DDDD......
.....4.77.4.....
....4..66..4....
...4...66...4...
..5....66....5..
.......66.......
.......66.......`],
  [Fungus2, bitmap`
........4...44..
...4....4....4..
...4..44.....4..
...4..4.....4...
..44..4...44....
..4...4...4.....
..44............
...4.0000000....
....00CCDD00....
....022200000...
..00052225D00...
..0DCCC222D00...
..0DDDDD22C00...
..0000005000....
...00..0000.....
................`],
  [wow, bitmap`
CCCCCC..........
..C..C....C.....
..C..C...C.C....
..C..CC..CCC....
..C..C.C.C......
..C..C.C..CC....
................
99999...........
....9.4.........
....9..H.H..3...
...9..4HH.H3.3..
..9...4H...333..
.9....4H...3....
9999994H....33..
................
................`],
  [portal, bitmap`
................
....000000......
...007777000....
..00775577700...
.00755H5557700..
.0755HHHH55770..
.0755H888H5570..
.0755H888H5770..
.075HH888H5700..
.0755H88H5570...
.07755HHH5770...
.007755555700...
..0077777770....
...000000000....
................
................`],
  [wall2, bitmap`
DDDDDDDCDDDDDDCD
CCCDDDCCCDCCDDCD
DDCDDCCDCDCCDDCD
DDCDCCDDCC4CCCCC
DCCCDDDDDCCC44CD
DC4CCC4CC44C44CD
DC4CCCCC4444CCCD
DC4C44CCCCCCC4CC
DC44C44C4CCC44CC
DC4CCCCC4CC444CC
DCCCCCC44C44CCDC
DCCCCDCDCC44CDDC
DDDDCDCDC4CCCCCC
DDDCCDCDCCDCCCDC
CCCCDDCDDDCCDDDC
CDDDDCCDDCCDDDDD`],
  [wall3, bitmap`
CC44CC4C4444C444
44444C4C4444C444
CCCCCCCCCCCCCCC4
C4444CCDDCCDC444
4C44CDCDDCCDC444
4CC4CDCCCCCCCCC4
44CCCCCCDDDCCCCC
44CCCCCDDCCDC444
44CDCDCCCCCCCC44
CCCCCCDDCDDC4444
C4CDDDDDCDDC4444
CCCCCDDDCDDCC444
CCDDCCCCCCCCCCCC
4CCCCCCCCCCC4444
4C444CC44CCC44C4
44CC4CC4CC44CC44`],
  [portal2, bitmap`
................
................
..........HH....
......HHHH5H....
....HHHHH55HH...
....H5557755H...
....H545555HH...
...HH548485H....
...H5548485H....
...H5488885H....
...HH555555H....
....HH555HH.....
......HHHH......
................
................
................`],
  [wall4, bitmap`
CCCC444444444444
C444CCCCCC4444C4
C444CDDDDDCCCC44
C4C44CCCCCCCCCCC
C4CC44CDDDDDCCC4
C44C44CDDDDDCDCC
C444CCDCDDCCDDDC
C444CCCCCCCCDDDC
CCCCDDDC4CCDCCCC
CDDDDDCCC4CC44C4
CCDDDCDDCCC44444
4CCDCDDCCCC44CC4
4C4CCCCDC44CC444
4CC4444C444CC444
44CC444C4CCCC444
444C444C444CC444`],
  [pit, bitmap`
..4444444.......
.4444CCC4444....
.444CCCCCCCC4...
44CCCCC0000C44..
44CCCC00000CC4..
44CC00000000C444
44CC00000000C444
44CC00000000CC44
44CC000000000C44
44C0000000000C44
4C00000000000C4.
4CC000000000C44.
.4CC0000000CC444
..4CCCC0000C444.
...444CCCCCC444.
....44444444....`],
  [end, bitmap`
9944544344C44499
4994454344C44944
449945433C449444
444495553C449454
544449955C999554
45444493C5555544
44544455C5444444
33355553C5333333
44435533C4544444
4445545C99554444
445599C559954444
55599C4453495554
44994C4454399455
44944C4455344994
9944CC4435444499
944C443335544444`]
)

setPushables({
  [player]: [fungus, Fungus2, Weapon],
  [Weapon]:[wall4]
})


setBackground("b")
setSolids([player, fungus, Fungus2, Weapon, wall, wall3, wall4])

const level = [
  map`
..........
.pgg......
..gg......
..........
.....f....
..........
..........
..........`,
  map`
......ww..
..........
...w....w.
..w..w....
.Uw..w....
.....w.gg.
....w.wgg.
p......w..`,
  map`
..........
.P........
...BBBBBBB
...wtzz...
...BzWzt..
...wzzz...
...B.t..p.
...w...t..`,
  map`
...B.w....
t.....B...
..B.......
BBwB..wBBB
.zzz.wBwww
.zWz.BBBw.
pzzzwwBw..
....Bwww.q`,
  map`
...wTTB...
..twTTT...
...BwTT..I
..BwwwTT..
B.BwwwwT.T
zzzBwwwwTT
zWz....wwT
zzz...p.ww`,
  map`
..wwBBqewB
...tBwwTww
zzBwBwwBBw
zWBwBBwBPq
zzBwBwwBww
.BwwBBTBww
pBwwTwwwwB
..BBwwwBBB`,
  map`
..........
..........
..........
.......ggg
.......zWg
.......zzz
.p.....zWz
.......zzz`
]

setMap(level[0])

afterInput(() => {
  if (tilesWith(player, portal).length > 0) {
  setMap(level[3])
  }
  if (tilesWith(Weapon, wall2).length > 0) {
    getAll(wall).forEach(sprite => {
  sprite.remove();
});
  }
  if (tilesWith(player, portal2).length > 0) {
  setMap(level[4])
  }
  if (tilesWith(player, pit).length > 0) {
    setMap(level[5])
  }
  if (tilesWith(player, end).length > 0) {
    setMap(level[6])
    addText("The Zire has", {
      x: 1,
      y: 1,
      color: `2`
    })
    addText("consumed the power", {
      x: 1,
      y: 2,
      color: `2`
    })
    addText("of the evil Ezir", {
      x: 1,
      y: 3,
      color: `2`
    })
    addText("and saved the land", {
      x: 1,
      y: 4,
      color: `2`
    })
  }
})



onInput("s", () => {
  getFirst(player).y += 1
})

onInput("w", () => {
  getFirst(player).y -= 1
})

onInput("a", () => {
  getFirst(player).x -= 1
})

onInput("d", () => {
  getFirst(player).x += 1
})

onInput("i", () => {
  setMap(level[0])
  clearText()
})
  
 










