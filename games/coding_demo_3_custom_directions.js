/*
@title: Coding Demo 3: Custom Directional Solids
@author: Leonard (Omay)
Go to line 120 for the important code of this demo.
Change the variable "level" on line 104 to 1 to get the demo map.
*/

const onewayw = "w";
const onewayd = "d";
const oneways = "s";
const onewaya = "a";
const player = "p";

setLegend(
  [player, bitmap`
.....33333......
.....3...3......
.....33333......
......33........
.....333........
.....3.33.......
....3..33.......
....3..3.3......
.......3.33.....
.......33.3.....
......333.......
.....33.3.......
.....3..33......
....33...3......
....3....3......
....3....3......`],
  [onewayw, bitmap`
.11111111111111.
1222222222222221
1222222222222221
.11111111111111.
.LLLLLLLLLLLLLL.
LLLLLLL00LLLLLLL
LLLLLL0000LLLLLL
LLLLL000000LLLLL
LLLL00000000LLLL
LLLLLLLLLLLLLLLL
LLLLLLL00LLLLLLL
LLLLLL0000LLLLLL
LLLLL000000LLLLL
LLLL00000000LLLL
LLLLLLLLLLLLLLLL
.LLLLLLLLLLLLLL.`],
  [onewayd, bitmap`
.LLLLLLLLLL..11.
LLLLLLLLLLLL1221
LLLLLLLLLLLL1221
LLLLLLLLLLLL1221
LL0LLLL0LLLL1221
LL00LLL00LLL1221
LL000LL000LL1221
LL0000L0000L1221
LL0000L0000L1221
LL000LL000LL1221
LL00LLL00LLL1221
LL0LLLL0LLLL1221
LLLLLLLLLLLL1221
LLLLLLLLLLLL1221
LLLLLLLLLLLL1221
.LLLLLLLLLL..11.`],
  [oneways, bitmap`
.LLLLLLLLLLLLLL.
LLLLLLLLLLLLLLLL
LLLL00000000LLLL
LLLLL000000LLLLL
LLLLLL0000LLLLLL
LLLLLLL00LLLLLLL
LLLLLLLLLLLLLLLL
LLLL00000000LLLL
LLLLL000000LLLLL
LLLLLL0000LLLLLL
LLLLLLL00LLLLLLL
.LLLLLLLLLLLLLL.
.11111111111111.
1222222222222221
1222222222222221
.11111111111111.`],
  [onewaya, bitmap`
.11..LLLLLLLLLL.
1221LLLLLLLLLLLL
1221LLLLLLLLLLLL
1221LLLLLLLLLLLL
1221LLLL0LLLL0LL
1221LLL00LLL00LL
1221LL000LL000LL
1221L0000L0000LL
1221L0000L0000LL
1221LL000LL000LL
1221LLL00LLL00LL
1221LLLL0LLLL0LL
1221LLLLLLLLLLLL
1221LLLLLLLLLLLL
1221LLLLLLLLLLLL
.11..LLLLLLLLLL.`],
);

setSolids([]);

let level = 0;
const levels = [
  map`
pwdssaaws.
.dawwdsdw.
.wadadwas.
.dadwsawd.
.wwdadsda.
.adaswssw.
.dswssswa.
.waaddsas.`,
  map`
p........
.w.d.s.a.
.........`//test
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
  if(dir === "up"){
    var goal = getTile(moving.x, moving.y-1).map(x => x.type);
    for(var i = 0; i < goal.length; i++){
      if(noUp.includes(goal[i])){
        return false;
      }
    }
    return true;
  }else if(dir === "right"){
    var goal = getTile(moving.x+1, moving.y).map(x => x.type);
    for(var i = 0; i < goal.length; i++){
      if(noRight.includes(goal[i])){
        return false;
      }
    }
    return true;
  }else if(dir === "down"){
    var goal = getTile(moving.x, moving.y+1).map(x => x.type);
    for(var i = 0; i < goal.length; i++){
      if(noDown.includes(goal[i])){
        return false;
      }
    }
    return true;
  }else if(dir === "left"){
    var goal = getTile(moving.x-1, moving.y).map(x => x.type);
    for(var i = 0; i < goal.length; i++){
      if(noLeft.includes(goal[i])){
        return false;
      }
    }
    return true;
  }
}
/*Example*/
onInput("w", () => {
  if(checkMove(getFirst(player), "up")){
    getFirst(player).y -= 1
  }
});
onInput("a", () => {
  if(checkMove(getFirst(player), "left")){
    getFirst(player).x -= 1
  }
});
onInput("s", () => {
  if(checkMove(getFirst(player), "down")){
    getFirst(player).y += 1
  }
});
onInput("d", () => {
  if(checkMove(getFirst(player), "right")){
    getFirst(player).x += 1
  }
});
