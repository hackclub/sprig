/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Flying Fish
@author: Reese Ochitwa
@tags: []
@addedOn: 2024-08-28
*/

const player = "p"
const platform = "f"
const cloud = "c"
const sky = "s"
const grass = "g"
const border = "b"
const trophy = "t"
const gravity = 1;


setLegend(
  [ player, bitmap`
................
................
................
................
................
9......9........
69....99........
999..696......3.
.939939....99933
..9969....99209.
...39..99999229.
...999693999999.
....9399999999..
.....99699399...
................
................` ],
  [ platform, bitmap`
HHHHHHHH88888888
HHHHHHHH88888888
HHHHHHHH88888888
HHHHHHHH88888888
HHHHHHHH88888888
HHHHHHHH88888888
HHHHHHHH88888888
HHHHHHHH88888888
88888888HHHHHHHH
88888888HHHHHHHH
88888888HHHHHHHH
88888888HHHHHHHH
88888888HHHHHHHH
88888888HHHHHHHH
88888888HHHHHHHH
88888888HHHHHHHH`],
  [ grass, bitmap `
4444444444444444
4444444444D44444
44D444444DD44444
44DD44DDDDD44DD4
4DDC44DCCCDD44D4
DCCCC4DCCCCDD4DD
CCCCCDDCCCCCDCCD
CCCCCCDCCCCCCCCD
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`
],
[ sky, bitmap `
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
7777777777777777`],
[cloud, bitmap `
................
................
................
....22222.......
...2222222......
...222222122....
...2222212222...
..22221122222...
.222222222222...
.222212222221...
.22221122221....
.1122211111.....
..11211.........
...111..........
................
................`], 
  [ border , bitmap `
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
[trophy , bitmap`
6699999999999966
6699999999999966
6666699999966666
6666666666666666
6666666666666666
6666688668866666
.66668888886666.
..666688886666..
...6668888666...
...6666886666...
....66666666....
.....666666.....
.....666666.....
.....666666.....
.....666666.....
.....666666.....`])

setSolids([platform, player, grass, border])
setBackground([sky])

let level = 0
const levels = [
  map`
bbbbbsbbbbbb
bsscsssssssb
bsssssssscsb
bsffffsssssb
bssssssssssb
bscssssfffsb
bssssssssssb
bssssssssssb
bsssffffsssb
bpsssssssssb
bggggggggggb
bbbbbbbbbbbb`,
  map`
bbbsbbbbbbbb
bssssscssssb
bssssssssssb
bfffsssssffb
bsssssssffsb
bsssscsffssb
bcssssffsssb
bfffsssssssb
bssssssssssb
bssssssscssb
bffffpfffffb
bbbbbbbbbbbb`,
  map`
bbbbbbbbsbbb
bssssscssssb
bssssssssssb
bsssssfffssb
bssssssssssb
bsssscsssssb
bcsssssssssb
bssssssssffb
bsfffffssssb
bssssssscssb
bsspssssfffb
bbbbbbbbbbbb`,
  map`
bbbsbbbbbbbb
bssssscssssb
bssssssssssb
bsffsssssssb
bffffssssssb
bsssscsssssb
bcssssssfffb
bsssssfffssb
bssssssssssb
bssssssscssb
bffffssspssb
bbbbbbbbbbbb`,
  map`
bbbbbbsbbbbb
bssssscssssb
bssssssssssb
bssssssssssb
bffffffssssb
bsssscsssssb
bcssssssfffb
bssssssssssb
bssssssssssb
bssssfffcssb
bsspsssssssb
bbbbbbbbbbbb`,
  map`
bbbbbbbbbbsb
bssssssssssb
bssssssssssb
bssssssssffb
bssscsffffsb
bssssssssssb
bssssssssssb
bfffffsssssb
bsssssssscsb
bscsssssfffb
bssssspssssb
bbbbbbbbbbbb`,
  map`
bsbbbbbbbbbb
bssssscssssb
bssssssssssb
bfsssssssssb
bffssssssssb
bsffscsssssb
bcsssssfffsb
bssssssssssb
bssssssssssb
bsfffffscssb
bssssssssspb
bbbbbbbbbbbb`,
  
  map`
bbbbbbbbbbb
bscsssssssb
bssssscsstb
bssssfffffb
bcssssssssb
bsssssssssb
bffffsssssb
bssssssscsb
bsssssssssb
bpsssfffffb
bbbbbbbbbbb`
  
]
setMap(levels[level])


const checkLevel = setInterval(() => {
  if (getFirst(player).y <= 0){
  level++;
  setMap(levels[level])
}
  if(getFirst(player).y === 2 && getFirst(player).x === 9 && level === 7){
    setMap(map`
ssssssssssssssss
ssssssssssssssss
ssssssssssssssss
sbsssssbssbsssbs
ssbsssbsssbbssbs
ssbsssbsbsbsbsbs
ssbsbsbsbsbsbsbs
ssbsbsbsbsbsbsbs
sssbsbssbsbssbbs
sssbsbssbsbsssbs
ssssssssssssssss
ssssssssssssssss
ssssssssssssssss
ssssssssssssssss
pssstssstssstsss
gggggggggggggggg`)}

},100)

onInput("s", () => {
  getFirst(player).y += 1
})
onInput("w", () => {
  for (let i = 0; i < 4;i++){
     setTimeout(() => { getFirst(player).y -= 1 }, i * 100); 
}
  for (let i = 0; i < 4;i++){
     setTimeout(() => { getFirst(player).y += gravity }, i * 400); 
}
})

onInput("d", () => {
  getFirst(player).x += 1
})
onInput("a", () => {
  getFirst(player).x -= 1
})

afterInput(() => {

})

