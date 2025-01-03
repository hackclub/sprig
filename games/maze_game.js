/*
@title: 2_character_maze_game
@author: ivg1
@tags: ['maze', 'puzzle']
@addedOn: 2024-12-13
controls:
  w = up
  s = down
  a = left
  d = right
  j = restart level
info on sprites:
  player: two player sprites per level, each controlled at the same time
  wall: a wall
  moveable_wall: a wall that you can push around
  keys: open doors, have to also collect all of them
  door: door exist and block path -> key open door -> door disappear
  goal: BOTH players have to be on a goal to go to next level (and have all keys in a level collected)
  gem: a cool little collectible to extend levels
  huh: a way to beat a level by only ONE player standing on it (the ??? thing)
  huh_key: key to open huh_door to the huh portal
  huh_door: door exist -> door question -> door teleport :)
  thats it I believe.
*/

const player = "p";
const wall = "w";
const moveable_wall = "e";
const key = "k";
const key2 = "l";
const key3 = ";";
const door = "b";
const door2 = "n";
const door3 = "m";
const goal = "g";
const restart = "r";
const gem = "v";
const huh = "?";
const huh_key = ">";
const huh_door = "<";

let keys_needed = 1;
let keys_collected = 0;
let level = 0;
let can_proceed = false;
let gems_collected = 0;

//music section

const controls_tune = tune`
250: C5~250 + E4-250,
250: E5~250,
250: G5~250 + F4-250,
250,
250: D5~250 + E4-250,
250: F5~250,
250: A5~250 + D4-250,
250: E4-250,
250: C5~250 + F4-250,
250: E5~250 + E4-250,
250: G5~250 + D4-250,
250,
250: D4-250 + A4~250,
250: C5~250 + F4-250,
250: E5~250 + D4-250,
250,
250: F4-250 + C5~250,
250: E5~250,
250: G5~250,
250: G4-250,
250: D5~250,
250: F5~250,
250: A5~250 + E4-250,
250: F4-250,
250: C5~250,
250: E5~250,
250: G5~250,
250: D4-250,
250: B4~250 + E4-250,
250: D5~250 + D4-250,
250: F5~250 + C4-250,
250: D4-250 + A5~250`;
// let controls_music = playTune(controls_tune, Infinity);

const level_tune = tune`
500: C4^500,
500: E4^500,
500: G4^500,
500: E4^500,
500: C4^500,
500: E4^500,
500: G4^500,
500: B4^500,
500: C5^500,
500: A4^500,
500: F4^500,
500: A4^500,
500: C5^500,
500: A4^500,
500: D5^500,
500: C5^500,
500: B4^500,
500: G4^500,
500: E4^500,
500: G4^500,
500: B4^500,
500: G4^500,
500: C5^500,
500: B4^500,
500: A4^500,
500: F4^500,
500: D4^500,
500: F4^500,
500: G4^500,
500: E4^500,
500: F4^500,
500: D4^500`;
let level_music = playTune(controls_tune, Infinity); // playTune(level_tune, Infinity);
const beat_game_music = tune`
500: C4~500,
500: E4~500,
500: G4~500,
500: B4~500,
500: C5~500,
500: A4~500,
500: F4~500,
500: A4~500,
500: C5~500,
500: A4~500,
500: D5~500,
500: C5~500,
500: B4~500,
500: G4~500,
500: E4~500,
500: G4~500,
500: B4~500,
500: C5~500,
500: D5~500,
500: C5~500,
500: E5~500,
500: C5~500,
500: D5~500,
500: E5~500 + C5~500,
500: F5~500 + B4~500,
500: E5~500 + A4~500,
500: D5~500 + B4~500,
500: C5~500 + A4~500,
500: B4~500 + G4~500,
500: A4~500 + D4~500,
500: G4~500 + C4~500,
500: F4~500 + D4~500`;

