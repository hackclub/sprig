/*
@title: Music!
@description: "Music!" is a fun and simple music maker game where players move a character to different colored blocks to create music. The bright colors represent higher-pitched notes, while grey ones denote lower-pitched equivalents, and special multi-colored blocks feature pre-written songs by the creator. Players can also use additional keys to play extra notes, adding to the musical experience.
@author: Akeell
@tags: []
@addedOn: 2022-10-16
*/

/* 
Intrustions: 
This is a fun and simple game!
All you need to do it make music using the coloured keys. 
The bright colours are higher keys and the grey colours are the same sound,
just lower. 
The colourful pink and purple blocks are pre-written songs, so try them out.
Controls: 
Use W, A, S, D to move
Use I, J, K, L for extra combined notes 
*/ 

const player = "p";
const music1 = "a";
const music2 = "b";
const music3 = "r"; 
const music4 = "d"; 
const music5 = "e"; 
const music6 = "f"; 
const music7 = "g"; 
const music8 = "h"; 
const wall = "w"; 
const letter1 = "m";
const letter2 = "u"; 
const letter3 = "s"; 
const letter4 = "i";
const letter5 = "c"; 
const letter6 = "!"; 
const song1 = "v"; 
const song2 = "n"; 

const melody = tune`
138.88888888888889: g5~138.88888888888889 + e5~138.88888888888889 + g4~138.88888888888889 + c4~138.88888888888889,
4305.555555555556`;
const melody2 = tune`
193.5483870967742: g5-193.5483870967742 + d5-193.5483870967742 + c4-193.5483870967742 + g4-193.5483870967742,
6000`; 
const melody3 = tune`
200: g5/200 + g4/200 + c4/200 + d5/200,
6200`; 
const melody4 = tune`
192.30769230769232: g5^192.30769230769232 + d5^192.30769230769232 + g4^192.30769230769232 + c4^192.30769230769232,
5961.538461538462`; 
const melody5 = tune`
198.67549668874173: f4~198.67549668874173 + a4~198.67549668874173 + c4~198.67549668874173,
6158.940397350993`; 
const melody6 = tune`
196.07843137254903: a4-196.07843137254903 + f4-196.07843137254903 + c4-196.07843137254903,
6078.43137254902`; 
const melody7 = tune`
198.67549668874173: a4/198.67549668874173 + f4/198.67549668874173 + c4/198.67549668874173,
6158.940397350993`; 
const melody8 = tune`
193.5483870967742: a4^193.5483870967742 + f4^193.5483870967742 + c4^193.5483870967742,
6000`; 
const melody9 = tune`
187.5: b5~187.5 + f5-187.5 + b4/187.5 + f4^187.5 + c4~187.5,
5812.5`; 
const melody10 = tune`
184.04907975460122: f5~184.04907975460122 + b4~184.04907975460122 + d5-184.04907975460122 + e4/184.04907975460122 + c4^184.04907975460122,
5705.521472392638`; 
const melody11 = tune`
205.4794520547945: a5-205.4794520547945 + c4-205.4794520547945 + c5^205.4794520547945 + g4~205.4794520547945 + f5/205.4794520547945,
6369.863013698629`; 
const melody12 = tune`
202.7027027027027: b5^202.7027027027027 + c5^202.7027027027027 + c4~202.7027027027027 + g4-202.7027027027027 + f5/202.7027027027027,
6283.783783783784`; 
const melody1 = tune`
161.29032258064515: f5~161.29032258064515,
161.29032258064515,
161.29032258064515: c5~161.29032258064515,
161.29032258064515,
161.29032258064515: f5~161.29032258064515,
161.29032258064515,
161.29032258064515: c5~161.29032258064515,
161.29032258064515,
161.29032258064515: f5~161.29032258064515,
161.29032258064515,
161.29032258064515: c5~161.29032258064515,
161.29032258064515,
161.29032258064515: e4^161.29032258064515 + g5/161.29032258064515,
161.29032258064515: e5-161.29032258064515,
161.29032258064515: e4^161.29032258064515,
161.29032258064515: e5-161.29032258064515,
161.29032258064515: e4^161.29032258064515,
161.29032258064515: e5-161.29032258064515,
161.29032258064515: e4^161.29032258064515,
161.29032258064515: e5-161.29032258064515,
161.29032258064515: e4^161.29032258064515 + g5/161.29032258064515,
161.29032258064515: d5/161.29032258064515,
161.29032258064515,
161.29032258064515: g4/161.29032258064515 + c5~161.29032258064515,
161.29032258064515,
161.29032258064515: e4/161.29032258064515 + a4~161.29032258064515,
161.29032258064515,
161.29032258064515: g4/161.29032258064515 + c5~161.29032258064515,
161.29032258064515,
161.29032258064515: e4/161.29032258064515 + a4~161.29032258064515,
161.29032258064515: g4/161.29032258064515 + c5~161.29032258064515,
161.29032258064515`; 
const melody14 = tune`
161.29032258064515,
161.29032258064515: a5-161.29032258064515,
161.29032258064515,
161.29032258064515: g5-161.29032258064515,
161.29032258064515,
161.29032258064515: e5-161.29032258064515,
161.29032258064515,
161.29032258064515: c4-161.29032258064515,
161.29032258064515: a4/161.29032258064515,
161.29032258064515: f4/161.29032258064515,
161.29032258064515: c5/161.29032258064515,
322.5806451612903,
161.29032258064515: g4/161.29032258064515,
161.29032258064515: e5/161.29032258064515,
161.29032258064515: b4/161.29032258064515,
161.29032258064515: e5/161.29032258064515,
161.29032258064515,
161.29032258064515: g4/161.29032258064515,
161.29032258064515: c5~161.29032258064515,
161.29032258064515: c5~161.29032258064515 + d4^161.29032258064515,
161.29032258064515: c5~161.29032258064515,
161.29032258064515: c5~161.29032258064515 + d4^161.29032258064515,
322.5806451612903,
161.29032258064515: d4^161.29032258064515,
161.29032258064515: g4^161.29032258064515 + e5^161.29032258064515,
161.29032258064515: b4/161.29032258064515,
161.29032258064515: a4/161.29032258064515,
161.29032258064515: g4/161.29032258064515,
161.29032258064515: a4/161.29032258064515,
161.29032258064515: b4/161.29032258064515`; 



