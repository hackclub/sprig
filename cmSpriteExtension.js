// Provides the sprite chooser functionality to the CodeMirror editor.
// If additional similar features need to be added it makes sense to use this file for those as well and have a single extension

import {
    WidgetType,
    Decoration,
    ViewPlugin
} from "./pkg/@codemirror/view.js";
import { syntaxTree } from "./pkg/@codemirror/language.js";
import { html, render } from "./pkg/uhtml.js";
import { STATE } from "./dispatch.js";

function getDataURL(spriteData) {
    const imageData = new ImageData(
        new Uint8ClampedArray(spriteData.colors.flat()),
        spriteData.size[0],
        spriteData.size[1]
    );

    const canvas = document.createElement("canvas");
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    canvas.getContext("2d").putImageData(imageData, 0, 0);

    return canvas.toDataURL();
}

const spriteImg = (spriteId, s) => html`
    <img
        src=${getDataURL(STATE.sprites[spriteId])}
        alt=${spriteId + " sprite thumbnail"}
        style=${`border:1px solid;background-color:white;image-rendering:pixelated;${s}`}
    />
`;

class SpriteWidget extends WidgetType {
    constructor(val, view, from, to) {
        super();
        this.val = val;
        this.view = view;
        this.from = from;
        this.to = to;
        this.updateListener = this.updateListener.bind(this);
        this.popupOpen = false;
    }

    eq(other) { return other.val === this.val; }

    r() {
        render(this.domNode, html`
            <div style="display:flex;position:relative;cursor:pointer" class="cm-sprite-widget" onclick=${() => { this.popupOpen = !this.popupOpen; this.r(); }}>
                ${(this.val && STATE.sprites[this.val]) ? spriteImg(this.val) : null}
                <button>v</button>
                ${this.popupOpen ? html`
                    <div
                        style="position:absolute;top:100%;cursor:initial;background-color:white;width:300px;max-height:200px;overflow:auto;border:1px solid red;padding:0.5rem"
                        onclick=${e => e.stopPropagation()}
                    >
                        <h5 style="margin:0;margin-bottom:0.5rem">Sprites</h5>
                        ${Object.keys(STATE.sprites).map(sprite => html`
                            <button
                                style=${`display:inline-block;position:relative;width:100px;cursor:${sprite === this.val ? "not-allowed" : "inherit"}`}
                                onclick=${() => {
                                    // Do the code mutation
                                    this.view.dispatch({
                                        changes: {
                                            from: this.from,
                                            to: this.to,
                                            insert: sprite
                                        }
                                    });
                                    dispatch("RUN");
                                    // Closes since codemirror deletes this instance of the widget and makes a new one
                                }}
                                disabled=${sprite === this.val ? true : null}
                            >
                                ${spriteImg(sprite, "width: 75px")}
                                <p style="margin:0">${sprite}</p>
                                ${sprite === this.val ? html`
                                    <span style="position:absolute;top:0;right:0;color:green;font-size:1.5rem">✓</span>
                                ` : null}
                            </button>
                        `)}
                        <button onclick=${() => { this.popupOpen = false; this.r(); }} style="position:absolute;top:0;right:0">x</button>
                    </div>
                ` : null}
            </div>
        `);
    }

    updateListener(e) {
        if((e.detail?.name ?? STATE.selected_sprite) === this.val || e.detail?.every) {
            this.r();
        }
    }

    toDOM() {
        const wrap = document.createElement("span");
        wrap.style = "display:inline-block;margin-right:0.5rem;vertical-align:bottom;white-space:initial";
        this.domNode = wrap;

        document.addEventListener("spriteupdate", this.updateListener);

        this.r();
        return wrap;
    }

    destroy() {
        document.removeEventListener("spriteupdate", this.updateListener);
    }

    ignoreEvent() { return false; }
}

let engineVariableName;

