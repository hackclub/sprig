/*
@title: Giggler Puzzles
@author: Portable-Certified
@addedOn: 2025-01-03
@tags: []
Hi! This is a puzzle game. That's about it.

YOUR OBJECTIVE:
  - Traverse with your smiling friend to reach the giggler by 
  moving boxes, identifying suspicious walls, filling pressure plates 
  which opens locks, AND EVENTUALLY REACHING THE GIGGLER!

  YOU ARE NOT ALONE.

  CONTROLS:
  - WASD to move
  - I to reset level
  - K to skip a level (5 Max)
*/

const smile = "p"
const block = "b"
const giggler = "g"
const fakegiggler = "f"
const broken = "r"
const fakeblock = "v"
const gaggler = "k"
const fake = "a"
const kill = "q"
const bg = "t"
const pressure = "s"
const lock = "l"
var move = 0 //enables or disables moving
var four = 0 
//used to prevent the message on lvl. 4 from repeating
var levelStart = 0
//Not the most important var but 
//it allows pressure to make a sound when covered
lockHere = 1 //is the lock enabled?
var skips = 0

setLegend(
  [smile, bitmap`
................
................
................
................
................
..............0.
...0............
...............0
..0...........00
..0...........0.
..00.........00.
...000....0000..
......00000.....
................
................
................`],
  [fake, bitmap`
000.00..0.0.000.
0..0..0.00..0...
00.0000.0.0.00..
0..0..0.0.0.0...
0..0..0.0.0.000.
................
000.00..000.000.
0.0.0.0..0..0...
0.0.00...0..00..
0.0.0.0..0..0...
000.00..00..000.
................
....000.000.0.0.
.00.0....0..0.0.
....0....0......
....000..0..0.0.`],
  [kill, bitmap`
0...0.0.0..0....
0...0.0.0..0....
0...0.0.0..0....
0.0.0.0.0..0....
00.00.0.00.00...
................
0.0.0.0..0......
00..0.0..0......
0.0.0.0..0......
0.0.0.00.00.....
................
0...0.0000.0..0.
.0.0..0..0.0..0.
..0...0..0.0..0.
..0...0..0.0..0.
..0...0000.0000.`],
  [fakegiggler, bitmap`
....66666666....
...6666666666...
..666666666666..
.66666666666666.
6666276666276666
6666756666756666
6666666666666666
6666666666666666
6576666666666756
6557666666667556
6655776666775566
6665577777755666
.66655555555666.
..666666666666..
...6666666666...
....66666666....`],
  [giggler, bitmap`
....66666666....
...6666666666...
..666666666666..
.66666666666666.
6666276666276666
6666756666756666
6666666666666666
6666666666666666
6676666666666766
6657666666667566
6655776666775566
6665577777755666
.66655555555666.
..666666666666..
...6666666666...
....66666666....`],
  [gaggler, bitmap`
....66666666....
...6666666666...
..666666666666..
.66666666666666.
6666726666726666
6666576666576666
6666666666666666
6666666666666666
6656666666666566
6557666666667556
6655776666775566
6665577777755666
.66655555555666.
..666666666666..
...6666666666...
....66666666....`],
  [pressure, bitmap`
6666666666666666
6..............6
6.666666666666.6
6.6..........6.6
6.6..........6.6
6.6..........6.6
6.6..........6.6
6.6..........6.6
6.6..........6.6
6.6..........6.6
6.6..........6.6
6.6..........6.6
6.6..........6.6
6.666666666666.6
6..............6
6666666666666666`],
  [broken, bitmap`
FF6F6FFFFFF6F6FF
666F66666666F666
F6F6F6FFFF6F6F6F
F6F6F6FFFF6F6F6F
F6F6F6FFFF6F6F6F
6666666666666666
F6F6F6FFFF6F6F6F
F6F6F6FFFF6F6F6F
F6F6F6FFFF6F6F6F
F6F6F6FFFF6F6F6F
6666666666666666
F6F6F6FFFF6F6F6F
F6F6F6FFFF6F6F6F
F6F6F6FFFF6F6F6F
666F66666666F666
FF6F6FFFFFF6F6FF`],
  [fakeblock, bitmap`
3333333333333333
3300LLLLLLLL0033
303LLLLLLLLLL303
30L31LLLLLL13L03
3LL1322222231LL3
3LLL23222232LLL3
3LLL22322322LLL3
3LLL22233222LLL3
3LLL22233222LLL3
3LLL22322322LLL3
3LLL23222232LLL3
3LL1322222231LL3
30L31LLLLLL13L03
303LLLLLLLLLL303
3300LLLLLLLL0033
3333333333333333`],
  [bg, bitmap`
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999`],
  [block, bitmap`
3333333333333333
3300LLLLLLLL0033
303LLLLLLLLLL303
30L3122222213L03
3LL1322222231LL3
3LL2232222322LL3
3LL2223223222LL3
3LL2222332222LL3
3LL2222332222LL3
3LL2223223222LL3
3LL2232222322LL3
3LL1322222231LL3
30L3122222213L03
303LLLLLLLLLL303
3300LLLLLLLL0033
3333333333333333`],
  [lock, bitmap`
00.0333333330.00
0003333333333000
.0333......3330.
0333........3330
333.3FFFFFF3.333
33..F3FFFF3F..33
33..FF3FF3FF..33
33..FFF33FFF..33
33..FFF33FFF..33
33..FF3FF3FF..33
33..F3FFFF3F..33
333.3FFFFFF3.333
0333........3330
.0333......3330.
0003333333333000
00.0333333330.00`])

