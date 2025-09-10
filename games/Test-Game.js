'use strict';
/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Test Game
@author: Nathan Smith
@tags: []
@addedOn: 2024-00-00
*/

const r = tune`
250: C5~250 + G4^250 + D5-250,
250: C5~250 + G4^250 + D4-250,
250: C5~250 + F4^250 + E4-250,
250: E4~250 + D4^250 + B4-250,
250: G4~250 + D4^250 + C4-250,
250: D4~250 + E4^250,
250: E4~250 + F4^250 + C4-250 + A4-250 + E5-250,
250: G4~250 + F4^250 + C5-250,
250: G4~250 + D5-250,
250: C5~250 + G4^250 + F5-250 + F4-250,
250: C5~250 + G4^250,
250: C5~250 + E4^250 + E5-250 + B4-250,
250: G4~250 + E4^250 + D5-250,
250: A4~250 + D4^250 + C5-250,
250: A4~250 + F4^250,
250: C5~250 + F4^250,
250: C5~250 + F4^250 + D5-250,
250: G4~250 + E5-250,
250: D5~250 + F4^250 + A4-250,
250: D5~250 + B4^250 + E5-250,
250: F5~250 + C5^250 + G5-250,
250: B4~250 + G4^250 + D4-250 + D5-250,
250: B4~250 + D4^250 + F4-250,
250: F4~250 + C4^250 + E5-250 + G4-250,
250: E4~250 + C4^250 + B4-250,
250: F4~250 + C4^250,
250: B4~250 + E4^250 + D5-250 + G4-250,
250: B4~250 + F4^250,
250: C5~250 + A4^250 + E5-250 + G4-250,
250: F5~250 + B4^250 + G5-250,
250: D5~250 + B4^250 + E5-250 + G4-250,
250: C5~250 + A4^250 + F4-250`
//playTune(r, Infinity);
const button_press = tune`
126.58227848101266: E4^126.58227848101266,
3924.0506329113928`
const button_release = tune`
126.58227848101266: B4^126.58227848101266,
3924.0506329113928`

function canMoveUp(x, y){
  if (hasAnySprite(x, y-1, [horizontal_door_open, horizontal_door_closed])){
    return false;
  }
  if (hasAnySprite(x, y, [horizontal_door_open, horizontal_door_closed])){
    return false;
  }
  return true;
}

function canMoveDown(x, y){
  if (hasAnySprite(x, y+1, [horizontal_door_open, horizontal_door_closed])){
    return false;
  }
  if (hasAnySprite(x, y, [horizontal_door_open, horizontal_door_closed])){
    return false;
  }
  return true;
}

function canMoveLeft(x, y){
  if (hasAnySprite(x-1, y, [vertical_door_open, vertical_door_closed])){
    return false;
  }
  if (hasAnySprite(x, y, [vertical_door_open, vertical_door_closed])){
    return false;
  }
  return true;
}

function canMoveRight(x, y){
  if (hasAnySprite(x+1, y, [vertical_door_open, vertical_door_closed])){
    return false;
  }
  if (hasAnySprite(x, y, [vertical_door_open, vertical_door_closed])){
    return false;
  }
  return true;
}

function createSprite(x, y, type){
  if (x>=0 && x<width() && y>=0 && y<height()){
    addSprite(x, y, type);
  }
}

function hasSprite(x, y, type){
  const sprites = getTile(x, y);
  for (let i = 0; i<sprites.length; i++){
    if (type == sprites[i].type){
      return true;
    }
  }
  return false;
}

function hasAnySprite(x, y, types){
  for (let i = 0; i<types.length; i++){
    if (hasSprite(x, y, types[i])){
      return true;
    }
  }
  return false;
}

function isMovable(x, y){
  const movables = [crate, crate_edge, crate_top, crate_below]
  for (let i = 0; i<movables.length; i++){
    if (hasSprite(x, y, movables[i])) {
      return true;
    }
  }
  return false;
}

function getSprite(x, y, type){
  if (hasSprite(x, y, type)){
    const sprites = getTile(x, y);
    for (let i = 0; i<sprites.length; i++){
      if (type == sprites[i].type){
        return sprites[i];
      }
    }
  }
}

function getSprites(x, y, types){
  const rsprites = []
  const sprites = getTile(x, y);
  for (let i = 0; i<sprites.length; i++){
    for (let j = 0; j<types.length; j++){
      if (types[j] == sprites[i].type){
        rsprites.push(sprites[i]);
      }
    }
  }
  return rsprites;
}

function getAllSprites(types){
  let rsprites = [];
  for (let i = 0; i<types.length; i++){
    rsprites = rsprites.concat(getAll(types[i]));
  }
  return rsprites;
}

function moveSprite(x1, y1, x2, y2, type){
  if (hasSprite(x1, y1, type)){
    getSprite(x1, y1, type).remove();
    createSprite(x2, y2, type);
  }
}
function moveSprites(x1, y1, x2, y2, types){
  for (let i = 0; i<types.length; i++){
    moveSprite(x1, y1, x2, y2, types[i]);
  }
  return false;
}
class Dir{
  static left = 0;
  static right = 1;
  static up = 2;
  static down = 3;
}
function getBitmap(obj){
  return ((obj)?obj.getBitmap():bitmap`.`)
}

function removeSprite(x, y, type){
  let sprite = getSprite(x, y, type);
  while (sprite){
    sprite.remove();
    sprite = getSprite(x, y, type);
  }
}

class GridLocation{
  constructor(x, y){
    this.x = x;
    this.y = y;
  }

  matches(x, y){
    return (this.x == x && this.y == y);
  }
}

class GridRange{
  constructor(x1, y1, x2, y2){
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2; 
    this.y2 = y2;
  }

  matches(x, y){
    return (this.x1 <= x && this.x2 >= x && this.y1 <= y && this.y2 >= y);
  }
}

class GridCollection{
  constructor(...Grids){
    this.grids = grids;
  }

  matches(x, y){
    return this.grids.some(grid => grid.matches(x, y));
  }
}

class LogicInput{
  getValue(multi_floor){
    return false;
  }
}

class LogicConnection{
  constructor(type, ...inputs){
    this.type = type;
    this.inputs = inputs;
  }

  _and(multi_floor){
    for (let i = 0; i < this.inputs.length; i++){
      if (!this.inputs[i].getValue(multi_floor)){
        return false;
      }
    }
    return true;
  }

  _or(multi_floor){
    for (let i = 0; i < this.inputs.length; i++){
      if (this.inputs[i].getValue(multi_floor)){
        return true;
      }
    }
    return false;
  }

  _nand(multi_floor){
    for (let i = 0; i < this.inputs.length; i++){
      if (!this.inputs[i].getValue(multi_floor)){
        return false;
      }
    }
    return true;
  }

  _nor(multi_floor){
    for (let i = 0; i < this.inputs.length; i++){
      if (this.inputs[i].getValue(multi_floor)){
        return false;
      }
    }
  }

  _xor(multi_floor){
    let value = false;
    for (let i = 0; i < this.inputs.length; i++){
      value = !!(value ^ this.inputs[i].getValue(multi_floor));
    }
    return value;
  }

  getValue(multi_floor){
    switch (this.type) {
      case "and":
        return this._and(multi_floor);
      case "nand":
        return this._nand(multi_floor);
      case "or":
        return this._or(multi_floor);
      case "not":
        return !this.inputs[0].getValue(multi_floor);
      case "nor":
        return this._nor(multi_floor);
      case "xor":
        return this._xor(multi_floor);
      case "nxor":
        return !this._xor(multi_floor);
      case "false":
        return false
      case "true":
        return true
    }
    return this.inputs[0].getValue(multi_floor);
  }
}

class LogicTimer{
  static ACTIVATION_TOGGLE = 0;
  static ACTIVATION_TICK_END = 1;
  static ACTIVATION_AFTER = 2;
  static ACTIVATION_WHILE = 3;
  static ACTIVATION_DEFAULT = this.ACTIVATION_TICK_END;

  static COUNT_WHILE_TRUE = 0;
  static COUNT_WHILE_FALSE = 1;
  static COUNT_ALWAYS_RESET_ON_TRUE = 2;
  static COUNT_ALWAYS_RESET_ON_FALSE = 3;
  static COUNT_ALWAYS_LOOP = 4;
  static COUNT_DEFAULT = this.COUNT_ALWAYS_RESET;
  
