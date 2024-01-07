const player = "p";
const wall = "w";
const goal = "g";
const block = "b";
const key = "k";
const lock = "l";

setLegend(
	[ player, bitmap`
.....00000......
.....09999......
.....00000......
.....00000......
......000.......
...000000000....
...000000000....
...00.000.00....
...33.000.33....
...00.000.00....
......000.......
...000000000....
...000000000....
...00.....00....
...00.....00....
...77.....77....`],
    [ wall, bitmap`
3000000000000003
3000000000000003
3000000000000003
3000000000000003
3000000000000003
3000000000000003
3000000000000003
3000000000000003
3000000000000003
3000000000000003
3000000000000003
3000000000000003
3000000000000003
3000000000000003
3000000000000003
3000000000000003`],
    [ goal, bitmap`
...FFFFFFFFFF...
..FF66666666FF..
.FF6666666666FF.
FF666666666666FF
F66666FFFF66666F
F66666F66F66666F
F66666F66F66666F
F66666F66F66666F
F66666F66F66666F
F66666F66F66666F
F66666F66F66666F
F66666F66F66666F
FF66666FFF6666FF
.FF6666666666FF.
..FF66666666FF..
...FFFFFFFFFF...`],
    [ block, bitmap`
................
................
..777777777777..
..777777777777..
..777777777777..
..777777777777..
..777777777777..
..777777777777..
..777777777777..
..777777777777..
..777777777777..
..777777777777..
..777777777777..
..777777777777..
................
................`],
    [ key, bitmap`
................
................
........66666...
........666.6...
........66666...
........66666...
.......666666...
......66........
.....66.........
....66..........
...66...........
..66............
..6.6...........
...66...........
................
................`],
    [ lock, bitmap`
6666666666666666
6666666666666666
6666600000066666
6666606666066666
6666606666066666
6666606666066666
6660000000000666
6660666666660666
6660666666660666
6660666666660666
6660666666660666
6660666666660666
6660000000000666
6666666666666666
6666666666666666
6666666666666666`]
);

setSolids([player, wall, block, lock])