function makeSpriteWidgets(view) {
    const widgets = [];
    const { state } = view;
    const syntax = syntaxTree(state);

    syntax.iterate({
        enter: (type, from) => {
            function engineVariableNameTraverser() {
                // This is heavily inspired by the way Prisma finds queries in its
                // CodeMirror plugin: https://github.com/prisma/text-editors/blob/main/src/extensions/prisma-query/find-queries.ts
            
                // We are trying to find the variable name holding the engine
                // We want to match statements that look like `const e = createEngine(/* ... */);`
                // Currently, if this is a matching statement, `type` would be pointing here:
                // const e = createEngine()
                //           |------------|
            
                // If it doesn't match this pattern, return
                if(type.name !== "CallExpression") return;
            
                // const e = createEngine()
                //           |----------|
                const callIdentifier = syntax.resolve(from, 1);
                if(callIdentifier?.name !== "VariableName") return;
            
                const callIdentifierName = state.sliceDoc(callIdentifier.from, callIdentifier.to);
                if(callIdentifierName !== "createEngine") return;
            
                // Ok, it's a call to createEngine, so let's see if it's inside a variable assignment
                // const e = createEngine()
                // |----------------------|
                const varDeclaration = callIdentifier.parent.parent;
                if(varDeclaration?.name !== "VariableDeclaration") return;
            
                // Now get the variable name
            
                // const e = createEngine()
                // |---|
                const constDeclaration = varDeclaration.firstChild;
            
                // const e = createEngine()
                //       |
                const variableName = constDeclaration.nextSibling;
                if(variableName?.name !== "VariableDefinition") return;
            
                return state.sliceDoc(variableName.from, variableName.to);
            }
            
            function widgetMakerTraverser() {
                // Can't be a call to [engine instance].add if there isn't a defined engine
                if(!engineVariableName) return;
            
                // e.add({ sprite: [sprite_name | something else] })
                // |-----------------------------------------------|
                if(type.name !== "CallExpression") return;
            
                // e.add({ sprite: [sprite_name | something else] })
                // |
                const callEngineIdentifier = syntax.resolve(from, 1);
                if(callEngineIdentifier?.name !== "VariableName") return;
                const callEngineIdentifierName = state.sliceDoc(callEngineIdentifier.from, callEngineIdentifier.to);
                if(callEngineIdentifierName !== engineVariableName) return;
            
                // e.add({ sprite: [sprite_name | something else] })
                // |---|
                const memberExpression = callEngineIdentifier.parent;
                if(memberExpression?.name !== "MemberExpression") return;
            
                // e.add({ sprite: [sprite_name | something else] })
                //   |-|
                const mExpProps = memberExpression.getChildren("PropertyName");
                if(mExpProps.length !== 1) return;
                const mExpPropName = state.sliceDoc(mExpProps[0].from, mExpProps[0].to);
                if(mExpPropName !== "add") return;

                // e.add({ sprite: [sprite_name | something else] })
                //       |----------------------------------------|
                const argList = callEngineIdentifier.parent.parent.getChild("ArgList");
                if(!argList) return;
                const paramObject = argList.firstChild.nextSibling;
                if(paramObject?.name !== "ObjectExpression") return;

                // e.add({ sprite: [sprite_name | something else] })
                //         |------------------------------------|
                const spriteProp = paramObject.getChildren("Property").find(p => {
                    const pDef = p.getChild("PropertyDefinition");
                    return pDef && state.sliceDoc(pDef.from, pDef.to) === "sprite";
                });
                if(!spriteProp) return;

                const propColon = spriteProp.firstChild.nextSibling;

                if(propColon?.name !== ":") return;

                // e.add({ sprite: [sprite_name | something else] })
                //                 |----------------------------|

                const isErrored = spriteProp.getChildren("⚠").length > 0;
                let val = !isErrored ? propColon.nextSibling : propColon;
                
                return {
                    from: !isErrored ? val.from : val.from + 1,
                    to: !isErrored ? val.to : null,
                    value: val?.name === "VariableName" && state.sliceDoc(val.from, val.to)
                };
            }

            let res;
            if(res = engineVariableNameTraverser()) {
                engineVariableName = res;
            } else if(res = widgetMakerTraverser()) {
                widgets.push(Decoration.widget({
                    widget: new SpriteWidget(res.value, view, res.from, res.to),
                    side: 0
                }).range(res.from));
            }
        }
    });

    return Decoration.set(widgets);
}

const spritePlugin = ViewPlugin.fromClass(class {
    constructor(view) {
        this.decorations = makeSpriteWidgets(view);
    }

    update(update) {
        if(update.docChanged || update.viewportChanged) {
            this.decorations = makeSpriteWidgets(update.view);
        }
    }
}, {
    decorations: v => v.decorations,
    eventHandlers: {
        mousedown: e => {
            if(e.target.closest(".cm-sprite-widget")) return true;
        }
    }
});

export default spritePlugin;