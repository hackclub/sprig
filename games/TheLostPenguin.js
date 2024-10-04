/*
@title: The Lost Penguin
@author: Luca
@tags: ['puzzle']
@addedOn: 2024-07-15
*/

/*
* COMMANDS:
* Movement: WASD
* Reset Level: j
*/
const player = "p";
const wall = "w";
const wall2 = "2"
const wall3 = "3"
const exit = "x";
const trap = "t";
const trap2 = "6"
const trap3 = "7"
const trap4 = "8"
const box = "b"
const teleport = "r"
const teleportDestination ="e"
const key = "k" 
const gate = "g"
const t = "o"
const h = "h"
const e = "l"
const m = "m"
const a = "a"
const z = "z"
const bgColor = "n"
const forceBarrier ="f"
const pressurePlate = "v"
const forceBarrierD ="d"
  
setLegend(
  [ player, bitmap`
...0.000000.....
..00000000000...
...0000000000...
..000L222022L0..
..000220222020..
..000220222020..
..000222999220..
..000L22CC22L0..
...0000122210...
..000012222210..
.000L0222222200.
.000L0122222100.
.0LL00L12221L00.
..000000000000..
...00CCC0CCC0...
....0999909990..` ],
  [ wall, bitmap`
5555575555555577
5577777777777557
7772272777772775
5777727777722775
5577777575772775
5777775777777275
5777752777777775
5777525777777775
7777277777777755
5772777777777757
5775772777757775
5777577277577757
5777777777777775
5577777777777775
5777777775775575
5555775555555555` ],
  [ wall2, bitmap`
0000000000000000
0LLL1LLL111111L0
0LLL1L11LL1LLL10
0LL111LLLLLLLL10
01LL11LLLLLLLL10
0LL1LLLLLL11LL10
0LL11L1LLL11LL10
0LLLLLLLLLL11LL0
0LLLLLLLLLLL11L0
01LL1LL111L11L10
0L1LLLL1LL111L10
0LLLLLLLLL111LL0
0LL1LLL1LL1LL1L0
0LL1LLL1L11LLLL0
0LLL1L1L11LLLL10
0000000000000000` ],
  [ wall3, bitmap`
0000000000000000
0LLL9LLL999333L0
0LLL3L99LL3LLL90
0LL399LLLLLLLL90
09LL33LLLLLLLL90
0LL9LLLLLL99LL30
0LL39L9LLL39LL30
0LLLLLLLLLL39LL0
0LLLLLLLLLLL99L0
09LL9LL999L99L90
0L3LLLL9LL999L30
0LLLLLLLLL933LL0
0LL9LLL9LL9LL9L0
0LL3LLL9L93LLLL0
0LLL3L3L33LLLL90
0000000000000000` ],
  [ exit,  bitmap`
................
.......00.......
......02F0......
......06F0......
.....0266F0.....
...0026666F00...
000F66F66F66F000
0F66FD2662DF6FF0
.0F664D66D466F0.
..0F666FF666F0..
...0606666060...
...0660000660...
..0F6666666660..
..0FF6600F66F0..
..0FFF0..0FFF0..
..0000....0000..`],
  [ trap,  bitmap`
................
................
................
........5.......
........5.......
.......575......
.......575......
......77555.....
......27755.....
.....2725755....
.....7777555....
....777775555...
....277757555...
....777775555...
...77777757555..
...77777557555..`],
  [ trap2,  bitmap`
................
................
................
77..............
77727...........
7777772.........
777777727.......
77777727755.....
5775775757755...
55575575555.....
775555555.......
5555555.........
55555...........
55..............
................
................`],
  [ trap3,  bitmap`
..55575577777...
..55575777777...
...555577777....
...555757772....
...555577777....
....5557777.....
....5575272.....
.....55772......
.....55577......
......575.......
......575.......
.......5........
.......5........
................
................
................`],
  [ trap4,  bitmap`
................
................
..............55
...........55555
.........5555555
.......555555577
.....55557557555
...5577575775775
...5555772777777
.....55727777777
.......552777777
.........5572777
...........55577
..............55
................
................`],
  [ box, bitmap`
................
................
................
........0.......
.....0002000....
....022222220...
...01112212120..
...0L111121120..
..0L11111111110.
..0LLL1111111L0.
..0LL1LL111L1L0.
..0LLLL1L1LLLL0.
..0LLLLLLLLLLL0.
...00LLLLLLL00..
.....0000000....
................` ],
  [ teleport, bitmap`
................
.5...........55.
.....572555...5.
...7552522757...
...7577777577...
..557777755755..
..577227777775..
..577277777275..
..577227777275..
..757722772275..
..575777777755..
...5777722755...
...5575777555...
.....575555.....
.5............5.
............55..`],
  [ teleportDestination, bitmap`
................
.5...........55.
.....572555...5.
...7552522757...
...7577777577...
..557777755755..
..577227777775..
..577277777275..
..577227777275..
..757722772275..
..575777777755..
...5777722755...
...5575777555...
.....575555.....
.5............5.
............55..`],
  [ key, bitmap`
................
................
......572.......
.....57..2......
.....5...7......
.....55.77......
......557.......
........7.......
........7.......
......757.......
........7.......
........7.......
.......57.......
.......55.......
................
................`],
  [ gate, bitmap`
................
................
..55...55...55..
.5725.5725.5725.
.5275.5275.5275.
.5775.5775.5775.
.5575.5775.5775.
.55755577555775.
.57557557575755.
.55755555555575.
.5755.5755.5555.
.5555.5575.5755.
.5555.5555.5555.
.5755.5555.5555.
..55...55...55..
................`],
  [ t, bitmap`
................
................
..777772222222..
.55557777777772.
..555555775555..
......5577......
......5577......
......5577......
......5577......
......5577......
......5577......
......5577......
......5577......
......5555......
.......55.......
................`],
  [ h, bitmap`
................
....5...........
....55..........
....55........2.
....55222.......
....557777......
....5775572.....
....575..57.....
....57...57.....
....57...57.....
....55...55.....
....55....5.....
....5.....5.....
................
................
................`],
  [ e, bitmap`
................
................
......77227.....
....77777722....
...5577...72....
...577....77....
...555777777....
...5577555......
...557..........
...555..........
....557.........
....55577..72...
.....55555755...
.......55555....
................
................`],
  [ m, bitmap`
................
..52............
..57............
..57.5722.......
..57755777772...
..575555577572..
..575..5575577..
..577...55..57..
..557...55..57..
..555.......572.
..55.........57.
..55.........57.
...5.........55.
................
................
................`],
  [ a, bitmap`
................
................
.....7777777....
....77555557....
...775....557...
...75......55...
...........55...
...........55...
......7777.57...
....775555755...
...775....755...
...57......75...
...55.....755...
....55577755....
.....5555.......
................`],
  [ z, bitmap`
................
...7777.........
..55775777577...
....5555555557..
............75..
...........55...
.......57777....
...5777777755...
...555555555....
.....557........
....757.........
...577..........
...5577775777...
...55775775555..
....555555555...
................`],
  [ bgColor, bitmap`
2222222222222222
2222222222272222
2227222222222222
2222222222222222
2222222222222222
2222222222227222
2222272222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222722
2272222222222222
2222222222222222
2222222222222222
2222222722222222`],
  [ forceBarrier, bitmap`
................
................
..555755555555..
..577577727775..
..577577572575..
..575775775775..
..757777775757..
..577575577575..
..575275775775..
..572757755757..
..577577777557..
..775775775775..
..577577777525..
..555755555555..
................
................`],
  [ forceBarrierD, bitmap`
................
................
.....555........
...555..........
...5............
...........7....
...........7....
....77..........
....7..5........
......55.....5..
.............5..
.............5..
....5........5..
....55....7..5..
.....555........
................`],
  [ pressurePlate, bitmap`
................
................
................
................
................
................
................
................
................
.....557722.....
....57772772....
...0557772751...
..005555555511..
..000LLLL11111..
...0LLLLLL111...
................`],
);

