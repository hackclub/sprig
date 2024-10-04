/*
@title: spongebob_squaremaze
@author: Jainam_Jain
@tags: ['puzzle']
@addedOn: 2023-01-26

Instructions: 

Kill all of the enemies to progress

* Controls
* ========
*
* w to move up
* a to move left
* s to move down
* d to move right

*/

const player = "p"
const enemy = "e"
const wall = "w"
const grass = "g"
const block = "b"
const boss = "B"
const bigboss = "q"
const wither = "W"

const death = tune`
163.04347826086956,
54.34782608695652: e5-54.34782608695652,
54.34782608695652: a4/54.34782608695652 + e4-54.34782608695652 + g5-54.34782608695652 + c5-54.34782608695652,
54.34782608695652: g5/54.34782608695652 + g4/54.34782608695652,
54.34782608695652: g5/54.34782608695652 + e5~54.34782608695652 + d4-54.34782608695652,
54.34782608695652: b4~54.34782608695652 + a4~54.34782608695652 + c5~54.34782608695652 + d5^54.34782608695652 + e5^54.34782608695652,
54.34782608695652: b4~54.34782608695652 + c5~54.34782608695652 + a4~54.34782608695652 + d5^54.34782608695652 + e5^54.34782608695652,
54.34782608695652: b4-54.34782608695652 + c5-54.34782608695652 + a4-54.34782608695652 + d5-54.34782608695652 + e5-54.34782608695652,
54.34782608695652: c5-54.34782608695652 + a4-54.34782608695652 + b4-54.34782608695652 + d5-54.34782608695652 + e5-54.34782608695652,
54.34782608695652: c5/54.34782608695652 + b4/54.34782608695652 + a4/54.34782608695652 + d5/54.34782608695652 + e5~54.34782608695652,
54.34782608695652: a4/54.34782608695652 + c5/54.34782608695652 + b4/54.34782608695652 + d5/54.34782608695652 + e5~54.34782608695652,
54.34782608695652: a4^54.34782608695652 + b4^54.34782608695652 + c5^54.34782608695652 + d5~54.34782608695652 + e5-54.34782608695652,
54.34782608695652: b4^54.34782608695652 + a4^54.34782608695652 + c5^54.34782608695652 + d5~54.34782608695652 + e5-54.34782608695652,
54.34782608695652: c5~54.34782608695652 + b4/54.34782608695652,
54.34782608695652: c5~54.34782608695652 + b4/54.34782608695652,
54.34782608695652: c5~54.34782608695652 + b4/54.34782608695652,
54.34782608695652: c5~54.34782608695652 + b4/54.34782608695652,
54.34782608695652: c5~54.34782608695652,
54.34782608695652: c5~54.34782608695652,
54.34782608695652: c5~54.34782608695652,
543.4782608695652`

setLegend(
	[
		player,
		bitmap`
.777777777777777
.770000000000777
.770969060090777
.770066696660777
.777095565590777
.770065265200077
.960996696969066
.690063663360066
.677093363690776
.670066333660076
.970969696966079
.770006000600077
.477000070000747
.447700777007447
.444700777007447
.447755777557447`,
	],
	[
		enemy,
		bitmap`
00000003L0000000
0000000333000000
00000L3L3L300000
0000033333330000
0000L32333230000
0000300030000000
0003L2023202L000
000333333333L000
003LL3L3L33L3L00
00L33LL33LLL3300
0000DHD3L3330000
0000HDHDDHDD0000
0000DHDDHHHD0000
0000HDDHHHHH0000
00003330DHD30000
0003L3000L3L0000`,
	],
	[
		wall,
		bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`,
	],
	[
		grass,
		bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
4CC444CCCCC44C44
44C444CCCC444C44
44CC44444444C4C4
4444C4C444CC4444
4C4C44CCC4C4444C
44C4C44C44CC4444
44C44C44444444C4
4CC444C44C44C444
444C44444C44C444
44C44C4444444444
4C444444C4444C44
44444C444C444CC4
4444444444444444
CCCCCCCCCCCCCCCC`,
	],
	[
		block,
		bitmap`
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
0000000000000000`,
	],
	[
		boss,
		bitmap`
7777766666777777
7777000000067777
7776022022067777
777602C0C2067777
7776000000067777
777L5522255L7777
7776656665667777
77766L666L667777
7772555555557777
7775555522557777
7775255555257777
7775522255557777
7775555555557777
7772555255257777
7775525525527777
7772552555557777`,
	],
	[
		bigboss,
		bitmap`
0000000000000000
0000000000000000
0006666666660000
0066666666666000
0006666666666600
0000066660066660
0000006662066660
0000000666666660
0000000066666660
0000000666666660
0000006666666660
0000066666666660
0000666666666600
0006666666666000
0006666666660000
0000000000000000`,
	],
	[
		wither,
		bitmap`
2222200000002222
22222LL000LL2222
2222202202202222
2222200000002222
2222200222002222
2LLLLLLLLLLLLLL2
2LLLLLLLLLLLLLL2
2222222LLL222222
2222222LLL222222
2222222LLL222222
2220011LLL110022
2220011LLL110022
2222222LLL222222
2220011LLL110022
2220011LLL110022
2222222LLL222222`,
	]
)

