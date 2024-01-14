
/* 
@title: galactic
@author: polypixeldev
@tags: ['strategy']
@img: ""
@addedOn: 2023-11-12
*/

    // Galactic by Samuel Fernandez
// Created in November 2023

const select = "s";
const black = "b";
const play = "p";
const how = "h";
const ground = "g";
const sky = "k";
const rocket = "r";
const getWood = "w";
const getStone = "u";
const wood = "f";
const stone = "e";
const add = "a";
const upgrade = "t";
const remove = "x";
const cancel = "c";
const dinobbq = "q";
const happy = "j";
const meh = "m";
const sad = "v";
const threat = "i";
const house = "1";
const bigHouse = "2";
const offices = "3";
const mansion = "4";
const magic = "5";
const school = "6";
const hq = "7";
const skull = ";";

const errTune = tune`
120: C4/120 + G4/120 + F4-120 + D4-120 + E4^120,
120: D4^120 + F4^120 + E4/120 + G4-120 + C4-120,
3600`;
const buildTune = tune`
100: C4^100 + D4^100,
100: G4^100 + A4^100,
100: A4^100 + B4^100,
100: B4^100 + C5^100,
2800`;
const doneTune = tune`
120: C5-120 + D5~120,
120: D5-120 + E5-120,
3600`;
const removeTune = tune`
100: B4/100,
100: E4/100 + B4/100,
100: F5/100 + E4/100,
2900`;
const deathTune = tune`
120: C4-120 + D4^120 + E4^120,
120: C4/120 + D4-120,
120: C4^120 + E4/120,
120: D4^120 + E4-120,
120: C4/120 + D4-120,
120: C4^120 + E4^120,
120: D4-120,
120: C4/120,
120: C4-120,
120: C4^120,
240,
120: D4^120,
120: C4~120,
2160`;

