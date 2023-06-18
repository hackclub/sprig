/*
@title: SprigBoy
@author: 
*/
const createArray = (size) => [...Array(size).keys()];
const wait = (time) => new Promise((resolve) => setTimeout(resolve, time));
const player = "p";
const box = "b";
const wall = "w";
const flag = "m";

const boxLimit = 1;
let inAir = 0;
setLegend(
  [player, bitmap`…`],
  [box, bitmap`…`],
  [wall, bitmap`…`],
  [flag, bitmap`…`]
)

setSolids([player, wall, box])

let level = 0
const levels = [
  map`…`,
  map`…`,
  map`…`,
  map`…`,
  map`…`,
  map`…`,
  map`…`]

setMap(levels[level])

setPushables({
  [ player ]: [ box ]
})

onInput("w", () => {
  checkFlag()
  if (inAir) return;

  inAir++;
  jump().then(async () => {
    inAir--;
  });
});

onInput("i", () => {
  setMap(levels[level])
})

const jump = async () => {
  await createArray(1).reduce(async (promise) => {
    await promise;

    getFirst(player).y -= 1;
    await wait(300);
  }, Promise.resolve());

  await resetGravity();
};

const resetGravity = async () => {
  await createArray(1).reduce(async (promise) => {
    await promise;
}