  constructor(time, input=null, activation, count, negate=false){
    this.timer = 0;
    this.timer_time = time;
    this.input = input;
    this.negate = negate;
    this.activation = activation;
    this.count = count;
    this.toggle_value = false;
  }

  _get_value(multi_floor){
    if (this.input){
      return this.input.getValue(multi_floor);
    }
    return false;
  }
  
  update(){
    last_time = this.timer;
    let count = false;
    let reset = false;
    const value = this._get_value(false);
    switch (this.count){
      case LogicTimer.COUNT_WHILE_TRUE:
        count = value;
        break;
      case LogicTimer.COUNT_WHILE_FALSE:
        count = !value;
        break;
      case LogicTimer.COUNT_ALWAYS_RESET_ON_TRUE:
        count = true;
        reset = value;
        break;
      case LogicTimer.COUNT_ALWAYS_RESET_ON_FALSE:
        count = true;
        reset = !value;
        break;
      case LogicTimer.COUNT_ALWAYS_LOOP:
      default:
        count = true;
        reset = (last_time <= 0);
        break;
    }
    if (count){
      this.timer-=1;
    }
    if (reset){
      this.timer = this.timer_time;
    }
    if (this.timer == 0 && last_time > 0){
      this.toggle_value = !this.toggle_value;
    }
  }

  _getValue(multi_floor){
    switch (this.activation){
      case LogicTimer.ACTIVATION_TOGGLE:
        return this.toggle_value;
      case LogicTimer.ACTIVATION_TICK_END:
        return (this.timer == 0);
      case LogicTimer.ACTIVATION_AFTER:
        return (this.timer < 0);
      case LogicTimer.ACTIVATION_WHILE:
        return (this.timer > 0);
    }
    return (this.timer == 0);
  }
  
  getValue(multi_floor){
    const output = this._getValue(multi_floor);
    if (negate){
      return !output
    }
    return output;
  }
}

class LogicDelay{
  constructor(input, delay){
    this.input = input;
    this.values = [];
    this.delay = delay;
  }

  update(){
    this.values.push(this.input.getValue(mult_floor));
  }
  
  getValue(multi_floor){
    if (this.values.length-1<this.delay){
      return false;
    }else{
      return this.values[0];
    }
  }
}

class LogicOutput{
  constructor(logicConnection){
    this.logicConnection = logicConnection
  }

  update(){
    //Implement on Extention
  }
}


class FallLogic extends LogicInput {
  constructor(gridSelection, set_position=false, fall_x=1, fall_y=4){
    super()
    this.watched = gridSelection;
    this.x = fall_x;
    this.y = fall_y;
    this.fell = false;
  }

  update(){
    this.fell = false;
  }
  
  onFall(x, y){
    if (this.watched.matches(x, y)){
      playerSprite.setPosition(this.x, this.y);
    }
    this.fell = true;
  }

  getValue(){
    return this.fell;
  }
}

class CollectLogic extends LogicInput{
  constructor(gridSelection, type){
    this.watched = gridSelection;
    this.collected = false;
    this.type = type;
  }

  reset(){
    this.collected = false;
  }
  
  onCollect(x, y, type){
    if (this.watched.matches(x, y)){
      this.collected = true;
    }
  }

  getValue(){
    return this.collected;
  }
}

class Collectable{
  constructor(x, y, type, name){
    this.x = x;
    this.y = y;
    this.type = type;
    this.saved_sprite = new SavedSprite(x, y, type);
    this.collected = false;
    this.name = name;
  }

  reset(){
    if (this.collected){
      this.saved_sprite.loadSprite();
      this.collected = false;
      playerSprite.removeCollectable(this.name);
    }
  }

  onCollect(x, y, type){
    if (this.x == x && this.y == y && this.type == type){
      this.collected = true;
    }
  }
}

class SpriteDetector extends LogicInput{
  constructor(x, y, type){
    super();
    this.x = x;
    this.y = y;
    this.type = type;
    this.last_output = false;
  }

  getValue(multi_floor){
    if (multi_floor){}
    else{
      const sprite = getSprite(this.x, this.y, this.type);
      this.last_output = false;
      if (sprite){
        this.last_output = true;
      }
    }
    return this.last_output;
  }
}

class LogicButton extends SpriteDetector{

  constructor(x, y){
    super(x, y, button_pressed);
  }  
  
}

class LogicLever extends SpriteDetector{

  constructor(x, y){
    super(x, y, lever_on);
  }  

}

class LogicPedistool extends SpriteDetector{

  constructor(x, y){
    super(x, y, "placeholder-key-inserted");
  }
  
}

class LogicTransmitterInput extends LogicInput {
  constructor(logicInput){
    super();
    this.logicInput = logicInput;
  }

  getValue(multi_floor){
    return this.logicInput.getValue(true);
  }
}

class LogicTransmitterOutput extends LogicOutput {
  constructor(logicInput){
    super();
    this.logicInput = logicInput;
  }

  update(){
    this.logicInput.getValue(false);
  }
}

class LogicTransmitter {
  
  constructor(logicInput, floor, multi_floor_id){
    this.input = new LogicTransmitterInput(logicInput);
    this.output = new LogicTransmitterOutput(logicInput);
    this.floor = floor;
    floor.addMultiFloorLogicInput(this, multi_floor_id);
    floor.addUpdateable(this);
  }

  getInput(){
    return this.input;
  }

  getOutput(){
    return this.output;
  }

  getValue(multi_floor){
    return this.input.getValue(multi_floor);
  }

  update(){
    this.output.update();
  }
  
}

class LogicReciever extends LogicInput{
  constructor(target_floor, transmitter_id){
    super();
    this.target_floor = target_floor;
    this.target_id = transmitter_id;
  }

  getValue(multi_floor){
    return this.target_floor.getMultiFloorLogicInput(this.target_id).getValue(true);
  }
  
}

class LogicDoor extends LogicOutput{
  constructor(x, y, logicInput, inverted){
    super();
    this.x = x;
    this.y = y;
    this.logicInput = logicInput;
    if (inverted){
      this.inverted = inverted;
    }else{
      this.inverted = false;
    }
  }

  _getValue(){
    if (this.inverted){
      return !this.logicInput.getValue(false);
    }
    return this.logicInput.getValue(false);
  }

  update(){
    if (this._getValue()){
      const sprites = getSprites(this.x, this.y, [vertical_door_closed, horizontal_door_closed]);
      if (sprites.length > 0){
        const sprite = sprites[0];
        if (sprite.type == vertical_door_closed){
          sprite.type = vertical_door_open;
        }else{
          sprite.type = horizontal_door_open;
        }
      }
    }else{
      const sprites = getSprites(this.x, this.y, [vertical_door_open, horizontal_door_open]);
      if (sprites.length > 0){
        const sprite = sprites[0];
        if (sprite.type == vertical_door_open){
          sprite.type = vertical_door_closed;
        }else{
          sprite.type = horizontal_door_closed;
        }
      }
    }
  }
}

//Sprite and implementation not made yet
class LogicLamp extends LogicOutput{
  constructor(x, y, logicInput, inverted=false){
    super();
    this.x = x;
    this.y = y;
    this.logicInput = logicInput;
    this.inverted = inverted;
    this.off_sprite = lamp_off;
    this.on_sprite = lamp_on;
  }

  _getValue(){
    if (this.inverted){
      return !this.logicInput.getValue(false);
    }
    return this.logicInput.getValue(false);
  }

  update(){
    if (this._getValue()){
      const sprite = getSprite(this.x, this.y, this.off_sprite);
      if (sprite){
        sprite.type = this.on_sprite;
      }
    }else{
      const sprite = getSprite(this.x, this.y, this.on_sprite);
      if (sprite){
        sprite.type = this.off_sprite;
      }
    }
  }
}

class PlayerPositionInput extends LogicInput{
  constructor(gridSelector){
    this.watched = gridSelector;
    this.last_output = false;
  }
  
  getValue(multi_floor){
    if (multi_floor){}else{
      const p = getFirst(player);
      this.last_output = this.watched.matches(p.x, p.y);
    }
    return this.last_output;
  }
}

class FallingBlock extends LogicOutput{
  constructor(input, x, y, type = "placeholder", fallen_type="placeholder"){
    this.has_fallen = false;
    this.saved_sprite = new SavedSprite(x, y, fallen_type);
    this.input = input;
    this.x = x;
    this.y = y;
    this.type = type;
    this.fallen_type = fallen_type;
  }

