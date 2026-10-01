// @title: Maze Runner Ultra
// @author: John Carlos Caicedo
// @description: Un juego retro de laberintos de múltiples niveles progresivos con recolección de llaves y sistema de XP.
// @tags: ['maze', 'puzzle', 'retro']
// @addedOn: 2026-10-01

// ==========================================
// GAME: Maze Runner Ultra - Hack Club Edition
// AUTHOR: John Carlos Caicedo
// ==========================================

// 1. DIBUJOS Y SPRITES
setLegend(
  ["p", bitmap`
................
.....LLLLLL.....
....L333333L....
....L313313L....
....L333333L....
....LLLLLLLL....
.....LLLLLL.....
...LLLLLLLLLL...
..L.LLLLLLLL.L..
..L.L.LLLL.L.L..
..L.L.LLLL.L.L..
....LL....LL....
....LL....LL....
....LL....LL....
....LL....LL....
................`], // p = Jugador

  ["w", bitmap`
0000000000000000
0000000000000000
00LL00000000LL00
00LL00000000LL00
0000000000000000
0000000000000000
000000LLLL000000
000000LLLL000000
0000000000000000
0000000000000000
00LL00000000LL00
00LL00000000LL00
0000000000000000
0000000000000000
0000000000000000
0000000000000000`], // w = Pared

  ["k", bitmap`
................
.....333333.....
.....3....3.....
.....333333.....
.......33.......
.......33.......
.......3333.....
.......33.......
.......3333.....
................
................
................
................
................
................
................`], // k = Llave

  ["d", bitmap`
LLLLLLLLLLLLLLLL
L..............L
L.LLLLLLLLLLLL.L
L.L..........L.L
L.L..LLLLLL..L.L
L.L..L....L..L.L
L.L..L.LL.L..L.L
L.L..L.LL.L..L.L
L.L..L....L..L.L
L.L..LLLLLL..L.L
L.L..........L.L
L.LLLLLLLLLLLL.L
L..............L
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`]  // d = Portal Gris
);

// 2. MAPAS (16x16 STRICTOS)
const NIVELES = [
  map`
wwwwwwwwwwwwwwww
wp.....w.......w
wwwww.w.w.wwww.w
w.....w.w....w.w
w.wwwww.wwww.w.w
w.w.........w..w
w.w.wwwwwww.ww.w
w...w.....w..w.w
wwwww.www.ww.w.w
w.....w.w..w...w
w.wwwww.ww.www.w
w.....w..w.w...w
w.www.ww.w.w.www
w...w.k..w...d.w
w.wwwwwwwwwwww.w
wwwwwwwwwwwwwwww`,

  map`
wwwwwwwwwwwwwwww
wp..w...w......w
w.w.w.w.w.wwww.w
w.w...w.w.w....w
w.wwwww.w.w.wwww
w.....w.w.w...ww
wwwww.w.w.www.ww
w...w.w...w...ww
w.w.w.wwwww.wwww
w.w.w.....w.w..w
w.w.wwwww.w.w.ww
w.w.....w.w.w..w
w.wwwww.w.w.ww.w
w...k.w...w..d.w
w.www.wwwwwww.ww
wwwwwwwwwwwwwwww`,

  map`
wwwwwwwwwwwwwwww
wp.............w
wwwwwwwwwwwwww.w
w............k.w
w.wwwwwwwwwwwwww
w..............w
wwwwwwwwwwwwww.w
w..............w
w.wwwwwwwwwwwwww
w..............w
wwwwwwwwwwwwww.w
w..............w
w.wwwwwwwwwwwwww
w..............w
wwwwwwwwwwwwwwdw
wwwwwwwwwwwwwwww`
];

// 3. CONFIGURACIÓN Y ESTADOS
setSolids(["w", "d"]);

let nivelActual = 0;
let xp = 0;
let tieneLlave = false;
let juegoTerminado = false;

iniciarJuego();

function iniciarJuego() {
  nivelActual = 0;
  xp = 0;
  tieneLlave = false;
  juegoTerminado = false;
  cargarNivel(0);
}

function actualizarTexto() {
  clearText();
  let estadoLlave = tieneLlave ? "SI" : "NO";
  addText("NIV " + (nivelActual + 1) + " XP " + xp + " KEY " + estadoLlave, { x: 0, y: 0, color: color`3` });
}

function cargarNivel(num) {
  tieneLlave = false;
  setMap(NIVELES[num]);
  actualizarTexto();
}

function ganarJuego() {
  juegoTerminado = true;
  clearText();
  addText("FELICIDADES", { x: 2, y: 2, color: color`5` });
  addText("JUEGO COMPLETADO", { x: 0, y: 4, color: color`3` });
  addText("XP TOTAL " + xp, { x: 3, y: 7, color: color`1` });
  addText("RANK MAESTRO SPRIG", { x: 0, y: 9, color: color`4` });
  addText("PRESIONA R REINICIAR", { x: 0, y: 12, color: color`2` });
}

// 4. MOVIMIENTO Y CONTROLES
function intentarMover(dx, dy) {
  if (juegoTerminado) {
    iniciarJuego();
    return;
  }

  let p = getFirst("p");
  if (!p) return;

  let nuevoX = p.x + dx;
  let nuevoY = p.y + dy;

  if (nuevoX < 0 || nuevoX > 15 || nuevoY < 0 || nuevoY > 15) return;

  let casillasDestino = getTile(nuevoX, nuevoY) || [];
  let hayPared = casillasDestino.some(s => s && s.type === "w");

  if (hayPared) return;

  p.x = nuevoX;
  p.y = nuevoY;
}

onInput("w", () => intentarMover(0, -1));
onInput("s", () => intentarMover(0, 1));
onInput("a", () => intentarMover(-1, 0));
onInput("d", () => intentarMover(1, 0));
onInput("i", () => iniciarJuego());

// 5. EVENTOS Y COLISIONES
afterInput(() => {
  if (juegoTerminado) return;

  let p = getFirst("p");
  if (!p) return;

  let casillas = getTile(p.x, p.y) || [];

  for (let item of casillas) {
    if (item.type === "k") {
      item.remove();
      tieneLlave = true;
      xp += 100;
      actualizarTexto();
      addText("LLAVE OBTENIDA", { x: 1, y: 15, color: color`3` });
    }
  }

  for (let item of casillas) {
    if (item.type === "d") {
      if (tieneLlave) {
        item.remove();
        xp += 500;
        nivelActual++;

        if (nivelActual < NIVELES.length) {
          cargarNivel(nivelActual);
        } else {
          ganarJuego();
        }
      } else {
        actualizarTexto();
        addText("REQUIERE LLAVE", { x: 1, y: 15, color: color`2` });
      }
    }
  }
});
