/*
@title: generic_dungeon_crawler
@author: Lingdong Huang
@tags: ['adventure']
@addedOn: 2022-10-24
*/

let W = 10;
let H = 8;

let player = starting_stat();
let inv = starting_inv();

function starting_inv(){
  return [
     {type:'dggr',cond:'cmmn',clas:'wepn',eqip:true},
     {type:'hlth',cond:'weak',clas:'potn',qnty:12},
  ];
}

function starting_stat(){
  return {
    x:4,
    y:4,
    hlth:8,
    mxhp:8,
    gold:1,
    expr:0,
    levl:1,
    attk:0,
  }
}



let screen = 'game';

let area = 0;

let shop = [];
let shop_sel = 0;

let dlog_sel = 0;
let dlog = [];


/* cheat */
// area = 3
// inv.push(
//   {type:'waxe',cond:'cmmn',clas:'wepn',eqip:false},
//   {type:'plat',cond:'cmmn',clas:'armr',eqip:false},
//   {type:'plat',cond:'cmmn',clas:'helm',eqip:false},
//   {type:'plat',cond:'cmmn',clas:'boot',eqip:false},
//   {type:'medm',cond:'cmmn',clas:'shld',eqip:false},
// )

function get_gear(part){
  for (let i = 0; i < inv.length; i++){
    if (!inv[i].eqip){
      continue;
    }
    if (inv[i] && inv[i].clas == part){
      return [inv[i].type,inv[i].cond];
    }
  }
  return ['none','none'];
}

function get_gear_val(part){
  let [a,b] = get_gear(part);
  return stats[part][a] * stats.cond[b];
}


const snd_kill = `
30,
30: b4-30 + e5~30 + b5-30,
30: a4-30 + d5~30,
30: g4-30 + c5~30,
30: f4-30 + b4~30 + c4-30,
30: a4~30 + c4~30,
30: c4~30,
30: c4~30,
30: c4~30,
690`

const snd_attk = `
30: d5-30 + c4-30,
30: a4-30 + c4-30,
30: e4-30 + c4-30,
870`

const snd_walk = `
30: c4~30,
60,
30: c4~30,
840`

const snd_pkup = `
30: f5^30,
30: g5^30 + f5^30,
30: a5^30,
30: b5^30,
840`

const snd_guis = `
30: b4~30,
930`

const snd_potn = `
30: f4~30 + c4~30,
30: f4~30 + c4~30,
30: d4~30 + f4~30,
30: e4~30 + f4~30,
30: f4~30,
30: g4~30,
30: c4~30,
30: c4~30,
720`


let sprites = {misc:{},helm:{},armr:{},boot:{},wepn:{},shld:{},envr:{},pkup:{},npch:{},huds:{}};
let battle = -1;


sprites.helm.none = `
.....00000...
.....006660..
.....060600..
.....066660..`;

sprites.armr.none = `
...000666000.
..00220602200
..06020602060
..06020602060
0006020002060
0666020102060
0000020102060
....00000000.`;

sprites.boot.none = `
....0660660..
....0000000..
....0110110..
....0000000..`;


sprites.helm.lthr =`
.....00000...
.....0LLLL0..
.....0L0000..
.....0L0660..`;

sprites.armr.lthr = `
..00000000000
..0LLLLLLLLL0
..000L000L000
..06000L00060
00060L000L060
066600LLL0060
00000LLLLL060
....00000000.`;

sprites.boot.lthr = `
....0LL0LL0..
....0000000..
....0LL0LL0..
....0000000..`;



sprites.helm.mail =`
......0000...
.....012120..
.....020000..
.....010660..`;

sprites.armr.mail = `
...000000000.
..01212121210
..02021212020
..01012121010
0002000000020
0121012121010
0000021212020
....00000000.`;

sprites.boot.mail = `
....0210120..
....0000000..
....0110110..
....0000000..`;


sprites.helm.plat = `
.....000000..
.....022320..
.....020000..
.....022320..`;

sprites.armr.plat = `
...000000000.
..02088888020
..01088828010
..02082888020
0002088288010
2221088828020
0000088888020
....08888800.`;

sprites.boot.plat = `
....0220220..
....0000000..
....0220220..
....0000000..`;

sprites.wepn.none = `
.....
.....
.....
.....
.....
.....
.....
.....
.....
.....
.....
.....
`;

sprites.wepn.dggr = `
.....
.....
.....
.....
..0..
.020.
.020.
.020.
00000
.010.
.010.
..0..
`;


sprites.wepn.hcht = `
.....
.....
..00.
0000.
0220.
0200.
0.00.
..00.
..00.
..00.
..00.
..00.
`;


sprites.wepn.mace = `
.....
.....
.00..
0000.
0000.
0000.
0000.
.00..
.00..
.00..
.00..
.00..
`;


sprites.wepn.flil = `
..00.
.0000
..00.
..0..
.0...
.0...
..0..
.00..
.00..
.00..
.00..
.00..
`;

sprites.wepn.scmt = `
.....
.....
...00
..020
.0220
.020.
.020.
.020.
0000.
.010.
.010.
..00.
`;


sprites.wepn.sper = `
...0.
..020
..000
...0.
...0.
...0.
...0.
...0.
...0.
...0.
...0.
...0.
`;

sprites.wepn.swrd = `
.....
..0..
.020.
.020.
.020.
.020.
.020.
.020.
00000
.010.
.010.
..0..
`;


sprites.wepn.waxe = `
.000.
02000
02220
02000
.000.
..00.
..00.
..00.
..00.
..00.
..00.
..00.
`;


sprites.wepn.whmr = `
.0000
00000
00000
00000
..00.
..00.
..00.
..00.
..00.
..00.
..00.
..00.
`;

sprites.wepn.zwei = `
..0..
.020.
.020.
.020.
.020.
00000
.0L0.
.0L0.
00000
.010.
.000.
..0..
`;

sprites.shld.none = `
.......
.......
.......
.......
.......
.......
.......
.......
.......
.......
`;


sprites.shld.smll = `
.......
..0000.
.066660
.060060
.060060
.066660
..0000.
.......
.......
.......
`;

sprites.shld.medm = `
..0000.
.066360
.033330
.066360
.066360
..06360
...030.
....0..
.......
.......
`;

