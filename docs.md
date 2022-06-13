# The Toolkit

## Level Design

Game Lab games are made of a grid of square "cells". Each cell can contain multiple overlapping "sprites" for in-game elements like walls or the player, each one represented by a pixelated drawing called a "bitmap".

Each bitmap has a single character name used as a key to keep track of them in the map. When developing your game you can also use this key to create and find sprites.

### setLegend(bitmaps)

Tell Game Lab what bitmaps are available your game:

```js
setLegend({ "a": bitmap`...` })
```

To create a new bitmap, type `bitmap` and then two backticks (`` ` ``). Click on the highlighted "bitmap" button to edit your drawing:

Sprite trigger button screenshot

### setBackground(bitmapKey)

Tiles a bitmap as the background of the game:

```js
setBackground("a")
```

This won't create a sprite— in other words, it only changes the visuals and won't affect in-game interactions like collisions.

### setMap(string)

Designing a level is like drawing a bitmap:

```js
map``
```

Levels don't have to be kept track of in a legend, you should store them in a variable yourself. You can call `setMap` to clear the game and load a new level:

```js
const level = map`...`
setMap(level)
```

You might want to keep track of multiple levels using an array to switch between them mid-game:

```js
const levels = [
    map`...`,
    map`...`,
    // etc.
]
setMap(levels[0])

// Later:
setMap(levels[1])
```

### setSolids(bitmapKey)

Solid sprites can't overlap with each other. This is useful for, for example, creating walls— both the wall and player bitmaps can be marked as solid to enable collisions between them:

```js
setSolids(["p", "w"]);
```

### setPushables(pushMap)

Want sprites to be able to push each other around? Use `setPushables` to map a bitmap key to a list of bitmaps that it can push around:

```js
setPushables({ "p": ["r"] });
```

> **Watch out!** Make sure everything you pass to `setPushables` is also marked as a solid or they won't be pushed around.
> 
> For more advanced usage, you could update the solids list in-game to enable and disable pushables dynamically.

### setZOrder(bitmapKeys)

Sets how sprites draw when stacked. Sprites earlier in the array are drawn on top of sprites after them.

```js
setZOrder(["p", "r"])
```

## User Input

Game Lab has four directional controls: `up`, `down`, `left`, and `right`

It also has four action buttons: `i`, `j`, `k`, and `l`

### onInput(type, callback)

Do something when the player presses a control:

```js
onInput("right", () => {
    // Move the player one cell to the right
    getFirst("p").x += 1
})
```

### afterInput(callback)

Runs after ever input event has finished being handled. Useful for tasks like checking win states:

```js
afterInput(() => {
    if (matchStack(["p", "g"])) {
        console.log("you win")
    }
})
```

## Sprites and Cells

Each cell can contain any number of sprites stacked on top of each other.

Sprites contain:
```
{
    bitmapKey
    x
    y
    dx
    dy
}
```

You can move the sprite by setting `x` and `y`. Collisions are checked; the value won't change if the sprite is being blocked by a solid object!

The `bitmapKey` can also be changed to update the rendered graphic and collision rules the sprite will follow.

```js
sprite.y += 1
sprite.bitmapKey = "p"
```

> **Note!** You probably won't need `dx` and `dy`, but we expose them for more advanced usage. They contain the *actual* moved distance of the sprite after collisions, and are cleared at the beginning and end of each input handler.

### getCell(x, y)

Returns a list of the sprites in the specified cell.

### addSprite(x, y, bitmapKey)

Creates a new sprite of the given type and inserts it at the front of a cell.

### clearCell(x, y)

Removes all sprites from the specified cell.

### clear()

Clears all cells in the game.

## Pattern Matching

The most powerful construct in Game Lab is pattern matching. These functions will serve as building blocks for every major feature in your game.

Simpler pattern matching constructs can be used to find all the sprites with a given bitmap key, or manipulate a stack of sprites.

More complex multi-cell pattern matching enables finding and manipulating multiple sprites at once by their relative positions to each other. This uses special syntax:

```js
// Two sprites of bitmap key "p" next to each other:
`pp`

// A sprite of type "p" up and to the left of a sprite of type "r":
`
p.
.r
`
```

> **Note!** The `.` works as a wildcard, matching sprites of any type or an empty cell. 
> 
> If you looked at the textual representation of maps, you'll notice this syntax is familiar. They're like little mini-levels used for building your levels!

### getAll(bitmapKey)

Returns all sprites of the given type. If no bitmap key is specified, it returns all the sprites in the game.

### getFirst(bitmapKey)

Returns the first sprite of a given type. Shortcut for `getAll(bitmapKey)[0]`. Useful if you know there's only one of a sprite, such as with a player character.

### replaceStack(lookFor, replaceWith)

Find every tile with all the specified sprites, and replace it with a new stack of sprites. The parameters can be either a single bitmap key or an array of bitmap keys.

```js
swap("a", "b")
// or...
swap(["a", "b"], "c")
// or...
swap("a", ["b", "c"])
// or...
swap(["a", "b"], ["c", "d"])
```

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

### Music and Sound Effects

Game Lab comes bundled with a built-in sound engine and sequencer! You can use this to write background music, or with a high BPM to make sound effects.

You can create a tune with the `tune` keyword. As usual, click on the blue button to open an editor window.

```js
// Create a tune:
const melody = tune`...`

// Play it:
playTune(melody)

// Play it 5 times:
playTune(melody, 5)

// Play it until the heat death of the universe:
const playback = playTune(melody, Infinity)

// Or make it shut up early:
playback.end()
```

Sequencer window screenshot