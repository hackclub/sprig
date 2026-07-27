/*
@title: Sprig-8
@author: sircheetodust
@tags: ['emulation']
@addedOn: 2026-01-01
@description: Chip-8 Emulator for the Sprig
*/
/* 
Adding games:
1. Use a file to hex string converter, create a string with that string that you just generated
2. Add it to the games struct, Map controls to what controls you want to use on the Sprig. Use an online emulator to figure them out if needed.
youre done!
*/
// built-in 4x5 pixel font set representing hex digits 0-F in memory
const FONT_SPRITES = [
  0xF0, 0x90, 0x90, 0x90, 0xF0, // 0
  0x20, 0x60, 0x20, 0x20, 0x70, // 1
  0xF0, 0x10, 0xF0, 0x80, 0xF0, // 2
  0xF0, 0x10, 0xF0, 0x10, 0xF0, // 3
  0x90, 0x90, 0xF0, 0x10, 0x10, // 4
  0xF0, 0x80, 0xF0, 0x10, 0xF0, // 5
  0xF0, 0x80, 0xF0, 0x90, 0xF0, // 6
  0xF0, 0x10, 0x20, 0x40, 0x40, // 7
  0xF0, 0x90, 0xF0, 0x90, 0xF0, // 8
  0xF0, 0x90, 0xF0, 0x10, 0xF0, // 9
  0xF0, 0x90, 0xF0, 0x90, 0x90, // A
  0xE0, 0x90, 0xE0, 0x90, 0xE0, // B
  0xF0, 0x80, 0x80, 0x80, 0xF0, // C
  0xE0, 0x90, 0x90, 0x90, 0xE0, // D
  0xF0, 0x80, 0xF0, 0x80, 0xF0, // E
  0xF0, 0x80, 0xF0, 0x80, 0x80  // F
];

// sourced from https://johnearnest.github.io/chip8Archive/
const breakoutROM = "129FFCFC80A202DDC100EEA204DBA100EEA2036002610587008610D67171086F388F174F00121770026F108F074F00121500EE22057D04220500EE22057DFC220500EE8080400168FF40FF68015AC0225300EE80B070FB61F880127005A203D0A100EE220B8B948A84220B4B0069014B3F69FF4A0068014A1F68FF4F0122434A1F228500EE00E06B1E6A142205220B221100EEFE073E0012936E04FE1500EE6D1E6C1E6B406A1DC901490069FF68FF2205220B22116007E0A1223B6009E0A122332263229312B5";
// sourced from https://github.com/kripod/chip8-roms
const pongROM = "6A026B0C6C3F6D0CA2EADAB6DCD66E0022D4660368026060F015F0073000121AC717770869FFA2F0D671A2EADAB6DCD66001E0A17BFE6004E0A17B02601F8B02DAB68D70C00A7DFE40007D026000601F8D02DCD6A2F0D67186848794603F8602611F871246021278463F1282471F69FF47006901D671122A68026301807080B5128A68FE630A807080D53F0112A2610280153F0112BA80153F0112C880153F0112C26020F01822D48E3422D4663E3301660368FE33016802121679FF49FE69FF12C87901490269016004F0187601464076FE126CA2F2FE33F265F12964146500D4557415F229D45500EE808080808080800000000000";
// sourced from https://johnearnest.github.io/chip8Archive/
const dinoROM = "1290F0F0F0F00F0B0F8CF878100F0B0F8CF878400C18081C7E38FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF05568006000A21AD08F70083040123EF06500EEF055680F6000A229D08D700830401252F06500EEF0556000611CA202D014700430401266F06500EE00E0225E620A6315A206D2376A1C6B056005F029DAB56005E0A11290128800E06000611C620A6315643E65196D2D690066006C0067026B026E00A202D0147004304012AEA206D237A214D453610AA217DD136A02F629DAB56A07FC29DAB53E0012D6A2063E0112DCA20DD2376005E09E12E849006901610A80D07DFF6FF08FD53F0012F86D3F90D01302A217D013DD133901131073FD6F098F353F0069023902132273046F158F374F00132263156900390013323E00132E6E0113306E0013346E003E00133AA2063E011340A20DD2376F0E8F454F00135C6F088F474F00135C6F128F353F00135C13F0804084756F408F453F0013A4A214D0536A02F629DAB56A07FC29DAB57C016102F1183C0A13906C0076012236224A225E6119F1186A02F629DAB56A07FC29DAB5643E603EA214D453904013AEA214D053D453360013BA4C0367034C066704360113C24C006705360213CE4C0067064C056707360313DA4C0067084C056709360413E24C00670A6804F815F807480013EE13E612D000E06B0C6A1CF629DAB56A21FC29DAB56005E0A112901400";