setSolids([smile, block, broken, lock])
setBackground(bg)

let level = 1
const levels = [
  map`
vvgvv
kbbbk
vbpbv`, //screen
  map`
...
..g
b..
..b
b..
bb.
p..`, //intro -1
  map`
b.g..
.r...
..b.q
...bk
pbafb`, //movable block introduction -2
  map`
g.r.
b.b.
b.b.
b.bp
b.b.
b.b.
f.r.`, //choose wisely -3
  map`
.....b.b
aaa..bpb
vvvbvbrb
...bab.b
.g.vr..b
bbbb...b`, //fake block introduction -4
  map`
avr...r.
.brr..r.
.b..rr.g
.b.r...r
pbr..rr.`, //practice -5
  map`
.s.....bg
.v.....bl
vvv......
.v.......
.vvvvvvr.
.........
bbbbbbb.b
..r.....s
b.bbbbbbb
s......rp`, //pressure -6
  map`
.....p.
..rr...
br.rrrr
....rr.
r.rr..v
.r.r.r.
r..rrg.
.kr..r.`, //ooo spooky + e7
  map`
bvvvvbb
bvbbvbf
vvbvvbv
vbbvbbv
vbbpvbv
vvvbvbv
bbvbvbv
gvvbvvv`, //find a small path -8
  map`
....b.r.....r...b..bk
b..bbbbfb...bb..bp.b.
.r.b.f.bb..bfb.rfbr..
b...r.b.bb.b..r.b..bb
fr.bb.bbb..b.b.....b.
b..bbb...b.fbbbb.....
..bb...bb.bb..b...bb.
b....bbbb.gbb......b.
.bbb..r..rr.b..bbb...
kb..r.bb.....bb....b.
.b.b..b.r...bb.r.r...
.bb...r..b.b...r.bb.b
r.bb..bbbbbr..bbbbbr.
.rbbb..b....rbbf.r..r
b.bb.r...bb..b.b.b.f.
b.......r..r.b.brr..r
..b..bbbbb..b..b.brbr
b.b...b....r...b..rb.
b.b.brbb.......b.bb..
..b.bbfb.bbbbb.b.b...
fbb.r...r..r.......bb`, //og map + 9e
  map`
b.b....r..b.sr.......
b....b.bb.b.rlbbbb...
.kbbb.b.b...rb....bb.
..bbb.b....b.b.p.r.br
bv.b.r..b.bg.b..r.r..
b.r..b.bb..brfb.r...r
bb...b..bb...bbb.rbr.
bb....b..a.bbb.brb...
f.rbbbbbbrbbb....br..
bb..b..vr..b..r.r...r
bb.rbr......r.....bb.
bb.....rbbbbb.r.b..b.`, //find a path -10
  map`
.r..r.rr...rr
r.r..r..r.r.r
r.r.r..r.r...
pr.rr.r.r.rrr
.r.r.rr.r.r..
.rrr..r.rbvbb
rr.r.rrbrr..r
...rr....r..r
.r..r.rrbrrr.
.rrr.r.r..r..
rr.rr.b.r..r.
.r...rv..rr.r
..r.rrb.g..r.`, //one real way and a blocked way -11
  map`
.r..r.r..r..p.........r
...r...r.r.r..rr.b.b.rr
bb...r.rrb......r..r.rf
fb.rr.r.r.bbrb.rb.r...b
..r..rr..r...rb...r.rrb
rb.b..b.b.k.rr.r..b..rr
...rb.r..r..r.r.b..r.br
b...rb.brbrb...brbr....
...b.r..rrrbrr..r.bb...
.b......r.r.rb.r.rb.b..
r.b..r.....b...........
...rr..r.b....f....b.r.
.r.rr.bb..r..rb....r...
.rbf.rb...r.rbb.rr..b..
....r.b.r.b.bbr..r.br.f
r...r..brbbbr........r.
b.b.r.rr.r...rr.rbb....
..r...b....rb..bbb.bbb.
rr...r.brr..r...bb..b..
..rbrr.r.br..rbrgb...b.
r..b.b.b....bbb..b..r..
.bb..rrbb...br.brb...bb
fb.br..rb.r.bb..r...r..
.b.f.v.....bbfbb.r..b..
b...rb....b...r...rbf..`, //huge map + e12
  map`
ffffgff
fffffff
fffffff
fffffff
fffffff
fffffff
fffffff
fffpfff
fffffff
fffffff
fffffff
fffffff
fffffff
fffffff
fffffff`, //find it -13
  map`
b...b.......
.....bb.b...
.r...b......
..b....v....
.bb..bb..b.b
bpb.......s.
.rb......b..
..b..bvbbbb.
..b..b.r.b..
......bgb...
.......lb..s`, //fake level -14
  map`
r...r.....rr..r.
.gb.brrr.rrr.rr.
r.b.br....r.r.r.
r.brbr.rr.rr..r.
.rb.b.r.rrr.rrr.
r.b.b..r.rrr..b.
..r.vr....r..rrp
.rb.b.rrr.r...b.`, //red wall -15
  map`
..rr..rr..vr.vr..vr.r...
rr.f.vvrvvrvvrvrrvvvvrgr
r.r.rvr.rr..r.r.f..rvr..
bfbbbbbrbbrb.bbrbbrbbbbb
b..r.vr.r.krr.r....rv..b
b.r..v..rr...rr.r.rrvr.b
b.b.rvr.r.vrvvrr....r.rb
b.br.rr.r.v.r.rvr.rrv..b
b.b.rr.r.rvr.vvv..rsvr.b
b.b...rr.rv..r..r..rvr.b
b.bbbb..r.vvvvrvvvrvv..b
b.b.kb.r..r.r..rr.rkr..b
b.vl.br.r..r.r..rr....rb
bpbbbbbbbbbbbbbrbbbbbbbb`, //spiral -16
  map`
.r..r.....rr......
r.r..rr.rr..r.r.r.
rr.rr.r.r.r..rr..r
....rr....r.rr....
prrr..rrrr....r.r.
.rr.r..r.rrrrr.b..
.r..rrrr....r...b.
r.rrr.r.r.rr..rb.r
...r..r..rrr.rr.b.
.r.r.r..rr.r.rr.g.
.r.r.r.r...rr...b.`, //boxes everywhere -17
  map`
r.r..f.r.r....r..f...
gr.rbbr.b.rr.brvrvrrr
rv..b..b..f.b..r.bb..
brb.rr..br.b..bb.r.rb
...r.v.b....rr.b.rv..
.br...bfbrbr..bfbr.b.
..b.rr....b.b.r...r..
b..bb.brb....b..b..br
..r..br..b.rb.brb.b..
rb..r..frbb.........b
fb.b.b.....r..br.b...
.b.r..bbb.r.bbfv..b..
.b.br.r.rr.r..b.bb.rb
b.r...rfb.brr..r..rf.
r..b.b.r.r..r.b...r..
.r.br.b..bb....r.b.b.
r.rb....r.rbbr...r..r
p..r..r...r....bbfb..`, //fake wall to escape. -18
  map`
bbbvvvbbvpbbbbb
bbbvbvbbvbbbbbb
bvvvbvbbvvbvbbb
vvbbvvvgbvbvbbb
vbvbbbbbvvbvbbb
vbvbvvvvvvvvbfb
vbvbvbbbvvbvbvb
vbvbvbvvvbbvbbb
vvvbvvbbvvvvbvb
vvvbbvbvvvbvbvb
bbvbbvbbbbbvvvb
bvvvvvvvvvvvbbb
bbbbvbvbbbbbbbb
bbbbvbvbbbbbbbb
bbbbvbvbbbbbbbb
fvvbbbvvvbvvvvb
bbvbbbbbvbvbvvb
bbvbbbbbvvvbbvb
bbvbbbbbvbbbbvb
bbvvvvvvvvvvvvb
bbbbbbbbbbbbbbb`, //horrific maze -19
  map`
prbvrvrvrbvrvrs.g
..brvrrvvvrvvrrl.
r.brvvbrvvbvr.rrr
r.bvrbbvvrvvvv.r.
sr...rkrvrbrrvr..
r.b.brvrrrrbrrbbb
.r.rb..b..r..bb.r
..r..r.b.rsvb.r..
.r.br..r.rbvvv.r.
rsr.r.b.r..bbr.rf`, //so many paths + e20
  map`
...ra...b....r.r
.r.rgrr.rv..rv.s
r.brrr..b.r.rvrr
...r.brrbr.rrrrr
r.r.rr..r.r.b.r.
rr..rl..rr.rb..r
..rr.r.rr.r.v.rp
kr.rrrr.rrrrb.r.`, //3rd last level + e21
  map`
ffffffffffffffffffffff
ffffffffffffffffffffff
ffgfffffffffffffffffff
ffffffffffffffffffffff
ffffffffffffffffffffff
ffffffffffffffffffffff
ffffffffffffffffffffff
ffffffffffffffffffffff
ffffffffffffffffffffff
ffffffffffffffffffffff
ffffffffffpfffffffffff
ffffffffffffffffffffff
ffffffffffffffffffffff
ffffffffffffffffffffff
ffffffffffffffffffffff
ffffffffffffffffffffff
ffffffffffffffffffffff
ffffffffffffffffffffff
ffffffffffffffffffffff
fffffffffffffffffffkff
ffffffffffffffffffffff
ffffffffffffffffffffff`, //haha I lied + e22
  map`
rr.rrrr.r....rrrr.rr
r.rrrr.r.rr.r.rr..rp
.r.r..rr.rr..r.r...r
..r.r.r...rrr..rrrr.
rr.rrrr.rr.r..rr.rs.
.rr.s.rr..rrrr.rr.rf
r..r.r.rr.r..rs.r..r
rrr.r.r.r.rrr.rrrrrr
r.rr..rr...r.r.r.rrr
..rr.r..r.r.rrrrr.rr
rrr.rrrrrr.rrr..rrr.
r..rr..rlr.rrr...rrr
rrrr.r.r..r...r..rrr
..r.r.r.r.rr..rfrr.r
g.r..r.v.rr.rr.rr.rr
.rr.rbr.r..r..rr..r.
r..r.r.r..r.r.rr.r.r
...r..r.rr.rr.brr.r.
rrr.rrrr...r..r....r
.rrrr..r..r.kr.r.r.r`, //:P + e23
  map`
f.............
bbb.b...b.bbb.
b...bl.rb.b.pb
bb..bgbkb.vrrb
b...br.vb.v.sb
bbb.b...b.bbbf
..............`, //end + e24
  map`
karaargvraaraaaraaars
avrrravaarrrraraarraa
rarbarrrraraararaarrr
arbarrararaaraarraraa
aaraarrraarraaraarrar
rrabaaablraaarrravrar
aaararvaaarraarararap`, //lied again. pressure mechanic + e25
  map`
v.v...v..r..r.v....
r.v..vfv.r.v...rvv.
..b..vv.rr..rr.vf..
.rbb.b.r..r...r..rs
.rrv.r.rrvbbr..bvrb
..b...r..ra.r.v...r
rgr..v.rvvf..r.r...
bbvvvbbrvvrbb..r.r.
.sv.r...r.r..vv..vr
v.rvrr.rr....r.r...
r..r.b.b..vr..r...r
rrrrvr.r..f.b.b.r..
r..rv..br...brr...b
.rvv.rr....v.v..r.v
bl..v...r..rvrr.rr.
k.r..r.rv.b..b..r.p`, //random + e26
  map`
....vvv
.r.sbvb
.srrbvv
s.s.bbv
..r.bvv
sr.sbvb
ssrrbvb
srs.bvv
r.r.bbv
.s.sbbv
sr.rbbv
rs..bvv
.r..bvb
psr.l.g`, // cover them all -27
  map`
.r..rrrsrr.rr.....r.sr.g..
..rr.r.rr..srr..r..rbrrr.r
r.srr.r.rr.r..r..br.bk.r.r
.r..r..r.rr.r...rb.rb.b.r.
.r.r.r..r...s.r..b..b..r.r
bbbbbbbbbbbbbbb..b..br.rr.
s.....r.......b.rr.rb.rlrr
r.sr...p.sr.s.br.bv.br..r.
s..rsrs.s.rs.rb.rb..br.rr.
.rssrsr.r.rsr.br.r.rb.r.rr
.s.rsrrs.rs..sb..rr.br....
.r.s.rs...rss.b.r..rr..r.r
r....srrsrrr..brrrr.rrr.r.
s..sr.srrss...b..b....r.rr
.s.r..s...sr...r.r.rbrrrsr`, //large map with pressures + e28
  map`
bbbbbbbbbbbbb
b...k.......b
b.k...kkbbb.b
b.bbbbbk....b
..b...fbbb.kb
.kb.bbbbb...b
..b...fkffb.b
vvbbbbbbb.b.b
bg......l.b.b
bbbbbbbbb.b.b
bffr..ff..p.b
bsffr.sfff..b
b.rf.r..bbbbb
brr.frrr.ffsb
brf.fff.rrf.b
brrs..sss.rfb
bfrrrfsss.rrb
brrrrfbbbffff
bfffr.s.rrrrb
bbbbbbbbbbbbb`, //Careful. +++ e29
  map`
bbbbbbvvvvvbbbbbb
v....b...r.b..b..
v....b..bb.....s.
v.bb.b...sbbbbvvb
b.bb.b.bbbvvb.v..
b.bb.b.s..vvb.v..
b.bv.b.bbb..vb...
b.bv........vb.bb
b.bvvbbblb..b....
brb.r..b.br.bb.r.
bpb...sbgb..sb...`, //lil unblock + e30
  map`
r.r...r..r...r.r
r.bbbvvvb.rbr.r.
.r....rrgrrb.rbk
...r.brrr.rb..b.
r.rrrb.r.r.r..b.
.r...b...r.br.rr
p.r.rfr.r..b.r..`, //simple task  + e31
  map`
k....kkkkkkk...kkkkk..k
k.kb.......k.k...kk...k
k..fkkkkkk.k..kk.kk.k.k
kkkkkkkkkk..k..k.k..k.k
.......kkkk..k.k.k.kk.k
.kkkkk...kkk.kfk...kk.k
.k....kk.....kbkkkkk...
...kk...kkkkk........k.
kkkkfbk.......kkkkkkk..
...k..kkkkkkkk........k
.k.kk..........kkkkkkkk
.k...k.kkkk.k.k........
..kk.kk....k..k.kkkkkk.
k.k..k..kk...kk.kk.....
k.k.k..k..k.k....kp...b
k.k.k.k....k...k.kkkkkg
k.k.k.k..k...kk..k...k.
k.k...kk..kkkk..kk.k...
k.k.kkkkk..k...kkk..kkk
k.kk...kkk.k.kk...k...k
k.k..k.kk..k.k..k.kkk.k
k...kk....kk...k......k
k.kkkkkkkkkkkkkkkkkkkkk`, //Gaggker Maze + e32
  map`
glf
srv
kvp`, //small + e33
  map`
vvvvvvbvbb
vbvvbvvvbb
vvvvvvvvlg
vvbbbvbbbl
bvvvvvvvvv
vvbbbbbbvb
rr.rrrrr.r
s.rr.r.r..
rr..rrr.rs
r.rrr.r.rr
r.rr.r....
.r..r..rrr
..r.r..r.r
r.r.rr.r.r
vkkkkskkkv
s.......sk
k..k...kkk
bk.kkkkkbb
k..kkkkkbb
.........k
...kkkk..k
kkkkkk...k
.......r.k
..kkvk...k
krks.....k
p.kkkkkkkb`, //last level + e34
  map`
p.....................................
.rrrrr.r..r..rr..r...r.r..r...........
...r...r..r.r..r.rr..r.r.r............
...r...rrrr.rrrr.r.r.r.rr.............
...r...r..r.r..r.r..rr.r.r............
...r...r..r.r..r.r...r.r..r...........
......................................
...r...r.rrrr.r..r....rrrr.rrrr.rrrr..
....r.r..r..r.r..r....r....r..r.r..r..
.....r...r..r.r..r....r....r..r.r..r..
.....r...r..r.r..r....rrr..r..r.rrr...
.....r...r..r.r..r....r....r..r.r.r...
.....r...rrrr.rrrr....r....rrrr.r..r..
......................................
...rrr..r.....rr..r...r.r.r...r.rrrr..
...r..r.r....r..r..r.r..r.rr..r.r.....
...r..r.r....rrrr...r...r.rrr.r.r.....
...rrr..r....r..r...r...r.r.rrr.r.rrr.
...r....r....r..r...r...r.r..rr.r..gr.
...r....rrrr.r..r...r...r.r...r.rrrrr.
......................................`, //End -35
  map`
bg
pb`, //logo
]

