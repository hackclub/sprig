/*
@title: 2p-snake
@author: Sigfredo feat. whatware
@tags: ['multiplayer', 'snake', '2p', 'co-op']
@addedOn: 2024-08-13
*/

// src/music.ts
var bgm = tune`
162.16216216216216: C5~162.16216216216216 + B4^162.16216216216216,
486.48648648648646,
162.16216216216216: F5~162.16216216216216 + C4^162.16216216216216,
162.16216216216216: G5~162.16216216216216 + D4^162.16216216216216,
162.16216216216216,
162.16216216216216: E5~162.16216216216216 + E4^162.16216216216216,
324.3243243243243,
162.16216216216216: F5~162.16216216216216 + F4^162.16216216216216,
162.16216216216216,
162.16216216216216: E5~162.16216216216216 + G4^162.16216216216216,
162.16216216216216: C5~162.16216216216216 + B4^162.16216216216216,
162.16216216216216,
162.16216216216216: G4~162.16216216216216 + E5^162.16216216216216,
324.3243243243243,
162.16216216216216: C5~162.16216216216216 + B4^162.16216216216216,
162.16216216216216,
162.16216216216216: A4~162.16216216216216 + D5^162.16216216216216,
162.16216216216216: C5~162.16216216216216 + B4^162.16216216216216,
162.16216216216216,
162.16216216216216: E5~162.16216216216216 + G4^162.16216216216216,
162.16216216216216,
162.16216216216216: F5~162.16216216216216 + B4^162.16216216216216,
162.16216216216216: E5~162.16216216216216 + A4^162.16216216216216,
162.16216216216216: C5~162.16216216216216 + F4^162.16216216216216,
162.16216216216216: G4~162.16216216216216 + E4^162.16216216216216,
162.16216216216216: F4~162.16216216216216 + D4^162.16216216216216,
162.16216216216216: E4~162.16216216216216 + C4^162.16216216216216,
162.16216216216216: G4~162.16216216216216 + A4^162.16216216216216 + D5~162.16216216216216`;
var gameOver = tune`
178.57142857142858: C5^178.57142857142858 + E5~178.57142857142858 + F4~178.57142857142858,
178.57142857142858: F4^178.57142857142858 + C5~178.57142857142858 + D4~178.57142857142858,
178.57142857142858: G4^178.57142857142858 + D5~178.57142857142858 + E4~178.57142857142858,
178.57142857142858: D5^178.57142857142858 + C4~178.57142857142858 + G4~178.57142857142858 + G5~178.57142857142858,
5000`;
var foodSound = tune`
108.30324909747293,
108.30324909747293: D4^108.30324909747293 + E5~108.30324909747293,
108.30324909747293: E4^108.30324909747293 + F5~108.30324909747293,
3140.794223826715`;
var antiFoodSound = tune`
131.00436681222706,
131.00436681222706: E4~131.00436681222706 + F4^131.00436681222706,
131.00436681222706: D4~131.00436681222706 + E4^131.00436681222706,
3799.1266375545847`;
var music = playTune(bgm, Infinity);
var playGameOverSound = () => {
	music.end();
	playTune(gameOver, 1);
	setTimeout(() => {
		music = playTune(bgm, Infinity);
	}, 1800);
};