setSolids([player, wall, wall2, wall3, box, gate, forceBarrier])

const melody = tune`
283.0188679245283: D5~283.0188679245283 + D4^283.0188679245283,
283.0188679245283: E5~283.0188679245283 + C4^283.0188679245283,
283.0188679245283: E5~283.0188679245283,
283.0188679245283: D5~283.0188679245283,
283.0188679245283: C5~283.0188679245283 + D4^283.0188679245283,
283.0188679245283: C5~283.0188679245283 + E4^283.0188679245283,
283.0188679245283: C5~283.0188679245283 + E5^283.0188679245283,
283.0188679245283: C5~283.0188679245283 + C4^283.0188679245283,
283.0188679245283: B4~283.0188679245283,
283.0188679245283: A4~283.0188679245283 + D4^283.0188679245283,
283.0188679245283: A4~283.0188679245283 + C4^283.0188679245283,
283.0188679245283: A4~283.0188679245283 + C4^283.0188679245283,
283.0188679245283: B4~283.0188679245283,
283.0188679245283: B4~283.0188679245283 + D4^283.0188679245283,
283.0188679245283: C5~283.0188679245283,
283.0188679245283: C5~283.0188679245283 + E4^283.0188679245283,
283.0188679245283: D5~283.0188679245283 + E4^283.0188679245283,
283.0188679245283: E5~283.0188679245283 + D4^283.0188679245283,
283.0188679245283: D4^283.0188679245283 + F5~283.0188679245283,
283.0188679245283: E5~283.0188679245283,
283.0188679245283: D5~283.0188679245283 + E4^283.0188679245283,
283.0188679245283: D5~283.0188679245283 + F4^283.0188679245283,
283.0188679245283: D5~283.0188679245283,
283.0188679245283: D5~283.0188679245283,
283.0188679245283: C5~283.0188679245283 + D4^283.0188679245283,
283.0188679245283: B4~283.0188679245283 + D4^283.0188679245283,
283.0188679245283: A4~283.0188679245283 + C4^283.0188679245283,
283.0188679245283: A4~283.0188679245283,
283.0188679245283: B4~283.0188679245283,
283.0188679245283: B4~283.0188679245283 + D4^283.0188679245283,
283.0188679245283: C5~283.0188679245283 + C4^283.0188679245283,
283.0188679245283: D5~283.0188679245283 + C4^283.0188679245283`
const keysfx =tune`
116.27906976744185: E5^116.27906976744185,
116.27906976744185: A5^116.27906976744185,
116.27906976744185: B5^116.27906976744185,
116.27906976744185: B5^116.27906976744185,
3255.813953488372`;
const teleportsfx =tune`
109.89010989010988: D4-109.89010989010988,
109.89010989010988: C4^109.89010989010988,
109.89010989010988: C4-109.89010989010988,
109.89010989010988: C4^109.89010989010988,
109.89010989010988: C4^109.89010989010988,
2967.032967032967`;
const deathsfx = tune`
131.57894736842104: F4/131.57894736842104,
131.57894736842104: E4-131.57894736842104,
131.57894736842104: E4/131.57894736842104,
131.57894736842104: E4/131.57894736842104,
3684.210526315789`;

