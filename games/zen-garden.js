import { init } from "../engine/gamelab_functions.js";

const canvas = document.querySelector(".zen-garden");

const {
  setScreenSize,
  setLegend, 
  setMap, 
  getCell,
  addTile, 
  clearTile, 
  setSolids,
  setPushables, 
  replace, 
  onInput,
  afterInput, 
  getGrid,
  getAllTiles, 
  clear, 
  setZOrder, 
  sprite,
  swap,
  match,
  setBackground,
  getTile
} = init(canvas);


setScreenSize(500, 500*.8)

setLegend({
  "d": sprite(`
................
................
.......0000.....
.......0ggg0....
......0ggggg0...
......0gggbgr...
......0gggggrr..
.......0gggg0...
..00000ggggg0...
..0ggggggggg0...
..0ggggggggg0...
...0ggggggg0....
....0ggggg00....
.....00000......
......00.00.....
................

    `),
  "w": sprite("b"),
  "b": sprite("0"),
  "r": sprite(`
................
................
................
......rrrrr.....
.....rrrrrrr....
....rrrrrrrrr...
....rrrrrrrrr...
....rrrrrrrrr...
....rrrrrrrrr...
....rrrrrrrrr...
....rrrrrrrrr...
.....rrrrrrr....
......rrrrr.....
................
................
................
    `),
    "g": sprite(`
................
................
................
......ggggg.....
.....ggggggg....
....ggggggggg...
....ggggggggg...
....ggggggggg...
....ggggggggg...
....ggggggggg...
....ggggggggg...
.....ggggggg....
......ggggg.....
................
................
................
    `),
    // x: combine("g", "h")
})

const water = "w";

setBackground(water)

const map = `
bbbbbbbbbb
bd.b.....b
b..b.b...b
b..b.b...b
b....b..rb
bbbbbbbbbb
`

setMap(map, { x: [ "b", "c" ] }); // want to be and

match(`aa`, { 
  a: "bx", // want to be or
  a: (t) => t.type === "b" || t.type === "x",
})

swap("l", ["d", "r"])

setSolids(["d", "r"])
// setLayers(["a", "b"], ["b", "c"])

setZOrder(["d", "b","g", "r"])



onInput("up", _ => {
  getTile("d").y -= 1;
})

onInput("down", _ => {
  getTile("d").y += 1;
})

onInput("left", _ => {
  getTile("d").x -= 1;
})

onInput("right", _ => {
  getTile("d").x += 1;
})

/*
onRight(() => {
  getTile("d").x += 1;
})



window.addEventListener('resize',resize);
frame.ondragover = allowDrop;
frame.ondrop = handleDropFile;

function handleRight() {
  getTile("d").x += 1;
}

onRight = handleRight;

onRight(handleRight);

onInput("right", handleRight);

onInput({
  right: handleRight,
  left: handleLeft,
  up: handleUp,
  down: handleDown
})
*/

afterInput(_ => {

  const swapped = swap(["d", "r"], ["d", "g"]);

  if (swapped) {
    console.log("you win");
  }

})


