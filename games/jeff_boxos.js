/*
@title: jeff boxos
@author: snwy
@tags: ['puzzle']
@addedOn: 2024-04-12
*/

const player = "p";
const wall = "w";
const goal = "g";
const die = "d";

const right = "r";
const left = "l";
const up = "u";
const down = "o";

const toggleOn = "t";
const toggleOff = "v";
const toggleBlockOn = "x";
const toggleBlockOff = "y";

const break_ = "b";
const box = "n";

const b_portal = "1";
const o_portal = "2";

const button = "f";
const buttonHit = "F";
const buttonWall = "B";
const buttonWallHit = "Y";

const onSprite = bitmap`
.55555555555555.
5777777777777775
5777777557777775
5777777557777775
5777777557777775
5777777557777775
5777777557777775
5777777557777775
5777777557777775
5777777557777775
5777777557777775
5777777557777775
5777777557777775
5777777777777775
5555555555555555
.55555555555555.`;
const offSprite = bitmap`
.55555555555555.
5777777777777775
5777777777777775
5777755555577775
5777557777557775
5775577777755775
5775777777775775
5775777777775775
5775777777775775
5775577777755775
5777557777557775
5777755555577775
5777777777777775
5777777777777775
5555555555555555
.55555555555555.`;

const disabledSprite = bitmap`
.11111111111111.
1..............1
1..............1
1..............1
1..............1
1..............1
1..............1
1..............1
1..............1
1..............1
1..............1
1..............1
1..............1
1..............1
1111111111111111
.11111111111111.`;
const enabledSprite = bitmap`
.55555555555555.
5777777777777775
5755555555555575
5757777777777575
5757777777777575
5757777777777575
5757777777777575
5757777777777575
5757777777777575
5757777777777575
5757777777777575
5757777777777575
5755555555555575
5777777777777775
5555555555555555
.55555555555555.`;

let currentMode = true;
let buttonState = false;

let seconds = 0;
let secondsInterval = setInterval((() => seconds++), 1000);

function toggleBlocks() {
	currentMode = !currentMode;
	let onBlocks = getAll(toggleBlockOn);
	let offBlocks = getAll(toggleBlockOff);
	onBlocks.forEach((t) => {
		t.type = toggleBlockOff;
	});
	offBlocks.forEach((t) => {
		t.type = toggleBlockOn;
	});
	if (currentMode) {
		getAll(toggleOff).forEach((t) => {
			t.type = toggleOn;
		});
	} else {
		getAll(toggleOn).forEach((t) => {
			t.type = toggleOff;
		});
	}
}

function toggleButton() {
	getAll(buttonWall).forEach(t => {
		t.type = buttonWallHit;
	});
}

