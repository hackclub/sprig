/*
@title: Parmemour
@description: A fun little platformer with nothing to hide...
@author: xeo
@tags: ['platformer']
@addedOn: 2026-11-18
*/

//Tiles
const player = "p"
const horizontalWall = "h"
const verticalWall = "v"
const floor = "f"
const end = "e"
const spike = "s"


//Setup time keeper
let timeString = "0"
let time = 0
let internalLoopCounter = 0
timeKeeper()

//Fixs loop performance stopper
let isLooping = true

//Gravity!!
let ceiling = false;
let velocity = 0.0;
const gravityAmount = 0.6
let onGround = false;

//Stops input spamming
let inputDelay = false;
//The time to delay inputs for (in millis) - This line is just for declaration, values are updated in line relative to whether the player is in the air
let delayDuration = 35;
let justDied = false;

//Lives
let lives = 3;


//Music
const melody = tune`
200: D5^200,
200,
200: B4^200,
200: B4^200,
200,
200: D5^200,
200: G4^200,
600,
200: F4/200 + B4^200 + D5~200,
200,
200: D4/200 + G4^200 + B4~200,
200: D4/200 + G4^200 + B4~200,
200,
200: F4/200 + B4^200 + D5~200,
200: C4/200 + E4^200,
200,
200: D5/200,
200,
200: A4/200,
200: D5/200,
200: A4/200,
200: D5/200 + A4~200,
200: A4/200,
200: D5/200 + A4~200,
200: A4/200,
200: D5/200 + A4~200,
200: A4/200,
200: B4~200,
200: C5~200,
200: D5~200`;
let playback = playTune(melody, Infinity)
const completeSong = tune`
85.95988538681948: E5~85.95988538681948,
85.95988538681948: D5~85.95988538681948,
85.95988538681948: F5~85.95988538681948,
85.95988538681948,
85.95988538681948: G5~85.95988538681948 + F5^85.95988538681948,
85.95988538681948: G5^85.95988538681948 + A5~85.95988538681948 + B5-85.95988538681948,
2234.9570200573066`;
const deathSong = tune`
100: C5/100,
100: B4/100,
100,
100: G4^100,
100,
100: F4^100,
200,
100: C4-100,
100: C4-100,
100: C4-100,
2100`;
const gameOverSong = tune`
227.27272727272728: A4-227.27272727272728,
227.27272727272728: G4-227.27272727272728,
227.27272727272728,
227.27272727272728: F4-227.27272727272728,
227.27272727272728: E4-227.27272727272728,
227.27272727272728,
227.27272727272728: D4-227.27272727272728,
227.27272727272728: C4-227.27272727272728,
227.27272727272728,
227.27272727272728: C4/227.27272727272728,
227.27272727272728: C4/227.27272727272728,
227.27272727272728: C4/227.27272727272728,
227.27272727272728: C4-227.27272727272728,
4318.181818181818`;
//Stops the main track from being played multiple times concurrently
let awaitingRestart = false;
//Game State
let endGame = false;



async function restartBackgroundMusic(x)
{
  if(awaitingRestart) return;
  awaitingRestart = true;
  //Delay is ued for allowing the song before to finish
  await sleep(x)
  playback = playTune(melody, Infinity)
  awaitingRestart = false;
}

setLegend(
  [ player, bitmap`
................
......0...0.....
......0...0.....
......00000.....
.....0000000....
.....0200200....
.....0200200....
.....0000000....
.00...00000.....
..00...000......
...00.00000.....
....00000000....
....000000000...
....000000000...
....000000000...
...00000000000..` ],
  [horizontalWall, bitmap`
0000000000000000
0000000000000000
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
................`],
  [verticalWall, bitmap`
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......`],
  [floor, bitmap`
0000000000000000
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
................`],
  [end, bitmap`
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
4444444444444444`],
  [spike, bitmap`
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
0...0...0...0...
10.010.010.010.0
1101110111011101
1111111111111111`]
  
)

setSolids([player, horizontalWall, verticalWall])

