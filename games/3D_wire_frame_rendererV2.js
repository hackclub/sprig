/*
@title: 3D Wireframe Renderer (v2)
@author: Patcybermind
@tags: ['simulation']
@addedOn: 2024-06-11
*/
/* HOW TO USE :
  w = forward
  s = backward
  d = left
  a = right
  i = move down
  k = move up
  j = turn left
  l = turn right
*/

// initial translation values
let camX = 0;
let camY = 0; // vertical
let camZ = 50;

// focal length
let focalLength = 50;

// near plane
let nearPlane = 5;

// percentage
let percent = 0;

// cam speed
let camSpeedX = 5;
let camSpeedY = camSpeedX;
let cameraRotationSpeed = Math.PI / 16
// points
let x1 = 0;
let y1 = 0;
let z1 = 0;

let x2 = 0;
let y2 = 0;
let z2 = 0;


// cos and sin variables
let cosX = 1;
let sinX = 1;

let cosY = 1;
let sinY = 1;

// rotation
let rotX = 0;
let rotY = 0;

// define colors
const colours = {
    black: "0",
    light_grey: "1",
    white: "2",
    red: "3",
    light_green: "4",
    dark_blue: "5",
    yellow: "6",
    light_blue: "7",
    pink: "8",
    orange: "9",
    brown: "C",
    dark_green: "D",
    gold: "F",
    purple: "H",
    dark_grey: "L",
};
// paste the stl between the ` `
const stl = `
solid Exported from Blender-4.1.1
facet normal 0.000000 0.000000 1.000000
outer loop
vertex 0.000000 0.000000 5.000000
vertex 0.000000 10.000000 5.000000
vertex -5.000000 10.000000 5.000000
endloop
endfacet
facet normal 0.000000 0.000000 1.000000
outer loop
vertex 0.000000 0.000000 5.000000
vertex -5.000000 10.000000 5.000000
vertex -5.000000 0.000000 5.000000
endloop
endfacet
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex -5.000000 8.820884 -3.820884
vertex -5.000000 0.000000 -3.820884
vertex -17.282654 0.000000 -3.820884
endloop
endfacet
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex -5.000000 8.820884 -3.820884
vertex -17.282654 0.000000 -3.820884
vertex -17.282654 8.820884 -3.820884
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex -5.000000 0.000000 3.820884
vertex -5.000000 0.000000 -3.820884
vertex 0.000000 0.000000 -3.820884
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex -5.000000 0.000000 3.820884
vertex 0.000000 0.000000 -3.820884
vertex 0.000000 0.000000 3.820884
endloop
endfacet
facet normal 0.000000 1.000000 0.000000
outer loop
vertex -5.000000 10.000000 5.000000
vertex 0.000000 10.000000 5.000000
vertex 0.000000 10.000000 -5.000000
endloop
endfacet
facet normal 0.000000 1.000000 0.000000
outer loop
vertex -5.000000 10.000000 5.000000
vertex 0.000000 10.000000 -5.000000
vertex -5.000000 10.000000 -5.000000
endloop
endfacet
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex -5.000000 10.000000 -5.000000
vertex 0.000000 10.000000 -5.000000
vertex 0.000000 6.111125 -5.000000
endloop
endfacet
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex -5.000000 10.000000 -5.000000
vertex 0.000000 6.111125 -5.000000
vertex -3.105865 6.110402 -5.000000
endloop
endfacet
facet normal -1.000000 0.000000 0.000000
outer loop
vertex -5.000000 8.820884 3.820884
vertex -5.000000 0.000000 3.820884
vertex -5.000000 0.000000 5.000000
endloop
endfacet
facet normal -1.000000 0.000000 0.000000
outer loop
vertex -5.000000 8.820884 3.820884
vertex -5.000000 0.000000 5.000000
vertex -5.000000 10.000000 5.000000
endloop
endfacet
facet normal -1.000000 0.000000 0.000000
outer loop
vertex -5.000000 8.820884 -3.820884
vertex -5.000000 8.820884 3.820884
vertex -5.000000 10.000000 5.000000
endloop
endfacet
facet normal -1.000000 0.000000 0.000000
outer loop
vertex -5.000000 8.820884 -3.820884
vertex -5.000000 10.000000 5.000000
vertex -5.000000 10.000000 -5.000000
endloop
endfacet
facet normal -1.000000 0.000000 0.000000
outer loop
vertex -5.000000 0.000000 -3.820884
vertex -5.000000 8.820884 -3.820884
vertex -5.000000 10.000000 -5.000000
endloop
endfacet
facet normal -1.000000 0.000000 0.000000
outer loop
vertex -5.000000 0.000000 -3.820884
vertex -5.000000 10.000000 -5.000000
vertex -5.000000 0.000000 -5.000000
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex -3.106116 0.000000 -5.000000
vertex 0.000000 0.000000 -5.000000
vertex 0.000000 0.000000 -3.820884
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex 0.000000 0.000000 -3.820884
vertex -5.000000 0.000000 -3.820884
vertex -5.000000 0.000000 -5.000000
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex 0.000000 0.000000 -3.820884
vertex -5.000000 0.000000 -5.000000
vertex -3.106116 0.000000 -5.000000
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex -5.000000 0.000000 5.000000
vertex -5.000000 0.000000 3.820884
vertex 0.000000 0.000000 3.820884
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex -5.000000 0.000000 5.000000
vertex 0.000000 0.000000 3.820884
vertex 0.000000 0.000000 5.000000
endloop
endfacet
facet normal 1.000000 0.000001 0.000000
outer loop
vertex -17.282654 8.820884 3.820884
vertex -17.282654 8.820884 -3.820884
vertex -17.282654 9.780199 -4.651965
endloop
endfacet
facet normal 1.000000 -0.000003 0.000000
outer loop
vertex -17.282654 8.820884 3.820884
vertex -17.282654 9.780199 -4.651965
vertex -17.282654 9.780199 4.651965
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex -5.000000 0.000000 -3.820884
vertex -5.000000 0.000000 3.820884
vertex -17.282654 0.000000 3.820884
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex -5.000000 0.000000 -3.820884
vertex -17.282654 0.000000 3.820884
vertex -17.282654 0.000000 -3.820884
endloop
endfacet
facet normal 0.000000 1.000000 0.000000
outer loop
vertex -5.000000 8.820884 3.820884
vertex -5.000000 8.820884 -3.820884
vertex -17.282654 8.820884 -3.820884
endloop
endfacet
facet normal 0.000000 1.000000 0.000000
outer loop
vertex -5.000000 8.820884 3.820884
vertex -17.282654 8.820884 -3.820884
vertex -17.282654 8.820884 3.820884
endloop
endfacet
facet normal 0.000000 0.000000 1.000000
outer loop
vertex -5.000000 0.000000 3.820884
vertex -5.000000 8.820884 3.820884
vertex -17.282654 8.820884 3.820884
endloop
endfacet
facet normal 0.000000 0.000000 1.000000
outer loop
vertex -5.000000 0.000000 3.820884
vertex -17.282654 8.820884 3.820884
vertex -17.282654 0.000000 3.820884
endloop
endfacet
facet normal 1.000000 0.000000 0.000000
outer loop
vertex -17.282654 0.000000 3.820884
vertex -17.282654 8.820884 3.820884
vertex -17.282654 9.780199 4.651965
endloop
endfacet
facet normal 1.000000 0.000000 0.000000
outer loop
vertex -17.282654 0.000000 3.820884
vertex -17.282654 9.780199 4.651965
vertex -17.282654 0.000000 4.651965
endloop
endfacet
facet normal 1.000000 0.000000 0.000000
outer loop
vertex -17.282654 8.820884 -3.820884
vertex -17.282654 0.000000 -3.820884
vertex -17.282654 0.000000 -4.651965
endloop
endfacet
facet normal 1.000000 0.000000 0.000000
outer loop
vertex -17.282654 8.820884 -3.820884
vertex -17.282654 0.000000 -4.651965
vertex -17.282654 9.780199 -4.651965
endloop
endfacet
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex -17.282654 9.780199 -4.651965
vertex -17.282654 0.000000 -4.651965
vertex -26.534021 0.000000 -4.651965
endloop
endfacet
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex -17.282654 9.780199 -4.651965
vertex -26.534021 0.000000 -4.651965
vertex -26.534021 9.780199 -4.651965
endloop
endfacet
facet normal 0.000000 0.000000 1.000000
outer loop
vertex -17.282654 0.000000 4.651965
vertex -17.282654 9.780199 4.651965
vertex -26.534021 9.780199 4.651965
endloop
endfacet
facet normal 0.000000 0.000000 1.000000
outer loop
vertex -17.282654 0.000000 4.651965
vertex -26.534021 9.780199 4.651965
vertex -26.534021 0.000000 4.651965
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex -17.282654 0.000000 3.820884
vertex -17.282654 0.000000 4.651965
vertex -26.534021 0.000000 4.651965
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex -17.282654 0.000000 3.820884
vertex -26.534021 0.000000 4.651965
vertex -26.534021 0.000000 3.820884
endloop
endfacet
facet normal 0.000000 0.000000 1.000000
outer loop
vertex -24.563320 9.780199 2.681264
vertex -19.253353 9.780199 2.681264
vertex -19.253353 20.287514 2.681264
endloop
endfacet
facet normal 0.000000 0.000000 1.000000
outer loop
vertex -24.563320 9.780199 2.681264
vertex -19.253353 20.287514 2.681264
vertex -24.563320 20.287514 2.681264
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex -17.282654 0.000000 -4.651965
vertex -17.282654 0.000000 -3.820884
vertex -26.534021 0.000000 -3.820884
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex -17.282654 0.000000 -4.651965
vertex -26.534021 0.000000 -3.820884
vertex -26.534021 0.000000 -4.651965
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex -17.282654 0.000000 -3.820884
vertex -17.282654 0.000000 3.820884
vertex -26.534021 0.000000 3.820884
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex -17.282654 0.000000 -3.820884
vertex -26.534021 0.000000 3.820884
vertex -26.534021 0.000000 -3.820884
endloop
endfacet
facet normal -1.000000 0.000000 0.000000
outer loop
vertex -26.534021 0.000000 3.820884
vertex -26.534021 0.000000 4.651965
vertex -26.534021 9.780199 4.651965
endloop
endfacet
facet normal -1.000000 0.000000 0.000000
outer loop
vertex -26.534021 9.780199 4.651965
vertex -26.534021 9.780199 -4.651965
vertex -26.534021 0.000000 -4.651965
endloop
endfacet
facet normal -1.000000 -0.000000 0.000000
outer loop
vertex -26.534021 0.000000 -3.820884
vertex -26.534021 0.000000 3.820884
vertex -26.534021 9.780199 4.651965
endloop
endfacet
facet normal -1.000000 0.000000 0.000000
outer loop
vertex -26.534021 0.000000 -3.820884
vertex -26.534021 9.780199 4.651965
vertex -26.534021 0.000000 -4.651965
endloop
endfacet
facet normal 0.000000 1.000000 0.000000
outer loop
vertex -19.253353 9.780199 -2.681264
vertex -19.253353 9.780199 2.681264
vertex -17.282654 9.780199 4.651965
endloop
endfacet
facet normal 0.000000 1.000000 0.000000
outer loop
vertex -19.253353 9.780199 -2.681264
vertex -17.282654 9.780199 4.651965
vertex -17.282654 9.780199 -4.651965
endloop
endfacet
facet normal 0.000000 1.000000 0.000000
outer loop
vertex -24.563320 9.780199 2.681264
vertex -24.563320 9.780199 -2.681264
vertex -26.534021 9.780199 -4.651965
endloop
endfacet
facet normal 0.000000 1.000000 0.000000
outer loop
vertex -24.563320 9.780199 2.681264
vertex -26.534021 9.780199 -4.651965
vertex -26.534021 9.780199 4.651965
endloop
endfacet
facet normal 0.000000 1.000000 0.000000
outer loop
vertex -24.563320 9.780199 -2.681264
vertex -19.253353 9.780199 -2.681264
vertex -17.282654 9.780199 -4.651965
endloop
endfacet
facet normal 0.000000 1.000000 0.000000
outer loop
vertex -24.563320 9.780199 -2.681264
vertex -17.282654 9.780199 -4.651965
vertex -26.534021 9.780199 -4.651965
endloop
endfacet
facet normal 0.000000 1.000000 0.000000
outer loop
vertex -19.253353 9.780199 2.681264
vertex -24.563320 9.780199 2.681264
vertex -26.534021 9.780199 4.651965
endloop
endfacet
facet normal 0.000000 1.000000 0.000000
outer loop
vertex -19.253353 9.780199 2.681264
vertex -26.534021 9.780199 4.651965
vertex -17.282654 9.780199 4.651965
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex -24.563320 20.287514 -2.681264
vertex -24.563320 20.287514 2.681264
vertex -26.442060 20.287514 4.578601
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex -24.563320 20.287514 -2.681264
vertex -26.442060 20.287514 4.578601
vertex -26.442060 20.287514 -4.578601
endloop
endfacet
facet normal -1.000000 0.000000 0.000000
outer loop
vertex -24.563320 9.780199 -2.681264
vertex -24.563320 9.780199 2.681264
vertex -24.563320 20.287514 2.681264
endloop
endfacet
facet normal -1.000000 0.000000 0.000000
outer loop
vertex -24.563320 9.780199 -2.681264
vertex -24.563320 20.287514 2.681264
vertex -24.563320 20.287514 -2.681264
endloop
endfacet
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex -19.253353 9.780199 -2.681264
vertex -24.563320 9.780199 -2.681264
vertex -24.563320 20.287514 -2.681264
endloop
endfacet
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex -19.253353 9.780199 -2.681264
vertex -24.563320 20.287514 -2.681264
vertex -19.253353 20.287514 -2.681264
endloop
endfacet
facet normal 1.000000 0.000000 0.000000
outer loop
vertex -19.253353 9.780199 2.681264
vertex -19.253353 9.780199 -2.681264
vertex -19.253353 20.287514 -2.681264
endloop
endfacet
facet normal 1.000000 0.000000 0.000000
outer loop
vertex -19.253353 9.780199 2.681264
vertex -19.253353 20.287514 -2.681264
vertex -19.253353 20.287514 2.681264
endloop
endfacet
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex -17.374613 20.287514 -4.578601
vertex -26.442060 20.287514 -4.578601
vertex -26.442060 28.317680 -4.578601
endloop
endfacet
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex -17.374613 20.287514 -4.578601
vertex -26.442060 28.317680 -4.578601
vertex -17.374613 28.317680 -4.578601
endloop
endfacet
facet normal 0.000000 -1.000000 -0.000001
outer loop
vertex -19.253353 20.287514 -2.681264
vertex -24.563320 20.287514 -2.681264
vertex -26.442060 20.287514 -4.578601
endloop
endfacet
facet normal 0.000000 -1.000000 0.000002
outer loop
vertex -19.253353 20.287514 -2.681264
vertex -26.442060 20.287514 -4.578601
vertex -17.374613 20.287514 -4.578601
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex -19.253353 20.287514 2.681264
vertex -19.253353 20.287514 -2.681264
vertex -17.374613 20.287514 -4.578601
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex -19.253353 20.287514 2.681264
vertex -17.374613 20.287514 -4.578601
vertex -17.374613 20.287514 4.578601
endloop
endfacet
facet normal 0.000000 -1.000000 0.000001
outer loop
vertex -24.563320 20.287514 2.681264
vertex -19.253353 20.287514 2.681264
vertex -17.374613 20.287514 4.578601
endloop
endfacet
facet normal 0.000000 -1.000000 -0.000002
outer loop
vertex -24.563320 20.287514 2.681264
vertex -17.374613 20.287514 4.578601
vertex -26.442060 20.287514 4.578601
endloop
endfacet
facet normal 1.000000 0.000000 0.000000
outer loop
vertex -17.374613 20.287514 4.578601
vertex -17.374613 20.287514 -4.578601
vertex -17.374613 28.317680 -4.578601
endloop
endfacet
facet normal 1.000000 0.000000 0.000000
outer loop
vertex -17.374613 20.287514 4.578601
vertex -17.374613 28.317680 -4.578601
vertex -17.374613 28.317680 4.578601
endloop
endfacet
facet normal 0.000000 0.000000 1.000000
outer loop
vertex -26.442060 20.287514 4.578601
vertex -17.374613 20.287514 4.578601
vertex -17.374613 28.317680 4.578601
endloop
endfacet
facet normal 0.000000 0.000000 1.000000
outer loop
vertex -26.442060 20.287514 4.578601
vertex -17.374613 28.317680 4.578601
vertex -26.442060 28.317680 4.578601
endloop
endfacet
facet normal -1.000000 0.000000 0.000000
outer loop
vertex -26.442060 20.287514 -4.578601
vertex -26.442060 20.287514 4.578601
vertex -26.442060 28.317680 4.578601
endloop
endfacet
facet normal -1.000000 0.000000 0.000000
outer loop
vertex -26.442060 20.287514 -4.578601
vertex -26.442060 28.317680 4.578601
vertex -26.442060 28.317680 -4.578601
endloop
endfacet
facet normal 0.000000 0.499006 0.866598
outer loop
vertex -26.442060 28.317680 4.578601
vertex -17.374613 28.317680 4.578601
vertex -21.908339 36.269096 0.000000
endloop
endfacet
facet normal -0.868711 0.495320 0.000000
outer loop
vertex -26.442060 28.317680 -4.578601
vertex -26.442060 28.317680 4.578601
vertex -21.908339 36.269096 0.000000
endloop
endfacet
facet normal 0.000000 0.499006 -0.866598
outer loop
vertex -17.374613 28.317680 -4.578601
vertex -26.442060 28.317680 -4.578601
vertex -21.908339 36.269096 0.000000
endloop
endfacet
facet normal 0.868711 0.495320 0.000000
outer loop
vertex -17.374613 28.317680 4.578601
vertex -17.374613 28.317680 -4.578601
vertex -21.908339 36.269096 0.000000
endloop
endfacet
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex -5.000000 0.000000 -5.000000
vertex -5.000000 10.000000 -5.000000
vertex -3.105865 6.110402 -5.000000
endloop
endfacet
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex -5.000000 0.000000 -5.000000
vertex -3.105865 6.110402 -5.000000
vertex -3.106116 0.000000 -5.000000
endloop
endfacet
facet normal -0.000000 0.000000 -1.000000
outer loop
vertex -3.106116 0.000000 -5.000000
vertex -3.105865 6.110402 -5.000000
vertex 0.000000 6.111125 -5.000000
endloop
endfacet
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex -3.106116 0.000000 -5.000000
vertex 0.000000 6.111125 -5.000000
vertex 0.000000 0.000000 -5.000000
endloop
endfacet
facet normal 0.000000 0.000000 1.000000
outer loop
vertex 0.000000 0.000000 5.000000
vertex 5.000000 0.000000 5.000000
vertex 5.000000 10.000000 5.000000
endloop
endfacet
facet normal 0.000000 0.000000 1.000000
outer loop
vertex 0.000000 0.000000 5.000000
vertex 5.000000 10.000000 5.000000
vertex 0.000000 10.000000 5.000000
endloop
endfacet
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex 5.000000 8.820884 -3.820884
vertex 17.282654 8.820884 -3.820884
vertex 17.282654 0.000000 -3.820884
endloop
endfacet
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex 5.000000 8.820884 -3.820884
vertex 17.282654 0.000000 -3.820884
vertex 5.000000 0.000000 -3.820884
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex 5.000000 0.000000 3.820884
vertex 0.000000 0.000000 3.820884
vertex 0.000000 0.000000 -3.820884
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex 5.000000 0.000000 3.820884
vertex 0.000000 0.000000 -3.820884
vertex 5.000000 0.000000 -3.820884
endloop
endfacet
facet normal 0.000000 1.000000 0.000000
outer loop
vertex 5.000000 10.000000 5.000000
vertex 5.000000 10.000000 -5.000000
vertex 0.000000 10.000000 -5.000000
endloop
endfacet
facet normal 0.000000 1.000000 0.000000
outer loop
vertex 5.000000 10.000000 5.000000
vertex 0.000000 10.000000 -5.000000
vertex 0.000000 10.000000 5.000000
endloop
endfacet
facet normal -0.000000 0.000000 -1.000000
outer loop
vertex 5.000000 10.000000 -5.000000
vertex 3.105865 6.110402 -5.000000
vertex 0.000000 6.111125 -5.000000
endloop
endfacet
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex 5.000000 10.000000 -5.000000
vertex 0.000000 6.111125 -5.000000
vertex 0.000000 10.000000 -5.000000
endloop
endfacet
facet normal 1.000000 0.000000 0.000000
outer loop
vertex 5.000000 8.820884 3.820884
vertex 5.000000 10.000000 5.000000
vertex 5.000000 0.000000 5.000000
endloop
endfacet
facet normal 1.000000 0.000000 0.000000
outer loop
vertex 5.000000 8.820884 3.820884
vertex 5.000000 0.000000 5.000000
vertex 5.000000 0.000000 3.820884
endloop
endfacet
facet normal 1.000000 0.000000 0.000000
outer loop
vertex 5.000000 8.820884 -3.820884
vertex 5.000000 10.000000 -5.000000
vertex 5.000000 10.000000 5.000000
endloop
endfacet
facet normal 1.000000 0.000000 0.000000
outer loop
vertex 5.000000 8.820884 -3.820884
vertex 5.000000 10.000000 5.000000
vertex 5.000000 8.820884 3.820884
endloop
endfacet
facet normal 1.000000 0.000000 0.000000
outer loop
vertex 5.000000 0.000000 -3.820884
vertex 5.000000 0.000000 -5.000000
vertex 5.000000 10.000000 -5.000000
endloop
endfacet
facet normal 1.000000 0.000000 0.000000
outer loop
vertex 5.000000 0.000000 -3.820884
vertex 5.000000 10.000000 -5.000000
vertex 5.000000 8.820884 -3.820884
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex 0.000000 0.000000 -3.820884
vertex 0.000000 0.000000 -5.000000
vertex 3.106116 0.000000 -5.000000
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex 3.106116 0.000000 -5.000000
vertex 5.000000 0.000000 -5.000000
vertex 5.000000 0.000000 -3.820884
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex 3.106116 0.000000 -5.000000
vertex 5.000000 0.000000 -3.820884
vertex 0.000000 0.000000 -3.820884
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex 5.000000 0.000000 5.000000
vertex 0.000000 0.000000 5.000000
vertex 0.000000 0.000000 3.820884
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex 5.000000 0.000000 5.000000
vertex 0.000000 0.000000 3.820884
vertex 5.000000 0.000000 3.820884
endloop
endfacet
facet normal -1.000000 -0.000003 0.000000
outer loop
vertex 17.282654 8.820884 3.820884
vertex 17.282654 9.780199 4.651965
vertex 17.282654 9.780199 -4.651965
endloop
endfacet
facet normal -1.000000 0.000001 0.000000
outer loop
vertex 17.282654 8.820884 3.820884
vertex 17.282654 9.780199 -4.651965
vertex 17.282654 8.820884 -3.820884
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex 5.000000 0.000000 -3.820884
vertex 17.282654 0.000000 -3.820884
vertex 17.282654 0.000000 3.820884
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex 5.000000 0.000000 -3.820884
vertex 17.282654 0.000000 3.820884
vertex 5.000000 0.000000 3.820884
endloop
endfacet
facet normal 0.000000 1.000000 0.000000
outer loop
vertex 5.000000 8.820884 3.820884
vertex 17.282654 8.820884 3.820884
vertex 17.282654 8.820884 -3.820884
endloop
endfacet
facet normal 0.000000 1.000000 0.000000
outer loop
vertex 5.000000 8.820884 3.820884
vertex 17.282654 8.820884 -3.820884
vertex 5.000000 8.820884 -3.820884
endloop
endfacet
facet normal 0.000000 0.000000 1.000000
outer loop
vertex 5.000000 0.000000 3.820884
vertex 17.282654 0.000000 3.820884
vertex 17.282654 8.820884 3.820884
endloop
endfacet
facet normal 0.000000 0.000000 1.000000
outer loop
vertex 5.000000 0.000000 3.820884
vertex 17.282654 8.820884 3.820884
vertex 5.000000 8.820884 3.820884
endloop
endfacet
facet normal -1.000000 0.000000 0.000000
outer loop
vertex 17.282654 0.000000 3.820884
vertex 17.282654 0.000000 4.651965
vertex 17.282654 9.780199 4.651965
endloop
endfacet
facet normal -1.000000 0.000000 0.000000
outer loop
vertex 17.282654 0.000000 3.820884
vertex 17.282654 9.780199 4.651965
vertex 17.282654 8.820884 3.820884
endloop
endfacet
facet normal -1.000000 0.000000 0.000000
outer loop
vertex 17.282654 8.820884 -3.820884
vertex 17.282654 9.780199 -4.651965
vertex 17.282654 0.000000 -4.651965
endloop
endfacet
facet normal -1.000000 0.000000 0.000000
outer loop
vertex 17.282654 8.820884 -3.820884
vertex 17.282654 0.000000 -4.651965
vertex 17.282654 0.000000 -3.820884
endloop
endfacet
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex 17.282654 9.780199 -4.651965
vertex 26.534021 9.780199 -4.651965
vertex 26.534021 0.000000 -4.651965
endloop
endfacet
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex 17.282654 9.780199 -4.651965
vertex 26.534021 0.000000 -4.651965
vertex 17.282654 0.000000 -4.651965
endloop
endfacet
facet normal 0.000000 0.000000 1.000000
outer loop
vertex 17.282654 0.000000 4.651965
vertex 26.534021 0.000000 4.651965
vertex 26.534021 9.780199 4.651965
endloop
endfacet
facet normal 0.000000 0.000000 1.000000
outer loop
vertex 17.282654 0.000000 4.651965
vertex 26.534021 9.780199 4.651965
vertex 17.282654 9.780199 4.651965
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex 17.282654 0.000000 3.820884
vertex 26.534021 0.000000 3.820884
vertex 26.534021 0.000000 4.651965
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex 17.282654 0.000000 3.820884
vertex 26.534021 0.000000 4.651965
vertex 17.282654 0.000000 4.651965
endloop
endfacet
facet normal 0.000000 0.000000 1.000000
outer loop
vertex 24.563320 9.780199 2.681264
vertex 24.563320 20.287514 2.681264
vertex 19.253353 20.287514 2.681264
endloop
endfacet
facet normal 0.000000 0.000000 1.000000
outer loop
vertex 24.563320 9.780199 2.681264
vertex 19.253353 20.287514 2.681264
vertex 19.253353 9.780199 2.681264
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex 17.282654 0.000000 -4.651965
vertex 26.534021 0.000000 -4.651965
vertex 26.534021 0.000000 -3.820884
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex 17.282654 0.000000 -4.651965
vertex 26.534021 0.000000 -3.820884
vertex 17.282654 0.000000 -3.820884
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex 17.282654 0.000000 -3.820884
vertex 26.534021 0.000000 -3.820884
vertex 26.534021 0.000000 3.820884
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex 17.282654 0.000000 -3.820884
vertex 26.534021 0.000000 3.820884
vertex 17.282654 0.000000 3.820884
endloop
endfacet
facet normal 1.000000 0.000000 0.000000
outer loop
vertex 26.534021 0.000000 -3.820884
vertex 26.534021 0.000000 -4.651965
vertex 26.534021 9.780199 -4.651965
endloop
endfacet
facet normal 1.000000 0.000000 0.000000
outer loop
vertex 26.534021 9.780199 -4.651965
vertex 26.534021 9.780199 4.651965
vertex 26.534021 0.000000 4.651965
endloop
endfacet
facet normal 1.000000 -0.000000 0.000000
outer loop
vertex 26.534021 0.000000 3.820884
vertex 26.534021 0.000000 -3.820884
vertex 26.534021 9.780199 -4.651965
endloop
endfacet
facet normal 1.000000 0.000001 0.000000
outer loop
vertex 26.534021 9.780199 -4.651965
vertex 26.534021 0.000000 4.651965
vertex 26.534021 0.000000 3.820884
endloop
endfacet
facet normal 0.000000 1.000000 0.000000
outer loop
vertex 19.253353 9.780199 -2.681264
vertex 17.282654 9.780199 -4.651965
vertex 17.282654 9.780199 4.651965
endloop
endfacet
facet normal 0.000000 1.000000 0.000000
outer loop
vertex 19.253353 9.780199 -2.681264
vertex 17.282654 9.780199 4.651965
vertex 19.253353 9.780199 2.681264
endloop
endfacet
facet normal 0.000000 1.000000 0.000000
outer loop
vertex 24.563320 9.780199 2.681264
vertex 26.534021 9.780199 4.651965
vertex 26.534021 9.780199 -4.651965
endloop
endfacet
facet normal 0.000000 1.000000 0.000000
outer loop
vertex 24.563320 9.780199 2.681264
vertex 26.534021 9.780199 -4.651965
vertex 24.563320 9.780199 -2.681264
endloop
endfacet
facet normal 0.000000 1.000000 0.000000
outer loop
vertex 24.563320 9.780199 -2.681264
vertex 26.534021 9.780199 -4.651965
vertex 17.282654 9.780199 -4.651965
endloop
endfacet
facet normal 0.000000 1.000000 0.000000
outer loop
vertex 24.563320 9.780199 -2.681264
vertex 17.282654 9.780199 -4.651965
vertex 19.253353 9.780199 -2.681264
endloop
endfacet
facet normal 0.000000 1.000000 0.000000
outer loop
vertex 19.253353 9.780199 2.681264
vertex 17.282654 9.780199 4.651965
vertex 26.534021 9.780199 4.651965
endloop
endfacet
facet normal 0.000000 1.000000 0.000000
outer loop
vertex 19.253353 9.780199 2.681264
vertex 26.534021 9.780199 4.651965
vertex 24.563320 9.780199 2.681264
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex 24.563320 20.287514 -2.681264
vertex 26.442060 20.287514 -4.578601
vertex 26.442060 20.287514 4.578601
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex 24.563320 20.287514 -2.681264
vertex 26.442060 20.287514 4.578601
vertex 24.563320 20.287514 2.681264
endloop
endfacet
facet normal 1.000000 0.000000 0.000000
outer loop
vertex 24.563320 9.780199 -2.681264
vertex 24.563320 20.287514 -2.681264
vertex 24.563320 20.287514 2.681264
endloop
endfacet
facet normal 1.000000 0.000000 0.000000
outer loop
vertex 24.563320 9.780199 -2.681264
vertex 24.563320 20.287514 2.681264
vertex 24.563320 9.780199 2.681264
endloop
endfacet
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex 19.253353 9.780199 -2.681264
vertex 19.253353 20.287514 -2.681264
vertex 24.563320 20.287514 -2.681264
endloop
endfacet
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex 19.253353 9.780199 -2.681264
vertex 24.563320 20.287514 -2.681264
vertex 24.563320 9.780199 -2.681264
endloop
endfacet
facet normal -1.000000 0.000000 0.000000
outer loop
vertex 19.253353 9.780199 2.681264
vertex 19.253353 20.287514 2.681264
vertex 19.253353 20.287514 -2.681264
endloop
endfacet
facet normal -1.000000 0.000000 0.000000
outer loop
vertex 19.253353 9.780199 2.681264
vertex 19.253353 20.287514 -2.681264
vertex 19.253353 9.780199 -2.681264
endloop
endfacet
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex 17.374613 20.287514 -4.578601
vertex 17.374613 28.317680 -4.578601
vertex 26.442060 28.317680 -4.578601
endloop
endfacet
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex 17.374613 20.287514 -4.578601
vertex 26.442060 28.317680 -4.578601
vertex 26.442060 20.287514 -4.578601
endloop
endfacet
facet normal 0.000000 -1.000000 0.000002
outer loop
vertex 19.253353 20.287514 -2.681264
vertex 17.374613 20.287514 -4.578601
vertex 26.442060 20.287514 -4.578601
endloop
endfacet
facet normal 0.000000 -1.000000 -0.000001
outer loop
vertex 19.253353 20.287514 -2.681264
vertex 26.442060 20.287514 -4.578601
vertex 24.563320 20.287514 -2.681264
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex 19.253353 20.287514 2.681264
vertex 17.374613 20.287514 4.578601
vertex 17.374613 20.287514 -4.578601
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex 19.253353 20.287514 2.681264
vertex 17.374613 20.287514 -4.578601
vertex 19.253353 20.287514 -2.681264
endloop
endfacet
facet normal 0.000000 -1.000000 -0.000002
outer loop
vertex 24.563320 20.287514 2.681264
vertex 26.442060 20.287514 4.578601
vertex 17.374613 20.287514 4.578601
endloop
endfacet
facet normal 0.000000 -1.000000 0.000001
outer loop
vertex 24.563320 20.287514 2.681264
vertex 17.374613 20.287514 4.578601
vertex 19.253353 20.287514 2.681264
endloop
endfacet
facet normal -1.000000 0.000000 0.000000
outer loop
vertex 17.374613 20.287514 4.578601
vertex 17.374613 28.317680 4.578601
vertex 17.374613 28.317680 -4.578601
endloop
endfacet
facet normal -1.000000 0.000000 0.000000
outer loop
vertex 17.374613 20.287514 4.578601
vertex 17.374613 28.317680 -4.578601
vertex 17.374613 20.287514 -4.578601
endloop
endfacet
facet normal 0.000000 0.000000 1.000000
outer loop
vertex 26.442060 20.287514 4.578601
vertex 26.442060 28.317680 4.578601
vertex 17.374613 28.317680 4.578601
endloop
endfacet
facet normal 0.000000 0.000000 1.000000
outer loop
vertex 26.442060 20.287514 4.578601
vertex 17.374613 28.317680 4.578601
vertex 17.374613 20.287514 4.578601
endloop
endfacet
facet normal 1.000000 0.000000 0.000000
outer loop
vertex 26.442060 20.287514 -4.578601
vertex 26.442060 28.317680 -4.578601
vertex 26.442060 28.317680 4.578601
endloop
endfacet
facet normal 1.000000 0.000000 0.000000
outer loop
vertex 26.442060 20.287514 -4.578601
vertex 26.442060 28.317680 4.578601
vertex 26.442060 20.287514 4.578601
endloop
endfacet
facet normal 0.000000 0.499006 0.866598
outer loop
vertex 26.442060 28.317680 4.578601
vertex 21.908339 36.269096 0.000000
vertex 17.374613 28.317680 4.578601
endloop
endfacet
facet normal 0.868711 0.495320 0.000000
outer loop
vertex 26.442060 28.317680 -4.578601
vertex 21.908339 36.269096 0.000000
vertex 26.442060 28.317680 4.578601
endloop
endfacet
facet normal 0.000000 0.499006 -0.866598
outer loop
vertex 17.374613 28.317680 -4.578601
vertex 21.908339 36.269096 0.000000
vertex 26.442060 28.317680 -4.578601
endloop
endfacet
facet normal -0.868711 0.495320 0.000000
outer loop
vertex 17.374613 28.317680 4.578601
vertex 21.908339 36.269096 0.000000
vertex 17.374613 28.317680 -4.578601
endloop
endfacet
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex 5.000000 0.000000 -5.000000
vertex 3.106116 0.000000 -5.000000
vertex 3.105865 6.110402 -5.000000
endloop
endfacet
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex 5.000000 0.000000 -5.000000
vertex 3.105865 6.110402 -5.000000
vertex 5.000000 10.000000 -5.000000
endloop
endfacet
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex 3.106116 0.000000 -5.000000
vertex 0.000000 0.000000 -5.000000
vertex 0.000000 6.111125 -5.000000
endloop
endfacet
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex 3.106116 0.000000 -5.000000
vertex 0.000000 6.111125 -5.000000
vertex 3.105865 6.110402 -5.000000
endloop
endfacet
endsolid Exported from Blender-4.1.1

`;

