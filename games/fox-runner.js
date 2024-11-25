/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Fox Runner
@author: PGtheVRguy
@tags: ['maze']
@addedOn: 2024-11-12
*/


const player = "p"
const noTile = "n"
const wall = "w"
const eatenTile = "e"
const goal = "g"
const spike = "s"

var dir = 0;
var pelletsEaten = 0;

setLegend(
  [ player, bitmap`
0000000000000000
0000000099009900
0000000099009900
0000000992099200
0000000922092200
0000000922092200
0000000999909090
0000000999909090
000000222222CC22
2229002222222222
2299999999999900
2999999999999900
0000999922299900
0000909000090900
0000C0C0000C0C00
0000000000000000` ],
  [ noTile, bitmap`
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
0000000000000000` ],
  [ wall, bitmap`
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
5555555555555555` ],
  [ eatenTile, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666` ],
  [ goal, bitmap`
0000000000000000
0000000660000000
0000666660000000
0066666660000000
0666666660000000
0066666660000000
0000666660000000
0000000660000000
0000000660000000
0000000660000000
0000000660000000
0000000660000000
0000000660000000
0000000660000000
0000066666600000
0006666666666000` ],
  [ spike, bitmap`
0000000330000000
0000003333000000
0000033333300000
0000333333330000
0003333333333000
0033333333333300
0333333333333330
3333333333333333
3333333333333333
0333333333333330
0033333333333300
0003333333333000
0000333333330000
0000033333300000
0000003333000000
0000000330000000` ]
)
setSolids([wall, player])

let level = 1
const levels = [
  map`
wwwwwwwwwwwwwwwwwwwwwwwwwwww
wffffffffffffwwffffffffffffw
wfwwwwfwwwwwfwwfwwwwwfwwwwfw
wswwwwfwwwwwfwwfwwwwwfwwwwsw
wfwwwwfwwwwwfwwfwwwwwfwwwwfw
wffffffffffffffffffffffffffw
wfwwwwfwwfwwwwwwwwfwwfwwwwfw
wfwwwwfwwfwwwwwwwwfwwfwwwwfw
wffffffwwffffwwffffwwffffffw
wwwwwwfwwwwwgwwgwwwwwfwwwwww
wwwwwwfwwwwwgwwgwwwwwfwwwwww
wwwwwwfwwgggggiggggwwfwwwwww
wwwwwwfwwgwwwggwwwgwwfwwwwww
wwwwwwfwwgwggggggwgwwfwwwwww
ggggggfgggwggggggwgggfgggggg
wwwwwwfwwgwggggggwgwwfwwwwww
wwwwwwfwwgwwwwwwwwgwwfwwwwww
wwwwwwfwwggggggggggwwfwwwwww
wwwwwwfwwgwwwwwwwwgwwfwwwwww
wwwwwwfwwgwwwwwwwwgwwfwwwwww
wffffffffffffwwffffffffffffw
wfwwwwfwwwwwfwwfwwwwwfwwwwfw
wfwwwwfwwwwwfwwfwwwwwfwwwwfw
wsffwwfffffffpgfffffffwwffsw
wwwfwwfwwfwwwwwwwwfwwfwwfwww
wwwfwwfwwfwwwwwwwwfwwfwwfwww
wffffffwwffffwwffffwwffffffw
wfwwwwwwwwwwfwwfwwwwwwwwwwfw
wfwwwwwwwwwwfwwfwwwwwwwwwwfw
wffffffffffffffffffffffffffw
wwwwwwwwwwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwww
wwwwwwwwww
wwwwwwwwww
wpnnnnnngw
wwwwwwwwww
wwwwwwwwww
wwwwwwwwww
wwwwwwwwww`,
  map`
wwwwwwwwww
wwpwnnnnnw
wwnwnwwwnw
wwnwnwgwnw
wwnwnnnwnw
wwnwwwwwnw
wwnnnnnnnw
wwwwwwwwww`,
  map`
wwwwwwwwww
wwwgnnnnsw
wwwwwwwnww
wpnnnnnnww
wwwwwwwsww
wwwwwwwwww
wwwwwwwwww`,
  map`
wwwwwwwwwwwwww
wwwwwnnnnnnnww
wwwwwnwwnwwnww
wwwwwnwwnwwnww
wpnnnnnnnwwnww
wwwwswwwwwwnww
wwwwnnnnswwnww
wgwwnwwnwwwnww
wnwwnwwnwwwnww
wnwwnwwnwwwnww
wnnnnwwnnnnnsw
wwwwwwwwwwwwww`,
  map`
wwwwwswwwswwwsw
wwwnnnwnnnwnnnw
wwwnwnwnwnwnwnw
wwwnwnwnwnwnwnw
wwwnwnwnwnwnwnw
wwwnwnwnwnwnwnw
wpnnwnwnwnwnwnw
wwwwwnwnwnwnwnw
wwwwwnwnwnwnwnw
wwwwsnnnwnnnwgw
wwwwwwwswwwswww`,
  map`
wwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwww
wwwwwwwwwsnswwwwww
wwwwwwwwwwnwwwwwgw
wwwwwwwwwwnwwnnnnw
wwwwnnnnnnnwsnssns
wwwwnnnnwwnssnssns
wwwwwwwnwwnssnssns
wwwwwwwnwwnnnnwwww
wwwwwwwnwwwssswwww
wwwwwwwpwwwwwwwwww`,
  map`
wwwwwwwwwwsswww
spsnwnnnwnnnwng
snsnwnwnsnsnwnw
snnnwnwnsnsnnnw
wwsnnnwnnnwnnww`,
  map`
wwsspwwwssswwww
wnnnnwsnnnnwwww
wnnnnswnssnwwww
wnsswswnssnwsww
wnnnnnnnwsnwnnw
wnnnnnnwwwnnnnw
wwssssswwwwwsnw
wwwwwwgnnnnnnnw
wwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwww
wnnnwnnnnnwnnnnnwgw
wnwnwnwnwnwwwnwnwnw
wnwnwnwnwnwnnnwnnnw
wnwnwnwnwnwnwnwwwnw
wpwnnnwnnnnnwnwwwnw
wwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwsswwwwwwww
wwwwwwwwwwwwwnnnwwwwwww
wpwwwwwwwnnnnnwnnwwwwww
wnwwwwwwnnnwwwwwnwwwwww
wnwwwwwwnnnnnnnnnnwwwww
wnnnwwwwwwnwwwwwnnwwwww
wwwnwwwwwwnwwwwwngwwwww
wwwnwwwwwwnwwwwwwwwwwww
wwnnnnnnnnnnwwwwwwwwwww
wwnnswwwwwnnswwwwwwwwww
wwnnswwwwwnnswwwwwwwwww
wwwwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwwwwwwwwwww
wnnnnnnnnnnnnwwnnnnnnnnnnnnw
wnwwwwwwwwwwnwwnwwwwwwwwwwnw
wnwwwwwwwwwwnwwnwwwwwwwwwwnw
wnwwwwwwwwwwnwwnwwwwwwwwwwnw
wnnnnnnnnnnnnnnnnnnnnnnnnnnw
wnwwwwnwwwwwwwwwwwwwwnwwwwnw
wnwwwwnwwwwwwwwwwwwwwnwwwwnw
wnnnnnnnnnnnnwwnnnnnnnnnnnnw
wwwwwwnwwwwwnwwnwwwwwnwwwwww
wnnnnnnwwwwwnwwnwwwwwnnnnnnw
wnwwwwnwwnnnnnnnnnnwwnwwwwnw
wnwwwwnwwnwwwwwwwwnwwnwwwwnw
wnwwwwnwwnwwwwwwwwnwwnwwwwnw
wnwwwwnwwnwwwwwwwwnwwnwwwwnw
wnwwwwnwwnwwwwwwwwnwwnwwwwnw
wnwwwwnwwnwwwwwwwwnwwnwwwwnw
wnwwwwnwwnnnnnnnnnnwwnwwwwnw
wnwwwwnwwnnwwwwwwnnwwnwwwwnw
wnwwwwnwwnnwwwwwwnnwwnwwwwnw
wnwwwwnnnnnwwwwwwnnnnnwwwwnw
wnwwwwnwwwnwwwwwwnwwwnwwwwnw
wnwwwwnwwwnwwwwwwnwwwnwwwwnw
wnwwwwnwwwnnnpgnnnwwwnwwwwnw
wnwwwwnwwnwwwwwwwwnwwnwwwwnw
wnwwwwnwwnwwwwwwwwnwwnwwwwnw
wnwwwwnwwnnnnwwnnnnwwnwwwwnw
wnwwwwnwwwwwnwwnwwwwwnwwwwnw
wnwwwwnwwwwwnwwnwwwwwnwwwwnw
wnnnnnnnnnnnnwwnnnnnnnnnnnnw
wwwwwwwwwwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwpnngwwwww
wnwwwwwwnwwwwwwww
wnnnnnnnnwwwwwwww
wwwnwwwwnwwwwwwww
wwwnwwwwnwwwwwwww
wwwnnnnnnnnnnnnww
wwwwwwwwwwwwwwnww
wnnnnwwwnnnnnnnnn
wnwwnwwwnwwwwwnwn
wnnnnnnnnnnwnnnwn
wwwnnnnnnwnwnwwwn
wwwnwwwwswnwnwwwn
wwwnnnnnnnnnnswwn
wwwswwwwwwnwwwwwn
wwwwwwwwwwnnnnnnn
wwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwww
wwwwwwwwwwwww
wwwwwwwwwwwww
wwwwwwwwwwwww
wwwwwwpwwwwww
wwwwwwwwwwwww
wwwwwwwwwwwww
wwwwwwwwwwwww
wwwwwwwwwwwww`
]

const levelText = [
  'FOX RUNNER\n PRESS D',
  'USE WASD',
  'DONT TOUCH RED',
  'FILL IN ALL SPOTS',
  'GOODLUCK',
  'RED SPOTS',
  'CAREFUL',
  'CAREFUL (pt2)',
  'NOAH',
  'IDEAS? NONE!',
  'ALMOST PACMAN',
  'ALMOST THERE!',
  'YOU WIN!!'

]

setMap(levels[level])

setPushables({
  [ player ]: []
})

onInput("s", () => {
  oldDir = dir
  dir = 1
})
onInput("w", () => {
  oldDir = dir
  dir = 2
})
onInput("d", () => {
  oldDir = dir
  dir = 3
})
onInput("a", () => {
  
  dir = 4
})

//Player movement





afterInput(() => {
})

const movePlayer = () => {
  const playerSprite = getFirst(player);

  // Check for collision with "pellet" sprite
  //const collidingPellet = getTile(playerSprite.x, playerSprite.y).find(sprite => sprite.type === "pellet");

  // Check for collision with "strongPellet" sprite
  const plX = playerSprite.x
  const plY = playerSprite.y

  const targetTile = getTile(plX, plY)
  if(targetTile.find(sprite => sprite.type == noTile))
  {
    console.log("FOUND TILE!")
    clearTile(plX, plY)
    addSprite(plX, plY, eatenTile)
    addSprite(plX, plY, player)
    pelletsEaten++;
  }
  if(targetTile.find(sprite => sprite.type == goal))
  {
    const hasSpecificTile = isSpecificTilePresent();
    if (hasSpecificTile) {
      console.log("The specific tile type is present on the screen.");
    } else {
      console.log("The specific tile type is not present on the screen.");
      level++;
      setMap(levels[level])
      clearText();
    }

  }
  if(targetTile.find(sprite => sprite.type == spike))
  {
    setMap(levels[level])
  }
  console.log(levels[level])

  // If collision with "strongPellet" sprite occurs, handle differently if needed

  // Update the player's position based on the input direction
  if (dir === 1) {
    getFirst(player).y += 1; // Move the player downwards
  } else if (dir === 2) {
    getFirst(player).y -= 1; // Move the player upwards
  } else if (dir === 3) {
    getFirst(player).x += 1; // Move the player right
  } else if (dir === 4) {
    getFirst(player).x -= 1; // Move the player left
  }

  
}

const drawGUI = () => {
  addText("Level " + level, { x: 0, y: 0, color: color`2` }); // Update score display
  if(levelText.length > level-1)
  {
    addText(levelText[level-1], {x: 0, y:2, color: '2'});
  }
}
const isSpecificTilePresent = () => {
  for (let row = 0; row < height(); row++) {
    for (let col = 0; col < width(); col++) {
      const currentTile = getTile(col, row);

      // Check if the current tile contains the specific tile type
      if (currentTile.some(sprite => sprite.type === noTile)) {
        return true;
      }
    }
  }
  return false;
}




let playerMovementInterval = setInterval(movePlayer, 30);
let drawGUIInterval = setInterval(drawGUI, 1);
const playerSprite = getFirst(player);

addSprite(playerSprite.x, playerSprite.y, eatenTile)

//playTune(melody)