  reset(){
    if (this.has_fallen) {
      const sprite = getSprite(this.x, this.y, this.fallen_type);
      sprite.remove();
      this.saved_sprite.loadSprite();
      this.saved_sprite = new SavedSprite(this.x, this.y, this.fallen_type);
    }
  }
  
  update(){
    if (this.has_fallen) return;
    if (this.input.getValue(false)){
      const sprite = getSprite(this.x, this.y, this.type);
      sprite.remove();
      this.saved_sprite.loadSprite();
      this.saved_sprite = new SavedSprite(this.x, this.y, this.type);
    }
  }
}

class LogicCallback extends LogicOutput{
  constructor(input, callback){
    super();
    this.input = input;
    this.callback = callback;
  }

  update(){
    if (this.input.getValue(false)){
      this.callback()
    }
  }
}

class ToggleBlock extends LogicOutput{
  constructor(input, x, y, state1_type = "toggle_state1", state2_type="toggle_state2"){
    this.state = 1;
    this.saved_sprite = new SavedSprite(x, y, state2_type);
    this.input = input;
    this.x = x;
    this.y = y;
    this.state1 = state1_type;
    this.state2 = state2_type;
  }

  reset(){
    if (this.state == 2) {
      const sprite = getSprite(this.x, this.y, this.state2);
      sprite.remove();
      this.saved_sprite.loadSprite();
      this.saved_sprite = new SavedSprite(this.x, this.y, this.state2);
    }
    this.state = 1;
  }
  
  update(){
    if (this.state == 1 && this.input.getValue(false)){
      const sprite = getSprite(this.x, this.y, this.state1);
      sprite.remove();
      this.saved_sprite.loadSprite();
      this.saved_sprite = new SavedSprite(this.x, this.y, this.state1);
      this.state = 2;
    }else if (this.state == 2 && !this.input.getValue(false)){
      const sprite = getSprite(this.x, this.y, this.state2);
      sprite.remove();
      this.saved_sprite.loadSprite();
      this.saved_sprite = new SavedSprite(this.x, this.y, this.state2);
      this.state = 1;
    }
  }
}

class InvisibleBlock extends ToggleBlock{
  static INVISIBLE_TYPE = "invisible";
  constructor(input, x, y, type){
    super(input, x, y, InvisibleBlock.INVISIBLE_TYPE, type);
  }
} 

class SavedSprite{
  constructor(x, y, type){
    this.type = type;
    this.x = x;
    this.y = y;
  }

  loadSprite(){
    createSprite(this.x, this.y, this.type);
  }
}

class SavedText{
  constructor(string, options){
    this.string = string;
    this.options = options;
  }

  loadText(){
    // addText("Hello", {
    //   x: 5,
    //   y: 4,
    //   color: color`0`
    // })
    addText(this.string, this.options);
  }
}

class Exit{
  constructor(entrance_x, entrance_y, exit_x, exit_y, level_id, floor){
    this.entrance_x = entrance_x;
    this.entrance_y = entrance_y;
    this.exit_x = exit_x;
    this.exit_y = exit_y;
    this.level_id = level_id;
    this.floor = floor;
  }

  canExit(x, y){
    return (this.entrance_x == x && this.entrance_y == y);
  }

  exit(){
    level = Levels.lookupLevel(this.level_id);
    level.setFloor(this.floor);
    if (current_level !== level){
      load_level(level);
    }
    playerSprite.setPosition(this.exit_x, this.exit_y);
  }
}

class OnReset{
  constructor(callback){
    this.callback = callback;
  }

  reset(){
    this.callback();
  }
}


class Floor{
  constructor(save_sprites=true, resets_on_entry=false, resets_on_fall=false){
    this.loaded_before = false;
    this.saved_sprites = [];
    this.map = bitmap`.`;
    this.logic = []
    this.updateables = [];
    this.exits = [];
    this.text = [];
    this.onFall = [];
    this.onCollect = [];
    this.onReset = [];
    this.resets_on_entry = resets_on_entry;
    this.resets_on_fall = resets_on_fall;
    this.save_sprites = save_sprites;
    this.multi_floor_logic_input = new Map();
  }

  addCollectable(x, y, type, name){
    this.addSprite(x, y, type);
    let collectable = new Collectable(x, y, type, name)
    this.addOnCollect(collectable);
    this.addOnReset(collectable);
  }

  addUpdateable(updateable){
    this.updateables.push(updateable);
  }

  addOnFall(onFall){
    this.onFall.push(onFall);
  }

  addOnCollect(onCollect){
    this.onCollect.push(onCollect);
  }

  addOnReset(onReset){
    this.onReset.push(onReset);
  }

  addMultiFloorLogicInput(input, id){
    this.multi_floor_logic_input.set(id, input);
  }

  getMultiFloorLogicInput(id){
    return this.multi_floor_logic_input.get(id);
  }

  fall(x, y){
    for (let i = 0; i<this.onFall.length; i++){
      this.onFall[i].onFall(x, y);
    }
    if (this.resets_on_fall){
      this.reset();
    }
  }

  collect(x, y, type){
    for (let i = 0; i<this.onFall.length; i++){
      this.onCollect[i].onCollect(x, y, type);
    }
  }

  reset(){
    for (let i = 0; i<this.onReset.length; i++){
      this.onReset[i].reset();
    }
  }
  
  update(){
    for (let i = 0; i<this.updateables.length; i++){
      this.updateables[i].update();
    }
  }

  addSprite(x, y, type){
    this.saved_sprites.push(new SavedSprite(x, y, type));
  }

  addText(string, options){
    this.text.push(new SavedText(string, options));
  }
  
  setMap(map){
    this.map = map;
  }

  loadSavedSprites(){
    for (let i = 0; i<this.saved_sprites.length; i++){
      this.saved_sprites[i].loadSprite();
    }
    if (this.save_sprites){
      this.saved_sprites = [];
    }
  }

  saveSprites(){
    const sprites = getAll();
    if (!this.save_sprites){
      for (let i = 0; i<sprites.length; i++){
        sprites[i].remove();
      }
      return;
    };
    this.saved_sprites = [];
    for (let i = 0; i<sprites.length; i++){
      this.addSprite(sprites[i].x, sprites[i].y, sprites[i].type);
      sprites[i].remove();
    }
  }

  loadMap(){
    setMap(this.map);
  }

  enter(){
    if (this.reset_on_entry){
      this.reset();
    }
    if (!this.save_sprites || !this.loaded_before){
      this.loadMap();
      this.loaded_before = true;
    }
    this.loadSavedSprites();
    for (let i = 0; i<this.text.length; i++){
      this.text[i].loadText();
    }
  }

  leave(){
    this.saveSprites();
    clearText();
  }

  addExit(entrance_x, entrance_y, exit_x, exit_y, level_id, floor){
    this.exits.push(new Exit(entrance_x, entrance_y, exit_x, exit_y, level_id, floor));
  }

  tryToExit(x, y){
     for (let i = 0; i<this.exits.length; i++){
       if (this.exits[i].canExit(x, y)){
          this.exits[i].exit();
          break;
       }
     }
  }
  
}


class ConditionalUpdateable{
  constructor(updateable, condition){
    this.updateable = updateable;
    this.condition = condition;
  }

  update(){
    if (this.condition()){
      this.updateable.update();
    }
  }
}

class Level{

  constructor(){
    this.floors = []
    this.floor = 0;
    this.updateables = [];
    this.active = false;
  } 

  getFloor(index){
    return this.floors[index];
  }

  getCurrentFloor(){
    return this.getFloor(this.getCurrentFloorIndex());
  }

  getCurrentFloorIndex(){
    return this.floor;
  }

  addUpdateable(updateable){
    this.updateables.push(updateable);
  }

  update(){
    for (let i = 0; i<this.updateables.length; i++){
      this.updateables[i].update();
    }
  }
  
  load(){
    this.floors[this.floor].enter();
    this.active = true;
  }

  exit(){
    this.floors[this.floor].leave();
    this.active = false;
  }

  isActive(){
    return this.active;
  }

  canGoUp(){
    return this.floor<this.floors.length-1;
  }

  canGoDown(){
    return this.floor>0;
  }

  goUpFloor(){
    if (!this.canGoUp()) return;
    this.floors[this.floor].leave();
    this.floor+=1;
    this.floors[this.floor].enter();
  }

