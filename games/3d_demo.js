/*
@title: 3D Demo
@author: William Choi-Kim
@tags: []
@addedOn: 2024-10-22
*/

// rendering framework
setLegend(
  [ "0", bitmap`
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
0000000000000000` ],
  [ "1", bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL` ],
  [ "2", bitmap`
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
1111111111111111` ],
  [ "3", bitmap`
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
................` ],
  [ "e", bitmap`
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
3333333333333333` ]
)

function cleanCanvas() {
  let c = new Array(128)
  for (let j = 0; j < c.length; j++) {
    c[j] = new Array(160).fill(3)
  }
  return c
}

var globalCanvas = cleanCanvas()
function renderCanvas() {
  let outputMap = globalCanvas.map(x => (x == undefined) ? 4 : x).map(x => x.join(""))
  let cropped = outputMap.map(row => row.slice(0, 160)).join("\n")
  setMap(map`${cropped}`)
}
renderCanvas(cleanCanvas())

function clearCanvas() {
  globalCanvas = cleanCanvas()
}
function drawLine(pt1, pt2, color=0) {
  let x1 = pt1[0]
  let y1 = pt1[1]
  let x2 = pt2[0]
  let y2 = pt2[1]
  
  let biggerX = Math.max(x1, x2)
  let smallerX = Math.min(x1, x2)
  let biggerY = Math.max(y1, y2)
  let smallerY = Math.min(y1, y2)

  if (y2 == y1) {
    // horizontal
    for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
      try {
        globalCanvas[y1][x] = color
      } catch (e) {
        break
      }
    }
  } else if (x2 == x1) {
    // vertical
    for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
      try {
        globalCanvas[y][x1] = color
      } catch (e) {
        break
      }
    }
  } else if ((biggerX - smallerX) > (biggerY - smallerY)) {
    // less steep than y = x
    for (let y = smallerY; y < biggerY; y++) {
      let xi = Math.round(x1 + (y - y1)/(y2 - y1)*(x2 - x1))
      let xf = Math.round(x1 + (y + 1 - y1)/(y2 - y1)*(x2 - x1))
      
      for (let x = Math.min(xi, xf); x <= Math.max(xi, xf); x++) {
        try {
          globalCanvas[y][x] = color
        } catch (e) {
          break
        }
      }
    }
  } else {
    // more steep than y = x
    for (let x = smallerX; x < biggerX; x++) {
      let yi = Math.round(y1 + (x - x1)/(x2 - x1)*(y2 - y1))
      let yf =  Math.round(y1 + (x + 1 - x1)/(x2 - x1)*(y2 - y1))
      
      for (let y = Math.min(yi, yf); y <= Math.max(yi, yf); y++) {
        try {
          globalCanvas[y][x] = color
        } catch (e) {
          break
        }
      }
    }
  }

  try {
    globalCanvas[y1][x1] = color
  } catch (e) {}
  try {
    globalCanvas[y2][x2] = color
  } catch (e) {}
}

function translatePt(pt, x, y) {
  return [pt[0] + x, pt[1] + y]
}

// simple perspective 3d renderer

function getProjectedPoints(pts, focalLength, scale=1) {
  let resultingPts = new Array(pts.length)
  let cameraLoc = [0, -focalLength, 0]

  for (let i = 0; i < pts.length; i++) {
    let pt = pts[i]
    let dist = pt[2] + focalLength
    resultingPts[i] = [
      Math.round(pt[0]/dist*scale),
      Math.round(pt[1]/dist*scale)
    ]
  }
  return resultingPts
}

function drawFaces(faces, focalLength, scale=1, translate=[80,64], color=0) {
  for (let face of faces) {
    let ppts = getProjectedPoints(face, focalLength, scale)
    for (let k = 0; k < face.length; k++) {
      drawLine(translatePt(ppts[k], translate[0], translate[1]), translatePt(ppts[(k + 1) % face.length], translate[0], translate[1]), color)
    }
  }
}

// game logic starts

function rotateProfile(profile, resolution=10) {
  let outputF = []
  let radii = profile.map(p => p[0])
  let maxrad = Math.max(...radii)
  for (let j = 0; j < resolution; j++) {
    let theta1 = 2*Math.PI/resolution * j
    let theta2 = 2*Math.PI/resolution * ((j + 1) % resolution)
    for (let p = 0; p < profile.length - 1; p++) {
      outputF.push([
        [Math.cos(theta1)*profile[p][0], profile[p][1], maxrad + 1 + Math.sin(theta1)*profile[p][0]],
        [Math.cos(theta2)*profile[p][0], profile[p][1], maxrad + 1 + Math.sin(theta2)*profile[p][0]],
        [Math.cos(theta2)*profile[p + 1][0], profile[p + 1][1], maxrad + 1 + Math.sin(theta2)*profile[p + 1][0]],
        [Math.cos(theta1)*profile[p + 1][0], profile[p + 1][1], maxrad + 1 + Math.sin(theta1)*profile[p + 1][0]]
      ])
    }
  }
  return outputF
}

function teapotAndLid(p1, p2) {
  return [
    // pot
    rotateProfile([
      [3 + p2, 0],
      [4 + p2, 0.2],
      [4.5 + p1, 1.3],
      [4, 2.3],
      [3, 2.5]
    ], 20),
    // lid
    rotateProfile([
      [3.1 + p2, -.05],
      [2.5 + p2, -.3],
      [0.2, -.45],
      [0.3, -.8],
      [0.2, -.85]
    ], 10)
  ]
}
function cylinder(p1, p2) {
  return [
    rotateProfile([
      [4 + p1, -1.5],
      [4 + p2, 1.5]
    ], 20)
  ]
}
function cone(p1, p2) {
  return [
    rotateProfile([
      [p1, -4],
      [4 + p2, 2]
    ], 20)
  ]
}

var polyI = 0
var polyhedra = [
  teapotAndLid,
  cylinder,
  cone
]
var param1 = 0
var param2 = 0
var color = 0
function updateScreen() {
  clearCanvas()

  for (let p of polyhedra[polyI](param1, param2)) {
    drawFaces(p, 1, 50, [80, 64], color)
  }
  renderCanvas()
}
updateScreen()

onInput("s", () => {
  color = (color + 2) % 3
})
onInput("w", () => {
  color = (color + 1) % 3
})
onInput("d", () => {
  polyI = (polyI + 1)%polyhedra.length
  param1 = 0
  param2 = 0
})
onInput("a", () => {
  polyI = (polyI - 1 + polyhedra.length)%polyhedra.length
  param1 = 0
  param2 = 0
})

onInput("i", () => {
  param2 += 0.1
})
onInput("k", () => {
  param2 -= 0.1
})
onInput("j", () => {
  param1 -= 0.1
})
onInput("l", () => {
  param1 += 0.1
})

afterInput(() => {
  updateScreen()
})