setLegend(
	[
		select,
		bitmap`
4444444444444444
4..............4
4..............4
4..............4
4..............4
4..............4
4..............4
4..............4
4..............4
4..............4
4..............4
4..............4
4..............4
4..............4
4..............4
4444444444444444`,
	],
	[
		black,
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
		play,
		bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000044000000000
0000044440000000
0000044444400000
0000044444440000
0000044444440000
0000044444400000
0000044440000000
0000044000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`,
	],
	[
		how,
		bitmap`
0000000000000000
0000000000000000
0000055555500000
0000550000550000
0000000000055000
0000000000055000
0000000000055000
0000000000550000
0000000005500000
0000000555000000
0000000550000000
0000000000000000
0000000550000000
0000000550000000
0000000000000000
0000000000000000`,
	],
	[
		sky,
		bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`,
	],
	[
		rocket,
		bitmap`
................
.......33.......
......3333......
.....333333.....
.....111111.....
.....111111.....
.....100001.....
.....102201.....
.....102201.....
.....100001.....
.....111111.....
.....111111.....
.....333333.....
.....333333.....
....33399333....
...333.66.333...`,
	],
	[
		getWood,
		bitmap`
0000000000000000
0999999999999990
0994999999999990
094449999CCCC990
0994999CCCCCCC90
099999CCCCCCCC90
09999CCCCCCCCC90
0999CCCCCCCCCC90
099CCCCCCCCCC990
09CCCCCCCCCC9990
09CCCCCCCC999990
099CCCCCC9999990
0999CCCC99999990
0999CC9999999990
0999999999999990
0000000000000000`,
	],
	[
		getStone,
		bitmap`
0000000000000000
0999999999999990
0994999999999990
0944499999999990
09949999LLLL9990
09999LLLLLLLL990
0999LLLLLLLL9990
0999LLLLLLLL9990
099LLLLLLLLL9990
099LLLLLLLLL9990
0999LLLLLLLLL990
0999LLLLLLLLL990
0999LLLLLLLL9990
099999LL99999990
0999999999999990
0000000000000000`,
	],
	[
		wood,
		bitmap`
................
................
................
.........CCCC...
.......CCCCCCC..
......CCCCCCCC..
.....CCCCCCCCC..
....CCCCCCCCCC..
...CCCCCCCCCC...
..CCCCCCCCCC....
..CCCCCCCC......
...CCCCCC.......
....CCCC........
....CC..........
................
................`,
	],
	[
		stone,
		bitmap`
................
................
................
................
........LLLL....
.....LLLLLLLL...
....LLLLLLLL....
....LLLLLLLL....
...LLLLLLLLL....
...LLLLLLLLL....
....LLLLLLLLL...
....LLLLLLLLL...
....LLLLLLLL....
......LL........
................
................`,
	],
	[
		add,
		bitmap`
4444444444444444
4..............4
4..............4
4......33......4
4......33......4
4......33......4
4......33......4
4..3333333333..4
4..3333333333..4
4......33......4
4......33......4
4......33......4
4......33......4
4..............4
4..............4
4444444444444444`,
	],
	[
		upgrade,
		bitmap`
4444444444444444
4..............4
4..............4
4......33......4
4.....3333.....4
4....333333....4
4...33333333...4
4.....3333.....4
4.....3333.....4
4.....3333.....4
4.....3333.....4
4.....3333.....4
4.....3333.....4
4..............4
4..............4
4444444444444444`,
	],
	[
		remove,
		bitmap`
4444444444444444
4..............4
4..............4
4..33......33..4
4..333....333..4
4...333..333...4
4....33..33....4
4......33......4
4......33......4
4....33..33....4
4...333..333...4
4..333....333..4
4..33......33..4
4..............4
4..............4
4444444444444444`,
	],
	[
		cancel,
		bitmap`
................
................
....33333333....
...33.....333...
..3333.....333..
..3.333.....33..
..3..333.....3..
..3...333....3..
..3....333...3..
..3.....333..3..
..33.....333.3..
..333.....3333..
...333.....33...
....33333333....
................
................`,
	],
	[
		dinobbq,
		bitmap`
................
.33..3.3..3.333.
.3.3...33.3.3.3.
.3.3.3.3.33.3.3.
.3.3.3.3..3.3.3.
.33..3.3..3.333.
................
................
.333..333..333..
.3.3..3.3..3.3..
.3.3..3.3..3.3..
.3333.3333.3.3..
.3..3.3..3.3.3..
.3333.3333.333..
..............3.
................`,
	],
	[
		happy,
		bitmap`
................
................
....66666666....
...6666666666...
..666666666666..
..666006600666..
..666006600666..
..666666666666..
..600066600006..
..600200022006..
..660022220066..
..666002200666..
...6660000666...
....66666666....
................
................`,
	],
	[
		meh,
		bitmap`
................
................
....66666666....
...6666666666...
..666666666666..
..666006600666..
..666006600666..
..666666666666..
..666666666666..
..666666666666..
..666660000666..
..666006666666..
...6666666666...
....66666666....
................
................`,
	],
	[
		sad,
		bitmap`
................
................
....66666666....
...6666666666...
..666666666666..
..666006600666..
..666776677666..
..666776677666..
..666776677666..
..666776677666..
..666776677666..
..666770077666..
...6077667706...
....67766776....
...7777777777...
.77777777777777.`,
	],
	[
		threat,
		bitmap`
................
................
....33333333....
...3333333333...
..333333333333..
..333223322333..
..333223322333..
..333333333333..
..300033300003..
..300200022003..
..330022220033..
..333002200333..
...3330000333...
....33333333....
................
................`,
	],
	[
		house,
		bitmap`
................
................
......3333......
.....333333.....
....33333333....
...3333333333...
...6666666666...
...6666666666...
...6666666666...
...6666666666...
...6666666666...
...66CCCC6666...
...66CCCC6666...
...66CCC06666...
...66CCCC6666...
...66CCCC6666...`,
	],
	[
		bigHouse,
		bitmap`
.....333333.....
....33999933....
...3393333933...
..339339933933..
.33933933933933.
.39339333393393.
.66666666666666.
.66666666666666.
.63333666666666.
.6CCCC600000066.
.6CCCC602222066.
.6CCCC602222066.
.6CCCC602222066.
.6CCC0600000066.
.6CCCC666666666.
.6CCCC666666666.`,
	],
	[
		offices,
		bitmap`
................
....11111111....
....11111111....
....12211221....
....12211221....
....11111111....
....12211221....
....12211221....
....11111111....
....12211221....
....12211221....
....11111111....
....12211221....
....12211221....
....11111111....
....11111111....`,
	],
	[
		mansion,
		bitmap`
................
................
.......66.......
......1111......
.....1LLLL1.....
....1LLLLLL1....
.11111111111111.
.12L22L22L22L21.
.12L22L22L22L21.
.12L22L22L22L21.
.12L22L22L22L21.
.12L22L22L22L21.
.12L22000022L21.
.12L220CC022L21.
.12L220CC022L21.
4444444444444444`,
	],
	[
		magic,
		bitmap`
6..6..6..6..6..6
.6.6..6..6..6.6.
..000000000000..
6602222222222066
..020000000020..
..020222222020..
6602020000202066
..020202202020..
..020202202020..
6602020000202066
..020222222020..
..020000000020..
6602222222222066
..000000000000..
.CCCCCCCCCCCCCC.
CCCCCCCCCCCCCCCC`,
	],
	[
		school,
		bitmap`
................
................
................
................
................
................
................
................
..FFFFFFFFFFFF..
..F1111111111F..
..F1221221221F..
..F1221221221F..
..F1111111111F..
..F1221FF1221F..
..F1221FF1221F..
..F1111FF1111F..`,
	],
	[
		hq,
		bitmap`
................
.33333333333333.
.33322333333333.
.33322333333333.
.33322333333333.
.33322333333333.
.33322333333333.
.33322222223333.
.33322222223333.
.33322333223333.
.33322333223333.
.33322333223333.
.33322333223333.
.33322333223333.
.33333333333333.
................`,
	],
	[
		ground,
		bitmap`
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999`,
	],
	[
		skull,
		bitmap`
................
...2222222222...
..222222222222..
..220002200022..
..220002200022..
..220002200022..
..222222222222..
..222222222222..
..222220022222..
..222200002222..
..222222222222..
...2222222222...
...22..22..22...
...22..22..22...
...22..22..22...
................`,
	]
);

