/*
@title: Jims_Bistro
@author: SpookySpoon
@tags: ['pizza', 'bistro']
@addedOn: 2026-04-20
@description: In this game you're trying to make as much pizza as you can in given time.
*/


/*----------------------------------------------------------------------------------------------------------------------------*/

/*

Keys:
s => to move the map down
w => to move the map up

In the kitchen (map num. 2):
  k, i => to select ingredients, (move up and down)
  l => to put selected ingredient on a pizza
  j => to delete all ingredients currently on a pizza

d => to take/release the pizza



Maps:
num.0 => the splash screen (ignore this and scroll down)
num.1 => the serving window
num.2 => the kitchen
num.3 => the menu



How to play?
You're working at Jim's Bistro, where the best pizzas are served!
At the serving window will appear a new customer with an order number.
You'll need to look into the menu and search for the right order to know what ingredients to use.
In the kitchen you'll prepare the pizza by selecting the ingredients and placing them on a dough.
Once the pizza is ready deliver it to a customer.

If you get the order right you'll receive 10 points otherwise you'll lose 5.

Your goal is to get as many points as you can before the 90-seconds timer runs out!
(tip: time limit can be changed by editing the "zbyvajiciOdpocet" variable!)

Enjoy!




*/

/*----------------------------------------------------------------------------------------------------------------------------*/




//soundeffects
const melodySuccess = tune `
200: C5/200,
200: E5/200,
200: G5/200,
5800`


const melodyFail = tune `
200: G4-200,
200: E4-200,
200: C4-200,
5800`


const melodyEnd = tune `
200: C5-200,
200,
200: G4-200 + F4~200,
200: G5/200 + A5-200,
1200,
200: B4-200,
200: A4-200 + G4/200,
200: G4-200 + F4/200,
200: E4-200 + D4/200,
200: C4-200,
200: C4~200,
3200`




const selectVisual = "a"
//jim intro
const jim = "p"
const jimsBody = "b"
const openEyesJim = "o"
const zed = "z"
const zedD = "h"
const linkaStred = "s"
const linkaPravyRoh = "r"
const linkaLevyRoh = "l"
const obrubL = "t"
const obrubR = "k"
const horniObrubaS = "q"
const horniObrubaL = "w"
const horniObrubaP = "e"
const background = "g"


const prvniMapa = [jim, jimsBody, openEyesJim, zed, zedD, linkaStred, linkaPravyRoh, linkaLevyRoh, obrubL, obrubR, horniObrubaS, horniObrubaL, horniObrubaP, background]

//jim pov1
const obrubaVnitrekSpodniS = "c"
const obrubaVnitrekSpodniL = "d"
const obrubaVnitrekSpodniP = "f"
const obrubaVnitrekStranaL = "i"
const obrubaVnitrekStranaP = "j"
const obrubaVnitrekHorniL = "m"
const obrubaVnitrekHorniS = "n"
const obrubaVnitrekHorniP = "u"
const linka = "v"
const backgroundDeux = "x"

const druhaMapa = [obrubaVnitrekSpodniS, obrubaVnitrekSpodniL, obrubaVnitrekSpodniP, obrubaVnitrekStranaL, obrubaVnitrekStranaP, obrubaVnitrekHorniL, obrubaVnitrekHorniS, obrubaVnitrekHorniP, linka, backgroundDeux]

//pizza
const pizzaPrvniCtvrt = "A"
const pizzaDruhaCtvrt = "B"
const pizzaTretiCtvrt = "C"
const pizzaCtvrtaCtvrt = "D"

const syr = "E"
const sunka = "F"
const rajcata = "G"
const houby = "H"

const syrPrvniCtvrt = "I"
const syrDruhaCtvrt = "J"
const syrTretiCtvrt = "K"
const syrCtvrtaCtvrt = "L"

const sunkaPrvniCtvrt = "M"
const sunkaDruhaCtvrt = "N"
const sunkaTretiCtvrt = "O"
const sunkaCtvrtaCtvrt = "P"

const rajcataPrvniCtvrt = "Q"
const rajcataDruhaCtvrt = "R"
const rajcataTretiCtvrt = "S"
const rajcataCtvrtaCtvrt = "T"

const houbyPrvniCtvrt = "U"
const houbyDruhaCtvrt = "V"
const houbyTretiCtvrt = "W"
const houbyCtvrtaCtvrt = "X"

const tretiMapaSuroviny = [syr, sunka, rajcata, houby]
const tretiMapa = [pizzaPrvniCtvrt, pizzaDruhaCtvrt, pizzaTretiCtvrt, pizzaCtvrtaCtvrt, syrPrvniCtvrt, syrDruhaCtvrt, syrTretiCtvrt, syrCtvrtaCtvrt, sunkaPrvniCtvrt, sunkaDruhaCtvrt, sunkaTretiCtvrt, sunkaCtvrtaCtvrt, rajcataPrvniCtvrt, rajcataDruhaCtvrt, rajcataTretiCtvrt, rajcataCtvrtaCtvrt, houbyPrvniCtvrt, houbyDruhaCtvrt, houbyTretiCtvrt, houbyCtvrtaCtvrt]

const zakaznikA = "Y"
const zakaznikABody = "Z"

const backgroundTrois = "0"
const syrIkona = "1"
const sunkaIkona = "2"
const rajcataIkona = "3"
const houbyIkona = "4"
const order = "5"
const drzenaPizza = "6"
const orderSpatna = "7"
const orderDobra = "8"

const zakaznikB = "9"
const zakaznikBBody = "/"

const zakaznikC = "-"
const zakaznikCBody = ";"

const zakaznikD = "["
const zakaznikDBody = "]"

const zakaznikE = "("
const zakaznikEBody = ")"


