/*
@title: Julia Set
@author: Nathan
@tags: ['sandbox','simulation']
@addedOn: 2025-01-08
Instructions:
Explore different Julia Sets

Controls:
    w - Move up
    s - Move down
    a - Move left
    d - Move right

    j, l - Change between modes: zoom, resolution, and julia position

    Mode: Zoom
    i - Zoom in
    k - Zoom out

    Mode: Resolution
    i - Increase resolution (Worse performance)
    k - Decrease resoltuion (Better performance)

    Mode: Julia position
    w,a,s,d - Move position
*/

let iterations;

const a = "0";
const b = "1";
const c = "2";
const d = "3";
const e = "4";
const f = "5";
const g = "6";
const h = "7";
const i = "8";
const j = "9";

setLegend(
    [ a, bitmap`
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
    [ b, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],
    [ c, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`],
    [ d, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`],
    [ e, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],
    [ f, bitmap`
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
    [ g, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666`],
    [ h, bitmap`
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
7777777777777777
7777777777777777
7777777777777777`],
    [ i, bitmap`
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888`],
    [ j, bitmap`
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
9999999999999999`]
);


class Complex {
    constructor(r, i) {
        this.r = r;
        this.i = i;
    }
    add(other) {
        return new Complex(this.r + other.r, this.i + other.i);
    }
    abs() {
        return Math.sqrt(Math.pow(this.r, 2) + Math.pow(this.i, 2))
    }
    square() {
        return new Complex((this.r * this.r) - (this.i * this.i), (this.r * this.i) + (this.i * this.r));
    }
}

function julia(x, y) {
    let c = juliaPos
    let iterations = 0
    let z = new Complex(x, y)
    while (z.abs() <= 2 && iterations < (Math.log2(max) * 64)) {
        z = c.add(z.square())
        iterations += 1
    }
    return [iterations, z.abs()]
}

let resolution = 64
let max = resolution
let xOffset = 0
let yOffset = 0

let maxIterations = 64

let resFac = 1.25
let moveFac = 0.2
let zoomFac = 0.2
let posFac = 0.01

let mode = "zoom"

let juliaPos = new Complex(0.3, 0.5)

function render() {
    var screen = ``

    for (let x = 0; x < resolution; x++) {
        for (let y = 0; y < resolution; y++) {
            iterations = julia(((y / max) * 2) - 1 - xOffset, ((x / max) * 2) - 1 - yOffset)
            if (iterations[1] < 2) {
                screen += "0"
            } else if (iterations[0] > 64 * 0.6) {
                screen += "3"
            } else if (iterations[0] > 64 * 0.4) {
                screen += "9"
            } else if (iterations[0] > 64 * 0.3) {
                screen += "6"
            } else if (iterations[0] > 64 * 0.2) {
                screen += "4"
            } else if (iterations[0] > 64 * 0.1) {
                screen += "7"
            } else {
                screen += "5"
            }
            
        }
        screen += "\n"
    }
    setMap(screen);

    clearText()
    if (mode == "zoom") {
        addText("Zoom: 2^" + Math.log2(1 / (resolution/max)), { 
            x: 2, 
            y: 0, 
            color: color`0`
        })
    } else if (mode == "resolution") {
        addText("Res: " + Math.round(resolution * 1000) / 1000, { 
            x: 2, 
            y: 0, 
            color: color`0`
        })
    } else if (mode == "julia pos") {
        addText("Pos: " + juliaPos.r + "+" + juliaPos.i + "i", { 
            x: 2, 
            y: 0, 
            color: color`0`
        })
    }
    
    addText("Mode: " + mode, { 
        x: 2, 
        y: 15, 
        color: color`0`
    })
}

render()

//move
onInput("w", () => {
    if (mode != "julia pos") {
        yOffset += moveFac * (resolution/max)
    } else {
        juliaPos.i += posFac
        juliaPos.i = Math.round(juliaPos.i * 100) / 100
    }
    render()
})

onInput("s", () => {
    if (mode != "julia pos") {
        yOffset -= moveFac * (resolution/max)
    } else {
        juliaPos.i -= posFac
        juliaPos.i = Math.round(juliaPos.i * 100) / 100
    }
    render()
})

onInput("a", () => {
    if (mode != "julia pos") {
        xOffset += moveFac * (resolution/max)
    } else {
        juliaPos.r -= posFac
        juliaPos.r = Math.round(juliaPos.r * 100) / 100
    }
    render()
})

onInput("d", () => {
    if (mode != "julia pos") {
        xOffset -= moveFac * (resolution/max)
    } else {
        juliaPos.r += posFac
        juliaPos.r = Math.round(juliaPos.r * 100) / 100
    }
    render()
})

onInput("i", () => { //zoom, increase detail, or change julia position
    if (mode == "zoom") {
        max *= 2
        yOffset -= 1 * (resolution/max)
        xOffset -= 1 * (resolution/max)
    } else if (mode == "resolution") {
        resolution *= resFac
        max *= resFac
    } else if (mode == "julia pos") {
        posFac += 0.01
        posFac = Math.min(0.1, posFac)
    }
    
    render()
})

onInput("k", () => { //zoom, increase detail, or change julia position
    if (mode == "zoom") {
        max *= 0.5
        yOffset += 0.5 * (resolution/max)
        xOffset += 0.5 * (resolution/max)
    } else if (mode == "resolution") {
        resolution /= resFac
        max /= resFac
    } else if (mode == "julia pos") {
        posFac -= 0.01
        posFac = Math.max(0.01, posFac)

    }

    render()
})

onInput("j", () => { //change mode
    if (mode == "zoom") {
        mode = "resolution"
    } else if (mode == "resolution") {
        mode = "julia pos"
    } else if (mode == "julia pos") {
        mode = "zoom"
    }

    render()
})

onInput("l", () => { //change mode
    if (mode == "zoom") {
        mode = "julia pos"
    } else if (mode == "resolution") {
        mode = "zoom"
    } else if (mode == "julia pos") {
        mode = "resolution"
    }

    render()
})