const scaling = 5;

function renderStl(stl){
    let lines = stl.split("\n");
    // only keep the ones that start with "vertex"
    let vertices = lines.filter(line => line.startsWith("vertex"));
    //console.log(vertices);
    for (let i = 0; i < vertices.length; i+=3){
        let vertex = vertices[i].split(" ");
        let x = parseFloat(vertex[1]) * scaling;
        let y = parseFloat(vertex[2]) * scaling;
        let z = parseFloat(vertex[3]) * scaling;
        //console.log(x, y, z);
        let vertex2 = vertices[i+1].split(" ");
        let x2 = parseFloat(vertex2[1]) * scaling;
        let y2 = parseFloat(vertex2[2]) * scaling;
        let z2 = parseFloat(vertex2[3]) * scaling;
        //console.log(x2, y2, z2);
        let vertex3 = vertices[i+2].split(" ");
        let x3 = parseFloat(vertex3[1]) * scaling;
        let y3 = parseFloat(vertex3[2]) * scaling;
        let z3 = parseFloat(vertex3[3]) * scaling;
        //console.log(x3, y3, z3);
        drawWireFrame(x, y, z, x2, y2, z2);
        drawWireFrame(x2, y2, z2, x3, y3, z3);
        drawWireFrame(x3, y3, z3, x, y, z);

    }
}
// RENDER
function render() {
    calculateTriggerValues();
    renderStl(stl);
    // code goes here

    /*
      Notes
      the top is +y
      bottom is -y
      left is -x
      right is +x
      further is +z
      closer is -z
    */

    // Cube

    // front
    // front top
    drawWireFrame(-10, 10, 0, 10, 10, 0);
    // front bottom
    drawWireFrame(-10, -10, 0, 10, -10, 0);
    // front right
    drawWireFrame(10, -10, 0, 10, 10, 0);
    // front left
    drawWireFrame(-10, -10, 0, -10, 10, 0);

    // back, same as front but with z = 20
    // back top
    drawWireFrame(-10, 10, 20, 10, 10, 20);
    // back bottom
    drawWireFrame(-10, -10, 20, 10, -10, 20);
    // back right
    drawWireFrame(10, -10, 20, 10, 10, 20);
    // back left
    drawWireFrame(-10, -10, 20, -10, 10, 20);

    // links
    // top right
    drawWireFrame(10, 10, 0, 10, 10, 20);
    // top left
    drawWireFrame(-10, 10, 0, -10, 10, 20);
    // bottom right
    drawWireFrame(-10, -10, 0, -10, -10, 20);
    // bottom left
    drawWireFrame(10, -10, 0, 10, -10, 20);


    // Pyramid

    // front
    drawWireFrame(-60, -10, 0, -40, -10, 0, colours.red);
    // back
    drawWireFrame(-60, -10, 20, -40, -10, 20, colours.red);
    // right union
    drawWireFrame(-40, -10, 0, -40, -10, 20, colours.red);
    // left union
    drawWireFrame(-60, -10, 0, -60, -10, 20, colours.red);

    // center unions

    // front right
    drawWireFrame(-50, 10, 10, -40, -10, 0, colours.red);
    // front left
    drawWireFrame(-50, 10, 10, -60, -10, 0, colours.red);

    // back right
    drawWireFrame(-50, 10, 10, -40, -10, 20, colours.red);
    // back left
    drawWireFrame(-50, 10, 10, -60, -10, 20, colours.red);

    // tests with colours

}

