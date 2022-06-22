/*
@title: test
*/
setLegend({
  "a": bitmap`
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr`,
  "b": bitmap`
gggggggggggggggg
ggggg..ggggggggg
gggg....gggggggg
ggg..ggg.ggggggg
gg..ggggg.gggggg
gg.ggggggg.ggggg
gg.gggggggg...gg
gg.gggggggg..ggg
gg.gggggggg.gggg
gg.ggggggg..gggg
gg..gggggg.ggggg
ggg..ggggg.ggggg
ggggg...g..ggggg
ggggggg...gggggg
gggggggggggggggg
gggggggggggggggg`,
    "p": bitmap`
................
................
................
................
............b...
......r.....b...
.....r......b...
.....r......b...
...brr......b...
...br......bb...
...bb......b....
....bbbbbbb.....
................
................
................
................`,
  "c": anyOf("a", "b"),
  "d": allOf("a", "b")
})

const map0 = map`
ab.
.b.
.d.
`
setBackground("p")
setMap(map0);

console.log(getGrid());
console.log(getTile(0, 0));
addSprite("d", 2, 0);
clearTile(2, 0);
addSprite("a", 2, 0);

const pat0 = `
  .b
  *d
`;


const match0 = match(pat0);

console.log("match0", match0);

setZOrder(["b", "a"])

setSolids(["a", "b"])

setPushables({
  "a": ["b"]
})


onInput("right", () => {
  getFirst("a").x += 1;
})


onInput("left", () => {
  getFirst("a").x -= 1;
})


onInput("up", () => {
  getFirst("a").y -= 1;
})

onInput("down", () => {
  getFirst("a").y += 1;
})



