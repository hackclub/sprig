const player = "p";
const wall = "w";
const gold = "g";


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
................` ]
)

setSolids([player,wall])

let level = 0
const levels = [
	map`
w.
gw
w.
p.`,
    map`
w.w
wg.
.ww
p..`,
    map`
g..w
.w.w
www.
.pw.`,
    map`
p.ww
wwg.
.w.w
..ww`,
    map`
.g.w
w.ww
.ww.
.pw.`,
    map`
w.g.
www.
..w.
.wpw`,
    map`
w.wp
gw.w
.ww.
w...`,
    map`
....g
wwww.
..w.w
w.ww.
pw...`,
    map`
.w.wg
w.ww.
.wpw.
.ww..
.....`,
    map`
.ww.g
w..w.
.w.ww
w.w..
.wpww`
]

setMap(levels[level])

setPushables({
	[ player ]: [wall]
})

onInput("s", () => {
	getFirst(player).y += 1
})
onInput("w", () => {
	getFirst(player).y -= 1
})
onInput("d", () => {
	getFirst(player).x += 1
})
onInput("a", () => {
	getFirst(player).x -= 1
})
onInput("k", () => {
	setMap(levels[level])
})

afterInput(() => {
  if (level === 0){
    addText("Get the Treasure!", {y: 11, color: color`6` });
    addText("Press k to Restart", {y: 13, color: color`6` });
  }
  const targetNumber = tilesWith(gold).length;
  const numberCovered = tilesWith(player, gold).length;
  if (numberCovered === targetNumber) {
    level = level + 1;
    clearText()
    const currentLevel = levels[level];
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("You Win!", {y: 5, color: color`H` });
    }
  }

})