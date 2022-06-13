# The Toolkit

## Level Design

Game Lab games are made of a grid of square "tiles". Any element that you want to draw on a tile is a pixelated drawing called a sprite. To use your sprites anywhere we need a way to to keepo track of them, Game Lab's way is a single character name for each sprite that's used as a key.

### setLegend(spriteMap)

Tell Game Lab what sprites are available for your game:

```js
setLegend({ "a": sprite`...` })
```

To make a sprite, type `sprite` and then two backticks (`` ` ``), and then click on the highlighted "sprite" button to edit your drawing:

![](https://doggo.ninja/c9Jc6f.png)

### setBackground(spriteKey)

Repeats a sprite as the background of the game:

```js
setBackground("a")
```

This only changes the visuals, won't affect any in-game interactions and never counts as solid— things never collide with it.

### setMap(string)

Creating a level is the same as designing a sprite:

```js
map``
```

Instead of a legend, you should store levels in a variable. You can call `setMap` to clear the game and load a new level:

```js
const level = map`...`
setMap(level)
```

You may want to keep track of multiple levels using an array to switch between them mid-game:

```js
const levels = [
    map`...`,
    map`...`,
    // etc.
]

setMap(levels[0])
```

### setSolids(spriteKeys)

Solid sprites can't overlap with eachother. One example is creating walls— both the wall sprite and the player sprite should be solids to enable collisions between them:

```js
setSolids(["p", "w"]);
```

### setPushables(pushMap)

Want sprites to be able to push around other sprites? Use `setPushables` to map a sprite key to a list of sprites that it can push around:

```js
setPushables({ "p": ["r"] });
```

> **Watch out!** Make sure all your pushables are also marked as solids or they won't be pushed around.

## User Input

Game Lab has four directional controls: `up`, `down`, `left`, and `right`

And four action buttons: `i`, `j`, `k`, and `l`

### onInput(type, callback)

Do something when the player presses one:

```js
onInput("right", () => {
    getFirst("p").x += 1
})
```

### afterInput(callback)

oninput + collisions -> afterinput

```js
afterInput(_ => {
    if (swap(["p", "g"], "w").length) {
        console.log("you win");
    }
})
```

## Tile Interactions

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

dx and dy are cleared on every input - prob won't need

### getCell(x, y)

gets all tiles in a specific cell

### addTile(x, y, type)

adds tile of given type into cell at x and y

### clearTile(x, y)

clears all tiles in x and y

### getAll(type)

returns all tiles of given type, if no type then returns all tiles

### getFirst(type)

returns first tile of a given type

### clear()

clears all tiles

### setZOrder(arr)

sets order of rendering

```
setZOrder(["p", "r"])
```

## Pattern Matching

### replacePattern(pattern0, pattern1, matchMap = {})

returns boolean of if it matched

finds pattern0, creates pattern1 out of thin air and replaces it  
works multiline too

```js
replace("pp", "g.")

// not used often
const matchMap = { 
    "_": t => t.type === "p" || t.type === "r", 
    "#": ["p", "r"] 
}

replace("p_", "g#", matchMap)
```

### replaceStack(type, type)

for every tile with all elements, replace with new elements conjured out of thin air

```js
swap("a", "b");

// or

swap(["a", "b"], "c");

// or

swap("a", ["b", "c"]);

// or

swap(["a", "b"], ["c", "d"]);
```

### matchStack(type)

CREATE parity

### matchPattern(pattern, patternMap = {})

returns array of array of tiles

```js
match("p.");

// or

const matchMap = { 
    "_": t => t.type === "p" || t.type === "r", 
}

match("p_", matchMap);
```

### Tunes & Sound Effects

Sounds can be created with 

```
tune`...`;
```

They can be played with 

```
playTune(tune, n = 1);
``` 

where `n` is how many times the sound is repeated. 
To repeat indefinitely use

```
playTune(tune, Infinity);
```

End the sound like so

```
const t = playTune(tune, Infinity);
t.end();
```