/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: drumkit
@description: A basic drumkit thing. The sounds aren't very accurate & sometimes don't work, but it's the best I could do with Sprig's music system.
@author: qxvx
@tags: [music, drum, percussion, tool, utility]
@addedOn: 2025-00-00
*/

const player = "p"
const snare = tune`
54.249547920434: E4-54.249547920434 + F5-54.249547920434 + F4/54.249547920434 + C4/54.249547920434 + D4~54.249547920434,
1681.735985533454`
const bass = tune`
49.26108374384236: C4^49.26108374384236,
1527.0935960591132`
const chat = tune`
48.38709677419355: D5/48.38709677419355 + B4/48.38709677419355 + C5~48.38709677419355,
48.38709677419355: D5/48.38709677419355 + B4/48.38709677419355 + C5~48.38709677419355,
48.38709677419355: D5/48.38709677419355 + B4/48.38709677419355 + C5~48.38709677419355,
1403.225806451613`
const crash = tune`
44.576523031203564: A5/44.576523031203564,
44.576523031203564: A5/44.576523031203564,
44.576523031203564: A5-44.576523031203564,
44.576523031203564: A5-44.576523031203564,
44.576523031203564: A5^44.576523031203564,
44.576523031203564: A5^44.576523031203564,
44.576523031203564: A5^44.576523031203564,
44.576523031203564: A5^44.576523031203564,
1069.8365527488854`
const ride = tune`
361.4457831325301: D5-361.4457831325301,
11204.819277108432`
const clap = tune`
156.25: D4-156.25 + F4-156.25 + E4/156.25 + C4-156.25,
4843.75`
const ohat = tune`
37.5: B5/37.5 + G5/37.5 + A5~37.5,
37.5: B5/37.5 + G5/37.5 + A5~37.5,
37.5: B5/37.5 + G5/37.5 + A5~37.5,
37.5: B5/37.5 + G5/37.5 + A5~37.5,
37.5: B5/37.5 + G5/37.5 + A5~37.5,
37.5: B5/37.5 + A5~37.5 + G5/37.5,
37.5: A5~37.5 + B5/37.5 + G5/37.5,
937.5`
const bell = tune`
500: D5^500 + E5^500,
15500`

setLegend(
  [ player, bitmap`
11LL11LL11LL11LL
1LL11LL11LL11LL1
LL11LL11LL11LL11
L11LL11LL11LL11L
11LL11LL11LL11LL
1LL11LL11LL11LL1
LL11LL11LL11LL11
L11LL11LL11LL11L
11LL11LL11LL11LL
1LL11LL11LL11LL1
LL11LL11LL11LL11
L11LL11LL11LL11L
11LL11LL11LL11LL
1LL11LL11LL11LL1
LL11LL11LL11LL11
L11LL11LL11LL11L` ]
)

setSolids([])

let level = 0
const levels = [
  map`
p`
]

setMap(levels[level])
addText("W = Snare", { x: 0, y: 0, color: color`9`})
addText("A = Bass", { x: 0, y: 1, color: color`9`})
addText("S = Closed Hat", { x: 0, y: 2, color: color`9`})
addText("D = Crash", { x: 0, y: 3, color: color`9`})
addText("I = Ride", { x: 0, y: 4, color: color`9`})
addText("J = Clap", { x: 0, y: 5, color: color`9`})
addText("K = Open Hat", { x: 0, y: 6, color: color`9`})
addText("L = Bell", { x: 0, y: 7, color: color`9`})

setPushables({
  [ player ]: []
})

onInput("w", () => {
  playTune(snare)
})
onInput("a", () => {
  playTune(bass)
})
onInput("s", () => {
  playTune(chat)
})
onInput("d", () => {
  playTune(crash)
})
onInput("i", () => {
  playTune(ride)
})
onInput("j", () => {
  playTune(clap)
})
onInput("k", () => {
  playTune(ohat)
})
onInput("l", () => {
  playTune(bell)
})

afterInput(() => {
  
})