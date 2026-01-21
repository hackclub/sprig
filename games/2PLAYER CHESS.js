/*
@title: 2Player Chess
@author: Philipp Mehringer
@description: A complete digital chess game in Sprig with piece movement, check detection, and vertical indicators for turns and check.
@tags: ['chess', 'strategy', 'board game']
@addedOn: 2026-01-05
*/


const CURSOR="c", HIGHLIGHT="h", TILE="t"
const WP="P",WR="R",WN="N",WB="B",WQ="Q",WK="K"
const BP="p",BR="r",BN="n",BB="b",BQ="q",BK="k"

let whiteTurn=true
let mode="PIECE"
let pieceIndex=0
let moveIndex=0
let legalMoves=[]


setLegend(
  [CURSOR, bitmap`
333..........333
33............33
3..............3
................
................
................
................
................
................
................
................
................
................
3..............3
33............33
333..........333`],
  [HIGHLIGHT, bitmap`
................
................
................
................
................
................
.......00.......
......000L......
......00L1......
.......L1.......
................
................
................
................
................
................`],
  [TILE, bitmap`
0000000000000000
...............0
...............0
...............0
...............0
...............0
...............0
...............0
...............0
...............0
...............0
...............0
...............0
...............0
...............0
...............0`],
  
  [WP, bitmap`
................
................
................
.............00.
............010.
...000.00..0110.
..0111011001110.
..0111111111110.
..0212222212110.
..0222022002210.
...000.00..0220.
............020.
.............00.
................
................
................`], 
  [WR, bitmap`
................
................
.............00.
.00000......010.
.011100....0110.
.00010100001110.
...010101111110.
.00010101111110.
.00020102221110.
...020202222110.
.00020200002210.
.022200....0220.
.00000......020.
.............00.
................
................`], 
  [WN, bitmap`
................
................
................
....000000...00.
...011111100010.
..0111111111010.
..0122222211010.
..0222022221010.
.02222200222010.
.0220222.022020.
.0202220..02020.
.00.02220..0020.
.....0220....00.
......00........
................
................`], 
  [WB, bitmap`
................
................
................
.............00.
.......0000.010.
......011110010.
..00.0.02211010.
.011022.0221010.
.01202222222010.
..00.0222222020.
......022220020.
.......0000.020.
.............00.
................
................
................`], 
  [WQ, bitmap`
................
.....0..........
......000.......
......01100..00.
.......01110010.
........0111010.
..00...02111010.
.0110.022211010.
.0120.022221010.
..00...02222020.
........0222020.
.......02220020.
......02200..00.
......000.......
.....0..........
................`], 
  [WK, bitmap`
................
................
.....0000.......
....0111100..00.
....01..0110010.
....010..011010.
..00.020.011010.
.0000.021111010.
.0020.022222010.
..00.020.022020.
....020..022020.
....02..0220020.
....0222200..00.
.....0000.......
................
................`], 
  
  [BP, bitmap`
................
................
................
.00.............
.0L0............
.0LL0..00.000...
.00LL00LL0LLL0..
.000L0LLLLL0L0..
.0000000000000..
.0000000000000..
.0000..00.000...
.000............
.00.............
................
................
................`],
  [BR, bitmap`
................
................
.00.............
.0L0......00000.
.0LL0....00LLL0.
.00LL0000L0L000.
.000LLLL0L0L0...
.000LLLL000L000.
.00000000000000.
.000000000000...
.00000000000000.
.0000....000000.
.000......00000.
.00.............
................
................`],
  [BN, bitmap`
................
................
........00......
.00....0LL0.....
.0L00..0LLL0.00.
.0L0L0..0LLL0L0.
.0L0LL0.LLL0LL0.
.000LLL00LLLLL0.
.0000LLLL0LLL0..
.00000LLLLLL00..
.0000000000000..
.000000000000...
.00...000000....
................
................
................`],
  [BB, bitmap`
................
................
................
.00.............
.0L0.0000.......
.0L00LLLL0......
.0L0LLLLLL0.00..
.000LLLLLLL0L00.
.0000LL0.LL0000.
.00000LL0.0.00..
.000000000......
.000.0000.......
.00.............
................
................
................`],
  [BQ, bitmap`
................
..........0.....
.......000......
.00..00LL0......
.0L00LLL0.......
.0L0LLL0........
.0L0LLLL0...00..
.0000LLLL0.0L00.
.00000LLL0.0000.
.000000L0...00..
.0000000........
.00000000.......
.00..00000......
.......000......
..........0.....
................`],
  [BK, bitmap`
................
................
.......0000.....
.00..00LLLL0....
.0L00LL0..L0....
.0L0LL0..0L0....
.0L0LL0.0L0.00..
.000LLLLL0.0L00.
.0000L00L0.0000.
.000000.0L0.00..
.000000..000....
.0000000..00....
.00..0000000....
.......0000.....
................
................`]
)



