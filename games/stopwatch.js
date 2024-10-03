/*
@title: Stopwatch
@author: DominantDuck
@tags: ['utility','timed']
@addedOn: 2024-06-26
*/
let startTime = 0;
let elapsedTime = 0;
let intervalId = null;
let splits = [];

let level = 0;
const levels = [
  map`
.......
.......
.......
.......
.......
.......`
];

setMap(levels[level]);

function startStopwatch() {
  if (intervalId === null) {
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(updateTime, 100);
  }
}

function stopStopwatch() {
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

function resetStopwatch() {
  stopStopwatch();
  elapsedTime = 0;
  splits = [];
  displayTime();
}

function recordSplit() {
  splits.push(elapsedTime);
  displayTime();
}

function updateTime() {
  elapsedTime = Date.now() - startTime;
  displayTime();
}

function displayTime() {
  const totalMilliseconds = elapsedTime;
  const totalSeconds = Math.floor(totalMilliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = totalMilliseconds % 1000;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
  console.log(formattedTime);

  clearText();
  addText(formattedTime, { x: 5, y: 1, color: color`0` });
  addText("____________________________________", { x: -16, y: 2, color: color`0` });

  splits.forEach((split, index) => {
    const splitSeconds = Math.floor(split / 1000);
    const splitMinutes = Math.floor(splitSeconds / 60);
    const splitMillis = split % 1000;
    const formattedSplit = `${String(splitMinutes).padStart(2, '0')}:${String(splitSeconds % 60).padStart(2, '0')}.${String(splitMillis).padStart(3, '0')}`;
    addText(`${index + 1}) ${formattedSplit}`, { x: 3, y: 4 + index, color: color`7` });
  });
}

onInput("s", startStopwatch);

onInput("d", stopStopwatch);

onInput("a", resetStopwatch);

onInput("w", recordSplit);

afterInput(() => {
  displayTime();
});
