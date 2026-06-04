setLegend(
  ["W", bitmap`
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
  `],
  ["B", bitmap`
    ................
    .....777777.....
    ...7777777777...
    ..777777777777..
    .77777777777777.
    .7777....777777.
    7777......777777
    7777......777777
    7777......777777
    7777......777777
    .7777....777777.
    .77777777777777.
    ..777777777777..
    ...7777777777...
    .....777777.....
    ................
  `]
);

setSolids([]);

const board = map`
WWWWWWWWWWWWW
W...........W
W...........W
W...........W
W.....B.....W
W...........W
W...........W
W...........W
WWWWWWWWWWWWW
`;

setMap(board);

let clicks = 0;
let playing = true;

addText("Press I to Click!", { y: 1, color: "#ffffff" });

onInput("i", () => {
  if (!playing) return;
  
  clicks += 1;
  playTune(500, 30);
  
  addText("Clicks: " + clicks, { y: 2, color: "#00ff00" });
  
  if (clicks >= 20) {
    playing = false;
    addText("YOU WIN! FAST!", { y: 5, color: "#ffff00" });
    playTune(800, 300);
  }
});

onInput("j", () => {
  clicks = 0;
  playing = true;
  setMap(board);
  addText("Clicks: 0", { y: 2, color: "#ffffff" });
});