setBackground(TILE)
setMap(map`
rp....PR
np....PN
bp....PB
kp....PK
qp....PQ
bp....PB
np....PN
rp....PR`)
addSprite(0,7,CURSOR)


function isWhite(t){return"PRNBQK".includes(t)}
function isBlack(t){return"prnbqk".includes(t)}
function inBounds(x,y){return x>=0&&x<8&&y>=0&&y<8}

function getPieceAt(x,y){
  return getTile(x,y).find(s=>s.type!==CURSOR&&s.type!==HIGHLIGHT)
}
function isEmpty(x,y){return !getPieceAt(x,y)}

function getOwnPieces(){
  return getAll().filter(s=>
    s.type!==CURSOR&&s.type!==HIGHLIGHT&&
    ((whiteTurn&&isWhite(s.type))||(!whiteTurn&&isBlack(s.type)))
  ).sort((a,b)=>whiteTurn?(a.y+a.x*8)-(b.y+b.x*8):(b.y+b.x*8)-(a.y+a.x*8))
}

function setCursor(x,y){
  getAll(CURSOR).forEach(c=>c.remove())
  addSprite(x,y,CURSOR)
}

function clearHighlights(){
  getAll(HIGHLIGHT).forEach(h=>h.remove())
}


function isSquareAttacked(x,y,byWhite){
  let attackers=getAll().filter(s=>
    s.type!==CURSOR&&s.type!==HIGHLIGHT&&
    (byWhite?isWhite(s.type):isBlack(s.type))
  )
  for(let p of attackers){
    if(rawCanMove(p.x,p.y,x,y,p.type)) return true
  }
  return false
}

function isKingInCheck(white){
  let k=getFirst(white?WK:BK)
  return k?isSquareAttacked(k.x,k.y,!white):false
}


function wouldLeaveKingInCheck(sx,sy,tx,ty,type){
  // Temporäre Simulation des Zuges
  let captured=getPieceAt(tx,ty)
  clearTile(sx,sy)
  if(captured) clearTile(tx,ty)
  addSprite(tx,ty,type)
  
  let inCheck=isKingInCheck(isWhite(type))
  
  // Rückgängig machen
  clearTile(tx,ty)
  addSprite(sx,sy,type)
  if(captured) addSprite(tx,captured.y,captured.type)
  
  return inCheck
}


function showLegalMoves(x,y,type){
  clearHighlights()
  legalMoves=[]
  for(let tx=0;tx<8;tx++){
    for(let ty=0;ty<8;ty++){
      if(!rawCanMove(x,y,tx,ty,type)) continue
      if(wouldLeaveKingInCheck(x,y,tx,ty,type)) continue
      legalMoves.push({x:tx,y:ty})
    }
  }
  legalMoves.forEach(m=>addSprite(m.x,m.y,HIGHLIGHT))
}


onInput("i",()=>step(-1,true))
onInput("k",()=>step(1,true))
onInput("j",()=>confirm(true))
onInput("l",()=>abort(true))

onInput("s",()=>step(-1,false))
onInput("w",()=>step(1,false))
onInput("d",()=>confirm(false))
onInput("a",()=>abort(false))

function step(dir,isWhitePlayer){
  if(whiteTurn!==isWhitePlayer) return
  let pieces=getOwnPieces()
  if(mode==="PIECE"){
    pieceIndex=(pieceIndex+dir+pieces.length)%pieces.length
    setCursor(pieces[pieceIndex].x,pieces[pieceIndex].y)
  }else{
    moveIndex=(moveIndex+dir+legalMoves.length)%legalMoves.length
    setCursor(legalMoves[moveIndex].x,legalMoves[moveIndex].y)
  }
}