setSolids([select]);

const buildings = [house, offices, school, hq];

const upgrades = {
	[house]: bigHouse,
	[bigHouse]: mansion,
	[mansion]: magic,
	[magic]: null,
	[offices]: null,
	[school]: null,
	[hq]: null,
};

const capacities = {
	[rocket]: 10,
	[house]: 3,
	[bigHouse]: 6,
	[offices]: 8,
	[mansion]: 12,
	[magic]: 20,
	[school]: 13,
	[hq]: 50,
};

// wood, stone
const costs = {
	[house]: [8, 5],
	[bigHouse]: [12, 9],
	[offices]: [16, 15],
	[mansion]: [40, 40],
	[magic]: [25, 25],
	[school]: [9, 12],
	[hq]: [100, 100],
};

const maps = {
	start: map`
bbbbbbb
bbbbbbb
bbbbbbb
bbbbbbb
bbpshbb
bbbbbbb
bbbbbbb`,
	how: map`
........
........
........
........
........
........
........`,
	animation: map`
b`,
	planet: map`
........
........
........
........
........
rs......
ggggwggu`,
	wood: map`
..f....
.......
.......
.......
.......
.......
...r...`,
	stone: map`
..e....
.......
.......
.......
.......
.......
...r...`,
	gameover: map`
;`,
};

let currentMap = "start";
let newMap = null;

setBackground(black);
setMap(maps[currentMap]);

displayStart();

const wait = async (ms) => await new Promise((res, rej) => setTimeout(res, ms));

let totalWood = 0;
let woodScore = 0;

let totalStone = 0;
let stoneScore = 0;

let selectedTile = null;
const selectOptions = [select, add, upgrade, remove];
let currentOption = 0;

const addOptions = [cancel, ...buildings];

let selectModes = {
	main: selectOptions,
	add: addOptions,
};
let selectMode = "main";
let newSelectMode = null;

let prevSelectedTile = null;

let exportedMap = null;

let happiness = 0.7;
let population = 7;
let capacity = 10;

let howPage = 0;
let howPages = 1 + Math.ceil(Object.entries(costs).length / 5);

let wasInGame = false;

