// https://codemirror.net/6/examples/decoration/

import {
    WidgetType,
    Decoration,
    ViewPlugin
} from "../pkg/@codemirror/view.js";
import { syntaxTree } from "../pkg/@codemirror/language.js";
import { dispatch } from "../dispatch.js";

class CheckboxWidget extends WidgetType {
    constructor(checked) {
        super();
        this.checked = checked;
    }

    eq(other) { return other.checked == this.checked; }

    toDOM() {
        const wrap = document.createElement("span");
        wrap.setAttribute("aria-hidden", "true");
        wrap.className = "cm-boolean-toggle";
        const box = wrap.appendChild(document.createElement("input"));
        box.type = "checkbox";
        box.checked = this.checked;
        return wrap;
    }

    ignoreEvent() { return false; }
}

function makeCheckboxWidgets(view) {
    const widgets = [];

    for(const { from, to } of view.visibleRanges) {
        syntaxTree(view.state).iterate({
            from, to,
            enter: (type, from, to) => {
                if(type.name === "BooleanLiteral") {
                    const isTrue = view.state.doc.sliceString(from, to) === "true";
                    const deco = Decoration.widget({
                        widget: new CheckboxWidget(isTrue),
                        side: 0
                    });
                    widgets.push(deco.range(from));
                }
            }
        });
    }

    return Decoration.set(widgets);
}

function toggleBooleanCodeMutation(view, pos) {
    const before = view.state.doc.sliceString(pos, pos + 5);
    const changes =
        before === "false" ? {
            from: pos, to: pos + 5, insert: "true"
        } : before.startsWith("true") ? {
            from: pos, to: pos + 4, insert: "false"
        } : false;

    view.dispatch({ changes });
    dispatch("RUN");
    return true;
}

const checkboxPlugin = ViewPlugin.fromClass(class {
    constructor(view) {
        this.decorations = makeCheckboxWidgets(view);
    }

    update(update) {
        if(update.docChanged || update.viewportChanged) {
            this.decorations = makeCheckboxWidgets(update.view);
        }
    }
}, {
    decorations: v => v.decorations,
    eventHandlers: {
        mousedown: (e, view) => {
            if(e.target.nodeName === "INPUT" &&
                e.target.parentElement.classList.contains("cm-boolean-toggle")) {
                return toggleBooleanCodeMutation(view, view.posAtDOM(e.target));
            }
        }
    }
});

export default checkboxPlugin;