const playback = playTune(melody, Infinity);

let level = 0;
const levels = [
  map`
wwwwwwwwwww
wbwwww7wwrw
6wohlwwgwww
wwwwwwwwwkw
wewwmazlwww
wwkwwwwwwww
wvwfwgw8wbw
wwwwwwwwwww
wp.......xw
wwwwwwwwwww`,
  map`
wwwwwwwwwww
wp.w..w...w
w.www.w.w.w
w.......w.w
w.wwwwwww.w
w.wx..w...w
w.www.www.w
w.w.w.w...w
w...w...w.w
wwwwwwwwwww`,
  map`
wwwwwwwwwwwwwww
wpw.....w....xw
w.w.www.w.wwwww
w...w.w.w.....w
www.w...wwwww.w
w...w.www...w.w
w.www.www.w.w.w
w.w.......w...w
w.wwwwwwwww.w.w
w.w...w...w.w.w
w.w.w.www.www.w
w...w.........w
wwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwww
wpw....w.....7w
w.w.ww.w.w.wwxw
w.w..t.w.w....w
w.w.ww.w.wwwwww
w...w..w..7...w
wwwww.ww6...t.w
w.....wwwwwww.w
w.w6www.....w.w
w.w.w..tw.w.w.w
w.www.www.w.w.w
w.........w...w
wwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwww
wp.b...w.bb...w
w8www.ww.w.bbbw
wx..w....wbbbbw
w.8wwwwwww.bbbw
w..w...b.w.b..w
w6.w.w.w.w.b..w
w..wbw.wwwbbbbw
w.8w.w...wwwwbw
w.ww.www.wt...w
w....w.b.ww.w.w
w..w.w.w......w
wwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwww
wxw.wr...b....w
w.w.w.b...bbbbw
w.w.wwwwwwww.ww
w.w....7...w.ww
w.wbwt...t.w.ww
w.wbwwwwww.w.ww
w.w......w.b..w
w.wwwww6.wwwwww
w.w......w6...w
w.w.8wwwww..t.w
we7........8wpw
wwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwww
wpwpw..wr.....w
w.w.w6.w..www.w
w.w.wb.w6.w...w
w.w.w..w..w.www
w.w.w.8wb.w...w
w.w.w..w.8www.w
w.w.w..w..w...w
w.w.w6bw..w.www
w.w....w6bw...w
w.wwwwww..www.w
w.e.......wx..w
wwwwwwwwwwwwwww`,
  map`wwwwwwwwwwwwwww
wpwp.w.7.w...bw
w.w6.w...w.bb.w
wgw..w.t.wb...w
w.w.8w.w.wbwwbw
w.w..wbw...w..w
wxw6bw.wwwww.8w
wwwwbw.w......w
wk8w...w.8wwwww
w..w.www......w
ww.w.w7wwwww6.w
w6............w
wwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwww
wpwb......w...w
w.w6.wwww.w.t.w
wbw...w.w.w.w.w
wbw.t.w.www.w.w
w...w.wb....wrw
w.wgw...8wwwwww
w.wxwtt....wx8w
wwwwwwwww6gw6xw
w7.........wwww
w..www6.8www.7w
wk.w.....bbb.ew
wwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwww
wpw6...w77...pw
wgw..t.w...twww
w...8w.w.wwww.w
w68www.w.7....w
w..77.bw...twbw
w......wtwwwwbw
www.wwwwww....w
w...wew....ww.w
wbwww.w6ww.w7.w
w...w.w.7....8w
w..rwxwk..t...w
wwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwww
wpbb..w..b.w7xw
wbbbwww.t.ww..w
wbbbw...w.wwg8w
wbbbw.8ww..w..w
wbbbw...w6.w6gw
w.8wwww.w..w..w
w.....w.w.8wg8w
w.t.www.w..w..w
w.wew...w6.w6gw
w.w.7.t.w6.w..w
w.w...wrwk.g..w
wwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwww
wp..w.......gxw
ww6.w.8wwwwwwww
w...w.......77w
w.8wbwwwwww...w
w.......7eww6.w
ww6.t.t.......w
w...w.wwwww.t.w
w.www...7.w.w.w
w.w.b.t.......w
w.wwwww.ww6.tbw
w..r....wk..w.w
wwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwww
wp..8wp...wp..w
wgw.wwwww.ww6.w
w.wwww....w...w
w....w.8www.8ww
www6.w....w...w
w....wwww.ww6.w
w.tbb7bbbb7bb.w
w.wwwwwww.w.b.w
w...8w77w.w...w
w6..8w....w...w
w6..xwk...w..tw
wwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwww
wpvw.p.w......w
wvvw...w..w.w.w
wwwwgggw.wwww.w
wwww...w...w..w
wp.w.b.wfwwwwfw
w.8ww6.w.wx...w
wffw...w.wwwwww
w..w.8ww......w
w6.w...wwww6..w
w..w...7......w
wk.wt.....t...w
wwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwww
wpw.wewkw.....w
wbw.7.w.7.8ww.w
wbw.t.w.....w.w
wb7.w.wwwwwww.w
w...w.w...w...w
w...w.w.t.w.t.w
w...w.7.w.w.w.w
w.t.w...w.w.w.w
w.wfw.www.www.w
w.w.wgw.......w
wvwrwxwtttttttw
wwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwww
wp...w777w...pw
w.b..7...7....w
w.bbbt.v.t....w
w.bb.w...wffffw
wbb..w...w....w
wb...w...www.8w
w....w...w....w
wggggw...w6.www
w....w...w....w
w....wwwwwww.8w
wtttxw7t7wk...w
wwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwww
wp8w....8wew..w
w..w..t..w.w..w
w6.w6.wffw.7..w
w..w..wr.w....w
w.8w.8wwwww.wbw
w..w..g..xwwwbw
w6.w.8wwwww...w
w..w...b.vw.t.w
w.8w.b.wwww.w.w
w..7...w77f.www
w......gk.f..8w
wwwwwwwwwwwwwww`,
  map`
wwwohlwmazlwwww
wxw..bbbbb..www
wgw.b.....b..ww
wffb.v.v..b...w
w..b......b...w
w..b.k.bb.bb..w
w...bbbf...b..w
w.....bf...b..w
w....bff...b..w
w....bff...b..w
ww...bfff..bpww
www.bffffffbwww
wwwwwwwwwwwwwww`,
]

