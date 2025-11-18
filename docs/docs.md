# The Toolkit

Sprig is a tiny construction kit to build tile based games. 
The games are written in JavaScript.
It was made by Hack Club, a global community of teen coders who 
believe people learn best by making things they care about 
and sharing them with others. You can watch [this video](https://www.youtube.com/watch?v=ZOPYB6dw4Os) for an introduction to Sprig website.

Run games by hitting the `Run` button or pressing `Shift+Enter`.

## Getting Help

If this is your first time using Sprig, try playing through the [tutorial](https://sprig.hackclub.com/gallery/getting_started). From there, we suggest hacking on any of the [current games](https://sprig.hackclub.com/gallery) or starting from scratch.

<!-- If this is your first time using Sprig, try playing through the [tutorial](https://sprig.hackclub.com/gallery/getting_started).

You can also watch this [introduction to the editor](https://www.youtube.com/watch?v=GEbDRR_cqJI) or [walkthrough](https://www.youtube.com/watch?v=1UTLS4aO9bQ) on how to make a game. From there, we suggest hacking on any of the [current games](https://sprig.hackclub.com/gallery) or starting from scratch. -->

If you ever need help, have ideas, or want to meet other game-makers, join the community in the [#sprig](https://hackclub.slack.com/archives/C02UN35M7LG) channel on the [Hack Club Slack](https://hackclub.com/slack). You can access this guide [here](https://github.com/hackclub/sprig/blob/main/docs/docs.md).

## Level Design

Sprig games are made up of grids of square tiles.

### setLegend(bitmaps)

Tell Sprig what types of sprites are available in your game. 
Bitmap keys must be a single character. 
We recommend storing character keys in variables.

```js
const player = "p"
const wall = "w"

setLegend(
  [ player, bitmap`...` ],
  [ wall, bitmap`...` ],
)
```

To create a new bitmap, type 

```
bitmap`.`
```

Those are backticks! Click on the highlighted "bitmap" button to edit your drawing.

The order of sprite types in your legend also determines the z-order of drawing them. Sprite types that come first are drawn on top.

### setBackground(bitmapKey)

Tiles a bitmap as the background of the game:

```js
setBackground(spriteKey)
```

This only changes the visuals of the game.

### setMap(level)

Designing a level is like drawing a bitmap:

```js
map`...`
```

The characters in the map come from the order of your bitmap legend.
Levels don't have to be kept track of in a legend, you should store them in a variable yourself. 
You can call `setMap` to clear the game and load a new level:

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

Solid sprites can't overlap with each other. 
This is useful for creating things like walls:

```js
const player = "p"
const wall = "w"

setSolids([ player, wall ])
```

### setPushables(pushMap)

Use `setPushables` to make sprites push other sprites around. The sprite on the left will be able to push all sprites listed on the right.

```js
const player = "p"
const block = "b"

setPushables({ 
  [player]: [ block, player ] 
})
```

**Watch out!** Make sure everything you pass to `setPushables` is also marked as a solid or they won't be pushed around.

### width()

Get the width of the current map.

### height()

Get the height of the current map.

## User Input

Sprig has eight inputs  `w`, `a`, `s`, `d`, `i`, `j`, `k`, `l`.

Typically `w`, `a`, `s`, `d` are used as directional controls.

### onInput(type, callback)

Do something when the player presses a control:

```js
onInput("d", () => {
  // Move the player one tile to the right
  getFirst(player).x += 1
})
```

### afterInput(callback)

Runs after every input event has finished being handled. Useful for tasks like checking win states:

```js
afterInput(() => {
  if (getAll(block).length > 0) {
    console.log("you win")
  }
})
```

## Sprites and Tiles

Each tile can contain any number of sprites stacked on top of each other.

Sprites contain:
```
{
  type
  x
  y
}
```

You can move the sprite by setting `x` and `y`. 

The `bitmapKey` can also be changed to update the rendered graphic and collision rules the sprite will follow.

```js
sprite.y += 1
sprite.type = "p"
```

<!-- `dx` and `dy` are cleared after `afterInput`. 
They can be used to check if the sprite moved and by how much.
 -->
You can remove a sprite with `sprite.remove()`.

### getTile(x, y)

Returns a list of the sprites in the specified tile.

### tilesWith(type, ...)

Returns a list of the tiles that contain type.

```js
tilesWith(block)
```

`tilesWith` accepts multiple sprite types.

```js
tilesWith(block, player, ...)
```

### addSprite(x, y, spriteType)

Creates a new sprite of the given type.

### clearTile(x, y)

Removes all sprites from the specified tile.

### getAll(type)

Returns all sprites of the given type. 
If no bitmap key is specified, it returns all the sprites in the game.

### getFirst(type)

Returns the first sprite of a given type. 
Useful if you know there's only one of a sprite, such as with a player character.

Shortcut for `getAll(type)[0]`.

## Text

### addText(string, options = { x, y, color })

You can add text with optional `x`, `y`, and `color`.

In Sprig, each color is represented by a single character. Like `bitmap` and `map`, you can use the `color` keyword to pick a color for your text. A preview of your selected color will also show next to the character.

For example:

```js
addText("hello", { 
  x: 10,
  y: 4,
  color: color`3`
})
```

### clearText()

Clears all text on the screen.

## Music and Sound Effects

Sprig comes bundled with a built-in sound engine and sequencer! You can use this to write background music, or with a high BPM to make sound effects.

You can create a tune with the `tune` keyword. 
As usual, click on the button to open an editor window.

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

<!-- 

## Idioms

Find Pattern

```
const neighbors = (sprite) => {
  const neighbors = []

  const x = sprite.x
  const y = sprite.y

  getTile(x+1, y).forEach(s => {
    neighbors.push(s)
  })

  getTile(x-1, y).forEach(s => {
    neighbors.push(s)
  })

  getTile(x, y+1).forEach(s => {
    neighbors.push(s)
  })

  getTile(x, y-1).forEach(s => {
    neighbors.push(s)
  })

  return neighbors
}

const replace = (oldType, newType) => getAll(oldType).forEach(s => {
  s.type = newType
})

const overlaps = tilesWith(type0, type1, ...).length

const tileHasType = (x, y, type) => getTile(x, y).some(s => s.type === type)

const getTypeFromTile = (x, y, type) => getTile(x, y, type).find(s => s.type === type)
```
 -->

## Infinite loop detection
The Sprig editor will automatically insert a heuristic in your `for`, `while` and or `do-while` loops to detect potential infinite loops.
Code looking like
```js
while (condition) {
  // do stuff
}
```
will become
```js
startTime = performance.now()
while (condition) {if (++_loopIt > 2000 && performance.now() - startTime > 1500) throw new RangeError("Potential infinite loop")
  // do stuff
}
```
Note that all original line numbers in your code will be preserved.