//sets the map (HIGHLY IMPORTANT): setMap(levels[level]); 
setMap(levels[level]);

//INTRO ONLY FOR LEVEL 1.
//ELSE DISABLES INTRO
if(level == 1){
  addText("Objecive:", { x: 1, y: 1, color: color`5` });
  addText("Get the", {x: 13, y: 5, color: color`5` });
  addText("Giggler", {x: 13, y: 7, color: color`5` });
  const objective = tune`
113.20754716981132: C5~113.20754716981132 + F5^113.20754716981132 + G5/113.20754716981132,
113.20754716981132,
113.20754716981132: C5~113.20754716981132,
113.20754716981132: G5^113.20754716981132 + F5/113.20754716981132,
113.20754716981132: D5~113.20754716981132,
113.20754716981132,
113.20754716981132: E5~113.20754716981132 + G5^113.20754716981132 + A5/113.20754716981132,
113.20754716981132: D5~113.20754716981132 + G5^113.20754716981132 + A5-113.20754716981132,
113.20754716981132: G5^113.20754716981132,
2603.7735849056603`;
  playTune(objective);
    setTimeout(() => {
      clearText();
      move = 1
      const controls = tune`
122.44897959183673: G5~122.44897959183673 + F4^122.44897959183673 + F5-122.44897959183673,
122.44897959183673: F4^122.44897959183673,
122.44897959183673: G5~122.44897959183673 + F5-122.44897959183673,
122.44897959183673: D5~122.44897959183673 + A4^122.44897959183673 + F5-122.44897959183673,
122.44897959183673: C5~122.44897959183673 + B4^122.44897959183673,
122.44897959183673: F5-122.44897959183673,
122.44897959183673: B5~122.44897959183673 + F4^122.44897959183673,
122.44897959183673: B5~122.44897959183673 + G4^122.44897959183673 + F5-122.44897959183673,
122.44897959183673: B5~122.44897959183673 + B4^122.44897959183673 + G5-122.44897959183673,
122.44897959183673,
122.44897959183673: D4/122.44897959183673,
122.44897959183673,
122.44897959183673: C4/122.44897959183673,
2326.530612244898`
      playTune(controls);
        addText("WASD TO MOVE.", { y: 5, color: color`5` });
        addText("I TO RESET.", { y: 7, color: color`5` });
        addText("K AS A LAST RESORT.", { y: 9, color: color`5` });
        setTimeout(() => {
          clearText();
        }, 4000)  
    }, 2000)
}else{
  move = 1
}

