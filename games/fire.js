
/* 
@title: fire!
@author: shambhavi
@tags: ['fire','maze','obstacle','puzzle']
@addedOn: 2023-08-08
*/


/* INSTRUCTIONS!
- collect the water to get rid of the fires
- avoid the green fire!
- if there are smaller fires, the first water you collect will put out those,
and will shrink the larger fires
- 
*/
const player = "p"
const fire = "f"
const enemy = "e"
const water = "w"
const halfFire = "h"
const greenFire = "g"
const background= "b"
const wall = "l"
const bluePort = "o"
const purpPort = "q"
const disapFire = "d"
const main = tune`
125: D5^125 + A4~125 + F4~125,
250,
125: E5^125 + D5~125 + B4~125,
125: F5^125 + C5~125,
125,
125: E5^125 + B4~125,
125: A4~125,
125: D5^125 + G4~125,
125: F4~125,
125: C5^125 + E4~125,
125: D4~125,
125: B4^125 + E4~125,
250,
125: D5^125 + A4~125 + G4~125,
125: F4^125 + G5^125 + B4~125 + E4~125,
125,
125: F5^125 + C5~125,
125,
125: E5^125 + D5~125,
125,
125: D5^125 + F5~125,
125,
125: D5^125 + B4~125,
125,
125: E5^125 + A4~125,
125: C5^125 + G4~125,
125,
125: F4~125 + G4^125,
125: E4~125 + B4^125,
125: C5^125 + D4~125`
const portal = tune`
72.99270072992701: C5~72.99270072992701,
72.99270072992701: C5^72.99270072992701,
72.99270072992701: C5-72.99270072992701,
72.99270072992701: C5/72.99270072992701,
2043.7956204379561` 
const waterSound = tune `
102.04081632653062: C5-102.04081632653062,
102.04081632653062: G5-102.04081632653062,
102.04081632653062: G5/102.04081632653062,
2959.183673469388`

setLegend(
    [player, bitmap `
................
................
................
....0000000.....
...006666600....
...066060660....
...068666860....
...006600660....
....00666600....
.....000000.....
......C..C......
......C..C......
......C..C......
......7..7......
.....77..77.....
................`],
    [fire, bitmap`
.....6.........3
.6........3.....
...3...9.....3..
.............6..
.......33.......
.9....3333..6...
...6.33333......
....3399933...9.
3.3339999933....
..3399966993....
.339996666993...
.3999666666933..
.39966666669933.
.39966666669993.
.396666666669933
.33966666666933.`],
    [ enemy, bitmap`
................
................
................
.....333333.....
....33666633....
...3300000033...
...3003003003...
...3000000003...
...3666666663...
...3366336633...
....33666633....
.....333333.....
......3..3......
......3..3......
.....33..33.....
................`],
    [ water, bitmap`
................
....22222222....
..222222222222..
.22227777777222.
.22777777777772.
2227777777777722
2277777777777772
2277777777777772
2277777777777772
2277777777777772
2277777777777772
2277777777777772
.22777777777772.
.22777777777772.
..222777777722..
....22222222....`],
    [ halfFire, bitmap`
................
................
................
................
......9.........
............6...
...6....6.......
................
......3.........
..9....33.......
......3333..3...
.....339333.....
....39999933....
...3996669933...
...3966666993...
...3966666693...`],
    [ greenFire, bitmap`
................
................
................
................
......D.........
............4...
...4....4.......
................
......0.........
..D....00.......
......0000..0...
.....00D000.....
....0DDDDD00....
...0DD444DD00...
...0D44444DD0...
...0D444444D0...`],
    [ disapFire, bitmap`
................
................
................
................
......D.........
............4...
...4....4.......
................
......0.........
..D....00.......
......0000..0...
.....00D000.....
....0DDDDD00....
...0DD444DD00...
...0D44444DD0...
...0D444444D0...`],
    [ background,bitmap`
8888888088888888
8888888088888888
8888888088888888
8888888088888888
8888888088888888
8888888088888888
8888888088888888
0000000000000000
8888888888888880
8888888888888880
8888888888888880
8888888888888880
8888888888888880
8888888888888880
8888888888888880
0000000000000000`],
    [bluePort, bitmap`
6....000000...6.
.6..00000000.6..
....00555550....
...0005555500..6
6..0055555550.6.
.6.0055555550...
...0055555550...
...0055555550...
...0055555550...
...0055555550...
.6.0055555550.6.
6..0055555550..6
...0055555550...
....00555550....
.6..00555550.6..
6....000000...6.`],
    [purpPort, bitmap`
6....000000...6.
.6..00000000.6..
....00HHHHH0....
...000HHHHH00..6
6..00HHHHHHH0.6.
.6.00HHHHHHH0...
...00HHHHHHH0...
...00HHHHHHH0...
...00HHHHHHH0...
...00HHHHHHH0...
.6.00HHHHHHH0.6.
6..00HHHHHHH0..6
...00HHHHHHH0...
....00HHHHH0....
.6..00HHHHH0.6..
6....000000...6.`]
)

