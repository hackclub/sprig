/*
@title: no limits
@author: AdrianRang
@tags: []
@addedOn: 2025-01-27
*/

let getLinePositions = (xs, ys, xe, ye) => {
  let posArr = []
  let dx = xe - xs;
  let dy = ye - ys;
  let steps = Math.max(Math.abs(dx), Math.abs(dy));
  let xIncrement = dx / steps;
  let yIncrement = dy / steps;
  let x = xs;
  let y = ys;
  for (let i = 0; i <= steps; i++) {
    posArr.push([Math.round(x), Math.round(y)]);
    x += xIncrement;
    y += yIncrement;
  }
  return posArr;
}

const dark = "d"
const darkGray = "G"
const lightGray = "g"
const light = "l"
const ray = "p"
const darkBlue = "B"
const intersect = "i"
const darkRed = "R"
const player = "r"

let xPos, yPos, rot

// middle of screeen
xPos = 80
yPos = 64
rot = Math.PI


// variables for 3d rendering
const fov = Math.PI / 3 // 30deg
const rayCount = 160
const rayLen = 100
const degBetweenRay = fov / rayCount
const distBetweenRay = 160 / rayCount

// variable for collision
let lm

// variables for maze generation
// maze generation project: https://sprig.hackclub.com/share/1myT1f8ZgFwymg8xN6zK
let maze = []
let mazeWidth = 17
let mazeHeight = 17
let startX = 1
let startY = 1
let currX = startX
let currY = startY

let level = 0