// Directional up
onInput("w", () => {
	if (currentMap == "planet") {
		const selectSprite = getFirst(select);
		if (selectSprite) {
			if (selectSprite.y > 0) {
				selectSprite.y -= 1;
			} else {
				selectSprite.y = 6;
			}
		}
	}

	if (currentMap == "wood" || currentMap == "stone") {
		const rocketSprite = getFirst(rocket);

		if (rocketSprite.y > 1) {
			rocketSprite.y -= 1;
		} else {
			rocketSprite.y = 6;
		}
	}
});

// Directional left
onInput("a", () => {
	const selectSprite = getFirst(select);

	if (currentMap == "start") {
		if (selectSprite.x > 2) {
			selectSprite.x -= 1;
		} else {
			selectSprite.x = 4;
		}
	}

	if (currentMap == "planet") {
		if (selectedTile != null) {
			if (currentOption == 0) {
				currentOption = selectModes[selectMode].length - 1;
			} else {
				currentOption--;
			}

			renderSelectOption();
		} else {
			if (selectSprite.x > 0) {
				selectSprite.x -= 1;
			} else {
				selectSprite.x = 7;
			}
		}
	}

	if (currentMap == "wood" || currentMap == "stone") {
		const rocketSprite = getFirst(rocket);

		if (rocketSprite.x > 0) {
			rocketSprite.x -= 1;
		} else {
			rocketSprite.x = 6;
		}
	}

	if (currentMap == "how") {
		if (howPage == 0) {
			howPage = howPages - 1;
		} else {
			howPage--;
		}
		displayHow();
	}
});

// Directional down
onInput("s", () => {
	if (currentMap == "planet") {
		const selectSprite = getFirst(select);
		if (selectSprite) {
			if (selectSprite.y < 6) {
				selectSprite.y += 1;
			} else {
				selectSprite.y = 0;
			}
		}
	}

	if (currentMap == "wood" || currentMap == "stone") {
		const rocketSprite = getFirst(rocket);

		if (rocketSprite.y < 6) {
			rocketSprite.y += 1;
		} else {
			rocketSprite.y = 1;
		}
	}
});

// Directional right
onInput("d", () => {
	const selectSprite = getFirst(select);

	if (currentMap == "start") {
		if (selectSprite.x < 4) {
			selectSprite.x += 1;
		} else {
			selectSprite.x = 2;
		}
	}

	if (currentMap == "planet") {
		if (selectedTile != null) {
			if (currentOption == selectModes[selectMode].length - 1) {
				currentOption = 0;
			} else {
				currentOption++;
			}

			renderSelectOption();
		} else {
			if (selectSprite.x < 7) {
				selectSprite.x += 1;
			} else {
				selectSprite.x = 0;
			}
		}
	}

	if (currentMap == "wood" || currentMap == "stone") {
		const rocketSprite = getFirst(rocket);

		if (rocketSprite.x < 6) {
			rocketSprite.x += 1;
		} else {
			rocketSprite.x = 0;
		}
	}

	if (currentMap == "how") {
		if (howPage == howPages - 1) {
			howPage = 0;
		} else {
			howPage++;
		}
		displayHow();
	}
});

