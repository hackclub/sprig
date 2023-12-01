# Maze Game: Adding Gameplay Mechanics

Welcome to part three of the [Sprig Batch Jam](https://jams.hackclub.com/batch/sprig)!  
If you haven't already, click [here](https://jams.hackclub.com/batch/sprig/part-3) to view the session that this tutorial is part of.

## Beginning
### Keys and locks
![](https://cloud-mswaasys4-hack-club-bot.vercel.app/0screen_recording_2023-07-13_at_11.12.28.gif)

Add a system where you have to collect keys to unlock locks and get to the goal!

#### Hints:

<details>
<summary>How can I detect when the player reaches the key?</summary>

Look back to how we implemented goal detection in step 5 of session 2 (use an `if` statement with `tilesWith` after every input!).
</details>

<details>
<summary>How can I remove the lock and key once they're picked up?</summary>

Search the toolkit for the sprites section, and take a look at the remove function on sprites (use `getFirst` to access the sprites for the key and the lock).
</details>

<details>
<summary>I've tried my best. Show solution.</summary>

```js
afterInput(() => {
  const goalsCovered = tilesWith(player, goal); // tiles that both contain the player and goal
  const keysTaken = tilesWith(player, key); // ADDED: all the keys that the player is on

// there is one player, so if 1 or more tiles with both a goal and a player, next level
if (goalsCovered.length >= 1) {
// increase the current level number
level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    // otherwise, we have finished the last level, there is no level
    // after the last level
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      win();
    }
}

// ADDED: remove the lock and key if the key is picked up
if (keysTaken.length >= 1) {
getFirst(lock).remove();
getFirst(key).remove();
}

});
```
</details>

### Pushboxes
![](https://cloud-ky9cuzm9u-hack-club-bot.vercel.app/0screen_recording_2023-07-13_at_11.20.18.gif)

Add boxes that you have to push around in order to clear a path to the goal!

#### Hints:
<details>
<summary>How do I add boxes as a new sprite?</summary>

Take a look at the "Sprites and Tiles" section of the toolkit, or look at how we added sprites in Session 2.
</details>

<details>
<summary>How do I make the boxes pushable?</summary>

Take a look at `setPushables` in the toolkit! The player should be able to push the boxes, and boxes should push other boxes, so you can push lines of boxes.
</details>

<details>
<summary>I've tried my best. Show solution.</summary>

```js
const box = "b" // add a new sprite for box

setLegend(
    [ player, bitmap`` ],
    [ wall,   bitmap`` ],
    [ goal,   bitmap`` ],
    [ box,    bitmap`` ] // Add another line to the existing setLegend for art for the box
)

setSolids([ player, wall, box ]); // Modify this line: box has to be solid to be pushable

setPushables({
    [player]: [box], // player can push box
    [box]: [box] // box can push box
})
```
</details>

### Step limit
![](https://cloud-f2pz4dd3p-hack-club-bot.vercel.app/0screen_recording_2023-07-13_at_11.22.06.gif)

Add a counter for the number of steps the player has taken, and reset the level if it counts down to zero!

<details>
<summary>How can I count the number of steps the player has taken?</summary>

You'll want to declare a variable using `let counter = 0` and then increment (using `+= 1`) that counter after every step (W/A/S/D) that the player makes. Try making a function to do this that is called after each move!
</details>

<details>
<summary>How can I store step limits for each level?</summary>

Define an array of numbers to represent the step limits for each level, in the same way we defined an array of levels to represent our list of levels.

It should look something like this:
```js
const levelLimits = [
    5, // 5 steps for level 0
    6, // 6 steps for level 1
    4  // etc.
]
```

Then, you can access the step limit with `levelLimits[level]` for the current level or `levelLimits[0]` for a specific level (0 in this case).
</details>

<details>
<summary>How do I display the number of steps that are left in a level?</summary>

Use `addText` (search the toolkit!) with the step limit for that level minus the number of steps you've taken as the input string. Make sure to clear the current text before adding more, and try putting this code into a function, so you can run it after each W/A/S/D button press.
</details>

<details>
<summary>What is a function? How do I create one?</summary>

A function is a block of code that can be "called", or run, by referencing it somewhere else. It's good for running the same block of code in different places without rewriting it.

You can define a simple function like this:
```js
function coolFunction() {
    // your block of code goes here
}
```

And run the code inside it like this:

```js
coolFunction();
```

</details>

<details>
<summary>How do I reset the level once the counter hits zero?</summary>

After every input, you'll want to use an `if` statement where you check if the counter equals zero. If it does, reset the level in the same way that it's reset in step 3 of session 2 (using `setMap`).
</details>

<details>
<summary>I've tried my best. Show solution.</summary>

```js
const levelLimits = [
    5, // 5 steps for level 0
    6, // 6 steps for level 1
    4  // etc.
]

let steps = 0

function onStep() {
    steps += 1
    
    clearText()
    addText(
        "steps remaining: " + (levelLimits[level] - steps),
        { y: 2, color: color`H`}
    )
    
    if (steps > levelLimits[level]) {
        clearText()
        setMap(levels[level])
    }
}

oninput("w", () => {
    // your other code
    onStep()
})
````
</details>

### Traps
![](https://cloud-3v0atmgdg-hack-club-bot.vercel.app/0screen_recording_2023-07-13_at_11.24.59.gif)

Add spots on the map which reset the level if the player steps on them!

#### Hints:

<details>
<summary>How can I detect when the player steps on a trap?</summary>

Look back to how we implemented goal detection in step 5 of session 2 (use an `if` statement with `tilesWith` after every input!).
</details>

<details>
<summary>How can I reset the level?</summary>

Take a look at how we reset the level in step 3 of session 2! Use `setMap` with the current level.
</details>

<details>
<summary>I've tried my best. Show solution.</summary>

```js
const trap = "t"

const levels = [
    // your other levels
    // add a new level with traps
]

afterInput(() => {
    // your other code
    const trapsCovered = tilesWith(player, trap); // ADDED: tiles with players on traps
    
    // ADDED: if any player is on a trap, they lose
    if (trapsCovered.length > 0) {
        setMap(levels[level])
    }
})
```

</details>

## Intermediate
### Portals
![](https://cloud-7roc3qdvf-hack-club-bot.vercel.app/0screen_recording_2023-07-13_at_11.29.05.gif)

Add sets of portals to your game, which teleport you to the other portal when you step on them! To do this, create sprites for red and blue portals (or substitute with your own colors/designs!), then detect if the player is over a red or blue portal after every input, then teleport them if they are over a portal.

<details>
<summary>How can I run code depending on if my player goes over a portal?</summary>

We can use `tilesWith` (check the toolkit) similarly to how we implemented goal detection. Make sure you check both for red and blue portals and store numbers for each in different variables.

Then, use an `if` statement to run code depending on if the player is over a portal, like this:
```js
if (overlappingBluePortals.length >= 1) { // your variable name could be anything
    // run code to teleport the player
}

// do this again for red portals!
```
</details>

<details>
<summary>How can I teleport the player?</summary>

Take a look at the `Sprites and Tiles` section of the toolkit! (change the x & y values of your player to where the goal is; get the goal's position using `getFirst`!)
</details>

<details>
<summary>I've tried my best. Show solution.</summary>

```js
afterInput(() => {
  const redPortalsCovered = tilesWith(player, redPortal);
  const bluePortalsCovered = tilesWith(player, bluePortal);
  
  // ADDED: teleport the player to the blue portal if they are standing on the red one
  if (redPortalsCovered.length >= 1) {
    const bp = getFirst(bluePortal);
    const pl = getFirst(player);

    // teleport player to blue portal
    pl.x = bp.x;
    pl.y = bp.y;
  }

  // ADDED: teleport the player to the red portal if they are standing on the blue one
  if (bluePortalsCovered.length >= 1) {
    const rp = getFirst(redPortal);
    const pl = getFirst(player);

    // teleport player to blue portal
    pl.x = rp.x;
    pl.y = rp.y;
  }
  
  /* your other code */
    
});
```
</details>

### Fragile tiles
![](https://cloud-dpqbnhs4n-hack-club-bot.vercel.app/0screen_recording_2023-07-13_at_11.31.43.gif)

Add tiles that you can only walk over once before turning into holes that you fall through that reset the level! To do this, create two sprites for fragile and broken tiles. Then, after every input, check if the previous tile was fragile, and if so change it to broken. If the current tile is ever broken, reset the level.

#### Hints:

<details>
<summary>How can I check if the tile my player was previously on was fragile?</summary>

We'll want to store the player's past position in two variables (one for X, and one for Y). Declare these variables using `let` (call them `previousX` and `previousY`), outside any blocks or functions, and set them to the player's current position (using `getFirst(player).x/y`).  
At the end of your `afterInput` block, we'll want to save the current position of the player to those variables (like this: `previousX = `). Next time the afterInput block has run, the player will have moved, so these variables will represent the previous position.

Then, take that position and use `getTile(x,y)[0].type` to get the type of tile you were previously on, and use `==` to check if it is fragile.
</details>

<details>
<summary>I've tried my best. Show solution.</summary>

```js
  // ADDED: check if the player was previously on a fragile tile
const previousX = getFirst(player).x
const previousY = getFirst(player).y
afterInput(() => {
  const brokenCovered = tilesWith(player, broken); // ADDED: tiles with players on broken tiles
    
  // check if the previous tile is a fragile one
  const sprite = getTile(previousX, previousY)[0]; // an array of sprites on that tile
    if (sprite.type === fragile) {
      sprite.type = broken;
    }

  // ADDED: check if the player is on top of a broken tile
  if (brokenCovered.length >= 1) {
    lose();
  }

    previousX = getFirst(player).x
    previousY = getFirst(player).y
  /* your existing code */
});
```
</details>

### Two player
![](https://cloud-rl05ba3ol-hack-club-bot.vercel.app/0screen_recording_2023-07-13_at_17.25.36.gif)

Add a second player and goal to your game, and make it playable by two people at the same time!

#### Hints:

<details>
<summary>How can I add a second player?</summary>

Take a look at the `Sprites and Tiles` section of the toolkit, and look back to how we implemented our first player! Make sure to add it in the line with `setSolids`.

Then, duplicate all your movement code for the second player and change the movement keys to IJKL.

</details>

<details>
<summary>How do I make sure both tiles are covered before advancing levels?</summary>

Modify the `afterInput` code so that goalsCovered includes all the tiles with a player and a goal, like this
```js
  const goalsCovered = tilesWith(player, goal).concat(tilesWith(player2, goal)); // concat combines two arrays
```

Then, modify the if statement so that two goals have to be covered for the level to progress.

</details>

<details>
<summary>I've tried my best. Show solution.</summary>

```js
const player2 = "l";

setLegend(
    // other sprites
    [ player2,bitmap``],
);

setSolids([ player, player2, wall ]);


// ADDED: inputs for player 2
onInput("i", () => {
  getFirst(player2).y -= 1; // negative y is upwards
});

onInput("j", () => {
  getFirst(player2).x -= 1;
});

onInput("k", () => {
  getFirst(player2).y += 1; // positive y is downwards
});

onInput("l", () => {
  getFirst(player2).x += 1;
});

afterInput(() => {
    const goalsCovered = tilesWith(player, goal).concat(tilesWith(player2, goal)); // MODIFIED: add player2 to list

    if (goalsCovered.length >= 2) { // MODFIED: both player 1 and 2 have to be on the goal
        // existing code
    }
})
```

</details>

## Advanced
### Moving obstacles
![](https://cloud-lalg1dbq4-hack-club-bot.vercel.app/0screen_recording_2023-07-13_at_12.49.00__1_.gif)

Add an obstacle that moves back and forth in a level on a set interval! In order to do this, repeatedly check which level you're on and add or remove certain tiles depending on which level you're on (use `if (level == 3)` for level 3, for example) and where the obstacle was previously. Also, make sure not to run into the player!

<details>
<summary>How can I run a block of code on a set interval?</summary>

We'll want to use a JavaScript function called `setInterval`, which runs a block of code on a timer of a set number of milliseconds.

For example, this is how we can run a block of code every 500 milliseconds (0.5 seconds):
```js
setInterval(() => {
    // block of code that runs every 500ms goes here
}, 500 /* 500ms */)
```

</details>

<details>
<summary>How can I track which position to move the obstacle to?</summary>

Create a variable using `let` on the top level of the game (outside any functions or code blocks), name it something like "obstacleIsUp", and set it to true.

Then, use an `if` statement to run different code depending on which level you're on, and use another `if` statement to move the obstacle up or down depending on if the variable you just declared equals true or false. Each time you move the obstacle, flip that variable to the opposite of what it was previously.

</details>

<details>
<summary>How do I move obstacles back and forth?</summary>

Simply use `addSprite` and `clearTile` (search the toolkit) to add and remove the tiles that are different between each move.

Also, use an if statement to check if there's a player where you'll add sprites. Create a function to check if a player is at a certain X & Y, like this:
```js
function checkForPlayer(x,y) { // this function accepts two paramaters: x & y
  let result = false
  getTile(x,y).map((tile) => { // .map runs the block of code between the brackets for every element in the array returned by getTile()
    if (tile.type == player)
      result = true
  })
  return result // this function returns true only if there is a player at (x,y)
}

if (!checkForPlayer(3,2)) { // this is how we call the function; this will be true or false. you can use && (logical AND) to combine multiple checks for different tiles
    // this code is run if there is not a player at 3,2  
}
```
</details>

<details>
<summary>I've tried my best. Show solution.</summary>

```js
function checkForPlayer(x,y) { // this function accepts two paramaters: x & y
  let result = false
  getTile(x,y).map((tile) => { // .map runs the block of code between the brackets for every element in the array returned by getTile()
    if (tile.type == player)
      result = true
  })
  return result // this function returns true only if there is a player at (x,y)
}

let up = false

setInterval(() => {
    if (level == 1) { // run different code depending on the level
        if (up) { // run code depending on where the obstacle is
            if (!(checkForPlayer(2,3) || checkForPlayer(3,3))) { // only run code if there isn't a player in the way
                clearTile(2,0)
                clearTile(3,2)
                addSprite(2,3, wall)
                addSprite(3,3,wall)
                up = false // switch the variable to the opposite state
            }
        } else {
            if (!(checkForPlayer(2,0) || checkForPlayer(3,2))) {
                clearTile(2,3)
                clearTile(3,3)
                addSprite(2,0,wall)
                addSprite(3,2,wall)
                up = true
            }
        }
    } else if (level == 2) {
        // etc...
    }
}, 500)
```
</details>

### Sliding movement
![](https://cloud-ooaqynhdl-hack-club-bot.vercel.app/0screen_recording_2023-07-13_at_16.08.52.gif)

Make each move automatically move the character the furthest it can go in the chosen direction. To do this, keep moving in a certain direction after every button press until the player hits a wall or edge of the screen.

#### Hints:

<details>
<summary>How can I keep moving until a certain condition?</summary>

You'll want to make use of a `while` loop. A `while` loop repeats a block of code until a certain condition is met. It's like an if statement, where the block of code is run conditionally, but it's just being run over and over.

```js
while (/* something is true */) {
    // repeat a certain action
}
```

You'll want to move to one direction **while** there **is not** a block or edge adjacent to the player in the direction it's travelling.
</details>

<details>
<summary>How can I detect when I need to stop?</summary>

The player will need to stop when there is a wall directly ahead of them in the direction they're travelling, or they're about to overstep the map.

To detect if the player is about to overstep the map, use `getFirst(player).y > 0` if you're travelling up or left (and adapt using `x` instead of `y` for horizontal movement) or `getFirst(player).y < height() - 1` if you're travelling down or right (and adapt using `x` and `width()` for horizontal movement)

To detect if the player is about to hit a wall, check if the tile ahead is empty (use `getTile(x,y)[0] == undefined`, substituting x and y for whatever the coordinates of the player are plus an offset in the direction they're going) OR that its type does not equal wall (`getTile(x,y)[0].type != wall`).

Combine these two statements with `&&` (this is the logical AND operator) and use them in your while loop.
</details>

<details>
<summary>How can I make my player not skip over goals when moving?</summary>

If your player passes over a goal and doesn't trigger a level win, move the goal checking logic out of `afterInput` and into a separate function like this:
```js
function checkGoals() {
    // all your code from afterInput
}
```

Then, call it (like this: `checkGoals()`) inside each `while` loop and `afterInput`.

</details>

<details>
<summary>I've tried my best. Show solution.</summary>

```js
// inputs for player movement control
onInput("w", () => {
  while (getFirst(player).y > 0 
         && (getTile(getFirst(player).x, getFirst(player).y -1)[0] == undefined 
             ||  getTile(getFirst(player).x, getFirst(player).y -1)[0].type != wall)) {
  getFirst(player).y -= 1; // negative y is upwards
    checkGoals()
  }
  });

onInput("a", () => {
  while (getFirst(player).x > 0 
         && (getTile(getFirst(player).x-1, getFirst(player).y)[0] == undefined 
             || getTile(getFirst(player).x-1, getFirst(player).y)[0].type != wall)) {
  getFirst(player).x -= 1; // negative y is upwards
    checkGoals()
  }
  });

onInput("s", () => {
  while (getFirst(player).y < height() - 1
         && (getTile(getFirst(player).x, getFirst(player).y +1)[0] == undefined 
             ||  getTile(getFirst(player).x, getFirst(player).y +1)[0].type != wall)) {
  getFirst(player).y += 1; // negative y is upwards
    checkGoals()
  }
  });

onInput("d", () => {
  while (getFirst(player).x < width() - 1 
         && (getTile(getFirst(player).x+1, getFirst(player).y)[0] == undefined 
             || getTile(getFirst(player).x+1, getFirst(player).y)[0].type != wall)) {
  getFirst(player).x += 1; // negative y is upwards
    checkGoals()
  }
  });

// input to reset level
onInput("j", () => {
  resetLevel();
});

function checkGoals() { // move goal checking to its own function
const goalsCovered = tilesWith(player, goal); // tiles that both contain the player and goal

  // there is one player, so if 1 or more tiles with both a goal and a player, next level
  if (goalsCovered.length >= 1) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    // otherwise, we have finished the last level, there is no level
    // after the last level
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
  addText("you win!", { y: 4, color: color`7` });
    }
  }
}

// these get run after every input
afterInput(() => {
  checkGoals()
});
```
</details>