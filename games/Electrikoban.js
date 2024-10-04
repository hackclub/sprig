/*
@title: Electrikoban
@author: algov
@tags: ['strategy']
@addedOn: 2022-11-16
*/

const player = "p";
const brick = "b";
const generator = "g";
const wire = "w";
const wire_on = "k";
const lamp_off = "f";
const lamp_on = "o";

setLegend(
  [ player, bitmap`
................
.....111111.....
....11011011....
....11111111....
.....111111.....
................
......7777......
......7777......
..11..7777..11..
..11..7777..11..
......7777......
......7777......
.3333......3333.
.3333......3333.
................
................`],
  [ brick, bitmap`
111L0111111L011L
LLLL01LLLLLL01LL
LLLL0LLLLLLL0LLL
0000000000000000
L011111L01111110
L01LLLLL01LLLLL0
L0LLLLLL0LLLLLL0
0000000000000000
1L01111111011111
LL01LLLLLL01LLLL
LL0LLLLLLL0LLLLL
0000000000000000
1111110111111101
LLLLLL01LLLLLL01
LLLLLL0LLLLLLL0L
0000000000000000`],
  [ generator, bitmap`
................
..111111111111..
.11LL111111LL11.
.11LL111111LL11.
.C1111111111119.
.CC303333333399.
.CC000333300099.
.CC303333333399.
.0C333333333391.
.00LLLLLLLLLL11.
.00LLLLLLLLLL11.
.00LLLLLLLLLL11.
.00LLLLLLLLLL11.
.00LLLLLLLLLL11.
.00LLLLLLLLLL11.
................`],
  [ wire, bitmap`
1111111111111111
1111111111111111
11............11
11............11
11.......1....11
11......1.....11
11....11......11
11...11.......11
11...11111....11
11.....11.....11
11....11......11
11...1........11
11............11
11............11
1111111111111111
1111111111111111`],
  [ wire_on, bitmap`
6666666666666666
6666666666666666
66............66
66............66
66............66
66.......6....66
66.....66.....66
66....66......66
66....6666....66
66......66....66
66.....66.....66
66....66......66
66............66
66............66
6666666666666666
6666666666666666`],
  [ lamp_off, bitmap`
................
....11111111....
...1........1...
..1..........1..
.1............1.
.1............1.
.1..000..000..1.
.1..0.0..0.0..1.
.1..00000000..1.
.1....0..0....1.
.1....0..0....1.
.1....0..0....1.
..1...0..0...1..
...1..0..0..1...
....11111111....
......FFFF......`],
  [ lamp_on, bitmap`
................
....FFFFFFFF....
...F66666666F...
..F6666666666F..
.F666666666666F.
.F666666666666F.
.F662226622266F.
.F662626626266F.
.F662222222266F.
.F666626626666F.
.F666626626666F.
.F666626626666F.
..F6662662666F..
...F66266266F...
....FFFFFFFF....
......1111......`]
);

setSolids([player, brick, generator, wire, wire_on, lamp_off]);

let level = 0;
const levels = [
  map`
...f...
.....w.
.w.....
...w...
...g..p`,
  map`
.p.........
...........
.....gf....
b..b.w.....
......w....
......w....
b..b...w...
.....w.....
..f.w......
..w..w.....
...........`,
  map`
..........
..........
..p...g...
...b..w...
....w...w.
..b...b...
.....w.w..
...fb.....
..w...w...
..........`,
  map`
.....www.f.
..w..b..ww.
....b......
..w.www....
.....b.w...
.....b.w...
.w...b.w...
...w.ww....
p.g..b.....`,
  map`
p....b.f...
....wwww...
.....b..w..
.....b..w..
..w..www...
.....b.....
.w...b.....
..w..b.....
.....b.....
...g.b.....`,
  map`
p....b.....
.....www...
g..w.b..w..
.w...b..w..
....wwww...
.w...b.....
.....www...
..w..b..wf.
.....b...w.`,
  map`
.....f.f...
...bbw...w.
.....b.w...
....bbb....
.w..wwww...
....bbb....
...w.b.....
..w.pb.....
g..bbbbb.p.`,
  map`
...........
..fw.wwf...
.w...b...w.
....wb.g..p
.w...bfffbb
.wwbbbwww..
...f.b...w.
.w.wwww....
...........`,
  map`
..f..b..f..
.w...b...w.
.w...b..w..
...w.b...w.
..w..b..w..
.....b.....
..ww.b.ww..
p.g..b..g.p`
];