setPushables({
  [smile]: [broken]
})

onInput("s", () => {
  if (move == 1) {
    getFirst(smile).y += 1
  }
})

onInput("w", () => {
  if (move == 1) {
    getFirst(smile).y -= 1
  }
})

onInput("a", () => {
  if (move == 1) {
    getFirst(smile).x -= 1
  }
})

onInput("d", () => {
  if (move == 1) {
    getFirst(smile).x += 1
  }
})

//resets the level
onInput("i", () => {
  setMap(levels[level]);
  lockHere = 1; //enables the lock
  const stuck = tune`
119.5219123505976: D5~119.5219123505976 + E5^119.5219123505976 + A4-119.5219123505976,
119.5219123505976: C5~119.5219123505976,
119.5219123505976: B4~119.5219123505976 + D5^119.5219123505976 + A4-119.5219123505976,
239.0438247011952,
119.5219123505976: D5~119.5219123505976 + E5^119.5219123505976,
119.5219123505976: B4~119.5219123505976 + D5^119.5219123505976,
2988.04780876494`
  playTune(stuck);
  levelStart = 0; //enables pressure sound mechanic to avoid repeating.
})

onInput("k", () => {
  if(skips < 5){
    skips++
    clearText();
      level = level + 1;
      const currentLevel = levels[level];
      // after the last level
      if (currentLevel !== undefined) {
        setMap(currentLevel);
      }
    lockHere = 1; //enables the lock
    const skip = tune`
113.20754716981132: C5~113.20754716981132 + B4-113.20754716981132,
113.20754716981132: B4/113.20754716981132,
113.20754716981132: C4/113.20754716981132,
3283.0188679245284`
    playTune(skip);
    levelStart = 0; //enables pressure sound mechanic to avoid repeating.
  }
})

