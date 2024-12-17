/*
@title: Car Race
@author: saumil
@tags: ['strategy']
@addedOn: 2024-06-20

Collect all green stuff (grass) and go to the blue thing (the destination) 
*/

const car = 'c';
const destination = 'd';
const obstacle = 'o';
const road = 'r';
const grass = 'g';
const player = 'p';

setLegend(
  [car, bitmap`
................
.....44444......
...44.....44....
..4.........4...
.4....4.4....4..
4....44444....4.
4....4.4.4....4.
4...4444444...4.
4...4.4.4.4...4.
4..444444444..4.
.4.4.4.4.4.4.4..
..4.........4...
...44.....44....
.....44444......
................`],
  [destination, bitmap`
................
.....55555......
...55.....55....
..5.........5...
.5....5.5....5..
5....55555....5.
5....5.5.5....5.
5...5555555...5.
5...5.5.5.5...5.
5..555555555..5.
.5.5.5.5.5.5.5..
..5.........5...
...55.....55....
.....55555......
................`],
  [obstacle, bitmap`
................
.....11111......
...11.....11....
..1.........1...
.1....1.1....1..
1....11111....1.
1....1.1.1....1.
1...1111111...1.
1...1.1.1.1...1.
1..111111111..1.
.1.1.1.1.1.1.1..
..1.........1...
...11.....11....
.....11111......
................`],
  [grass, bitmap`
..4.........4...
...4.........4..
...44........4..
....4.........4.
....44........4.
.....4........4.
.....44......4..
.....44...4.....
.....444...4....
4.....44....4...
.4....44....4...
.4...444.....4..
.4...44......4..
.4...........4..
4...........4...
................`],
  [road, bitmap`
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
................
................
................`],
  [player, bitmap`
................
................
.....00000......
....0.....0.....
...0.0.0.0.0....
..0...000...0...
..0....0....0...
..0...000...0...
..0.0.0.0.0.0...
....0.....0.....
.....00000......
................
................
................
................`]
);

setSolids([player, obstacle, car]);
setPushables({
  [player]: []
});

let level = 0;
const levels = [
  map`
pgr
gor
ggd`,
  map`
pgggr
gorod
gggrr`,
  map`
pgogd
..gor
gorgr`,
  map`
gooogg
..o..g
gggggg
g.d.gg
g...gg
ggp.gg`,
  map`
gggggg
goooog
gpgggd
gororr`,
  map`
g........
g..g.g.p.
g.gg.gg..
.gg...g..
..o...go.
......oo.
..ooooo..
..od.....
ggggggggg`
];

let destinationPosition = null;

const setLevel = (lvl) => {
  setMap(levels[lvl]);
  destinationPosition = getFirst(destination); // Save the destination position
}

setLevel(level);

const pushPlayer = (dx, dy) => {
  const playerTile = getFirst(player);
  if (playerTile) {
    const newX = playerTile.x + dx;
    const newY = playerTile.y + dy;
    if (newX >= 0 && newX < width() && newY >= 0 && newY < height()) {
      const targetTile = getTile(newX, newY);
      if (!targetTile.some(tile => tile.type === obstacle) && !targetTile.some(tile => tile.type === car)) {
        clearTile(playerTile.x, playerTile.y);
        addSprite(newX, newY, player);
      }
    }
  }
};

const checkDestination = () => {
  const playerTile = getFirst(player);
  if (playerTile) {
    const targetTile = getTile(playerTile.x, playerTile.y);
    if (targetTile.some(tile => tile.type === destination)) {
      if (getAll(grass).length === 0) { // Check if all grass is collected
        setTimeout(() => {
          level++;
          if (level < levels.length) {
            setLevel(level);
          } else {
            addText("You win!", { y: 6, color: color`3` });
          }
        }, 200);
      } else {
        addText("Collect all grass!", { y: 15, color: color`3`, duration: 0.5 });
        addText("Press J to Reset", { y: 1, color: color`3`, duration: 0.5 });
        addSprite(destinationPosition.x, destinationPosition.y, destination);
      }
    }
  }
};

onInput('a', () => pushPlayer(-1, 0));
onInput('d', () => pushPlayer(1, 0));
onInput('w', () => pushPlayer(0, -1));
onInput('s', () => pushPlayer(0, 1));
onInput('j', () => setLevel(level)); // Reset the current level when 'j' is pressed

afterInput(() => {
  checkDestination();
});
