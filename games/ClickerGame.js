let score = 0;
let clickPower = 1;
const upgradeCost = 10;
const goal = 1000;
let lastPressTime = 0;
const cooldown = 200;

function incrementScore() {
  const currentTime = new Date().getTime();
  if (currentTime - lastPressTime >= cooldown) {
    score += clickPower;
    lastPressTime = currentTime;
    console.log("Score:", score);
    updateDisplay();
    if (score >= goal) {
      clearText();
      addText(`Congratulations! You reached ${goal} clicks!`, { x: 2, y: 1 });
      console.log("Game Over! You've reached the goal.");
      stopGame();
    }
  }
}

function buyUpgrade() {
  const currentTime = new Date().getTime();
  if (currentTime - lastPressTime >= cooldown) {
    if (score >= upgradeCost) {
      score -= upgradeCost;
      clickPower += 1;
      lastPressTime = currentTime;
      console.log("Upgrade purchased! Click power is now:", clickPower);
      updateDisplay();
    } else {
      console.log("Not enough points to buy an upgrade.");
      updateDisplay();
    }
  }
}

function updateDisplay() {
  clearText();
  addText(`Score: ${score}`, { x: 2, y: 1 });
  addText(`Click Power: ${clickPower}`, { x: 2, y: 2 });
  addText(`Upgrade Cost: ${upgradeCost}`, { x: 2, y: 3 });
  if (score < upgradeCost) {
    addText(`Need ${upgradeCost - score} more points for upgrade`, { x: 2, y: 4 });
  } else {
    addText(`Press 'J' to buy an upgrade`, { x: 2, y: 4 });
  }
  addText(`Goal: ${goal} clicks`, { x: 2, y: 5 });
}

function stopGame() {
  onInput("i", () => {});
  onInput("j", () => {});
  console.log("Game has ended.");
}

onInput("i", () => incrementScore());
onInput("j", () => buyUpgrade());

updateDisplay();

console.log("Press 'I' to increase your score. Press 'J' to buy an upgrade. (10 clicks)");
