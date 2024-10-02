/*
@title: Font Explorer
@author: Shane Celis
@tags: ['utility']
@addedOn: 2023-01-04
             @shanecelis
*/

const cursor = "c";

const TEXT_WIDTH = 20;
const TEXT_HEIGHT = 16;

setLegend(
  [ cursor, bitmap`
9999999999999999
9..............9
9..............9
9..............9
9..............9
9..............9
9..............9
9..............9
9..............9
9..............9
9..............9
9..............9
9..............9
9..............9
9..............9
9999999999999999`]
);

const levels = [
  map`
....................
.c..................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................`,
];

setMap(levels[0]);

var begin = 0;

const rowCount = 7;
const columnCount = 10;

function _onInput(c) {
  let sprite = getFirst(cursor);
  switch (c) {
    case 'w':
      if (sprite.y - 2 > 0)
        sprite.y -= 2;
      break;
    case 'a':
      if (sprite.x - 2 < 0 && begin > 0) {
        begin -= rowCount * columnCount;
        sprite.x = columnCount * 2 - 1;
      } else if (sprite.x - 2 > 0) {
        sprite.x -= 2;
      }
      break;
    case 's':
      let j = (sprite.y - 1) / 2;
      if (j < rowCount - 1) {
        sprite.y += 2;
      }
      break;
    case 'd':
      if (sprite.x + 2 >= width() && begin < 210) {
        begin += rowCount * columnCount;
        sprite.x = 1;
      } else {
        sprite.x += 2;
      }
      break;
  }
}

function fromCodePoint(point) {
  switch (point) {
    case 10:
      // I bet a backslash. (Oops.)
      // return "\n";

      // I raise you two backslashes.
      // return "\\n";

      // I raise you three backslashes!
      return String.fromCodePoint(21) + "n";
      // (No backslash in character set. It shows up as pipe | actually. This uses a
      // triple-backslash-like \\\ like glyph instead.)
    case 32:
      // Not sure what this is. ASCII says it's control Z.
      return "^Z";
    default:
      return String.fromCodePoint(Math.max(0, point));
  }
}

function draw() {
  clearText();
  let k = begin;
  for (let i = 0; i < columnCount; i++) {
    for (let j = 0; j < rowCount; j++) {
      addText(String.fromCodePoint(k++), { x: 2 * i + 1, y: 2 * j + 1, color: 0 });
    }
  }
  let i = (getFirst(cursor).x - 1) / 2;
  let j = (getFirst(cursor).y - 1) / 2;
  let point = i * rowCount + j + begin;
  if (point < 256)
    addText("char " + fromCodePoint(point) + " int " + point, { x: 1, y: 15 });
}

onInput("w", () => _onInput('w'));
onInput("a", () => _onInput('a'));
onInput("s", () => _onInput('s'));
onInput("d", () => _onInput('d'));

afterInput(draw);

draw();