setMap(levels[level]);

setPushables({
  [player]: [wire, wire_on],
});

onInput("s", () => {
  getAll(player).forEach((p) => {
    p.y += 1
  });
});

onInput("w", () => {
  getAll(player).forEach((p) => {
    p.y -= 1
  });
});

onInput("a", () => {
  getAll(player).forEach((p) => {
    p.x -= 1
  });
});

onInput("d", () => {
  getAll(player).forEach((p) => {
    p.x += 1
  });
});

onInput("j", () => {
  setMap(levels[level]);
});

var help = -2
onInput("i", () => {
  clearText();
  switch(help){
    case -2:
      addText("Press 'i'=next >", { y: 1, color: color`3` });
      break;
    case -1:
      addText("Use wasd to move. >", { y: 1, color: color`3` });
      break;
    case 0:
      addText("Push the >", { y: 1, color: color`3` });
      break;
    case 1:
      addText("wires to power >", { y: 1, color: color`3` });
      break;
    case 2:
      addText("the lights. >", { y: 1, color: color`3` });
      break;
    case 3:
      addText("Reset the >", { y: 1, color: color`3` });
      break;
    case 4:
      addText("level with 'j'", { y: 1, color: color`3` });
      break;
    case 5:
      help = -2;
      break;
  }
  help += 1;
});

var won = false;
var x = 0;
var y = 0;
var loading = false;
function light_lamp(){
    getAll(lamp_on).forEach((l) => {
        x = l.x;
        y = l.y;
        clearTile(x,y);
        addSprite(x, y, lamp_off);
    });
    getAll(wire_on).forEach((r) => {
      getAll(lamp_off).forEach((l) => {
      if(l.y == r.y - 1 && l.x == r.x){
        x = l.x;
        y = l.y;
        clearTile(x,y);
        addSprite(x, y, lamp_on);
        won = true;
        getAll(lamp_off).forEach((l) => {
          won = false;
        });
        if(loading == false){
          if(won == true){
            loading = true;
            clearText();
            addText("You won !", { y: 2, color: color`D` });
            setTimeout(function(){
              level += 1;
              try{
                setMap(levels[level]);
                clearText();
                light_wires();
                loading = false;
              }
              catch(err){
                addText("You finished the", { y: 1, color: color`3` });
                addText("game ! Create a", { y: 2, color: color`3` });
                addText("new level by", { y: 3, color: color`3` });
                addText("modifying the", { y: 4, color: color`3` });
                addText("game file.", { y: 5, color: color`3` });
              }
              
            },2500);
        }
        }
      }
      });
    });
}

function light_wires(){
  getAll(wire).forEach((w) => {
    getAll(generator).forEach((g) => {
    if(g.y >= w.y - 1 && g.x >= w.x -1 && g.y <= w.y + 1 && g.x <= w.x + 1){
      clearTile(w.x, w.y);
      addSprite(w.x, w.y, wire_on);
    }
    });
    getAll(wire_on).forEach((r) => {
      if(r.y >= w.y - 1 && r.x >= w.x -1 && r.y <= w.y + 1 && r.x <= w.x + 1){
        clearTile(w.x, w.y);
        addSprite(w.x, w.y, wire_on);
      }
    });
});
}

var deactivate = false;
function deactivate_wires(){
  getAll(wire_on).forEach((w) => {
        x = w.x;
        y = w.y;
        clearTile(x, y);
        addSprite(x, y, wire);
    });
    var i = 0;
    getAll(wire).forEach((w) => {
        i += 1;
    });
    for(var a = 0; a < i; a++){
      light_wires();
    }
}
          

function actuate_wires(){
    deactivate_wires();
    light_lamp();
  
}

afterInput(() => {
  actuate_wires();
});

actuate_wires();
setTimeout(function(){
addText("Press 'i' for", { y: 1, color: color`3` });
addText("help.", { y: 2, color: color`3` });
}, 250);