function confirm(isWhitePlayer){
  if(whiteTurn!==isWhitePlayer) return
  let pieces=getOwnPieces()
  if(mode==="PIECE"){
    showLegalMoves(pieces[pieceIndex].x,pieces[pieceIndex].y,pieces[pieceIndex].type)
    if(legalMoves.length){mode="MOVE";moveIndex=0;setCursor(legalMoves[0].x,legalMoves[0].y)}
  }else{
    movePiece(pieces[pieceIndex],legalMoves[moveIndex])
  }
}

function abort(isWhitePlayer){
  if(whiteTurn!==isWhitePlayer||mode!=="MOVE") return
  mode="PIECE";clearHighlights()
  let p=getOwnPieces()[pieceIndex]
  setCursor(p.x,p.y)
}


function movePiece(p,m){
  clearHighlights()
  getAll(CURSOR).forEach(c=>c.remove())
  clearTile(p.x,p.y)
  clearTile(m.x,m.y)
  addSprite(m.x,m.y,p.type)

  whiteTurn=!whiteTurn
  mode="PIECE"
  pieceIndex=0
  let next=getOwnPieces()
  setCursor(next[0].x,next[0].y)
}


function rawCanMove(sx,sy,tx,ty,t){
  if(!inBounds(tx,ty)||sx===tx&&sy===ty) return false
  let trg=getPieceAt(tx,ty)
  if(trg&&(isWhite(t)&&isWhite(trg.type)||isBlack(t)&&isBlack(trg.type))) return false
  switch(t){
    case WP:return pawn(sx,sy,tx,ty,-1)
    case BP:return pawn(sx,sy,tx,ty,1)
    case WR:case BR:return rook(sx,sy,tx,ty)
    case WN:case BN:return knight(sx,sy,tx,ty)
    case WB:case BB:return bishop(sx,sy,tx,ty)
    case WQ:case BQ:return rook(sx,sy,tx,ty)||bishop(sx,sy,tx,ty)
    case WK:case BK:return Math.abs(tx-sx)<=1&&Math.abs(ty-sy)<=1&&!isSquareAttacked(tx,ty,isBlack(t))
  }
  return false
}


function pawn(sx,sy,tx,ty,d){
  if(tx===sx+d&&ty===sy&&isEmpty(tx,ty))return true
  if(tx===sx+2*d&&ty===sy&&((d>0&&sx===1)||(d<0&&sx===6))&&isEmpty(sx+d,sy)&&isEmpty(tx,ty))return true
  if(tx===sx+d&&Math.abs(ty-sy)===1&&!isEmpty(tx,ty))return true
  return false
}
function rook(sx,sy,tx,ty,b){
  if(sx!==tx&&sy!==ty)return false
  let dx=Math.sign(tx-sx),dy=Math.sign(ty-sy)
  let x=sx+dx,y=sy+dy
  while(x!==tx||y!==ty){
    if(b?b(x,y):!isEmpty(x,y))return false
    x+=dx;y+=dy
  }
  return true
}
function bishop(sx,sy,tx,ty,b){
  if(Math.abs(tx-sx)!==Math.abs(ty-sy))return false
  let dx=Math.sign(tx-sx),dy=Math.sign(ty-sy)
  let x=sx+dx,y=sy+dy
  while(x!==tx){
    if(b?b(x,y):!isEmpty(x,y))return false
    x+=dx;y+=dy
  }
  return true
}
function knight(sx,sy,tx,ty){
  let dx=Math.abs(tx-sx),dy=Math.abs(ty-sy)
  return(dx===2&&dy===1)||(dx===1&&dy===2)
}


function drawVerticalText(txt, startX, startY){
    for(let i=0;i<txt.length;i++){
        addText(txt[i], {x:startX, y:startY+i, color: color`3`})
    }
}


setInterval(()=>{
    clearText()
    if(whiteTurn){
        addText("",{x:12,y:8,color:color`3`})
        if(isKingInCheck(true)) drawVerticalText("CHECK", 18, 5)
    }else{
        addText("",{x:0,y:8,color:color`3`})
        if(isKingInCheck(false)) drawVerticalText("CHECK", 1, 5)
    }
},200)


setCursor(getOwnPieces()[0].x,getOwnPieces()[0].y)