setBackground(bgColor)

setMap(levels[level])

setPushables({
  [ player ]: [ box ],
  [ box ]: [ box ]
})

onInput("w", () => {
  const allPlayers = getAll(player);
  for(var i = 0; i<allPlayers.length; i++){
    allPlayers[i].y -= 1;
  }
});

onInput("a", () => {
  const allPlayers = getAll(player);
  for(var i = 0; i<allPlayers.length; i++){
    allPlayers[i].x -= 1;
  }
});

onInput("s", () => {
  const allPlayers = getAll(player);
  for(var i = 0; i<allPlayers.length; i++){
    allPlayers[i].y += 1;
  }
});

onInput("d", () => {
  const allPlayers = getAll(player);
  for(var i = 0; i<allPlayers.length; i++){
    allPlayers[i].x += 1;
  }
});

onInput("j", () => {
  updateMap();
});



function updateMap(){
  if(level >= levels.length) level = 0;
  setMap(levels[level]);
}

/*
* Funtion that checks if the player stepped on any trap
*/
function isTrapped(entity){
  const trapped = tilesWith(entity ,trap);
  const trapped2 = tilesWith(entity ,trap2);
  const trapped3 = tilesWith(entity ,trap3);
  const trapped4 = tilesWith(entity ,trap4);
  if(trapped.length >=1 || trapped2.length >=1 || trapped3.length >=1 || trapped4.length >=1) return true;
  return false;
}

