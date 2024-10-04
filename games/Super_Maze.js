/*
@title: Super Maze
@author: the_knights_of_rohan
@tags: ['strategy']
@addedOn: 2023-02-08

Use wasd to move and get to the present. Try to figure out what the special tiles do!
Directional tiles taken from Leonard's Coding Demo 3.
*/

const onewayw = "w";
const onewayd = "d";
const oneways = "s";
const onewaya = "a";
const player = "p";
const wall = "W";
const background = "b";
const goal = "g";
const lava = "l";
const greenTeleporter = "T";
const blueTeleporter = "t";

setLegend(
  [player, bitmap`
................
................
..000000000000..
..022222222220..
..022222222220..
..022002200220..
..022002200220..
..022222222220..
..022222222220..
..022222222220..
..022000000220..
..022222222220..
..022222222220..
..000000000000..
................
................`],
  [onewayw, bitmap`
................
..111111111111..
.12222222222221.
.12222222222221.
..111111111111..
..LLLLLLLLLLLL..
.LLLLLL00LLLLLL.
.LLLLL0000LLLLL.
.LLLL000000LLLL.
.LLLLLLLLLLLLLL.
.LLLLLL00LLLLLL.
.LLLLL0000LLLLL.
.LLLL000000LLLL.
.LLLLLLLLLLLLLL.
..LLLLLLLLLLLL..
................`],
  [onewayd, bitmap`
................
..LLLLLLLL..11..
.LLLLLLLLLL1221.
.LLLLLLLLLL1221.
.LLLLLLLLLL1221.
.LL0LLL0LLL1221.
.LL00LL00LL1221.
.LL000L000L1221.
.LL000L000L1221.
.LL00LL00LL1221.
.LL0LLL0LLL1221.
.LLLLLLLLLL1221.
.LLLLLLLLLL1221.
.LLLLLLLLLL1221.
..LLLLLLLL..11..
................`],
  [oneways, bitmap`
................
..LLLLLLLLLLLL..
.LLLLLLLLLLLLLL.
.LLLL000000LLLL.
.LLLLL0000LLLLL.
.LLLLLL00LLLLLL.
.LLLLLLLLLLLLLL.
.LLLL000000LLLL.
.LLLLL0000LLLLL.
.LLLLLL00LLLLLL.
..LLLLLLLLLLLL..
..111111111111..
.12222222222221.
.12222222222221.
..111111111111..
................`],
  [onewaya, bitmap`
................
..11..LLLLLLLL..
.1221LLLLLLLLLL.
.1221LLLLLLLLLL.
.1221LLLLLLLLLL.
.1221LLL0LLL0LL.
.1221LL00LL00LL.
.1221L000L000LL.
.1221L000L000LL.
.1221LL00LL00LL.
.1221LLL0LLL0LL.
.1221LLLLLLLLLL.
.1221LLLLLLLLLL.
.1221LLLLLLLLLL.
..11..LLLLLLLL..
................`],
  [wall, bitmap`
C2CCC2CCC2CCC2CC
C2CCC2CCC2CCC2CC
C2CCC2CCC2CCC2CC
2222222222222222
CCC2CCC2CCC2CCC2
CCC2CCC2CCC2CCC2
CCC2CCC2CCC2CCC2
2222222222222222
C2CCC2CCC2CCC2CC
C2CCC2CCC2CCC2CC
C2CCC2CCC2CCC2CC
2222222222222222
CCC2CCC2CCC2CCC2
CCC2CCC2CCC2CCC2
CCC2CCC2CCC2CCC2
2222222222222222`],
  [background, bitmap`
DDDDDDCDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDCDDDD
DDCCDDDDDDDCDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDCDDDDDDDD
DDDDDDDDDDDCDDDD
DDCDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDCCDDDDCDDD
DDCDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [goal, bitmap`
................
.....66..66.....
....6.6..6.6....
....6.6666.6....
.....666666.....
.33333366333333.
.33333366333333.
.33333366333333.
.33333366333333.
.66666666666666.
.66666666666666.
.33333366333333.
.33333366333333.
.33333366333333.
.33333366333333.
................`],
  [lava, bitmap`
9999999999999999
9999999999999999
9966999969999699
9999999999999999
9999999999999999
9999999699999999
9999999699999999
9999699999969999
9999999999999999
9999999999999999
9999999699999999
9699999999699999
9999999999999999
9996699999999699
9999999999999699
9999999999999999`],
  [greenTeleporter, bitmap`
................
................
................
.....2222222....
....22DDDDD22...
...22DDDD4DD22..
...2DDD4DDDDD2..
...2DDDDDDDDD2..
...2D4D4DDD4D2..
...2DDDDDDDDD2..
...2DDDDDD4DD2..
...22DD4DDDD22..
....22DDDDD22...
.....2222222....
................
................`],
  [blueTeleporter, bitmap`
................
................
................
.....2222222....
....225555522...
...22555575522..
...25575555552..
...25555555552..
...25755557552..
...25555555552..
...25575555552..
...22555575522..
....225555522...
.....2222222....
................
................`],
);

setSolids([player, wall]);
setBackground([background]);

let level = 0;

const levels = [
  map`
........
......g.
.p......
........`,
  map`
pW....W...
.W.WW.W.W.
.WW.....WW
.....W.WW.
WWWW.W....
.W.W....WW
.W....WWW.
...WW....g`,
  map`
pd..W..W..
....s..d.W
.w..a.w.W.
..W..Wd...
.sWw..W.a.
..W...a.Wg`,
  map`
pW...W...l
.W.W.W.WW.
...Ws.l.d.
WW.d.a..Ww
lW.lld..Wg
.W.WWw..W.
.a.lW.lWW.
.a..a.w...`,
  map`
p..Wllllll
..tWllllll
WWWWllllll
llllllllll
llllllllll
llllllWWWW
llllllWg..
llllllW..t`,
  map`
pds.lgl.Tl
wW..lsdall
..a.atda..
Wwd.lslWW.
.sdsdwW.s.
d.lwWl.d.a
.Wl.lW.sll
TWWw.a..tl`,
  map`
..........
..........
..........
..........
..........
.....p....
..........
..........`,
];

setMap(levels[level]);

/*Important stuff*/
const noUp = [oneways];//Can't move up into
const noRight = [onewaya];//Can't move right into
const noDown = [onewayw];//Can't move down into
const noLeft = [onewayd];//Can't move left into
//Moving: the object that is moving.
//Dir: the direction the object is moving. (up, right, down, left)
function checkMove(moving, dir){
  if (dir === "up") {
    var goal = getTile(moving.x, moving.y-1).map(x => x.type);
    for (var i = 0; i < goal.length; i++) {
      if (noUp.includes(goal[i])) {
        return false;
      }
    }
    return true;
  } else if (dir === "right") {
    var goal = getTile(moving.x+1, moving.y).map(x => x.type);
    for (var i = 0; i < goal.length; i++) {
      if (noRight.includes(goal[i])) {
        return false;
      }
    }
    return true;
  } else if (dir === "down") {
    var goal = getTile(moving.x, moving.y+1).map(x => x.type);
    for (var i = 0; i < goal.length; i++) {
      if (noDown.includes(goal[i])) {
        return false;
      }
    }
    return true;
  } else if(dir === "left") {
    var goal = getTile(moving.x-1, moving.y).map(x => x.type);
    for (var i = 0; i < goal.length; i++) {
      if (noLeft.includes(goal[i])) {
        return false;
      }
    }
    return true;
  }
}

/*Example*/
onInput("w", () => {
  if (checkMove(getFirst(player), "up")) {
    getFirst(player).y -= 1
  }
});
onInput("a", () => {
  if (checkMove(getFirst(player), "left")) {
    getFirst(player).x -= 1
  }
});
onInput("s", () => {
  if (checkMove(getFirst(player), "down")) {
    getFirst(player).y += 1
  }
});
onInput("d", () => {
  if (checkMove(getFirst(player), "right")) {
    getFirst(player).x += 1
  }
});

afterInput(() => {
  if (getFirst(player).x == getFirst(goal).x && getFirst(player).y == getFirst(goal).y) {
    level++;
    setMap(levels[level]);
    if (level == 6) {
      addText("You win!", {
        x: 6, 
        y: 5, 
        color: color`6`,
      });
    }
  } 
  
  getAll(lava).forEach((currentLavaBlock) => {
    if (currentLavaBlock.x == getFirst(player).x && currentLavaBlock.y == getFirst(player).y) {
      setMap(levels[level]);
    }
  });

  let teleporterMap = new Map([
    [getAll(greenTeleporter)[0], getAll(greenTeleporter)[1]],
    [getAll(greenTeleporter)[1], getAll(greenTeleporter)[0]],
    [getAll(blueTeleporter)[0], getAll(blueTeleporter)[1]],
    [getAll(blueTeleporter)[1], getAll(blueTeleporter)[0]],
  ]);
  
  for (let i = 0; i < getAll(greenTeleporter).length; i++) {
    if (getAll(greenTeleporter)[i].x == getFirst(player).x && getAll(greenTeleporter)[i].y == getFirst(player).y) {
      getFirst(player).x = teleporterMap.get(getAll(greenTeleporter)[i]).x;
      getFirst(player).y = teleporterMap.get(getAll(greenTeleporter)[i]).y;
      break;
    }
  }

  for (let i = 0; i < getAll(blueTeleporter).length; i++) {
    if (getAll(blueTeleporter)[i].x == getFirst(player).x && getAll(blueTeleporter)[i].y == getFirst(player).y) {
      getFirst(player).x = teleporterMap.get(getAll(blueTeleporter)[i]).x;
      getFirst(player).y = teleporterMap.get(getAll(blueTeleporter)[i]).y;
      break;
    }
  }
});