  goDownFloor(){
    if (!this.canGoDown()) return;
    this.floors[this.floor].leave();
    this.floor-=1;
    this.floors[this.floor].enter();
  }

  addFloor(floor){
    this.floors.push(floor);
    const index = this.floors.length-1;
    this.addUpdateable(new ConditionalUpdateable(floor, () => {return this.floor == index}));
  }

  setFloor(floor){
    if (this.isActive()){
      this.floors[this.floor].leave();
      this.floor = floor;
      this.floors[this.floor].enter();
    }else{
      this.floor = floor;
    }
  }

  tryToExit(x, y){
    this.getCurrentFloor().tryToExit(x, y);
  }
}

class Levels{
  static LEVELS = new Map();

  static registerLevel(key, level){
    Levels.LEVELS.set(key, level);
  }

  static lookupLevel(key){
    return Levels.LEVELS.get(key);
  }
}

class Texture{

  constructor(bitmap){
    this.bitmap = bitmap;
  }

  getBitmap(){
    return this.bitmap;
  }
}

class AnimatedTexture{
  constructor(){
    this.bitmaps = [];
    this.frame = 0;
  }

  addFrame(bitmap){
    this.bitmaps.push(bitmap);
  }

  nextFrame(){
    this.frame = (this.frame+1)%this.bitmaps.length;
  }

  setFrame(frame){
    this.frame = (frame)%this.bitmaps.length;
  }

  getBitmap(){
    return this.bitmaps[this.frame];
  }
}

class MultiTextureHandler{

  constructor(){
    this.spriteTexture = 0;
    this.textures = []
  }

  addTexture(texture){
    this.textures.push(texture);
  }

  setTexture(texture){
    this.spriteTexture = texture;
  }

  getBitmap(){
    return getBitmap(this.textures[this.spriteTexture]);
  }  
  
}

//Textures
const key_map_copyed = bitmap`
................
....00000000....
...0666666660...
..066FFFFFF660..
..066000000660..
..0F66666666F0..
...0FFF66FFF0...
....00066000....
......0660......
......06600.....
......066660....
......066F0.....
......066660....
......06F00.....
.......00.......
................`;
const key_map = bitmap`
................
.....000000.....
....06666660....
...066FFFF660...
...0660000660...
...0F666666F0...
....0FF66FF0....
.....006600.....
......06600.....
......066660....
......066F0.....
......066660....
......06F00.....
.......00.......
................
................`;
const crate_top_map                      = bitmap`
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
................
..CCCCCCCCCCCC..
..CCFFFFFFFFCC..
..CFCCFFFFCCFC..
..CFFFCFFCFFFC..
..CFFFFCCFFFFC..`
const crate_edge_map                     = bitmap`
..CFFFFCCFFFFC..
..CFFFCFFCFFFC..
..CFCCFFFFCCFC..
..CCFFFFFFFFCC..
..CCCCCCCCCCCC..
..000000000000..
..000CCCCCC000..
..0CC0CCCC0CC0..
..0CCC0CC0CCC0..
..0CCCC00CCCC0..
..0CCC0CC0CCC0..
..0CC0CCCC0CC0..
..000CCCCCC000..
..000000000000..
................
................`
const crate_below_map = crate_edge_map;
const crate_map = bitmap`
..CFFFFCCFFFFC..
..CFFFCFFCFFFC..
..CFCCFFFFCCFC..
..CCFFFFFFFFCC..
..CCCCCCCCCCCC..
..000000000000..
..000CCCCCC000..
..0CC0CCCC0CC0..
..0CCC0CC0CCC0..
..0CCCC00CCCC0..
..0CCC0CC0CCC0..
..CCCCCCCCCCCC..
..CCFFFFFFFFCC..
..CFCCFFFFCCFC..
..CFFFCFFCFFFC..
..CFFFFCCFFFFC..`

const vertical_door_closed_map = bitmap`
LLL..........LLL
L1L..........L1L
L1LCCCCCCCCCCL1L
L1LCFFFFFFFFCL1L
L1LCFFFFFFFFCL1L
L1LCCCCCCCCCCL1L
L1L0000000000L1L
LLL0CCCCCCCC0LLL
0000CCCCCCCC0000
0L00CCCCCCCC00L0
0L00CCCCCCCC00L0
0L00CCCCCCCC00L0
0L00CCCCCCCC00L0
0L000000000000L0
0L0..........0L0
000..........000`
const vertical_door_open_map = bitmap`
LLL..........LLL
L1L..........L1L
L1L..........L1L
L1L..........L1L
L1L..........L1L
L1L..........L1L
L1L..........L1L
LLL..........LLL
000..........000
0L0..........0L0
0L0..........0L0
0L0..........0L0
0L0..........0L0
0L0..........0L0
0L0..........0L0
000..........000`
const horizontal_door_closed_map = bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
LLLLLLLLLLLLLLLL
000000CCCC000000
0LLLLLCFFCLLLLL0
0LLLLLCFFCLLLLL0
0LLLLLCFFCLLLLL0
0LLLLLCFFCLLLLL0
0LLLLLCFFCLLLLL0
0LLLLLCFFCLLLLL0
000000CFFC000000
......CFFC......
......CCCC......
LLLLLLLLLLLLLLLL
L11111111111111L
LLLLLLLLLLLLLLLL`
const horizontal_door_open_map = bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
LLLLLLLLLLLLLLLL
0000000000000000
0LLLLLL00LLLLLL0
0LLLLLL00LLLLLL0
0LLLLLL00LLLLLL0
0LLLLLL00LLLLLL0
0LLLLLL00LLLLLL0
0LLLLLL00LLLLLL0
0000000000000000
................
................
LLLLLLLLLLLLLLLL
L11111111111111L
LLLLLLLLLLLLLLLL`
const horizontal_door_fix_map = bitmap`
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
................
................
................
LLLLLLLLLLLLLLLL
L11111111111111L
LLLLLLLLLLLLLLLL`

const stairs_map = bitmap`
1111111111111111
LLLLLLLLLLLLLLLL
L111111LL111111L
LLLLLLLLLLLLLLLL
1111111111111111
1222222112222221
1111111111111111
LLLLLLLLLLLLLLLL
L111111LL111111L
LLLLLLLLLLLLLLLL
1111111111111111
1222222112222221
1111111111111111
LLLLLLLLLLLLLLLL
L111111LL111111L
LLLLLLLLLLLLLLLL`
const floor_up_ladder_map = bitmap`
LLLLLLLLLLLLLLLL
L111111LL111111L
L111111LL111111L
L111111LL111111L
L111111LL111111L
L111111LL111111L
L111111LL111111L
LLLLLLLLLLLLLLLL
0001100000011000
0LL1122222211LL0
0LL1122222211LL0
0LL11LL00LL11LL0
0LL11LL00LL11LL0
0LL1122222211LL0
0LL1122222211LL0
0001100000011000`;
const floor_down_ladder_map = bitmap`
0001100000011000
0LL1122222211LL0
0LL1122222211LL0
0LL11LL00LL11LL0
0LL11LL00LL11LL0
0LL1122222211LL0
0LL1122222211LL0
0001100000011000
0001100000011000
0LL1122222211LL0
0LL1122222211LL0
0LL11LL00LL11LL0
0LL11LL00LL11LL0
0LL1122222211LL0
0LL1122222211LL0
0001100000011000`;

const button_pressed_map = bitmap`
................
................
................
................
................
................
................
....44444444....
.L444444444444L.
L44444444444444L
L44444444444444L
L44444444444444L
L44444444444444L
.L444444444444L.
..LL44444444LL..
...LLLLLLLLLL...`;
const button_map = bitmap`
................
................
................
................
................
....33333333....
..333333333333..
.33333333333333.
L33333333333333L
L33333333333333L
L33333333333333L
L33333333333333L
L33333333333333L
.L333333333333L.
..LL33333333LL..
...LLLLLLLLLL...`;

const lever_off_map = bitmap`
................
................
................
................
....0...........
...0C0..........
...0CC0.........
....0CC0........
..0000CC000000..
..01110CC01110..
..011110001110..
..011111111110..
..000000000000..
..0LLL0330LLL0..
..0LLL0330LLL0..
..000000000000..`;
const lever_on_map = bitmap`
................
................
................
................
...........0....
..........0C0...
.........0CC0...
........0CC0....
..000000CC0000..
..01110CC01110..
..011100011110..
..011111111110..
..000000000000..
..0LLL0440LLL0..
..0LLL0440LLL0..
..000000000000..`;