let level = 0
const levels = [
  map`
...............e
...............e
...............e
...............e
...............e
........s...ffv.
......fffff...v.
p..hh.........v.`,
  map`
...............e
...............e
............s..e
............fff.
........fff.....
.....s..........
....fff.........
phh...sssssssss.`,
    map`
...............e
...............e
...............e
..............se
.............ffe
.........s.....e
p...ff..fff....e
fsfsssssssssssse`,
  map`
...............e
.s.....s....ss.e
ff....hhh..f.v.e
...v.........v.e
....ffs......v.e
.........ff..v.e
.............v.e
p...sshhsssssv.e`,
  map`
...............e
...............e
...............e
.....s..f..s...e
.....f.........e
..sff.f......f.e
p..............e
ff.sssssssssssse`,
  map`
p.........v....e
..........v....v
.s....fs.s....fv
.........f.....v
f.f............v
.........s...f.v
........f.ff...v
sssssssssssssssv`,
  map`
...........v...e
..hh.........f.v
.............s.v
..hh.sf..s.s...v
..........f..f..
..hh............
p...............
hhhh...sssssssss`,
  map`
p...............
................
................
................
................
................
................
ffffffffffffffff`,
  map`
................
...vhh........v.
...v....vhv...v.
...vhh..v.v...v.
...v....v.v...v.
...vhh..v.vvhvv.
............h...
p...............`
]


//Randomly generated level :3
function getGlitchLevel()
{
  return map`
p...............
f${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}
${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}
${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}
${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}
${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}
${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}
${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}${getRandomChar()}`;}

setMap(levels[level])

setPushables({
  [ player ]: []
})

onInput("s", () => {
  if(inputDelay)return;
  if(onGround)return;
  getFirst(player).y += 1
  input();
})
onInput("d", () => {
  if(inputDelay || justDied)return;
  getFirst(player).x += 1
  input();
})
onInput("a", () => {
  if(inputDelay || justDied)return;
  getFirst(player).x += -1
  input();
})
onInput("w", () => {
  if(inputDelay || justDied)return;
  if(onGround){
  getFirst(player).y += -1
  velocity = 15
  input();
  }

  onInput("j", () => {
  //Reset button
  if(inputDelay)return;
  playerDeath()
  input();
})
    onInput("k", () => {
    if(inputDelay)return;
    level += 1;
    levelWriter();
    setMap(levels[level])
        input();
})
      onInput("l", () => {
    if(inputDelay)return;
    lives += 1;
    livesWriter();
    input();
        
})

      

})

afterInput(() => 
{
  //Checks if a player is in a spike and if so kills them
  if(getTile(getFirst(player).x, getFirst(player).y).length > 1 && getTile(getFirst(player).x, getFirst(player).y)[1].type === "s"){playerDeath();}
  
  //Progresses the level if the player is at the edge of the screen
  if(getFirst(player).x === 15)
  {


    level += 1;
    if(level + 1 === levels.length)
    {
      endWriter();
    }
    if(level >= levels.length || level < 0)
  {
    setMap(getGlitchLevel())
    if(level < 0)
    {
      level += -2
    }else{
      level = -2;
    }
    levelWriter();
    return;
  }
    levelWriter();
    playback.end()
    restartBackgroundMusic(1000)
    playTune(completeSong, 1);
    setMap(levels[level])
    
  
}})



//Randomly generated level maker
function getRandomChar()
{
  if(Math.random() < 0.6)
  {
    return '.'
  }
  else{
    const objects = ['p', 'h', 'v', 'f', 'e', 's'];
    return objects[Math.floor(Math.random() * objects.length)];
  }
}




//Handles player deaths
async function playerDeath()
{
  //Makes sure all this code runs after every other input has been handles
  await sleep(5)
  playback.end();
  //Since i'm so kind you can't walk right into a spike instantly after respawning
  //Delays inputs after death
  justDied = true;
  lives += -1;
  //Gameover
  if(lives === 0){
    lives = 3;
    level = 0;
    time = 0;
    setMap(levels[level])
    clearText()
    deathWriter()
    playTune(gameOverSong, 1);
    restartBackgroundMusic(4000);
  }else{
    playTune(deathSong, 1);
    restartBackgroundMusic(1500);
  }
    if(level >= levels.length || level < 0)
    {
      setMap(getGlitchLevel())
      livesWriter();
      levelWriter();
      await sleep(500)
      justDied = false;
    }
  else{
    livesWriter();
    setMap(levels[level])
    levelWriter()
    await sleep(500)
    justDied = false;
  }


}