let currentLevel = 0
const levels = [
	map`
we.e...e
....w.w.
.ww..e.w
..e.....
.wwwww..
.www.w.e
pw.e.w..
.ww..e.w
...e....
.w.w.e.e
..e.w.w.`,
	map`
.e..wwwwwe
...ew.Bww.
.w....www.
.ewwe...B.
.ww...w.w.
....w.wew.
.wwew...w.
.e....w...
..ww.e..w.
pwwwwwwwwe`,
	map`
wBwgBgBggqwggq
ggwwwgggggggwg
eggggBgwwggqgg
gegBgggggeggge
ggggwwgwwgwgqg
pgwgeggwggwgeg
gggwwwgBgqgggg
egeggqgggewwge`,
	map`
wWgqgBggWgeggggeggBggBggggggWgeggW
WwgggggggggwwqgggWgwgggwwgegggggeg
ggwBgwggeggwggggggwwwwgBggggwgWggg
gqggWggggggwwgWwwgwWwWwggggWwgwwgq
WgggggwWggwggggggwwggggggeggwggggg
gggBgggggWwwgqgBggwgggegqggggwgBgg
gwwggqgBgwwwggggggggBggggggWgwgggg
ggwggwggggggggwgggeggggwgqgggqggWg
qggBgwWgwggBggwwgggggggggwgwgggggB
gggggggggggggqggWggqgegwgWwgggWgwg
gWwWgwwwwgegggggwwggggggggggBggggg
gwggwggwgggwwggggggBggggqgggggWgqg
pgwWwBggggWggggegWggggegggwgWggBgg`,
	map`
wwwwbbwwbbwwbbbwwwbbwbbwwwwwwww
wwwwbbwwbbwbbbbbwwbbwbbwwwwwwww
wwwwbbwwbbwbbwbbwwbbwbbwwwwwwww
wwwwbbbbbbwbbwbbwwbbwbbwwwwwwww
wwwwwwbbwwwbbwbbwwbbwbbwwwwwwww
wwwwwwbbwwwbbbbbwwbbbbbwwwwwwww
wwwwwwbbwwwwbbbwwwwbbbwwwwwwwww
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
wwbbwwbbwwbbwwwbbwwwbbbwwwbbwww
wwbbwwbbwwbbwwwbbwwwbbbbwwbbwww
wwbbwwbbwwbbwwwbbwwwbbbbbwbbwww
wwbbwwbbwwbbwwwbbwwwbbbbbwbbwww
wwbbwwbbwwbbwwwbbwwwbbwbbbbbwww
wwbbwwbbwwbbwwwbbwwwbbwbbbbbwww
wwbbbbbbbbbbwwwbbwwwbbwwwbbbwww
wwwbbbbbbbbwwwwbbwwwbbwwwwbbwww
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
wwwbbwwbbwwbbwwbbwwbbwwbbwwbbww
wwwbbwwbbwwbbwwbbwwbbwwbbwwbbww
wwwbbwwbbwwbbwwbbwwbbwwbbwwbbww
wwwbbwwbbwwbbwwbbwwbbwwbbwwbbww
wwwbbwwbbwwbbwwbbwwbbwwbbwwbbww
wwwbbwwbbwwbbwwbbwwbbwwbbwwbbww
wwwbbwwbbwwbbwwbbwwbbwwbbwwbbww
wwwbbwwbbwwbbwwbbwwbbwwbbwwbbww
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
wwwbbwwbbwwbbwwbbwwbbwwbbwwbbww`,
]

setMap(levels[currentLevel])
setBackground(grass)

onInput("w", () => {
	const fPlayer = getFirst(player)
	if (fPlayer) fPlayer.y -= 1
})

onInput("d", () => {
	const fPlayer = getFirst(player)
	if (fPlayer) fPlayer.x += 1
})

onInput("s", () => {
	const fPlayer = getFirst(player)
	if (fPlayer) fPlayer.y += 1
})

onInput("a", () => {
	const fPlayer = getFirst(player)
	if (fPlayer) fPlayer.x -= 1
})

setSolids([wall, player])

afterInput(() => {
	const collisions = [
		...tilesWith(player, enemy),
		...tilesWith(player, boss),
		...tilesWith(player, bigboss),
		...tilesWith(player, wither),
	]

	if (collisions.length > 0) {
		collisions[0][1].remove()
		playTune(death)
	}

	const enemiesLeft = [
		...getAll(enemy),
		...getAll(boss),
		...getAll(bigboss),
		...getAll(wither),
	]

	if (enemiesLeft.length == 0) {
		currentLevel = currentLevel + 1
		if (levels.length - 1 >= currentLevel) {
			setMap(levels[currentLevel])
		}
	}
})