const lamp_off_map = bitmap`
................
................
................
......0000......
....000LL000....
.....1LLLL1.....
....1.L..L.1....
....1......1....
....1......1....
...1........1...
...1........1...
...1.L....L.1...
....LL1111LL....
...00LL11LL00...
...0000LL0000...
....00000000....`;
const lamp_on_map = bitmap`
................
................
................
......0000......
....000LL000....
.....1LLLL1.....
....1.L33L.1....
....1.3333.1....
....1.3663.1....
...1.666666.1...
...1.662266.1...
...1.L6226L.1...
....LL1111LL....
...00LL11LL00...
...0000LL0000...
....00000000....`;

const toggle_state1_map = bitmap`
3333333333333333
3.3.3.3.3.3.3.33
33.............3
3.............33
33.............3
3.............33
33.............3
3.............33
33.............3
3.............33
33.............3
3.............33
33.............3
3.............33
33.3.3.3.3.3.3.3
3333333333333333`;
const toggle_state2_map = bitmap`
3333333333333333
3322222222222233
3233333333333323
3233333333333323
3233333333333323
3233333333333323
3233333333333323
3233333333333323
3233333333333323
3233333333333323
3233333333333323
3233333333333323
3233333333333323
3233333333333323
3322222222222233
3333333333333333`;
/*`
const crate_top_map                      = bitmap`
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
.CCCCCCCCCCCCCC.
.CCCCCCCCCCCCCC.
.CCCCCCCCCCCCCC.
.CCCCCCCCCCCCCC.
.CCCCCCCCCCCCCC.
.CCCCCCCCCCCCCC.`
const crate_edge_map                     = bitmap`
.CCCCCCCCCCCCCC.
.CCCCCCCCCCCCCC.
.CCCCCCCCCCCCCC.
.CCCCCCCCCCCCCC.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
................`
const crate_below_map = crate_edge_map;
const crate_map = bitmap`
.CFFCCFFFFCCFFC.
.CFCFFFFFFFFCFC.
.CCFFFFFFFFFFCC.
.CCCCCCCCCCCCCC.
.00000000000000.
.00CCCCCCCCCC00.
.0C0CCCCCCCC0C0.
.0CC00CCCC00CC0.
.0CCCC0CC0CCCC0.
.0CCCCC00CCCCC0.
.CCCCCCCCCCCCCC.
.CCFFFFFFFFFFCC.
.CFCFFFFFFFFCFC.
.CFFCCFFFFCCFFC.
.CFFFFCFFCFFFFC.
.CFFFFFCCFFFFFC.`
*/