// set up everything

let sprites = []
// not sure of compatability, but this works
const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!£$%^&*()_+-=[]{}#~'@;:/?>,<|`¬"
let idState = 0

const background = getNextId()

initializeSprites();

let tileMap = ""
for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 10; x++) {
        tileMap += sprites[x][y].id
    }
    tileMap += `
`
}

flushScreen();
setMap(tileMap);
setBackground(background);

// you run the main function on startup because or else you won't see anything at first
main();
// functions

// draw functions
function setPixel(x, y, colour = "5")
{
    if ((0 <= x) && (x < 160) && (0 <= y) && (y < 128)) {
        if (("0L123C756F4D8H9".indexOf(colour) === -1)) {
            colour = "5"
        }
        const tileX = Math.floor(x / 16)
        const tileY = Math.floor(y / 16)
        const subTileX = x % 16
        const subTileY = y % 16
        const strIndex = (subTileY * 17) + subTileX;
        let before = sprites[tileX][tileY].tile
        sprites[tileX][tileY].tile = strReplaceAt(sprites[tileX][tileY].tile, strIndex, colour);
        if (before.length !== sprites[tileX][tileY].tile.length) {
            console.log(before)
            console.log(sprites[tileX][tileY].tile)
            debugger;
        }
    }
}
function drawLine(x1, y1, x2, y2, colour = "5")
{
    var dlt, mul, yl = false, i,
        sl = y2 - y1,
        ll = x2 - x1,
        lls = ll >> 31,
        sls = sl >> 31;

    if ((sl ^ sls) - sls > (ll ^ lls) - lls) {
        sl ^= ll;
        ll ^= sl;
        sl ^= ll;
        yl = true;
    }

    dlt = ll < 0 ? -1 : 1;
    mul = (ll === 0) ? sl : sl / ll;

    if (yl) {
        x1 += 0.5;  // preset for rounding
        for (i = 0; i !== ll; i += dlt) setPixel((x1 + i * mul) | 0, y1 + i, colour);
    } else {
        y1 += 0.5;
        for (i = 0; i !== ll; i += dlt) setPixel(x1 + i, (y1 + i * mul) | 0, colour);
    }
    setPixel(x2, y2, colour);   // sets last pixel

    // function setPixel(x, y) {
    //     if (((x < 160) && (y < 128)) && ((x > 0) && (y > 0))) {
    //         addSprite(x, y, blue_pixel)
    //     }
    // }
}
function drawWireFrame(fx1, fy1, fz1, fx2, fy2, fz2, colour = "5")
{ // f stands for function

    // set initial points
    setPoint1((fx1 - camX), -(fy1 - camY), -(fz1 - camZ));
    setPoint2((fx2 - camX), -(fy2 - camY), -(fz2 - camZ));

    // rotation

    setPoint1((z1 * sinY) + (x1 * cosY), y1, (z1 * cosY) - (x1 * sinY));
    setPoint2((z2 * sinY) + (x2 * cosY), y2, (z2 * cosY) - (x2 * sinY));

    setPoint1(x1, (y1 * cosX) - (z1 * sinX), (y1 * sinX) + (z1 * cosX));
    setPoint2(x2, (y2 * cosX) - (z2 * sinX), (y2 * sinX) + (z2 * cosX));

    // rendering something the camera won't see is pointless

    if (!((z1 < nearPlane) && (z2 < nearPlane))) {

        zClipping();

        setScreenPoint1(focalLength * (x1 / z1), focalLength * (y1 / z1));
        setScreenPoint2(focalLength * (x2 / z2), focalLength * (y2 / z2));

        drawLine(80 + Math.round(x1), 64 + Math.round(y1), 80 + Math.round(x2), 64 + Math.round(y2), colour);

    }
}

