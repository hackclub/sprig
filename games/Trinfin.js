/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Trinfin
@author: 
@tags: []
@addedOn: 2024-00-00

Istruzioni: Benvenuti nel mondo di Trinfin, uno gnomo che dovrai aiutare ad uscire da questo incasinato mondo pieno di scatole, e non solo.
            Per liberare Trinfin dovrai superare vari livelli tra i quali ne roverai alcuni più facili altri più impegnativi e dovrai raccogliere 
            tutte le monete sparse tra essi. Se sbagli o comunque vuoi riiniziare il livello ti basterà premere j, mentre per muoverti usa i comandi
            w a s d; Buona fortuna e spero che questo semplice gioco ti piacerà ;)
          
            
instructions: Welcome to the world of Trinfin, a gnome who you will help get out of this chaotic world full of boxes, and not just.
             To free Trinfin, you'll have to pass through several levels, among which you will clear some easier ones and more challenging ones, 
             and you will have to collect all the coins scattered among them. If you make a mistake or you want to restart the level, just press j, 
             while to move use the commands w a s . Good luck and hope you enjoy this simple game ;)           
*/

const player = "p";
  const block="b";
const blocks="m";
const arrivo="A"
const blockill="K";
const background="B";
const iconcoin="I";
const coin="C";
const portale="l";
const portaleritorno="r";
const portaleandata="t";
const portalearrivo="u"
let canMove = true;
setLegend(
  [ player, bitmap`
.033333333330...
00000000000000..
.0LLLL88LLLL0...
.0L8808808810...
.0L8888888810...
.0LL110011LL0...
..0LL1111LL0....
...00LL1L00.....
..0550LL0550....
.050550055050...
.050555555050...
.080CC66CC080...
..0055555500....
...05555550.....
...0L1001L0.....
...000..000.....` ],
  [ block, bitmap`
0000000000000000
0999999999999990
0900000000000090
09099C99C99C9090
0909C99C99C99090
090C99C99C99C090
09099C99C99C9090
0909C99C99C99090
090C99C99C99C090
09099C99C99C9090
0909C99C99C99090
090C99C99C99C090
09099C99C99C9090
0900000000000090
0999999999999990
0000000000000000` ],
  [ blockill, bitmap`
0000000000000000
0CCCCCCCCCCCCCC0
0C000000000000C0
0C0C9C99C99C90C0
0C09C99C99C990C0
0C0C99C99C99C0C0
0C099C99C99C90C0
0C09C99C99C990C0
0C0C99C99C99C0C0
0C099C99C99C90C0
0C09C99C99C990C0
0C0C99C99C99C0C0
0C099C99C99C90C0
0C000000000000C0
0CCCCCCCCCCCCCC0
0000000000000000` ],
  [blocks, bitmap`
LL111LLL11111111
LL1LLLL1111LLLLL
1L111111111LL111
LLL1LL1111L11LLL
11LLLL111L1LLL11
LL1111LLL11LLL1L
L111LLLLL11L1111
11L1LL111LL11111
LL111111111L11L1
L1111L11111LL1L1
1111LLLLL1LL1LLL
L11111L1LLL111LL
LLL1L11LLLLLLLLL
1111111111LL11LL
1LL1LLLLLL11L11L
111LLL111111LL1L`],
  [iconcoin, bitmap`
0....666666....0
....66666666....
...6666226666...
...6662662666...
...6662666666...
...6662666666...
...6662662666...
...6666226666...
....66666666....
.....666666.....
................
................
2...............
................
................
0..............0`],
  [coin, bitmap`
................
................
................
.....666666.....
....66666666....
...6666226666...
...6662662666...
...6662666666...
...6662666666...
...6662662666...
...6666226666...
....66666666....
.....666666.....
................
................
................`],
  [arrivo, bitmap`
0000000000000000
0DDDDDDDDDDDDDD0
0D444444444444D0
0D4DDDDDDDDDD4D0
0D4D44444444D4D0
0D4D4DDDDDD4D4D0
0D4D4D4444D4D4D0
0D4D4D4DD4D4D4D0
0D4D4D4DD4D4D4D0
0D4D4D4444D4D4D0
0D4D4DDDDDD4D4D0
0D4D44444444D4D0
0D4DDDDDDDDDD4D0
0D444444444444D0
0DDDDDDDDDDDDDD0
0000000000000000`],
   [portale, bitmap`
0000000000000000
0555555555555550
0577777777777750
0575555555555750
0575777777775750
0575755555575750
0575757777575750
0575757557575750
0575757557575750
0575757777575750
0575755555575750
0575777777775750
0575555555555750
0577777777777750
0555555555555550
0000000000000000`],
   [portaleritorno, bitmap`
LLLLLLLLLLLLLLLL
L55555555555555L
L57777777777775L
L57555555555575L
L57577777777575L
L57575555557575L
L57575777757575L
L57575755757575L
L57575755757575L
L57575777757575L
L57575555557575L
L57577777777575L
L57555555555575L
L57777777777775L
L55555555555555L
LLLLLLLLLLLLLLLL`],
  [portalearrivo, bitmap`
0000000000000000
0444444444444440
0455555555555540
0454444444444540
0454555555554540
0454544444454540
0454545555454540
0454545445454540
0454545445454540
0454545555454540
0454544444454540
0454555555554540
0454444444444540
0455555555555540
0444444444444440
0000000000000000`],
   [portaleandata, bitmap`
LLLLLLLLLLLLLLLL
L44444444444444L
L45555555555554L
L45444444444454L
L45455555555454L
L45454444445454L
L45454555545454L
L45454544545454L
L45454544545454L
L45454555545454L
L45454444445454L
L45455555555454L
L45444444444454L
L45555555555554L
L44444444444444L
LLLLLLLLLLLLLLLL`]
)

