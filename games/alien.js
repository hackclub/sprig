/*
@title: alien
@author: anshimathur0325
@tags: ['endless']
@addedOn: 2022-09-06
Move the player with "a" and "d" for left and right
Move the lazer up with "w"

The game ends if the lazer hits an asteroid. 

If the lazer reaches the top without hitting an alien you lose one point.
You gain a point when you hit an alien. 

*/
//adds music if alien is hit and background music.
const melody = tune `
500,
500: b5-500,
15000`

const background = tune `
500,
500: c5-500,
500: d5-500,
500: e5-500,
500: f5-500,
500: g5-500,
500: g5-500,
500: g5-500,
500: g5-500,
500: g5-500,
500,
500: a5-500,
500,
500: g5-500,
500: f5-500,
500: e5-500,
500: d5-500,
500: c5-500,
500: c5-500,
500: c5-500,
500: c5-500,
500: c5-500,
500: f5-500,
500: e5-500,
500: d5-500,
500: c5-500,
500,
500: e4-500,
500: c5-500,
500: e4-500,
500: c5-500,
500: e4-500`

const playback = playTune(background, Infinity);
const player="p";
const alien="w";
const lazer="c";
const asteroid="a";
const black = "b";
let score = 0;
setLegend(
  [ player, bitmap`
.......11.......
......1111......
.....111111.....
.....111111.....
.....111111.....
.11111111111111.
....57777775....
....57070775.2..
..2.577777752...
...257000775....
....57777775....
....57777775....
.....555555.....
.......2.2......
.......2.2......
.......2.2......`],
  [ alien, bitmap`
................
................
................
...4.......4....
....4.....4.....
.....44444......
.....40404......
.....40404......
.....44444......
...111111111....
..11111111111...
..11817161311...
................
................
................
................`],
  [ lazer, bitmap`
................
................
................
.....66666......
.....66666......
.....66666......
.....66666......
.....66666......
.....66666......
.....66666......
.....66666......
.....66666......
................
................
................
................`],
  [ asteroid,  bitmap`
................
................
......1111......
......1LL11.....
.....11LLL1.....
....111LLL11....
....111LLLL1....
...11L111LL1....
....1LL11111....
....1LL1111.....
...11111111.....
..111111........
...1111.........
................
................
................`],
  [ black, bitmap`
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
0000000000000000`]
);
setBackground(black);

//lazer movement
onInput("w", () => {
  const l = getFirst(lazer);
  if (!l) return;
  for (let i = 0; i < 1; i++) {
    l.y -=1;
    
  }
//player movement with lazer
});
onInput("d", () => {
  const p = getFirst(player);
  if (!p) return;
  p.x += 1;
});

onInput("a", () => {
  const p = getFirst(player);
  if (!p) return;
  p.x -= 1;
});
onInput("d", () => {
  const l = getFirst(lazer);
  if (!l) return;
  l.x += 1;
});

onInput("a", () => {
  const l = getFirst(lazer);
  if (!l) return;
  l.x -= 1;
});
addText("Time left: ", { y: 0 , color: color`3` });

//countdown timer
var timeleft = 15;
    var downloadTimer = setInterval(function(){
    timeleft--;
    clearText();
    addText(""+timeleft, { y: 1 , color: color`3` });
      if(timeleft <= 0){
        const l = getFirst(lazer);
        if (!l) return;

        clearTile(l.x, l.y);
        clearInterval(downloadTimer);
        clearText()

        addText("Final Score: "+score, {y:4, color: color`3`});

    }
    },1000);

//map location
setMap( map`
..a.......
..........
.....a....
..w.......
..........
.....a....
a.........
..........
c.........
p.........`);


afterInput(() => {
  // count the number of tiles with lazer
  const targetNumber = tilesWith(lazer).length;
  
  // count the number of tiles with lazers and aliens
  const numberCovered = tilesWith(lazer, alien).length;

  //resets the lazer if it misses the alien
  //and removes a point from the lazer. 

  const l = getFirst(lazer);
  if (!l) return;
  
  if (l.y==0){
    const p = getFirst(player);
    const a = getFirst(alien);

    if (!p || !a) return;

    clearTile(l.x,l.y);
    addSprite(p.x, 8, lazer);
    clearTile(a.x,a.y);
    addSprite(Math.floor(Math.random() * 6)+3, Math.floor(Math.random() * 2)+1, alien);

    score--;
  }
  //Ends the game if the asteroid is hit
  const asteroidHit = tilesWith(asteroid, lazer).length;
  const numAsteroid = tilesWith(lazer).length;
  if (asteroidHit === numAsteroid) {
    clearTile(getFirst(lazer).x,getFirst(lazer).y);
        clearInterval(downloadTimer);
        clearText()
        addText("You Lost", {y:4, color: color`3` });
        if (playback) playback.end();
  }
  //removes the hit alien and lazer, puts another alien and asteroid in a random spot 
  //and restores the lazer to the player. 
  //Also adds a point to the score. 
  if (numberCovered === targetNumber) {

    playTune(melody)

    const l = getFirst(lazer);
    const a = getFirst(alien);
    const ast = getFirst(asteroid);

    if (!l || !a || !ast) return;
    
    clearTile(l.x, a.y);
    clearTile(ast.x, ast.y);
    clearTile(ast.x, ast.y);
    clearTile(ast.x, ast.y);

    const p = getFirst(player);
    if (!p) return;

    addSprite(p.x, 8, lazer);
    
    addSprite(Math.floor(Math.random() * 6)+3, Math.floor(Math.random() * 2)+1, alien);
    
    addSprite(Math.floor(Math.random() * 6)+3, Math.floor(Math.random() * 5)+3, asteroid);
    addSprite(Math.floor(Math.random() * 6)+3, Math.floor(Math.random() * 5)+3, asteroid);
    addSprite(Math.floor(Math.random() * 6)+3, Math.floor(Math.random() * 5)+3, asteroid);
    addSprite(Math.floor(Math.random() * 6)+3, Math.floor(Math.random() * 5)+3, asteroid);

    score++;
    //Displays the score. 

    addText("score: "+score, { y: 4 , color: color`3`} );

  }
});







