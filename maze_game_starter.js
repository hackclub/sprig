
/* 
@title: maze_game_starter
@author: Cheru Berhanu
@tags: []
@addedOn: 2023-08-08
*/

    const player = "p";
    const wall = "w";
    const goal = "g";
    const key = "k";
    const lock = "l";
    const win = "i";
    const box = "b";
    const trap = "t";
    const myTune = tune`
112.5,
37.5: B5-37.5 + G5-37.5 + A5-37.5,
37.5: A5-37.5,
37.5: F5^37.5 + E5^37.5 + A4~37.5 + B4~37.5 + C5~37.5,
37.5: E5^37.5 + F5^37.5 + A4~37.5 + B4~37.5 + C5~37.5,
37.5: F5^37.5,
37.5: F5^37.5,
37.5: F5^37.5,
37.5: F5^37.5,
787.5`;


    

setLegend(
	[ player, bitmap`
......0000......
.....000000.....
....00000000....
...0000000000...
..000000000000..
6606666666666066
6606L06666L06066
.60600666600606.
..06HH6666HH60..
...0660000660...
....00666600....
......0000....6.
.....000000...0.
.....000000..00.
....0000000000..
....00600600....` ],
    [ wall, bitmap`
................
................
................
................
.....4444444....
.....4400044....
.....4040404....
.....4004004....
.....4040404....
.....4400044....
.....4444444....
................
................
................
................
................`],
    [ goal, bitmap`
................
................
.........04.....
..........44....
...........44...
...........66...
...........66...
...........66...
...........66...
...........66...
...........66...
......6666666...
......6666666...
................
................
................`],
    [ key, bitmap`
................
................
................
................
.00000000000000.
0666666666666660
0666666666666660
066000060000060.
0660..060...060.
0660..060...060.
.00....0.....0..
................
................
................
................
................`],
    [ lock, bitmap`
................
......0000......
.....0FFFF0.....
....0FF00FF0....
....0F0..0F0....
....0F0..0F0....
....090..060....
...0000000000...
..0699999999F0..
..0999999999F0..
..09999F6999F0..
..09999FF999F0..
..0999999999F0..
..099999999FF0..
..0FFFFFFFFF60..
...0000000000...`],
    [ box, bitmap`
................
................
................
....0000000000..
....0FCL00LCF0..
....0FCL00LCF0..
....0FCL00LCF0..
....0FCL00LCF0..
....0FCL00LCF0..
....0FCL00LCF0..
....0FCL00LCF0..
....0FCL00LCF0..
....0000000000..
................
................
................`],
    [ trap, bitmap`
................
................
................
..666666666666..
..999999999999..
..363636363636..
..636363636363..
..999999999999..
..333333333333..
................
................
................
................
................
................
................`],
)

setSolids([ player, wall, lock, box ]);

let level = 0;
const levels = [
    map`
.wwwwtttw
...ww...w
bw.w..w.w
.w.w..w.w
.w.ww.w..
.w.ww.wt.
.w.ww.w.l
.w.kw.w..
pw....w.g`,
    map`
ww....www
w..wwb...
w.www.wwk
w.w.w.wwt
w.w.w..l.
w.w.w.ww.
w.w.wtww.
t.w.w.wt.
p.w.wwwtg`,
    map`
ww......t
ww...tw.t
ww.t.tw.k
ww.t.twtt
ww.t.lwww
ww.wwbwww
ww.ww.ttt
wwbww...g
p..ww.ttt`,
    map`
..w.wwwwg
..w...twl
..w.w.tt.
..w.t.w..
.ww.w.t..
ww..w.t.b
ww.bw.tt.
ttw.w.wk.
p...w...w`,
];
setMap(levels[level])

setPushables({
	[ player ]: [box],
    [box]: [box]
})

onInput("w", () => {
    getFirst(player).y -= 1; // negative y is upwards
    playTune(myTune);
});

onInput("a", () => {
    getFirst(player).x -= 1;
    playTune(myTune);
});

onInput("s", () => {
    getFirst(player).y += 1; // positive y is downwards
    playTune(myTune);
});

onInput("d", () => {
    getFirst(player).x += 1;
    playTune(myTune);
});

afterInput(() => {
  const goalsCovered = tilesWith(player, goal); // tiles that both contain the player and goal
  const keysTaken = tilesWith(player, key); // ADDED: all the keys that the player is on

// there is one player, so if 1 or more tiles with both a goal and a player, next level
if (goalsCovered.length >= 1) {
// increase the current level number
level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    // otherwise, we have finished the last level, there is no level
    // after the last level
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      win();
    }

  function win() {
    // Code to execute when the game is won
        const box = "b"
  
    alert("Congratulations! You've won the game!");
}
}

// ADDED: remove the lock and key if the key is picked up
if (keysTaken.length >= 1) {
getFirst(lock).remove();
getFirst(key).remove();
}

  const trapsCovered = tilesWith(player, trap); // ADDED: tiles with players on traps
    
    // ADDED: if any player is on a trap, they lose
    if (trapsCovered.length > 0) {
        setMap(levels[level])
    }

});