sprites.shld.larg = `
0000000
0101010
0101010
0000000
0101010
0101010
0101010
0101010
.001010
..0000.
`;


sprites.envr.void = `
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
0000000000000000`;

sprites.envr.flor = `
L111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`;


sprites.envr.wall =`
0000000000000000
0111111LLLLLLLL0
01LLLLLLLLLLLLL0
01LLLLLLLLLLLLL0
01LLLLLLLLLLLLL0
01LLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0000000000000000`;


sprites.envr.lddr = `
.00000000000000.
0000000000000000
0000000000000110
0000000000000000
00000000000LLLL0
0000000000000000
000000000LLLLLL0
0000000000000000
0000000LLLLLLLL0
0000000000000000
00000LLLLLLLLLL0
0000000000000000
000LLLLLLLLLLLL0
0000000000000000
0LLLLLLLLLLLLLL0
.00000000000000.`;

sprites.envr.shop = `
.....000........
....06660.......
....06660.......
...088880.......
..08800050......
00000555500000..
065555555055560.
00005555500000..
...0000400...6..
...0555550.66666
0000000550.6...6
0333330550.6....
0006000550......
0333330000.00000
0333330.0..06660
0000000.00.00000`;

sprites.pkup.loot = `
................
.....0..........
....060.........
....060.........
....060.........
...00000........
....020.........
....020..0000...
....020.066660..
....0200000660..
....0006640000..
...06676366660..
.00664606646660.
0663666467630660
066606660000000.
.0000000........`;

sprites.pkup.body = `
................
................
................
................
................
..........00....
......00000200..
.00000L2000L20..
.02200002000200.
.000220002000203
...0022000200003
.000002000003333
02L2000003333...
02220330..33....
.0000...........
..3.............`;


sprites.huds.hp00 = `
0000000000000000
2222222222222222
0000000000000000
000000000000000L
000000000000000L
000000000000000L
000000000000000L
000000000000000L
000000000000000L
000000000000000L
000000000000000L
000000000000000L
000000000000000L
0000000000000000
1111111111111111
0000000000000000`;

sprites.huds.hp14 = `
0000000000000000
2222222222222222
0000000000000000
333300000000000L
333300000000000L
333300000000000L
333300000000000L
333300000000000L
333300000000000L
333300000000000L
333300000000000L
333300000000000L
333300000000000L
0000000000000000
1111111111111111
0000000000000000`;

sprites.huds.hp12 = `
0000000000000000
2222222222222222
0000000000000000
333333330000000L
333333330000000L
333333330000000L
333333330000000L
333333330000000L
333333330000000L
333333330000000L
333333330000000L
333333330000000L
333333330000000L
0000000000000000
1111111111111111
0000000000000000`;

sprites.huds.hp34 = `
0000000000000000
2222222222222222
0000000000000000
333333333333000L
333333333333000L
333333333333000L
333333333333000L
333333333333000L
333333333333000L
333333333333000L
333333333333000L
333333333333000L
333333333333000L
0000000000000000
1111111111111111
0000000000000000`;

sprites.huds.hp11 = `
0000000000000000
2222222222222222
0000000000000000
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
0000000000000000
1111111111111111
0000000000000000`;

sprites.huds.wasd = `
.....000000.....
.....022210.....
.....021110.....
.....021110.....
.....011110.....
0000000000000000
0222101111022210
0211101111021110
0211101111021110
0111101111011110
0000000000000000
.....022210.....
.....021110.....
.....021110.....
.....011110.....
.....000000.....`

sprites.huds.wndw = `
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666`

sprites.huds.brdt = `
0000000000000000
6666666666666666
0000000000000000
0000000000000000
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666`

sprites.huds.brdb = `
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
0000000000000000
6666666666666666
0000000000000000
0000000000000000`


sprites.npch.rato = `
................
........000.....
...........00...
.............0..
...0.0.00000..0.
..00000LLLLL0..0
..0LLLLLLLLLL0.0
.03L3LLLLLLLL00.
0LLLLLLLLLLLL0..
0000LLLLLLLLL0..
020LL0LLLLLLL0..
.0000000000000..
.....0.0..0.0...
................
................
................`;

sprites.npch.skel = `
.....000000.....
.....022220.....
.....002020.....
.....022220.....
..0..02020......
.020..0000000...
.020.022220220..
.020.000200020..
.020.02222000000
0000000020002220
.000002022002020
.022200220002220
.000000000000000
..0..020020.....
.....020020.....
.....000000.....`

sprites.npch.ghst = `
.......00.......
......0220......
..0..02220..0...
.020.02220.020..
.020.00200.020..
.020.02220.020..
.0200220220220..
.0222220222220..
..022222222220..
..02222222220...
...0222222220...
....022222220...
.....022222220..
......002222220.
........00000000
................`

sprites.npch.hund = `
................
................
................
.............0..
...0.0........0.
..0000.........0
0000400000000000
020200000000000.
202030000000000.
000030000000000.
....30000000000.
.....0.0....0.0.
.....0.0....0.0.
................
................
................`

sprites.npch.Snek = `
...00000........
..0404440.......
..04444440......
..300004440..0..
.3.....0440.040.
3......0440.040.
.....00440..0440
....04440....040
...0000000...040
..044444440.0440
..0000000000040.
.04444444444040.
0000000000000000
0444444444444440
0000000000000000
................`

sprites.npch.demn = `
..............0.
.....0.0.....020
....03030....020
.0..03330..0..0.
000.00300.000.0.
030.00000.030.0.
0300033300030.0.
0333000000330.0.
033033333000000.
033033333333330.
033033333000000.
0300333330030.0.
030.00000.030.0.
.0...0..0..0..0.
....0..0......0.
................`

sprites.npch.lich = `
.7..7.000000....
..77..022220....
.7777.002020....
..77..022220....
.7007.02020.....
..00...000000...
..00..05555020..
..00..05555020..
..00..05555020..
..000005555020..
..000005555020..
..022205555000..
..0000055550....
..00..0555500...
..00..05555550..
..00..00000000..`

sprites.npch.mntr = `
..00...00..0.0.0
.00.....00.00000
.000000000.02020
..0000000..00000
...03330...0.0.0
.00003000....0..
0330333030...0..
03330003300000..
03033333303330..
03000003300000..
0333303330...0..
0000000330...0..
0333333330...0..
0000000000...0..
.000..000.......
.00...00........`;