// zClipping, xy clipping is taken care of while lines are drawn
function zClipping()
{
    if ((z1 < nearPlane) || (z2 < nearPlane)) {

        percent = (nearPlane - z1) / (z2 - z1);

        if (z1 < nearPlane) {

            setPoint1(x1 + (x2 - x1) * percent, y1 + (y2 - y1) * percent, nearPlane);

        } else if (z2 < nearPlane) {
            setPoint2(x1 + (x2 - x1) * percent, y1 + (y2 - y1) * percent, nearPlane);
        }
    }
}

// calculate cos and sin values
function calculateTriggerValues()
{
    // calculates cos and sin values so that the computer only calculates them once per frame
    cosX = Math.cos(rotX);
    sinX = Math.sin(rotX);

    cosY = Math.cos(rotY);
    sinY = Math.sin(rotY);
}
function initializeSprites()
{
    for (let x = 0; x < 10; x++) {
        sprites.push([])
        for (let y = 0; y < 8; y++) {
            sprites[x].push({
                id: getNextId(), tile: `0000000000000000
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
`
            })
        }
    }
}
function getTilemap()
{
    const output = [];
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 8; y++) {
            output.push([sprites[x][y].id, sprites[x][y].tile])
        }
    }
    return output
}
function flushScreen()
{
    let tilemap = getTilemap()
    setLegend(
        ...tilemap,
        [background, bitmap`0000000000000000
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
`]
    )
}
function getNextId()
{
    let id = alphabet[idState]
    idState++;
    return id
}
function clear()
{
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 8; y++) {
            sprites[x][y].tile = `0000000000000000
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
`
        }
    }
}
// set screen points
function setScreenPoint1(x, y)
{
    x1 = Math.round(x);
    y1 = Math.round(y);
}
function setScreenPoint2(x, y)
{
    x2 = Math.round(x);
    y2 = Math.round(y);
}
// set points
function setPoint1(x, y, z)
{
    x1 = Math.round(x);
    y1 = Math.round(y);
    z1 = Math.round(z);
}

