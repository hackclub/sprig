/*
@title: Coding Demo 3: Custom Directional Solids
@author: Leonard (Omay)
@tags: []
@addedOn: 2022-10-20
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
);

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
