/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Monster Mayhem
@author: Gus Ruben
@tags: ['endless', 'halloween']
@addedOn: 2024-00-00
*/


const EMPTY = "_";
const GROUND1="1";
const GROUND2="2";
const GROUND3="3";
const GROUND4="4";
const GROUND5="5";
const GROUND6="6";
const GROUND7="7";
const GROUND8="8";
const GROUND9="9";
const HOLE_RED = "R";
const HOLE_BLUE = "B";
const ZOMBIE = "Z";

const EMPTY_BITMAP = bitmap`
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................`

const CORE_LEGEND = [
	[ EMPTY, EMPTY_BITMAP ],
	[ GROUND1, bitmap`
CCCCCCCCCCCCCCCC
CCCC6CCCCCCCCCCC
CCCCCFCCCCCCCCCC
CCCCCFCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CC6CCCCCCCCCCCCC
CCC6CC6CCCCCCCCC
CCC6CFCCCCCCCCCC
CCCFCFCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC` ],
	[ GROUND2, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCC6CC
CCCCCCCCCCCC6CCC
CCCCCCCCCCCCFCCC
CCCCCCCCCC6CFCCC
CCCCCCCCCCCFCCCC
C6CCCCCCCCCCCCCC
CCFCCCCCCCCCCCCC
CCFCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC` ],
	[ GROUND3, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCC6CCCC
CCCCCCCCCCCCFCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC` ],
	[ GROUND4, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCC6CCCCCCCCCC
CCCC6CCCCCCCCCCC
CCCC6CCCCCCCCCCC
CCCCFCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCC6CFCCCCC
CCCCCCC6CFCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC` ],
	[ GROUND5, bitmap`
CCCCCCCCCCCCCCCC
CCCC6CCCCCCCCCCC
CCCCCFCCCCCCCCCC
CCCCCFCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCC11CCCC
CCCCCCCCC111CCCC
CCCCCCCCCCCCCCCC
CC6CCCCCCCCCCCCC
CCC6CC6CCCCCCCCC
CCC6CFCCCCCCCCCC
CCCFCFCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC` ],
	[ GROUND6, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCLLCCCCCCCCCC
CCC9LCCCCCCCCCCC
CC9999CCCCCCC6CC
CC9999CCCCCC6CCC
CCC999CCCCCCFCCC
CCCCCCCCCC6CFCCC
CCCCCCCCCCCFCCCC
C6CCCCCCCCCCCCCC
CCFCCCCCCCCCCCCC
CCFCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC` ],
	[ GROUND7, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCLCCCCCCCCCCC
CCCLCCCCCCC6CCCC
CC9999CCCCCCFCCC
C969969CCCCCCCCC
C999999CCCCCCCCC
C996699CCCCCCCCC
CC9999CCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC` ],
	[ GROUND8, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCC6CCCCCCCCCC
CCCC6CCCCCCCCCCC
CCCC6CCCCC11CCCC
CCCCFCCCCC1LLCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCC6CFCCCCC
CCCCCCC6CFCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC` ],
	[ GROUND9, bitmap`
CCCCCCCCCCCCCCCC
CCCC6CCCCCCCCCCC
CCCCCFCCCCCCCCCC
CCCCCFCCCCCCCCCC
CCCCCCCCCCCCCC8C
CCCCCCCCCCC88C8C
CCCCCCCCCC8CC8CC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CC6CCCCCCCCCCCCC
CCC6CC6CCCCCCCCC
CCC6CFCCCCCCCCCC
CCCFCFCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC` ],
	[ HOLE_RED, bitmap`
CCCCCCCCCCCCCCCC
C33333333333333C
C3CCCCCCCCCCCC3C
CCCCLLLLLLLLCCCC
CCLL00000000LLCC
CL000000000000LC
C00000000000000C
C00000000000000C
C00000000000000C
C00000000000000C
C00000000000000C
CC000000000000CC
CCCC00000000CCCC
C3CCCCCCCCCCCC3C
C33333333333333C
CCCCCCCCCCCCCCCC` ],
	[ HOLE_BLUE, bitmap`
CCCCCCCCCCCCCCCC
C77777777777777C
C7CCCCCCCCCCCC7C
CCCCLLLLLLLLCCCC
CCLL00000000LLCC
CL000000000000LC
C00000000000000C
C00000000000000C
C00000000000000C
C00000000000000C
C00000000000000C
CC000000000000CC
CCCC00000000CCCC
C7CCCCCCCCCCCC7C
C77777777777777C
CCCCCCCCCCCCCCCC` ],
];


const HAMMER = bitmap`
........9666....
.......669FFF...
........6F9FF...
.........FF1....
............1...
................
................
................
................
................
................
................
................
................
................
................`;

