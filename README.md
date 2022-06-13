# A Tile Based Gamelab

We're experimenting with a tile based game engine.

The functions for making games are defined in `./engine/gamelab_functions.js`.

Check out the example games in `./games/`.

You can draw sprites using the pixel editor.

Go to `https://localhost:3000/pixel-editor`.

Draw your sprite and click print to get the sprite data string in the console.

# The Toolkit

### setScreenSize(x, y)

set the dimensions of the screen

### setLegend(spriteMap)

```
setLegend({ "a": new ImageData(...) })
```

create legend of single characters to sprite images

### setMap(string)

```
const level = `
  ...
  aaa
  .a.
`

setMap(level)
```

clears existing tiles and adds the tiles in map

### getCell(x, y)

gets all tiles in a specific cell

### addTile(x, y, type)

adds tile of given type into cell at x and y

### clearTile(x, y)

clears all tiles in x and y

### onInput(type, callback)

types can be "up" "down" "left" "right" "action"

```
onInput("right", () => {
  getAll("p")[0].x += 1;

  // match("p")[0][0].x += 1;
  // get("p").x += 1;
})
```

### setSolids(arr)

```
setSolids(["p", "r"]);
```

solids can't overlap with eachother

### setPushables(pushMap)

```
setPushables({ "p": ["r"] });
```

takes map and every key can push types in value

### replace(pattern0, pattern1, matchMap = {})

returns boolean of if it matched

```
replace("pp", "g.")

const matchMap = { 
  "_": t => t.type === "p" || t.type === "r", 
  "#": ["p", "r"] 
}

replace("p_", "g#", matchMap)
```


### afterInput(callback)

```
afterInput(_ => {
  if (swap(["p", "g"], "w").length) {
    console.log("you win");
  }
})
```



### getGrid()

returns map of form {
  x,y: [] // tiles in cell
}

### sprite(string)

### swap(type, type)

returns number of swaps

```
swap("a", "b");

// or

swap(["a", "b"], "c");

// or

swap("a", ["b", "c"]);

// or

swap(["a", "b"], ["c", "d"]);
```

### match(pattern, patternMap = {})

returns array of matches

```
match("p.");

// or

const matchMap = { 
  "_": t => t.type === "p" || t.type === "r", 
}

match("p_", matchMap);

```

### getAll(type)

returns all tiles of given type

### clear()

clears all tiles

### setZOrder(arr)

sets order of rendering

```
setZOrder(["p", "r"])
```

### setBackground(type)

sets the default background tile
only changes the visuals

### The Tile

Tiles have:
```
{
  x
  y
  type
  dx
  dy
}
```
Can set x y type

dx and dy are cleared afterInputs

to remove tile use tile.remove() or set tile.type = "."

# TODO

by wednesday 1 - 2

### Leo
- [x] add name editing
- [ ] add exporting
  - [x] js
  - [ ] html
  - [ ] link
- [ ] add local storage
- [x] add file loading
- [x] add sound playing to engine
- [x] add sprites to state from evaluation

### Lexi
- [x] tune editor
  - [x] text representation
  - [x] parity with current functionality
- [ ] change editor triggers to tagged template literals
  - [x] sprite(`...`) -> sprite`...`
  - [ ] code folding for above?
- [x] getting legend from sprites in state
- [x] fix bug with err-line getting overwritten on input (done jankily)

### Together
- [ ] refactor
- [ ] styles
  - [ ] docs

later

### Other
- [ ] finalize engine
- [ ] add samples
- [ ] upload flow
- [ ] game gallery
  - [ ] loading from game gallery
- [ ] hype site
- [ ] readme
- [ ] style editors
- [ ] establish design language
- [ ] fold editor outputs after closing editor
- [ ] editors blink when loading
- [ ] set color pallete

### Bugs
- [ ] when typing in browser console get: "Possible side-effect in debug-evaluate"
  - [ ] add error event handler
- [ ] tune gets cleared when you try to edit it
- [ ] Uncaught RangeError: Applying change set to a document with the wrong length
- [ ] when editting undersized sprite: "unknown color: undefined"






