/*
        First time? Check out the tutorial game:
        https://sprig.hackclub.com/gallery/getting_started
        
        @title: Grigg on the Sprig
        @author: kingsuper195
        @tags: [platformer]
        @addedOn: 2025-7-13
        */

const player = "p"
const block = "b"
const win = "w"
const spike = "s"
const enemy = "e"
const key = "k"
const door = "d"
const end = "o"
let speedY = 1
let jumping = 0
let lives = 3
let dead = 1
let keys = 0


let emove = []

setLegend(
    [player, bitmap`
....00000000....
...0000000000...
..000000000000..
.00000000000000.
0000200000020000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000200000020000
0000022002200000
.00000022000000.
..000000000000..
...0000000000...
....00000000....` ],
    [block, bitmap`
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
0000000000000000
0000000000000000`],
    [win, bitmap`
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999`],
    [spike, bitmap`
.......33.......
.......33.......
......3333......
......3333......
.....333333.....
.....333333.....
....33333333....
....33333333....
...3333333333...
...3333333333...
..333333333333..
..333333333333..
.33333333333333.
.33333333333333.
3333333333333333
3333333333333333`],
    [enemy, bitmap`
................
................
..3....33....3..
......3333......
.....333333.....
....33333333....
...3333333333...
..333203332033..
..332223322233..
...3333333333...
....33333333....
.....333333.....
......3333......
..3....33....3..
................
................`],
    [key, bitmap`
................
................
................
................
................
..HHHH...HH..HH.
.HHHHHH..HH..HH.
.HHHHHHHHHHHHHH.
.HHHHHHHHHHHHHH.
.HHHHHH.........
..HHHH..........
................
................
................
................
................`],
    [door, bitmap`
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH`],
    [end, bitmap`
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
CCCCCCCCCCCCCCCC`]

)

let level = 1
const levels = [
    map`
......................
......................
......................
......................
......................
......................
......................
......................
......................
......................
......................
......................
......................
......................
......................
......................
......................`,
    map`
bbbbbbbbbbbbbbw
bp............w
b............kw
b.............w
b........k....w
b.......bb.bbbw
b......k.....bw
b.....bb.....bw
b....k.......bw
b...bb.......bw
b.....sssssssbw
bbbbbbbbbbbbbbw`,
    map`
bbbbbbbbbbk..w
.........b.kbb
.........b.bbb
.......k.b...b
p......b.bbb.b
b.b......b.k.b
b.....k..b.bbb
b.....bb.....b
b........bbbbb
b............b
bssssssssssssb
bbbbbbbbbbbbbb`,
    map`
p.............
b............w
bb..k....k.ssw
b...b......bbb
b.....b.......
b........b....
bk.........bbb
b....kkk...kkw
bbbbbbbb...bkw
bwk.k......bbb
bwk.k...sss...
bbbbbbbbbbbbbb`,
    map`
bbbbbbbbbbbbbb
be..e........b
b............b
b....e.......b
b.........e..b
.............b
p.kk..e..e...b
b.bb...kk....b
b.kk...bb..e.b
b......kk....b
b...........ew
bbbbbbbbbbbbbb`,
    map`
bbbbbbbbbbbbbb
b....kbb.....b
b...bbbbbb...b
b...boooob...b
bb.bboooobb..b
b..boooooob..b
b.bboooooob..b
b..boooooob..b
bb.boooooob..b
b..boooooob..b
p..doooooob..b
bbbbbbbbbbbbbb`
]
Rsmap()
setSolids([player, block, enemy, door])
let lastY = getFirst(player).y

addText("GRIGG ON THE SPRIG", {
    x: 1,
    y: 5,
    color: color`3`
})

addText("Press I to begin", {
    x: 2,
    y: 10,
    color: color`3`
})
level = 0
Rsmap()
onInput("w", () => {
    let tAbovePlayer = getTile(getFirst(player).x, getFirst(player).y - 1)
    if (jumping < 1 && tAbovePlayer[0]?.type != "b") {
        speedY = 2
        playTune(tune`
500: E5^500,
15500`)
    }
    jumping = 1


})
onInput("d", () => {
    getFirst(player).x += 1
})
onInput("a", () => {
    getFirst(player).x -= 1
})

