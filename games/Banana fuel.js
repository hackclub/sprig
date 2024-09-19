/*
@title: Banana fuel
@author: Neon
@tags: []
@addedOn: 2024-09-12
*/

/*
Banana fuel:
controls: use `w,a,s,d,j`
wasd to move
the game objective is to collect bananas.
to progress to the next level get all bananas/jewels on level OR use a door.
there is an easter egg on the big levels. 
Easter egg: secret room with full non claimable bananas.
(no point benefits )
*/
// since console.debug, console.error dont work convert them to log
console.error = (str) => console.log(`err: ${str}`);
console.debug = (str) => console.log(`debug: ${str}`);
const player = "p";
const player1 = "1";
const player2 = "2";
const player3 = "3";
const fruit = "f";
const jewel = "j";
// to get the fruit from the block you must have x fruit & break the block
const fruitblock = "b";
const door = "d";
const requiredBananasToWinLevel = 5;

let score = 0;

let playerStatus = 0;
let isDone = false;
let jewel_attached_to_player = false,
  jewel_first_round = true;
let left_stare = 0;
let old = {
  p: { x: null, y: null, level: 1 },
};
// easter egg
let easter_egg_banner = false;
let easter_egg_loaded = false;
let disable_easter_egg = false;
setLegend(
  [
    player,
    bitmap`
................
................
.......000......
.......0.0......
......0..0......
......0...0.3...
....000H.H0.0...
....0.0...000...
....3.05550.....
......0...0.....
.....0....0.....
.....0...0......
......000.......
......0.0.......
.....00.00......
................`,
  ],
  [
    player1,
    bitmap`
................
................
.......000......
.......0.0......
......0..0......
......0...0.3...
....000H.H0.0...
....0.0...000...
....3.05550.....
......0...0.....
.....066660.....
.....06660......
......000.......
......0.0.......
.....00.00......
................`,
  ],
  [
    player2,
    bitmap`
................
................
.......000......
.......0.0......
......0..0......
......0...0.6...
....000H.H0.0...
....0.0...000...
....6.06660.....
......06660.....
.....066660.....
.....06660......
......000.......
......0.0.......
.....00.00......
................`,
  ],
  [
    player3,
    bitmap`
................
................
.......000......
.......060......
......0660......
......06660.6...
....0003630.0...
....0.0666000...
....6.06660.....
......06660.....
.....066660.....
.....06660......
......000.......
......0.0.......
.....00.00......
................`,
  ],
  [
    fruit,
    bitmap`
................
................
.......CCC......
.......C6C......
......C66C......
......C666C.....
......C666C.....
......C666C.....
......C666C.....
......C666C.....
.....C6666C.....
.....C666C......
......CCC.......
................
................
................`,
  ],
  [
    fruitblock,
    bitmap`
0000000000000000
0..............0
0......CCC.....0
0......CFC.....0
0.....CFFC.....0
0.....CFFFC....0
0.....CFFFC....0
0.....CFFFC....0
0.....CFFFC....0
0.....CFFFC....0
0....CFFFFC....0
0....CFFFC.....0
0.....CCC......0
0..............0
0..............0
0000000000000000`,
  ],
  [
    door,
    bitmap`
0000000000000000
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCC0000
0CCCCCCCCCCC0000
0CCCCCCCCCCC0000
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0000000000000000`,
  ],
  [
    jewel,
    bitmap`
0000000000000000
0.2.2.2.2.2.2.20
02.2.2.2.2.2.2.0
0.2.2.2.2.2.2.20
02.2.2.2.2.2.2.0
0.2.2.2.2.2.2.20
02.2.2.2.2.2.2.0
0.2.2.2.2.2.2.20
02.2.2.2.2.2.2.0
0.2.2.2.2.2.2.20
02.2.2.2.2.2.2.0
0.2.2.2.2.2.2.20
02.2.2.2.2.2.2.0
0.2.2.2.2.2.2.20
02.2.2.2.2.2.2.0
0000000000000000`,
  ],
);
setSolids([player, player1, player2, player3, fruitblock]);

let level = 1;
const levels = [
  // you lose map
  map`
...
...
...`,
  map`
.ff
p.f
...`,
  map`
..p
...
f..`,
  map`
..p
...
${Math.random() > 0.5 ? "f" : "."}.f`,
  map`
b.p
${Math.random() > 0.3 ? "f" : "j"}b.
b.f`,
  map`
p..bf
f...b
...b.
..b.d
.b..${Math.random() > 0.5 ? "f" : "."}`,
  // begin special easter egg levels - 3 levels
  // keep left side free of blocks
  map`
d..bf
f...b
...b.
..b.p
.b..f`,
  map`
p..bf
b...b
.b..d
b.${Math.random() > 0.5 ? "." : "f"}..
.b..f`,
  map`
${Math.random() > 0.5 ? "j" : "f"}b.bd
b...f
.b..p
.b...
.b..f`,
  //end
  map`
...
...
...`, // you win map
];
setMap(levels[level]);
setPushables({
  [player]: [],
});

function getPlayerInstance() {
  switch (playerStatus) {
    case 0:
      return player;
      break;
    case 1:
      return player1;
      break;
    case 2:
      return player2;
      break;
    case 3:
      return player3;
      break;
    default:
      return player3; // if at the max then just show full charge
      break;
  }
}

