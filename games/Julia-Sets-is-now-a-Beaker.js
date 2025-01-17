/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Julia Sets Attempt
@author: Rafi
@tags: ['simulation']
@addedOn: 2025-01-17

Controls:
W = Move Up
A = Move Left
S = Move Down
D = Move Up
I = Zoom In
K = Zoom Out
J = Increase Resolution
L = Decrease Resolution
*/
let n;

const a="0";
const b="1";
const c="2";
const d="3";
const e="4";
const f="5";
const g="6";

let i=0
let j=0
let xoff=0
let yoff=0
let resolution=32*1.25
let max=resolution
let maxiter=64
let resfac=1.25
let zoom=0.2
let move=0.2

setLegend(
  [a, bitmap `
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
0000000000000000`],
  [b, bitmap `
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
4444444444444444`],
  [c, bitmap `
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
3333333333333333`],
  [d, bitmap `
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
5555555555555555`],
  [e, bitmap `
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
6666666666666666`],
  [f, bitmap `
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],
  [g, bitmap `
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888`],
);

class Comp{
  constructor(r,i){
    this.r=r;
    this.i=i;
  }
  add(other){
    return new Comp(this.r + other.r, this.i + other.i);
  }
  abs(){
    return Math.sqrt(Math.pow(this.r,2) + Math.pow(this.i, 2))
  }
  sqr(){
    return new Comp((this.r * this.r) - (this.i * this.i), (this.r * this.r) + (this.i * this.i));
  }
}

function mand(x,y,j,k){
  let c=new Comp (x,y)
  let n=0
  let z= new Comp(i,j)
  while (z.abs() <=2 && n < (Math.log2(max)*32)){
    z=c.add(z.sqr())
    n += 1
  }
  return [n, z.abs()]
}

function render(i,j){
var screen=``
for (let x = 0; x < resolution; x++) {
  for (let y = 0;y<resolution;y++) {
    n = mand(((y/max)*2) - 1.35 - xoff,((x/max)*2) - 1 - yoff,i,j)
    if (n[1]<2){
        screen += "0"
    } else if (n[0]>64*0.6){
        screen += "2"
    } else if (n[0]>64*0.4){
        screen += "5"
    } else if (n[0]>64*0.3){
        screen += "3"
    } else if (n[0]>64*0.2){
        screen += "6"
    } else if (n[0]>64 *0.1){
        screen += "4"
    } else {
        screen += "5"
    }
  }
  screen += "\n"
}
  setMap(screen);
  clearText()
  addText("Zoom: 2^" + Math.log2(1 / (resolution/max)), { 
    x: 2, 
    y: 0, 
    color: bitmap`0`
})

}
render(i,j)
onInput("w", () => {
    yoff += move * (resolution/max)
    render(i, j)
})
onInput("s", () => {
    yoff -= move * (resolution/max)
    render(i, j)
})
onInput("a", () => {
    xoff += move * (resolution/max)
    render(i, j)
})
onInput("d", () => {
    xoff -= move * (resolution/max)
    render(i, j)
})
onInput("i", () => {
    max *= 2
    yoff -= 1 * (resolution/max)
    xoff -= 1 * (resolution/max)
    render(i, j)
})
onInput("k", () => {
    max *= 0.5
    yoff += 0.5 * (resolution/max)
    xoff += 0.5 * (resolution/max)
    render(i, j)
})
onInput("j", () => {
    resolution *= resfac
    max *= resfac
    render(i, j)
})
onInput("l", () => {
    resolution /= resfac
    max /= resfac

    render(i, j)
})