setLegend(
  [ player, bitmap`
................
................
................
....FFFFFFF.....
....F.....F.....
....F.0.0.F.....
....F.....F.....
....FFFFFFF.....
.......F........
.......F........
...FFFFFFFFF....
.......F........
.......F........
......F.F.......
.....F...F......
....F.....F.....`],
  [ music1, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`],
  [ music2, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],
  [ music3, bitmap`
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
9999999999999999`], 
  [ music4, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`], 
  [ music5, bitmap`
LLLLLLLLLLLLLLLL
L3LLLL3LLLLLLLLL
LLLLLLLLLLLL3LLL
LL3LLLLLLLLLLLLL
LLLLL3LL3LLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLL3LLL
LLL3LLL3LLLLLLLL
LLLLLLLLLLLLLLLL
3LLLLLLLLLLLLLLL
LLL3LLLL3LLL3LLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLL3L
LLLLL3LLLLLLLLLL
LLLLLLLLL3LLLLLL
L3LLLLLLLLLLLLLL`], 
  [ music6, bitmap`
LLLLLLLLLLLLLLLL
LLLLLL7LLLLLLLLL
LL7LLLLLLLLLL7LL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLL7LLLL7LLLL
LL7LLLLLLLLLLLL7
LLLLLLLLLLLLLLLL
LLLLLLLLLL7LLLLL
LLLLLLLLLLLLLLLL
L7LLLL7LLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLL7LL7L
LL7LLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLL7LLLLL`], 
  [ music7, bitmap`
LLLLLLLLLLLLLLLL
L9LLLLL9LLLLLLLL
LLLLLLLLLLLLLL9L
LLLL9LLLLLLLLLLL
LLLLLLLLL9LLLLLL
LL9LLLLLLLLLLLLL
LLLLLLLLLLLLL9LL
LLLLLL9L9LLLLLLL
LLLLLLLLLLLLLLLL
L9LLLLL9LLLLLLLL
LLLLLLLLLLLLLL9L
LLLLLLLLLLL9LLLL
9LLLL9LLLLLLLLLL
LLLLLLLLLLLLLLLL
L9LLLLLLLL9LLLL9
LLLLL9LLLLLLLLLL`], 
  [ music8, bitmap`
LLLLLLL4LLLLLLLL
L4LLLLLLLLLLL4LL
LLL4LLLLLLLLLLLL
LLLLLLLLL4LLLLLL
LLLLLLLLLLLLL4LL
LL4LLLLLLLLLLLLL
LLLLLLLLLLLLLL4L
LLLLLLL4LLLLLLLL
LLLLLLLLLLLLLLLL
L4LL4LLLLLLLLLLL
LLLLLLLLLLL4LL4L
LLLLLLL4LLLLLLLL
LLLL4LLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLL4LLL4LL
4LLLLLLLLLLLLLLL`], 
  [ wall, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`], 
  [ letter1, bitmap`
1..............1
11.............1
1.1...........11
1..1.........1.1
1...1.......1..1
1....1.....1...1
1.....1...1....1
1......1.1.....1
1.......1......1
1..............1
1..............1
1..............1
1..............1
1..............1
1..............1
1..............1`], 
  [ letter2, bitmap`
.1............1.
.1............1.
.1............1.
.1............1.
.1............1.
.1............1.
.1............1.
.1............1.
.1............1.
.1............1.
.1............1.
.1............1.
.1............1.
.1............1.
.1............1.
.11111111111111.`], 
  [ letter3, bitmap`
1111111111111111
1...............
1...............
1...............
1...............
1...............
1...............
1...............
1111111111111111
...............1
...............1
...............1
...............1
...............1
...............1
1111111111111111`], 
  [ letter4, bitmap`
.11111111111111.
.......1........
.......1........
.......1........
.......1........
.......1........
.......1........
.......1........
.......1........
.......1........
.......1........
.......1........
.......1........
.......1........
.......1........
.11111111111111.`], 
  [ letter5, bitmap`
1111111111111111
1...............
1...............
1...............
1...............
1...............
1...............
1...............
1...............
1...............
1...............
1...............
1...............
1...............
1...............
1111111111111111`],
  [ letter6, bitmap`
...1....1....1..
...1....1....1..
...1....1....1..
...1....1....1..
...1....1....1..
...1....1....1..
...1....1....1..
...1....1....1..
...1....1....1..
...1....1....1..
...1....1....1..
...1....1....1..
...1....1....1..
...1....1....1..
................
...1....1....1..`], 
  [ song1, bitmap`
HHHHHHHH4HHHHHHH
H7HH3HHHHH3HH7HH
4H6HHHH9HHHHH6HH
HHH9H7HHHHHHHHH4
H3HHHH6HH9H6HHHH
H4HHHHHHHHHHHH9H
HHHH3H4HHHHH4HHH
H6HH4HHH3H9HH3HH
HHH7HH9HHHHHH7HH
HHHHHHHHH7HHHHHH
H3H9HHH6HH4HHHH3
HHHHH3HHHHHH6HHH
7HHHHHHHHHHHHHHH
HH6H9HH4HH7HHHHH
HHH4HHHH3HH9HH6H
9HHHHHHHHHHHHHHH`], 
  [ song2, bitmap`
8888888888888888
8387868488888898
8888888889867888
8898488388888888
8688888884883887
8888869888898888
8883888848887868
8488888888388888
8888886888888848
8388988884886888
8887888888888883
8888868838987888
7868888888888888
8888884878888688
8889878888388889
8388888688888388`], 
  
);

setSolids([wall, player]);

let level = 0;
const levels = [
  map`
wabrdw
n....v
music!
..p...
wefghw`,
];

setMap(levels[level]);

setPushables({
  [ player ]: [],
});

//Start - Movement
onInput("w", () => {
  getFirst(player).y += -1;
});

onInput("s", () => {
  getFirst(player).y += 1;
});


onInput("d", () => {
  getFirst(player).x += 1;
});

onInput("a", () => {
  getFirst(player).x += -1;
});
//End - Movement 

//Extra notes
onInput("i", () => { 
  playTune(melody9) 
}); 

onInput("k", () => { 
  playTune(melody10) 
}); 

onInput("j", () => { 
  playTune(melody11) 
}); 

onInput("l", () => { 
  playTune(melody12) 
}); 



afterInput(() => {
  
  const targetNumber = tilesWith(music1).length;  
  const numberCovered = tilesWith(music1, player).length;

  const targetNumber2 = tilesWith(music2).length; 
  const numberCovered2 = tilesWith(music2, player).length; 

  const targetNumber3 = tilesWith(music3).length; 
  const numberCovered3 = tilesWith(music3, player).length; 

  const targetNumber4 = tilesWith(music4).length; 
  const numberCovered4 = tilesWith(music4, player).length; 

  const targetNumber5 = tilesWith(music5).length; 
  const numberCovered5 = tilesWith(music5, player).length; 

  const targetNumber6 = tilesWith(music6).length; 
  const numberCovered6 = tilesWith(music6, player).length; 

  const targetNumber7 = tilesWith(music7).length; 
  const numberCovered7 = tilesWith(music7, player).length; 

  const targetNumber8 = tilesWith(music8).length; 
  const numberCovered8 = tilesWith(music8, player).length; 

  const targetNumber9 = tilesWith(song1).length; 
  const numberCovered9 = tilesWith(song1, player).length; 

  const targetNumber10 = tilesWith(song2).length; 
  const numberCovered10 = tilesWith(song2, player).length; 

  

    if (numberCovered === targetNumber) {
    playTune(melody);
    }
  
  if (numberCovered2 === targetNumber2) {
    playTune(melody2);
    }
  
  if (numberCovered3 === targetNumber3) {
    playTune(melody3);
    }

  if (numberCovered4 === targetNumber4) {
    playTune(melody4);
    }

  if (numberCovered5 === targetNumber5) {
    playTune(melody5);
    }

  if (numberCovered6 === targetNumber6) {
    playTune(melody6);
    }

  if (numberCovered7 === targetNumber7) {
    playTune(melody7);
    }

  if (numberCovered8 === targetNumber8) {
    playTune(melody8);
    }

  if (numberCovered9 === targetNumber9) {
    playTune(melody1);
    }

  if (numberCovered10 === targetNumber10) {
    playTune(melody14);
    }
});
