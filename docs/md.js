export const md = `
# The Toolkit

Sprig is a tiny construction kit to build tile based games.
It was made by Hack Club, a global community of teen coders who 
believe people learn best by making things they care about 
and sharing them with others.
All of the Sprig engine is about 15 functions.

If this is your first time using Sprig try going 
through the challenges in the \`learn\` tab.

You can also start with an empty file and 
go through [this tutorial](https://github.com/hackclub/sprig-gallery/blob/main/src/routes/getting-started.md#lets-make-our-first-game-in-sprig 
).

If you get stuck you can talk to other people in the community
about Sprig on [Hack Club's Slack](https://hackclub.com/slack).

Run games by hitting the \`Run\` button or pressing \`shift+enter\`.

## Level Design

Sprig games are made up of grids of square tiles.

### setLegend(bitmaps)

Tell Sprig what types of sprites are available in your game. 
Bitmap keys must be a single character. 
We recommend storing character keys in variables.

\`\`\`js
const player = "p";
setLegend([ player, bitmap\`...\` ]);
\`\`\`

To create a new bitmap, type \`bitmap\` and then two backticks (\`\` \` \`\`). 
Click on the highlighted "bitmap" button to edit your drawing:

\`\`\`js
setLegend( 
    [ "p", bitmap\`...\`],
    [ "w", bitmap\`...\`]
)
\`\`\`

The order of sprite types in your legend also determines the z-order of drawing them.
Sprite types that come first are drawn on top.

### setBackground(bitmapKey)

Tiles a bitmap as the background of the game:

\`\`\`js
setBackground(spriteKey)
\`\`\`

This only changes the visuals of the game.

### setMap(level)

Designing a level is like drawing a bitmap:

\`\`\`js
map\`...\`
\`\`\`

The characters in the map come from the order of your bitmap legend.
Levels don't have to be kept track of in a legend, you should store them in a variable yourself. 
You can call \`setMap\` to clear the game and load a new level:

\`\`\`js
const level = map\`...\`
setMap(level)
\`\`\`

You might want to keep track of multiple levels using an array to switch between them mid-game:

\`\`\`js
const levels = [
    map\`...\`,
    map\`...\`,
    // etc.
]
setMap(levels[0])

// Later:
setMap(levels[1])
\`\`\`

### setSolids(bitmapKey)

Solid sprites can't overlap with each other. 
This is useful for creating things like walls:

\`\`\`js
setSolids(["p", "w"]);
\`\`\`

### setPushables(pushMap)

Want sprites to be able to push each other around? Use \`setPushables\` to map a bitmap key to a list of bitmaps that it can push around:

\`\`\`js
setPushables({ "p": ["b", "p"] })
\`\`\`

> **Watch out!** Make sure everything you pass to \`setPushables\` is also marked as a solid or they won't be pushed around.
> 
> For more advanced usage, you could update the solids list in-game to enable and disable pushables dynamically.

## User Input

Game Lab has eight inputs  \`w\`, \`a\`, \`s\`, \`d\`, \`i\`, \`j\`, \`k\`, \`l\`.

Typically \`w\`, \`a\`, \`s\`, \`d\` are used as directional controls.

### onInput(type, callback)

Do something when the player presses a control:

\`\`\`js
onInput("a", () => {
    // Move the player one tile to the right
    getFirst("p").x += 1
})
\`\`\`

### afterInput(callback)

Runs after ever input event has finished being handled. Useful for tasks like checking win states:

\`\`\`js
afterInput(() => {
    if (getAll("blocks").length > 0) {
        console.log("you win")
    }
})
\`\`\`

## Sprites and Tiles

Each tile can contain any number of sprites stacked on top of each other.

Sprites contain:
\`\`\`
{
    type
    x
    y
    dx
    dy
}
\`\`\`

You can move the sprite by setting \`x\` and \`y\`. 
Collisions are checked; 
the value won't change if the sprite is being blocked by a solid object!

The \`bitmapKey\` can also be changed to update the rendered graphic and collision rules the sprite will follow.

\`\`\`js
sprite.y += 1
sprite.type = "p"
\`\`\`

\`dx\` and \`dy\` are cleared after \`afterInput\`. 
They can be used to check if the sprite moved and by how much.

You can remove a sprite with \`sprite.remove()\`.

### getTile(x, y)

Returns a list of the sprites in the specified tile.

### tilesWith(arrayOfTypes)

Returns a list of the tiles with all types contained in them.

\`\`\`js
tilesWith("b")
\`\`\`

\`tilesWith\` accepts multiple sprite types.

\`\`\`js
tilesWith("b", "p", ...)
\`\`\`

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

Shortcut for \`getAll(type)[0]\`.

## Text

### addText(string, options = { x, y, color })

You can add text with optional \`x\`, \`y\`, and \`color\`.

For example:

\`\`\`js
addText("hello", { 
    x: 10, 
    y: 4, 
    color: [ 255, 0, 0 ] // red
})
\`\`\`

### clearText()

Clears all text on the screen.

## Music and Sound Effects

Game Lab comes bundled with a built-in sound engine and sequencer! You can use this to write background music, or with a high BPM to make sound effects.

You can create a tune with the \`tune\` keyword. 
As usual, click on the button to open an editor window.

\`\`\`js
// Create a tune:
const melody = tune\`...\`

// Play it:
playTune(melody)

// Play it 5 times:
playTune(melody, 5)

// Play it until the heat death of the universe:
const playback = playTune(melody, Infinity)

// Or make it shut up early:
playback.end()
\`\`\`


## Debugging

Open up your browser console to debug.

You can look at game state by...

`

// ## Idioms

// ### Get Neighbors

// ### Find Pattern

// ### Replace

// ### Count Overlaps