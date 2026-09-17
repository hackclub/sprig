/*
@title: myyyy gameee
@author: yassminehjb
@description: Collect coins and dodge the hazards to reach the highest score!
@tags: ['arcade', 'collector']
@addedOn: 2026-07-31
*/

// 1. Déclaration des symboles
const player = "p";
const goal = "g";
const hazard = "h";

// 2. Graphismes des Sprites
setLegend(
  [ player, bitmap`
................
.....000000.....
....0FFFFFF0....
...0F0FFFF0F0...
...0FFFFFFFF0...
...0F00FF00F0...
...0F00FF00F0...
...0FFFFFFFF0...
....0FFFFFF0....
.....000000.....
....00....00....
...00......00...
...00......00...
....00....00....
.....000000.....
................` ],
  
  [ goal, bitmap`
................
.....333330.....
...3333333330...
..333.....3330..
..33...3...330..
.33...333...330.
.33...333...330.
.33...333...330.
.33...333...330.
.33...333...330.
..33...3...330..
..333.....3330..
...3333333330...
.....333330.....
................
................` ],

  [ hazard, bitmap`
................
......333.......
.....33233......
....3322233.....
......22........
....00000000....
...0222222220...
..022222222220..
..022222222220..
..022222222220..
..022222222220..
...0222222220...
....00000000....
................
................
................` ]
);

// 3. Carte du jeu (10x10)
setMap(map`
..........
.p........
..........
....h.....
..........
.......h..
..........
..........
..........
........g.
`);

// 4. Variables de jeu
let score = 0;
let isGameOver = false;

// 5. Commandes de déplacement
onInput("w", () => {
  if (!isGameOver) getFirst(player).y -= 1;
});
onInput("s", () => {
  if (!isGameOver) getFirst(player).y += 1;
});
onInput("a", () => {
  if (!isGameOver) getFirst(player).x -= 1;
});
onInput("d", () => {
  if (!isGameOver) getFirst(player).x += 1;
});

onInput("i", () => {
  if (!isGameOver) getFirst(player).y -= 1;
});
onInput("k", () => {
  if (!isGameOver) getFirst(player).y += 1;
});
onInput("j", () => {
  if (!isGameOver) getFirst(player).x -= 1;
});
onInput("l", () => {
  if (!isGameOver) getFirst(player).x += 1;
});

// 6. Gestion des règles après chaque déplacement
afterInput(() => {
  if (isGameOver) return;

  const p = getFirst(player);
  const g = getFirst(goal);
  const hazards = getAll(hazard);

  // Vérification de défaite contre un obstacle
  for (let i = 0; i < hazards.length; i++) {
    if (p.x === hazards[i].x && p.y === hazards[i].y) {
      isGameOver = true;
      clearText();
      addText("GAME OVER!", { x: 3, y: 4, color: color`2` });
      addText("Score: " + score, { x: 4, y: 6, color: color`3` });
      return;
    }
  }

  // Si le joueur attrape la pièce
  if (p.x === g.x && p.y === g.y) {
    score += 1;
    // Déplace la pièce à une nouvelle position aléatoire sur la grille (10x10)
    g.x = Math.floor(Math.random() * 10);
    g.y = Math.floor(Math.random() * 10);
  }

  // Affichage du score en haut à gauche
  clearText();
  addText("Score: " + score, { x: 1, y: 1, color: color`3` });
});