setLegend([player, bitmap`
.CCCCCCCCCCCCCC.
C33333333333333C
C33333333333333C
C33333333333333C
C333C333333C333C
C333C333333C333C
C333C333333C333C
C33333333333333C
C33333333333333C
C333C333333C333C
C3333C3333C3333C
C33333CCCC33333C
C33333333333333C
C33333333333333C
CCCCCCCCCCCCCCCC
.CCCCCCCCCCCCCC.`], [wall, bitmap`
.LLLLLLLLLLLLLL.
L11L11111111L11L
L11L11111111L11L
LLLLLLLLLLLLLLLL
L1111111L111111L
L1111111L111111L
LLLLLLLLLLLLLLLL
L11L11111111L11L
L11L11111111L11L
LLLLLLLLLLLLLLLL
L1111111L111111L
L1111111L111111L
LLLLLLLLLLLLLLLL
L11L11111111L11L
LLLLLLLLLLLLLLLL
.LLLLLLLLLLLLLL.`], [goal, bitmap`
.DDDDDDDDDDDDDD.
D44444444444444D
D44444444444444D
D4444D444444444D
D44444D4D4D4444D
D4444D4D4D4D444D
D4444DD4D4D4444D
D4444D4D4D4D444D
D4444D444444444D
D4444D444444444D
D444DDD44444444D
D4444D444444444D
D44444444444444D
D44444444444444D
DDDDDDDDDDDDDDDD
.DDDDDDDDDDDDDD.`], [die, bitmap`
.CCCCCCCCCCCCCC.
C99999999999999C
C9999CCCCCC9999C
C999C999999C999C
C99C99999999C99C
C99C9CC99CC9C99C
C99C9CC99CC9C99C
C999C999999C999C
C9999C9999C9999C
C9999CCCCCC9999C
C99999C9C9C9999C
C9999C9C9C99999C
C9999CCCCCC9999C
C99999999999999C
CCCCCCCCCCCCCCCC
.CCCCCCCCCCCCCC.`], [right, bitmap`
.HHHHHHHHHHHHHH.
H88888888888888H
H88888888888888H
H88888888H88888H
H88888888HH8888H
H88HHHHHHHHH888H
H88HHHHHHHHHH88H
H88HHHHHHHHHH88H
H88HHHHHHHHH888H
H88888888HH8888H
H88888888H88888H
H88888888888888H
H88888888888888H
H88888888888888H
HHHHHHHHHHHHHHHH
.HHHHHHHHHHHHHH.`], [left, bitmap`
.HHHHHHHHHHHHHH.
H88888888888888H
H88888888888888H
H88888H88888888H
H8888HH88888888H
H888HHHHHHHHH88H
H88HHHHHHHHHH88H
H88HHHHHHHHHH88H
H888HHHHHHHHH88H
H8888HH88888888H
H88888H88888888H
H88888888888888H
H88888888888888H
H88888888888888H
HHHHHHHHHHHHHHHH
.HHHHHHHHHHHHHH.`], [up, bitmap`
.HHHHHHHHHHHHHH.
H88888888888888H
H88888888888888H
H888888HH888888H
H88888HHHH88888H
H8888HHHHHH8888H
H888HHHHHHHH888H
H88888HHHH88888H
H88888HHHH88888H
H88888HHHH88888H
H88888HHHH88888H
H88888HHHH88888H
H88888888888888H
H88888888888888H
HHHHHHHHHHHHHHHH
.HHHHHHHHHHHHHH.`], [down, bitmap`
.HHHHHHHHHHHHHH.
H88888888888888H
H88888888888888H
H88888HHHH88888H
H88888HHHH88888H
H88888HHHH88888H
H88888HHHH88888H
H88888HHHH88888H
H888HHHHHHHH888H
H8888HHHHHH8888H
H88888HHHH88888H
H888888HH888888H
H88888888888888H
H88888888888888H
HHHHHHHHHHHHHHHH
.HHHHHHHHHHHHHH.`], [break_, bitmap`
.FFFFFFFFFFFFFF.
FF6666666666F66F
F6F66666666FF66F
F6F66666666F666F
F6FF6666FFFF666F
F66FF666F666666F
F666F66F6666666F
F666FFFF6666666F
F666666FF666666F
F66666666FFF6FFF
F6666666666FFF6F
F66666FFFFFF666F
F66FFF666FF6666F
FFF666666666666F
FFFFFFFFFFFFFFFF
.FFFFFFFFFFFFFF.`], [box, bitmap`
.CCCCCCCCCCCCCC.
C99999999999999C
CCCCCCCCCCCCCCCC
C99C99C99C99C99C
C99C99C99C99C99C
C99C99C99C99C99C
C99C99C99C99C99C
C99C99C99C99C99C
C99C99C99C99C99C
C99C99C99C99C99C
C99C99C99C99C99C
C99C99C99C99C99C
CCCCCCCCCCCCCCCC
C99999999999999C
CCCCCCCCCCCCCCCC
.CCCCCCCCCCCCCC.`], [b_portal, bitmap`
.77777777777777.
7555555555555557
7555777777775557
7557722222277557
7577222222227757
7572222222222757
7572222222222757
7572222222222757
7572222222222757
7572222222222757
7577222222227757
7557722222277557
7555777777775557
7555555555555557
7777777777777777
.77777777777777.`], [o_portal, bitmap`
.99999999999999.
9CCCCCCCCCCCCCC9
9CCC99999999CCC9
9CC9922222299CC9
9C992222222299C9
9C922222222229C9
9C922222222229C9
9C922222222229C9
9C922222222229C9
9C922222222229C9
9C992222222299C9
9CC9922222299CC9
9CCC99999999CCC9
9CCCCCCCCCCCCCC9
9999999999999999
.99999999999999.`], [toggleOn, onSprite], [toggleOff, offSprite], [toggleBlockOn, enabledSprite], [toggleBlockOff, disabledSprite], [button, bitmap`
.33333333333333.
3222222222222223
3232222222222323
3222222222222223
3222222222222223
3222222222222223
3222222222222223
3222222222222223
3222222222222223
3222222222222223
3222222222222223
3222222222222223
3232222222222323
3222222222222223
3333333333333333
.33333333333333.`], [buttonHit, bitmap`
.44444444444444.
4222222222222224
4242222222222424
4222222222222224
4222222222222224
4222222222222224
4222222222222224
4222222222222224
4222222222222224
4222222222222224
4222222222222224
4222222222222224
4242222222222424
4222222222222224
4444444444444444
.44444444444444.`], [buttonWall, bitmap`
.99999999999999.
9666666666666669
9699999999999969
9696666666666969
9696666666666969
9696666666666969
9696666666666969
9696666666666969
9696666666666969
9696666666666969
9696666666666969
9696666666666969
9699999999999969
9666666666666669
9999999999999999
.99999999999999.`], [buttonWallHit, disabledSprite]);