// src/sprites.ts
var p1 = "1";
var p2 = "2";
var p1Apple = "a";
var p2Apple = "A";
var grass = "g";
var grassWithStraws = "G";
var borderL = "l";
var borderR = "r";
var borderT = "t";
var borderB = "b";
var borderLT = "c";
var borderRT = "T";
var borderLB = "C";
var borderRB = "B";
var bg = "q";
setLegend(
	[
		p1,
		bitmap`
.55555555555555.
5555555555555555
555..........555
55..55555555..55
55.5555555555.55
55.5555555555.55
55.5555555555.55
55.5555555555.55
55.5555555555.55
55.5555555555.55
55.5555555555.55
55.5555555555.55
55..55555555..55
555..........555
5555555555555555
.55555555555555.`,
	],
	[
		p2,
		bitmap`
.33333333333333.
3333333333333333
333..........333
33..33333333..33
33.3333333333.33
33.3333333333.33
33.3333333333.33
33.3333333333.33
33.3333333333.33
33.3333333333.33
33.3333333333.33
33.3333333333.33
33..33333333..33
333..........333
3333333333333333
.33333333333333.`,
	],
	[
		p1Apple,
		bitmap`
................
........7.......
.......77.......
....55575555....
...5255555555...
..525555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
...5555555555...
...5555555555...
.....557755.....
................
................`,
	],
	[
		p2Apple,
		bitmap`
................
........C.......
.......CC.......
....333C3333....
...3233333333...
..323333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
...3333333333...
...3333333333...
.....33CC33.....
................
................`,
	],
	[
		grass,
		bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`,
	],
	[
		grassWithStraws,
		bitmap`
4444444444444444
4444444444444444
444444D444444DD4
4444444444444444
444D44444DD44444
4444DD44DD444444
44444DD4D4444444
44444DD444444444
44D444DD444DD444
44DD44DD44DD4444
444D44DD44D44444
444D44DD4DD44444
4444444D4DD44444
444444444DD44444
4444444444444444
4444444444444444`,
	],
	[
		borderL,
		bitmap`
0000000000220000
0000000000220000
0000000000002200
0000000000002200
0000000000220000
0000000000220000
0000000000002200
0000000000002200
0000000000220000
0000000000220000
0000000000002200
0000000000002200
0000000000220000
0000000000220000
0000000000002200
0000000000002200`,
	],
	[
		borderR,
		bitmap`
0022000000000000
0022000000000000
0000220000000000
0000220000000000
0022000000000000
0022000000000000
0000220000000000
0000220000000000
0022000000000000
0022000000000000
0000220000000000
0000220000000000
0022000000000000
0022000000000000
0000220000000000
0000220000000000`,
	],
	[
		borderT,
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
2200220022002200
2200220022002200
0022002200220022
0022002200220022
0000000000000000
0000000000000000`,
	],
	[
		borderB,
		bitmap`
0000000000000000
0000000000000000
2200220022002200
2200220022002200
0022002200220022
0022002200220022
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
		borderLT,
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
0000000000002200
0000000000002200
0000000000220022
0000000000220022
0000000000002200
0000000000002200`,
	],
	[
		borderRT,
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
2200220000000000
2200220000000000
0022000000000000
0022000000000000
0000220000000000
0000220000000000`,
	],
	[
		borderLB,
		bitmap`
0000000000220000
0000000000220000
0000000000002200
0000000000002200
0000000000220022
0000000000220022
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
		borderRB,
		bitmap`
0022000000000000
0022000000000000
2200220000000000
2200220000000000
0022000000000000
0022000000000000
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
		bg,
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
	]
);
setSolids([p1, p2]);
setPushables({});

// src/player.ts
var players = [
	{
		sprite: p1,
		facing: [0, 0],
		parts: [],
		food: p1Apple,
		antiFood: p2Apple,
	},
	{
		sprite: p2,
		facing: [0, 0],
		parts: [],
		food: p2Apple,
		antiFood: p1Apple,
	},
];
var setupPlayer = (player, parts, facing) => {
	player.parts = parts;
	player.facing = facing;
	player.newFacing = void 0;
	player.parts.map((part) => {
		addSprite(part[0], part[1], player.sprite);
	});
};
var updatePlayer = (player) => {
	if (player.newFacing) {
		player.facing = player.newFacing;
		player.newFacing = void 0;
	}
	const tail = player.parts[player.parts.length - 1];
	const tileUnderTail = getTile(tail[0], tail[1]);
	clearTile(tail[0], tail[1]);
	addSprite(
		tail[0],
		tail[1],
		tileUnderTail.find((v) => v.type == grass || v.type == grassWithStraws)
			?.type ?? ""
	);
	const nextTail = player.parts[player.parts.length - 2];
	if (!tileUnderTail.find((v) => v.type == player.food)) {
		player.parts.pop();
		if (tileUnderTail.find((v) => v.type == player.antiFood)) {
			player.parts.pop();
			spawnFood(player.antiFood);
			const tileUnderNextTail = getTile(nextTail[0], nextTail[1]);
			clearTile(nextTail[0], nextTail[1]);
			addSprite(
				nextTail[0],
				nextTail[1],
				tileUnderNextTail.find(
					(v) => v.type == grass || v.type == grassWithStraws
				)?.type ?? ""
			);
			game.points--;
		}
	} else {
		addSprite(tail[0], tail[1], player.sprite);
		spawnFood(player.food);
		game.points++;
	}
	const newHead = [
		1 + ((17 + player.parts[0][0] + player.facing[0]) % 18),
		3 + ((9 + player.parts[0][1] + player.facing[1]) % 12),
	];
	const tilesOnNewHead = getTile(newHead[0], newHead[1]);
	if (
		tilesOnNewHead.length > 0 &&
		!tilesOnNewHead.every(
			(v) =>
				v.type == p1Apple ||
				v.type == p2Apple ||
				v.type == grass ||
				v.type == grassWithStraws
		)
	)
		return -1;
	if (tilesOnNewHead.find((v) => v.type == player.food))
		playTune(foodSound, 1);
	else if (tilesOnNewHead.find((v) => v.type == player.antiFood))
		playTune(foodSound, 1);
	player.parts.unshift(newHead);
	addSprite(newHead[0], newHead[1], player.sprite);
	if (player.parts.length < 3) return -1;
	return 0;
};

// src/game.ts
var game = {
	started: false,
	points: 0,
	speed: 350,
};
var level = map`
qqqqqqqqqqqqqqqqqqqq
qqqqqqqqqqqqqqqqqqqq
cttttttttttttttttttT
lgGggggggGgGGggggggr
lggGggggggggggGggGGr
lgggggggGggggGgggggr
lggggGggggggGggggGgr
lgggggggGggggggggggr
lgggggggGggGgggggggr
lggGgGggggggGggGgggr
lggggggggGggGggggGgr
lGggggGggggggggggggr
lggggGggggggGggggggr
lggGgggGggGggggggGgr
lgggggggggggggGggggr
CbbbbbbbbbbbbbbbbbbB`;
setMap(level);
var setupGame = () => {
	setupPlayer(
		players[0],
		[
			[3, 8],
			[3, 7],
			[3, 6],
		],
		[0, 1]
	);
	setupPlayer(
		players[1],
		[
			[16, 9],
			[16, 10],
			[16, 11],
		],
		[0, -1]
	);
	addSprite(10, 8, p1Apple);
	addSprite(9, 9, p2Apple);
	clearText();
	addText(`2P SNAKE       ${("00" + game.points).slice(-3)}`, {
		x: 1,
		y: 1,
		color: color`2`,
	});
	game.points = 0;
	game.speed = 300;
};
var startGame = () => {
	game.started = true;
	const tilesToClear = [
		...tilesWith(p1),
		...tilesWith(p2),
		...tilesWith(p1Apple),
		...tilesWith(p2Apple),
	];
	tilesToClear.map((tile) => {
		clearTile(tile[0].x, tile[0].y);
	});
	setMap(level);
	setupGame();
	update();
};
var update = () => {
	clearText();
	addText(`2P SNAKE       ${("00" + game.points).slice(-3)}`, {
		x: 1,
		y: 1,
		color: color`2`,
	});
	if (updatePlayer(players[0]) == -1) return gameOver2(p1);
	if (updatePlayer(players[1]) == -1) return gameOver2(p2);
	game.tick = setTimeout(update, game.speed--);
	if (game.speed < 125) game.speed = 125;
};
var gameOver2 = (winner) => {
	playGameOverSound();
	game.started = false;
	clearInterval(game.tick);
	clearText();
	addText(`Game Over      ${("00" + game.points).slice(-3)}`, {
		x: 1,
		y: 1,
		color: winner == p1 ? color`3` : color`5`,
	});
	addText("'L' TO TRY AGAIN", {
		y: 13,
		color: color`2`,
	});
};
var spawnFood = (food) => {
	while (true) {
		const nextPosition = [
			Math.round(Math.random() * 17) + 1,
			Math.round(Math.random() * 11) + 3,
		];
		if (getTile(nextPosition[0], nextPosition[1]).length == 1) {
			addSprite(nextPosition[0], nextPosition[1], food);
			break;
		}
	}
};

// src/inputs.ts
var registerInputs = () => {
	onInput(
		"w",
		() => players[0].facing[1] != 1 && (players[0].newFacing = [0, -1])
	);
	onInput(
		"s",
		() => players[0].facing[1] != -1 && (players[0].newFacing = [0, 1])
	);
	onInput(
		"a",
		() => players[0].facing[0] != 1 && (players[0].newFacing = [-1, 0])
	);
	onInput(
		"d",
		() => players[0].facing[0] != -1 && (players[0].newFacing = [1, 0])
	);
	onInput(
		"i",
		() => players[1].facing[1] != 1 && (players[1].newFacing = [0, -1])
	);
	onInput(
		"k",
		() => players[1].facing[1] != -1 && (players[1].newFacing = [0, 1])
	);
	onInput(
		"j",
		() => players[1].facing[0] != 1 && (players[1].newFacing = [-1, 0])
	);
	onInput("l", () => {
		if (!game.started) startGame();
		else players[1].facing[0] != -1 && (players[1].newFacing = [1, 0]);
	});
	afterInput(() => {});
};

// src/index.ts
registerInputs();
setupGame();
addText("'L' TO START", {
	y: 13,
	color: color`2`,
});