onInput("i", () => {
	if (currentMap == "start") {
		const playSelected = tilesWith(select, play).length > 0;
		const howSelected = tilesWith(select, how).length > 0;

		if (howSelected) {
			newMap = "how";
		}

		if (playSelected) {
			newMap = "animation";
		}

		playTune(doneTune);
	}

	if (currentMap == "planet") {
		const getWoodSelected = tilesWith(getWood, select).length > 0;
		const getStoneSelected = tilesWith(getStone, select).length > 0;

		if (getWoodSelected || getStoneSelected) {
			exportedMap = exportMap();
			playTune(doneTune);
			newMap = getWoodSelected ? "wood" : "stone";
		}

		if (selectedTile != null) {
			const options = selectModes[selectMode];
			const option = options[currentOption];
			60;
			switch (selectMode) {
				case "main":
					switch (option) {
						case select:
							exitMenu();
							return;
						case add:
							newSelectMode = "add";
							currentOption = 1;
							break;
						case upgrade:
							if (!prevSelectedTile) return;
							const upgarde = upgrades[prevSelectedTile.type];
							if (!upgarde) {
								playTune(removeTune);
								return;
							}
							const cost = costs[upgarde];
							const newWood = totalWood - cost[0];
							const newStone = totalStone - cost[1];
							if (newWood < 0 || newStone < 0) {
								playTune(errTune);
								return;
							}

							totalWood = newWood;
							totalStone = newStone;
							displayPlanet();

							clearTile(selectedTile.x, selectedTile.y);
							capacity -= capacities[prevSelectedTile.type];
							capacity += capacities[upgarde];
							prevSelectedTile = null;
							addSprite(selectedTile.x, selectedTile.y, upgarde);
							exitMenu();
							playTune(buildTune);
							return;
						case remove:
							clearTile(selectedTile.x, selectedTile.y);
							if (prevSelectedTile) {
								capacity -= capacities[prevSelectedTile.type];
								prevSelectedTile = null;
							}
							exitMenu();
							playTune(removeTune);
							return;
					}
					break;
				case "add":
					if (option == cancel) {
						clearTile(selectedTile.x, selectedTile.y);
						exitMenu();
						return;
					} else {
						const cost = costs[option];
						const newWood = totalWood - cost[0];
						const newStone = totalStone - cost[1];
						if (newWood < 0 || newStone < 0) {
							playTune(errTune);
							return;
						}

						if (prevSelectedTile) {
							playTune(errTune);
							return;
						}

						totalWood = newWood;
						totalStone = newStone;
						displayPlanet();

						addSprite(selectedTile.x, selectedTile.y, option);
						capacity += capacities[option];
						exitMenu();
						playTune(buildTune);
						return;
					}
					break;
			}
		} else {
			let tile = null;
			for (const sprite of tilesWith(select)[0]) {
				if (sprite.type != select) {
					tile = sprite;
					break;
				}
			}
			prevSelectedTile = tile;
		}

		renderSelectOption();
	}
});

onInput("j", () => {
	if (currentMap == "how") {
		if (wasInGame) {
			newMap = "planet";
		} else {
			newMap = "start";
		}
	}

	if (currentMap == "wood" || currentMap == "stone") {
		newMap = "planet";

		totalWood += woodScore;
		woodScore = 0;

		totalStone += stoneScore;
		stoneScore = 0;

		playTune(buildTune);
	}
});

onInput("k", () => {
	if (currentMap == "animation") {
		newMap = "planet";
		playTune(buildTune);
	} else {
		newMap = "how";
		if (currentMap == "planet") {
			exportedMap = exportMap();
		}
	}
});

function checkHappiness() {
	if (currentMap == "planet") {
		const percent = population / capacity;
		const hasSelect = !!getTile(0, 6).find((s) => s.type == select);
		clearTile(0, 6);
		addSprite(0, 6, ground);
		if (hasSelect) addSprite(0, 6, select);

		if (percent < 0.5) {
			addSprite(0, 6, dinobbq);
		} else if (percent < 0.8) {
			addSprite(0, 6, happy);
		} else if (percent < 1) {
			addSprite(0, 6, meh);
		} else if (percent < 1.2) {
			addSprite(0, 6, sad);
		} else if (percent < 2) {
			addSprite(0, 6, threat);
		} else {
			newMap = "gameover";
			refreshMap();
		}
	}
}

function exitMenu() {
	if (prevSelectedTile) {
		addSprite(
			prevSelectedTile.x,
			prevSelectedTile.y,
			prevSelectedTile.type
		);
	}

	if (tilesWith(select).length == 0) {
		addSprite(selectedTile.x, selectedTile.y, select);
	}

	selectedTile = null;
	selectMode = "main";
	currentOption = 0;
}

function renderSelectOption() {
	let tileSelected;
	for (let option of selectModes[selectMode]) {
		if (tileSelected) break;
		const optionSelected = tilesWith(option);
		if (optionSelected.length > 0) tileSelected = optionSelected[0];
	}

	// Above ground
	if (tileSelected[0].y < 6) {
		if (selectedTile == null) {
			selectedTile = { x: tileSelected[0].x, y: tileSelected[0].y };
			currentOption = 1;
		}

		clearTile(selectedTile.x, selectedTile.y);

		if (newSelectMode) {
			selectMode = newSelectMode;
			newSelectMode = null;
		}

		addSprite(
			selectedTile.x,
			selectedTile.y,
			selectModes[selectMode][currentOption]
		);
	}
}

