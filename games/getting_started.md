# Welcome to Sprig

You found the tutorial! 🎉  

## READ ME FIRST❗

**After each edit, hit the "Run" button in the top right of the editor to see your changes.**  
*P.S.: you can also use the `shift + enter` shortcut.*

Within an hour, follow the tutorial to create your [Sokoban](https://en.wikipedia.org/wiki/Sokoban) or a own maze puzzle game!

In this game, your player’s objective will be to push the purple boxes onto all of the green goals.

We’ve started coding this game, but need your help to finish it! Follow the steps below, and edit along in the editor to the left.

There are hints and solutions along the way. Hints are guidance and solutions will provide actual code.

One final thing before we get started: ensure the gameplay window is active if you’re playing it– just a simple click in the window will do it!

**And, if you get really stuck, come ask for help in the `#sprig` channel on the [Hack Club Slack](https://hackclub.com/slack).**

Are you ready? Let's get started! 🌠

## Step 1

Try moving the character around with the `w`, `a`, `s`, and `d` keys on your keyboard. You'll notice that the player can only move down (when you press `s`) and right (when you press `d`).

**Your challenge is to add controls for the player to move up and left, use `w` and `a` as inputs.**

<details>
<summary>Stuck? Show Hint.</summary>

Scroll through the code to find `onInput`.
</details>

<details>
<summary>I've tried my best. Show Solution.</summary>

In JavaScript, a [function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions) is a block of code designed to do a specific task. In Sprig, an `onInput` function is used to detect when a keyboard input is given. In our code, we can see that there are two `onInput` functions for the keys `s` and `d`.

We'll need to add two more for the keys `w` and `a`. Type this out below your `onInput` functions for `s` and `d`.

```js
onInput("w", function() {
  getFirst(player).y -= 1
});

onInput("a", function() {
  getFirst(player).x -= 1;
});
```

Note that the `y` and `x` values are to be subtracted (`-=`) instead of added (`+=`) because we are moving up and left. In most 2D game engines, like Sprig, decreasing the Y value moves the player up.
</details>

Now try moving your character again! It should move in all directions, congrats :)

## Step 2

As mentioned before, the goal of the game is to push the purple boxes into green goals.

**So, make your box pushable!**

<details>
<summary>Stuck? Show Hint.</summary>

Search the toolkit for `setPushables` and edit the code in the editor accordingly.
</details>

<details>
<summary>I've tried my best. Show Solution.</summary>

In Sprig, a sprite is an image that represents a game asset such as your player, your purple boxes, and your green goal.

The `setPushables` function allows us to define which sprites can push other specified sprites. In our case, we want the player to be able to push boxes.

Part of `setPushables` has already been written. Find the lines with the `setPushables` function and add `box` in the parentheses to the right.

```js
setPushables({
  [player]: []
});
```

Your code should now look like this:

```js
setPushables({
  [player]: [ box ]
});
```

Note that in Sprig, all sprites in `setPushables` need to have a solid property, which means it can’t overlap another sprite. You can set a sprite as solid with `setSolids` (check the toolkit).

In this tutorial, we don't have to worry about this as it already has been done for us.
</details>

Now run your game, and you should be able to push your box!

## Step 3

Now play the game by pushing the purple boxes into the green goal! See how far you can get!

Tip: Press `j` to reset the current level if you get stuck.

Are you stuck? Are there walls blocking your path that you can’t pass?

**Try editing the map! Hint: it’s the third level.**

<details>
<summary>Stuck? Show Hint.</summary>

Check the code comments, which are denoted by `//` (and are in red). Is there anything that describes the game's levels?
</details>

<details>
<summary>I've tried my best. Show Solution.</summary>

In our game, the `levels` variable stores an  [array](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Arrays) of levels. Each level is a Sprig `map`. By clicking on the green `map` text, you can enter the level editor. It should look like this

![Image of the level editor on level 3](https://cloud-g50cwz2u2-hack-club-bot.vercel.app/0image1.png)

Edit this map and remove some of the walls by clicking on the wall by right clicking.
</details>

## Step 4

Congrats! You made it past the previous level. But you might be running into another problem now.

**Can you figure out a way to allow the purple boxes to push each other?**

<details>
<summary>Stuck? Show Hint.</summary>

Remember how you made the boxes pushable in step 2? You'll need to do something similar!
</details>

<details>
<summary>I've tried my best. Show Solution.</summary>

Similar to how we made the player push boxes, we'll need to make boxes push boxes.  

So modify setPushables again to add ` [box]: [ box ]` and your code should now look like:

```js
setPushables({
  [player]: [ box ],
  [box]: [ box ]
});
```

P.S. If you’re curious, specifically the `setPushables` function takes in an [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects) which links sprites (listed with an [array](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Arrays)) to other sprites (which are also listed using an array) that it can push using a colon. Each pair is separated by a comma.
</details>

## Step 5

You're almost there, but the game is still missing something… sound effects!

**Add sound effects when you move.**

<details>
<summary>Stuck? Show Hint.</summary>

Check the "Toolkit" tab for information on tunes, music, and sound effects.
</details>

<details>
<summary>I've tried my best. Show Solution.</summary>

You need to do 2 things: create a sprig `tune` and figure out a way to play it only when you move?.

First, create a tune by adding the below. In Sprig, a `tune` is a set of musical notes created using our in-game music editor. Don’t worry, it’s really easy to navigate.

```js
const tune = tune`...`;
```

Click the green `tune` text to enter the tune editor. Create something of your own!

Now that you have a tune, play it using Sprig's `playTune` function.

```js
playTune(tune);
```

But, we only want to play the tune every time the player moves.  

What is something that related to player movement? Our `onInput` function that runs every time the user presses `w`, `a`, `s`, or `d`.

So, let’s put the `playTune` function inside each of the `onInput` functions.The result should be something like this.

```js
onInput("w", function() {
  getFirst(player).y -= 1
  playTune(tune);
});

onInput("a", function() {
  getFirst(player).x -= 1;
  playTune(tune);
});

onInput("s", function() {
  getFirst(player).y += 1; // positive y is downwards
  playTune(tune);
});

onInput("d", function() {
  getFirst(player).x += 1;
  playTune(tune);
});
```

</details>

## Step 6

Congratulations! You just made your own game. 🥳

**Now solve the puzzle you just created and make sure that nothing is broken.**

## I'm done, now what?

You’re now a Sprig game developer! What games do you want to build? Not sure where to start, try modifying this game by:

- adding two players.
- leaving a trail as you move.
- having different boxes and goal types.
- come up with your own mechanic!

**If you need help, remember that the toolkit (at the top of this panel) is there for you. You can also ask in the `#sprig` channel in the [Hack Club Slack](https://hackclub.com/slack/).**