/*
@title: Drive Maze
@author: AdithyaPowerhouse15
@description: This game is done by me, Adithya Ganesh, for a HackClub project.
@tags: ['music', 'maze']
@addedOn: 2026-11-24
*/
// 1. Pick single letters for our car, walls, and finish line
const car = "c";
const wall = "w";
const finish = "f";

// 2. Draw 16x16 pictures for each letter
setLegend(
  [ car, bitmap`
    ................
    ................
    .....000000.....
    ....03333330....
    ....03111130....
    ...0031111300...
    ...0033333300...
    ....03333330....
    ....03333330....
    ...0033333300...
    ...0031111300...
    ....03111130....
    ....03333330....
    .....000000.....
    ................
    ................` ],
  [ wall, bitmap`
    3333111133331111
    3333111133331111
    3333111133331111
    3333111133331111
    1111333311113333
    1111333311113333
    1111333311113333
    1111333311113333
    3333111133331111
    3333111133331111
    3333111133331111
    3333111133331111
    1111333311113333
    1111333311113333
    1111333311113333
    1111333311113333` ],
  [ finish, bitmap`
    0000111100001111
    0000111100001111
    0000111100001111
    0000111100001111
    1111000011110000
    1111000011110000
    1111000011110000
    1111000011110000
    0000111100001111
    0000111100001111
    0000111100001111
    0000111100001111
    1111000011110000
    1111000011110000
    1111000011110000
    1111000011110000` ]
);

// 3. Build the race track maze
setMap(map`
  wwwwwwwww
  wc..w...w
  www.w.w.w
  w...w.w.w
  w.www.w.w
  w.....wfw
  wwwwwwwww`);

// 4. Stop the car from driving through barriers
setSolids([car, wall]);

// 5. Drive the car with W, A, S, D keys
onInput("w", () => { getFirst(car).y -= 1; });
onInput("s", () => { getFirst(car).y += 1; });
onInput("a", () => { getFirst(car).x -= 1; });
onInput("d", () => { getFirst(car).x += 1; });

// 6. Check if the car crossed the finish line
afterInput(() => {
  if (tilesWith(car, finish).length > 0) {
    playTune(tune`500: c5~100, e5~100, g5~200`);
    addText("FINISH!", { x: 6, y: 7, color: color`7` });
  }
});