function refreshMap() {
	if (newMap != null) {
		currentMap = newMap;
		newMap = null;
		setMap(maps[currentMap]);
		clearText();
	} else {
		return;
	}

	if (currentMap == "how") displayHow();
	if (currentMap == "start") displayStart();
	if (currentMap == "animation") displayAnimation();
	if (currentMap == "planet") displayPlanet();
	if (currentMap == "wood") displayWood();
	if (currentMap == "stone") displayStone();
	if (currentMap == "gameover") displayGameover();

	// Load sprites back from map
	if (currentMap == "planet" && exportedMap) {
		for (let x = 0; x < exportedMap.length; x++) {
			const row = exportedMap[x];
			for (let y = 0; y < row.length; y++) {
				const col = row[y];
				clearTile(x, y);
				for (let sprite of col) {
					addSprite(x, y, sprite.type);
				}
			}
		}
		exportedMap = null;
	}
}

afterInput(() => {
	checkWood();
	checkStone();
	refreshMap();
});

function checkWood() {
	if (currentMap == "wood") {
		const woodRocket = tilesWith(wood, rocket).length > 0;

		if (woodRocket) {
			woodScore++;
			playTune(doneTune);

			const rocketSprite = getFirst(rocket);
			const x = rocketSprite.x;
			const y = rocketSprite.y;
			clearTile(x, y);
			addSprite(x, y, rocket);
		}

		clearText();
		addText(`Wood: ${woodScore}`, {
			x: 0,
			y: 0,
			color: color`2`,
		});
	}
}

function checkStone() {
	if (currentMap == "stone") {
		const stoneRocket = tilesWith(stone, rocket).length > 0;

		if (stoneRocket) {
			stoneScore++;
			playTune(doneTune);

			const rocketSprite = getFirst(rocket);
			const x = rocketSprite.x;
			const y = rocketSprite.y;
			clearTile(x, y);
			addSprite(x, y, rocket);
		}

		clearText();
		addText(`Stone: ${stoneScore}`, {
			x: 0,
			y: 0,
			color: color`2`,
		});
	}
}

function displayStart() {
	addText("Galactic", {
		x: 6,
		y: 4,
		color: color`3`,
	});
}

function displayHow() {
	setBackground(black);
	clearText();
	for (let x = 0; x < width(); x++) {
		for (let y = 0; y < height(); y++) {
			clearTile(x, y);
		}
	}
	if (howPage == 0) {
		addText("How To Play", {
			x: 4,
			y: 2,
			color: color`5`,
		});

		addText("Keep your population", {
			x: 0,
			y: 4,
			color: color`2`,
		});

		addText("alive for as long as", {
			x: 0,
			y: 5,
			color: color`2`,
		});

		addText("you can. Don't let", {
			x: 0,
			y: 6,
			color: color`2`,
		});

		addText("them run out of", {
			x: 0,
			y: 7,
			color: color`2`,
		});

		addText("space. Use stone and", {
			x: 0,
			y: 8,
			color: color`2`,
		});

		addText("wood to build your", {
			x: 0,
			y: 9,
			color: color`2`,
		});

		addText("city.", {
			x: 0,
			y: 10,
			color: color`2`,
		});

		addText("Costs on next page.", {
			x: 0,
			y: 12,
			color: color`2`,
		});

		addText("L to return to how", {
			x: 0,
			y: 13,
			color: color`2`,
		});
	} else {
		const costEntries = Object.entries(costs);
		const start = howPage * 5;
		addText("Costs", {
			x: 7,
			y: 2,
			color: color`5`,
		});
		for (let i = 0; i < 5; i++) {
			const entry = costEntries[(howPage - 1) * 5 + i];
			if (!entry) break;
			addSprite(1, i + 2, entry[0]);
			addText(`${entry[1][0]}`, {
				x: 6,
				y: Math.round((i + 2) * 2.5),
				color: color`C`,
			});
			addText(`/`, {
				x: 9,
				y: Math.round((i + 2) * 2.5),
				color: color`2`,
			});
			addText(`${entry[1][1]}`, {
				x: 11,
				y: Math.round((i + 2) * 2.5),
				color: color`L`,
			});
		}
	}
}