/*
* Funtion that checks if the player got into a teleport and if so tp it to the other side
*/
function handleTp(){
  const playerSprite = getFirst(player);
  if(!tilesWith(player,teleport).length>=1)return;
  playTune(teleportsfx, 1);
  const endingTp = getFirst(teleportDestination);

  playerSprite.x = endingTp.x;
  playerSprite.y = endingTp.y;
}

/*
*Funtion that checks if the button is pressed and if so disable the barrier
*/
function handlePressurePlate(){
  if(isPushableWith(box,pressurePlate)){
    replaceSprites(forceBarrier,forceBarrierD);
  }else if(!tilesWith(player,pressurePlate).length>=1){
    replaceSprites(forceBarrierD,forceBarrier);
  }else{
    replaceSprites(forceBarrier,forceBarrierD);
  }
}


/*
*Funtion that checks if a pushable is in the same tile of another object
*in: pushable type, object type
*/
function isPushableWith(pushable,spriteType) {
  const pushables = getAll(pushable); 
  for (let i = 0; i < pushables.length; i++) {
    const tileWithPushable = getTile(pushables[i].x, pushables[i].y);
    for (let j = 0; j < tileWithPushable.length; j++) {
      if (tileWithPushable[j].type === spriteType) {
        return true; 
      }
    }
  }

  return false; 
}


/*
*Funtion that replace all the sprites of a specified type to another
*In: old type, new type
*/
function replaceSprites(originalType, newType) {
  const spritesToReplace = getAll(originalType);
  for (let i = 0; i < spritesToReplace.length; i++) {
    spritesToReplace[i].type = newType;
  }
}


/*
* Function that cheks if the key was found and eventually delete the gate
*/
function handleGate(){
  const isKeyFound = tilesWith(player ,key);
  if(!isKeyFound.length > 0) return; 
  playTune(keysfx, 1);
  addText("Key found!", { x: 6, y: 5, color: color`7` });
  clearType(key);
  clearType(gate);
}

/*
* Function that deletes all the sprites from the map of a specified type
* in : sprite type
*/
function clearType(type){
    const Sprites = getAll(type);
    for (let j = 0; j < Sprites.length; j++) {
      Sprites[j].remove();
    }
}

afterInput(() => {
  clearText();
  handlePressurePlate();
  handleTp();
  handleGate();
  const exitFound = tilesWith(player ,exit);

  if( exitFound.length>= 1 ){
    level+=1;
    if(level >= levels.length){
      addText("YOU WON!!", { x: 5, y: 5, color: color`9` });
      updateMap();
      return;
    }
    addText("Level: " + level, { x: 6, y: 5, color: color`7` });
    updateMap();
  }

  if(isTrapped(player)){
    updateMap();
    playTune(deathsfx, 1);
    addText("spikes hurts! ", { x: 4, y: 5, color: color`5` });
  }

})
