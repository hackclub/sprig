# Welcome to Sprig!!!

**Hit "run" to execute the code and start the game (you can also press `shift+enter`).**  
**Click "Show Help" to discover your toolkit.**

The objective is to push the purple boxes onto the green goals.  
Press `j` to reset the current level.

To solve each step, you'll have to edit the code.  
The code for this game starts below this comment (the brown text).

## Step 1
Add controls to move up and left, use `w` and `a` as inputs.
<details>
<summary>Stuck? Show Hint.</summary>

Try to add 2 additional `onInput` functions, they should be very similar to the existing onInputs for `s` and `d`.
</details>

## Step 2 
Make the purple blocks pushable.
<details>
<summary>Stuck? Show Hint.</summary>

Try editing `setPushables` to include the purple block.
</details>

## Step 3
Add some new levels.
<details>
<summary>Stuck? Show Hint.</summary>

Make a new map in `levels` variable. Look at how other maps are made.
</details>

## Step 4
Allow the player to push two or more boxes in a row.
<details>
<summary>Stuck? Show Hint.</summary>

Allow boxes to push boxes, you should be editing `setPushables`.
</details>

## Step 5
Add sound effects when you move.
<details>
<summary>Stuck? Show Hint.</summary>

Create a `tune` and use `playTune` to play it. The "Show Help" menu has a lot of information on tunes.
</details>

## Step 6
Solve the game you just created!

## I'm done, now what?
Congrats! Now make your own game! Try:
 - adding two players.
 - leaving a trail as you move.
 - having different blocks and goal types.
 - come up with your own mechanic!