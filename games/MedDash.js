/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: MedDash
@description: medical robot 
@author: Mohamad Ali Ahmed
@tags: ['robot', 'medical']
@addedOn: 2025-07-11
*/

const player = "p";
const hospitalBag = "h";
const wall = "w";
const virus = "v";

setLegend(
  [ player, bitmap`
    ....1111....
    ...100001...
    ..10777701..
    .1075555701.
    110750057011
    110755557011
    ..10777701..
    ...100001...
    ....1111....
    ...1....1...
    ..1......1..
    .1........1.
  `],
  [ hospitalBag, bitmap`
    ................
    .....222222.....
    ....2......2....
    ...2222222222...
    ...2000220002...
    ...2030220302...
    ...2000220002...
    ...2222222222...
    ...2222222222...
    ...2222222222...
    ................
    ................
  `],
  [ virus, bitmap`
    ....4......4....
    .....4....4.....
    ......4444......
    ....44044044....
    ...4000440004...
    ...4044444404...
    ....44444444....
    ......4444......
    .....4....4.....
    ....4......4....
    ................
    ................
  `],
  [ wall, bitmap`
    0000000000000000
    0111111111111110
    0111111111111110
    0111111111111110
    0111111111111110
    0000000000000000
    0000000000000000
    0111111111111110
    0111111111111110
    0111111111111110
    0111111111111110
    0000000000000000
  `]
);

setSolids([wall]);

let level = 0;
const levels = [
  map`
    wwwwwwwwww
    w........w
    w.p....v.w
    w........w
    w....h...w
    w........w
    w........w
    wwwwwwwwww`
];

setMap(levels[level]);

onInput("w", () => {
  let p = getFirst(player);
  if (p) p.y -= 1;
});

onInput("s", () => {
  let p = getFirst(player);
  if (p) p.y += 1;
});

onInput("a", () => {
  let p = getFirst(player);
  if (p) p.x -= 1;
});

onInput("d", () => {
  let p = getFirst(player);
  if (p) p.x += 1;
});

afterInput(() => {
  let p = getFirst(player);
  if (!p) return;

  let bags = getAll(hospitalBag);
  bags.forEach(h => {
    if (p.x === h.x && p.y === h.y) {
      h.remove();
      addText("WIN!", { y: 4, color: color`green` });
    }
  });

  let viruses = getAll(virus);
  viruses.forEach(v => {
    if (p.x === v.x && p.y === v.y) {
      p.remove();
      addText("LOSE!", { y: 4, color: color`red` });
    }
  });
});