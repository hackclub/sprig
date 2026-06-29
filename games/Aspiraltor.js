/*
@title: Aspiraltor
@description: Un calamar geant spatial qui nettoie les debris en orbite grace a un systeme d'aimants et d'aspirateurs alimentes par l'energie solaire.
@instructions: Utilise Z, Q, S, D pour deplacer le calamar geant. Les debris accelerent toutes les 2 minutes !
@author: Ton Nom
@tags: ['space', 'cleaner', 'eco']
@addedOn: 2026-06-29
*/

const player = "c"
const debris = "d"
const sun = "s"
const stars = "e" 
const planet = "p"

setLegend(
  [ player, bitmap`
.......000......
.....000.000....
...00......00...
..00........0...
..0..7...7..00..
..00...7.....0..
...0........00..
...00L.L...LL...
...LLL.L.L...L..
..L.L.LL..L..L..
.L.LL..L..L..L..
.L.L...LL..LLL..
.L.L....L..LLLL.
.L.LL...L.LL..L.
LL..LL..L.L...L.
L...LL..L.LL..L.` ],
  [ debris, bitmap`
................
................
................
................
........00......
......660066....
........00......
................
................
................
................
................
................
................
................
................` ],
  [ sun, bitmap`
................
.......0........
.....04440......
....0443440.....
...044333440....
...043333340....
...044333440....
....0443440.....
.....04440......
.......0........
................
................
................
................
................
................` ],
  [ stars, bitmap`
................
....1...........
................
..........1.....
................
.......1........
................
..1.............
................
................
......1.........
................
............1...
................
...1............
................` ],
  [ planet, bitmap`
................
......2222......
....22222222....
..222222222222..
..222200222222..
2222200002222222
2222200002222222
2222220022222222
..222222222222..
..222222222222..
....22222222....
......2222......
................
................
................
................` ]
)

setSolids([])

// --- INTERFACE ---
let score = 0;
let affichageScore = addText(`Score: ${score}`, { x: 1, y: 1, color: color`3` }); 

let energie = 30; 
let affichageEnergie = addText(`Energie: ${energie}`, { x: 1, y: 2, color: color`4` }); 

let niveau = 1;
let affichageNiveau = addText(`Niveau: ${niveau}`, { x: 1, y: 3, color: color`7` });

let jeuEnCours = true;

let level = 0
const levels = [
  map`
ceeeeeee
eeeeeees
eeepeeee
eeeeeeee
eeeeeees`
]

setMap(levels[level])

// Deplacements
onInput("w", () => { if(jeuEnCours) getFirst(player).y -= 1; });
onInput("s", () => { if(jeuEnCours) getFirst(player).y += 1; });
onInput("a", () => { if(jeuEnCours) getFirst(player).x -= 1; });
onInput("d", () => { if(jeuEnCours) getFirst(player).x += 1; });

// --- GENERATION DE DEBRIS ---
setInterval(() => {
  if (!jeuEnCours) return;
  const randomX = Math.floor(Math.random() * 8);
  
  const objetsSurCase = getTile(randomX, 0);
  let caseOccupee = false;
  objetsSurCase.forEach(obj => {
    if (obj.type === player || obj.type === sun) caseOccupee = true;
  });

  if (!caseOccupee) {
    addSprite(randomX, 0, debris);
  }
}, 2500);

// --- SYSTÈME DE VITESSE ET ACCÉLÉRATION ---
let tempsDeplacement = 2000; 
let chronoDeplacement = 0;

setInterval(() => {
  if (!jeuEnCours) return;

  chronoDeplacement += 100; 

  if (chronoDeplacement >= tempsDeplacement) {
    chronoDeplacement = 0; 
    
    const tousLesDebris = getAll(debris);
    tousLesDebris.forEach(unDebris => {
      if (unDebris.y >= 4) { 
        unDebris.remove();
      } else {
        unDebris.y += 1;
      }
    });
    verifierCollision();
  }
}, 100); 

// --- CHRONO DES 2 MINUTES ---
setInterval(() => {
  if (!jeuEnCours) return;

  niveau += 1; 
  energie += 10; 
  
  if (tempsDeplacement > 600) {
    tempsDeplacement -= 400; 
  }

  if (affichageNiveau) affichageNiveau.remove();
  affichageNiveau = addText(`Niveau: ${niveau} (VITE!)`, { x: 1, y: 3, color: color`7` });

  if (affichageEnergie) affichageEnergie.remove();
  affichageEnergie = addText(`Energie: ${energie}`, { x: 1, y: 2, color: color`4` });

}, 120000); 

// Fonction de collision (Aspirateur)
function verifierCollision() {
  const monCalamar = getFirst(player);
  if (!monCalamar) return;

  const tousLesDebris = getAll(debris);
  tousLesDebris.forEach(unDebris => {
    if (monCalamar.x === unDebris.x && monCalamar.y === unDebris.y) {
      unDebris.remove(); 
      score += 1;
      
      if (affichageScore) affichageScore.remove();
      affichageScore = addText(`Score: ${score}`, { x: 1, y: 1, color: color`3` });
    }
  });
}

// Logique apres chaque mouvement du joueur
afterInput(() => {
  if (!jeuEnCours) return;

  const monCalamar = getFirst(player);
  
  // Consommation d'energie
  energie -= 1; 
  if (affichageEnergie) affichageEnergie.remove();
  affichageEnergie = addText(`Energie: ${energie}`, { x: 1, y: 2, color: color`4` });

  // Recharge solaire
  const tousLesSoleils = getAll(sun);
  tousLesSoleils.forEach(unSoleil => {
    if (monCalamar.x === unSoleil.x && monCalamar.y === unSoleil.y) {
      energie = 30; 
      if (affichageEnergie) affichageEnergie.remove();
      affichageEnergie = addText(`Energie: RECHARGEE!`, { x: 1, y: 2, color: color`4` });
    }
  });

  verifierCollision();

  // Game Over si plus d'energie
  if (energie <= 0) {
    jeuEnCours = false;
    addText("GAME OVER!", { x: 1, y: 4, color: color`2` });
  }
});