setLegend(
  [dark, bitmap`
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
  [darkGray, bitmap`
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
LLLLLLLLLLLLLLLL`],
  [lightGray, bitmap`
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
  [light, bitmap`
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
  [player, bitmap`
3377777777777733
3337777777777333
7333777777773337
7733377777733377
7773337777333777
7777333773337777
7777733333377777
7777773333777777
7777773333777777
7777733333377777
7777333773337777
7773337777333777
7733377777733377
7333777777773337
3337777777777333
3377777777777733`],
  [intersect, bitmap`
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
  [darkRed, bitmap`
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

  [darkBlue, bitmap`
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

  [ray, bitmap`
CCCCCCCCCCCCCCCC
C9C9C9C9C9C9C9C9
CCCCCCCCCCCCCCCC
C9C9C9C9C9C9C9C9
CCCCCCCCCCCCCCCC
C9C9C9C9C9C9C9C9
CCCCCCCCCCCCCCCC
C9C9C9C9C9C9C9C9
CCCCCCCCCCCCCCCC
C9C9C9C9C9C9C9C9
CCCCCCCCCCCCCCCC
C9C9C9C9C9C9C9C9
CCCCCCCCCCCCCCCC
C9C9C9C9C9C9C9C9
CCCCCCCCCCCCCCCC
C9C9C9C9C9C9C9C9`],
)

setSolids([])

for (let i = 0; i < mazeHeight; i++) {
  maze[i] = []
  for (let j = 0; j < mazeWidth; j++) {
    maze[i][j] = dark
  }
}

let moveFront = () => {
  //xPos -= 2
  xPos += Math.round(Math.sin(rot + Math.PI/2) * 2)
  yPos += Math.round(Math.cos(rot - Math.PI/2) * 2)
}

let moveDown = () => {
  xPos -= Math.round(Math.sin(rot + Math.PI/2) * 2)
  yPos -= Math.round(Math.cos(rot - Math.PI/2) * 2)
}

let moveLeft = () => {
  xPos -= Math.round(Math.sin(rot - Math.PI) * 2)
  yPos -= Math.round(Math.cos(rot - Math.PI/4) * 2)
}

let moveRight = () => {
  xPos += Math.round(Math.sin(rot + Math.PI) * 2)
  yPos += Math.round(Math.cos(rot - Math.PI/4) * 2)
}

let render = () => {
  // create map to the size of the screen
  let mapArr = []
  for (let y = 0; y < 128; y++) {
    mapArr[y] = []
    for (let x = 0; x < 160; x++) {
      mapArr[y][x] = `.`;
    }
  }

  const walls = [
    [5, 20, 40, 40],
    [100, 20, 120, 70]
  ] // test values

  //render walls for debuging
  for (let i = 0; i < walls.length; i++) {
    for (let y = walls[i][1]; y < walls[i][3]; y++) {
      for (let x = walls[i][0]; x < walls[i][2]; x++) {
        mapArr[y][x] = `d`
      }
    }
  }

  // collision detection
  if(mapArr[xPos][yPos] == dark){
    switch(lm){
      case "w":
        moveDown();
        break;
      case "a":
        moveRight();
        break;
      case "s":
        moveFront();
        break;
      case "d":
        moveLeft();
    }
  }


  // Generate rays
  let rays = []
  let theta = rot - fov / 2
  for (let r = 0; r < rayCount; r++) {
    let ex = (this.Math.cos(theta) * rayLen + xPos)
    let ey = (this.Math.sin(theta) * rayLen + yPos)
    //console.log(theta, ex, ey)
    rays[r] = getLinePositions(xPos, yPos, ex, ey);
    //console.log(rays[r])
    theta += degBetweenRay;
  }

  //render Rays
  let dists = []; // will be used for '3d' rendering
  let inter = false;
  let col = `p`
  rays.forEach((ray, i) => {
    inter = false

    // TODO: change to for so I can break
    for(let l = 0; l < ray.length; l++){
      let pos = ray[l];
      try {
        //if (mapArr[pos[0]][pos[1]] == `d`) inter = true;
        if (mapArr[pos[0]][pos[1]] == `d`) {
          inter = true;
          dists[i] = Math.hypot(Math.abs(pos[0] - xPos), Math.abs(pos[1] - yPos)) * Math.abs(Math.cos(Math.atan2(pos[0] - xPos, pos[1] - yPos)));
          break;
        }
        //mapArr[pos[0]][pos[1]] = inter ? `i` : `p`;
        mapArr[pos[0]][pos[1]] = col;
      } catch (e) {
        //console.log(pos[0], pos[1])
      }
    }
  });

  mapArr[xPos][yPos] = `r`


  // render 2D map with values of array
  let rendermap2D = map``
  for (let y = 0; y < 128; y++) {
    for (let x = 0; x < 160; x++) {
      rendermap2D += mapArr[y][x];
    }
    rendermap2D += `\n`
  }

  let rendermap3D = map``
  let map3D = [[]]
  for(let i = 0; i < 128; i++){
    map3D[i] = []
    for(let l = 0; l < 160; l++){
    if (i > 64){
      map3D[i][l] = dark;
      //if(i > 100) map3D[i][l] = (i+1)%2 == 0 || (l+1)%2 == 0? dark : ray
      if(i > 95) map3D[i][l] = (i + l)%2==0? dark : ray
      //if(i > 100) map3D[i][l] = i%2 == 0 && l%2 == 0? dark : ray
      if(i > 115) map3D[i][l] = ray
    }else{
      map3D[i][l] = dark
      //if(i < 27) map3D[i][l] = (i+1)%2 == 0 || (l+1)%2 == 0? dark : intersect
      if(i < 32) map3D[i][l] = (i + l)%2==0? dark: intersect
      //if(i < 10) map3D[i][l] = i%2 == 0 && l%2 == 0? dark : intersect
      if(i < 17) map3D[i][l] = intersect
    }
      
      //map3D[i][l] = i > 64 ? i > 96 ? ray : darkBlue : i < 32 ? intersect : darkRed // TODO: change to ifs and ad dithering effect
    }
  }

  for(let i = 0; i < rayCount; i++){
    for(let y = 0; y < (-dists[i] + 128); y++){
      //console.log(y)
      for(let x = i * distBetweenRay; x < i * distBetweenRay + distBetweenRay; x++){
        //console.log(Math.round(y+(-dists[i] / 2)))
        try{
          let col;
          if(dists[i] < 15){
            col = light
          }else if (dists[i] < 20){
             col = (y + x)%2==0? lightGray: light
          } else if(dists[i] < 25){
            col = lightGray
          }else if(dists[i] < 35){
            col =  (y + x)%2==0? darkGray: lightGray
          } else if(dists[i] < 45){
            col = darkGray
          }else if(dists[i] < 55){
            col =  (y + x)%2==0? darkGray: dark
          } else {
            col = dark
          }

        //if(segoal.includes(i) && x%2 == 0) col = goal
        map3D[Math.round(y+(dists[i] / 2))][x] = col;
        }catch(e){}
    
      }
    }
  }

  // render 3D map with values of array
  for (let y = 0; y < 128; y++) {
    for (let x = 0; x < 160; x++) {
      rendermap3D += map3D[y][x];
    }
    rendermap3D += `\n`
  }

  const levels = [
    rendermap2D,
    rendermap3D
  ]

  setMap(levels[level])
}


// Returns an array with maze values
function getMaze(){
  currX = startX
  currY = startY
  step()
  while(currX != startX && currY != startY){
    step()
  }
}

// Step in randomized depth first generation
function step(){
  maze[currCellY][currX] = open

  let succsesfull = false;
  // move in random direction as long as it is not open
  for (let i = 0; i < 100; i++) {
    if (succsesfull) break
    // Check if no moves are avalable

    if (checkAll(currX, currY)) {
      stack.pop()
      console.log("nsa", stack.length)
      currCellY = stack[stack.length - 1][0]
      currX = stack[stack.length - 1][1]
      maze[currCellY][currX] = selec
      break
    }
    let goX = getRandomDir() == 1;
    let dir = getRandomDir() * 2;
  

    let midCellX = currX
    let midCellY = currCellY
    if ((goX ? currX : currCellY) + dir > 0 && (goX ? currX : currCellY) + dir < (goX ? mwidth : mheight)) {
      console.log((goX ? currX : currCellY) + dir > 0 && (goX ? currX : currCellY) + dir < (goX ? mwidth : mheight))
      //console.log(currX, currCellY, dir, goX)
      if (maze[currCellY + (!goX ? dir : 0)][currX + (goX ? dir : 0)] == open) continue;
      if (goX){ currX += dir; midCellX += dir/2 }
      else {currCellY += dir; midCellY += dir/2 }
      succsesfull = true
      stack.push([currCellY, currX])
      maze[currCellY][currX] = selec
      maze[midCellY][midCellX] = open
      console.log(currX, currCellY, midCellX, midCellY)
    } else {
      succsesfull = false
    }
  }
}

function getRandomDir() {
  return Math.floor(Math.random() * 2) == 0 ? -1 : 1
}

function checkAll(x, y) {
  return check(x - 2, y) && check(x + 2, y) && check(x, y + 2) && check(x, y - 2)
}

function check(x, y) {
  //console.log(x, y)
  if (x < 1 || x >= mwidth || y < 1 || y >= mheight) return true

  try {
    if (maze[y][x] == open) return true
  } catch {
    return true
  }
  return false
}

render()
setPushables({
  [ player ]: []
})

onInput("l", () => {
  rot += 0.1
  render()
})

onInput("j", () => {
  rot -= 0.1
  render()
})

onInput("w", () => {
  moveFront()
  lm = "w"
  render()
})

onInput("a", () => {
  moveLeft()
  lm = "a"
  render()
})

onInput("s", () => {
  moveDown()
  lm = "s"
  render()
})

onInput("d", () => {
  moveRight()
  lm = "d"
  render()
})

onInput("i", () => {
  level = level == 0 ? 1 : 0
  render()
})

afterInput(() => {

})
