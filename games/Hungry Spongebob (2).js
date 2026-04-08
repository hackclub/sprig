/*

@title: Hungry Spongebob
@author: abuxisp
@tags: [#KrabbyPatty, #catch, #onePlayer]
@addedOn: 2025-02-21
*/

const player = "p";
const spike = "s";
const krabbyPatty = "k";
const rainbowKrabbyPatty = "r";
const background = "b";

setLegend(
[player, bitmap`
..666666666666..
..606666666606..
..662226622266..
..662426624266..
..662226622266..
6266666666666626
6266688228866626
6.666688886666.6
6.222233332222.6
..CCCCC33CCCCC..
..CCCCCCCCCCCC..
...CCC....CCC...
....6......6....
....2......2....
...00......00...
LLLLLLLLLLLLLLLL`],
[spike, bitmap`
................
......22........
.......L....2...
.......LL.LL2...
..22..LLLLL.....
...L.LL111LL....
...LLL11111LL..2
....L111C111LLL2
...LL11C9C11LL..
.2LLL111C111L...
.2..LL11111LLL..
.....LL111LL.L..
......LLLLL..22.
....2LL.LL......
....2....L......
.........22.....`],
[background, bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555`],
[krabbyPatty, bitmap`
................
................
....99999999....
...9999999999...
..999999999999..
..999999999999..
..444444444444..
.44444444444444.
.44333333333344.
.633333C33C3366.
.66CCCCCCCCCCC6.
..CCCCCCCCCCCC..
..999999999999..
..999999999999..
...9999999999...
................`],
[rainbowKrabbyPatty, bitmap`
................
................
....39966447....
...3399664477...
..333996644778..
..333996647788..
..333996447788..
.3339996447788H.
.3339966447788H.
.333996644778HH.
.333996644778HH.
..39996647788H..
..39966447788H..
..3996644788HH..
...996447788H...
................`]
);

setSolids([player, spike]);
setBackground(background);

//this is setting up the level
let level = 0;
const levels = [
map`
...........
...........
...........
...........
...........
...........
...........
.....p.....
sssssssssss`
];
setMap(levels[level]);
setPushables({ [player]: [] });

//game states
let gameOver = false;
let score = 0;
let timer = 60;


//this handles game over
function gameOverFunction() {
gameOver = true;
addText("Game Over\npress j to restart", { x: 1, y: 7, color: color`3` });
addText("Score: " + score.toString(), { x: 1, y: 9, color: color`4` });
}


//the player controls
onInput("d", () => {
if (!gameOver) {
const playerSprite = getFirst(player);
if (playerSprite.x < width() - 1) playerSprite.x += 1;
}
});

onInput("a", () => {
if (!gameOver) {
const playerSprite = getFirst(player);
if (playerSprite.x > 0) playerSprite.x -= 1;
}
});

onInput("j", () => {
gameOver = false;
score = 0;
timer = 60;
clearText();
setMap(levels[level]);
getAll(krabbyPatty).forEach(p => p.remove());
getAll(rainbowKrabbyPatty).forEach(p => p.remove());
});

//timer
setInterval(() => {
if (gameOver) return;
if (timer > 0) timer -= 1;
else gameOverFunction();
}, 1000);


//falling krabby patties
setInterval(() => {
if (gameOver) return;

const playerSprite = getFirst(player);
const spikeSprite = getFirst(spike);

  //spawns krabby patties at 0.13 in random places
if (Math.random() < 0.2) addSprite(Math.floor(Math.random() * width()), 0, krabbyPatty);

getAll(krabbyPatty).forEach(patty => {
patty.y += 1;

  //collision with the player
if (patty.y === playerSprite.y && patty.x === playerSprite.x) {
score += 1;
patty.remove();
}

  //collision with the spike
if (patty.y === spikeSprite.y) {
if (score > 0) score -= 1;
else gameOverFunction();
patty.remove();
}
});


  //spawns rainbow krabby patties randomly
if (Math.random() < 0.04 && getAll(rainbowKrabbyPatty).length === 0)
addSprite(Math.floor(Math.random() * width()), 0, rainbowKrabbyPatty);

  //collision with the player
getAll(rainbowKrabbyPatty).forEach(rp => {
rp.y += 1;
if (rp.y === playerSprite.y && rp.x === playerSprite.x) {
score += 3;
timer += 5;
rp.remove();
}

  //collision with the spike
if (rp.y === spikeSprite.y) {
rp.remove();
}
});

  //updates the HUD (screen and text)
addText("Score: " + score.toString().padStart(2, '0'), { x: 0, y: 0, color: color`6` });
addText("Time: " + timer.toString().padStart(2, '0'), { x: 0, y: 1, color: color`6` });
}, 250);



