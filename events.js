import { dispatch } from "./dispatch.js";
import { addDropUpload } from "./events/addDropUpload.js";
import { addVerticalBar } from "./events/addVerticalBar.js";
import { saveGame } from "./saveGame.js"

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

function hasSomeParentTheClass(element, classname) {
  if (element.className === "") return false;

  if (element.className.split(' ').indexOf(classname)>=0) return true;
  
  return element.parentNode && hasSomeParentTheClass(element.parentNode, classname);
}

export function addEvents(state) {
  const bodyListener = createListener(document.body);
  bodyListener("keydown", "", function (event) {

    const active = document.activeElement;
    const isCM = active ? hasSomeParentTheClass(active, "code-container") : false;

    if (isCM) {
      // set code to stale
      const rerender = !state.stale;
      state.stale = true;

      if (rerender) dispatch("RENDER");
    }

    let code = event.code;
    
    if (code === "Enter" && (event.shiftKey || event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      dispatch("RUN");
    }
  });

  bodyListener("mousedown", ".docs-trigger", function (event) {
    dispatch("DOC_OPEN");
  });

  window.addEventListener("unload", () => {
   saveGame(state);
  })

  addVerticalBar(state, bodyListener);
  // addNumberDragging(state, bodyListener);
  addDropUpload(state, bodyListener);
}
