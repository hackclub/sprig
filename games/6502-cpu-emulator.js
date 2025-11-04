// default code bc text wasnt working without it

const player = "p"

setLegend(
  [ player, bitmap`
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
0000000000000000` ]
)

setSolids([])

let level = 0
const levels = [
  map`
pp
pp`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

afterInput(() => {
  
})

// the code

let A = 0; // A register
let X = 0; // X register
let Y = 0; // Y register
let SP = 0xFF; // Stack Pointer
let PC = 0; // Program counter (i will change this to be hex)
let P = 0x24; // Processor status flag
let memory = [0xA9, 0x01, 0x8D, 0x00, 0x02, 0xA9, 0x05, 0x8D, 0x01, 0x02, 0xA9, 0x08, 0x8D, 0x02, 0x02]; // mod this with the opcodes of any 6502 program youd like
let delay = 2000 // delay between exec cycles (this is only here so you can read the logs)
// convert SP and P to hex
SP = "0x" + SP.toString(16).toUpperCase().padStart(2, '0');
P = "0x" + P.toString(16).toUpperCase().padStart(2, '0');

// logs
  clearText()
  addText("Register A="+A, {
    x: 0,
    y: 0,
    color: color`2`
  })
  addText("Register X="+X, {
    x: 0,
    y: 1,
    color: color`2`
  })
  addText("Register Y="+Y, {
    x: 0,
    y: 2,
    color: color`2`
  })
  addText("Prog. Counter=" + PC, {
    x: 0,
    y: 3,
    color: color`2`
  })
  addText("Stack Pointer=" + SP, {
    x: 0,
    y: 4,
    color: color`2`
  })
  addText("Status=" + P, {
    x: 0,
    y: 5,
    color: color`2`
  })
  addText("Delay=" + delay+"ms" , {
    x: 0,
    y: 6,
    color: color`2`
  })
// main function
function step() {
  SP = "0x" + SP.toString(16).toUpperCase().padStart(2, '0');
  P = "0x" + P.toString(16).toUpperCase().padStart(2, '0');
  let opcode = memory[PC];
  PC++;
  console.log(`PC=${PC} A=${A} X=${X} MEM2=${memory[2]}`)
  clearText()
  addText("Register A="+A, {
    x: 0,
    y: 0,
    color: color`2`
  })
  addText("Register X="+X, {
    x: 0,
    y: 1,
    color: color`2`
  })
  addText("Register Y="+Y, {
    x: 0,
    y: 2,
    color: color`2`
  })
  addText("Prog. Counter=" + PC, {
    x: 0,
    y: 3,
    color: color`2`
  })
  addText("Stack Pointer=" + SP, {
    x: 0,
    y: 4,
    color: color`2`
  })
  addText("Status=" + P, {
    x: 0,
    y: 5,
    color: color`2`
  })
  addText("Delay=" + delay+"ms" , {
    x: 0,
    y: 6,
    color: color`2`
  })
  if (opcode === 0xA9) {
    A = memory[PC];
    PC++
  } else if (opcode === 0x8D) {
    let lo = memory[PC]
    let hi = memory[PC + 1];
    let addr = lo + (hi << 8);
    memory[addr] = A;
    PC += 2;
  } else if (opcode === 0xE8) {
    X = (X + 1) & 0xFF;
  } else if (opcode === 0xEA) {

  } else if (opcode === 0x00) {
    console.log("BRK");
    return false;
  } else {
    console.log("Unknown opcode", opcode);
    return false;
  }
  return true;
}
let interval = setInterval(() => {
  if (!step()) clearInterval(interval);
}, delay);