const GAMES = [
  { 
    name: "Breakout", 
    rom: breakoutROM,
    controls: {
      "a": 0x7, 
      "d": 0x9  
    }
  },
  { 
    name: "Pong", 
    rom: pongROM,
    controls: {
      "w": 0x1, // Player 1 Up (CHIP-8 Key 1)
      "s": 0x4, // Player 1 Down (CHIP-8 Key 4)
    }
  },
  { 
    name: "dino", 
    rom: dinoROM,
    controls: {
      "w": 0x5, // Player 1 Up (CHIP-8 Key 1)
      "s": 0x8, // Player 1 Down (CHIP-8 Key 4)
    }
  }
];

let currentGameIndex = 0;

// config
const CPU_TICKS_PER_FRAME = 10;
const EMULATION_SPEED_MS = 16;
const KEY_HOLD_CYCLES = 30;
const SPRITE_KEYS = ["0", "1", "2", "3", "4", "5", "6", "7"];

// helper to create blank 16x16 tile string
const createEmptyTileString = () => ("0".repeat(16) + "\n").repeat(15) + "0".repeat(16);

let displayTileData = SPRITE_KEYS.map(() => createEmptyTileString());
// border
const WHITE_BORDER_TILE = "\n" + "9".repeat(16).concat("\n").repeat(15).slice(0, -1);
function updateScreen() {
  const legendEntries = SPRITE_KEYS.map((key, i) => [key, bitmap`${displayTileData[i]}`]);
  setLegend(...legendEntries);
}

function clearDisplayBuffer() {
  displayTileData = SPRITE_KEYS.map(() => createEmptyTileString());
}

// init map grid layout (4x2 grid of 16x16 tiles = 64x32 CHIP-8 resolution)
clearDisplayBuffer();
updateScreen();
setMap(map`
0123
4567`);

// flip a display pixel to a color
function flipDisplayPixel(x, y) {
  x %= 64;
  y %= 32;

  const tileIndex = Math.floor(x / 16) + (y >= 16 ? 4 : 0);
  const characterIndex = (y % 16) * 17 + (x % 16);

  const currentTileData = displayTileData[tileIndex];
  
  // customizable color
  const ACTIVE_COLOR = "4"; 
  /* 
  | COLOR | NUMBER |
  | Black |   0    |
  | White |   1    |
  | Red   |   2    |
  | Green |   3    |
  | Blue  |   4    |
  | Yellow|   5    |
  | Orange|   6    |
  | Purple|   7    |
  | Gray  |   8    |
  | LBlue |   9    |

  
  */

  const pixelIsActive = currentTileData[characterIndex] === ACTIVE_COLOR;

  // Toggle pixel: "0" = OFF (Black), ACTIVE_COLOR = ON
  const newPixelValue = pixelIsActive ? "0" : ACTIVE_COLOR;

  displayTileData[tileIndex] = 
    currentTileData.slice(0, characterIndex) + 
    newPixelValue + 
    currentTileData.slice(characterIndex + 1);

  return pixelIsActive;
}

// CPU state
const cpu = {
  programCounter: 0x200,
  registers: new Array(16).fill(0),
  indexRegister: 0x000,
  ram: new Array(4096).fill(0),
  stack: [],
  keypad: new Array(16).fill(0),
  delayTimer: 0,
  soundTimer: 0
};

let cpuLoopInterval = null;
let timerLoopInterval = null;

const clamp8Bit = (value) => (value < 0 ? (value + 0x100) % 0x100 : value & 0xFF);
const clamp12Bit = (value) => (value < 0 ? (value + 0x1000) % 0x1000 : value & 0xFFF);

function initializeEmulator() {
  cpu.programCounter = 0x200;
  cpu.registers.fill(0);
  cpu.indexRegister = 0x000;
  cpu.keypad.fill(0);
  cpu.stack = [];
  cpu.delayTimer = 0;
  cpu.soundTimer = 0;

  cpu.ram = [...FONT_SPRITES, ...new Array(4096 - FONT_SPRITES.length).fill(0)];
  // get active ROM hex string
  const activeRom = GAMES[currentGameIndex].rom;
  // Load activeRom into memory at 0x200
  for (let i = 0; i < activeRom.length; i += 2) {
    cpu.ram[0x200 + i / 2] = parseInt(activeRom.slice(i, i + 2), 16);
  }

  clearDisplayBuffer();
  updateScreen();

  if (cpuLoopInterval) clearInterval(cpuLoopInterval);
  cpuLoopInterval = setInterval(() => {
    for (let i = 0; i < CPU_TICKS_PER_FRAME; i++) {
      executeInstructionCycle();
    }
  }, EMULATION_SPEED_MS);

  if (timerLoopInterval) clearInterval(timerLoopInterval);
  timerLoopInterval = setInterval(updateHardwareTimers, 1000 / 60);
}