onInput("i", () => {
    level = 1
    lives = 3
    dead = 0
    keys = 0
    Rsmap()
})

// onInput("j", () => {
//     Rsmap()
// })

// onInput("k", () => {
//     level = 5
//     keys = 31
//     Rsmap()
// })

setInterval(function () {
    if (dead < 1) {
        clearText()
        addText(lives.toString(), {
            x: 2,
            y: 2,
            color: color`3`
        })
        addText(keys.toString() + "/32", {
            x: 4,
            y: 2,
            color: color`H`
        })
        getFirst(player).y -= speedY

        speedY -= 1
        if (speedY < -1) {
            speedY = -1
        }
        let tBellowPlayer = getTile(getFirst(player).x, getFirst(player).y + 1)
        if (tBellowPlayer[0]?.type == "b") {
            jumping = 0
        }
        lastY = getFirst(player).y

        if (tilesWith(spike, player)[0] != undefined) {
            lives -= 1
            Rsmap()
            if (lives <= 0) {
                clearText()
                level = 0
                dead = 1
                Rsmap()
                addText("Game Over", {
                    x: 6,
                    y: 7,
                    color: color`3`
                })
                addText("Press I to retry", {
                    x: 3,
                    y: 10,
                    color: color`3`
                })
            }
        }
        if (tilesWith(win, player)[0] != undefined) {
            level += 1
            if (lives <= 6) {
                lives += 1
            }
            Rsmap()

        }
        if (tilesWith(key, player)[0] != undefined) {
            keys += 1

            let xx = getFirst(player).x
            let yy = getFirst(player).y
            clearTile(xx, yy)
            addSprite(xx, yy, player)
            playTune(tune`
500,
500: B5/500,
15000`)

        }
        if (tilesWith(end, player)[0] != undefined) {
            clearText()
            dead = 1
            addText("You Win!", {
                x: 6,
                y: 5,
                color: color`3`
            })

            addText("Press I to replay", {
                x: 2,
                y: 10,
                color: color`3`
            })
            level = 0
            Rsmap()

        }
        for (let i = 0; i < getAll(enemy).length; i += 1) {
            let tbe = getTile(getAll(enemy)[i].x, getAll(enemy)[i].y + 1)
            if (tbe[0]?.type == "b") {
                emove[i] = -1
            }
            if (tbe[0]?.type == "p") {
                lives -= 1
                Rsmap()
                if (lives <= 0) {
                    clearText()
                    level = 0
                    dead = 1
                    Rsmap()
                    addText("Game Over", {
                        x: 6,
                        y: 7,
                        color: color`3`
                    })
                    addText("Press I to retry", {
                        x: 3,
                        y: 10,
                        color: color`3`
                    })
                }
            }
            let tbe2 = getTile(getAll(enemy)[i].x, getAll(enemy)[i].y - 1)
            if (tbe2[0]?.type == "b") {
                emove[i] = 1
            }
            if (tbe2[0]?.type == "p") {
                lives -= 1
                Rsmap()
                if (lives <= 0) {
                    clearText()
                    level = 0
                    dead = 1
                    Rsmap()
                    addText("Game Over", {
                        x: 6,
                        y: 7,
                        color: color`3`
                    })
                    addText("Press I to retry", {
                        x: 3,
                        y: 10,
                        color: color`3`
                    })
                }
            }
            getAll(enemy)[i].y += emove[i]
        }
        if (keys >= 32) {
            let tilesW = tilesWith(door)
            if (tilesW[0] != undefined) {
                if (getTile(tilesW[0][0].x, tilesW[0][0].y).length == 1) {
                    clearTile(tilesW[0][0].x, tilesW[0][0].y)
                }
            }
        }
    }

}, 100)

function Rsmap() {
    setMap(levels[level])

    for (let i = 0; i < getAll(enemy).length; i += 1) {
        emove[i] = 1
    }
}