// Create a tune:

const passlevel= tune`
666.6666666666666: C4~666.6666666666666,
666.6666666666666: E4~666.6666666666666,
666.6666666666666: G4~666.6666666666666,
666.6666666666666: B4~666.6666666666666,
666.6666666666666: G4~666.6666666666666,
666.6666666666666: B4~666.6666666666666,
17333.333333333332`
const died = tune`
152.28426395939087: G5-152.28426395939087,
152.28426395939087: F5-152.28426395939087,
152.28426395939087: F5-152.28426395939087,
152.28426395939087: E5-152.28426395939087,
152.28426395939087: E5-152.28426395939087,
152.28426395939087: D5-152.28426395939087,
152.28426395939087: D5-152.28426395939087,
152.28426395939087: C5-152.28426395939087,
152.28426395939087: C5-152.28426395939087,
152.28426395939087: B4-152.28426395939087,
152.28426395939087: B4-152.28426395939087,
152.28426395939087: A4-152.28426395939087,
152.28426395939087: A4-152.28426395939087,
152.28426395939087: G4-152.28426395939087,
152.28426395939087: G4-152.28426395939087,
152.28426395939087: F4-152.28426395939087,
152.28426395939087: F4-152.28426395939087,
152.28426395939087: E4-152.28426395939087,
152.28426395939087: E4-152.28426395939087,
152.28426395939087: D4-152.28426395939087,
152.28426395939087: D4-152.28426395939087,
152.28426395939087: C4-152.28426395939087,
152.28426395939087: C4-152.28426395939087,
152.28426395939087: C4-152.28426395939087,
152.28426395939087: C5-152.28426395939087,
152.28426395939087: C5-152.28426395939087,
152.28426395939087: C5-152.28426395939087,
152.28426395939087: C4-152.28426395939087,
609.1370558375635`
/*const win = tune`
375: C5~375,
375: C5~375,
375: D5~375,
375: D5~375,
375: C5~375,
375: B4~375,
375: A4~375,
375: B4~375,
375: C5~375,
375: C5~375,
375: D5~375,
375: D5~375,
375: C5~375,
375: B4~375,
375: A4~375,
375: B4~375,
375: C5~375,
375: C5~375,
375: C5~375,
375: C5~375,
375: D5~375,
375: D5~375,
375: E5~375,
375: F5~375,
375: E5~375,
375: E5~375,
375: D5~375,
375: D5~375,
375: C5~375,
375: C5~375,
375: C5~375,
375: C5~375`
const win1 = tune`
375: G4~375,
375: A4~375,
375: G4~375,
375: A4~375,
375: B4~375,
375: C5~375,
375: B4~375,
375: B4~375,
375: A4~375,
375: B4~375,
375: A4~375,
375: B4~375,
375: C5~375,
375: D5~375,
375: C5~375,
375: C5~375,
375: C5~375,
375: B4~375,
375: A4~375,
375: G4~375,
375: F5~375,
375: D5~375,
375: C5~375,
375: B4~375,
375: A4~375,
375: A4~375,
375: G4~375,
375: G4~375,
375: F4~375,
375: F4~375,
375: F4~375,
375`*/
setSolids([block,player,blocks,blockill])
let level = 0;
const levels = [
  map`
......I..
m....b...
mmm.mmmbm
.m..mm..m
..b.mm...
.m.mmbm.m
bmmmm.m.m
p.KA..b.m
mmmmm..Cm`,
    map`
......I..
mmmm....A
mm...m.mK
m.m.m..m.
m...b.m.C
m.m..mm.m
...mmmm..
mbm....m.
m...m..bp`,
   map`
......I..
bb...b.bp
bCb.b.b.b
.b..b.b..
b..bAK.b.
b...b.b..
b.b.bb.b.
b..b....b
.bb.bbbb.`,
   map`
......I..
mmmmmmm..
...b...mm
C..mm.b..
m.bm.m..m
.m.mm.m..
m.b..mm.K
mmm.bm.bA
mmmmpmm..`,
   map`
......I..
.mm.mmmmK
pb.m.m...
m.m.m..mA
..m.m.m.m
.m.m.....
b.m..mbm.
...b..Cb.
.mmmm.b..`,
   map`
......I..
...mmmmbm
.mm.b.t..
m...m...m
..mm.m.Km
b.mmmmmCm
.m.mlmm.m
rbmm.mmAm
mm.mpm..u`,
   map`
....m.I..
.u.m.m..t
..Abmm...
.mK..bm..
mm..p.m.m
..mb..bbm
l.b.mb...
.b..mmCbm
..b.mmmr.`,
   map`
......I..
m...p...m
.m..b.tbA
C.mmm...K
....b.mm.
.l..mm..r
mmm.m...m
...mm..m.
u...b.b..`,
   map`
r.mmmmm.u
.........
mbbbbbbbm
m.......m
m.......m
m.......m
mbbbbbbbm
.........
t.mmpmm.l`,
]