const floor_map                          = bitmap`
1111111111111111
1222222112222221
1222222112222221
1222222112222221
1222222112222221
1222222112222221
1222222112222221
1111111111111111
1111111111111111
1222222112222221
1222222112222221
1222222112222221
1222222112222221
1222222112222221
1222222112222221
1111111111111111`
const hole_map = bitmap`
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
const invisible_map = bitmap`
................
................
....0.000.0.....
....0.0.0.0.....
..000.000.000...
..0.0.0...0.0...
..000.000.000...
................
................
...0.0.0000.....
...0.0.0........
...0.0.0.00.....
...0.0.0..0.....
...000.0000.....
................
................`;
const wall_map                           = bitmap`
LLLLLLLLLLLLLLLL
L111111LL111111L
L111111LL111111L
L111111LL111111L
L111111LL111111L
L111111LL111111L
L111111LL111111L
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
L111111LL111111L
L111111LL111111L
L111111LL111111L
L111111LL111111L
L111111LL111111L
L111111LL111111L
LLLLLLLLLLLLLLLL`
const wall_edge_map                      = bitmap`
LLLLLLLLLLLLLLLL
L111111LL111111L
L111111LL111111L
L111111LL111111L
L111111LL111111L
L111111LL111111L
L111111LL111111L
LLLLLLLLLLLLLLLL
0000000000000000
0LLLLLL00LLLLLL0
0LLLLLL00LLLLLL0
0LLLLLL00LLLLLL0
0LLLLLL00LLLLLL0
0LLLLLL00LLLLLL0
0LLLLLL00LLLLLL0
0000000000000000`
const wall_edge_flipped_map              = bitmap`
0000000000000000
0LLLLLL00LLLLLL0
0LLLLLL00LLLLLL0
0LLLLLL00LLLLLL0
0LLLLLL00LLLLLL0
0LLLLLL00LLLLLL0
0LLLLLL00LLLLLL0
0000000000000000
LLLLLLLLLLLLLLLL
L111111LL111111L
L111111LL111111L
L111111LL111111L
L111111LL111111L
L111111LL111111L
L111111LL111111L
LLLLLLLLLLLLLLLL`
const wall_top_map                       = bitmap`
................
................
................
................
................
................
................
................
LLLLLLLLLLLLLLLL
L111111LL111111L
L111111LL111111L
L111111LL111111L
L111111LL111111L
L111111LL111111L
L111111LL111111L
LLLLLLLLLLLLLLLL`
const wall_solid_map                     = bitmap`
0000000000000000
0LLLLLL00LLLLLL0
0LLLLLL00LLLLLL0
0LLLLLL00LLLLLL0
0LLLLLL00LLLLLL0
0LLLLLL00LLLLLL0
0LLLLLL00LLLLLL0
0000000000000000
0000000000000000
0LLLLLL00LLLLLL0
0LLLLLL00LLLLLL0
0LLLLLL00LLLLLL0
0LLLLLL00LLLLLL0
0LLLLLL00LLLLLL0
0LLLLLL00LLLLLL0
0000000000000000`
//Player Textures
const standing_left  = new Texture( bitmap`
...0000000......
..0HHHHHHH0.....
..0HHHHHHHH0....
..0000HHHHH0....
...01100HHH0....
..010110HHH0....
..01011100H0....
..01LL11100.....
...01111110.....
....000000......
....0H00HH0.....
....00110H0.....
....0011000.....
....0H00HH0.....
.....00HH0......
......010.......` );
const standing_right = new Texture( bitmap`
......0000000...
.....0HHHHHHH0..
....0HHHHHHHH0..
....0HHHHH0000..
....0HHH00110...
....0HHH011010..
....0H00111010..
.....00111LL10..
.....01111110...
......000000....
.....0HH00H0....
.....0H01100....
.....0001100....
.....0HH00H0....
......0HH00.....
.......010......` );
const standing_up    = new Texture( bitmap`
.....000000.....
....0HHHHHH0....
...0HHHHHHHH0...
...0HHHHHHHH0...
...0HHHHHHHH0...
...0HHHHHHHH0...
...00HHHHHH00...
...0H000000H0...
....01111110....
...0000000000...
..010HH11HH010..
..010HHHHHH010..
..010000000010..
..000HHHHHH000..
....0H0000H0....
....010..010....` );
const standing_down  = new Texture( bitmap`
....00000000....
...0HHHHHHHH0...
..0HHHHHHHHHH0..
..0HH00000HHH0..
..000111110000..
..001101101100..
...0110110110...
...01LL11LL10...
...0011111100...
...0000000000...
..010HH11HH010..
..010HHHHHH010..
..010000000010..
..000HHHHHH000..
....0H0000H0....
....010..010....` );
const grabbing_left  = new Texture( bitmap`
...0000000......
..0HHHHHHH0.....
..0HHHHHHHH0....
..0000HHHHH0....
...01100HHH0....
..010110HHH0....
..01011100H0....
..01LL11100.....
...01111110.....
...0000000......
..0110HHHH0.....
..0110HHHH0.....
...00HHH000.....
....0H00HH0.....
.....00HH0......
......010.......` );
const grabbing_right = new Texture( bitmap`
......0000000...
.....0HHHHHHH0..
....0HHHHHHHH0..
....0HHHHH0000..
....0HHH00110...
....0HHH011010..
....0H00111010..
.....00111LL10..
.....01111110...
......0000000...
.....0HHHH0110..
.....0HHHH0110..
.....000HHH00...
.....0HH00H0....
......0HH00.....
.......010......` );
const grabbing_up    = new Texture( bitmap`
.....000000.....
....0HHHHHH0....
...0HHHHHHHH0...
...0HHHHHHHH0...
...0HHHHHHHH0...
...0HHHHHHHH0...
...00HHHHHH00...
...0H000000H0...
....01111110....
...0000000000...
..010HH11HH010..
...00HHHHHH00...
....00000000....
....0HHHHHH0....
....0H0000H0....
....010..010....` );
const grabbing_down  = new Texture( bitmap`
....00000000....
...0HHHHHHHH0...
..0HHHHHHHHHH0..
..0HH00000HHH0..
..000111110000..
..001101101100..
...0110110110...
...01LL11LL10...
...0011111100...
...0000000000...
..010HH11HH010..
...00HHHHHH00...
....00000000....
....0HHHHHH0....
....0H0000H0....
....010..010....` );

const frozen_standing_down  = new Texture( bitmap`
....00000000....
...0LLLLLLLL0...
..0LLLLLLLLLL0..
..0LL00000LLL0..
..000111110000..
..001101101100..
...0110110110...
...01LL11LL10...
...0011111100...
...0000000000...
..010LL11LL010..
..010LLLLLL010..
..010000000010..
..000LLLLLL000..
....0L0000L0....
....010..010....` );

class PlayerSprite {

  constructor(x, y){
    this.textureHandler = new MultiTextureHandler();
    this.textureHandler.addTexture(standing_left);    //Standing Left
    this.textureHandler.addTexture(standing_right);   //Standing Right
    this.textureHandler.addTexture(standing_up);      //Standing Up
    this.textureHandler.addTexture(standing_down);    //Standing Down
    this.textureHandler.addTexture(grabbing_left);    //Grabbing Left
    this.textureHandler.addTexture(grabbing_right);   //Grabbing Right
    this.textureHandler.addTexture(grabbing_up);      //Grabbing Up
    this.textureHandler.addTexture(grabbing_down);    //Grabbing Down
    this.direction = Dir.right;
    this.grabbing = false;
    this.moveTimer = 0;
    this.moveTime = 3;
    this.grabMulti = 1.5;
    this.grabable = [crate, crate_edge, crate_below];
    this.keys = 0;
    this.collectables = []
  }

  collect(name){
    if (name == "key"){
      this.giveKey();
    }else{
      this.collectables.push(name);
    }
  }

  removeCollectable(name){
    if (name == "key"){
      this.takeKey();
    }else{
      const index = this.collectables.indexOf(name);
      if (index !== -1) {
        this.collectables.splice(index, 1);
      }
    }
  }
  
  hasKey(){
    return (this.keys>0);
  }

  giveKey(){
    this.keys++;
  }

  useKey(){
    this.keys--;
  }

  takeKey() {
    this.keys--;
  }

  setPosition(x, y){
    const p = getFirst(player);
    p.x = x;
    p.y = y;
  }
  
  getBitmap(){
    return this.textureHandler.getBitmap();
  }

  up(){
    const p = getFirst(player);
    if (this.grabbing){
      if (this.direction == Dir.down){
      }else if (this.direction == Dir.up){
        this.direction = ((Math.random() > 0.5)?Dir.right:Dir.left);
        this.updateTexture();
        return;
      }else{
        this.direction = Dir.down;
        this.updateTexture();
        return;
      }
      if (!isMovable(p.x, p.y+1)){
        return;
      }
      if (!canMoveUp(p.x, p.y)){
        return;
      }
      if (this.moveTimer >= this.moveTime * this.grabMulti){
        p.y -= 1;
        this.moveTimer = 0;
        moveSprites(p.x, p.y+2, p.x, p.y+1, this.grabable);
      }
    }else {
      if (this.direction == Dir.up){
        if (!canMoveUp(p.x, p.y)){
          return;
        }
        if (this.moveTimer >= this.moveTime){
          p.y -= 1;
          this.moveTimer = 0;
        }
      }else if (this.direction == Dir.down){
        this.direction = ((Math.random() > 0.5)?Dir.left:Dir.right);
      }else{
        this.direction = Dir.up;
      }
    }
    this.updateTexture();
  }

  down(){
    const p = getFirst(player);
    if (this.grabbing){
      if (this.direction == Dir.up){
      }else if (this.direction == Dir.down){
        this.direction = ((Math.random() > 0.5)?Dir.right:Dir.left);
        this.updateTexture();
        return;
      }else{
        this.direction = Dir.up;
        this.updateTexture();
        return;
      }
      if (!canMoveDown(p.x, p.y)){
        return;
      }
      if (!isMovable(p.x, p.y-1)){
        return;
      }
      if (this.moveTimer >= this.moveTime * this.grabMulti){
        getFirst(player).y += 1;
        this.moveTimer = 0;
        moveSprites(p.x, p.y-2, p.x, p.y-1, this.grabable);
      }
    }else {
      if (this.direction == Dir.down){
        if (!canMoveDown(p.x, p.y)){
          return;
        }
        if (this.moveTimer >= this.moveTime){
          getFirst(player).y += 1;
          this.moveTimer = 0;
        }
      }else if (this.direction == Dir.up){
        this.direction = ((Math.random() > 0.5)?Dir.left:Dir.right);
      }else{
        this.direction = Dir.down;
      }
    }
    this.updateTexture();
  }

  left(){
    const p = getFirst(player);
    if (this.grabbing){
      if (this.direction == Dir.right){
      }else if (this.direction == Dir.left){
        this.direction = ((Math.random() > 0.5)?Dir.up:Dir.down);
        this.updateTexture();
        return;
      }else{
        this.direction = Dir.right;
        this.updateTexture();
        return;
      }
      if (!isMovable(p.x+1, p.y)){
        return;
      }
      if (!canMoveLeft(p.x, p.y)){
        return;
      }
      if (this.moveTimer >= this.moveTime * this.grabMulti){
        getFirst(player).x -= 1;
        this.moveTimer = 0;
        moveSprites(p.x+2, p.y, p.x+1, p.y, this.grabable);
      }
    }else {
      if (this.direction == Dir.left){
        if (!canMoveLeft(p.x, p.y)){
          return;
        }
        if (this.moveTimer >= this.moveTime){
          getFirst(player).x -= 1;
          this.moveTimer = 0;
        }
      }else if (this.direction == Dir.right){
        this.direction = ((Math.random() > 0.5)?Dir.up:Dir.down);
      }else{
        this.direction = Dir.left;
      }
    }
    this.updateTexture();
  }

  right(){
    const p = getFirst(player);
    if (this.grabbing){
      if (this.direction == Dir.left){
      }else if (this.direction == Dir.right){
        this.direction = ((Math.random() > 0.5)?Dir.up:Dir.down);
        this.updateTexture();
        return;
      }else{
        this.direction = Dir.left;
        this.updateTexture();
        return;
      }
      if (!isMovable(p.x-1, p.y)){
        return;
      }
      if (!canMoveRight(p.x, p.y)){
        return;
      }
      if (this.moveTimer >= this.moveTime * this.grabMulti){
          getFirst(player).x += 1;
          this.moveTimer = 0;
          moveSprites(p.x-2, p.y, p.x-1, p.y, this.grabable);
      }
    }else {
      if (this.direction == Dir.right){
        if (!canMoveRight(p.x, p.y)){
          return;
        }
        if (this.moveTimer >= this.moveTime){
          getFirst(player).x += 1;
          this.moveTimer = 0;
        }
      }else if (this.direction == Dir.left){
        this.direction = ((Math.random() > 0.5)?Dir.up:Dir.down);
      }else{
        this.direction = Dir.right;
      }
    }
    this.updateTexture();
  }

  update(){
    this.moveTimer += 1;
  }
  
  updateTexture(){
    let texture = this.direction;
    if (this.grabbing) texture += 4;
    this.textureHandler.setTexture(texture);
  }
  
}



let playerSprite;
const player                       = "p"
const frozen_player                = "P"
const player_up                    = "0"
const wall                         = "w"
const wall_edge                    = "W"
const broken_wall                  = "-"
const crate                        = "c"
const crate_edge                   = "C"
const crate_below                  = "&"
const crate_top                    = "7"
const floor                        = "f"
const coin                         = "*"
const button                       = "b"
const button_pressed               = "B"
const lever_off                    = "l";
const lever_on                     = "L";
const lamp_off                     = "[";
const lamp_on                      = "]";
const vertical_door_closed         = "1"
const vertical_door_open           = "2"
const horizontal_door_closed       = "3"
const horizontal_door_open         = "4"
const horizontal_door_fix          = "5"
const stairs                       = "s"
const wall_solid                   = "S"
const wall_top                     = "t"
const wall_edge_flipped            = "^"
const floor_up_ladder              = ">";
const floor_down_ladder            = "<";
const toggle_state1                = "(";
const toggle_state2                = ")";
const invisible                    = "i";
const hole                         = "h";
const key                          = "k";
function updateLegend(){
  setLegend(
    [wall_top, wall_top_map],
    [ crate_top, crate_top_map ],
    [ horizontal_door_fix, horizontal_door_fix_map ],
    [ player, getBitmap(playerSprite)],
    [ key, key_map],
    [ wall, wall_map],
    [ wall_edge, wall_edge_map ],
    [ invisible, invisible_map ],
    [ hole, hole_map ],
    [ broken_wall, bitmap`
