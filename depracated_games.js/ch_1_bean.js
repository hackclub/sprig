/*
@title: Ch. 1 - bean
@author: hackclub   


                     WELCOME TO SPRIG!!!
 
  This is the first of many "challenges" which will help you
              familiarize yourself with Sprig.
 
   Read through to get acquainted with the format all Sprig
     games share. Play with the art! Make it your own :)
 
    When you're ready, click the big green button to go to
                   the next challenge!
 
              You can run your game by hitting Run 
                   or pressing Shift+Enter
*/

// HERE we give each kind of sprite
// in our game a letter, as a shorthand.

const bean = 'a';

// HERE we give each sprite its art!
setLegend(
  // click "bitmap" to change the art!
  [bean, bitmap`
................
......000.......
.....0.220......
.....002020.....
..0..022..0.....
...0..0...0.....
...0000...20....
....2.0...20....
.....0....200...
....0...220.0...
....0...220.0...
....02.220...2..
.....0000.......
....0....0......
....0....0......
...00...00......`]
);

// HERE we make a map out of those letters.
// try making the map bigger!
// (hint: CLICK "map")
setMap(map`a`);