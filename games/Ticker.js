/*
@title: click_speed_challenge
@description: Click the big red button as fast as you can in 10 seconds and get your legendary rank! Press D after game ends to see all ranks with required clicks.
@author: Arman
*/

// --- Sprites ---
const button = "b";

setLegend(
  ["b", bitmap`
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
3333333333333333`]
);

// --- Game Variables ---
let clickCount = 0;
let timeLeft = 10;
let gameActive = true;
let timerId = null;
let rankPage = 0; // for scrolling ranks
let gameStarted = false; // flag for first click

// --- Legendary Ranks (20 levels for 0-100 clicks) ---
const ranks = [
  "Sloth","Snail","Turtle","Peasant","Knight",
  "Samurai","Pirate","Ninja","Hero","Champion",
  "Legend","Master","Godlike","Titan","Dragon",
  "King","Emperor","Overlord","Legendary God","Supreme King"
];

// --- Place button in center ---
setMap(map`
................
................
................
................
................
................
.......b........
................
................
................
................
................
................
................
................
................`);

// --- Show initial prompt ---
addText("Click W Rapidly!", { x: 2, y: 7, color: color`5` });

// --- Click Detection (W key) ---
onInput("w", () => {
  if (!gameStarted) {
    // first click starts the timer
    gameStarted = true;
    startTimer();
  }

  if (!gameActive) return;
  clickCount++;
});

// --- Timer & Display ---
function startTimer() {
  if (timerId) clearInterval(timerId); // clear old timer
  timerId = setInterval(() => {
    if (!gameActive) return;

    timeLeft--;

    // clear previous text
    clearText();
    addText("Clicks: " + clickCount, { x: 0, y: 0, color: color`4` });
    addText("Time: " + timeLeft, { x: 0, y: 1, color: color`9` });

    if (timeLeft <= 0) {
      gameActive = false;
      clearInterval(timerId);
      showRank();
    }
  }, 1000);
}

// --- Show Rank after game ---
function showRank() {
  clearText();
  const rankIndex = Math.min(Math.floor(clickCount / 5), ranks.length - 1); // 100 clicks max, 5 per rank
  addText("Time's Up!", { x: 4, y: 4, color: color`3` });
  addText("Clicks: " + clickCount, { x: 4, y: 6, color: color`4` });
  addText("Rank: " + ranks[rankIndex], { x: 4, y: 8, color: color`6` });
  addText("Press J to Restart", { x: 2, y: 10, color: color`9` });
  addText("Press D to see all ranks", { x: 2, y: 12, color: color`7` });
  rankPage = 0; // reset page when showing ranks
  gameStarted = false;
}

// --- Show ranks page-wise (10 per page) with single click values ---
function showRankPage() {
  if (gameActive) return; // only show after game ends
  clearText();
  addText("Legendary Ranks:", { x: 2, y: 0, color: color`3` });
  const start = rankPage * 10;
  const end = Math.min(start + 10, ranks.length);
  for (let i = start; i < end; i++) {
    const requiredClicks = (i + 1) * 5; // single click number for rank
    addText(`${requiredClicks}: ${ranks[i]}`, { x: 2, y: i - start + 2 });
  }
  addText("Press D for next", { x: 2, y: 13, color: color`7` });
  addText("Press J to Restart", { x: 2, y: 14, color: color`9` });
  rankPage++;
  if (rankPage * 10 >= ranks.length) rankPage = 0; // loop back to start
}

// --- Restart (J key) ---
onInput("j", () => {
  clickCount = 0;
  timeLeft = 10;
  gameActive = true;
  clearText();
  addText("Click W Rapidly!", { x: 2, y: 7, color: color`5` }); // show prompt again
  gameStarted = false;
});

// --- Show rank pages (D key) ---
onInput("d", () => {
  showRankPage();
});