//100 ms periodic loop
async function periodic(){
  isLooping = true;
  internalLoopCounter = 0;

  while(isLooping)
  {
    await sleep(100)
    //Loop counting and time
    internalLoopCounter = internalLoopCounter + 1;
    if(!endGame)
    {
      time = time + 1;
    }

    //Stops loop performance stopping
    if(internalLoopCounter == 2000)
    {
      isLooping = false;
      periodic();
      timeKeeper()
      return;
    }
    //Every second call timeKeeper function to draw update
    //Uses internalLoopCounter so numbers >100 dont get called faster
    if(internalLoopCounter % 10 === 0)
    {
      timeKeeper()
            
    }
    gravity();

    if(getTile(getFirst(player).x, (getFirst(player).y)).length > 1 && getTile(getFirst(player).x, (getFirst(player).y))[1].type === "s")
    {
      //Kills the player if they're in a spike
      playerDeath();
    }
    
  }
  
}
periodic();

//Short message so that timeKeeper can overwrite it without clearing text
//Called on game over
function deathWriter(){
  addText("Died! ", { 
  x: 1,
  y: 1,
  color: color`3`
})}

function timeKeeper(){
  //Converts the time into the right unit
  let effectiveTime = time/10;
  //Gets rid of decimals, prevents a weird error where they show up and get stuck
  effectiveTime = Math.floor(effectiveTime)
  addText("Time " + effectiveTime, { 
  x: 1,
  y: 1,
  color: color`3`
})}

async function endWriter()
{
   endGame = true;
  while(endGame)
  {
    addText("End", { 
    x: 14,
    y: 1,
    color: color`${Math.floor(Math.random() * 9)}`
    })
    await sleep(250)
  }
  

}


function levelWriter()
{
    //Levels are an array, thus the index starts as 0, so the number is increased by one
    addText("Level " + (level + 1), { 
  x: 1,
  y: 14,
  color: color`4`
})
}


levelWriter();

function livesWriter()
{
    //Writes the lives (out of three)
    addText("Lives " + lives + "/3", { 
  x: 10,
  y: 14,
  color: color`7`
})
}
livesWriter();

function gravity(){
  //Get state
  onGround = (getTile(getFirst(player).x, (getFirst(player).y+1)).length === 1 ||  getFirst(player).y === 7);
  //Lets the player fall into spikes, represented as "s"
  if(getTile(getFirst(player).x, (getFirst(player).y+1)).length === 1 && getTile(getFirst(player).x, (getFirst(player).y+1))[0].type === "s")
  {onGround = false;}
  //Used for floor check; floor doesn't have collision, platforms do (it looks better fr).
  ceiling = (!(getTile(getFirst(player).x, getFirst(player).y).length === 1))
  //Handles velocity movement
  if(velocity !== 0.0)
  {

    //If the player is going to phase through a floor tile, set the velocity to zero 
    if(ceiling){velocity = 0.0;}
    //Otherwise, move the player the amount dictated by the velocity
    getFirst(player).y += -Math.floor((velocity/10))
    //Decay the velocity
    velocity = velocity * gravityAmount
    //Switch to zero velocity logic if the velocity is low
    if(velocity < 1)
    {velocity = 0.0}
  }
  if(!onGround && velocity === 0.0 ){
      getFirst(player).y += 1
  }
}

async function input()
{
  inputDelay = true;

  //Increases the delay between inputs when in the air as opposed to on the ground.
  //It's easier to run on the ground than in the air, no?
  if(!onGround)
  {
    delayDuration = 125;
  }else{
    delayDuration = 20;
  }
  await sleep(delayDuration );
  inputDelay = false;
}

async function sleep(ms)
{
    return new Promise((resolve)=>setTimeout(resolve, ms));
}