let level = 0
const levels = [
	map`
wwwwwwwwwwwwww
wwwwww......ww
wwwwww.wwww.ww
wwwwww.wwww.ww
ww......wwwwwg
ww.wwww...ww..
ww.wwww.wwww.w
ww...ww.wwww.w
wwww.ww......w
p....wwwww.www
wwwwwwwwwwwwww`,
    map`
wwwwwwwwwww..g
wwwwwwwwww.w.w
wwww...www.w.w
wwwwww.w.bb..w
ww.....wwwbwww
ww.www.www.www
ww..ww...w.www
www.wwww...www
www.wwwwwwwwww
p.bb..wwwwwwww
wwwwwwwwwwwwww`,
    map`
wwwwwwwwwwww.g
wwwwwwwwww.w.w
wwwwk..www.w.w
wwwwww.w.bbl.w
ww.....wwwbwww
ww.www.www.www
ww..ww...w.www
www.wwww...www
www.wwwwwwwwww
p.bb..wwwwwwww
wwwwwwwwwwwwww`,
    map`
wwwwwwwwwwww.g
w...wwwwww.w.w
w.wkwwwwww.w.w
w.wwwwww.bbl.w
w..wwwwwwwbwww
ww.wwwwwww.www
ww..wwwwww.www
www.wwwwww.www
www.wwwwww.www
p.bb.........w
wwwwwwwwwwwwww`,
    map`
wwwwwwww.....g
wwwwwwww.wwwww
wwwwwwkw....ww
www.ww.wwww.ww
ww.bww.ww...ww
wwwb...wwlwwww
www.ww..bb..ww
www.ww....wwww
www.wwwww.wwww
p..b.wwww.wwww
wwwwwwwwwwwwww`,
    map`
wwwwwwwwwwww.g
wwwwwwwwww.w.w
ww..k.wwww.w.w
ww.ww.ww.bbl.w
ww.ww.wwwwbwww
ww.ww..www.www
ww..ww...w.www
www.w..w...www
www.w.wwwwwwww
p.bb..wwwwwwww
wwwwwwwwwwwwww`,
    map`
wwwwwwwwwwww.g
wwwwwwwwww.w.w
ww..k.wwww.w.w
ww.ww.ww.bbl.w
ww.ww.wwwwbwww
ww.wwwwwww.www
ww..wwwwww.www
www.wwwww..www
www.wwwww..www
p.bb.......www
wwwwwww...wwww`,
    map`
wwwwwwwwwwww.g
wwwwwwwwwwww.w
ww..l........w
ww.wwwwwwwwwww
ww.wwwwwwwwwww
ww.......wwwww
ww.www.wwwwwww
ww.www...wwwww
ww.wwwwwwwwwww
p.bb...ww.kwww
wwww......wwww`,
    map`
wwwwwwwwwwww.g
ww......ww.w.w
ww.wwww.ww.w.w
ww.wkw...bbl.w
ww.w.wwwwwbwww
ww.w....ww.www
ww.wwww.ww.www
ww......ww.www
wwwwwwwwww.www
p.bb.........w
wwwwwwwwwwwwww`,
    map`
w.wwwwwwwwww.g
w.wwwwwwwwww.w
wb......b.ww.w
wbwwwwwwbwwwlw
w.wwww.wbwww.w
w.w...bw.www.w
w..bww.w...w.w
www.ww.w.w.w.w
wwwwww.w.w.w.w
pbb....wwwk..w
www....wwwwwww`,
    map`
wwwwwwwwwwww.g
wwwwwwwwwwww.w
www.ww..b.ww.w
www....wbwwwlw
wwwbwwwwbwww.w
w.bb...w.www.w
wwwbww.w...w.w
www.ww.w.w.w.w
www.ww.w.w.w.w
pbb....wwwk..w
www....wwwwwww`,
    map`
www.wwww.ww..g
wk.bww.......w
www.www.bwwwww
w.bb..w.b..www
w.w.wwww.wwwww
w.w.wwww.wwwww
w.....ww.....w
w.www.wwwwww.w
wwwww.wwwwww.w
p.b..b..wwww.w
wwwww.....l.b.`,
    map`
wwwwwwwwwwww.g
wl..b...bb....
w.ww.w.www...w
w.ww...www..ww
w.wwwwwwwwwwww
w...ww...w.www
.....bbbb.b...
wwwww.ww...w.w
wwwww.ww.www.w
p.........wk.w
wwwwwwwwwwwwww`,
    map`
wwwwwwwwwwww.g
wwww......ww.w
wwwbbb.ww.ww.w
wwwbkb.ww.ww.w
w..bbb.ww.ww.w
wwb.ww.ww.ww.w
wwb.bb....ww.w
ww.wwwwww.ww.w
ww.wwwwww.l..w
p..wwwwwwwwwww
  wwwwwwwwwwwwww`,
    map`
bbbbbbbbbbbb.g
bbbbb.bbbbbb..
bbbbbb...b.bb.
b.bbb.bbb.bbbb
b.bbb.bbb.bb.b
b...bb..b.bb.b
bbbbbbbbb.bb.b
bbbbbbb..bbb.b
bbbbbbb.b.bb.b
pbb.bbbb....b.
bbbbbbb.bbbbbb`
]

setMap(levels[level])

setPushables({
	[ player ]: [block],
    [ block ]: [ block ]
})

onInput("w", () => {
	getFirst(player).y -= 1
})

onInput("a", () => {
	getFirst(player).x -= 1
})

onInput("s", () => {
	getFirst(player).y += 1
})

onInput("d", () => {
	getFirst(player).x += 1
})

onInput("j", () => {
	setMap(levels[level])
})

afterInput(() => {
    const numberOfGoalsCovered = tilesWith(player, goal);
    const keysTaken = tilesWith(player, key); // ADDED: all the keys that the player is on
    /*if (numberOfGoalsCovered.length >= 1) {
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
    }

    // ADDED: remove the lock and key if the key is picked up*/
    if (keysTaken.length >= 1) {
      getFirst(lock).remove();
      getFirst(key).remove();
    }

    if(numberOfGoalsCovered.length > 0){

      if(level != levels.length - 1) {
        
      level += 1;
      setMap(levels[level]);
        
    } 
    else {

      addText("YOU WIN", { 
        x: 7,
        y: 6,
        color: color`5`
      })
      
    }
    
    }
  
})

/*afterInput(() => {
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
}

// ADDED: remove the lock and key if the key is picked up
if (keysTaken.length >= 1) {
getFirst(lock).remove();
getFirst(key).remove();
}

});*/












