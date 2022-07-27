const { engine } = require("../wasmEngine.js");

// const printGrid = () => {
//   let out = '';
//   const gridFlat = engine.getGrid();
//   for (let y = 0; y < engine.height(); y++) {
//     for (let x = 0; x < engine.width(); x++)
//       out += ((gridFlat.shift() ?? []).shift() ?? { type: '.' }).type;
//     out += '\n';
//   }
//   console.log(out);
// }

// engine.setMap(`xx..
// ooww
// ....`);
engine.setMap(`...
.o.
...`);
// engine.setSolids([ 'o' ]);
// engine.setPushables({ 'o': [ 'o' ] });

const s = engine.getFirst('o');
console.log('at ' + s.x);
s.x += 1;
console.log('now at ' + s.x);

// printGrid();
// for (let i = 0; i < 2; i++) {
//   s.x += 1;
//   printGrid();
//   console.log(engine.getAll().map(s => ({ type: s.type, addr: s.addr, next: s.next, x: s.x, y: s.y })));
// }
// console.log(engine.tilesWith('o', 'w'));