let solids = [wall, goal, player, box, break_, toggleBlockOn, toggleOn, toggleOff, button, buttonHit, buttonWall];
setSolids(solids);

setPushables({
	[player]: [box, /*player*/]
});

let level = 0;
const levels = [map`
w.........
p........w
..........
.w........
....g.....
..........
w.........
........w.`, // 1
	map`
..........
w.w.......
.w.p......
w.w.......
.......w.w
......g.w.
.......w.w
..........`, // 2
	map`
p.........
..........
w.w.w.w...
..........
..w.g.w.w.
..........
.....w.w..
...w.....w`, // 3
	map`
....w.....
.w..p...w.
.........w
.....g....
.........w
w.........
.w.....w..
....w.....`, // 4
	map`
.w..w...g.
.p..w.w.w.
ww..w.w.w.
....w.w...
....w.ww.w
..........
..w...ww..
........ww`, // 5
	map`
.w....w...
wp.w.....d
...w......
wwwd.....w
gdwwwww...
..wd....w.
..........
www....w..`, // 6
	map`
wpw..r....
w.w.....wo
w.w.....w.
w.wwuwwww.
wow...w...
w.....w...
wuw.u.w..g
w....lw...`, // 7
	map`
....d....p
.wwwwwwww.
uwddddddw.
.w......w.
....g...w.
.wd....dw.
uwd....dw.
.....l....`, // 8
	map`
......x..p
......x...
......xt..
......xxxx
yyyy......
...y......
...y......
g..y.....t`, // 9
	map`
p.r..t....
..w.......
owwyyyyyyy
.dxl......
..xl......
..xl......
xxxl......
g.xl.t....`, // 10
	map`
xp....r..t
xxx...xxxx
..x...x...
..x...xxxx
xxxxxxx..x
xt...xxxox
x....x.ytx
xxxxxxgyxx`, // 11 
	map`
t..yplygxy
woowwxxxxt
....t.ydy.
....w.....
....xu...u
....x.....
....x...t.
ddwdwwwwww`, // 12
	map`
..ygwp.b.d
..yyw.....
....w.....
bwwww.....
...tw.o...
....w.....
...lx.....
...dwdt...`, // 13
	map`
puy.bd..x.
..w..w..d.
..w..wb.w.
..w..t..w.
..wb.w..w.
..w..w..w.
..w..w..w.
t.w..y.xdg`, // 14
	map`
p.t...ddgd
..w...w...
wxw...w...
d.....wyyy
......w...
......xbbb
.b....w...
......d.t.`, // 15
	map`
p...w.twg.
www.w..ww.
.tw.b...wy
..w.ww..x.
.y...wuw..
.w.....w..
.wwww..wwy
.....bbb..`, // 16
	map`
p..n....d.
wwwww.wwww
....w.wt.d
..g.w.w...
....wnw..b
n.l.x.....
....w.w...
....w.w...`, // 17
	map`
wpn.w..dyg
w..xr.bbby
w...w..w..
w...w.nx..
wo.uw..w..
w...w..t..
w.t.w..w..
w.r.w..y..`, // 18
	map`
p...d....1
.....w....
....w.....
o....w...o
....w.....
.....w....
....w.....
2....d...g`, // 19
	map`
p...wg...w
dwwowwww.w
......wwyw
.w1wwwww.w
.....y....
w2wwnw....
b....w....
t.........`, // 20
	map`
pn..wd.rrg
....vw.www
....wd....
xxxxxw....
....wyyyyy
....dw..2.
.o..wv....
.1..dw.n..`, // 21
	map`
p..r...bbd
tuww.b...d
w.....1..d
wwwwwwdwwd
d..2.r..xx
.....r....
t..n.d..xx
....yl..xg`, // 22
	map`
pr.r.l.l.d
rxo.o.l.u.
.r.g1uyu.u
u.ldl.l.ux
yd.uxo.ryo
u.u.l.l.u.
.l.x.r2r.t
r.rtr.r.rd`, // 23
	map`
p.n.x.....
wo..r.....
w...r.f...
w...1....d
w...wwwwww
w.v.2.Bx..
w.....Bx.g
wbbb..Bx..`, // 24
	map`
p.lgBxwf..
..lBBxw...
..wxxxw...
.n1......n
........b.
.....v....
..w......2
..d.......`, // 25
	map`
d..w...x..
.b.w...x..
...y...x..
n..t...x.n
...wn..x..
...l...x..
.f.wp..xBB
...wwwdxBg`, // 26
];

