/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: meow
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"
const strawberry = "s"
const backgroundPink = "b"

let prevPlayerX = 0;
let prevPlayerY = 0;

onInput("w", () => {
  getFirst(player).y -= 1; // negative y is upwards
});

onInput("a", () => {
  getFirst(player).x -= 1;
});

onInput("s", () => {
  getFirst(player).y += 1; // positive y is downwards
});

onInput("d", () => {
  getFirst(player).x += 1;
});

setLegend(
  [ player, bitmap`
HHHHHHHHHHHHHHHH
H88H88H88H88H88H
H8LLL888888LLL8H
HL222L8888L222LH
HL202L8888L202LH
HL222L8888L222LH
HHLLL888888LLLHH
H8888CCCCCC8888H
H888C333333C888H
HH88C333333C88HH
H888C303303C888H
H888C330033C888H
HH88C333333C88HH
H888C3CCCC3C888H
H88HCCC88CCCH88H
HHHHHHHHHHHHHHHH` ],
  [ strawberry, bitmap`
888888888888888H
8888DDD88888888H
8888D4DD8888888H
8888DD4DD888888H
88888DD4D888888H
8888CCCDDCCCC88H
88CC333333333C8H
8C336336333633CH
8C333333333333CH
8C333033630336CH
8C363333333333CH
88CC363033336CCH
8888C333363CC88H
88888CC33CC8888H
8888888CC888888H
8888HHHHHHHHHHHH` ],
  [ backgroundPink, bitmap`
HHHHHHHHHHHHHHHH
H88H88H88H88H88H
H88888888888888H
HH888888888888HH
H88888888888888H
H888HHH88HHH888H
HH8H888HH888H8HH
H88H88888828H88H
H88H88888828H88H
HH88H888888H88HH
H8888H8888H8888H
H88888H88H88888H
HH88888HH88888HH
H88888888888888H
H88H88H88H88H88H
HHHHHHHHHHHHHHHH` ]
)

setSolids([  ])

let level = 0
const levels = [
  map`
bbbbbbbbbb
bsbbsbbbbb
bbbbbbbbsb
bsbbsbbsbb
bbbbbbbbbb
bbbbsbbbsb
bsbbbbbbbb
bbbbbsbbbb
bbbpbbbsbb
bbbbbbbbbb`
]

setMap(levels[level])

setPushables({
  [ player ]: [ strawberry, player ]
})

afterInput(() => {
   const playerSprite = getFirst(player);
  const playerX = playerSprite.x;
  const playerY = playerSprite.y;

  const prevPlayerTile = getTile(prevPlayerX, prevPlayerY);
  prevPlayerTile.forEach(sprite => {
    // Fill the previous player position with the background color
    sprite.type = backgroundPink;
  });

  const playerTile = getTile(playerX, playerY);
  playerTile.forEach(sprite => {
    // If the sprite on the player's tile is a strawberry, replace it with backgroundPink
    if (sprite.type === strawberry) {
      sprite.type = backgroundPink;
      console.log("Yum! Strawberry eaten and spot filled with background.");
    }
  });

  prevPlayerX = playerX;
  prevPlayerY = playerY;

})