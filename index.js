import { init } from "./engine/gamelab_functions.js";

const canvas = document.querySelector("canvas");

const gf = init(canvas);

window.setScreenSize = gf.setScreenSize;
window.setLegend = gf.setLegend; 
window.addLayer = gf.addLayer; 
window.setTile = gf.setTile; 
window.getTile = gf.getTile; 
window.addTile = gf.addTile; 
window.clearTile = gf.clearTile; 
window.everyTile = gf.everyTile; 
window.tileContains = gf.tileContains; 
window.addRule = gf.addRule; 
window.onTileCollision = gf.onTileCollision; 
window.onTileInput = gf.onTileInput; 
window.makeSolid = gf.makeSolid; 
window.makePushable = gf.makePushable; 
window.replace = gf.replace; 
window.afterInput = gf.afterInput; 
window.getTileGrid = gf.getTileGrid; 
window.getTileAll = gf.getTileAll; 
window.clear = gf.clear; 
window.setZOrder = gf.setZOrder;
window.sprite = gf.sprite;
window.start = gf.start;