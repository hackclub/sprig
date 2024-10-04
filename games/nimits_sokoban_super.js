/*
@title: Sokoban Super
@author: Nimit Vijayvargee
@tags: ['puzzle']
@addedOn: 2024-05-30
@img: ""
*/

const playerup = "u"
const playerleft = "l"
const playerright = "r"
const playerdown = "d" 
let playerdirection = "d"
let prevdir
const wall = "w"
const box = "b"
const goal = "g"
const flag = "f"
const tile = "t"
const teleporter = "p"
let inputtype
let boxes_in
setLegend(
  [ playerup, bitmap`
.......000......
.....0000000....
....000000000...
....000000000...
....000000000...
....000000000...
...02000000020..
....022000220...
....002222200...
...07700000770..
..0777777777770.
..0770777770770.
..0220000000220.
...00055555000..
.....0550550....
......00.00.....` ],
  [ playerleft, bitmap`
...00000000.....
...00000000.....
..0000000000....
..0000000000....
..000002L20.....
..000022L20.....
...02022220.....
....0222220.....
....000000......
....07020.......
...070000.......
...077220.......
....00000.......
.....0550.......
.....0550.......
......000.......` ],
  [ playerdown, bitmap`
.......000......
.....0000000....
....000000000...
....000000000...
....002222200...
....022L2L220...
...0222L2L2220..
....022222220...
....002222200...
...07700000770..
..0777777777770.
..0770777770770.
..0220000000220.
...00055555000..
.....0550550....
......00.00.....` ],
  [ playerright, bitmap`
.....00000000...
.....00000000...
....0000000000..
....0000000000..
.....02L200000..
.....02L220000..
.....02222020...
.....0222220....
......000000....
.......02070....
.......000070...
.......022770...
.......00000....
.......0550.....
.......0550.....
.......000......` ],
  [ box, bitmap`
................
.99999999999999.
.99999999999999.
.9999CCCCCCCC99.
.99999CCCCCCC99.
.99C999CCCCCC99.
.99CC999CCCCC9C.
.99CCC999CCCC9C.
.99CCCC999CCC9C.
.99CCCCC999CC9C.
.99CCCCCC999C9C.
.99CCCCCCC9999C.
.99CCCCCCCC999C.
.9999999999999C.
.99CCCCCCCCCCCC.
................`],
  [ wall, bitmap`
3303333333303333
3303333333303333
3303333333303333
0000000000000000
3333333033333333
3333333033333333
3333333033333333
0000000000000000
3303333333303333
3303333333303333
3303333333303333
0000000000000000
3333333033333333
3333333033333333
3333333033333333
0000000000000000`],
  [ goal, bitmap`
....LLLLLLLL....
...1111111111...
..111LLLLLL111..
.11LLLLLLLLLL11.
111LLLLLLLLLL111
11LLLL0000LLLL11
11LLL000000LLL11
11LLL000000LLL11
11LLL000000LLL11
11LLL000000LLL11
11LLLL0000LLLL11
111LLLLLLLLLL111
.11LLLLLLLLLL11.
..111LLLLLL111..
...1111111111...
....11111111....`],
  [ flag, bitmap`
................
................
....00000000000.
....044444DD00..
....0444DDD00...
....04DDD000....
....0DD000......
....000.........
....0...........
....0...........
....0...........
....0...........
....0...........
....0...........
....0...........
....0...........`],
  [tile, bitmap`
LLLLLLLLLLLLLLLL
1111111111111111
1L111111111111L1
1111111111111111
1111111111111111
1111111111111111
1L111111111111L1
1111111111111111
LLLLLLLLLLLLLLLL
1111111111111111
1L111111111111L1
1111111111111111
1111111111111111
1111111111111111
1L111111111111L1
1111111111111111`],
  [ teleporter, bitmap`
....77777777....
...7777777777...
..777555555777..
.77555555555577.
7775577777755777
7755772777775577
7755727777775577
7755777777775577
7755777777775577
7755777777775577
7755777777775577
7775577777755777
.77555555555577.
..777555555777..
...7777777777...
....77777777....`] //future use idk
)

setBackground(tile)
setSolids([playerup, playerdown, playerleft, playerright, box, wall])