sprites.npch.trll = `
..0000000...0000
..0444440...0LL0
..0444440...0LL0
..0044400...0LL0
.0044444000..00.
040000000440.00.
0444444444400000
0404444444404440
0404444444404440
0404444444400000
040444404440.00.
040444444440.00.
000000000000....
.02222222220....
..0000000000....
..000..000......`

sprites.npch.Drgn = `
..0000.....0....
..03330...030...
.034330..03330..
.033330..033330.
.000030.03333330
6..0330033333300
...03303333000..
..033333330.....
..033333300000..
..0333333333330.
..03333303033330
...0000003000330
...0.0..000.0030
...........00330
..........03330.
.........00000..`

let stats = {
  wepn:{
    none:0.5,
    dggr:1,
    hcht:2,
    mace:2,
    scmt:3,
    sper:3,
    flil:4,
    swrd:4,
    waxe:5,
    whmr:5,
    zwei:6,
  },
  shld:{
    none:0,
    smll:0.1,
    medm:0.2,
    larg:0.3,
  },
  helm:{
    none:0,
    lthr:0.1,
    mail:0.2,
    plat:0.3,
  },
  armr:{
    none:0,
    lthr:0.12,
    mail:0.24,
    plat:0.36,
  },
  boot:{
    none:0,
    lthr:0.06,
    mail:0.12,
    plat:0.18,
  },
  cond:{
    none:0,
    cmmn:1,
    rsty:0.8,
    fine:1.2,
    lgnd:2.0,
  },
  potn:{
    weak:2,
    cmmn:4,
    strg:8,
    elxr:20,
  },
  food:{
    tail:1,
    bone:1,
    wing:2,
    meat:3,
    lard:4,
  }
}

function make_bmp(str){
  return str.split('\n').map(x=>x.trim()).filter(x=>x.length).map(x=>x.split(''));
}


function print_bmp(b){
  return b.map(x=>x.join('')).join('\n');
}

function blit(a,b,x,y){
  for (let i = 0; i < b.length; i++){
    for (let j = 0; j < b[i].length; j++){
      let ii = y + i;
      let jj = x + j;
      if (ii < 0 || ii >= a.length || jj < 0 || jj >= a[ii].length){
        continue;
      }
      a[ii][jj] = b[i][j] == '.' ? a[ii][jj] : b[i][j];
    }
  }
}

function get_player_sprite(){
  let o = new Array(16).fill(0).map(x=>new Array(16).fill('.'));
  blit(o,make_bmp(sprites.helm[get_gear('helm')[0]]),3,0);
  blit(o,make_bmp(sprites.armr[get_gear('armr')[0]]),3,4);
  blit(o,make_bmp(sprites.boot[get_gear('boot')[0]]),3,12);
  blit(o,make_bmp(sprites.wepn[get_gear('wepn')[0]]),0,0);
  blit(o,make_bmp(sprites.shld[get_gear('shld')[0]]),9,6);
  return print_bmp(o);
}