setSolids([player,fire,halfFire])
setBackground("b")
let intervalId = null;

let level = 0
const levels = [
  map`
p..
gf.
.w.`,
  map`
..gw.
..gg.
.....
....f
.p...`,
  map`
...fw
.g.h.
.g.f.
pgwf.
.g.f.`,
  map`
.........
.fff.f.f.
.gw..f.ff
.fffffh..
.f...ggg.
.f.f.fwf.
.f.f.f.f.
...fpf...`,
  map `
.q....
......
....w.
......
fff...
opf...`,
  map `
.h......ff
.h.f.ff...
.h..qfw.f.
ffffffffff
.f........
wf.ffff.hg
...fp...go`,
  map`
.f...f...
.f.f.fwf.
.f.f.f.f.
.fhwff.f.
.f.fpoff.
.f.fhf.f.
qf.....f.
.fffffff.
.........`,
  map `
.g.f.
pd.gw
.g.d.
.f.g.`,
  map `
...f.......f
.f.f.f.fff.f
.f...f.fwf..
.fffff.f.ff.
.f.....fqf..
.d.fffff.fof
.ff.......g.
.fffffgffff.
.g.....f....
.gdfff.f.fff
.....fpf....`,
  map `
...f...f........
.f.fff.f.ffffff.
ff...fff.f.f....
...f.f...f...ff.
.fff.fff.fff..f.
.........f....f.
.f.ffffffffffff.
.f....f...f...f.
.f.ff.f.f.f.f.fd
.f.ff...f...f..d
.f.ff.f.fffffff.
.f.f..f.....q.fo
.f.ffffffffff.f.
.f.f...fw..f..f.
.fff.f.fff.f.ff.
.....fp..f...f..`, //it's possible i promise


]
const mainplayback = playTune(main, Infinity)

startLevel(level);

setPushables({
	[ player ]: []
})

onInput("s", () => {
	getFirst(player).y += 1
})

onInput("d",()=>{
  getFirst(player).x +=1
})

onInput("w",()=>{
  getFirst(player).y -=1
})

onInput("a",()=>{
  getFirst(player).x -=1
})

onInput("j",()=>{
  startLevel(level)
})

afterInput(() => {
  const fireTiles = getAll(fire);
  const halfTiles = getAll(halfFire);
  if ((tilesWith(player, greenFire).length > 0 || tilesWith(player,disapFire).length > 0)&& (fireTiles.length>0 || halfTiles.length>0)) {
    startLevel(level);
  }
    //teleporting
    else if (tilesWith(player, purpPort).length > 0) {
    const bp = getFirst(bluePort);
    const pl = getFirst(player);
    pl.x = bp.x;    
    pl.y = bp.y;
    const playportal=playTune(portal,1)
  
  }
  else if (tilesWith(player, bluePort).length > 0) {
    const pl = getFirst(player);
    const pp = getFirst(purpPort);
    pl.x = pp.x;
    pl.y = pp.y;
    const playportal=playTune(portal,1)

  }
      

   //if water gone
  if (fireTiles.length === 0 && halfTiles.length === 0) {
    level += 1;
    if (level < levels.length) {
       startLevel(level);
    } else {
      mainplayback.end()
      addText("you win!", { x: 5, y: 8, color: color`4` });
    }
  } 
    //no halffires, player on water
  else if (halfTiles.length === 0 && tilesWith(water, player).length > 0) {
    getFirst(water).remove()
    const playwater=playTune(waterSound,1)
    fireTiles.forEach(sprite => sprite.remove())
    getAll(greenFire).forEach(sprite =>sprite.remove())
    getAll(disapFire).forEach(sprite => sprite.remove())
  } 
    //player on water with half tiles
  else if (tilesWith(water, player).length > 0) {
    const playwater=playTune(waterSound,1)
    let waterPlayerTiles = tilesWith(water, player);
    waterPlayerTiles.forEach(tile => {
        tile.forEach(sprite => {
            if (sprite.type === water) {
                sprite.remove();
            }
        })
    })
    getAll(greenFire).forEach(sprite =>sprite.remove())
    halfTiles.forEach(sprite => sprite.remove())
      fireTiles.forEach(sprite => {
        clearTile(sprite.x, sprite.y);
        addSprite(sprite.x, sprite.y, halfFire);
      });
    }
});

function startLevel(level) {
  let fireThere = true
  setMap(levels[level]);
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = false;
    }
  if (tilesWith(disapFire).length > 0) {
    let disx1 = getFirst(disapFire).x;
    let disy1 = getFirst(disapFire).y;
    let disx2 = getAll(disapFire)[1].x;
    let disy2 = getAll(disapFire)[1].y;
    intervalId = setInterval(() => {
      if (fireThere) {
        getAll(disapFire).forEach(sprite => sprite.remove());
        fireThere=false;
    } else {
        addSprite(disx1, disy1, disapFire);
        addSprite(disx2, disy2, disapFire);
        fireThere=true;
       if (tilesWith(player, disapFire).length > 0){
        clearInterval(intervalId);
        intervalId = null;
        startLevel(level);
        }
      }
    }, 500);
  }
}