let level = 0
const levels = [
  map`
wwwww
wd..w
wfbgw
wwwww`, //1- tutorial 1box
  map`
wwwww
wd.fw
wbbbw
wgggw
wwwww`, //2- tutorial 3box
  map`
wwwww
wgbdw
w..ww
w.bgw
w.w.w
wbbgw
wg.fw
wwwww`, //3- hall
  map`
wwwwwww
wgg.ggw
wbb.bbw
w..d..w
wbb.bbw
wggfggw
wwwwwww`, //4- square
  map`
wwwwwwwwww
w.dw....fw
w.bw.....w
w..w..w..w
w..w..w..w
w.....w..w
w.....w.gw
wwwwwwwwww`, //5- snake
  map`
wwwwwwww
wg..w..w
w..bwb.w
w.d.w..w
wbw.g.ww
w..f...w
w.w...gw
wwwwwwww`, //6- room
  map`
wwwwwwwwwwww
w..dwwwwwfww
w...wwwww.ww
w.b..b..g.ww
w...g.....ww
w...w.b..www
w.b.ww..gwww
w...gwwwwwww
w...wwwwwwww
wwwwwwwwwwww`, //7- rooms and hallways
  map`
wwwwwwwwwww
w..bg.f...w
wdgbg.....w
w.b.gb....w
w...gb....w
wwwwwwwwwww`, //8- lock in
  map`
wwwwwwwwww
wdw...w.gw
w.gb..w.bw
wbw.b.wb.w
wgw..g...w
www..g..fw
www..w...w
wwwwwwwwww`, //9- doors
  map`
wwwwwwwww
wwgggggww
wwbbbbbgw
wgbdfbbgw
wg.bbbbgw
wg.bbbbww
wwgggggww
wwwwwwwww`  //10- claustrophobia (there needs to be a level named after a phobia, that is not cliche)
  //level 10 is possible, i have beaten it myself. Keep trying kid!
]

setMap(levels[level])

setPushables({[playerdown]:[box],
             [playerup]:[box],
             [playerleft]:[box],
             [playerright]:[box],
             [box]:[box],})

onInput("s", () => {
  getFirst(playerdirection).y += 1
  prevdir = playerdirection
  playerdirection = "d"
  inputtype = "m"
})
onInput("w", () => {
  getFirst(playerdirection).y -= 1
  prevdir = playerdirection
  playerdirection = "u"
  inputtype = "m"
})
onInput("a", () => {
  getFirst(playerdirection).x -= 1
  prevdir = playerdirection
  playerdirection = "r"
  inputtype = "m"
})
onInput("d", () => {
  getFirst(playerdirection).x += 1
  prevdir = playerdirection
  playerdirection = "l"
  inputtype = "m"
})
onInput("i", () => {
  setMap(levels[level])
  playerdirection = "d"
})  
onInput("j", () => {
  level = 0
  setMap(levels[level])
  playerdirection = "d"
  clearText()
})  
afterInput(() => {
  if(inputtype == "m"){
    let player = getFirst(prevdir)
    let x = player.x
    let y = player.y
    player.remove()
    addSprite(x,y,playerdirection)
    let flagsprite = getFirst(flag)
    let boxes = getAll(box)
    if(player.x == flagsprite.x && player.y == flagsprite.y && boxes.length == 0){
      playTune(tune`
123.96694214876032: C4^123.96694214876032,
123.96694214876032: D4^123.96694214876032,
123.96694214876032: E4^123.96694214876032,
123.96694214876032: F4^123.96694214876032,
123.96694214876032: G4^123.96694214876032,
123.96694214876032: A4^123.96694214876032,
123.96694214876032: B4^123.96694214876032,
123.96694214876032: C5^123.96694214876032,
2975.206611570248`)
      console.log("WIN")
      if(level < 9){ //set 10 to your level count
        level += 1
        setMap(levels[level])
        playerdirection = "d"
      }else{
        addText("You Win! \n Restart? (J)", { 
        x: 4,
        y: 4,
        color: color`2`
        })
        playTune(tune`
123.96694214876032: C4^123.96694214876032,
123.96694214876032: D4^123.96694214876032,
123.96694214876032: E4^123.96694214876032,
123.96694214876032: F4^123.96694214876032,
123.96694214876032: G4^123.96694214876032,
123.96694214876032: A4^123.96694214876032,
123.96694214876032: B4^123.96694214876032,
123.96694214876032: C5^123.96694214876032,
123.96694214876032: C4^123.96694214876032,
123.96694214876032: D4^123.96694214876032,
123.96694214876032: E4^123.96694214876032,
123.96694214876032: F4^123.96694214876032,
123.96694214876032: G4^123.96694214876032,
123.96694214876032: A4^123.96694214876032,
123.96694214876032: B4^123.96694214876032,
123.96694214876032: C5^123.96694214876032,
123.96694214876032: C4^123.96694214876032,
123.96694214876032: D4^123.96694214876032,
123.96694214876032: E4^123.96694214876032,
123.96694214876032: F4^123.96694214876032,
123.96694214876032: G4^123.96694214876032,
123.96694214876032: A4^123.96694214876032,
123.96694214876032: B4^123.96694214876032,
123.96694214876032: C5^123.96694214876032,
123.96694214876032: C4^123.96694214876032,
123.96694214876032: D4^123.96694214876032,
123.96694214876032: E4^123.96694214876032,
123.96694214876032: F4^123.96694214876032,
123.96694214876032: G4^123.96694214876032,
123.96694214876032: A4^123.96694214876032,
123.96694214876032: B4^123.96694214876032,
123.96694214876032: C5^123.96694214876032`)
      }
    }
  inputtype = null
  boxes = getAll(box)
  let goals = getAll(goal)
  for(let bo of boxes){
    for(let goa of goals){
      if(bo.x == goa.x && bo.y == goa.y){
        console.log(bo,goa)
        addSprite(bo.x,bo.y,wall)
        bo.remove()
        goa.remove()
      }
    }
  }
  }})
