import { Engine } from "./Engine.js";
import { playTune, loopTune } from "./tunePlayers.js";


export function createEval() {
  let currentEngine = null;
  let tunePlayers = [];

  return evalGameScript;

  function evalGameScript({ assets, prog, show, gameCanvas }) {

    if (prog.includes("localCache")) {
      return new Error(`Error: "localCache" is not allowed in game script.`);
    }
    
    if (tunePlayers.length > 0) {
      tunePlayers.forEach(x => x.end()); 
      tunePlayers = [];
    }

    Engine.show = show;

    const included = {
      playTune() {
        const tunePlayer = playTune(...arguments);
        tunePlayers.push(tunePlayer);

        return tunePlayer;
      },
      gameCanvas,
      loopTune() {
        const tunePlayer = loopTune(...arguments);
        tunePlayers.push(tunePlayer);

        return tunePlayer;
      },
      createEngine(...args) {
        if (currentEngine) cancelAnimationFrame(currentEngine._animId);
        currentEngine = new Engine(...args);
        return currentEngine;
      },
    };

    assets.forEach(asset => {
      included[asset.name] = asset.data;
    })

    try {
      new Function(...Object.keys(included), prog)(
        ...Object.values(included)
      );

      return null;
    } catch (err) {
      return err;
    }

  };
}
