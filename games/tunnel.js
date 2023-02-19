/*
@title: tunnel
@author: amin

*/

const HEIGHT = 20;
const WIDTH = 20;

let WALL_WIDTH = 8;
let iteration = 1;

let sound = tune`
127.11864406779661: f5~127.11864406779661 + e5~127.11864406779661 + d5~127.11864406779661,
127.11864406779661: d5~127.11864406779661 + c5~127.11864406779661 + b4~127.11864406779661 + a4~127.11864406779661 + g4~127.11864406779661,
127.11864406779661: g4-127.11864406779661 + f4-127.11864406779661,
3686.4406779661017`;

let running = true;
const player = "p";
const wall = "w";

setLegend(
  [
    player,
    bitmap`
................
................
................
.......00.......
......0000......
....00000000....
....00333300....
...0003223000...
...0003333000...
..000000000000..
................
................
................
................
................
................`,
  ],
  [
    wall,
    bitmap`
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
0000000000000000`,
  ]
);

let level = generateLine() + "\n";
let playerPosition = Math.floor(WIDTH / 2);

for (let i = 0; i < HEIGHT - 1; i++) {
  let lines = level.split("\n");
  lines.unshift(generateNewLine(lines[0]));
  level = lines.join("\n");
}

setMap(level);

addText("Tunnel", {
  x: 6,
  y: 5,
  color: color`7`,
});

addText("Use A and D ", {
  x: 4,
  y: 6,
  color: color`9`,
});

addText("to move ", {
  x: 5,
  y: 7,
  color: color`9`,
});

function generateLine() {
  let left = Math.floor(Math.random() * WALL_WIDTH);

  let line = wall.repeat(left) + ".".repeat(WIDTH - WALL_WIDTH) + wall.repeat(WALL_WIDTH - left);

  return line;
}

function generateNewLine(previousLine) {
  let i = 0;
  while (previousLine[i] == "w") {
    i += 1;
  }
  let left = Math.min(Math.max(0, i + Math.floor(Math.random() * 3 - 1)), WALL_WIDTH);
  let line = wall.repeat(left) + ".".repeat(WIDTH - WALL_WIDTH) + wall.repeat(WALL_WIDTH - left);

  return line;
}

const handleLeft = () => {
  if (running && getFirst(player)) {
    getFirst(player).x -= 1;
    if (playerPosition < WIDTH) playerPosition -= 1;
  }
};

const handleRight = () => {
  if (running && getFirst(player)) {
    getFirst(player).x += 1;
    if (playerPosition < WIDTH) playerPosition += 1;
  }
};

onInput("a", handleLeft);
onInput("d", handleRight);

onInput("j", handleLeft);
onInput("k", handleRight);

afterInput(() => {
  let lines = level.split("\n");
  let last = lines[lines.length - 1];
  if (last[playerPosition] == "w") {
    running = false;
    addText("You lose!", {
      x: 5,
      y: 6,

      color: color`3`,
    });
  }
});

setTimeout(() => {
  clearText();
  setInterval(() => {
    if (running) {
      if (iteration % 100 == 0) {
        playTune(sound);
        if (WALL_WIDTH < WIDTH) WALL_WIDTH += 1;
      }
      iteration++;
      addText("Score: " + iteration, {
        x: 4,
        y: 0,
        color: color`5`,
      });

      let lines = level.split("\n");

      let newLines = lines.splice(0, lines.length - 1);
      let last = newLines[newLines.length - 1];

      newLines.unshift(generateNewLine(newLines[0]));
      if (last[playerPosition] == "w") {
        running = false;
        addText("You lose!", {
          x: 5,
          y: 6,

          color: color`3`,
        });
      } else {
        newLines[newLines.length - 1] = last.substring(0, playerPosition) + player + last.substring(playerPosition + 1, last.length);

        level = newLines.join("\n");

        setMap(map`${level}`);
      }
    }
  }, 40);
}, 500);