function check_lvlup(){
  let req = Math.pow(player.levl,2)*8;
  if (player.expr >= req){
    playTune(snd_pkup);
    screen = 'dlog';
    dlog_sel = 0;
    let g = (player.levl)*20;
    let a = 1;
    dlog = ['    level up!',['attk +'+a,'mxhp +4','gold +'+g],
           [()=>{player.attk+=a;player.expr=0;player.levl++},
            ()=>{player.mxhp=Math.min(40,player.mxhp+4);player.expr=0;player.levl++},
            ()=>{player.gold+=g;player.expr=0;player.levl++}],'game'];
    
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function prim(mw,mh){
  let mmap = new Array(mw*mh).fill(0).map(x=>({
    e:0, s:0, v:0,
  }));
  let Q = [[0,0]];
  mmap[0].v = 1;
  while (Q.length){
    let [x,y] = Q.shift();
    let nbr = [];
    if (x > 0   ) nbr.push([x-1,y, x-1,y,'e']);
    if (x < mw-1) nbr.push([x+1,y, x,y,'e']);
    if (y > 0   ) nbr.push([x,y-1, x,y-1,'s']);
    if (y < mh-1) nbr.push([x,y+1, x,y,'s']);
    shuffle(nbr);
    for (let i = 0; i < nbr.length; i++){
      let [x1,y1, x0,y0, d] = nbr[i];
      if (!mmap[y1*mw+x1].v){
        mmap[y0*mw+x0][d] = 1;
        mmap[y1*mw+x1].v  = 1;
        Q.unshift([x1,y1]);
      }
    }
  }
  let o = '';
  for (let i = 0; i < mh; i++){
    for (let j = 0; j < mw; j++){
      let {e,s,v} = mmap[i*mw+j];
      o += s ? ' ' : '_';
      o += e ? '.' : '|';
    }
    o += '\n';
  }
  // console.log(o);

  return mmap;
}

function generate_dungeon(){
  let mmap = prim(8,8);

  for (let i = 0; i < mmap.length; i++){
    mmap[i].xmin = ~~(Math.random()*2)+1;
    mmap[i].xmax = ~~(Math.random()*3)+4;
    mmap[i].ymin = ~~(Math.random()*2)+1;
    mmap[i].ymax = ~~(Math.random()*3)+4;
  }

  mmap[0].xmin = 2;
  mmap[0].xmax = 6;
  mmap[0].ymin = 2;
  mmap[0].ymax = 6;

  mmap[7].xmin = 2;
  mmap[7].xmax = 6;
  mmap[7].ymin = 2;
  mmap[7].ymax = 6;

  mmap[56].xmin = 2;
  mmap[56].xmax = 6;
  mmap[56].ymin = 2;
  mmap[56].ymax = 6;

  mmap[mmap.length-1].xmin = 2;
  mmap[mmap.length-1].xmax = 6;
  mmap[mmap.length-1].ymin = 2;
  mmap[mmap.length-1].ymax = 6;

  
  let map = new Array(64).fill(0).map(x=>new Array(64).fill('_'));

  for (let i = 0; i < 8; i++){
    for (let j = 0; j < 8; j++){
      let {xmin,xmax,ymin,ymax} = mmap[i*8+j];
      for (let ii = ymin; ii <= ymax; ii++){
        for (let jj = xmin; jj <= xmax; jj++){
          map[ii+8*i][jj+8*j] = ',';
        }
      }
    }
  }
  for (let i = 0; i < 8; i++){
    for (let j = 0; j < 8; j++){
      let {xmin,xmax,ymin,ymax,s,e} = mmap[i*8+j];
      // console.log(s,e);
      if (s || (i < 7 && Math.random()<0.1)){
        xmin = Math.max(xmin, mmap[i*8+j+8].xmin);
        xmax = Math.min(xmax, mmap[i*8+j+8].xmax);
        let x = ~~(Math.random()*(xmax+1-xmin)) + xmin;
 
        for (let k = i*8+4; k <= (i+1)*8+4; k++){
          map[k][j*8+x] = ',';
        }
      }
      if (e || (j < 7 && Math.random()<0.1)){
        ymin = Math.max(ymin, mmap[i*8+j+1].ymin);
        ymax = Math.min(ymax, mmap[i*8+j+1].ymax);
        let y = ~~(Math.random()*(ymax+1-ymin)) + ymin;
        for (let k = j*8+4; k <= (j+1)*8+4; k++){
          map[i*8+y][k] = ',';
        }
      }
      
    }
  }
  for (let i = 0; i < 64; i++){
    for (let j = 0; j < 64; j++){
      if (map[i][j] == '_'){
        if (j > 0   && map[i  ][j-1] == ',') {map[i][j]='#'; continue;}
        if (j < 63  && map[i  ][j+1] == ',') {map[i][j]='#'; continue;}
        if (i > 0   && map[i-1][j  ] == ',') {map[i][j]='#'; continue;}
        if (i < 63  && map[i+1][j  ] == ',') {map[i][j]='#'; continue;}
        if (i > 0 && j > 0  && map[i-1][j-1] == ',') {map[i][j]='#'; continue;}
        if (i > 0 && j < 63 && map[i-1][j+1] == ',') {map[i][j]='#'; continue;}
        if (i <63 && j > 0   && map[i+1][j-1] == ',') {map[i][j]='#'; continue;}
        if (i < 63  && j < 63 && map[i+1][j+1] == ',') {map[i][j]='#'; continue;}
      }
    }
  }
  // map[5][5] = '%';

  map[60][4] = '%';
  map[4][60] = '%';
  map[60][60] = '/';
  
  return map;
}

function randrange(a,b){
  return Math.random()*(b-a)+a;
}

function randint(a,b){
  return ~~randrange(a,b);
}



function generate_shop(area){
  let shop = [];
  let wepns = ['dggr','hcht','mace','scmt','sper','flil','swrd','waxe','whmr','zwei'];
  let i0 = Math.min(area+3,wepns.length-3);
  wepns = wepns.slice(i0,i0+3);

  for (let i = 0; i < wepns.length; i++){
    shop.push({clas:'wepn',type:wepns[i],cond:choice(['cmmn','fine','lgnd'],[1,3,1]),eqip:false})
  }
  
  shop.push({clas:'helm',type:choice(['lthr','mail','plat'],[2,2,1]),cond:choice(['cmmn','fine','lgnd'],[1,3,1]),eqip:false});
  shop.push({clas:'armr',type:choice(['lthr','mail','plat'],[2,2,1]),cond:choice(['cmmn','fine','lgnd'],[1,3,1]),eqip:false});
  shop.push({clas:'boot',type:choice(['lthr','mail','plat'],[2,2,1]),cond:choice(['cmmn','fine','lgnd'],[1,3,1]),eqip:false});
  shop.push({clas:'shld',type:choice(['smll','medm','larg'],[2,2,1]),cond:choice(['cmmn','fine','lgnd'],[1,3,1]),eqip:false});
  shop.push({clas:'potn',type:'hlth',cond:'cmmn',qnty:9});
  return shop;
}


function generate_npcs_objs(map,area){
  let w = map[0].length;
  let h = map.length;
  let npcs = [];
  function find_empty(){
    let x = ~~(Math.random()*map[0].length);
    let y = ~~(Math.random()*map.length);
    if (map[y][x] != ','){
      return find_empty();
    }
    if (Math.abs(x-player.x)<3 && Math.abs(y-player.y)<3){
      return find_empty();
    }
    return [x,y];
  }

  let npc_choices = [(x,y)=>({
      name:'rat',type:'rato',x,y,
      aggr:0.5,hlth:4,mxhp:4,attk:1,
      expr:1,
      drop:[
        [0.3,{type:'gold',qnty:1}],
        [0.6,{type:'tail',clas:'food',qnty:1}],
        [0.1,{type:'meat',clas:'food',qnty:1}],
      ]
    }),(x,y)=>({
      name:'skel',type:'skel',x,y,
      aggr:0.3,hlth:8,mxhp:8,attk:1.4,
      expr:5,
      drop:[
        [0.4,{type:'gold',qnty:randint(5,10)}],
        [0.1,{type:'bone',clas:'food',qnty:1}],
        [0.2,{clas:'shld',type:choice(['smll','medm'],[5,1]),cond:choice(cond_choices,cond_chances),eqip:false}],
        [0.3,{clas:'wepn',type:choice(['dggr','hcht','swrd'],[3,5,1]),cond:choice(cond_choices,cond_chances),eqip:false}],
      ]
    }),(x,y)=>({
      name:'ghst',type:'ghst',x,y,
      aggr:0.8,hlth:4,mxhp:4,attk:2,
      expr:4,
      drop:[
        [0.1,{type:'gold',qnty:randint(5,10)}],
        [0.9,{clas:'potn',type:'hlth',cond:choice(['weak','cmmn','strg','elxr'],[6,8,8,1]),qnty:1}],
      ]
    }),(x,y)=>({
      name:'hund',type:'hund',x,y,
      aggr:0.9,hlth:8,mxhp:8,attk:1.25,
      expr:6,
      drop:[
        [0.8,{type:'meat',clas:'food',qnty:3}],
        [0.2,{type:'lard',clas:'food',qnty:1}],
      ]
    }),(x,y)=>({
      name:'snek',type:'Snek',x,y,
      aggr:0.2,hlth:4,mxhp:4,attk:4,
      expr:6,
      drop:[
        [0.1,{type:'gold',qnty:randint(5,10)}],
        [0.9,{clas:'potn',type:'hlth',cond:choice(['cmmn','strg'],[1,1]),qnty:1}],
      ]
    }),(x,y)=>({
      name:'demn',type:'demn',x,y,
      aggr:0.5,hlth:8,mxhp:8,attk:2,
      expr:8,
      drop:[
        [0.3,{type:'gold',qnty:randint(10,20)}],
        [0.3,{type:'wing',clas:'food',qnty:2}],
        [0.4,{clas:'wepn',type:choice(['mace','sper','flil'],[2,4,1]),cond:choice(cond_choices,cond_chances),eqip:false}],
      ]
    }),(x,y)=>({
      name:'lich',type:'lich',x,y,
      aggr:0.3,hlth:12,mxhp:12,attk:2.5,
      expr:24,
      drop:[
        [0.2,{type:'gold',qnty:randint(20,30)}],
        [0.4,{clas:'armr',type:choice(['lthr','mail','plat'],[2,3,1]),cond:choice(cond_choices,cond_chances),eqip:false}],
        [0.4,{clas:'boot',type:choice(['lthr','mail','plat'],[2,3,1]),cond:choice(cond_choices,cond_chances),eqip:false}],
      ]
    }),(x,y)=>({
      name:'mntr',type:'mntr',x,y,
      aggr:0.5,hlth:12,mxhp:12,attk:2,
      expr:24,
      drop:[
        [0.2,{type:'gold',qnty:randint(20,30)}],
        [0.45,{type:'meat',clas:'food',qnty:randint(5,8)}],
        [0.3,{clas:'wepn',type:choice(['waxe','whmr','zwei'],[4,4,1]),cond:choice(cond_choices,cond_chances),eqip:false}],
        [0.05,{clas:'boot',type:choice(['lthr','mail','plat'],[3,2,1]),cond:choice(cond_choices,cond_chances),eqip:false}],
      ]
    }),(x,y)=>({
      name:'trll',type:'trll',x,y,
      aggr:0.2,hlth:16,mxhp:16,attk:3,
      expr:32,
      drop:[
        [0.2,{type:'gold',qnty:randint(30,40)}],
        [0.4,{type:'lard',clas:'food',qnty:randint(5,8)}],
        [0.4,{clas:'wepn',type:choice(['mace','whmr'],[2,1]),cond:choice(cond_choices,cond_chances),eqip:false}],
      ]
    }),(x,y)=>({
      name:'drgn',type:'Drgn',x,y,
      aggr:0.2,hlth:24,mxhp:24,attk:4,
      expr:64,
      drop:[
        [0.02,{type:'bone',clas:'food',qnty:66}],
        [0.48,{type:'gold',qnty:500}],
        [0.5,{clas:'wepn',type:choice(['swrd','waxe','whmr','zwei'],[2,2,2,1]),cond:'lgnd',eqip:false}],
      ]
    })              
  ];  

  let wepn_choices = ['dggr','hcht','mace','scmt','sper','flil','swrd','waxe','whmr','zwei'];
  let wepn_chances = wepn_choices.map(x=>(40-stats.wepn[x]*stats.wepn[x]));

  let i0 = Math.min(area,wepn_choices.length-3);
  wepn_choices = wepn_choices.slice(i0,i0+6);
  wepn_chances = wepn_chances.slice(i0,i0+6);
  
  let cond_choices = ['rsty','cmmn','fine','lgnd'];
  let cond_chances = cond_choices.map(x=>(4.2-stats.cond[x]*stats.cond[x]));

  
  for (let i = 0; i < 100; i++){
    let [x,y] = find_empty();

    let i0 = Math.min(area,npc_choices.length-3);
    let npcc = npc_choices.slice(i0,i0+6);

    let npc = choice(npcc,[13,8,5,3,2,1].slice(0,npcc.length))(x,y);
    npcs.push(npc);

    map[y][x] = npc.type[0];
  }
  // console.log(npcs);

  let objs = [];
  for (let i = 0; i < 100; i++){
    let [x,y] = find_empty();
    map[y][x] = '$';
    objs.push({
      x,y,token:'$',
      item:generate_drop([
        [7, {type:'gold',qnty:randint(5,20)}],
        [6, {clas:'potn',type:'hlth',cond:choice(['weak','cmmn','strg','elxr'],[12,8,4,1]),qnty:randint(1,4)}],
        [3, {clas:'wepn',type:choice(wepn_choices,wepn_chances),cond:choice(cond_choices,cond_chances),eqip:false}],
        [1, {clas:'helm',type:choice(['lthr','mail','plat'],[9,3,1]),cond:choice(cond_choices,cond_chances),eqip:false}],
        [2, {clas:'armr',type:choice(['lthr','mail','plat'],[9,3,1]),cond:choice(cond_choices,cond_chances),eqip:false}],
        [1, {clas:'boot',type:choice(['lthr','mail','plat'],[9,3,1]),cond:choice(cond_choices,cond_chances),eqip:false}],
        [1, {clas:'shld',type:choice(['smll','medm','larg'],[9,3,1]),cond:choice(cond_choices,cond_chances),eqip:false}],
      ])
    });
  }
  // console.log(objs.filter(x=>x.item.clas=='wepn'));
  return [npcs,objs];

}


function update_map(){
  for (let i = 0; i < mar.length; i++){
    for (let j = 0; j < mar[i].length; j++){
      mar[i][j] = maq[i][j];
    }
  }
  for (let i = 0; i < npcs.length; i++){
    mar[npcs[i].y][npcs[i].x] = npcs[i].type[0];
  }
  for (let i = 0; i < objs.length; i++){
    mar[objs[i].y][objs[i].x] = objs[i].token;
  }
  mar[player.y][player.x] = '@';

}

function make_display(vx,vy){
  
  let o = [];
  for (let i = 0; i < H; i++){
    for (let j = 0; j < W; j++){
      // o += `@`; continue;
      let x = vx + j;
      let y = vy + i;
      if (x < 0 || x >= mar[i].length || y < 0 || y >= mar.length){
        o.push(`_`);
        continue;
      }
      o.push(mar[y][x]);      
    }
    o.push(`\n`);
  }


  for (let i = 0; i < player.mxhp/4; i++){
    if (i < ~~(player.hlth/4)){
      o[i] = '4';
    }else{
      o[i] = ''+Math.max(0,(player.hlth-i*4) % 4);
    }
  }

  if (battle >= 0){
    let npc = npcs[battle];
    for (let i = 0; i < npc.mxhp/4; i++){
      if (i < ~~(npc.hlth/4)){
        o[W+W+1-npc.mxhp/4+i] = '4';
      }else{
        o[W+W+1-npc.mxhp/4+i] = ''+Math.max(0,(npc.hlth-i*4) % 4);
      }
    }
  }

  if (screen == 'invn' || screen == 'shop'){
    for (let i = 0; i < W; i++){
      o[(W+1)*2+i]='[';
    }
    for (let j = 3; j < H-2; j++){
      for (let i = 0; i < W; i++){
        o[(W+1)*j+i]=';';
      }
    }
    for (let i = 0; i < W; i++){
      o[(W+1)*(H-2)+i]=']';
    }
  }else if (screen == 'dlog'){
    for (let i = 0; i < W; i++){
      o[(W+1)*3+i]='[';
    }
    for (let j = 4; j < H-3; j++){
      for (let i = 0; i < W; i++){
        o[(W+1)*j+i]=';';
      }
    }
    for (let i = 0; i < W; i++){
      o[(W+1)*(H-3)+i]=']';
    }
  }
  
  // console.log(o);
  return o.join('');
}

function get_legends(){
  let legends = [
    ['@',get_player_sprite()],
    ['_',sprites.envr.void],
    [',',sprites.envr.flor],
    ['#',sprites.envr.wall],
    ['/',sprites.envr.lddr],
    ['%',sprites.envr.shop],
    ['0',sprites.huds.hp00],
    ['1',sprites.huds.hp14],
    ['2',sprites.huds.hp12],
    ['3',sprites.huds.hp34],
    ['4',sprites.huds.hp11],
    ['[',sprites.huds.brdt],
    [']',sprites.huds.brdb],
    [';',sprites.huds.wndw],
    ['$',sprites.pkup.loot],
    ['~',sprites.pkup.body],
  ];
  for (let k in sprites.npch){
    legends.push([k[0], sprites.npch[k]]);
  }
  return legends;
}

function move_npcs(){
  function try_move(i,dx,dy){
    let npc = npcs[i];
    if (npc.y+dy == player.y && npc.x+dx == player.x){

      if (battle == -1){
        battle = i;
      }else{
        
        let d1 = Math.abs(npcs[battle].x-player.x) + Math.abs(npcs[battle].y-player.y)
        if (d1 > 1.01){
          battle = i;
        }
      }
      return;
    }
    
    if (mar[npc.y+dy][npc.x+dx] == ','){
      npc.x+=dx;
      npc.y+=dy;
    }
  } 
  for (let i = 0; i < npcs.length; i++){

    let {x,y,aggr} = npcs[i];
    let dx = player.x-x;
    let dy = player.y-y;
    if (Math.abs(dx) < 5 && Math.abs(dy) < 5){
      if (Math.random() < aggr){
        if (Math.sign(dx) && Math.sign(dy)){
          if (Math.random()<0.5){
            try_move(i,Math.sign(dx),0);
          }else{
            try_move(i,0,Math.sign(dy));
          }
        }else{
          try_move(i,Math.sign(dx),Math.sign(dy));
        }
      }
    }
    update_map();
  }
  
}

function discr_float(x){
  let x0 = ~~x;
  let x1 = x - x0;
  if (Math.random() < x1){
    x0++;
  }
  return x0;
}

let msg = "<^v> move\ni inventory";

let inv_sel = 0;

function get_price(x){
  if (!x) return;
  if (x.clas == 'wepn'){
    return Math.ceil((stats.wepn[x.type]*stats.cond[x.cond])**2*8);
  }else if (x.clas == 'potn'){
    return Math.ceil(stats.potn[x.cond]**2*0.75);
  }else if (x.clas == 'food'){
    return Math.ceil(stats.food[x.type]**2*0.5);
  }else if (x.clas == 'shld'){
    return Math.ceil((stats.shld[x.type]*stats.cond[x.cond]*15)**2*10);
  }else if (['shld','helm','armr','boot'].includes(x.clas)){
    return Math.ceil((stats[x.clas][x.type]*stats.cond[x.cond]*20)**2*10+10);
  }
}

function descr_item_stat(x){
  if (!x) return;
  if (x.clas == 'wepn'){
    return "attk+"+(~~(stats.wepn[x.type]*stats.cond[x.cond]*100)/100);
  }else if (x.clas == 'potn'){
    return x.type+"+"+(~~(stats.potn[x.cond]*100)/100)
  }else if (x.clas == 'food'){
    return "hlth+"+(~~(stats.food[x.type]*100)/100)
  }else if (x.clas == 'shld'){
    return "blck+"+(~~(stats.shld[x.type]*stats.cond[x.cond]*100)/100)
  }else if (['shld','helm','armr','boot'].includes(x.clas)){
    return "armr+"+(~~(stats[x.clas][x.type]*stats.cond[x.cond]*100)/100)
  }
}
        
function descr_item(x){
  if (!x) return;
  if (x.clas == 'wepn'){
    return `${x.cond} ${x.type}         ${x.eqip?'E':' '}`;
  }else if (x.clas == 'potn'){
    return `${x.cond} ${x.type} ${x.clas} x${x.qnty}`;
  }else if (x.clas == 'food'){
    return `${x.clas}:${x.type}      x${x.qnty}`;
  }else if (['shld','helm','armr','boot'].includes(x.clas)){
    return `${x.cond} ${x.type} ${x.clas}    ${x.eqip?'E':' '}`;
  }

}

function draw_texts(){
  clearText();
  
  addText("$ :"+player.gold, { x:0, y: 3, color: color`6` });
  addText("lv:"+player.levl+" xp:"+player.expr, { x:0, y: 2, color: color`6` });
  

  if (screen == 'invn'){
    addText(`
^ prev   ^ back > ok
v next < del v drop 
`, { x:0, y: 13, color: color`6` });
    addText(""+descr_item_stat(inv[inv_sel]),
            { x:11, y: 3, color: color`4` });

    addText("armr:"+(~~(calc_defence()*100)/100),
            { x:11, y: 0, color: color`6` });
    addText("attk:"+(~~(calc_damage()*100)/100),
            { x:11, y: 1, color: color`6` });
    addText("blck:"+(~~(get_gear_val('shld')*100)/100),
            { x:11, y: 2, color: color`6` });
    
    for (let i = 0; i < inv.length; i++){
      addText((inv_sel==i?'>':' ')+descr_item(inv[i]),
              { x:0, y: i+5, color: color`0` });
    }

  }else if (screen == 'shop'){
    addText(`
^ prev        ^ back
v next        > buy
`, { x:0, y: 13, color: color`6` });
    addText("merchant",
            { x:11, y: 0, color: color`2` });
    addText("$ "+get_price(shop[shop_sel]),
          { x:11, y: 2, color: color`4` });
  
    addText(""+descr_item_stat(shop[shop_sel]),
            { x:11, y: 3, color: color`4` });
    
    for (let i = 0; i < shop.length; i++){
      addText((shop_sel==i?'>':' ')+descr_item(shop[i]),
              { x:0, y: i+5, color: color`0` });
    }

  }else if (screen == 'dlog'){
    addText(`
^ prev          
v next          > ok
`, { x:0, y: 13, color: color`6` });
    addText(dlog[0],{ x:1, y: 7, color: color`0` });
    for (let i = 0; i < dlog[1].length; i++){
      addText((dlog_sel==i?'>':' ')+dlog[1][i],{ x:0, y: 8+i, color: color`0` });
    }
    
  }else{
    addText('L'+(''+area).padStart(2,'0'), { x:17, y: 15, color: color`5` });
    addText(msg, { x:0, y: 14, color: color`6` });
  }
}

setLegend(...get_legends());

setBackground(',');


let maq = []
let mar = [];
let npcs = [];
let objs = [];

function next_map(){
  area ++;
  player.x = 4;
  player.y = 4;
  maq = generate_dungeon();
  mar = new Array(maq.length).fill(0).map(x=>new Array(maq[0].length).fill('_'));
  update_map();
  [npcs,objs] = generate_npcs_objs(mar,area);
  shop = generate_shop(area);
  // console.log(shop);
  // console.log(print_bmp(mar));
  setMap(make_display(player.x-W/2,player.y-H/2));
  draw_texts();

  
}

next_map();

function choice(opts,percs){
  if (!percs){
    percs = opts.map(x=>1);
  }
  let s = 0;
  for (let i = 0; i < percs.length; i++){
    s += percs[i];
  }
  let r = Math.random()*s;
  s = 0;
  for (let i = 0; i < percs.length; i++){
    s += percs[i];
    if (r <= s){
      return opts[i];
    }
  }
}


function generate_drop(drop){
  return choice(drop.map(x=>x[1]),drop.map(x=>x[0]));
}


function calc_defence(){
  let prot = get_gear_val('helm') + get_gear_val('armr') + get_gear_val('boot');
  prot = Math.min(prot,0.99);
  return prot;
}
function calc_damage(){
  return get_gear_val('wepn') + player.attk;
}

function calc_battle(){
  
  
  let msg0,msg1;
  let npc = npcs[battle];

  let block = get_gear_val('shld');
  if (Math.random() < block){
    msg0 = "u blocked "+npc.name+"!";
  }else{
  
    let hurt = npc.attk + area*0.1;
    let prot = calc_defence();
    
    hurt *= (1 - prot);

    hurt = discr_float(hurt);
    
    player.hlth -= hurt;
    msg0 = ""+npc.name+" hits u -"+hurt+"!";
  }

  let dmg = calc_damage();
  
  dmg = discr_float(dmg);
  
  npc.hlth -= dmg;
  msg1 = "u hit "+npc.name+" -"+dmg+"!";
  
  
  player.hlth = Math.max(player.hlth,0);
  npc.hlth = Math.max(npc.hlth,0);

  if (npc.hlth <= 0){
    
    objs.push({
      x:npc.x,
      y:npc.y,
      token:'~',
      item:generate_drop(npc.drop),
    });
    player.expr += npc.expr;
    npcs.splice(battle,1);
    battle = -1;

  }
  
  if (player.hlth <= 0){
    dlog = ['you are dead',[
       'restart',
       'cheat'
      ],[()=>{
       area = -1;
       player = starting_stat();
       inv = starting_inv();
       msg = "";
       next_map();
      },()=>{
       player.mxhp = 40;
       player.hlth = 40;
       player.gold = 9999;
      }],'game'];
    screen = 'dlog';
    dlog_sel = 0;
  }
  if (npc.hlth > 0 && player.hlth > 0){
    playTune(snd_attk);
  }else{
    playTune(snd_kill);
  }

  msg = msg0+'\n'+msg1;
}

function handle_move(dx,dy){
  playTune(snd_walk);
  
  msg = '';
  let v = mar[player.y+dy][player.x+dx];
  if (v == ','){
    player.x+=dx;
    player.y+=dy;
  }else if (v == '/'){

    dlog = ['point of no return',['next area','cancel'],
       [()=>{next_map()},
        ()=>{}],'game'];
    screen = 'dlog';
    dlog_sel = 0;
    
  }else if (v == '%'){
    screen = 'shop';
    shop_sel = 0;
    
  }else if (v == '$' || v == '~'){
    for (let i = objs.length-1; i>=0; i--){
      let {x,y,item} = objs[i];
      if (x != player.x+dx || y!= player.y + dy){
        continue;
      }
      if (!item){
        msg = "picked up:\nnothing useful";
        objs.splice(i,1);
      }else if (item.type == 'gold'){
        msg = 'picked up:\n'+item.qnty+' gold';
        player.gold += item.qnty;
        objs.splice(i,1);
        playTune(snd_pkup);
      }else{
        let descr = descr_item(item);
        let idx = can_add(item);
        
        if (idx == -1){
          msg = "no space in inv for\n"+descr;

          
        }else if (idx == inv.length){
          inv.push(item);
          msg = "picked up:\n"+descr;
          objs.splice(i,1);
          playTune(snd_pkup);
        }else{
          inv[idx].qnty += item.qnty;
          msg = "picked up:\n"+descr;
          objs.splice(i,1);
          playTune(snd_pkup);
        }
        
              
      }
      break;
    }
  }else if (v != '#' && v != '_'){
    for (let i = 0; i < npcs.length; i++){
      let {x,y} = npcs[i];

      if (x == player.x+dx && y== player.y + dy){
        battle = i;
        calc_battle();
        break;
      } 
    }
  }
  
}

onInput('a',function(){
  if (screen == 'game'){
    handle_move(-1,0);
  }
})
onInput('d',function(){
  if (screen == 'game'){
    handle_move(1,0);
  }
})

onInput('w',function(){
  if (screen == 'game'){
    handle_move(0,-1);
  }else if (screen == 'invn'){
    playTune(snd_guis);
    inv_sel = (inv_sel-1+inv.length) % Math.max(1,inv.length);
  }else if (screen == 'dlog'){
    playTune(snd_guis);
    dlog_sel = (dlog_sel-1+dlog[1].length) % Math.max(1,dlog[1].length);
  }else if (screen == 'shop'){
    playTune(snd_guis);
    shop_sel = (shop_sel-1+shop.length) % Math.max(1,shop.length);
  }
})
onInput('s',function(){
  if (screen == 'game'){
    handle_move(0,1);
  }else if (screen == 'invn'){
    playTune(snd_guis);
    inv_sel = (inv_sel+1) % Math.max(1,inv.length);
  }else if (screen == 'dlog'){
    playTune(snd_guis);
    dlog_sel = (dlog_sel+1) % Math.max(1,dlog[1].length);
  }else if (screen == 'shop'){
    playTune(snd_guis);
    shop_sel = (shop_sel+1) % Math.max(1,shop.length);
  }
})

onInput('i',function(){
  if (screen == 'game'){
    playTune(snd_guis);
    screen = 'invn';
  }else if (screen == 'invn'){
    playTune(snd_guis);
    screen = 'game';
  }else if (screen == 'shop'){
    playTune(snd_guis);
    screen = 'game';
  }
})

function discard_sel_item(){
  if (inv.length){
    playTune(snd_guis);
    inv.splice(inv_sel,1);
    inv_sel = (inv_sel+inv.length) % Math.max(1,inv.length);
    setLegend(...get_legends());
  }
}

function drop_sel_item(){
  update_map();
  if (inv.length){
    let ok = 0;
    for (let i = -1; i <= 1; i++){
      for (let j = -1; j <= 1; j++){
        let x = player.x + j;
        let y = player.y + i;
        if (mar[y][x] == ','){
          if (inv[inv_sel].eqip != undefined){
            inv[inv_sel].eqip = false;
          }
          objs.push({
            x,
            y,
            token:'$',
            item:inv[inv_sel]
          });
          ok = 1;
          break;
        }
      }
      if (ok) break;
    }
    if (!ok){
      msg="no floor for drop";
    }else{
      playTune(snd_kill);
      inv.splice(inv_sel,1);
      inv_sel = (inv_sel+inv.length) % Math.max(1,inv.length);
      setLegend(...get_legends());
    }
    // console.log(mar);
    update_map();
  }
}

function can_add(item){
  let added = false;
  if (item.qnty != undefined){
    for (let j = 0; j < inv.length; j++){
      if (inv[j].type == item.type && inv[j].cond == item.cond){
        return j;
      }
    }
  }
  if (!added){
    if (inv.length >= 8){
      return -1;
    }else{
      return inv.length;
    }
  }        
}

onInput('l',function(){
  if (screen == 'invn' && inv.length){
    if (inv[inv_sel].eqip != undefined){

      playTune(snd_guis);
      inv[inv_sel].eqip = !inv[inv_sel].eqip;
      if (inv[inv_sel].eqip){
        for (let i = 0; i < inv.length; i++){
          if (i == inv_sel) continue;
          if (inv[i] && inv[i].eqip && inv[i].clas == inv[inv_sel].clas){
            inv[i].eqip = false;
          }
        }
      }
      setLegend(...get_legends());
    }else if (inv[inv_sel].qnty){
      let item = inv[inv_sel];
      
      if (item.clas == 'potn'){
        if (item.type == 'hlth'){
          playTune(snd_potn);
          player.hlth += stats.potn[item.cond];
          
        }
      }else if (item.clas == 'food'){
        playTune(snd_potn);
        player.hlth += stats.food[item.type];
      }
      item.qnty--;
      if (!item.qnty){
        discard_sel_item();
      }
      // console.log(player.mxhp,player.hlth);
      player.hlth = Math.min(player.mxhp,player.hlth);
    }
  }else if (screen == 'dlog'){
    playTune(snd_guis);
    dlog[2][dlog_sel]();
    screen = dlog[3];
  }else if (screen == 'shop'){
    let price = get_price(shop[shop_sel]);
    if (player.gold < price){
      playTune(snd_guis);
      screen = 'dlog';
      dlog_sel = 0;
      let g = (player.levl)*20;
      let a = 1;
      dlog = ['not enough $',['ok'],
             [()=>{}],'shop'];
    }else {
      let idx = can_add(shop[shop_sel]);
      
      if (idx == -1){
        playTune(snd_guis);
        screen = 'dlog';
        dlog_sel = 0;
        let g = (player.levl)*20;
        let a = 1;
        dlog = ['no space in inv',['ok'],
               [()=>{}],'shop'];
      }else{
        playTune(snd_pkup);
        player.gold -= price;

        if (shop[shop_sel].qnty){
          let item = Object.assign({},shop[shop_sel],{qnty:1});
          if (idx == inv.length){
            inv.push(item);
          }else{
            inv[idx].qnty ++;
          }
          shop[shop_sel].qnty --;
          if (shop[shop_sel].qnty <= 0){
            shop.splice(shop_sel,1);
            shop_sel = (shop_sel+shop.length) % Math.max(1,shop.length);
          }
        }else{
          playTune(snd_pkup);
          inv.push(shop[shop_sel]);
          shop.splice(shop_sel,1);
          shop_sel = (shop_sel+shop.length) % Math.max(1,shop.length);
        }
      }
      
    }
  }
})

onInput('j',function(){
  if (screen == 'invn'){
    discard_sel_item();
  }
})

onInput('k',function(){
  if (screen == 'invn'){
    drop_sel_item();
  }
})


afterInput(() => {

  
  if (screen == 'game'){
    move_npcs();
    check_lvlup();
  }
  
  update_map();
  setMap(make_display(player.x-W/2,player.y-H/2));  
  draw_texts();

});



