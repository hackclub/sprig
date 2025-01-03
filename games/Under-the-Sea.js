/*
@title: Under the Sea
@author: Finn6360
@tags: []
@addedOn: 2025-01-03
*/

const player = "p";
const sand = "s";
const ocean = "o";
const seaweed = "w";
const fish = "f";
const boat = "b";
const melody = tune`
500,
500: E4~500,
500: E4~500,
500: E4~500,
14000`

setLegend(
  [player, bitmap`
7777777777773777
3337777777733777
7737777773337777
7773337733777777
3777737737733333
3777737737333777
3377333333337773
7333333333333333
7773330330333777
3373333333333377
7333330030033333
7773333000333777
7777333333337777
7777377737733377
7733377733777337
7337777773777733`],
  [sand, bitmap`
6666666F66666666
61666666L6666166
666L6L66666L6666
66166666F66666F6
666666611666L666
6F6666L666666F66
66L6F6666F666FF6
6LL6666616F66666
6L6666666666F666
6L666FF616L6616L
666F66666666666L
166666666661666F
6666616FL666F616
6FFF66666666F66F
66F6FF66F6166166
66666666666666F6`],
  [ocean, bitmap`
7777777777777777
7777777757775777
7575777777777777
7777777777777757
7777777577777577
7775777777757777
7777757777777757
7577777777777777
7777777577777577
7757777777777777
7777577777577777
7777777777777777
7757777777777757
7777777777777777
7775777757757777
7777777777777777`],
  [seaweed, bitmap`
7777777777777777
77777DD777777777
777777DDD7777777
77777777DD77DD77
77777777DD77D777
77DD777D7DD7D777
777D777D7777D777
777D777DD777D777
77DDD777DD77DDD7
77DDD777DD7777D7
777DDDDDDDDDDDD7
7777DDDDDDDDDD77
7777777DDDD77777
7777777DDDD77777
7777777DDDD77777
7777777DDDD77777`],
  [fish, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777666777777777
7776666666777777
7766666666677677
7666666666676667
7660666666666667
7666666666666667
7663366666666667
7766666666666667
7776666666766667
7777766677777677
7777777777777777
7777777777777777
7777777777777777`],
  [boat, bitmap`
................
........2222....
........C2222...
........C2222...
........C2222...
........C2222...
........C.......
..CCCCCCCCCCCC..
..CCCCFCCCCCCCCC
..CCFCCCCCFCCFCC
..CCCFCCFCCCCCC.
..CCCCCCCCCFCCC.
...CCCCCCCCFCCC.
....CCCCCCCCCC..
................
................`],



);

setSolids([player, sand, fish]);

let level = 0;
const levels = [
  map`
oooooooo
oooooooo
oooooooo
oooooooo
ssssssss`
];

setMap(levels[level]);
addSprite(0, 3, "p")
addFish("f")
setPushables({
  [player]: []
});


//Input and player physics 
let isJumping = false;
let originalY = getFirst(player).y;
let jumpHeight = 5;
let gravity = 1;

onInput("w", () => {
  if (!isJumping) {
    isJumping = true;
    let jumpInterval = setInterval(() => {
      getFirst(player).y -= jumpHeight;
      jumpHeight -= gravity;
      if (jumpHeight <= 0) {
        clearInterval(jumpInterval);
        let fallInterval = setInterval(() => {
          getFirst(player).y += gravity;
          if (getFirst(player).y >= originalY) {
            clearInterval(fallInterval);
            isJumping = false;
            jumpHeight = 5;
          }
        }, 100);
      }
    }, 100);
  }
});

onInput("d", () => {
  getFirst(player).x += 1;
});
onInput("a", () => {
  getFirst(player).x -= 1;
});

//Functions
function addFish(spriteType) {
  let x = 1;
  let y = 1;
  addSprite(x, y, spriteType);
}

afterInput(() => {
  // Any logic to be executed after input events can be placed here
});