const MONSTERS = [
	[ bitmap`
................
................
................
................
................
................
................
................
................
................
.....88.........
....888DDD......
....DDDDDDDD....
................
................
................`, bitmap`
................
................
................
................
................
................
.....88DDDD.....
....882D202D....
....D20DDDDD....
....DDD00LD4....
.....DDD4444....
....77DDD447D...
....7D777777....
................
................
................`, bitmap`
......8DDD......
.....88D22D.....
.....88D022.....
.....02DDDDD....
.....2200DD4....
....DDD0LD44....
.....DDD4444....
...D777DDD47D...
..DD7D777D77D...
..DD.DD7777D1...
..D4.DD77D7D....
..1..7555575....
....5DD55555....
................
................
................`, bitmap`
................
.....88DDDD.....
....888D022.....
....822D222D....
....D02D00DD....
....DDD00LD4....
.....DDD4444....
..DD7777DD47D...
.D447D777777DD..
.D4..DD77DD.D1..
.14..D477D7.1...
.....7777D75....
....5DD55555....
................
................
................`,  bitmap`
........9666....
.......669FFF...
.....0DD6F9FF...
....880D0F11....
....80DDDDD1....
....DDD00DD4....
.....DD00444....
...D7777DD47D...
..DD7D777777D...
.1D4.DD77DDD1...
..1..D477D71....
.....7777D75....
....5DD55555....
................
................
................`, bitmap`
........666.....
.......966FF....
.....0669FFF....
....8806691.....
....80DD6FD1....
....DDD00DD4....
.....DD00444....
...D7777DD47D...
..DD7D777777D...
.1D4.DD77DDD1...
..1..D477D71....
.....7777D75....
....5DD55555....
................
................
................` ,  bitmap`
........9666....
.......669FFF...
........6F9FF...
.........F11....
.....8DDD0D1....
....880D0DD.....
....D0DDD0DD....
...DDDD00D44....
..DD7D00L477....
..D44777777DD...
..D1.D477D7DD...
..1..7777D711...
....5DDDD551....
................
................
................`, bitmap`
........9666....
.......669FFF...
........6F9FF...
.........FF1....
............1...
................
................
................
................
................
.....88.........
....888DDD......
....DDDDDDDD....
................
................
................`,]
]


// get a unique number given an x and y, using cantor's pairing function
function getPositionHash(x, y) {
	return ((x+y) * (x+y+1) * 0.5) + y; // cantor's pairing function
}

// get a unique character for each position
function getLegendChar(x, y) {
	x++;
	y++;
	return String.fromCharCode(getPositionHash(x, y) + 128); // add 128 so it's past all the normal chars we might want to use;
}

const STARTING_LEGEND=[];
const CUSTOM_LEGEND_CHARS = [];
for (let y = 0; y < 5; y++) {
	let row = [];
	for (let x = 0; x < 6; x++) {
		const ch = getLegendChar(x, y);
		row.push(ch);
		STARTING_LEGEND.push([ch, EMPTY_BITMAP]);
	}
	CUSTOM_LEGEND_CHARS.push(row);
}

const HOLES = [
	{x: 2, y: 1, type: -1, bonking: false},
	{x: 3, y: 1, type: -1, bonking: false},
	{x: 1, y: 2, type: -1, bonking: false},
	{x: 2, y: 2, type: -1, bonking: false},
	{x: 3, y: 2, type: -1, bonking: false},
	{x: 4, y: 2, type: -1, bonking: false},
	{x: 2, y: 3, type: -1, bonking: false},
	{x: 3, y: 3, type: -1, bonking: false},
]

const CURRENT_ANIMATIONS_LEGEND = [];

function updateAnimations() {
	setLegend(...CURRENT_ANIMATIONS_LEGEND, ...CORE_LEGEND);
}

function popup(holeIndex, typeIndex) {
	const hole = HOLES[holeIndex];
	x = hole.x;
	y = hole.y;
	hole.type = typeIndex;

	const LEGEND_ARRAY = [getLegendChar(x, y), MONSTERS[typeIndex][0]];
	CURRENT_ANIMATIONS_LEGEND.push(LEGEND_ARRAY);

	setTimeout(() => {
		if (!hole.bonking) {
			LEGEND_ARRAY[1] = MONSTERS[typeIndex][1];
			updateAnimations();
		}
	}, 50);
	setTimeout(() => {
		if (!hole.bonking) {
			LEGEND_ARRAY[1] = MONSTERS[typeIndex][2];
			updateAnimations();
		}
	}, 100);
  	setTimeout(() => {
		if (!hole.bonking) {
			LEGEND_ARRAY[1] = MONSTERS[typeIndex][3];
			updateAnimations();
			// remove the animation from the animation legend, it will stop re-rendering
			CURRENT_ANIMATIONS_LEGEND.splice(CURRENT_ANIMATIONS_LEGEND.indexOf(LEGEND_ARRAY), 1);
		}
	}, 200);
}