const winMap = map`
..........
..........
..........
...g..g...
..........
...g..g...
....gg....
..........`;

setMap(levels[level]);

addText(`jeff boxos`, {
	x: 5, y: 0, color: color`0`
});
addText(`W/A/S/D to move`, {
	x: 5, y: 1, color: color`0`
});
addText(`I to reset`, {
	x: 5, y: 2, color: color`0`
});
addText(`J/L to select`, {
	x: 5, y: 3, color: color`0`
});
addText(`${level + 1}`, {x: 0, y: 0, color: color`0`});

let gameOver = false;

function win() {
	if ((level + 1) === levels.length) {
		clearInterval(secondsInterval);
		clearText();
		setMap(winMap);
		addText('YOU  WIN', {x: 6, y: 4, color: color`0`});
		let hours = Math.round(seconds / 3600);
		let minutes = Math.round((seconds % 3600) / 60);
		let secs = Math.round(seconds % 60);
		addText(`${hours < 10 ? 0 : ''}${hours}:${minutes < 10 ? 0 : ''}${minutes}:${secs < 10 ? 0 : ''}${secs}`, {
			x: 6,
			y: 15,
			color: color`0`
		});
		setTimeout(() => {
			clearText();
			setTimeout(() => addText('special thx to:', {x: 0, y: 0, color: color`0`}), 1000);
			setTimeout(() => addText('nicky case', {x: 0, y: 1, color: color`0`}), 2000);
			setTimeout(() => addText('charlie', {x: 0, y: 2, color: color`0`}), 3000);
			setTimeout(() => addText('graham', {x: 0, y: 3, color: color`0`}), 4000);
			setTimeout(() => addText('sprig', {x: 0, y: 4, color: color`0`}), 5000);
			setTimeout(() => addText('the academy', {x: 0, y: 5, color: color`0`}), 6000);
			setTimeout(() => addText('thanks for playing!', {x: 0, y: 15, color: color`0`}), 8000);
		}, 4000);
		return;
	}
	addText("NEXT LEVEL", {x: 5, y: 4, color: color`0`});
	gameOver = true;
	setTimeout(() => {
		clearText();
		gameOver = false;
		level++;
		setMap(levels[level]);
		addText(`${level + 1}`, {x: 0, y: 0, color: color`0`});
	}, 1000);
}