00LLLLLLLLLLLLL0
0L11L111L1111LLL
L1L1LL11L11111LL
L1LL1111L111111L
L11L1L11L111111L
LLLL00LLLLL0LLLL
L111L0L111L1111L
L111LLL11L11111L
L11L1L11L1L1L11L
L1111L11111L111L
LLLLLLLLLLL00LLL
L111111L111LL11L
L111L11L11L1L11L
L1LL111L1111LLLL
LL11111L111111L0
00LLLLLLLLLLLL00` ],
    /*[ crate, bitmap`
CCCCCCCCCCCCCCCC
CCFFFFFFFFFFFFCC
CFCFFFFFFFFFFCFC
CFFCFFFFFFFFCFFC
CFFFCFFFFFFCFFFC
CFFFFCFFFFCFFFFC
CFFFFFCFFCFFFFFC
CFFFFFFCCFFFFFFC
CFFFFFFCCFFFFFFC
CFFFFFCFFCFFFFFC
CFFFFCFFFFCFFFFC
CFFFCFFFFFFCFFFC
CFFCFFFFFFFFCFFC
CFCFFFFFFFFFFCFC
CCFFFFFFFFFFFFCC
CCCCCCCCCCCCCCCC`],*/
    [ crate, crate_map ],
    [ floor, floor_map ],
    [ crate_edge, crate_edge_map ],
    [ crate_below, crate_below_map ],
    [ coin, bitmap`