setMap(levels[level])

setPushables({ [player]: [block, blockill] })




onInput("a", () => {
  if (canMove) {
    getFirst(player).x -= 1;
  }
});

onInput("d", () => {
  if (canMove) {
    getFirst(player).x += 1;
  }
});

onInput("w", () => {
  if (canMove) {
    getFirst(player).y -= 1;
  }
});

onInput("s", () => {
  if (canMove) {
    getFirst(player).y += 1;
  }
});


afterInput(() => {
  
})

// Funzione per trovare la posizione iniziale del giocatore nel livello corrente
function findInitialPlayerPosition(levelIndex) {
  const map = levels[levelIndex]; // Ottieni la mappa del livello corrente
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === player) {
        return { x: x, y: y }; // Restituisci le coordinate x e y del giocatore
      }
    }
  }
  // Se il giocatore non è stato trovato, restituisci delle coordinate di default
  return { x: 0, y: 0 };
}


let conta=0;
let contalevel=0;
 afterInput(() => {
  const blockillSprite = getFirst(blockill);
  const arrivoSprite = getFirst(arrivo);
  const playerSprite = getFirst(player);
  if ((blockillSprite)&&(arrivoSprite)){
  if (blockillSprite.x === arrivoSprite.x && blockillSprite.y === arrivoSprite.y) {
    addText("Game Over!", { x: 5, y: 5, color: color`3` });
    const retryText = addText("Press j to try again", { x: 1, y: 6, color: color`3` });
    canMove = false;
    onInput("j", () => {
      clearText(retryText); // Cancella il testo "Premi j per riprovare"
      canMove = true;
      // Riavvia il gioco al primo livello
      level = conta;
      setMap(levels[level]); // Imposta il primo livello

      const playerSprite = getFirst(player);
      const initialPlayerPosition = findInitialPlayerPosition(level); // Trova la posizione iniziale del giocatore nel primo livello

      playerSprite.x = initialPlayerPosition.x;
      playerSprite.y = initialPlayerPosition.y;
        updateCoinCount();
    });
  } else if ((playerSprite.x === arrivoSprite.x && playerSprite.y === arrivoSprite.y)&&(contacoin === contalevel+1)) {
    playTune(passlevel);
    contalevel++;
    // Passa alla mappa successiva e al livello successivo
    conta=conta+1;
    level =conta;
    setMap(levels[level]); 
    updateCoinCount();
  }
  }
});
 


function handleFinalLevelCompletion() {
    const playerSprite = getFirst(player);

    // Verifica se il giocatore è sull'ultimo livello
    if (level === levels.length - 1 && playerSprite) {
     /* playTune(win);
      playTune(win1);*/
        addText("Congratulations!", { x: 3, y: 5, color: color`D` });
      addText("You passed all levels!", { x: 0, y: 6, color: color`D` });
    }
}

// Chiamare la funzione per gestire il completamento dell'ultimo livello
afterInput(() => {
    handleFinalLevelCompletion();
});