// const objednavkaJedna = [pizzaPrvniCtvrt, syrPrvniCtvrt, sunkaPrvniCtvrt, rajcataPrvniCtvrt, houbyPrvniCtvrt]
// const objednavkaDva = [pizzaPrvniCtvrt, syrPrvniCtvrt, rajcataPrvniCtvrt, houbyPrvniCtvrt]
// const objednavkaTri = [pizzaPrvniCtvrt, syrPrvniCtvrt, sunkaPrvniCtvrt, rajcataPrvniCtvrt,]
// const objednavkaCtyri = [pizzaPrvniCtvrt, syrPrvniCtvrt, rajcataPrvniCtvrt,]
// const objednavkPet = [pizzaPrvniCtvrt, syrPrvniCtvrt, sunkaPrvniCtvrt, houbyPrvniCtvrt]
// const objednavkaSest = [pizzaPrvniCtvrt, syrPrvniCtvrt, houbyPrvniCtvrt]
// const objednavkaSedm = [pizzaPrvniCtvrt, syrPrvniCtvrt, sunkaPrvniCtvrt,]
// const objednavkaOsm = [pizzaPrvniCtvrt, syrPrvniCtvrt,]

let odpocet

let kontrolaIngredienci = false
let drzimPizzu = false
let novyZakaznik = true
let coJeNaPizze
let number
let numString
let randZakaznikNumber
let predesleCislo
let predeslyRandZakaznikNumber
let lzePrepnout = true
//mozna neni treba
let lzeDalsiZakaznik = false
let zakaznikHotov = false


/////////////////////////////////////////////
//time limit:
let zbyvajiciOdpocet = 90
/////////////////////////////////////////////



//zbytek je dole uplne nejspodneji, pac tady se to KURVA seka
let score = 0

let jeSyr = false
let jeSunka = false
let jsouRajcata = false
let jsouHouby = false


