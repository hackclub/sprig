/*
@title: Infinite Shooter
@author: not_a_robot
@tags: ['endless']
@addedOn: 2022-11-05

Bad guys drop from the top, shoot them to get points. The faster they are, the
more points you get!
Their speed is random, but they spawn progressively quickly as the game goes
on.
*/

// global game state
var has_lost = false;
var score = 0;

// maps
const level = map`
............
............
............
............
............
............
............
............`;
setMap(level);

// set sprites
const player = "p";
const bullet = "b";
const bad_guy = "v";
const explosion = "e";
const bg = "g";
setLegend(
  [player, bitmap`
.......00.......
......0330......
.....003300.....
.....03DD30.....
....00333300....
....03D33D30....
...0033DD3300...
...0333333330...
..006666666600..
..036HHHHHH630..
.00336HHHH63300.
.033336HH633330.
0033333663333300
0333333333333330
0333333333333330
0000000000000000`],
  [bullet, bitmap`
................
................
........6.......
.......666......
.......666......
........6.......
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
  [bad_guy, bitmap`
0000000000000000
0DDDDDDDDDDDDDD0
0DDDDDDDDDDDDDD0
00DDDDD55DDDDD00
.0DDDD5FF5DDDD0.
.00DD5FFFF5DD00.
..0D5FFFFFF5D0..
..005555555500..
...0DDDDDDDD0...
...00DDHHDD00...
....0DHDDHD0....
....00DDDD00....
.....0DHHD0.....
.....00DD00.....
......0DD0......
.......00.......`],
  [explosion, bitmap`
....9....3....C.
.C....6....3....
..6....333..6.C.
9.....39993..6..
..9..39966936...
....396606693..3
.9.396602066933.
..3966022206693.
..3360222220633.
..3966022206693.
.3.39660206693.3
....39660C693...
.....3966693....
.C.9..39993.C.3.
.....9.333...C..
C...............`],
  [bg, bitmap`
0000000000000000
0000000000000000
000010L100000000
0000022L00000000
0000L12000000000
0000LL0L00000000
0000000000001L00
0000000000002100
000000000001L000
0000000000000000
0000000000000000
0000000000000000
0L1L000000LL1200
0122L00000022100
0022100000022L00
000L000000L00000`]
);
setSolids([player, bullet, bad_guy]);
setPushables([bad_guy]); // faster bad guys push slower ones if they bump

// background
setBackground(bg);

// draw initial sprites
addSprite(Math.floor(width()/2), height()-1, player);

// keep dropping bad guys
let i = 1000;
let inf_intrvl = setInterval(() => {
  let bad_guy_x = Math.floor(Math.random()*(width()-1));
  addSprite(bad_guy_x, 0, bad_guy);
  let cur_guy = getTile(bad_guy_x, 0)[0];
  let speed = Math.random() * 300 + 50;
  let bad_intrvl = setInterval(() => {
    let sprite_list = getTile(cur_guy.x, cur_guy.y+1);
    // all collision checking done by each bad_guy
    for (let i = 0; i < sprite_list.length; i++) {
      if (sprite_list[i].type == "b") {
        clearTile(cur_guy.x, cur_guy.y+1);
        cur_guy.remove();
        playTune(tune`
100: a4-100 + d4-100,
100: b4/100,
3000`);
        score += Math.round(350/speed);  // score increases with bad_guy speed
        clearInterval(bad_intrvl);
      }
      if (sprite_list[i].type == "p") {
        has_lost = true;
        cur_guy.remove();
        let exp_x = getFirst(player).x, exp_y = getFirst(player).y;
        getFirst(player).remove();
        addSprite(exp_x, exp_y, explosion);
        playTune(tune`
100: d4-100,
100: c4/100,
100: d4^100,
2900`);
        addText("Final score: "+score, {
          x: 0,
          y: 2,
          color: color`4`
        });
        clearInterval(bad_intrvl);
        clearInterval(inf_intrvl);
      }
    }
    if (cur_guy.y == height() - 1) {
      cur_guy.remove();
      clearInterval(bad_intrvl);
    }
    cur_guy.y += 1;
    speed = Math.random() * 300 + 50;
  }, speed);
  i *= 0.9; // slowly increase how often a bad guy is dropped
}, i);
  
// player controls
onInput("d", () => {
  if (!has_lost && getFirst(player)) {
    getFirst(player).x += 1;
  }
});
onInput("a", () => {
  if (!has_lost && getFirst(player)) {
    getFirst(player).x -= 1;
  }
});
onInput("w", () => {
  if (!has_lost && getFirst(player)) {
    getFirst(player).y -= 1;
  }
});
onInput("s", () => {
  if (!has_lost && getFirst(player)) {
    getFirst(player).y += 1;
  }
});
onInput("k", () => {
  if (!has_lost) {
    addSprite(getFirst(player).x, getFirst(player).y-1, bullet);
    playTune(tune`
100: c5-100,
3100`);
    let cur_bul = getTile(getFirst(player).x, getFirst(player).y-1)[0];
    let interval = setInterval(() => {
      if (cur_bul.y == 0) {
        cur_bul.remove();
        clearInterval(interval);
      }
      cur_bul.y -= 1;
    }, 100);
  }
})
