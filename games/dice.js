/*
@title: dice
@author: Tawhid
@tags: ['retro']
@addedOn: 2024-10-11
*/

let background = "b";


// Define dice faces
setLegend(
  ["1", bitmap`
2222222222222222
2999999999999992
2999999999999992
2999999999999992
2999000000009992
2999000000009992
2999000000009992
2999000000009992
2999000000009992
2999000000009992
2999000000009992
2999000000009992
2999999999999992
2999999999999992
2999999999999992
2222222222222222`],
  ["2", bitmap`
2222222222222222
2999999999999992
2999999999999992
2999999999999992
2999999999999992
2900000990000092
2900000990000092
2900000990000092
2900000990000092
2900000990000092
2900000990000092
2999999999999992
2999999999999992
2999999999999992
2999999999999992
2222222222222222`],
  ["3", bitmap`
2222222222222222
2999999999999992
2999000000009992
2999000000009992
2999000000009992
2999000000009992
2999000000009992
2999999999999992
2900000990000092
2900000990000092
2900000990000092
2900000990000092
2900000990000092
2900000990000092
2999999999999992
2222222222222222`],
  ["4", bitmap`
2222222222222222
2999999999999992
2900000990000092
2900000990000092
2900000990000092
2900000990000092
2900000990000092
2999999999999992
2999999999999992
2900000990000092
2900000990000092
2900000990000092
2900000990000092
2900000990000092
2999999999999992
2222222222222222`],
  ["5", bitmap`
2222222222222222
2999999999999992
2900000990000092
2900000990000092
2900000990000092
2900000990000092
2900000000000092
2999990000999992
2999990000999992
2900000000000092
2900000990000092
2900000990000092
2900000990000092
2900000990000092
2999999999999992
2222222222222222`],
  ["6", bitmap`
2222222222222222
2900090000900092
2900090000900092
2900090000900092
2900090000900092
2999999999999992
2900090000900092
2900090000900092
2900090000900092
2900090000900092
2999999999999992
2900090000900092
2900090000900092
2900090000900092
2900090000900092
2222222222222222`],
  [background, bitmap`
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
  ["c", `
9999999999999999
9999999999999999
9900090000900099
9900090000900099
9900090000900099
9900090000900099
9999999999999999
9900090000900099
9900090000900099
9900090000900099
9900090000900099
9999999999999999
9900090000900099
9900090000900099
9900090000900099
9999999999999999`],
);

let page = "welcome";
const pages = {
  welcome: () => {
    page = "welcome";
    clearText();
    addText("Roll a Dice!", { x: 4, y: 2, color: color`2` });
    addText("Press anykey to roll", { x: 0, y: 14, color: color`2` });
    return map`
bbb
b1b
bbb`;
  },
  animation: (dice) => {
    page = "animation";
    clearText();
    return map`
.....
..${dice}..
.....`;
  },
  result: (dice) => {
    page = "result";
    clearText();
    return map`
.....
..${dice}..
.....`;
  },
}

setBackground(background);
setMap(pages.welcome());

onInput("i", () => {
  let i = 1;
  let interval = setInterval(() => {
    setMap(pages.animation(i)); // Show current dice face
    i++;
    if (i > 6) {
      i = 1;
    }
  }, 100); // Change the face every 100 milliseconds

  setTimeout(() => {
    clearInterval(interval);
    let result = Math.floor(Math.random() * 6) + 1; // Get a random number between 1 and 6
    setMap(pages.result(result));
    addText(`You rolled ${result}!`, { x: 4, y: 11, color: color`8` });

    addText(`Press again`, { x: 5, y: 14, color: color`8` });
  }, 1000); // Show the animation for 1 second
});

onInput("j", () => {
  let i = 1;
  let interval = setInterval(() => {
    setMap(pages.animation(i)); // Show current dice face
    i++;
    if (i > 6) {
      i = 1;
    }
  }, 100); // Change the face every 100 milliseconds

  setTimeout(() => {
    clearInterval(interval);
    let result = Math.floor(Math.random() * 6) + 1; // Get a random number between 1 and 6
    setMap(pages.result(result));
    addText(`You rolled ${result}!`, { x: 4, y: 11, color: color`8` });

    addText(`Press again`, { x: 5, y: 14, color: color`8` });
  }, 1000); // Show the animation for 1 second
});

onInput("k", () => {
  let i = 1;
  let interval = setInterval(() => {
    setMap(pages.animation(i)); // Show current dice face
    i++;
    if (i > 6) {
      i = 1;
    }
  }, 100); // Change the face every 100 milliseconds

  setTimeout(() => {
    clearInterval(interval);
    let result = Math.floor(Math.random() * 6) + 1; // Get a random number between 1 and 6
    setMap(pages.result(result));
    addText(`You rolled ${result}!`, { x: 4, y: 11, color: color`8` });

    addText(`Press again`, { x: 5, y: 14, color: color`8` });
  }, 1000); // Show the animation for 1 second
});

onInput("l", () => {
  let i = 1;
  let interval = setInterval(() => {
    setMap(pages.animation(i)); // Show current dice face
    i++;
    if (i > 6) {
      i = 1;
    }
  }, 100); // Change the face every 100 milliseconds

  setTimeout(() => {
    clearInterval(interval);
    let result = Math.floor(Math.random() * 6) + 1; // Get a random number between 1 and 6
    setMap(pages.result(result));
    addText(`You rolled ${result}!`, { x: 4, y: 11, color: color`8` });

    addText(`Press again`, { x: 5, y: 14, color: color`8` });
  }, 1000); // Show the animation for 1 second
});

onInput("w", () => {
  let i = 1;
  let interval = setInterval(() => {
    setMap(pages.animation(i)); // Show current dice face
    i++;
    if (i > 6) {
      i = 1;
    }
  }, 100); // Change the face every 100 milliseconds

  setTimeout(() => {
    clearInterval(interval);
    let result = Math.floor(Math.random() * 6) + 1; // Get a random number between 1 and 6
    setMap(pages.result(result));
    addText(`You rolled ${result}!`, { x: 4, y: 11, color: color`8` });

    addText(`Press again`, { x: 5, y: 14, color: color`8` });
  }, 1000); // Show the animation for 1 second
});

onInput("a", () => {
  let i = 1;
  let interval = setInterval(() => {
    setMap(pages.animation(i)); // Show current dice face
    i++;
    if (i > 6) {
      i = 1;
    }
  }, 100); // Change the face every 100 milliseconds

  setTimeout(() => {
    clearInterval(interval);
    let result = Math.floor(Math.random() * 6) + 1; // Get a random number between 1 and 6
    setMap(pages.result(result));
    addText(`You rolled ${result}!`, { x: 4, y: 11, color: color`8` });

    addText(`Press again`, { x: 5, y: 14, color: color`8` });
  }, 1000); // Show the animation for 1 second
});

onInput("s", () => {
  let i = 1;
  let interval = setInterval(() => {
    setMap(pages.animation(i)); // Show current dice face
    i++;
    if (i > 6) {
      i = 1;
    }
  }, 100); // Change the face every 100 milliseconds

  setTimeout(() => {
    clearInterval(interval);
    let result = Math.floor(Math.random() * 6) + 1; // Get a random number between 1 and 6
    setMap(pages.result(result));
    addText(`You rolled ${result}!`, { x: 4, y: 11, color: color`8` });

    addText(`Press again`, { x: 5, y: 14, color: color`8` });
  }, 1000); // Show the animation for 1 second
});

onInput("d", () => {
  let i = 1;
  let interval = setInterval(() => {
    setMap(pages.animation(i)); // Show current dice face
    i++;
    if (i > 6) {
      i = 1;
    }
  }, 100); // Change the face every 100 milliseconds

  setTimeout(() => {
    clearInterval(interval);
    let result = Math.floor(Math.random() * 6) + 1; // Get a random number between 1 and 6
    setMap(pages.result(result));
    addText(`You rolled ${result}!`, { x: 4, y: 11, color: color`8` });

    addText(`Press again`, { x: 5, y: 14, color: color`8` });
  }, 1000); // Show the animation for 1 second
});
