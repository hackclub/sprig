/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: MEow
@description: play as a hungry kitty 
@author: Kribuke
@tags: ['cat', 'puzzle']
@addedOn: 2026-11-01
*/

const player = "p";
const fish = "f";
const block = "b";


setLegend(
  [ player, bitmap`
.....L.....L....
....02L...02L...
...0222LLL22LL..
...02222222222L.
...022222222222L
..0222522224222L
..0332220222233L
..0222202022222L
..002222222222LL
.0222222222LLLL.
02222222222L....
02222222222L....
0110002L002L....
010..02L.02L....
010..02L.02L....
000..00L.00L....` ],

[ fish, bitmap`
................
................
................
.........77.....
....7777777.....
..77777777....7.
.7770777777..77.
77777777777.777.
555777777775777.
.5557777555555..
..555555555.555.
....5555.....55.
.......55.....5.
................
................
................`],
[block, bitmap`
6666666666666663
9CCCC9CCCC9CCCC3
9000090000900003
9999999999999993
9CC9CCCC9CCCC9C3
9009000090000903
9999999999999993
9CCCC9CCCC9CCCC3
9000090000900003
9999999999999993
9CC9CCCC9CCCC9C3
9009000090000903
9999999999999993
9CCCC9CCCC9CCCC3
9000090000900003
9999999999999993`]
)
setSolids([block, player])

let level = 0;
const levels = [
  map`
p.....
......
......
......
....f.`,

  map`
p...f.
......
......
......
...b..`,
  map`
p.....
......
......
....f.
..bpf.`,
  map`
......
......
....pf
..bpf.
.bpf..`,
  map`
......
......
..b...
.pp...
.ffb..`,
  map`
......
......
......
......
p...f.`,
  map`
.....b
.....b
.....b
f....b
p..bpf`,
  map`
......
......
......
......
p..f.p`,
  map`
......
......
......
......
p.....`
  
]


const currentLevel = levels[level];
setMap(currentLevel);

setPushables({
  [ player ]: [block],
  [block]: [fish],
  [block]: [block],
  [block]: [player]
})

onInput("w", () => {
  
  getFirst(player).y -= 3
})
onInput("d", () => {
  getFirst(player).x += 1
})
onInput("a", () => {
  getFirst(player).x -= 1
})
onInput("j", () => {
  const currentLevel = levels[level]; // get the original map of the level

  // make sure the level exists before we load it
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

const jump = async () => {
  
  await createArray(4).reduce(async (promise) => {
    await promise;

    getFirst(player).y--;


    await wait(100);
  }, Promise.resolve());

  await resetGravity();
};
setInterval(() => {

  getFirst(player).y++;
    
  const targetNumber = tilesWith(fish).length;
  const numberCovered = tilesWith(fish, player).length; 

  if (numberCovered === targetNumber) {
    level = level + 1;

    const currentLevel = levels[level];
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    }
  }
}, 200)

const melody = tune`
779.2207792207793,
389.61038961038963: G4~389.61038961038963,
389.61038961038963: A4~389.61038961038963,
389.61038961038963: B4~389.61038961038963,
389.61038961038963: C5~389.61038961038963,
389.61038961038963: B4~389.61038961038963,
389.61038961038963: A4~389.61038961038963,
389.61038961038963: A4~389.61038961038963,
389.61038961038963: A4~389.61038961038963,
389.61038961038963: A4~389.61038961038963,
389.61038961038963,
389.61038961038963: B4~389.61038961038963,
389.61038961038963: C5~389.61038961038963,
389.61038961038963: D5~389.61038961038963,
389.61038961038963,
389.61038961038963: C5~389.61038961038963,
389.61038961038963: D5~389.61038961038963,
389.61038961038963: E5~389.61038961038963,
389.61038961038963,
389.61038961038963: B4~389.61038961038963,
389.61038961038963: A4~389.61038961038963,
389.61038961038963: A4~389.61038961038963,
389.61038961038963: G4~389.61038961038963,
389.61038961038963,
389.61038961038963: G4~389.61038961038963,
389.61038961038963: G4~389.61038961038963,
389.61038961038963: A4~389.61038961038963,
389.61038961038963: A4~389.61038961038963,
389.61038961038963: G4~389.61038961038963,
779.2207792207793`

const playback = playTune(melody, Infinity)


afterInput(() => {
    
  const targetNumber = tilesWith(fish).length;
  const numberCovered = tilesWith(fish, player).length; 

  if (numberCovered >= targetNumber) {
    level = level + 1;

    const currentLevel = levels[level];
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else{
      clearText()
      addText("You ate all the", { x: 1,y: 7,color: color`3`})
      addText("Fish", { x: 1,y: 8,color: color`3`})
    }
  }
  
  if (level === 0) {
    addText("hello little kitty", { 
    x: 1,
    y: 7,
    color: color`3`
    })
  }
  if (level === 1){
    clearText()
    addText("are you hungry?", { 
    x: 1,
    y: 7,
    color: color`3`
  })
  }
  if (level === 2){
    clearText()
    addText("Help feed the other", { x: 1,y: 7,color: color`3`})
    addText("kitty", { x: 1,y: 8,color: color`3`})
  }
  if (level === 4){
    clearText()
    addText("Are you still", { x: 1,y: 7,color: color`3`})
    addText("hungry??", { x: 1,y: 8,color: color`3`})
  }
  if (level === 5){
    clearText()
    addText("Kitty, this isnt", { x: 1,y: 7,color: color`3`})
    addText("healthy", { x: 1,y: 8,color: color`3`})
  }
  
  if (level === 7){
    clearText()
    addText("Kitty, there is", { x: 1,y: 7,color: color`3`})
    addText("only one fish left!", { x: 1,y: 8,color: color`3`})
  }
})
