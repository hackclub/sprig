const player = "p";
const wall = "w";
const gold = "g";
const trap = "t";
setLegend(
	[ player, bitmap`
................
................
.......000......
.......000......
.......000......
.......000......
........0...0...
........0...0...
....000000000...
....0..000......
....0..000......
.......000......
.......0.0......
.......0.0......
.....000.000....
................` ],
    [ wall, bitmap`
................
.....LLLL.......
...LL...LLLLL...
..L..L..L...LL..
..L..L..LLLLLL..
..L..L......LL..
..L..LL.LL..LL..
..L...LLLL.LLL..
..LL..L..LLLLL..
...LL....LLLL...
....LLLLLL......
................
................
................
................
................` ],
    [ gold, bitmap`
................
................
................
................
..9C7C7CCCCC7...
..CCC6C6C696C...
..7C9CCC796CC...
..6CCC79C7CC6...
..9C6C6C6C96C...
..7CCC7C7C799...
..6C6C6C6CCC6...
..9CCC9C9C9CC...
................
................
................
................` ],
    [trap,bitmap`
................
................
................
....DDDDDDD.....
...D4444444D....
..D44DDDDD44D...
..D4D44444D4D...
..D4D4DDD4D4D...
..D4D4DDD4D4D...
..D4D44444D4D...
..D44DDDDD44D...
...D4444444D....
....DDDDDDD.....
................
................
................`]
)
const player_x = player.x
const trap_x = trap.x
setSolids([player,wall])
const walk = tune`
370.3703703703704: B4-370.3703703703704,
11481.481481481482`
const win = tune`
147.05882352941177: B4~147.05882352941177,
147.05882352941177: G4~147.05882352941177,
147.05882352941177: A4~147.05882352941177,
147.05882352941177: C5~147.05882352941177,
147.05882352941177: B4~147.05882352941177,
147.05882352941177: C5~147.05882352941177,
147.05882352941177: B4~147.05882352941177,
147.05882352941177: C5~147.05882352941177,
147.05882352941177: D5~147.05882352941177,
147.05882352941177: E5~147.05882352941177,
147.05882352941177: D5~147.05882352941177,
147.05882352941177: C5~147.05882352941177,
147.05882352941177: D5~147.05882352941177,
147.05882352941177: E5~147.05882352941177,
147.05882352941177: D5~147.05882352941177,
147.05882352941177: A4~147.05882352941177,
147.05882352941177: C5~147.05882352941177,
147.05882352941177: E5~147.05882352941177,
147.05882352941177: G5~147.05882352941177,
147.05882352941177: E5~147.05882352941177,
147.05882352941177: C5~147.05882352941177,
147.05882352941177: A4~147.05882352941177,
147.05882352941177: D5~147.05882352941177,
147.05882352941177,
147.05882352941177: E5~147.05882352941177,
147.05882352941177: G5~147.05882352941177,
147.05882352941177: D5~147.05882352941177,
147.05882352941177: B4~147.05882352941177,
147.05882352941177: D5~147.05882352941177,
147.05882352941177: C5~147.05882352941177,
147.05882352941177: F5~147.05882352941177,
147.05882352941177: A4~147.05882352941177`
let level = 1;
const levels = [
    map`
....
....
....
....`,
	map`
w.
gw
wt
pt`,
    map`
w.w
wg.
.ww
p.t`,
    map`
gt.w
twtw
wwwt
.pw.`,
    map`
ptww
wwgt
tw.w
.tww`,
    map`
.gtw
wtww
twwt
tpw.`,
    map`
w.g.
www.
..w.
.wpw`,
    map`
wtwp
gwtw
twwt
w.t.`,
    map`
..ttg
wwwwt
ttwtw
w.wwt
pwtt.`,
    map`
.w.wg
w.ww.
.wpw.
.ww..
.....`,
    map`
.ww.g
wt.wt
twtww
wtwtt
.wpww`
]

setMap(levels[level])

setPushables({
	[ player ]: [wall]
})

onInput("s", () => {
	getFirst(player).y += 1
    playTune(walk)
})
onInput("w", () => {
	getFirst(player).y -= 1
    playTune(walk)
})
onInput("d", () => {
	getFirst(player).x += 1
    playTune(walk)
})
onInput("a", () => {
	getFirst(player).x -= 1
    playTune(walk)
})
onInput("k", () => {
	setMap(levels[level])
})
const traps = tilesWith(trap)
onInput("j", () => {
 getFirst(trap).remove();
  
})
let restart = 0
afterInput(() => {
  clearText()
  if (restart === 0){
    addText("Get the Treasure!", {y: 11, color: color`6` });
    addText("Press k to Restart", {y: 13, color: color`6` });
  }
  const goldnum = tilesWith(gold).length;
  const playergold = tilesWith(player, gold).length;
  if (goldnum === playergold) {
    level = level + 1;
    clearText()
    const currentLevel = levels[level];
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("You Win!", {y: 5, color: color`H` });
      playTune(win, Infinity)
    }
  }
  const playertrap = tilesWith(player, trap).length;
  if (playertrap> 0) {
    setMap(levels[0]);
    clearText()
    addText("You lose!", {y: 5, color: color`H` });
    addText("Destroy the traps!", {y: 8, color: color`H` })
    level = 1
    restart = 1
  }   
})