async function displayAnimation() {
	addText("A long time ago", {
		x: 3,
		y: 4,
		color: color`2`,
	});

	await wait(1500);
	if (currentMap != "animation") return;

	addText("There was a dino", {
		x: 2,
		y: 7,
		color: color`2`,
	});

	await wait(1500);
	if (currentMap != "animation") return;

	addText("Named Orpheus", {
		x: 4,
		y: 10,
		color: color`2`,
	});

	await wait(1500);
	if (currentMap != "animation") return;

	clearText();
	addText("Orpheus blew up", {
		x: 3,
		y: 5,
		color: color`2`,
	});
	addText("the whole Earth", {
		x: 2,
		y: 8,
		color: color`2`,
	});

	await wait(3000);
	if (currentMap != "animation") return;

	clearText();
	addText("So she set out", {
		x: 3,
		y: 5,
		color: color`2`,
	});
	addText("To start over", {
		x: 3,
		y: 8,
		color: color`2`,
	});

	await wait(3000);
	if (currentMap != "animation") return;
	clearText();

	newMap = "planet";
	refreshMap();
	playTune(buildTune);
}

let populationInterval;

function displayPlanet() {
	wasInGame = true;
	setBackground(sky);

	addText(totalWood.toString(), {
		x: 6,
		y: 14,
	});

	addText(totalStone.toString(), {
		x: 13,
		y: 14,
	});

	if (populationInterval) {
		clearInterval(populationInterval);
	}

	populationInterval = setInterval(() => {
		if (
			currentMap != "planet" &&
			currentMap != "wood" &&
			currentMap != "stone"
		) {
			clearInterval(populationInterval);
			return;
		}

		if (Math.random() < 0.05) {
			population = Math.floor(population * 1.3);
		}

		checkHappiness();
	}, 2000);

	checkHappiness();
}

let woodInterval;

function displayWood() {
	setBackground(black);

	woodInterval = setInterval(() => {
		if (currentMap != "wood") {
			clearInterval(woodInterval);
			return;
		}

		const woodTiles = tilesWith(wood);

		for (let woodTile of woodTiles) {
			for (let woodSprite of woodTile) {
				if (woodSprite.type != wood) continue;

				if (woodSprite.y < 6) {
					let diff = 1;
					if (Math.random() < 0.3) {
						diff = 2;
					}
					woodSprite.y += diff;
				} else {
					woodScore--;
					clearTile(woodSprite.x, woodSprite.y);
					playTune(removeTune);
				}
			}
		}

		checkWood();

		if (Math.random() < 0.5) {
			const randomX = Math.round(Math.random() * 6);
			// 1 - 3
			const y = Math.round(Math.random()) + Math.round(Math.random()) + 1;
			addSprite(randomX, y, wood);
		}
	}, 600);

	checkWood();
}

let stoneInterval;

function displayStone() {
	setBackground(black);

	stoneInterval = setInterval(() => {
		if (currentMap != "stone") {
			clearInterval(stoneInterval);
			return;
		}

		const stoneTiles = tilesWith(stone);

		for (let stoneTile of stoneTiles) {
			for (let stoneSprite of stoneTile) {
				if (stoneSprite.type != stone) continue;

				if (stoneSprite.y < 6) {
					let diff = 1;
					if (Math.random() < 0.3) {
						diff = 2;
					}
					stoneSprite.y += diff;
				} else {
					stoneScore--;
					clearTile(stoneSprite.x, stoneSprite.y);
					playTune(removeTune);
				}
			}
		}

		checkStone();

		if (Math.random() < 0.5) {
			const randomX = Math.round(Math.random() * 6);
			// 1 - 3
			const y = Math.round(Math.random()) + Math.round(Math.random()) + 1;
			addSprite(randomX, y, stone);
		}
	}, 700);

	checkStone();
}

function displayGameover() {
	setBackground(black);
	playTune(deathTune);
}

function exportMap() {
	let mapArr = [];
	for (let x = 0; x < width(); x++) {
		mapArr.push([]);
		for (let y = 0; y < height(); y++) {
			mapArr[mapArr.length - 1].push(getTile(x, y));
		}
	}
	return mapArr;
}

playTune(buildTune);