................
.........00.....
.......006600...
......06666660..
....LL06666660..
....L0666666660.
....L0666FF6660.
..LLLL06F00F60..
.LL00000066000..
LL0666F066660...
L0666F06666660..
L0666F06666660..
L06666F066660...
LL06660006600...
..L000LLL00.....
................`],
    [ button, button_map ],
    [ button_pressed, button_pressed_map ],
    [ lever_off, lever_off_map ],
    [ lever_on, lever_on_map],
    [ toggle_state1, toggle_state1_map ],
    [ toggle_state2, toggle_state2_map],
    [ lamp_off, lamp_off_map ],
    [ lamp_on, lamp_on_map],
    [ vertical_door_closed, vertical_door_closed_map ],
    [ vertical_door_open, vertical_door_open_map ],
    [ horizontal_door_closed, horizontal_door_closed_map ],
    [ horizontal_door_open, horizontal_door_open_map ],
    [ frozen_player, getBitmap(frozen_standing_down)],
    [ stairs, stairs_map ],
    [wall_solid, wall_solid_map],
    [wall_edge_flipped, wall_edge_flipped_map],
    [ floor_up_ladder, floor_up_ladder_map ],
    [ floor_down_ladder, floor_down_ladder_map ]
  )
}


updateLegend();

setSolids([player, wall, crate, wall_edge,
           crate_edge, crate_below, vertical_door_closed,
           horizontal_door_closed, wall_edge_flipped,
           wall_solid])

let level = 0
const levels = [
  
  
]

//setMap(levels[level])

setPushables({
  [ player ]: [ crate, crate_edge, crate_below ],
  [ crate ]: [ crate, crate_edge, crate_below ],
  [ crate_edge ]: [ crate, crate_edge, crate_below ],
  [ crate_below ]: [ crate, crate_edge, crate_below ]
})

function setLevel(level){
  setMap(levels[level])
}


updateLegend();
function beforeInput(){
  
}

setBackground(floor)
/*map`
w1wWWWwWWw
w.wbC.w..w
w.WWWsW..w
w.SSSsS.sw
w.Swttttsw
w.SSSSSSsS
w..SSSSS1^
Wb....C.pW`*/




let _floor;
let _level;

//

_level = new Level();

_floor = new Floor(true, false, true);
_floor.setMap(map`
wWWWWWWWWw
w........w
w........w
w........w
w........w
wp.......4
w........w
WWWWWWWWWW`)
_floor.addText("To walk use", {
  y: 4,
  color: color`0`
})
_floor.addText("wasd. And on", {
  y: 5,
  color: color`0`
})
_floor.addText("the door press", {
  y: 6,
  color: color`0`
})
_floor.addText("J to continue.", {
  y: 7,
  color: color`0`
})
{
  const selection = new GridRange(0, 0, 9, 7);
  const fall = new FallLogic(selection, true);
  _floor.addOnFall(fall);
}
_floor.addExit(9, 5, 1, 5, "tutorial", 1);

_level.addFloor(_floor)

//

_floor = new Floor();
_floor.setMap(map`
wWWWWWWWWw
w........w
w........w
w........w
w........w
wp...b...4
w........w
WWWWWWWWWW`)
_floor.addText("You can press", {
  y: 3,
  color: color`0`
})
_floor.addText("buttons by", {
  y: 4,
  color: color`0`
})
_floor.addText("standing on them", {
  y: 5,
  color: color`0`
})
_floor.addText("And they can", {
  y: 6,
  color: color`0`
})
_floor.addText("control doors", {
  y: 7,
  color: color`0`
})
{
  const button = new LogicButton(5, 5);
  const door = new LogicDoor(9, 5, button, true);
  _floor.addUpdateable(door);
}
_floor.addExit(9, 5, 1, 6, "tutorial", 2);


_level.addFloor(_floor)

//

_floor = new Floor();
_floor.setMap(map`
wWWWWWWWWw
w........w
w........w
w........w
w........w
wp.C.....4
w........w
WWWWWWWWWW`)
_floor.addText("You can push", {
  y: 2,
  color: color`0`
})
_floor.addText("crates. And you", {
  y: 3,
  color: color`0`
})
_floor.addText("can press I to", {
  y: 4,
  color: color`0`
})
_floor.addText("toggle grab mode", {
  y: 5,
  color: color`0`
})
_floor.addText("allowing you", {
  y: 6,
  color: color`0`
})
_floor.addText("to move crates", {
  y: 7,
  color: color`0`
})
_floor.addText("backwards.", {
  y: 8,
  color: color`0`
})
_floor.addExit(9, 5, 1, 5, "tutorial", 3);

_level.addFloor(_floor)


//

_floor = new Floor();
_floor.setMap(map`
wWWWWWWWWw
w........w
w........w
w........4
wt..tttttw
^SssSSSSS^
wp...C.b.w
WWWWWWWWWW`)
_floor.addText("There also can", {
  y: 2,
  color: color`0`
})
_floor.addText("be multiple", {
  y: 3,
  color: color`0`
})
_floor.addText("heights, and", {
  y: 4,
  color: color`0`
})
_floor.addText("crates can", {
  y: 5,
  color: color`0`
})
_floor.addText("also press", {
  y: 6,
  color: color`0`
})
_floor.addText("buttons", {
  y: 7,
  color: color`0`
})
_floor.addText("", {
  y: 8,
  color: color`0`
})
{
  const button = new LogicButton(7, 6);
  const door = new LogicDoor(9, 3, button);
  _floor.addUpdateable(door);
}
_floor.addExit(9, 3, 1, 5, "tutorial", 4);

_level.addFloor(_floor)

//

_floor = new Floor();
_floor.setMap(map`
wWWWWWWWWw
w........w
w........w
w........w
w........w
w....>...w
wp.......4
WWWWWWWWWW`)
_floor.addText("Each level can", {
  y: 2,
  color: color`0`
})
_floor.addText("also have", {
  y: 3,
  color: color`0`
})
_floor.addText("multiple floors", {
  y: 4,
  color: color`0`
})
_floor.addText("which can be", {
  y: 5,
  color: color`0`
})
_floor.addText("traveled between", {
  y: 6,
  color: color`0`
})
_floor.addText("using ladders to", {
  y: 7,
  color: color`0`
})
_floor.addText("use a ladder to", {
  y: 8,
  color: color`0`
})
_floor.addText("go up press w", {
  y: 9,
  color: color`0`
})
_floor.addText("when on it", {
  y: 10,
  color: color`0`
})
let tutorial_next_level = new Floor();
{
  const receiver = new LogicReciever(tutorial_next_level, "tutorial_example");
  const door = new LogicDoor(9, 6, receiver);
  _floor.addUpdateable(door);
}
_floor.addExit(9, 6, 1, 5, "tutorial", 5);


_level.addFloor(_floor)

//

_floor = tutorial_next_level;
_floor.setMap(map`
wWWWWWWWWw
w........w
w........w
w........w
w........w
w.Cb.<...w
wp.......w
WWWWWWWWWW`)
_floor.addText("And to go down", {
  y: 2,
  color: color`0`
})
_floor.addText("press s while", {
  y: 3,
  color: color`0`
})
_floor.addText("standing on it. ", {
  y: 4,
  color: color`0`
})
_floor.addText("logic like", {
  y: 5,
  color: color`0`
})
_floor.addText("buttons can also ", {
  y: 6,
  color: color`0`
})
_floor.addText("travel between", {
  y: 7,
  color: color`0`
})
_floor.addText("floors", {
  y: 8,
  color: color`0`
})
_floor.addText("", {
  y: 9,
  color: color`0`
})
_floor.addText("", {
  y: 10,
  color: color`0`
})
{
  const button = new LogicButton(3, 5);
  const transmitter = new LogicTransmitter(button, _floor, "tutorial_example");
}


_level.addFloor(_floor)


_level.setFloor(0)


Levels.registerLevel("tutorial", _level);

//

_level = new Level();

// Floor 1
_floor = new Floor();
_floor.setMap(map`
w1wWWWw>Ww
w.wbC.w..w
w.WWWsW..w
w.SSSsS.sw
w.Swttttsw
w.SSSSSSsS
w..SSSSS1^
Wb....C.pW`)
{
  const button1 = new LogicButton(1, 7);
  const button2 = new LogicButton(3, 1);
  const connection = new LogicConnection("and", button1, button2);
  const door1 = new LogicDoor(1,0, connection);
  const door2 = new LogicDoor(8,6, button1, true);
  _floor.addUpdateable(door1);
  _floor.addUpdateable(door2);
  _floor.addExit(1, 0, 1, 7, "level2", 0)
}
_level.addFloor(_floor);

// Floor 2

_floor = new Floor();
_floor.setMap(map`
wWWWWWWWWw
w......<.w
w........w
w........w
w........w
w........w
w........w
WWWWWWWWWW`)
_floor.addSprite(7, 1, player)
_level.addFloor(_floor);

Levels.registerLevel("level1", _level);

//
_level = new Level();

_floor = new Floor();
_floor.setMap(map`
wWWWWWWWWw
w........w
w........w
w.iih....w
w.iih....w
w........w
w........w
W2WWWWWWWW`)
_floor.addExit(1, 7, 1, 0, "level1", 0);
_floor.addSprite(1, 7, player)
_level.addFloor(_floor)

Levels.registerLevel("level2", _level);

let current_level = null;
function load_level(level){
  if (current_level != null){
    current_level.exit();
  }
  level.load();
  current_level = level;
}
load_level(Levels.lookupLevel("tutorial"));


playerSprite = new PlayerSprite(getFirst(player).x, getFirst(player).y);
playerSprite.updateTexture();
updateLegend();
const collectables = [
  [key, "key"]
]
const updateLoop = setInterval(() => {
  // door1.update();
  // door2.update();
  //console.log(getAll().length)
  playerSprite.update();
  current_level.update();
  let crates;
  let crate_belows;
  let crate_edges;
  crate_belows = getAll(crate_below)
  crate_belows.map((sprite) => {
    if (!hasSprite(sprite.x, sprite.y-1, crate_edge) && !hasSprite(sprite.x, sprite.y-1, crate) && !hasSprite(sprite.x, sprite.y-1, crate_below)){
      sprite.type = crate_edge;
    }
  });
  crate_edges = getAll(crate_edge)
  for (let i = 0; i<crate_edges.length; i++){
    const sprite = crate_edges[i];
    if (hasSprite(sprite.x, sprite.y+1, crate_edge) || hasSprite(sprite.x, sprite.y+1, crate) || hasSprite(sprite.x, sprite.y+1, crate_below)){
      sprite.type = crate;
    }
    if (hasSprite(sprite.x, sprite.y-1, crate_edge) || hasSprite(sprite.x, sprite.y-1, crate) || hasSprite(sprite.x, sprite.y-1, crate_below)){
      sprite.type = crate_below
    }
  };
  crates = getAll(crate)
  
  crates.map((sprite) => {
    if (!hasSprite(sprite.x, sprite.y+1, crate_edge) && !hasSprite(sprite.x, sprite.y+1, crate) && !hasSprite(sprite.x, sprite.y+1, crate_below)){
      sprite.type = crate_edge;
    }
    if (hasSprite(sprite.x, sprite.y-1, crate_edge) || hasSprite(sprite.x, sprite.y-1, crate) || hasSprite(sprite.x, sprite.y-1, crate_below)){
      sprite.type = crate_below
    }
  });
  let crate_tops = getAll(crate_top);
  crate_tops.map((sprite) => {
    sprite.remove();
  });
  crate_edges = getAll(crate_edge)
  crate_edges.map((sprite) => {
    createSprite(sprite.x, sprite.y-1, crate_top)
  });
  crate_belows = getAll(crate_below)
  crate_belows.map((sprite) => {
    createSprite(sprite.x, sprite.y-1, crate_top)
  });
  crates = getAll(crate)
  crates.map((sprite) => {
    createSprite(sprite.x, sprite.y-1, crate_top)
  });
  
  const buttons = getAllSprites([button, button_pressed]);
  buttons.map((sprite) => {
    if (hasAnySprite(sprite.x, sprite.y, [player, crate, crate_edge, crate_below])){
      if (sprite.type == button){
        playTune(button_press);
      }
      sprite.type = button_pressed;
    }
    else{
      if (sprite.type == button_pressed){
        playTune(button_release);
      }
      sprite.type = button;
    }
  });
  
  let door_fixes = getAll(horizontal_door_fix) 
  crate_tops.map((sprite) => {
    sprite.remove();
  });
  const horizontal_doors = getAllSprites([horizontal_door_closed, horizontal_door_open]);
  horizontal_doors.map((sprite) => {
    createSprite(sprite.x, sprite.y, horizontal_door_fix)
  });
  const p = getFirst(player);
  if (hasSprite(p.x, p.y, hole)){
    let _floor = current_level.getCurrentFloor();
    _floor.fall(p.x, p.y);
  }

  collectables.map((collectable) => {
    getAll(collectable[0]).map((sprite)=>{
      if (sprite.x == p.x && sprite.y == p.y){
        let _floor = current_level.getCurrentFloor();
        playerSprite.collect(collectable[1]);
        sprite.remove();
        _floor.collect(p.x, p.y, collectable[0]);
      }
    })
  });
}, 50);

onInput("w", () => {
  const p = getFirst(player);
  if (hasSprite(p.x, p.y-1, floor_up_ladder) && current_level.canGoUp()){
    current_level.goUpFloor();
  }else{
    beforeInput();
    playerSprite.up();
  }
})

onInput("a", () => {
  beforeInput()
  playerSprite.left()
})

onInput("s", () => {
  const p = getFirst(player);
  if (hasSprite(p.x, p.y, floor_down_ladder) && current_level.canGoDown()){
    current_level.goDownFloor();
  }else{
    beforeInput();
    playerSprite.down();
  }
})

onInput("d", () => {
  beforeInput()
  playerSprite.right()
})

onInput("i", () => {
  playerSprite.grabbing = !playerSprite.grabbing;
  playerSprite.updateTexture();
})

onInput("l", () => {
  current_level.goUpFloor()
})

onInput("k", () => {
  current_level.goDownFloor()
})

onInput("j", () => {
  const p = getFirst(player);
  current_level.tryToExit(p.x, p.y);

  const levers = getAllSprites([lever_off, lever_on]);
  levers.map((sprite) => {
    if (hasAnySprite(sprite.x, sprite.y, [player])){
      playTune(button_press);
      if (sprite.type == lever_off){
        sprite.type = lever_on;
      }else{
        sprite.type = lever_off;
      }
    }
  });
});


afterInput(() => {
  updateLegend();
  //playerSprite.update();
  
})