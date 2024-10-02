/*
@title: Clutter Cleanup
@author: CmdrApollo
@tags: []
@addedOn: 2024-07-09
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

*/

const player = 'p';
const box = 'b';
const boxOnFire = 'B';
const fire = 'f';
const bg = 'q';
const water = 'w';

const levels = [map`
.p........
..........
....f.....
..........
..........
.....b....
..........
..........`, map`
..........
.p........
..........
....f.....
..........
....bb....
..........
..........`, map`
..........
.p........
.....f....
..........
..........
..b..b....
..........
..........`, map`
..........
.p........
..........
.bbbbbbbb.
.b......b.
.b..ff..b.
.b......b.
.bbbbbbbb.`, map`
......w...
.p....w...
......w.b.
...ff.w.b.
......w.b.
......w.b.
......w...
......w...`, map`
..........
.p........
..........
..........
..fb.fb...
wwwwwwwwww
...bf.b...
..........`, map`
..........
.p........
..fff.....
.wwwwwwww.
.w......w.
.w.....bw.
.wwwwwwww.
..........`, map`
..........
.p..f.....
..........
bbbbbbbbbb
bbbbbbbbbb
bbbbbbbbbb
bbbbbbbbbb
bbbbbbbbbb`]

var currentLevel = 0;

// Create a tune:
const melody = tune`
352.94117647058823: C4/352.94117647058823 + G5~352.94117647058823 + C5^352.94117647058823,
352.94117647058823: G4/352.94117647058823,
352.94117647058823: C4/352.94117647058823,
352.94117647058823: G4/352.94117647058823 + C5^352.94117647058823,
352.94117647058823: C4/352.94117647058823 + G5~352.94117647058823,
352.94117647058823: F4/352.94117647058823,
352.94117647058823: C4/352.94117647058823 + C5^352.94117647058823,
352.94117647058823: F4/352.94117647058823,
352.94117647058823: C4/352.94117647058823 + F5~352.94117647058823,
352.94117647058823: G4/352.94117647058823 + C5^352.94117647058823,
352.94117647058823: C4/352.94117647058823,
352.94117647058823: G4/352.94117647058823,
352.94117647058823: C4/352.94117647058823 + F5~352.94117647058823 + C5^352.94117647058823,
352.94117647058823: A4/352.94117647058823,
352.94117647058823: C4/352.94117647058823 + C5^352.94117647058823,
352.94117647058823: A4/352.94117647058823,
352.94117647058823: C4/352.94117647058823 + G5~352.94117647058823 + C5^352.94117647058823,
352.94117647058823: G4/352.94117647058823,
352.94117647058823: C4/352.94117647058823,
352.94117647058823: G4/352.94117647058823 + C5^352.94117647058823,
352.94117647058823: C4/352.94117647058823 + G5~352.94117647058823,
352.94117647058823: F4/352.94117647058823,
352.94117647058823: C4/352.94117647058823 + C5^352.94117647058823,
352.94117647058823: F4/352.94117647058823,
352.94117647058823: C4/352.94117647058823 + F5~352.94117647058823,
352.94117647058823: E4/352.94117647058823 + C5^352.94117647058823,
352.94117647058823: C4/352.94117647058823 + G5~352.94117647058823,
352.94117647058823: G4/352.94117647058823,
352.94117647058823: C4/352.94117647058823 + B5~352.94117647058823 + C5^352.94117647058823,
352.94117647058823,
352.94117647058823: C4/352.94117647058823 + C5^352.94117647058823,
352.94117647058823`;
const move = tune`
37.5: C4~37.5,
37.5: D4~37.5,
37.5: E4~37.5 + F4~37.5,
37.5: G4~37.5 + A4~37.5,
37.5: B4~37.5 + C5~37.5,
1012.5`;
const destroy = tune`
37.5: B5-37.5,
37.5: B5-37.5,
37.5: A5-37.5,
37.5: F5-37.5,
37.5: F5-37.5,
37.5: E5-37.5,
975`;
const victory = tune`
272.72727272727275: D4~272.72727272727275 + G5/272.72727272727275,
272.72727272727275: G4~272.72727272727275,
272.72727272727275: D4~272.72727272727275 + E5/272.72727272727275,
272.72727272727275: C5~272.72727272727275,
272.72727272727275: B5/272.72727272727275,
272.72727272727275: B4~272.72727272727275,
272.72727272727275: A4~272.72727272727275 + G5/272.72727272727275,
272.72727272727275: G4~272.72727272727275,
6545.454545454546`;
const loss = tune`
272.72727272727275: D5/272.72727272727275 + D4^272.72727272727275,
272.72727272727275: A4/272.72727272727275,
272.72727272727275: F4/272.72727272727275 + D4^272.72727272727275,
272.72727272727275: E4/272.72727272727275,
272.72727272727275: D4/272.72727272727275,
7363.636363636364`;
const fizzle = tune`
44.642857142857146: A5/44.642857142857146 + C5/44.642857142857146 + C4~44.642857142857146,
44.642857142857146: B5/44.642857142857146 + C5/44.642857142857146 + C4~44.642857142857146,
44.642857142857146: A5/44.642857142857146 + C5/44.642857142857146 + C4~44.642857142857146,
44.642857142857146: B5/44.642857142857146 + C5/44.642857142857146 + C4~44.642857142857146,
1250`;