const beat_level_sfx = tune`
300: C4/300 + F4/300,
300: D4/300 + G4/300,
300: E4/300 + C5/300,
8700`;
const key_sfx = tune`
150: A4~150 + E5~150 + C5~150,
150: F5~150 + D5~150 + B4~150,
4500`;
const gem_sfx = tune`
150: G5-150 + B5-150 + E5-150,
150: E5-150 + C5-150 + A4-150,
150: C5-150,
150: D5-150 + A5-150,
150: B5-150 + G5-150 + E5-150,
4050`;
const huh_key_sfx = tune`
500: C4^500 + F4^500 + B4^500 + E5^500 + A5^500,
15500`;
const beat_game_sfx = tune`
200: G4/200 + E4/200 + C4/200,
200: C4/200 + E4/200 + G4/200,
200: C4/200 + E4/200 + G4/200,
200: C4/200 + F4/200 + A4/200 + E5/200 + C5/200,
200: E5/200 + C5/200 + A4/200 + F4/200 + D4/200,
5400`;

setLegend(
  [ player, bitmap`
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
5555555555555555` ],
  [ wall, bitmap`
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
  [ key, bitmap`
................
................
................
................
.666666.........
.666666.........
.666666.........
.66446666666666.
.66446666666666.
.666666..6.6.6..
.666666..6......
.666666.........
................
................
................
................` ],
  [ key2, bitmap`
................
................
................
................
.666666.........
.666666.........
.666666.........
.66336666666666.
.66336666666666.
.666666..6.6.6..
.666666..6......
.666666.........
................
................
................
................` ],
  [ key3, bitmap`
................
................
................
................
.666666.........
.666666.........
.666666.........
.66556666666666.
.66556666666666.
.666666..6.6.6..
.666666..6......
.666666.........
................
................
................
................` ],
  [ door, bitmap`
0440044004400440
4CCCCCCCCCCCCCC4
4C444444444CCCC4
0C444444444CCCC0
0C444444444CCCC0
4C444444444CCCC4
4C444444444CCCC4
0C444444444C66C0
0C444444444C66C0
4C444444444CCCC4
4C444444444CCCC4
0C444444444CCCC0
0C444444444CCCC0
4C444444444CCCC4
4CCCCCCCCCCCCCC4
0440044004400440`],
  [ door2, bitmap`
0330033003300330
3CCCCCCCCCCCCCC3
3C333333333CCCC3
0C333333333CCCC0
0C333333333CCCC0
3C333333333CCCC3
3C333333333CCCC3
0C333333333C66C0
0C333333333C66C0
3C333333333CCCC3
3C333333333CCCC3
0C333333333CCCC0
0C333333333CCCC0
3C333333333CCCC3
3CCCCCCCCCCCCCC3
0330033003300330`],
  [ door3, bitmap`
0550055005500550
5CCCCCCCCCCCCCC5
5C555555555CCCC5
0C555555555CCCC0
0C555555555CCCC0
5C555555555CCCC5
5C555555555CCCC5
0C555555555C66C0
0C555555555C66C0
5C555555555CCCC5
5C555555555CCCC5
0C555555555CCCC0
0C555555555CCCC0
5C555555555CCCC5
5CCCCCCCCCCCCCC5
0550055005500550`],
  [ goal, bitmap`
................
................
................
.......44.......
.......44.......
.......44.......
.....444444.....
......4444......
.......44.......
................
....44444444....
................
................
................
................
................` ],
  [ restart, bitmap`
................
....33333333....
...33......33...
..33........33..
.33..........33.
.3............3.
.3............3.
.3............3.
.3............3.
.3..........3.3.
.3.........33.3.
.33.......33333.
..33.......33...
...33.......3...
....33333.......
................` ],
  [ moveable_wall, bitmap`
0000000000000000
0C9CCCC99CCCC9C0
0999999999999990
0C9CCCCCCCCCC9C0
0C9C99999999C9C0
0C9C9CCCCCC9C9C0
0C9C9C9999C9C9C0
099C9C9CC9C9C990
099C9C9CC9C9C990
0C9C9C9999C9C9C0
0C9C9CCCCCC9C9C0
0C9C99999999C9C0
0C9CCCCCCCCCC9C0
0999999999999990
0C9CCCC99CCCC9C0
0000000000000000` ],
  [ gem, bitmap`
.......5..5.....
...5............
5...77777777.5..
...7755555577...
..775255552577.5
.77555555555577.
575555555555557.
.75555555525557.
.77555555555577.
..775255555577.5
5..7755555577...
....77555577....
..5..775577..5..
......7777......
.....5.77.......
..........5.....` ],
  [ huh, bitmap`
................
.0000.0000.0000.
.0..0.0..0.0..0.
.0..0.0..0.0..0.
....0....0....0.
..000..000..000.
..0....0....0...
..0....0....0...
................
..0....0....0...
................
..0.0.0.0.0.0.0.
.0.0.0.0.0.0.0..
..0.0.0.0.0.0.0.
.0.0.0.0.0.0.0..
................` ],
  [ huh_key, bitmap`
................
................
................
00000000........
06666660........
0600006000000000
0606606666666660
0606600006066660
0600666666666660
0666666006060600
066666600600000.
06666660000.....
00000000........
................
................
................` ],
  [ huh_door, bitmap`
0660066006600660
6CCCCCCCCCCCCCC6
6C666666666CCCC6
0C660000066CCCC0
0C660666066CCCC0
6C660666066CCCC6
6C666666066CCCC6
0C666600066C66C0
0C666606666C66C0
6C666606666CCCC6
6C666606666CCCC6
0C666666666CCCC0
0C666606666CCCC0
6C666666666CCCC6
6CCCCCCCCCCCCCC6
0660066006600660` ]
);

setSolids([player, wall, moveable_wall, door, door2, door3, huh_door]);

const levels = [
  map`
...............
...............
...............
...............
...............
...............
...............
...............
...............
...............
...............`, //controls
  map`
...............
...............
p....k.........
...............
..............g
wwwwwwwwwwwwwww
...............
...............
p..............
...............
..............g`, //how to
  map`
vw...w...w...gw
.w...w...w....w
bw.......w....w
.....w...wwwwbw
pw...w........w
wwwwwwwwwwwwwww
p..w..........w
ww.w.w.www.ww.w
kw.w.w.w.w..w.w
.w.www.w.ww.www
.......w.....gw`, // basic level
  map`
...........w...
.w.wwwww.wkw.w.
.w.bn.vw.www.w.
ww.wwwww.b...w.
p........wwwwwg
wwwwwwwwwwwwwww
p........w.....
wwww.wwwww.w.ww
..lw.....n.wg..
.www.wwwww.www.
.....w.........`, // medium level
  map`
....w...kw.....
.wwww.wwwwwnww.
.w........wg.w.
.www.wwww.wwww.
p.......w......
wwwwwwwwwwwwwww
p........w.....
wwww.wwwwwwwww.
.bvw......wg.b.
.www.wwww.wwww.
.....wl........`, // medium level
  map`
....w...n.>w...
<ww.w.w.wwww.ww
.?w.wkw......wg
www.www.wwwwwwb
p..............
wwwwwwwwwwwwwww
p..w..lw.......
ww.w.wwwwwbwww.
.w.w.....w.vwg.
.w.wwwww.wwwwwn
...............`, // medium level
  map`
....w......w...
.ww.wnwwww.wew.
.kw.w...;w.wgw.
www.wwwwww.wew.
p..........b...
wwwwwwwwwwwwwww
p..............
.wwwwwwwwwwwww.
.w...w....gwvn.
.w.w.wmwwwwwww.
.b.w........lw.`, // hard level
  map`
...w.w.....e....wwwww
.www.wwwww.w.w.ww.g..
...........w.w.w.ww.w
.wwwwwwwwwww.w.w.w...
.wvww..e.w...w.w.wwmw
pw.m...wk..w.w.e.....
wwwwwwwwwwwwwwwwwwwww
pw.......www.n......g
.wwwwwww.w...ww.www.w
.b.....w.www..w.w.w.w
.wwwwlww...w..w.w.w.w
....www..w.wwewww.w.w
www.e....w.e.;.w.....`, // superhard level
  map`
wwwwwwwwwwwwwww
w.............w
w.p..........rw
w.............w
w.............w
wwwwwwwwwwwwwww
w.............w
w.p..........rw
w.............w
w.............w
wwwwwwwwwwwwwww` // beat everything level
];

//the amount of keys to collect.
const objectives = [
  0,
  1,
  1,
  2,
  2,
  2,
  3,
  3,
  0
];

setMap(levels[level]);
addText("w/a/s/d for player", {x: 1, y: 2});
addText("j for reset level", {x: 1, y: 4});

addText("click j to continue", {x: 1, y: 9, color: color`3`});

setPushables({
  [player]: [moveable_wall],
  [moveable_wall]: [moveable_wall]
});

onInput("a", () => {
  if (level === 0) return;
  getAll(player).forEach(item => {
    item.x -= 1;
  });
});
onInput("d", () => {
  if (level === 0) return;
  getAll(player).forEach(item => {
    item.x += 1;
  });
});
onInput("w", () => {
  if (level === 0) return;
  getAll(player).forEach(item => {
    item.y -= 1;
  });
});
onInput("s", () => {
  if (level === 0) return;
  getAll(player).forEach(item => {
    item.y += 1;
  });
});
onInput("j", () => {
  if (level === 0) {
    level++;
  }
  level_music.end();
  level_music = playTune(level_tune, Infinity);
  
  setMap(levels[level]);
  keys_collected = 0;
  clearText();
  addText(`level ${level+1}`, {x: 1, y: 1, color: color`3`});
  addText(`keys ${keys_collected}/${keys_needed}`, {x: 10, y: 1, color: color`3`});
});

const check_keys = () => {
  if (keys_collected >= keys_needed) {
    // console.log("all keys collected!");
    can_proceed = true;
  } else {
    can_proceed = false;
  }
}

afterInput(() => {
  if (level === 0) return;
  if (level < levels.length) {
    if (tilesWith(key, player).length > 0) {
      // console.log("key collected!");
      keys_collected++;
      playTune(key_sfx);
      getFirst(key).remove();
      getAll(door).forEach(item => {
        item.remove();
      });
      check_keys();
    }
    if (tilesWith(key2, player).length > 0) {
      // console.log("key collected!");
      keys_collected++;
      playTune(key_sfx);
      getFirst(key2).remove();
      getAll(door2).forEach(item => {
        item.remove();
      });
      check_keys();
    }
    if (tilesWith(key3, player)) {
      if (tilesWith(key3, player).length > 0) {
        // console.log("key collected!");
        keys_collected++;
        playTune(key_sfx);
        getFirst(key3).remove();
        getAll(door3).forEach(item => {
          item.remove();
        });
        check_keys();
      }
    }

    if (tilesWith(huh_key, player)) {
      if (tilesWith(huh_key, player).length > 0) {
        // console.log("key collected! (huh)");
        getFirst(huh_key).remove();
        playTune(huh_key_sfx);
        getAll(huh_door).forEach(item => {
          item.remove();
        });
      }
    }
    if (tilesWith(huh, player)) {
      if (tilesWith(huh, player).length > 0) {
        // console.log("huh?! player teleported to next level!");
        level++;
        keys_needed = objectives[level];
        keys_collected = 0;
        playTune(beat_level_sfx);
        setMap(levels[level]);
      }
    }
    if (tilesWith(gem, player)) {
      if (tilesWith(gem, player).length > 0) {
        gems_collected++;
        playTune(gem_sfx);
          getFirst(gem).remove();
      }
    }

    if (can_proceed && tilesWith(goal, player).length > 1) {
      // console.log("players reached goals! (switching map)");
      level++;
      keys_needed = objectives[level];
      keys_collected = 0;
      playTune(beat_level_sfx);
      setMap(levels[level]);
    }
  } else {
      keys_needed = objectives[level];
      keys_collected = 0;

      setMap(levels[level]);
  }

  clearText();
  if (level < levels.length-1) {
    addText(`level ${level}`, {x: 1, y: 1, color: color`3`});
    addText(`keys ${keys_collected}/${keys_needed}`, {x: 10, y: 1, color: color`3`});
  } else {
    level_music.end();
    level_music = playTune(beat_game_sfx);
    level_music = playTune(beat_game_music, Infinity);
    addText(`all levels passed!`, {x: 1, y: 1, color: color`3`});
    addText(`collected ${gems_collected}/${levels.length-3} gems.`, {x: 1, y: 8, color: color`3`});
  } 
});
