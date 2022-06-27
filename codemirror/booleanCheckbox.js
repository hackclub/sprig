import {
  WidgetType,
  Decoration,
  ViewPlugin
} from "@codemirror/view";
import { syntaxTree } from "@codemirror/language";
import { dispatch } from "../dispatch.js";

class CheckboxWidget extends WidgetType {
  constructor(checked) {
    super();
    this.checked = checked;
  }

  eq(other) { return other.checked === this.checked; }
  ignoreEvent() { return false; }

  toDOM() {
    const container = document.createElement("span");
    container.classList.add("cm-boolean-toggle");
    container.setAttribute("aria-hidden", "true");
    
    const checkbox = container.appendChild(document.createElement("input"));
    checkbox.type = "checkbox";
    checkbox.checked = this.checked;

    return container;
  }
}

function checkboxes(view) {
  const widgets = [];
  const syntax = syntaxTree(view.state);

  for (const { from, to } of view.visibleRanges) {
    syntax.iterate({
      from,
      to,
      enter(node) {
        if (node.name !== "BooleanLiteral") return;
        const isTrue = view.state.doc.sliceString(node.from, node.to) === "true";
        const decoration = Decoration.widget({
          widget: new CheckboxWidget(isTrue),
          side: 0
        });
        widgets.push(decoration.range(node.from));
      }
    });
  }
  
  return Decoration.set(widgets);
}

function toggleBoolean(view, pos) {
  const before = view.state.doc.sliceString(pos, pos + 5)

  let changes
  if (before === "false")
    changes = { from: pos, to: pos + 5, insert: "true" };
  else if (before.startsWith("true"))
    changes = { from: pos, to: pos + 4, insert: "false" };
  else return false;

  view.dispatch({ changes });
  dispatch("RUN");
  return true;
}

export default ViewPlugin.fromClass(class {
  constructor(view) {
    this.decorations = checkboxes(view);
  }

  update(update) {
    if (update.docChanged || update.viewportChanged)
      this.decorations = checkboxes(update.view);
  }
}, {
  decorations: (view) => view.decorations,
  eventHandlers: {
    mousedown: (event, view) => {
      if (event.target.nodeName === "INPUT" && event.target.parentElement.classList.contains("cm-boolean-toggle"))
        return toggleBoolean(view, view.posAtDOM(event.target));
    }
  }
})