onInput("j", () => {
      // Riavvia il gioco al primo livello
      level = conta;
      setMap(levels[level]); // Imposta il primo livello

      const playerSprite = getFirst(player);
      const initialPlayerPosition = findInitialPlayerPosition(level); // Trova la posizione iniziale del giocatore nel primo livello

      playerSprite.x = initialPlayerPosition.x;
      playerSprite.y = initialPlayerPosition.y;
       if(contacoin===(contalevel+1)){
                  contacoin=contacoin-1;
               }
         updateCoinCount();
    });




// Inizializza la variabile contacoin
let contacoin = 0;
const coinmelody = tune`
37.5: C4/37.5,
37.5: C4/37.5,
37.5: C5/37.5 + G5/37.5,
37.5: C5/37.5 + G5/37.5,
1050`;
addText(contacoin.toString(), { x: 15, y: 0, color: color`3`, id: 'contacoin' });

function updateCoinCount() {
    // Aggiorna il testo con il nuovo valore di contacoin
    clearText('contacoin');
    addText(contacoin.toString(), { x: 15, y: 0, color: color`3`, id: 'contacoin' });
}


// Aggiungi il testo con il valore di contacoin e il colore appropriato dopo l'interazione con la moneta
function handleCoinInteraction() {
    const coinSprite = getFirst(coin);
    const playerSprite = getFirst(player);
    const blockillSprite = getFirst(blockill);
   const arrivoSprite = getFirst(arrivo);

    // Verifica se il sprite della moneta è presente sulla mappa prima di procedere
    if (coinSprite) {
        // Verifica se il giocatore si sovrappone alla moneta
         if (coinSprite && playerSprite.x === coinSprite.x && playerSprite.y === coinSprite.y) {
        coinSprite.remove();
        contacoin++; // Incrementa il conteggio delle monete
        updateCoinCount(); // Aggiorna il testo sullo schermo
           playTune(coinmelody);
            if (contalevel === contacoin) {
                contacoin++; // Incrementa contacoin quando il giocatore interagisce con una moneta

                // Rimuovi il testo precedente prima di aggiornare il nuovo valore
                clearText("contacoin");

                // Aggiorna il testo con il nuovo valore di contacoin
                addText(contacoin.toString(), { x: 15, y: 0, color: color`3`, id: "contacoin" });
            }
              onInput("j", () => {
              if(contacoin===(contalevel+1)){
                if (playerSprite.x === arrivoSprite.x && playerSprite.y === arrivoSprite.y){
                  contacoin=contacoin-1;
                    updateCoinCount();
                }
               }
              });
            }
        }
    }

// Chiamare la funzione dopo ogni evento di input per gestire l'interazione della moneta solo se la moneta è presente sulla mappa
afterInput(() => {
    handleCoinInteraction();
});


// Funzione per gestire il teletrasporto del player se si sovrappone al portale solo se sono presenti nella mappa
function handlePortalTeleportation() {
    const playerSprite = getFirst(player);
    const portalSprite = getFirst(portale);
    const portalReturnSprite = getFirst(portaleritorno);

    // Verifica se il portale e il portale di ritorno sono presenti nella mappa
    if (portalSprite && portalReturnSprite) {
        // Verifica se il player si sovrappone al portale
        if (playerSprite && playerSprite.x === portalSprite.x && playerSprite.y === portalSprite.y) {
            // Teletrasporta il player alle coordinate del portale di ritorno
            playerSprite.x = portalReturnSprite.x;
            playerSprite.y = portalReturnSprite.y;
        }
    }
}

// Chiamare la funzione solo se il portale e il portale di ritorno sono presenti nella mappa
afterInput(() => {
    handlePortalTeleportation();
});


// Funzione per gestire il teletrasporto del player se si sovrappone al portale solo se sono presenti nella mappa
function handlePortalTeleportations() {
    const playerSprite = getFirst(player);
    const portalanSprite = getFirst(portaleandata);
    const portalarSprite = getFirst(portalearrivo);

    // Verifica se il portale e il portale di ritorno sono presenti nella mappa
    if (portalanSprite && portalarSprite) {
        // Verifica se il player si sovrappone al portale
        if (playerSprite && playerSprite.x === portalanSprite.x && playerSprite.y === portalanSprite.y) {
            // Teletrasporta il player alle coordinate del portale di ritorno
            playerSprite.x = portalarSprite.x;
            playerSprite.y = portalarSprite.y;
        }
    }
}

// Chiamare la funzione solo se il portale e il portale di ritorno sono presenti nella mappa
afterInput(() => {
    handlePortalTeleportations();
});