//fce na kontrolu ingredienci
function objednavkaJedna(){
  kontrolaIngredienci = false
  if(jeSyr && jeSunka && jsouRajcata && jsouHouby){
    kontrolaIngredienci = true
  
}
}
function objednavkaDva(){
  kontrolaIngredienci = false
  if(jeSyr && jsouRajcata && jsouHouby && jeSunka === false){
    kontrolaIngredienci = true
  
}
}
function objednavkaTri(){
  kontrolaIngredienci = false
  if(jeSyr && jeSunka && jsouRajcata && jsouHouby === false){
    kontrolaIngredienci = true
  
}
}
function objednavkaCtyri(){
  kontrolaIngredienci = false
  if(jeSyr && jsouRajcata && jeSunka === false && jsouHouby === false){
    kontrolaIngredienci = true
  
}
}
function objednavkaPet(){
  kontrolaIngredienci = false
  if(jeSyr && jeSunka && jsouHouby && jsouRajcata === false){
    kontrolaIngredienci = true
  
}
}
function objednavkaSest(){
  kontrolaIngredienci = false
  if(jeSyr && jsouHouby && jeSunka === false && jsouRajcata === false){
    kontrolaIngredienci = true
  
}
}
function objednavkaSedm(){
  kontrolaIngredienci = false
  if(jeSyr && jeSunka && jsouRajcata === false && jsouHouby === false){
    kontrolaIngredienci = true
  
}
}
function objednavkaOsm(){
  kontrolaIngredienci = false
  if(jeSyr && jeSunka === false && jsouRajcata === false && jsouHouby === false){
    kontrolaIngredienci = true
}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//jeste nevim jestli bude fungovat
function dalsiZakaznik(){
      if(novyZakaznik){
        //test
      clearText()
     addText(`${score}`,
        { x: 17,
          y: 14, 
          color: color`3`
        })
      clearTile(3, 1)
      addSprite(3, 1, obrubaVnitrekStranaP)
        

        
      lzePrepnout = false
        
      // nejsem si jista jestli to funguje 
      do{
        number = Math.floor(Math.random() * (8 - 1 + 1)) + 1
      }while(number === predesleCislo)
        
      numString = `${number}`
      predesleCislo = number
        
      /////////////
        
      //randZakaznikNumber = Math.floor(Math.random() * (4 - 0 + 1)) + 0
      do{
        randZakaznikNumber = Math.floor(Math.random() * (4 - 0 + 1)) + 0
      }while(randZakaznikNumber === predeslyRandZakaznikNumber)

      
        
      novyZakaznik = false

      
      setTimeout(() => {
       randZakaznik[randZakaznikNumber]()
      }, 1000)


      predeslyRandZakaznikNumber = randZakaznikNumber
        
    setTimeout(() => {
    addSprite(3,1, order)
    addText(numString,
        { x: 14,
          y: 5, 
          color: color`0`
        })
      lzePrepnout = true
      }, 2500)
    }
}



const objednavky = [
  objednavkaJedna,
  objednavkaDva,
  objednavkaTri,
  objednavkaCtyri,
  objednavkaPet,
  objednavkaSest,
  objednavkaSedm,
  objednavkaOsm
]





setLegend(
  [ selectVisual, bitmap`
5555555555555555
5..............5
5..............5
5..............5
5..............5
5..............5
5..............5
5..............5
5..............5
5..............5
5..............5
5..............5
5..............5
5..............5
5..............5
5555555555555555` ],

  [ drzenaPizza, bitmap`
................
................
................
...9999999999...
.99662666666999.
.9C63696662666C9
9C63666633696969
9C629666623666C6
99CC666266606C99
.999CC666606099.
...9999999060...
......0FFFF60...
.......0FFFF60..
........00F6660.
..........0F6660
...........0F666` ],
  [ orderSpatna, bitmap`
................
......0000000...
.....022222220..
....02222222220.
....02202220220.
....02222222220.
....02200000220.
....02022222020.
....02222222220.
...02222222220..
...0220000000...
..0200..........
..00............
................
................
................` ],
  [ orderDobra, bitmap`
................
......0000000...
.....022222220..
....02222222220.
....02202220220.
....02222222220.
....02022222020.
....02200000220.
....02222222220.
...02222222220..
...0220000000...
..0200..........
..00............
................
................
................` ],
  [ order, bitmap`
................
......0000000...
.....022222220..
....02222222220.
....02222222220.
....02222222220.
....02222222220.
....02222222220.
....02222222220.
...02222222220..
...0220000000...
..0200..........
..00............
................
................
................` ],
  [ jim, bitmap`
................
.....000000.....
....00000000....
...0000660000...
..000666666000..
..0000066F0000..
..0666F66F6660..
..060006600060..
.0F6060660606F0.
.0F8866FF6688F0.
..006600006600..
...0600000060...
....066CC660....
.....066660.....
...0020FF0200...
..022220022220..` ],
  [ openEyesJim, bitmap`
................
.....000000.....
....00000000....
...0000660000...
..000666666000..
..0000066F0000..
..0666F66F6660..
..060006600060..
.0F6200660026F0.
.0F8866FF6688F0.
..006600006600..
...0600000060...
....066CC660....
.....066660.....
...0020FF0200...
..022220022220..` ],
  [ jimsBody, bitmap`
.02L22100122L20.
0222L1L22L1L2220
02222L2122L22220
0221222122221220
0210122112210120
0210122212210110
0110122212210110
0010122212210100
0F0L12211222L0F0
0F0L12212222L0F0
060L12212222L060
06F0122112210F60
0660012122100660
.060C000000C060.
.000LCCFFCCL000.
...0LL0000LL0...` ],
  [ zed, bitmap`
FFFFFFF0FFFFCFFC
F99999C0F999999C
CCCCCCC0CCCCCCCC
0000000000000000
FFC0FFFFFFF0FFFF
99C0FC9999C0F99C
CCC0CCCCCCC0CCCC
0000000000000000
FFFFFFFC0FFFFFFF
F9C999CC0F99999C
CCCCCCCC0CCCCCCC
0000000000000000
FFFF0FFFCFFF0FFF
999C0F99999C0F99
CCCC0CCCCCCC0FCC
0000000000000000` ],
  [ zedD, bitmap`
FFFFFFC0FFFFFFFC
F99999C0F999999C
FCCCCCC0FCCCCCCC
0000000000000000
FFC0FFFFFFC0FFFF
99C0F99999C0F999
CCC0FCCCCCC0FCCC
0000000000000000
FFFFFFFC0FFFFFFC
F999999C0F99999C
FCCCCCCC0FCCCCCC
0000000000000000
FFFC0FFFFFFC0FFF
999C0F99999C0F99
CCCC0FCCCCCC0FCC
0000000000000000` ],
  [ linkaStred, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
LLLLLLLLLLLLLLLL
1111111111111111
LLLLLLLLLLLLLLLL
FFFFFFC0FFFFFFC0
FCCCCCC0FCCCCCC0
0000000000000000
FFFF0FFCFFFF0FFC
F99C0F99999C0F99
CCCC0CCCCCCC0CCC
0000000000000000` ],
  [ linkaPravyRoh, bitmap`
L1L2222222222222
L1L2222222222222
L1L2222222222222
L1L2222222222222
L1L2222222222222
L1L2222222222222
L1LLLLLLLLLLLLLL
L111111111111111
LLLLLLLLLLLLLLLL
FFFFFFC0FFFFFFC0
FCCCCCC0FCCCCCC0
0000000000000000
FFFF0FFCFFFF0FFC
F99C0F99999C0F99
CCCC0CCCCCCC0CCC
0000000000000000` ],
  [ linkaLevyRoh, bitmap`
2222222222222L1L
2222222222222L1L
2222222222222L1L
2222222222222L1L
2222222222222L1L
2222222222222L1L
LLLLLLLLLLLLLL1L
111111111111111L
LLLLLLLLLLLLLLLL
FFFFFFC0FFFFFFC0
FCCCCCC0FCCCCCC0
0000000000000000
FFFF0FFCFFFF0FFC
F99C0F99999C0F99
CCCC0CCCCCCC0CCC
0000000000000000` ],
  [ obrubL, bitmap`
L1LLDDDFFL1.....
L1111DDFFL1.....
L1LL1111FL1.....
L1LLLLLL111.....
L1LLLLLLLL1.....
L1LFLLLLLL1.....
L1LFFFLLLL1.....
L1LFFFFLCC1.....
L1LFFFFLCC1.....
L1LFFFFLCC1.....
L1111FFLCC1.....
L1LL1111CC1.....
L1LLLLLL111.....
L1LLDLLLLL1.....
L1LLDDDLLL1.....
L1LLDDDFFL1.....` ],
  [ obrubR, bitmap`
.....1LLCCLFFF1L
.....1LLCCL1111L
.....1LL1111LL1L
.....111LLLLLL1L
.....1LLLLLLLD1L
.....1LLLLLCDD1L
.....1LLLLCCDD1L
.....1LLLLCCDD1L
.....1LLLLCCDD1L
.....1LLLLCCDD1L
.....1L88LCC111L
.....1881111LL1L
.....111LLLLLL1L
.....1LLLLLLLF1L
.....1LLLLLLFF1L
.....1LLLLLFFF1L` ],
  [ horniObrubaS, bitmap`
0FFFFFFC0FFFFFFC
0FCCCCCC0FCCCCCC
5555555555555555
5555555555555555
2555555552225555
2555555552552555
5522555552552525
5255555552225555
5525555552552525
5552555552552525
5225555552225525
5555555555555555
5555555555555555
LLLLLLLLLLLLLLLL
1111111111111111
LLLLLLLLLLLLLLLL` ],
  [ horniObrubaL, bitmap`
0FFFFFFC0FFFFFFC
0FCCCCCC0FCCCCCC
5555555555555555
5555555555555555
5522225555555555
5555525555555555
5555525255555555
5555525555555555
5555525255225225
5525525252552552
5552255252552552
5555555555555555
5555555555555555
LLLLLLLLLLLLLLLL
L111111111111111
L1LLLLLLLLLLLLLL` ],
  [ horniObrubaP, bitmap`
0FFFFFFC0FFFFFC0
0FCCCCCC0FCCCCC0
5555555555555555
5555555555555555
5555525555555555
5555525555555555
5225222555555555
2555525555522555
5255525225255255
5525525255255255
2255525255522555
5555555555555555
5555555555555555
LLLLLLLLLLLLLLLL
111111111111111L
LLLLLLLLLLLLLL1L` ],
  [ backgroundTrois, bitmap`
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
0000000000000000` ],
  [ backgroundDeux, bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555` ],
  [ background, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444` ],
  [ obrubaVnitrekSpodniS, bitmap`
LLLLLLLLLLLLLLLL
1111111111111111
LLLLLLLLLLLLLLLL
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
2222222222222222` ],
  [ obrubaVnitrekSpodniL, bitmap`
L1LLLLLLLLLLLLLL
L111111111111111
LLLLLLLLLLLLLLLL
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
2222222222222222` ],
  [ obrubaVnitrekSpodniP, bitmap`
LLLLLLLLLLLLLL1L
111111111111111L
LLLLLLLLLLLLLLLL
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
2222222222222222` ],
  [ obrubaVnitrekStranaL, bitmap`
L1L.............
L1L.............
L1L.............
L1L.............
L1L.............
L1L.............
L1L.............
L1L.............
L1L.............
L1L.............
L1L.............
L1L.............
L1L.............
L1L.............
L1L.............
L1L.............` ],
  [ obrubaVnitrekStranaP, bitmap`
.............L1L
.............L1L
.............L1L
.............L1L
.............L1L
.............L1L
.............L1L
.............L1L
.............L1L
.............L1L
.............L1L
.............L1L
.............L1L
.............L1L
.............L1L
.............L1L` ],
  [ obrubaVnitrekHorniL, bitmap`
0FFFFFFC0FFFFFFC
0F99999C0F99999C
0FCCCCCC0FCCCCCC
0000000000000000
FFFC0FFFFFFC0FFF
999C0F99999C0F99
CCCC0FCCCCCC0FCC
LLLLLLLLLLLLLLLL
L111111111111111
L1LLLLLLLLLLLLLL
L1L.............
L1L.............
L1L.............
L1L.............
L1L.............
L1L.............` ],
  [ obrubaVnitrekHorniS, bitmap`
0FFFFFFC0FFFFFFC
0F99999C0F99999C
0FCCCCCC0FCCCCCC
0000000000000000
FFFC0FFFFFFC0FFF
999C0F99999C0F99
CCCC0FCCCCCC0FCC
LLLLLLLLLLLLLLLL
1111111111111111
LLLLLLLLLLLLLLLL
................
................
................
................
................
................` ],
  [ obrubaVnitrekHorniP, bitmap`
0FFFFFFC0FFFFFC0
0F99999C0F9999C0
0CCCCCCC0CCCCCC0
0000000000000000
FFFC0FFFFFC0FFFF
999C0F9999C0F999
CCCC0FCCCCC0FCCC
LLLLLLLLLLLLLLLL
111111111111111L
LLLLLLLLLLLLLL1L
.............L1L
.............L1L
.............L1L
.............L1L
.............L1L
.............L1L` ],
  [ linka, bitmap`
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
2222222222222222` ],


  [ zakaznikA, bitmap`
................
.....000000.....
....0CCCCCC0....
...0CCC66CCC0...
..0CC6666C6CC0..
.0CCC00660CCC0..
.0CC66F66F66C0..
0CC6000000006C0.
0CF000L6600L0F0.
0CF60LL660LL6FC0
.0CC88666688CCC0
0CCC66666666CCC0
0CCCC666666CCC0.
0CCCCCC66CCCCCC0
0C011260066110C0
.021FF66662F120.` ],
  [ zakaznikABody, bitmap`
.2FFFF2666FFFF2.
1FFFFFF662FFFFF1
011FFFF262FFFF10
00011FF262FF1100
000001F222F10000
000L00122210L000
000L00112210L000
0LLL00012110LLL0
L00L00012100L00L
000L00012100L000
000L00012100L000
000L00012100L000
000L00012100L000
.06L00010100L60.
.00L00010100L00.
...0000101000...` ],

  [ zakaznikB, bitmap`
................
.....000000.....
....03333330....
...03CCCCCC30...
..0C00000000C0..
..C0000060000C..
.0006060606000..
.00666666666600.
.0F6000660006F0.
.02660066006620.
.000886666880000
0000666666660000
0000066666600000
.00000066000000.
...0662662660...
..066662266660..` ],
  [ zakaznikBBody, bitmap`
.066CC6666CC660.
.06C3C6666C3C60.
.06C33C66C33C60.
.06C333CC333C60.
.066C333333C660.
.022C333333C220.
.0220C3333C0220.
.0220C3333C0220.
.022C333333C220.
.022C333333C220.
.02C33333333C20.
.02C33333C33C20.
.00C3C3333C3C00.
..C33C3333C33C..
..C33C3333C33C..
..C3C333333C3C..`],

  [ zakaznikC, bitmap`
......0000......
....00444400....
...0444444440...
..044444444440..
.04446666664440.
.04466666666440.
.044DDD66DDD440.
.04666F66F66640.
.0F6000660006F0.
.0F8866666688F0.
..046666666640..
...0666666660...
...0066666600...
..02200FF00220..
.0L1222002221L0.
.0LLL122221LLL0.` ],
  [ zakaznikCBody, bitmap`
.0HHHH1221HHHH0.
0HHHHH1HH1HHHHH0
0HHH0H1HH1H0HHH0
0HH0HH1HH1HH0HH0
0HH0HH2HH1HH0HH0
0HH0HH2HH2HH0HH0
0HH0HHHHH2HL0HH0
0HH0LHHHHHHL0HH0
0HH0LHHHHHHL0HH0
0HH0LHHHHHHL0HH0
0HH0LHHHHHHL0HH0
0HH0LHHHHHHL0HH0
06600LHHHHH00660
.06070000007060.
.00077777777000.
...0770000770...`],

  //treba declarovat!!!
  [ zakaznikD, bitmap`
....000..000....
...0000000000...
..000000000000..
..000000000000..
.00000066000000.
.00000666600000.
0000000660000000
0000CCC66C000000
000C929669290000
0000299CC299C000
00C6CCC66CCC6C00
0000886666880000
.0C0066666600C0.
..0L000FF000L0..
.0L00CC00CC00L0.
00L003CC0C300L00` ],
  [ zakaznikDBody, bitmap`
0000L33CC33L0000
000L0C3303C0L000
00L00C3CC3C00L00
00L00C3033C00L00
000L0C3CC3C0L000
000L0C3303C0L000
0000LC3CC3CL0000
0000LCC0CCCL000F
0000L0C0CC0L0000
00000L0000L0000F
00000L0110L00000
CC00LL0LL0L000CC
0600L00000LL0060
.000L000000L000.
..00L000000L00..
..00L000000L00..`],

   //treba declarovat!!!
  [ zakaznikE, bitmap`
.....000000.....
...0099999900...
..099000000990..
.09909999990990.
.99099999999099.
0909999099999090
0909990090999090
0909006606099090
09000FF66FF00099
90F6000660006F09
9026886666886209
9990666666660999
9999066666609999
9999900660099999
9900772FF2709999
9077777227709999` ],
  [ zakaznikEBody, bitmap`
0777755775509909
0777557557509900
0770755775509070
0770775775770770
0070757777570700
0220777777770220
.06007777770060.
.06000777700060.
.06070000007060.
.06072222227060.
.06772222227760.
..072222222270..
.07722222222770.
.07222222222270.
0772222222222770
0722222222222270`],


  [ syrIkona, bitmap`
.......99C9.....
......999992....
.....9C99226....
....99222666....
....22666966....
....6699666.....
.....666........
................
................
................
................
................
................
................
................
................` ],
  [ sunkaIkona, bitmap`
.......3333.....
.....3882233....
....38888888....
...388888883....
...88888233.....
...888223.......
....3333........
................
................
................
................
................
................
................
................
................`  ],
  [ rajcataIkona, bitmap`
....333333......
...33699633.....
...39999993.....
...36999963.....
...39999993.....
...33699633.....
....333333......
................
................
................
................
................
................
................
................
................`  ],
  [ houbyIkona, bitmap`
...CCCCCC.......
..C222222C......
..C2L22L2C......
..C2L21L2C......
...LL11LL.......
.....LL.........
................
................
................
................
................
................
................
................
................
................` ],
  
  [ syr, bitmap`
1111111111111111
1LLLLLLLLLLLLLL1
1L992266666999L1
1L929966966669L1
1L62969699669961
1669999969996661
1L696966666669L1
1L692996669669L1
1L692266699996L1
1L992666692296L1
1L692699966266L1
1L669699699266L1
1L966966622269L1
1L966696226999L1
1LL66LLLLLLLLLL1
1111161111111111` ],
  [ sunka, bitmap`
1111111111111111
1LLLLLLLLLLLLLL1
1LCC333CC33388L1
1LC32223CCCCC8L1
1L3888283C333CL1
1L388882C38223L1
1L32888C388888L1
1LC3228C828888L1
1L3CC33C828888L1
1LC33883382883L1
1LC38228C3328CL1
1L33228888C3CCL1
1L3328882CCCC3L1
1LC328883C3888L1
1LLLLLLLLLLLLLL1
1111111111111111`  ],
  [ rajcata, bitmap`
1111111111111111
1LLLLLLLLLLLLLL1
1LC333CCCCCCCCL1
1L36993CC3333CL1
1L39333C399933L1
1L333933969693L1
1L339693999993L1
1LC39993369633L1
1LC33333C3333CL1
1LCC3993333CCCL1
1LC3696939333CL1
1L399999396993L1
1L336969339963L1
1LC339933C333CL1
1LLLLLLLLLLLLLL1
1111111111111111`  ],
  [ houby, bitmap`
1111111111111111
1LLLLLLLLLLLLLL1
1L1LLL2C1CCCC1L1
1LL1222112222CL1
1LL1122CCCCCC2L1
1L2LLLC222222CL1
1L2221C2L22L2CL1
1L1211C2L21L2CL1
1L1CCC1LL11LL1L1
1LC222111LL111L1
1LC2LLLCCCCC12L1
1LC2221C2222C2L1
1LC2LLLC2112C2L1
1L.C2111L11L22L1
1LLLLLLLLLLLLLL1
1111111111111111` ],

  [ houbyPrvniCtvrt, bitmap`
................
................
................
................
................
................
................
........CCC.....
.......CC22C....
......CC22L1....
......C2222.....
......C2LL......
.......C1.......
................
................
................` ],
  [ houbyDruhaCtvrt, bitmap`
................
................
................
................
................
................
................
CC..............
22C.............
12C.............
12C.............
.1C.....CCC.....
.......C222.....
.......C2LLL....
.......C2221....
.......C2LLL....`  ],
  [ houbyTretiCtvrt, bitmap`
................
..........CCC...
.........C22C...
........C22L2...
.......C221L1...
.......C2LL1....
.......CC11.....
................
................
................
................
................
................
................
................
................` ],
  [ houbyCtvrtaCtvrt, bitmap`
........CCC.....
................
................
................
...CCCCCC.......
..C222222C......
..C2L22L2C......
..C2L12L2C......
...LL11LL.......
.....LL.........
................
................
................
................
................
................` ],
  
  [ rajcataPrvniCtvrt, bitmap`
................
................
................
................
................
................
..........33333.
.........3969633
.........3999993
.........3369693
..........33333.
...............3
...............3
...............3
................
.....333........` ],
  [ rajcataDruhaCtvrt, bitmap`
................
................
................
................
................
................
................
................
........333.....
.......3393.....
333....36933....
6963...39963....
9993...36993....
6933....3333....
333.............
................`  ],
  [ rajcataTretiCtvrt, bitmap`
....36993.......
....39963.......
....36993.......
....39693...3333
.....333...36969
...........39999
...........39693
............333.
................
................
................
................
................
................
................
................` ],
  [ rajcataCtvrtaCtvrt, bitmap`
......3333......
.....369693.....
.....399963.....
.....369693.....
......3333......
................
................
................
..333...........
.36933..........
.39963..........
..333...........
................
................
................
................` ],
  
  [ sunkaPrvniCtvrt, bitmap`
................
................
................
................
................
............3338
...........88828
..........388888
..........328888
..........328888
...........32883
................
................
......3333......
.....322288.....
....38888233....` ],
  [ sunkaDruhaCtvrt, bitmap`
................
................
................
................
................
3...............
83..............
883.............
882.............
823....333......
33...388233.....
....3888888.....
....8888823.....
....888223......
.....3333.......
................`  ],
  [ sunkaTretiCtvrt, bitmap`
....32888883....
.....328833.....
.....38823......
......333......8
...............8
..............38
..............38
..............38
..............38
...............8
...............3
................
................
................
................
................` ],
  [ sunkaCtvrtaCtvrt, bitmap`
................
......3333......
333.3228833.....
88233288888.....
88828888828.....
88883888823.....
8888333883......
88888...........
8823............
8283............
883.............
................
................
................
................
................` ],

  [ syrPrvniCtvrt, bitmap`
................
................
................
...............9
...........99999
..........996699
........99666666
.......996696962
.......996666266
......9966666626
......9666666666
.....9C666666696
.....99669669662
....996966266666
....996666669266
....999662666696` ],
  [ syrDruhaCtvrt, bitmap`
................
................
................
9...............
999.............
96999...........
66699999........
9626669.........
666666999.......
6696666699......
69696666699.....
666666666699....
669266966669....
626696662669....
66626666669.....
696666696669....` ],
  [ syrTretiCtvrt, bitmap`
....999666966666
.....96666662666
....996626626966
....966666666662
....996669666666
......9666666966
......9966669666
.......996666696
.........9666666
........99996669
...........99999
.............99.
................
................
................
................` ],
  [ syrCtvrtaCtvrt, bitmap`
66666666699.....
669666966699....
626666666699....
66666626669.....
96696666699.....
6666666669......
6666966999......
62966669.9......
66696699........
9666699.........
999699..........
9.999...........
................
................
................
................` ],

  [ pizzaPrvniCtvrt, bitmap`
............9999
.........9999999
.......999999CCC
......9999CCCCCC
.....999CCCCCCCC
....999CCCCCCCCC
...999CCCCCCCCCC
..999CCCCCCCCCCC
..99CCCCCCCCCCCC
.999CCCCCCCCCCCC
.99CCCCCCCCCCCCC
.99CCCCCCCCCCCCC
999CCCCCCCCCCCCC
99CCCCCCCCCCCCCC
99CCCCCCCCCCCCCC
99CCCCCCCCCCCCCC` ],
  [ pizzaDruhaCtvrt, bitmap`
9999............
9999999.........
CCC999999.......
CCCCCC9999......
CCCCCCCC999.....
CCCCCCCCC999....
CCCCCCCCCC999...
CCCCCCCCCCC999..
CCCCCCCCCCCC99..
CCCCCCCCCCCC999.
CCCCCCCCCCCCC99.
CCCCCCCCCCCCC99.
CCCCCCCCCCCCC999
CCCCCCCCCCCCCC99
CCCCCCCCCCCCCC99
CCCCCCCCCCCCCC99`  ],
  [ pizzaTretiCtvrt, bitmap`
99CCCCCCCCCCCCCC
99CCCCCCCCCCCCCC
99CCCCCCCCCCCCCC
999CCCCCCCCCCCCC
.99CCCCCCCCCCCCC
.99CCCCCCCCCCCCC
.999CCCCCCCCCCCC
..99CCCCCCCCCCCC
..999CCCCCCCCCCC
...999CCCCCCCCCC
....999CCCCCCCCC
.....999CCCCCCCC
......9999CCCCCC
.......999999CCC
.........9999999
............9999` ],
  [ pizzaCtvrtaCtvrt, bitmap`
CCCCCCCCCCCCCC99
CCCCCCCCCCCCCC99
CCCCCCCCCCCCCC99
CCCCCCCCCCCCC999
CCCCCCCCCCCCC99.
CCCCCCCCCCCCC99.
CCCCCCCCCCCC999.
CCCCCCCCCCCC99..
CCCCCCCCCCC999..
CCCCCCCCCC999...
CCCCCCCCC999....
CCCCCCCC999.....
CCCCCC9999......
CCC999999.......
9999999.........
9999............` ]

  
)


//let select = getFirst(selectVisual)



let level = 0
const levels = [
  map`
hwqeh
htpkz
ztbkh
hrslz`,
  map`
hmnuh
hi.jz
zi.jh
vdcfv`,
  map`
E....
F....
G....
H....`,
  map`
.........
.........
.1234.134
.123..13.
.124..14.
.12...1..
.........`,
  map`
zhhhz
hhhzz
zzhhh
hzzhh`
]

const randZakaznik = [
  aZakaznik,
  bZakaznik,
  cZakaznik,
  dZakaznik,
  eZakaznik
]

const backgroundAr = [
  background,
  backgroundDeux,
  linka,
  backgroundTrois
]

setSolids([
  ...prvniMapa,
  ...druhaMapa,
  ...tretiMapa,
  ...tretiMapaSuroviny
])


setMap(levels[level])
setBackground(background)


startTimer()


//nacita mapu podle user input
function loadmap(){
  setMap(levels[level])
  setBackground(backgroundAr[level])
  clearText()

  if(drzimPizzu === true && level < 3){
    addSprite(3,3, drzenaPizza)
  }

  
  if(level === 1){
    if(score > 0){
     addText(`${score}`,
        { x: 17,
          y: 14, 
          color: color`3`
        })
    } else if(score === 0){
      addText(` ${score}`,
        { x: 17,
          y: 14, 
          color: color`3`
        })
    }
    
    if(novyZakaznik){
      lzePrepnout = false
      number = Math.floor(Math.random() * (8 - 1 + 1)) + 1
      //number = 4
      numString = `${number}`

      randZakaznikNumber = Math.floor(Math.random() * (4 - 0 + 1)) + 0
      //randZakaznikNumber = 4
      
      novyZakaznik = false
      
      setTimeout(() => {
       randZakaznik[randZakaznikNumber]()
      }, 1000)

    
    setTimeout(() => {
    addSprite(3,1, order)
    addText(numString,
        { x: 14,
          y: 5, 
          color: color`0`
        })
      lzePrepnout = true
      }, 2500)
    }
    
    
    else {
      randZakaznik[randZakaznikNumber]()
      addSprite(3,1, order)
      addText(numString,
        { x: 14,
          y: 5, 
          color: color`0`
        })
    }
  }


  
  if(level === 2){

    if(score > 0){
     addText(`${score}`,
        { x: 17,
          y: 14, 
          color: color`3`
        })
    } else if(score === 0){
      addText(` ${score}`,
        { x: 17,
          y: 14, 
          color: color`3`
        })
    }
    
    if(drzimPizzu === false){
      pridatZakladPizzy()

      if(jeSyr){
      pridatSyr()
    }
    if(jeSunka){
      pridatSunku()
    }
    if(jsouRajcata){
      pridatRajcata()
    }
    if(jsouHouby){
      pridatHouby()
    }

      
    } else {
      resetPizzy()
    }
    
    addSprite(0,0, selectVisual)

  
  
  
  }
  if(level === 3){
    textForMenu()
  }

  if(level === 4){
    
    if(score < 0){
      score = 0
    }

  addText("Game Over!",
        { x: 5,
          y: 2, 
          color: color`2`
        })
  addText(`Score: ${score}`,
        { x: 2,
          y: 5, 
          color: color`2`
        })
  addText("Press D to start",
        { x: 2,
          y: 9, 
          color: color`2`
        })
  addText("again!",
        { x: 7,
          y: 11, 
          color: color`2`
        })

        playTune(melodyEnd)
  }
}
///////////TADYY!!!!!!!!!!!!!!!!!!!!!!!!!!!!!







function textForMenu(){
  addText("Menu",
        { x: 8,
          y: 1, 
          color: color`2`
        })
        addText("--------------------",
        { x: 0,
          y: 2, 
          color: color`2`
        })

    
    addText("1",
        { x: 1,
          y: 5, 
          color: color`2`
        })
    addText("2",
        { x: 12,
          y: 5, 
          color: color`2`
        })
    addText("3",
        { x: 1,
          y: 7, 
          color: color`2`
        })
    addText("4",
        { x: 12,
          y: 7, 
          color: color`2`
        })
    addText("5",
        { x: 1,
          y: 9, 
          color: color`2`
        })
    addText("6",
        { x: 12,
          y: 9, 
          color: color`2`
        })
    addText("7",
        { x: 1,
          y: 11, 
          color: color`2`
        })
    addText("8",
        { x: 12,
          y: 11, 
          color: color`2`
        })


    
    addText("--------------------",
        { x: 0,
          y: 14, 
          color: color`2`
        })
}



//funkce na zobrazeni zakazniku
function aZakaznik(){
  clearTile(2, 1)
  clearTile(2, 2)
  addSprite(2,1, zakaznikA)
  addSprite(2,2, zakaznikABody)
}
function bZakaznik(){
  clearTile(2, 1)
  clearTile(2, 2)
  addSprite(2,1, zakaznikB)
  addSprite(2,2, zakaznikBBody)
}
function cZakaznik(){
  clearTile(2, 1)
  clearTile(2, 2)
  addSprite(2,1, zakaznikC)
  addSprite(2,2, zakaznikCBody)
}
function dZakaznik(){
  clearTile(2, 1)
  clearTile(2, 2)
  addSprite(2,1, zakaznikD)
  addSprite(2,2, zakaznikDBody)
}
function eZakaznik(){
  clearTile(2, 1)
  clearTile(2, 2)
  addSprite(2,1, zakaznikE)
  addSprite(2,2, zakaznikEBody)
}




//funkce na pridani ingredienci
function pridatSyr(){
  addSprite(2,1, syrPrvniCtvrt)
  addSprite(3,1, syrDruhaCtvrt)
  addSprite(2,2, syrTretiCtvrt)
  addSprite(3,2, syrCtvrtaCtvrt)
  // jeSyr = true
}

function pridatSunku(){
  addSprite(2,1, sunkaPrvniCtvrt)
  addSprite(3,1, sunkaDruhaCtvrt)
  addSprite(2,2, sunkaTretiCtvrt)
  addSprite(3,2, sunkaCtvrtaCtvrt)
  // jeSunka = true
}

function pridatRajcata(){
  addSprite(2,1, rajcataPrvniCtvrt)
  addSprite(3,1, rajcataDruhaCtvrt)
  addSprite(2,2, rajcataTretiCtvrt)
  addSprite(3,2, rajcataCtvrtaCtvrt)
  // jsouRajcata = true
}

function pridatHouby(){
  addSprite(2,1, houbyPrvniCtvrt)
  addSprite(3,1, houbyDruhaCtvrt)
  addSprite(2,2, houbyTretiCtvrt)
  addSprite(3,2, houbyCtvrtaCtvrt)
  // jsouHouby = true
}



function resetPizzy(){
  clearTile(2, 1)
  clearTile(3, 1)
  clearTile(2, 2)
  clearTile(3, 2)

}

function pridatZakladPizzy(){
  addSprite(2,1, pizzaPrvniCtvrt)
  addSprite(3,1, pizzaDruhaCtvrt)
  addSprite(2,2, pizzaTretiCtvrt)
  addSprite(3,2, pizzaCtvrtaCtvrt)
}






/*setPushables({
  [ player ]: []
})*/




onInput("s", () => {
  if(level < 3 && lzePrepnout === true && level !== 4){
  level += 1
  loadmap()
  }
})

onInput("w", () => {
  if(level > 1 && level !== 4){
  level -= 1
  loadmap()
  }
})



//vybira ingredienci v treti mape
  onInput("k", () => {
  if(level === 2){
    if(getFirst(selectVisual).y <= 3){
    getFirst(selectVisual).y += 1 
  }
  }
})

  onInput("i", () => {
  if(level === 2){
    if(getFirst(selectVisual).y > 0){
    getFirst(selectVisual).y -= 1 
  }
  }
})

//prida ingredienci na pizzu
  onInput("l", () => {
    const s = getFirst(selectVisual)
    if(level === 2){
      if(drzimPizzu === false){
    if(s.x === 0 && s.y === 0){
      pridatSyr()
      jeSyr = true
  } else if(s.x === 0 && s.y === 1){
      pridatSunku()
      jeSunka = true
  } else if(s.x === 0 && s.y === 2){
      pridatRajcata()
      jsouRajcata = true
  } else if(s.x === 0 && s.y === 3){
      pridatHouby()
      jsouHouby = true
  }
  }
  }
})

//resetuje pizza zaklad (smaze vsechny ingredience)
  onInput("j", () => {
  if(level === 2){
    if(drzimPizzu === false){
    resetPizzy()
    jeSyr = false
    jeSunka = false
    jsouRajcata = false
    jsouHouby = false
    pridatZakladPizzy()
  }
    }
})


  onInput("d", () => {
  if(level === 2){
    if(drzimPizzu === false){
    drzimPizzu = true
    coJeNaPizze = getTile(2,1)
    resetPizzy()
    addSprite(3,3, drzenaPizza)
  } else {
    drzimPizzu = false
    clearTile(3, 3)

    pridatZakladPizzy()
      if(jeSyr){
      pridatSyr()
    }
    if(jeSunka){
      pridatSunku()
    }
    if(jsouRajcata){
      pridatRajcata()
    }
    if(jsouHouby){
      pridatHouby()
    }
      
  }
  }
  if(level === 1){
    if(drzimPizzu === true){
      drzimPizzu = false
      lzePrepnout = false
      
      clearTile(3, 3)
      addSprite(3,3, obrubaVnitrekSpodniP)
      kontrolaObjednavky()

      if(score > 0){
     addText(`${score}`,
        { x: 17,
          y: 14, 
          color: color`3`
        })
    } else if(score === 0){
      addText(` ${score}`,
        { x: 17,
          y: 14, 
          color: color`3`
        })
    }
      
      
      jeSyr = false
      jeSunka = false
      jsouRajcata = false
      jsouHouby = false


      setTimeout(() => {
        if(zakaznikHotov){
      
      novyZakaznik = true    
      dalsiZakaznik()
      }
    }, 2250)


      
    }
  }

if(level === 4){
    
      drzimPizzu = false
      lzePrepnout = false
    
      jeSyr = false
      jeSunka = false
      jsouRajcata = false
      jsouHouby = false

      score = 0
      zbyvajiciOdpocet = 90
  
      novyZakaznik = true
      level = 1
      loadmap()
      startTimer()
  }
    
})





function kontrolaObjednavky(){
  objednavky[number - 1]()
  if(kontrolaIngredienci){
    clearText()
    
    clearTile(3, 1)
    addSprite(3, 1, obrubaVnitrekStranaP)
    
    addSprite(3,1, orderDobra)
    zakaznikHotov = true

    score += 10
    addText(`${"+5"}`,
        { x: 17,
          y: 2, 
          color: color`4`
        })
        
    playTune(melodySuccess)
    zbyvajiciOdpocet += 5
    ///////////////////////////////////////////////////////////////////////////////////////
  } else {
    clearTile(3, 1)
    addSprite(3, 1, obrubaVnitrekStranaP)
    
    clearText()
    addSprite(3,1, orderSpatna)
    zakaznikHotov = true
    playTune(melodyFail)
    score -= 5
  }
}








  
function startTimer(){
  
  odpocet = setInterval(() => {
  if(zbyvajiciOdpocet > 0){
  zbyvajiciOdpocet--
  }

if(level === 1 && zbyvajiciOdpocet >= 10){
  addText(`${zbyvajiciOdpocet}`,
        { x: 17,
          y: 1, 
          color: color`2`
        })
} else if(level === 1 && zbyvajiciOdpocet < 10){
  addText(`0${zbyvajiciOdpocet}`,
        { x: 17,
          y: 1, 
          color: color`2`
        })
} else if(level === 2 && zbyvajiciOdpocet >= 10){
  addText(`${zbyvajiciOdpocet}`,
        { x: 17,
          y: 1, 
          color: color`3`
        })
} else if(level === 2 && zbyvajiciOdpocet < 10){
  addText(`0${zbyvajiciOdpocet}`,
        { x: 17,
          y: 1, 
          color: color`3`
        })
}


    
  if(zbyvajiciOdpocet <= 0 && lzePrepnout){
    clearInterval(odpocet)
    level = 4
    loadmap()
  }
}, 1000)
  
}







const melody = tune`...`;



afterInput(() => {
  
})
