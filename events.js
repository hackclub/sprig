import { dispatch } from "./dispatch.js";
import { addDropUpload } from "./events/addDropUpload.js";

const trigger = (e) => e.composedPath()[0];
const matchesTrigger = (e, selectorString) =>
  trigger(e).matches(selectorString);
// create on listener
export const createListener =
  (target) => (eventName, selectorString, event) => {
    // focus doesn't work with this, focus doesn't bubble, need focusin
    target.addEventListener(eventName, (e) => {
      e.trigger = trigger(e); // Do I need this? e.target seems to work in many (all?) cases
      if (selectorString === "" || matchesTrigger(e, selectorString)) event(e);
    });
  };

function saveGame(state) {
  const string = state.codemirror.state.doc.toString();
  const match = string.match(/@title:\s+([^\n]+)/);
  const name = (match !== null) ? match[1] : "draft";
  const newSave = [ name, string ];
  const currentGames = state.savedGames
    .filter( x => x[0] !== name)
    .slice(0, 4);
  const toSave = [ newSave, ...currentGames ]
  window.localStorage.setItem("puzzle-lab", JSON.stringify(toSave) );
}

export function addEvents(state) {
  const bodyListener = createListener(document.body);
  bodyListener("keydown", "", function (event) {
    let code = event.code;

    saveGame(state);

    if (code === "Enter" && (event.shiftKey || event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      dispatch("RUN");
    }
  });

  window.addEventListener("unload", () => {
   saveGame(state);
  })

  // addNumberDragging(state, bodyListener);
  addDropUpload(state, bodyListener);
}