function setPoint2(x, y, z)
{
    x2 = Math.round(x);
    y2 = Math.round(y);
    z2 = Math.round(z);
}

function strReplaceAt(str, index, replacement)
{
    return str.substring(0, index) + replacement + str.substring(index + 1);
}



// main function
function main() {
    clear();
    render();
    flushScreen()
}

// listeners

// turn right
onInput("l", () => {
    rotY += -cameraRotationSpeed;
    console.log("rotY: ", rotY);
    main();
})
// turn left
onInput("j", () => {
    rotY += cameraRotationSpeed;
    console.log("rotY: ", rotY);
    main();
})
// i
onInput("i", () => {
    camY += camSpeedY;
    console.log("camY: ", camY);
    main();
})
// k
onInput("k", () => {
    camY += -camSpeedY;
    console.log("camY: ", camY);
    main();
})
// a
onInput("a", () => {
    camZ += (camSpeedX * sinY);
    camX += -(camSpeedX * cosY);
    console.log("camZ: ", camZ);
    console.log("camX: ", camX);
    main();
})
// d
onInput("d", () => {
    camZ += -(camSpeedX * sinY);
    camX += (camSpeedX * cosY);
    console.log("camZ: ", camZ);
    console.log("camX: ", camX);
    main();
})
// s backwards
onInput("s", () => {
    camZ += (camSpeedX * cosY);
    camX += (camSpeedX * sinY);
    console.log("camZ: ", camZ);
    console.log("camX: ", camX);
    main();
})
// w forward
onInput("w", () => {
    camZ += -(camSpeedX * cosY);
    camX += -(camSpeedX * sinY);
    console.log("camZ: ", camZ);
    console.log("camX: ", camX);
    main();
})