function executeInstructionCycle() {
  const opcodeByte1 = cpu.ram[cpu.programCounter];
  const opcodeByte2 = cpu.ram[cpu.programCounter + 1];

  const nibble1 = opcodeByte1 >> 4;
  const nibble2 = opcodeByte1 & 0x0F;
  const nibble3 = opcodeByte2 >> 4;
  const nibble4 = opcodeByte2 & 0x0F;

  const targetAddress = (nibble2 << 8) | opcodeByte2;
  let advancePC = true;

  if (opcodeByte1 === 0x00 && opcodeByte2 === 0xE0) {
    clearDisplayBuffer();
    updateScreen();
  } else if (opcodeByte1 === 0x00 && opcodeByte2 === 0xEE) {
    cpu.programCounter = cpu.stack.pop();
  } else if (nibble1 === 0x1) {
    cpu.programCounter = targetAddress;
    advancePC = false;
  } else if (nibble1 === 0x2) {
    cpu.stack.push(cpu.programCounter);
    cpu.programCounter = targetAddress;
    advancePC = false;
  } else if (nibble1 === 0x3) {
    if (cpu.registers[nibble2] === opcodeByte2) cpu.programCounter += 2;
  } else if (nibble1 === 0x4) {
    if (cpu.registers[nibble2] !== opcodeByte2) cpu.programCounter += 2;
  } else if (nibble1 === 0x5) {
    if (cpu.registers[nibble2] === cpu.registers[nibble3]) cpu.programCounter += 2;
  } else if (nibble1 === 0x6) {
    cpu.registers[nibble2] = opcodeByte2;
  } else if (nibble1 === 0x7) {
    cpu.registers[nibble2] += opcodeByte2;
  } else if (nibble1 === 0x8) {
    if (nibble4 === 0x0) cpu.registers[nibble2] = cpu.registers[nibble3];
    else if (nibble4 === 0x1) { cpu.registers[nibble2] |= cpu.registers[nibble3]; cpu.registers[0xF] = 0; }
    else if (nibble4 === 0x2) { cpu.registers[nibble2] &= cpu.registers[nibble3]; cpu.registers[0xF] = 0; }
    else if (nibble4 === 0x3) { cpu.registers[nibble2] ^= cpu.registers[nibble3]; cpu.registers[0xF] = 0; }
    else if (nibble4 === 0x4) {
      const sum = cpu.registers[nibble2] + cpu.registers[nibble3];
      cpu.registers[nibble2] = sum;
      cpu.registers[0xF] = sum > 0xFF ? 1 : 0;
    } else if (nibble4 === 0x5) {
      const flag = cpu.registers[nibble2] >= cpu.registers[nibble3] ? 1 : 0;
      cpu.registers[nibble2] -= cpu.registers[nibble3];
      cpu.registers[0xF] = flag;
    } else if (nibble4 === 0x6) {
      const flag = cpu.registers[nibble3] & 0x1;
      cpu.registers[nibble2] = cpu.registers[nibble3] >> 1;
      cpu.registers[0xF] = flag;
    } else if (nibble4 === 0x7) {
      const flag = cpu.registers[nibble3] >= cpu.registers[nibble2] ? 1 : 0;
      cpu.registers[nibble2] = cpu.registers[nibble3] - cpu.registers[nibble2];
      cpu.registers[0xF] = flag;
    } else if (nibble4 === 0xE) {
      const flag = (cpu.registers[nibble3] >> 7) & 0x1;
      cpu.registers[nibble2] = cpu.registers[nibble3] << 1;
      cpu.registers[0xF] = flag;
    }
  } else if (nibble1 === 0x9) {
    if (cpu.registers[nibble2] !== cpu.registers[nibble3]) cpu.programCounter += 2;
  } else if (nibble1 === 0xA) {
    cpu.indexRegister = targetAddress;
  } else if (nibble1 === 0xB) {
    cpu.programCounter = targetAddress + cpu.registers[0];
  } else if (nibble1 === 0xC) {
    cpu.registers[nibble2] = Math.floor(Math.random() * 256) & opcodeByte2;
  } else if (nibble1 === 0xD) {
    let hasCollision = false;
    for (let spriteRow = 0; spriteRow < nibble4; spriteRow++) {
      const spriteByte = cpu.ram[cpu.indexRegister + spriteRow];
      for (let spriteCol = 0; spriteCol < 8; spriteCol++) {
        if ((spriteByte >> (7 - spriteCol)) & 1) {
          const pixelX = cpu.registers[nibble2] + spriteCol;
          const pixelY = cpu.registers[nibble3] + spriteRow;
          hasCollision = flipDisplayPixel(pixelX, pixelY) || hasCollision;
        }
      }
    }
    cpu.registers[0xF] = hasCollision ? 1 : 0;
    updateScreen();
  } else if (nibble1 === 0xE && opcodeByte2 === 0x9E) {
    if (cpu.keypad[cpu.registers[nibble2]] > 0) cpu.programCounter += 2;
    cpu.keypad[cpu.registers[nibble2]] = 0;
  } else if (nibble1 === 0xE && opcodeByte2 === 0xA1) {
    if (!cpu.keypad[cpu.registers[nibble2]]) cpu.programCounter += 2;
    cpu.keypad[cpu.registers[nibble2]] = 0;
  } else if (nibble1 === 0xF) {
    if (opcodeByte2 === 0x07) cpu.registers[nibble2] = cpu.delayTimer;
    else if (opcodeByte2 === 0x0A) {
      const pressedKey = cpu.keypad.findIndex((val) => val > 0);
      if (pressedKey === -1) advancePC = false;
      else cpu.registers[nibble2] = pressedKey;
      cpu.keypad.fill(0);
    } else if (opcodeByte2 === 0x15) cpu.delayTimer = cpu.registers[nibble2];
    else if (opcodeByte2 === 0x18) cpu.soundTimer = cpu.registers[nibble2];
    else if (opcodeByte2 === 0x1E) cpu.indexRegister += cpu.registers[nibble2];
    else if (opcodeByte2 === 0x29) cpu.indexRegister = (cpu.registers[nibble2] & 0x0F) * 5;
    else if (opcodeByte2 === 0x33) {
      cpu.ram[cpu.indexRegister] = Math.floor(cpu.registers[nibble2] / 100);
      cpu.ram[cpu.indexRegister + 1] = Math.floor(cpu.registers[nibble2] / 10) % 10;
      cpu.ram[cpu.indexRegister + 2] = Math.floor(cpu.registers[nibble2]) % 10;
    } else if (opcodeByte2 === 0x55) {
      for (let i = 0; i <= nibble2; i++) {
        cpu.ram[cpu.indexRegister] = cpu.registers[i];
        cpu.indexRegister++;
      }
    } else if (opcodeByte2 === 0x65) {
      for (let i = 0; i <= nibble2; i++) {
        cpu.registers[i] = cpu.ram[cpu.indexRegister];
        cpu.indexRegister++;
      }
    }
  }

  if (advancePC) cpu.programCounter += 2;

  cpu.registers = cpu.registers.map(clamp8Bit);
  cpu.ram = cpu.ram.map(clamp8Bit);
  cpu.indexRegister = clamp12Bit(cpu.indexRegister);
}

function updateHardwareTimers() {
  if (cpu.delayTimer > 0) cpu.delayTimer--;
  if (cpu.soundTimer > 0) {
    playTune(tune`37.5: C5~37.5, 1162.5`);
    cpu.soundTimer--;
  }
}

// Helper to register inputs based on the current game's configuration
function handleKeyPress(buttonName) {
  const currentControls = GAMES[currentGameIndex].controls;
  
  // Look up if the pressed Sprig button is mapped for this game
  const mappedChip8Key = currentControls[buttonName];

  if (mappedChip8Key !== undefined) {
    cpu.keypad[mappedChip8Key] = KEY_HOLD_CYCLES;
  }
}

// bind all Sprig buttons to the dynamic handler
onInput("w", () => handleKeyPress("w"));
onInput("a", () => handleKeyPress("a"));
onInput("s", () => handleKeyPress("s"));
onInput("d", () => handleKeyPress("d"));
onInput("i", () => handleKeyPress("i"));
onInput("k", () => handleKeyPress("k"));

// game switching using J
onInput("j", () => {
  currentGameIndex = (currentGameIndex + 1) % GAMES.length;
  
  // restart emulator with the new ROM
  initializeEmulator();
});

initializeEmulator();