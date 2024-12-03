/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Housing
@author: Isaac and Nathan Jones
@tags: []
@addedOn: 2024-00-00
*/

const spridget_brown = "b"
const spridget_yellow = "y"
const home = "h"
const fire_up = "u"
const fire_down = "d"
const fire_left = "l"
const fire_right = "r"
const wall = "w"

setLegend(
  [ spridget_brown, bitmap`
................
................
................
...CCCCCCCCCC...
...C........C...
...C.C....C.C...
...C........C...
...C........C...
...C........C...
...CCCCCCCCCC...
...C........C...
...C........C...
...C........C...
...C........C...
...C........C...
................` ],
  [ spridget_yellow, bitmap`
................
................
................
...6666666666...
...6........6...
...6.6....6.6...
...6........6...
...6........6...
...6........6...
...6666666666...
...6........6...
...6........6...
...6........6...
...6........6...
...6........6...
................` ],
  [ home, bitmap`
........5.......
.......555......
......55.55.....
.....55...55....
....55.....55...
...55.......55..
...5.........5..
...5.........5..
...5..55555..5..
...5..5...5..5..
...5..5...5..5..
...5..5..55..5..
...5..5...5..5..
...5..5...5..5..
...55555555555..
................` ],
  [ fire_up, bitmap`
................
................
.....333333.....
...3333333333...
...3333333333...
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
...3333333333...
...3333333333...
.....333333.....
................
................` ],
  [ fire_down, bitmap`
................
................
.....333333.....
...3333333333...
...3333333333...
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
...3333333333...
...3333333333...
.....333333.....
................
................` ],
  [ fire_left, bitmap`
................
................
.....333333.....
...3333333333...
...3333333333...
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
...3333333333...
...3333333333...
.....333333.....
................
................` ],
  [ fire_right, bitmap`
................
................
.....333333.....
...3333333333...
...3333333333...
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
...3333333333...
...3333333333...
.....333333.....
................
................` ],
  [ wall, bitmap`
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999` ]
)

setSolids([ spridget_brown, wall ], [ spridget_yellow, wall ])

let level = 0
const levels = [
  map`
.b.
..l
.h.`,
  map`
...h
r.w.
....
b.u.`,
  map`
....
rwb.
.ww.
h.u.`,
  map`
b...y
w...l
u.w.u
r.w.w
w.h.w`,
  map`
r.by.l
......
r....l
......
r....l
h.....`,
map`
b.y
r.l
uhu`,
map`
...b
.www
..dd
wuwh`,
map`
h.....
l.....
.l....
..l...
..l...
.u.uby`,
map`
b...d..
wwwwww.
...u.u.
.wwwwww
..u...u
wwwwww.
hu.....`,
map`
..b
l..
hu.`]
setMap(levels[level])

onInput("w", () => {
  me = getFirst(spridget_brown);
  if(me) me.y -= 1
})

onInput("a", () => {
  me = getFirst(spridget_brown);
  if(me) me.x -= 1
})

onInput("s", () => {
  me = getFirst(spridget_brown);
  if(me) me.y += 1
})

onInput("d", () => {
  me = getFirst(spridget_brown);
  if(me) me.x += 1
})

onInput("i", () => {
  me = getFirst(spridget_yellow);
  if(me) me.y -= 1
})

onInput("j", () => {
  me = getFirst(spridget_yellow);
  if(me) me.x -= 1
})

onInput("k", () => {
  me = getFirst(spridget_yellow);
  if(me) me.y += 1
})

onInput("l", () => {
  me = getFirst(spridget_yellow);
  if(me) me.x += 1
})

afterInput(() => {
  spridgets = getAll(spridget_brown)
  spridgets = spridgets.concat(getAll(spridget_yellow));

  let onHome = 0;

  for(let j = 0; j < spridgets.length; j++)
  {
    if(spridgets[j].x == getFirst(home).x && 
       spridgets[j].y == getFirst(home).y) onHome++;
  }
  
  if(onHome == spridgets.length)
  {
    level = level + 1;

    const currentLevel = levels[level];

    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`D` });
      playing = false;
    }
  }
  else
  {
    fires_left = getAll(fire_left);
    fires_right = getAll(fire_right);
    fires_up = getAll(fire_up);
    fires_down = getAll(fire_down);
    
    for(let i = 0; i < fires_left.length; i++)
    {
      oldX = fires_left[i].x;
      fires_left[i].x -= 1;
      if(oldX == fires_left[i].x)
      {
        fires_left[i].type = "r";
        fires_left[i].x += 1;
      }
    }

    for(let i = 0; i < fires_right.length; i++)
    {
      oldX = fires_right[i].x;
      fires_right[i].x += 1;
      if(oldX == fires_right[i].x)
      {
        fires_right[i].type = "l";
        fires_right[i].x -= 1;
      }
    }

    for(let i = 0; i < fires_up.length; i++)
    {
      oldY = fires_up[i].y;
      fires_up[i].y -= 1;
      if(oldY == fires_up[i].y)
      {
        fires_up[i].type = "d";
        fires_up[i].y += 1;
      }
    }

    for(let i = 0; i < fires_down.length; i++)
    {
      oldY = fires_down[i].y
      fires_down[i].y += 1;
      if(oldY == fires_down[i].y)
      {
        fires_down[i].type = "u";
        fires_down[i].y -= 1;
      }
    }

    for(let j = 0; j < spridgets.length; j++)
    {
      objs = getTile(spridgets[j].x, spridgets[j].y)
      for(let i = 0; i < objs.length; i++)
      {
        if(objs[i].type == "u" || objs[i].type == "d" ||
           objs[i].type == "l" || objs[i].type == "r" )
        {
          if(spridgets[j].x == objs[i].x && 
             spridgets[j].y == objs[i].y)
          {
            addText("try again!", { y: 4, color: color`3` });
          }
        }
      }
    }
  }
})