function handleInputs() {
  onInput("w", () => {
    if (isDone) return;
    left_stare = 0;
    //     if(easter_egg_loaded) {
    //       if(current_score_for_math == correct_ans) {
    //  // wow you got it correct :D
    //   score *= 2
    //      easter_egg_loaded = false;
    //   disable_easter_egg = true;
    //   clearText()
    //       clearUpBoxes()
    //   // levelUp()
    // } else {
    //   // you lose
    //   isDone = true;
    //   setMap(levels[0])
    //         updateLevelText()
    // return;
    //       }

    //     }
    getFirst(getPlayerInstance()).y -= 1;
  });
  onInput("d", () => {
    if (isDone) return;
    left_stare = 0;
    // if(easter_egg_loaded) {
    //   current_score_for_math++;
    // }
    getFirst(getPlayerInstance()).x += 1;
  });
  onInput("a", () => {
    if (isDone) return;
    const pl = getFirst(getPlayerInstance());
    // if(easter_egg_loaded) {
    //   current_score_for_math--;
    // }
    if (pl.x == 0) {
      left_stare++;
    }
    getFirst(getPlayerInstance()).x -= 1;
  });
  onInput("s", () => {
    if (isDone) return;
    left_stare = 0;
    getFirst(getPlayerInstance()).y += 1;
  });
}

function playEatTune() {
  playTune(tune`
500: B4/500,
15500`);
}

function playLevelUpTune() {
  playTune(tune`D`);
}

function clearUpBoxes() {
  getAll(fruitblock).forEach((e) => {
    clearTile(e.x, e.y);
  });
}
afterInput(() => {
  if (isDone) return;
  if (old.p.level !== level) resetCords();

  const pl = getFirst(getPlayerInstance());
  if (getAll(door).find((f) => f.x == pl.x && f.y == pl.y)) {
    if (easter_egg_loaded) {
      disable_easter_egg = true;
      easter_egg_loaded = false;
    }
    levelUp();
    return;
  }
  const hitFruit = getAll(fruit).find((f) => f._x == pl.x && f._y == pl.y);
  const hitsJewel = getAll(jewel).find((f) => f._x == pl.x && f._y == pl.y);
  if (playerStatus > 0) {
    clearUpBoxes();
  }
  let jewel_just_added = false;
  if (jewel_attached_to_player) {
    clearTile(pl.x, pl.y);
    if (old.p.x !== null && old.p.y !== null) {
      // console.log(`clearing ${old.p.x},${old.p.y} - ${old.p.level} = ${pl.x},${pl.y} - ${level}`)
      clearTile(old.p.x, old.p.y);
    }
    addSprite(pl.x, pl.y, jewel);
    addSprite(pl.x, pl.y, getPlayerInstance());
    jewel_just_added = true;
  }
  if (hitFruit || (hitsJewel && !jewel_attached_to_player)) {
    // console.log('#eat')
    playEatTune();
    clearTile(pl.x, pl.y);
    if (hitFruit) {
      playerStatus++;
      score++;
      clearUpBoxes();
    }

    if (hitsJewel && !jewel_attached_to_player && !jewel_just_added) {
      addSprite(pl.x, pl.y, jewel);
      jewel_attached_to_player = true;
      jewel_first_round = true;
    }
    addSprite(pl.x, pl.y, getPlayerInstance());
  }

  old.p.x = pl.x;
  old.p.y = pl.y;
  if (level >= 6 && level <= 8 && !disable_easter_egg) {
    // if(disable_easter_egg) return;
    // add easter egg thing if its not already displayed.
    if (!easter_egg_banner) {
      addText("sprig", {
        x: 3,
        y: 1,
        color: disable_easter_egg ? color`D` : color`3`,
      });
      easter_egg_banner = true;
    }
    // stop looking at the source to beat the easter egg tsk tsk
    if (pl.x == 0 && pl.y == 2 && left_stare >= 4) {
      //start the game :D
      playerStatus = 0;

      setMap(map`
d....33
......3
.......
.......
.......
3......
33....p`);
      // addEasterEggText()
      easter_egg_loaded = true;

      return;
    }
  }
  if (
    (getAll(fruit).length == 0 &&
      (jewel_attached_to_player ? true : getAll(jewel).length == 0)) ||
    (getAll(door).length == 0
      ? false
      : getAll(door).find((f) => f._x == pl.x && f._y == pl.y))
  ) {
    if (!easter_egg_loaded) {
      console.debug(1);
      levelUp();
    }
  }
});

function resetCords() {
  old.p = { x: null, y: null, level: level };
}

function levelUp() {
  console.debug(`#levelup`);
  level++;
  //clear old cords on new map since it will clear last spot u were standing on old map
  resetCords();
  playerStatus = 0;
  easter_egg_banner = false;
  clearText();
  playLevelUpTune();
  if (jewel_first_round && jewel_attached_to_player) {
    jewel_first_round = false;
  } else if (jewel_attached_to_player) {
    jewel_attached_to_player = false;
    score *= 1.5;
    score = Math.round(score);
  }
  if (levels[level]) {
    try {
      setMap(levels[level]);
    } catch (e) {
      // broken level - u lose
      level = 0;
      setMap(levels[level]);
    }
  }
  updateLevelText();
}

function updateLevelText() {
  if (level == levels.length - 1) {
    addText("You win ", { x: 7, y: 7, color: color`4` });
    addText("Score - " + score, { x: 6, y: 8, color: color`D` });
    isDone = true;
  } else if (level == 0) {
    addText("You LOSE ", { x: 7, y: 5, color: color`3` });
  }
}
handleInputs();