function bonk(holeIndex) {
	const hole = HOLES[holeIndex];
	
	if (hole.bonking) {
		return
	}
	
	hole.bonking = true;
	const x = hole.x;
	const y = hole.y;
	
	// if they mis-bonk an empty hole
	if (hole.type == -1) {
		const LEGEND_ARRAY = [getLegendChar(x, y), HAMMER];
		CURRENT_ANIMATIONS_LEGEND.push(LEGEND_ARRAY);
		updateAnimations();

		setTimeout(() => {
			LEGEND_ARRAY[1] = EMPTY_BITMAP;
			hole.bonking = false;
			updateAnimations();
			CURRENT_ANIMATIONS_LEGEND.splice(CURRENT_ANIMATIONS_LEGEND.indexOf(LEGEND_ARRAY), 1);
		}, 1000)
		return;
	}
	
	
	const LEGEND_ARRAY = [getLegendChar(x, y), MONSTERS[hole.type][4]];
	CURRENT_ANIMATIONS_LEGEND.push(LEGEND_ARRAY);
	updateAnimations();

	setTimeout(() => {
		LEGEND_ARRAY[1] = MONSTERS[hole.type][5];
		updateAnimations();
	}, 50);
  	setTimeout(() => {
		LEGEND_ARRAY[1] = MONSTERS[hole.type][6];
		updateAnimations();
	}, 100);
    setTimeout(() => {
		LEGEND_ARRAY[1] = MONSTERS[hole.type][7];
		updateAnimations();
	}, 125);
	setTimeout(() => {
		LEGEND_ARRAY[1] = HAMMER;
		updateAnimations();
	}, 150);
	setTimeout(() => {
		LEGEND_ARRAY[1] = EMPTY_BITMAP;
		updateAnimations();
		CURRENT_ANIMATIONS_LEGEND.splice(CURRENT_ANIMATIONS_LEGEND.indexOf(LEGEND_ARRAY), 1);
		hole.bonking = false;
		hole.type = -1;
	}, 750);
}


function mole() {
	if (!gameRunning) return;

	let holeIndex = -1;
	let attempts = 0;
	// repeat until we get an unused hole
	while (holeIndex < 0 || HOLES[holeIndex].type != -1) {
		holeIndex = Math.floor(Math.random() * 8);
		if (++attempts > 36) {
			console.log("Holes are full!");
			return;
		}
	}

	popup(holeIndex, 0);

	// adjust the current timer and start time to hit the max speed before 'double time' starts
	const adjustedStartTime = START_TIME - DOUBLE_TIME
	const adjustedTimer = Math.max(timer - DOUBLE_TIME, DOUBLE_TIME);
	const timeout = START_INTERVAL - (START_INTERVAL - END_INTERVAL) * ((adjustedStartTime - adjustedTimer)/ adjustedStartTime)
	console.log(timer, "time for next mole:", timeout)
	setTimeout(mole, timeout);
}


// looks weird bc the ground is varied
const MAIN_MAP = map`
163181
43RB49
2RBRB2
35RB47
124324`;

// TODO: title screen
var gameRunning = false;
const START_TIME = 25;
const START_INTERVAL = 3000; // starting time between moles
const END_INTERVAL = 1000; // ending time between moles
const DOUBLE_TIME = 5 // when the timer hits this number, 2 moles appear at once
var timer;

function startGame() {
	console.log("%cStarting Game", "color: blue; font-size:16px")
	gameRunning = true;
	timer = START_TIME;

	// the way this works is, it sets a map where each tile has a different sprite. then, those can be controlled indiviudally by setting the legend.
	// it sets the map afterward by adding sprites 1 by 1. This way, the top layer of sprites can be controlled individually
	// this is basically all just a workaround for the fact that adding a new sprite adds it at the bottom of the z-order stack
	setLegend(...CORE_LEGEND, ...STARTING_LEGEND);
	setMap(MAIN_MAP);
	for (let x = 0; x < 6; x++) {
		for (let y = 0; y < 5; y++) {
			addSprite(x, y, CUSTOM_LEGEND_CHARS[y][x]);
		}
	}

	const timerInterval = setInterval(() => {
		timer--;
		if (timer == 0) clearInterval(timerInterval);
	}, 1000)

	mole();
	// when the timer hits DOUBLE_TIME, 2 moles appear at once
	setTimeout(mole, timer - DOUBLE_TIME)
}

startGame();

onInput("w", () => bonk(0));
onInput("a", () => bonk(2));
onInput("s", () => bonk(6));
onInput("d", () => bonk(4));
onInput("i", () => bonk(1));
onInput("j", () => bonk(3));
onInput("k", () => bonk(7));
onInput("l", () => bonk(5));
