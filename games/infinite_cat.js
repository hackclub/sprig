/* 
@title: infinite_cat
@author: Deven Jadhav
@tags: ['strategy']
@addedOn: 2022-11-07



Greetings Hacker,

I see you fancy cats and caterpillars as much I as do. Be rest assured 
you would not be disappointed. 

Here's the deal. Cats think they rule the world. So you need to help the cat rule this
garden. Now you see, this is a rather special cat- it will expand as you direct it to. 

Use the WASD keys to move in a particular direction. 

The end goal is to fill all the green blocks with the yellow cat!

You can restart a level at anytime using the 'K' key, or Jump to the next level with 
the 'L' key.

Remember the cat cannot move into itself, so be careful with where you move it!

Have fun, and feel free to add music to this game :)

*/


const catBlock = "c";
const wall = "w";
const floor = "f";
const catHead = "h";

setLegend(
  [ catBlock, bitmap`
6666666666666666
6666666666666666
66CC66666666CC66
66CC66666666CC66
6666666666666666
6666666666666666
6666666666666666
6666666CC6666666
6666666CC6666666
6666666666666666
6666666666666666
6666666666666666
66CC66666666CC66
66CC66666666CC66
6666666666666666
6666666666666666`],
  [catHead, bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5533355555553335
5533355555553335
5533355555553335
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555`],
  [ wall, bitmap`
0000000000000000
00CCCCCCCCCCCC00
0C0CCCCCCCCCC0C0
0CC0CCCCCCCC0CC0
0CCC0CCCCCC0CCC0
0CCCC0CCCC0CCCC0
0CCCCC0CC0CCCCC0
0CCCCCC00CCCCCC0
0CCCCCC00CCCCCC0
0CCCCC0CC0CCCCC0
0CCCC0CCCC0CCCC0
0CCC0CCCCCC0CCC0
0CC0CCCCCCCC0CC0
0C0CCCCCCCCCC0C0
00CCCCCCCCCCCC00
0000000000000000`],
  [ floor, bitmap`
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
);


let levelNumber = 0;
const levels = [
  map`
wwwwww
wfffww
wffffw
wwfhfw
wwfffw
wwwwww`,
  map`
wwwwwwwww
wffwfffww
wfffffffw
wfffffffw
wfwfwfhfw
wfffwfffw
wwffffffw
wwffffffw
wwwwwwwww`,
  map`
wwwwwwwww
wffffffww
wffhfwfww
wwfffwffw
wwffffwfw
wwffffwfw
wwwfffwfw
wwwfwfffw
wwwwwwwww`,
  map`
wwwwwwwww
wfffwfffw
wfwfffwfw
wfwwffffw
wffffwfww
wffwfhffw
wwffffffw
wwwffwwww
wwwwwwwww`,
  map`
wwwwwwwww
wffwffffw
wffwffffw
wfffffffw
wfffhfwww
wfffffffw
wffffwffw
wffffffww
wwwwwwwww`,
  map`
wwwwwwwww
wfffffffw
wfffffhfw
wfffffffw
wfwfwwffw
wfffwwffw
wfffffffw
wfffffffw
wwwwwwwww`,
  map`
wwwwwwwww
wffffwffw
wfwwfwffw
wfwwfffww
wfffffffw
wwwfffffw
wfffwhffw
wfffffffw
wwwwwwwww`,
  map`
wwwwwwwww
wwwwffffw
wwffffhfw
wwffwfffw
wwwfffffw
wfffwwffw
wfwfffffw
wfffffffw
wwwwwwwww`,
  map`
wwwwwwwwwwww
wfffwfffwwww
wfwfffwffwww
wfwwfffffwww
wffffwfhfffw
wwwffwfffffw
wwwfwffffwww
wwwffffffwww
wwwwwwwwwwww`
  
];

const levelPoints = [
  13,
  42,
  34,
  35,
  43,
  44,
  39,
  38,
  45
];



const currentLevel = levels[levelNumber];
setMap(currentLevel);


setSolids([ wall, catBlock, catHead ])

onInput("w", () => {

  let nextBlock = getTile(getFirst(catHead).x, getFirst(catHead).y - 1);

  if(nextBlock.length == 1) {
    
    for (let i = 0; i < nextBlock.length; i++) {
    if (nextBlock[i].type != "c" && nextBlock[i].type != "w" ) {
    addSprite(getFirst(catHead).x, getFirst(catHead).y, catBlock);
    getFirst(catHead).y -= 1
    }
    
  } 

} 


})

onInput("a", () => {
let nextBlock = getTile(getFirst(catHead).x - 1, getFirst(catHead).y);

  if(nextBlock.length == 1) {
    
    for (let i = 0; i < nextBlock.length; i++) {
    if (nextBlock[i].type != "c" && nextBlock[i].type != "w" ) {
    addSprite(getFirst(catHead).x, getFirst(catHead).y, catBlock);
    getFirst(catHead).x -= 1
    }
    
  } 

} 

})


onInput("s", () => {
let nextBlock = getTile(getFirst(catHead).x, getFirst(catHead).y + 1);

  if(nextBlock.length == 1) {
    
    for (let i = 0; i < nextBlock.length; i++) {
    if (nextBlock[i].type != "c" && nextBlock[i].type != "w" ) {
    addSprite(getFirst(catHead).x, getFirst(catHead).y, catBlock);
    getFirst(catHead).y += 1
    }
    
  } 

}  
})


onInput("d", () => {

  let nextBlock = getTile(getFirst(catHead).x + 1, getFirst(catHead).y);

  if(nextBlock.length == 1) {
    
    for (let i = 0; i < nextBlock.length; i++) {
    if (nextBlock[i].type != "c" && nextBlock[i].type != "w" ) {
    addSprite(getFirst(catHead).x, getFirst(catHead).y, catBlock);
    getFirst(catHead).x += 1
    }
    
  } 

}
  
})


// Secondary Game Controls

onInput("l", () => {
    levelNumber += 1;
    const currentLevel = levels[levelNumber];

    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`3` });
    }

})

onInput("k", () => {
    const currentLevel = levels[levelNumber];
    if(currentLevel !== undefined) setMap(currentLevel);

})


afterInput(() => {
  // console.log(tilesWith(catBlock));
  if (tilesWith(catBlock).length == levelPoints[levelNumber] -1){

    levelNumber += 1;
    const currentLevel = levels[levelNumber];
    
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`3` });
    }
    
  

    
  }
})
