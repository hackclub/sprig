/*
@title: HELP ME I CANT CODE
@author: PotatoMoth
@tags: ["maze", "adventure"]
@addedOn: 2024-08-15
*/

const player = "p"
const codingSkills = "c"
const problem = "r"
const distraction = "d"
const experience = "e"
const smiley = "s"
const failure = "f"
const motivation = "m"
const help = "h"
const game = "g"
const secret = "t"
const grass = "a"
const tree = "z"
const bush = "b"

setLegend(
  [player, bitmap`
................
....000000000...
...0.........0..
...0.........0..
...0..0....0.0..
...0.........0..
...0...0000..0..
...0...0..0..0..
...0.........0..
...0.........0..
....0000000000..
........0.......
.......000......
........0.......
........0.......
.......0.0......`],
  [codingSkills, bitmap`
00D000D00DD00DDD
0DD0D0D0D0D0DDDD
0DD0D0D0D0D00DDD
0DD0D0D0D0D0DDDD
00D000D00DD00DDD
DDDDDDDDDDDDDDDD
000D0D0DDD0D0DDD
0DDD0D0D0D0D0DDD
0DDD0D0DDD0D0DDD
000D00DD0D0D0DDD
DD0D0D0D0D0D0DDD
DD0D0D0D0D0D0DDD
000D0D0D0D0D0DDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [problem, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
L000LLLLLLLL0LLL
L0L0L00L000L000L
L000L0LL0L0L0L0L
L0LLL0LL000L000L
LLLLLLLLLLLLLLLL
L0LL00LLLLLLLLLL
L0L0LL0L00L00LLL
L0L000LL0L0L0LLL
L0L0LLLL0L0L0LLL
L0LL00LL0L0L0LLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [distraction, bitmap`
0033000300030003
0303303303333033
0303303300033033
0303303333033033
0033000300033033
3333333333333333
3003300300030003
0330303330333033
0000303330333033
0330300330330003
3333333333333333
3000033003033333
3033030303033333
3033030303033333
3000030300333333
3333333333333333`],
  [experience, bitmap`
00DDDDDDDDDDDDDD
0DDDDDDDDDDDDDDD
00DDDDDDDDDD0DDD
0DD0D0D000D0D0DD
0DDD0DD0D0D000DD
00D0D0D000D0DDDD
DDDDDDD0DDDD00DD
DDDDDDD0DDDDDDDD
DDDD0DDDDDDDDD0D
D00DDD00DD00D0D0
D0DD0D0D0D0DD000
D0DD0D0D0D00D0DD
DDDDDDDDDDDDDD00
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [smiley, bitmap`
................
................
................
...00000000000..
..0...........0.
..0...........0.
..0..0.....0..0.
..0...........0.
..0..0.....0..0.
..0..0000000..0.
..0...........0.
..0...........0.
..0...........0.
...00000000000..
................
................`],
  [failure, bitmap `
................
................
................
...00000000000..
..0...........0.
..0...........0.
..0..0......0.0.
..0...........0.
..0...........0.
..0...000000..0.
..0...0....0..0.
..0...........0.
..0...........0.
...00000000000..
................
................`],
  [motivation, bitmap`
DDDDDDDDDDDD0DDD
D00000D000D000DD
D0D0D0D0D0DD0DDD
D0D0D0D000DD0DDD
DDDDDDDDDDDDDDDD
D0DDDDDD0DDD0DDD
DDD0D0D0D0D000DD
D0D0D0D000DD0DDD
D0DD0DD0D0DD0DDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
D0DDDDDDDDDDDDDD
DDD000DD0DDDDDDD
D0D0D0D0D0DDDDDD
D0D000D0D0DDDDDD
DDDDDDDDDDDDDDDD`],
  [help, bitmap`
DDDDDDDDDDDDDDDD
D0DD0DDDD00DDDDD
D0DD0DDDD0DDDDDD
D0000DDDD00DDDDD
D0DD0DDDD0DDDDDD
D0DD0DDDD00DDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DD0DDDDDD000DDDD
DD0DDDDDD0D0DDDD
DD0DDDDDD000DDDD
DD0DDDDDD0DDDDDD
DD000DDDD0DDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [game, bitmap`
HHHHHHHHHHHHHHHH
HH000HHHH00HHHHH
H0HHHHHH0HH0HHHH
H0000HHH0000HHHH
H0HH0HHH0HH0HHHH
H0000HHH0HH0HHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
H00000HHH00HHHHH
H0H0H0HHH0HHHHHH
H0H0H0HHH00HHHHH
H0H0H0HHH0HHHHHH
H0H0H0HHH00HHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH`],
  [secret, bitmap`
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
................
................
................
................
................`],
  [grass, bitmap`
4D44D4444D444444
4D4444D44444D444
444444D44444D444
4444444444444444
444D444444444444
444D44444D444444
D44444444D444444
D4444444444444D4
44444444444444D4
44444D4444D44444
44444D4444D44444
4D44444444444444
4D44444444444444
4444444444444D44
4444444444444D44
4444D4444D444444`],
  [tree, bitmap`
4444444444444444
4D4444DDDD4444D4
4D444DDDDD4444D4
4444DDDDDDD44444
444DDDDDDDD44444
444DDDDDDDD44444
44DDDDDDDDD4D444
44DDDDDDDDD4D444
D4DDDDDDDDD44444
D4DDDDDDDDD44444
44DDDDDDDDD44444
44444CCC444444D4
44444CCC444444D4
4D444CCC444D4444
4D444CCC444D4444
4444444444444444`],
  [bush, bitmap`
44444D4444444444
44444D44444444D4
4D4444444D4444D4
4D4444444D444444
4444444444444444
44444DDD44444444
444DDD3DDDDDD444
444DDDDDDDDDDD44
44DDDDDDDDDD3DD4
44DDD3DDDDDDDDDD
44DDDDDDDDDDDDDD
443DDDDDD3DDDDDD
D4DDDDDDDDDDD3DD
D4DDDDDDDDDDDDDD
44DDD3DDDDDDDDD4
444DDDDDDDD3D444`]
);

//music and sound

const backgroundMusic = tune`
137.61467889908258: B4~137.61467889908258 + C5-137.61467889908258,
137.61467889908258: B4~137.61467889908258 + G4~137.61467889908258,
137.61467889908258: F4-137.61467889908258,
137.61467889908258: B4~137.61467889908258 + C5-137.61467889908258,
137.61467889908258: B4~137.61467889908258,
137.61467889908258: B4~137.61467889908258 + G4~137.61467889908258,
137.61467889908258: F4-137.61467889908258 + C5-137.61467889908258,
137.61467889908258: C5-137.61467889908258 + G4~137.61467889908258,
137.61467889908258: B4~137.61467889908258 + C5-137.61467889908258,
137.61467889908258: B4~137.61467889908258 + G4~137.61467889908258,
137.61467889908258: F4-137.61467889908258,
137.61467889908258: B4~137.61467889908258 + C5-137.61467889908258,
137.61467889908258: B4~137.61467889908258,
137.61467889908258: B4~137.61467889908258 + G4~137.61467889908258,
137.61467889908258: F4-137.61467889908258 + C5-137.61467889908258,
137.61467889908258: C5-137.61467889908258 + G4~137.61467889908258,
137.61467889908258: B4~137.61467889908258 + C5-137.61467889908258,
137.61467889908258: B4~137.61467889908258 + G4~137.61467889908258,
137.61467889908258: F4-137.61467889908258,
137.61467889908258: B4~137.61467889908258 + C5-137.61467889908258,
137.61467889908258: B4~137.61467889908258,
137.61467889908258: B4~137.61467889908258 + G4~137.61467889908258,
137.61467889908258: F4-137.61467889908258 + C5-137.61467889908258,
137.61467889908258: C5-137.61467889908258 + G4~137.61467889908258,
137.61467889908258: B4~137.61467889908258 + C5-137.61467889908258,
137.61467889908258: B4~137.61467889908258 + G4~137.61467889908258,
137.61467889908258: F4-137.61467889908258,
137.61467889908258: B4~137.61467889908258 + C5-137.61467889908258,
137.61467889908258: B4~137.61467889908258,
137.61467889908258: B4~137.61467889908258 + G4~137.61467889908258,
137.61467889908258: F4-137.61467889908258,
137.61467889908258: G4~137.61467889908258`
const playback = playTune(backgroundMusic, Infinity);

const deathNoise = tune`
500: C4~500,
500,
500: C4~500,
500,
500: C4~500,
500,
500: C4~500,
500,
500: C4~500,
500,
500: C4~500,
500,
500: C4~500,
500,
500: C4~500,
500,
500: C4~500,
500,
500: C4~500,
500,
500: C4~500,
500,
500: C4~500,
500,
500: C4~500,
500,
500: C4~500,
500,
500: C4~500,
500,
500: C4~500,
500`
const nextLevel = tune`
254.23728813559322: B5^254.23728813559322 + E5^254.23728813559322,
254.23728813559322: B5^254.23728813559322 + E5^254.23728813559322,
254.23728813559322: A5^254.23728813559322 + D5^254.23728813559322,
254.23728813559322: G5^254.23728813559322 + C5^254.23728813559322,
254.23728813559322: E5^254.23728813559322 + D5^254.23728813559322 + A5^254.23728813559322 + B5^254.23728813559322,
6864.406779661017`
const winNoise = tune`
277.77777777777777: D4^277.77777777777777 + F4~277.77777777777777,
277.77777777777777: D4^277.77777777777777 + F4~277.77777777777777,
277.77777777777777: F4^277.77777777777777,
277.77777777777777: E4^277.77777777777777 + F4~277.77777777777777,
277.77777777777777: F4^277.77777777777777,
277.77777777777777: E4^277.77777777777777 + F4~277.77777777777777 + B4~277.77777777777777,
277.77777777777777: A4^277.77777777777777 + C5~277.77777777777777,
277.77777777777777: A4^277.77777777777777 + C5~277.77777777777777,
277.77777777777777: C5^277.77777777777777 + B4~277.77777777777777,
277.77777777777777: B4^277.77777777777777 + C5~277.77777777777777,
277.77777777777777: C5^277.77777777777777,
277.77777777777777: B4^277.77777777777777 + C5~277.77777777777777,
277.77777777777777: B4~277.77777777777777,
277.77777777777777: A4^277.77777777777777 + C5~277.77777777777777,
277.77777777777777: A4^277.77777777777777 + C5~277.77777777777777,
277.77777777777777: B4~277.77777777777777,
277.77777777777777: G4^277.77777777777777,
277.77777777777777: F4^277.77777777777777 + G4~277.77777777777777,
277.77777777777777: G4^277.77777777777777,
277.77777777777777: F4^277.77777777777777 + G4~277.77777777777777,
277.77777777777777: F4~277.77777777777777,
277.77777777777777: E4^277.77777777777777 + G4~277.77777777777777,
277.77777777777777: E4^277.77777777777777 + G4~277.77777777777777,
277.77777777777777: F4~277.77777777777777,
277.77777777777777: E4^277.77777777777777,
277.77777777777777: D4^277.77777777777777 + E4~277.77777777777777,
277.77777777777777: E4^277.77777777777777,
277.77777777777777: D4^277.77777777777777 + E4~277.77777777777777,
277.77777777777777: E4^277.77777777777777,
277.77777777777777: F4^277.77777777777777 + G4~277.77777777777777,
277.77777777777777: E4^277.77777777777777,
277.77777777777777: D4~277.77777777777777`
setSolids([player, problem, tree, bush])

onInput("j", () => {
  setMap(map`
....r.rtr.......
rrrrr.r.r.rr....
......r.r.r.r.r.
p.rrr.r.r.r...r.
....r.r...r...r.
rrr.r.r..r......
....r.r..r......
.rrrr.r.r.......
.r....r.rrrrr...
...rrr......r.rr
..r.......r.r...
.rrrrrrrrrr.rrr.
..............r.
rrrrrrrrrrrrrrr.
......rr....rr..
.c.......rr....r`)
})

onInput("s", () => {
  getFirst(player).y += 1
  checkCollisions()
})

onInput("w", () => {
  getFirst(player).y -= 1
  checkCollisions()
})

onInput("d", () => {
  getFirst(player).x += 1
  checkCollisions()
})

onInput("a", () => {
  getFirst(player).x -= 1
  checkCollisions()
})

setMap(map`
....r.rtr.......
rrrrr.r.r.rr....
......r.r.r.r.r.
p.rrr.r.r.r...r.
....r.r...r...r.
rrr.r.r..r......
....r.r..r......
.rrrr.r.r.......
.r....r.rrrrr...
...rrr......r.rr
..r.......r.r...
.rrrrrrrrrr.rrr.
..............r.
rrrrrrrrrrrrrrr.
......rr....rr..
.c.......rr....r`)

addText("gather the", {
  x: 5,
  y: 3,
  color: color`3`
})

addText("pieces to", {
  x: 5,
  y: 4,
  color: color`3`
})

addText("make a game", {
  x: 5,
  y: 5,
  color: color`3`
})

setInterval(() => {
    clearText()
  },
  7000)

const checkCollisions = () => {
  const playerSprite = getFirst(player)
  const codingSkillsSprites = getAll(codingSkills)
  const experienceSprites = getAll(experience)
  const distractionSprites = getAll(distraction)
  const motivationSprites = getAll(motivation)
  const helpSprites = getAll(help)
  const gameSprites = getAll(game)
  const secretSprites = getAll(secret)

  experienceSprites.forEach(experienceSprite => {
    if (playerSprite.x === experienceSprite.x && playerSprite.y === experienceSprite.y) {
      playTune(nextLevel)
      setMap(map`
..drdrdr.
p.......m
rr.r.r.r.`)
    }
  })
  secretSprites.forEach(secretSprite => {
    if (playerSprite.x === secretSprite.x && playerSprite.y === secretSprite.y) {
      playback.end()
      addText("alternate ending:", {
        x: 1,
        y: 4,
        color: color`5`
      })
      addText("touch grass", {
        x: 1,
        y: 6,
        color: color`5`
      })
      setMap(map`
abaaaaaa
zaazaaab
azaaaaza
zaaaaaza
baaaaaaa
aaapaaaa`)
    }
  })

  helpSprites.forEach(helpSprite => {
    if (playerSprite.x === helpSprite.x && playerSprite.y === helpSprite.y) {
      playTune(nextLevel)
      setMap(map`
..d.dr..r..d..
rr...r.......r
r....dd.d.rr..
rdr.r..r.r.rr.
r.r.grr.r...r.
...rr...r.r.r.
.r.r..d.r.r.r.
dr..r.....r...
..r..rrr..rrr.
...r.p..r.r..d
....rr....r.r.
rrd......rr.rd
...rr.........
rrr..rrrr.r.r.`)
    }
  })
  codingSkillsSprites.forEach(codingSkillsSprite => {
    if (playerSprite.x === codingSkillsSprite.x && playerSprite.y === codingSkillsSprite.y) {
      playTune(nextLevel)
      setMap(map`
.r.......
...d.....
pr...d..e
.r.......
.r.......`)
    }
  })

  gameSprites.forEach(gameSprite => {
    if (playerSprite.x === gameSprite.x && playerSprite.y === gameSprite.y) {
      playback.end()
      const playwinNoise = playTune(winNoise, Infinity)
      setMap(map`
s`)
    }
  })
  distractionSprites.forEach(distractionSprite => {
    if (playerSprite.x === distractionSprite.x && playerSprite.y === distractionSprite.y) {
      playback.end()
      const playDeathNoise = playTune(deathNoise, Infinity)
      setMap(map`
f`)
    }
  })
  motivationSprites.forEach(motivationSprite => {
    if (playerSprite.x === motivationSprite.x && playerSprite.y === motivationSprite.y) {
      playTune(nextLevel)
      setMap(map`
p....r..drr
.rd.dr...rh
...d..d....`)
    }
  })
}

setInterval(() => {
    if (!getFirst(distraction)) return;
    getFirst(distraction).y -= 2
    if (!getAll(distraction)[1]) return;
    getAll(distraction)[1].y -= 2
    if (!getAll(distraction)[2]) return;
    getAll(distraction)[2].y -= 2
    if (!getAll(distraction)[3]) return;
    getAll(distraction)[3].y -= 2
    if (!getAll(distraction)[4]) return;
    getAll(distraction)[4].y -= 2
    if (!getAll(distraction)[5]) return;
    getAll(distraction)[5].y -= 2
    if (!getAll(distraction)[6]) return;
    getAll(distraction)[6].y -= 2
    if (!getAll(distraction)[7]) return;
    getAll(distraction)[7].y -= 2
    if (!getAll(distraction)[8]) return;
    getAll(distraction)[8].y -= 2
    if (!getAll(distraction)[9]) return;
    getAll(distraction)[9].y -= 2
    if (!getAll(distraction)[10]) return;
    getAll(distraction)[10].y -= 2
    if (!getAll(distraction)[11]) return;
    getAll(distraction)[11].y -= 2
  },
  2000)

setInterval(() => {
    if (!getFirst(distraction)) return;
    getFirst(distraction).y += 1
    if (!getAll(distraction)[1]) return;
    getAll(distraction)[1].y += 1
    if (!getAll(distraction)[2]) return;
    getAll(distraction)[2].y += 1
    if (!getAll(distraction)[3]) return;
    getAll(distraction)[3].y += 1
    if (!getAll(distraction)[4]) return;
    getAll(distraction)[4].y += 1
    if (!getAll(distraction)[5]) return;
    getAll(distraction)[5].y += 1
    if (!getAll(distraction)[6]) return;
    getAll(distraction)[6].y += 1
    if (!getAll(distraction)[7]) return;
    getAll(distraction)[7].y += 1
    if (!getAll(distraction)[8]) return;
    getAll(distraction)[8].y += 1
    if (!getAll(distraction)[9]) return;
    getAll(distraction)[9].y += 1
    if (!getAll(distraction)[10]) return;
    getAll(distraction)[10].y += 1
    if (!getAll(distraction)[11]) return;
    getAll(distraction)[11].y += 1
  },
  1000)

setInterval(() => {
    checkCollisions()
  },
  200)