afterInput(() => {
  const killerNumber = tilesWith(gaggler).length;
  //Killer num counts the amount of killers (mainly 1)
  const killerCovered = tilesWith(smile, gaggler).length;
  //If player is on killer
  const playerNumber = tilesWith(giggler).length;
  //counts num of player(1)
  const targetCovered = tilesWith(smile, giggler).length;
  //If player is on giggler
  const pressureNumber = tilesWith(pressure).length;
  //counts pressures
  const pressureCovered = tilesWith(broken, pressure).length;
  //how many pressures have boxes on them

  //enables the pressure sound
  if(levelStart == 0){
    curNum = pressureNumber-1
    levelStart = 1
  }
  
  //Player reaching the giggler
  if (targetCovered == playerNumber) {
    clearText(); //pre-existng text is erased
    setMap(levels[level]);
    move = 0;
    //(710-711) stops player movement, resets map / 
    //cheating is now impossible
    addText("You found the", { y: 5, color: color`5` });
    addText("Giggler.", { y: 7, color: color`5` });
    //standard win test and music
    const win = tune`
113.20754716981132: C5~113.20754716981132 + G5^113.20754716981132 + E5-113.20754716981132 + C4-113.20754716981132,
113.20754716981132: B4~113.20754716981132 + A5^113.20754716981132 + D4-113.20754716981132,
113.20754716981132: F4^113.20754716981132 + D5~113.20754716981132 + G5^113.20754716981132,
113.20754716981132: G4^113.20754716981132 + B4~113.20754716981132 + A5^113.20754716981132,
113.20754716981132: A4^113.20754716981132 + C5~113.20754716981132 + G5^113.20754716981132 + E5-113.20754716981132,
113.20754716981132: G4^113.20754716981132 + E4~113.20754716981132,
113.20754716981132: D4~113.20754716981132 + F4^113.20754716981132 + C4/113.20754716981132,
2830.188679245283`
    playTune(win);

    //Moves the level up, allows the player to move,
    //and resets the lock mechanic
    setTimeout(() => {
      clearText();
      level = level + 1;
      const currentLevel = levels[level];
      // after the last level
      if (currentLevel !== undefined) {
        setMap(currentLevel);
        move = 1
        lockHere = 1
        levelStart = 0
      }
    }, 1000);
  }

  //pressure and lock mechanic
    //If there is a pressure - Lock exists
  if ((pressureNumber > 0) && (lockHere == 1)){
    //if all pressures have boxes 
    if (pressureNumber == pressureCovered){
      lockHere = 0; //lock no longer exists
      clearText();
      addText("Unlocked.", { y: 1, color: color`6` });
      XLOCK = getFirst(lock).x; //lock x
      YLOCK = getFirst(lock).y; //lock y
      clearTile(XLOCK, YLOCK);  //deletes lock
      console.log("Unlocked");
      const unlocked = tune`
56.49717514124294: D5/56.49717514124294 + C5^56.49717514124294,
56.49717514124294: E5/56.49717514124294 + G5-56.49717514124294,
1694.9152542372883`; //sound effect
      playTune(unlocked);
    }else{
      let num = pressureNumber - pressureCovered //how many pressures without boxes
      clearText()
      addText("pressure: " + num, { y: 1, color: color`6` });
      // adds the number of pressures left on screen
      if(num == curNum){
        const stillLocked = tune`
90.6344410876133: F5~90.6344410876133,
90.6344410876133: F5^90.6344410876133,
2719.0332326283988`;
        playTune(stillLocked);
        curNum -- 
        //if a pressure is on, sound plays and 1 is renoved from curNum
        //so that sound plays when it is covered
      }else if((curNum + 2) == num){
        curNum++ 
        //allows sound to play again pressure is removed and added again
      }
    }
  }

  //Gaggler mechanic
  //  if Killer exists
  if (killerNumber > 0){
    //if player is on gaggler
    if (killerCovered == (killerNumber - (killerNumber - 1))) {
      addText("Gaggler got you.", { y: 1, x: 0, color: color`3` });
      addText("(retry)", { y: 10, x: 0, color: color`3` });
      const died = tune`
118.11023622047244: G4^118.11023622047244 + B4~118.11023622047244,
118.11023622047244: D5/118.11023622047244 + B5-118.11023622047244,
118.11023622047244: F5/118.11023622047244 + G4^118.11023622047244,
118.11023622047244: D5/118.11023622047244,
118.11023622047244: C5/118.11023622047244 + F4^118.11023622047244 + G5-118.11023622047244,
118.11023622047244: B4/118.11023622047244 + G4~118.11023622047244,
118.11023622047244: D5/118.11023622047244 + F4^118.11023622047244 + F5-118.11023622047244,
118.11023622047244: B4/118.11023622047244 + D4^118.11023622047244,
118.11023622047244: D4~118.11023622047244,
118.11023622047244: G4/118.11023622047244 + D4^118.11023622047244 + B4-118.11023622047244,
118.11023622047244: C4^118.11023622047244,
118.11023622047244: F4/118.11023622047244 + G4-118.11023622047244,
118.11023622047244: C4~118.11023622047244,
118.11023622047244: D4-118.11023622047244,
118.11023622047244: C4~118.11023622047244,
118.11023622047244: C4-118.11023622047244,
118.11023622047244: C4/118.11023622047244,
1771.6535433070867`; //sound effect
      playTune(died);
      console.log("You were tricked.")
      const currentLevel = levels[0]; // sets map to level 0
      if (currentLevel !== undefined) {
        setMap(currentLevel);
        level = 0
      }
    }
  }

  //Fake wall notice on level four
  if ((level == 4) && (four == 0)) {
    clearText(); //clears existing text
    four = 1 //prevents message from replaying
    const notice = tune`
86.20689655172414: E5~86.20689655172414,
86.20689655172414: F5~86.20689655172414,
86.20689655172414: F5~86.20689655172414,
86.20689655172414: F5~86.20689655172414 + E5~86.20689655172414 + D5~86.20689655172414 + C5~86.20689655172414,
86.20689655172414: C5~86.20689655172414,
86.20689655172414: C5~86.20689655172414,
86.20689655172414: B4~86.20689655172414,
86.20689655172414: C5~86.20689655172414 + D5~86.20689655172414,
86.20689655172414: D5~86.20689655172414,
86.20689655172414: D5~86.20689655172414,
1896.5517241379312`;
    playTune(notice);
    addText("NOTICE: SOME WALLS", { y: 1, color: color`6` });
    addText("ARE FAKE.", { y: 3, color: color`6` });
  }

});