function death() {
	addText("YOU DIE", {x: 6, y: 4, color: color`0`});
	gameOver = true;
	setTimeout(() => {
		clearText();
		gameOver = false;
		setMap(levels[level]);
		addText(`${level + 1}`, {x: 0, y: 0, color: color`0`});
	}, 1000);
}

function teleport(portalType) {
	let [x, y] = [getFirst(portalType).x, getFirst(portalType).y];
	getFirst(player).remove();
	addSprite(x, y, player);
}

function updateSolids(direction) {
	switch (direction) {
		case 0:
			setSolids(solids.concat([up, right, left]));
			break;
		case 1:
			setSolids(solids.concat([right, left, down]));
			break;
		case 2:
			setSolids(solids.concat([up, right, down]));
			break;
		case 3:
			setSolids(solids.concat([up, left, down]));
			break;
	}
}

let isMoving = false;

function doMove(direction) {
	if (gameOver) return;
	let doneMoving = false;
	isMoving = true;
	let moveInterval = setInterval(() => {
		let _player = getFirst(player);
		updateSolids(direction);
		switch (direction) {
			case 0: // down
				if (_player.y === 7 || getTile(_player.x, _player.y + 1).some((t) => [wall, goal, die, up, left, right, toggleOn, toggleOff, toggleBlockOn, break_, buttonWall, buttonHit].includes(t.type))) {
					doneMoving = true;
					if (getTile(_player.x, _player.y + 1).some((t) => t.type === goal)) {
						win()
					} else if (getTile(_player.x, _player.y + 1).some((t) => t.type === die)) {
						death()
					} else if (getTile(_player.x, _player.y + 1).some((t) => t.type === toggleOn || t.type === toggleOff)) {
						toggleBlocks()
					} else if (getTile(_player.x, _player.y + 1).some((t) => t.type === break_)) {
						setTimeout(() => clearTile(_player.x, _player.y + 1), 100)
					}
				} else if (getTile(_player.x, _player.y + 1).some((t) => t.type === box)) {
					doneMoving = true;
					_player.y += 1;
				} else if (getTile(_player.x, _player.y + 1).some((t) => t.type === b_portal)) {
					setSolids(solids);
					teleport(o_portal);
					//doneMoving = true;
				} else if (getTile(_player.x, _player.y + 1).some((t) => t.type === o_portal)) {
					setSolids(solids);
					teleport(b_portal);
					//doneMoving = true;
				} else if (getTile(_player.x, _player.y + 1).some((t) => t.type === button)) {
					doneMoving = true;
					buttonState = true;
					toggleButton()
					getFirst(button).type = buttonHit;
				} else _player.y += 1;
				break;
			case 1: // up
				if (_player.y === 0 || getTile(_player.x, _player.y - 1).some((t) => [wall, goal, die, down, left, right, toggleOn, toggleOff, toggleBlockOn, break_, buttonWall, buttonHit].includes(t.type))) {
					doneMoving = true;
					if (getTile(_player.x, _player.y - 1).some((t) => t.type === goal)) {
						win()
					} else if (getTile(_player.x, _player.y - 1).some((t) => t.type === die)) {
						death()
					} else if (getTile(_player.x, _player.y - 1).some((t) => t.type === toggleOn || t.type === toggleOff)) {
						toggleBlocks()
					} else if (getTile(_player.x, _player.y - 1).some((t) => t.type === break_)) {
						setTimeout(() => clearTile(_player.x, _player.y - 1), 100)
					}
				} else if (getTile(_player.x, _player.y - 1).some((t) => t.type === box)) {
					doneMoving = true;
					_player.y -= 1;
				} else if (getTile(_player.x, _player.y - 1).some((t) => t.type === b_portal)) {
					setSolids(solids);
					teleport(o_portal);
				} else if (getTile(_player.x, _player.y - 1).some((t) => t.type === o_portal)) {
					setSolids(solids);
					teleport(b_portal);
				} else if (getTile(_player.x, _player.y - 1).some((t) => t.type === button)) {
					doneMoving = true;
					buttonState = true;
					toggleButton()
					getFirst(button).type = buttonHit;
				} else _player.y -= 1;
				break;
			case 2: // left
				if (_player.x === 0 || getTile(_player.x - 1, _player.y).some((t) => [wall, goal, die, up, right, down, toggleOn, toggleOff, toggleBlockOn, break_, buttonWall, buttonHit].includes(t.type))) {
					doneMoving = true;
					if (getTile(_player.x - 1, _player.y).some((t) => t.type === goal)) {
						win()
					} else if (getTile(_player.x - 1, _player.y).some((t) => t.type === die)) {
						death()
					} else if (getTile(_player.x - 1, _player.y).some((t) => t.type === toggleOn || t.type === toggleOff)) {
						toggleBlocks()
					} else if (getTile(_player.x - 1, _player.y).some((t) => t.type === break_)) {
						setTimeout(() => clearTile(_player.x - 1, _player.y), 100)
					}
				} else if (getTile(_player.x - 1, _player.y).some((t) => t.type === box)) {
					doneMoving = true;
					_player.x -= 1;
				} else if (getTile(_player.x - 1, _player.y).some((t) => t.type === b_portal)) {
					setSolids(solids);
					teleport(o_portal);
				} else if (getTile(_player.x - 1, _player.y).some((t) => t.type === o_portal)) {
					setSolids(solids);
					teleport(b_portal);
				} else if (getTile(_player.x - 1, _player.y).some((t) => t.type === button)) {
					doneMoving = true;
					buttonState = true;
					toggleButton()
					getFirst(button).type = buttonHit;
				} else _player.x -= 1;
				break;
			case 3: // right
				if (_player.x === 9 || getTile(_player.x + 1, _player.y).some((t) => [wall, goal, die, up, left, down, toggleOn, toggleOff, toggleBlockOn, break_, buttonWall, buttonHit].includes(t.type))) {
					doneMoving = true;
					if (getTile(_player.x + 1, _player.y).some((t) => t.type === goal)) {
						win()
					} else if (getTile(_player.x + 1, _player.y).some((t) => t.type === die)) {
						death()
					} else if (getTile(_player.x + 1, _player.y).some((t) => t.type === toggleOn || t.type === toggleOff)) {
						toggleBlocks()
					} else if (getTile(_player.x + 1, _player.y).some((t) => t.type === break_)) {
						setTimeout(() => clearTile(_player.x + 1, _player.y), 100)
					}
				} else if (getTile(_player.x + 1, _player.y).some((t) => t.type === box)) {
					doneMoving = true;
					_player.x += 1;
				} else if (getTile(_player.x + 1, _player.y).some((t) => t.type === b_portal)) {
					setSolids(solids);
					teleport(o_portal);
				} else if (getTile(_player.x + 1, _player.y).some((t) => t.type === o_portal)) {
					setSolids(solids);
					teleport(b_portal);
				} else if (getTile(_player.x + 1, _player.y).some((t) => t.type === button)) {
					doneMoving = true;
					buttonState = true;
					toggleButton()
					getFirst(button).type = buttonHit;
				} else _player.x += 1;
				break;
		}
		setSolids(solids);
		if (doneMoving) {
			isMoving = false;
			clearInterval(moveInterval);
		}
	}, 20);
}

onInput("s", () => {
	if (!isMoving) doMove(0);
});

onInput("w", () => {
	if (!isMoving) doMove(1);
})

onInput("a", () => {
	if (!isMoving) doMove(2);
});

onInput("d", () => {
	if (!isMoving) doMove(3);
});

onInput("i", () => {
	death();
});

onInput("j", () => {
	if (level === 0) return;
	clearText();
	level--;
	setMap(levels[level]);
	addText(`${level + 1}`, {x: 0, y: 0, color: color`0`});
});

onInput("l", () => {
	if (level + 1 === levels.length) return;
	clearText();
	level++;
	setMap(levels[level]);
	addText(`${level + 1}`, {x: 0, y: 0, color: color`0`});
});