// Play it:
var musicPlay = playTune(melody, Infinity);

var levelCleared = false;

function onMove()
{
  var positions = [];
  
  //remove on fire boxes
  for (var tile of tilesWith(boxOnFire))
  {
    clearTile(tile[0].x, tile[0].y);

    for (var other of tilesWith(box))
    {
      for (var n of [[-1, 0], [1, 0], [0, -1], [0, 1]])
        {
          if (tile[0].x + n[0] == other[0].x && tile[0].y + n[1] == other[0].y)
          {
            positions.push([other[0].x, other[0].y]);
          }
      }
    }
  }

  // set new boxes on fire
  for (var pos of positions)
  {
    clearTile(pos[0], pos[1]);
    addSprite(pos[0], pos[1], boxOnFire);
    playTune(destroy);
  }
  
  playTune(move);
}

setLegend(
  [ bg, bitmap`
44444444DDDDDDDD
44444444DDDDDDDD
44444444DDDDDDDD
44444444DDDDDDDD
44444444DDDDDDDD
44444444DDDDDDDD
44444444DDDDDDDD
44444444DDDDDDDD
DDDDDDDD44444444
DDDDDDDD44444444
DDDDDDDD44444444
DDDDDDDD44444444
DDDDDDDD44444444
DDDDDDDD44444444
DDDDDDDD44444444
DDDDDDDD44444444`],
  [ player, bitmap`
................
................
................
................
.....000000.....
....07777770....
....077777770...
....077770770...
....07777770....
.....000000.....
.....0....0.....
.....0....0.....
.....0....0.....
.....0....0.....
................
................`],
  [ fire, bitmap`
...0............
...0.........0..
..020...0...00..
..0220.020.020..
.00990.020.020..
.099990990.030..
.099999990.030..
.0939999990930..
.0939999999930..
.0993999999930..
.0999399939930..
.0999999939930..
.0999999399930..
.0999999999930..
..03333333330...
...000000000....`],
  [ box, bitmap`
................
..000000000000..
.0CCCCCCCCCCC00.
.0CCCCCCCCCC090.
.0CCCCCCCCC0C90.
.0CCCCCCCC0CC90.
.0CCCCCCC0CCC90.
.0CCCCCC0CCCC90.
.0CCCCC0CCCCC90.
.0CCCC0CCCCCC90.
.0CCC0CCCCCCC90.
.0CC0CCCCCCCC90.
.0C0CCCCCCCCC90.
.00999999999990.
..000000000000..
................` ],
  [ boxOnFire, bitmap`
....020.0...02..
..0022202000020.
.00C999C99CC990.
.0CC99999999990.
.0C999999999990.
.099939999999930
.099939999999930
.099939999939930
.099933999939930
.099993999939930
.099999399399930
.099999993999930
.0C999999999930.
.00333333333300.
..000000000000..
................`],
  [ water, bitmap`
5555555555555555
5575555555555755
5757555575557575
5555555757555555
5555555555555555
5555755555575555
5557575555757555
5555555555555555
5555555555555555
5555555555555555
5575555575555755
5757555757557575
5555555555555555
5555755555755555
5557575557575555
5555555555555555`]
)

