# Welcome to Sprig!

## READ ME FIRST

**After each edit, hit the "Run" button in the top right of the editor to see your changes.**  
*P.S.: you can also use the `shift + enter` shortcut.*

THIS CODE HAS INTENTIONAL ERRORS.

To complete each step you'll have to edit the code.

The code for this game starts below this comment.

Made based on this workshop https://workshops.hackclub.com/sprig_dodge/

The goal is to dodge the fireballs.

## Step 1: Add the player to the map

The basic thing is to have a player on the screen, right? So let's go! Click on the map and add the player sprite to a tile.

<details>
<summary>Stuck? Show Hint.</summary>

Scroll through the code to find `setMap`.
</details>
<details>
<summary>I've tried my best. Show Solution.</summary>

Sprig creates [tile-based games](https://en.wikipedia.org/wiki/Tile-based_game), uses structures like `bitmap` and `map` to make it.

`bitmap` is 1 tile and `map` is many tiles that `bitmap` can move.

`bitmap` don't appear out of nowhere, need to be added to the `map`, to do click on `map`, select player `bitmap` and place on a tile:

![](https://cloud-a1geoehz4-hack-club-bot.vercel.app/1image.png)

</details>

## Step 2: Add controls for moving the player to right

Try moving the character around with the `a` and `d` keys on your keyboard. You'll notice that the player can only move left (when you press `a`).

Your challenge is to add control for the player to move right, use `d` as input.

<details>
<summary>Stuck? Show Hint.</summary>

Scroll through the code to find `onInput`.
</details>

<details>
<summary>I've tried my best. Show Solution.</summary>

In JavaScript, a [function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions) is a block of code designed to do a specific task. In Sprig, an `onInput` function is used to detect when a keyboard input is given. In our code, we can see that there are two `onInput` functions for the keys `a` and `d`.

We'll need to add one more for the key `d`. Type this out below your `onInput` functions for `d`.

```js
onInput("d", function() {
    getFirst(player).x += 1;
});
```
</details>

## Step 3: Fix the code!

If you have already clicked on `Run` button, you have already noticed that this error appears:

```
Uncaught TypeError: Cannot read properties of undefined (reading 'length') on line ... in column 33. Open the browser console for more information.
```

<details>
<summary>Stuck? Show Hint.</summary>

the `getAll()` and `getFirst()` functions are a bit strange, aren't they?

</details>

<details>
<summary>I've tried my best. Show Solution.</summary>

This is a great example of when the error itself isn't in the line that says error.

If you look at `getFirst()` and `getAll()` and knowing what each one is used for:

```
getAll(type)
Returns all sprites of the given type. If no bitmap key is specified, it returns all the sprites in the game.

getFirst(type)
Returns the first sprite of a given type. Useful if you know there’s only one of a sprite, such as with a player character.
```

you will notice that they are swapped, after all, it wouldn't make sense to use `getFirst()` for some sprite that has several copies on the map.
</details>

## Step 4: Add all functions in the gameLoop interval

For everything to work, add the functions created in gameLoop.

<details>
<summary>Stuck? Show Hint.</summary>

Use spawnObstacle(), moveObstacles(), despawnObstacles() and checkHit()

</details>

<details>
<summary>I've tried my best. Show Solution.</summary>

Just copy the functions in gameLoop:)

```js
var gameLoop = setInterval(() => {
  despawnObstacles();
  moveObstacles();
  spawnObstacle();
```

</details>

## Done!

You’re now a Sprig game developer! You have a few options for how to continue on your Sprig journey:

If you feel confident with the Sprig editor and ready to create your own games from scratch,
- Take a look at the [Sprig Gallery](/gallery) and collect ideas from games you look through
- [Click here](/~/new) to create a new Sprig game
- Once you're done, [submit](/get) your game to the gallery and get a free Sprig console

If you're enjoying hacking on this game, here are some ideas for how to expand on it:
 - adding two players
 - adding powerups
 - come up with your own mechanic!

If you need help, remember that the toolkit (at the top of this panel) is there for you. You can also ask in the `#sprig` channel in the [Hack Club Slack](https://hackclub.com/slack/).