import { wasmEngine } from "../wasmEngine.js";

const { api } = await wasmEngine();

const printGrid = () => {
  let out = '';
  const gridFlat = api.getGrid();
  for (let y = 0; y < api.height(); y++) {
    for (let x = 0; x < api.width(); x++)
      out += ((gridFlat.shift() ?? []).shift() ?? { type: '.' }).type;
    out += '\n';
  }
  console.log(out);
}

api.setMap(`....
ooww
....`);
api.setSolids([ 'o' ]);
api.setPushables({ 'o': [ 'o' ] });

const s = api.getFirst('o');
console.log('grabbed ' + s.addr);

printGrid();
for (let i = 0; i < 2; i++) {
  s.x += 1;
  printGrid();
  console.log(api.getAll().map(s => ({ type: s.type, addr: s.addr, next: s.next, x: s.x, y: s.y })));
}
console.log(api.tilesWith('o', 'w'));