setSolids([player, fire, box, boxOnFire, water])

setPushables({
    [player]: [fire, box],
    [fire]: []
  }
)

setBackground(bg);

setMap(levels[currentLevel])

onInput("w", () => {
  onMove();
  for (var f of getAll(fire))
  {
    for (var b of getAll(box))
    {
      if (getFirst(player).x == f.x && getFirst(player).y == f.y + 1 && f.x == b.x && f.y - 1 == b.y)
      {
        playTune(destroy);
        b.type = 'B';
        clearTile(f.x, f.y);
      }
    }

    for (var w of getAll(water))
    {   
      if (getFirst(player).x == f.x && getFirst(player).y == f.y + 1 && f.x == w.x && f.y - 1 == w.y)
      {
        playTune(fizzle);
        clearTile(f.x, f.y);
        clearTile(w.x, w.y);
      }
    }
  }
  getFirst(player).y -= 1;
})

onInput("s", () => {
  onMove();
  for (var f of getAll(fire))
  {
    for (var b of getAll(box))
    {
      if (getFirst(player).x == f.x && getFirst(player).y == f.y - 1 && f.x == b.x && f.y + 1 == b.y)
      {
        playTune(destroy);
        b.type = 'B';
        clearTile(f.x, f.y);
      }
    }

    for (var w of getAll(water))
    {   
      if (getFirst(player).x == f.x && getFirst(player).y == f.y - 1 && f.x == w.x && f.y + 1 == w.y)
      {
        playTune(fizzle);
        clearTile(f.x, f.y);
        clearTile(w.x, w.y);
      }
    }
  }
  
  getFirst(player).y += 1;
})

onInput("a", () => {
  onMove();
  for (var f of getAll(fire))
  {
    for (var b of getAll(box))
    {
      if (getFirst(player).y == f.y && getFirst(player).x == f.x + 1 && f.x - 1 == b.x && f.y == b.y)
      {
        playTune(destroy);
        b.type = 'B';
        clearTile(f.x, f.y);
      }
    }

    for (var w of getAll(water))
    {   
      if (getFirst(player).y == f.y && getFirst(player).x == f.x + 1 && f.x - 1== w.x && f.y == w.y)
      {
        playTune(fizzle);
        clearTile(f.x, f.y);
        clearTile(w.x, w.y);
      }
    }
  }
  getFirst(player).x -= 1;
})

onInput("d", () => {
  onMove();
  for (var f of getAll(fire))
  {
    for (var b of getAll(box))
    {
      if (getFirst(player).y == f.y && getFirst(player).x == f.x - 1 && f.x + 1 == b.x && f.y == b.y)
      {
        playTune(destroy);
        b.type = 'B';
        clearTile(f.x, f.y);
      }
    }

    for (var w of getAll(water))
    {   
      if (getFirst(player).y == f.y && getFirst(player).x == f.x - 1 && f.x + 1 == w.x && f.y == w.y)
      {
        playTune(fizzle);
        clearTile(f.x, f.y);
        clearTile(w.x, w.y);
      }
    }
  }
  getFirst(player).x += 1;
})

onInput("l", () => {
  if (levelCleared)
  {
    levelCleared = false;
    currentLevel = (currentLevel + 1) % levels.length;
    setMap(levels[currentLevel]);
  } else
  {
    setMap(levels[currentLevel]);
  }

  clearText();
  musicPlay.end();
  
  musicPlay = playTune(melody, Infinity);
})

afterInput(() => {
  if (tilesWith(box).length == 0)
  {
    // win!
    if (!levelCleared)
    {
      levelCleared = true;
      addText("Level Cleared!", {color: color`2`});
      musicPlay.end();
      playTune(victory);
    }
  } else if (tilesWith(fire).length == 0 && tilesWith(boxOnFire).length == 0)
  {
    // lose!
    addText("Level Failed!", {color: color`2`});
    playTune(loss);
    musicPlay.end();
  }
    
})
