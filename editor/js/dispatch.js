import { html, render, svg } from "https://unpkg.com/lit-html@2.0.1/lit-html.js";
import lzutf8 from "https://cdn.skypack.dev/lzutf8";
import { view } from "./view.js";
import { init } from "./init.js";
import { Engine } from "./Engine.js";

function copy(str) {
	const inp = document.createElement('input');
	document.body.appendChild(inp);
	inp.value = str;
	inp.select();
	document.execCommand('copy', false);
	inp.remove();
}

function showShared() {
	document.querySelector(".shared-modal").classList.toggle("hide");
  setTimeout(() => document.querySelector(".shared-modal").classList.toggle("hide"), 3000);
}


const STATE = {
	codemirror: undefined,
	url: undefined,
	shareType: "airtable",
	examples: [],
	error: false,
	logs: [],
	name: "name-here",
	lastSaved: {
		name: "",
		text: "",
		link: "",
	}
};

const ACTIONS = {
	INIT(args, state) {
		init(state);
	},
	RUN(args, state) {
		const string = state.codemirror.view.state.doc.toString();

		const hasImport = /import\s/.test(string);
		if (hasImport) {
			// how to inject included into this scope?
			const blob = URL.createObjectURL(new Blob([string], {type: 'text/javascript'}));
			import(blob).then(res => {
				// console.log(imported);
				// TODO: these are accumulating how can I clear them out?
				URL.revokeObjectURL(blob);
			});
		} else {
	  	const included = { html, render, svg, Engine }; // these only work if no other imports
	  	(new Function(...Object.keys(included), string))(...Object.values(included));
		}

	},
	SHARE_TYPE({ type }, state) {
		state.shareType = type;
		dispatch("RENDER");
	},
	SHARE({type}, state) {
		const string = state.codemirror.view.state.doc.toString();

		if (state.shareType === "binary-url" && type === "link") {
			const encoded = lzutf8.compress(string, { outputEncoding: "StorageBinaryString" });
			const address = `${window.location.origin}${window.location.pathname}?code=${encoded}`;
	    copy(address);
	    showShared();
		}

		if (state.shareType === "airtable" && type === "link") {
			if (state.lastSaved.name === state.name && state.lastSaved.text === string) {
				copy(state.lastSaved.link);
  			showShared();
				return;
			}

			const url = 'https://airbridge.hackclub.com/v0.2/Saved%20Projects/Live%20Editor%20Projects/?authKey=reczbhVzrrkChMMiN1635964782lucs2mn97s';
			(async () => {
  			const res = await fetch(url, {
			    method: "POST",
			    headers: {'Content-Type': 'application/json'},
			    body: JSON.stringify({
			      "Content": string,
			      "Name": state.name,
			    })
			  }).then(r => r.json())

  			copy(res.fields["Link"]);
  			showShared();
  			state.lastSaved.name = state.name;
  			state.lastSaved.text = string;
  			state.lastSaved.link = res.fields["Link"];
			})()
		}

		if (type === "file") {
			downloadText(`${state.name}.${state.editorType}`,string);
		}	

	},
	RENDERER_TYPE(args, state) {
		dispatch("RENDER");
		dispatch("RUN");
	},
	EDITOR_TYPE(args, state) {
		const string = state.codemirror.view.state.doc.toString();
		dispatch("RENDER");
		state.codemirror = document.querySelector("#code-editor");
		state.codemirror.view.dispatch({
			changes: { from: 0, insert: string }
		});
		dispatch("RUN");
	},
	LOAD_EXAMPLE({ content }, state) {
		const string = state.codemirror.view.state.doc.toString();
		state.codemirror.view.dispatch({
			changes: { from: 0, to: string.length, insert: content }
		});
		dispatch("RUN");
	},
	RENDER() {
		console.log("rendered");
		render(view(STATE), document.getElementById("root"));
	}
}

export function dispatch(action, args = {}) {
	const trigger = ACTIONS[action];
	if (trigger) trigger(args, STATE);
	else console.log("Action not recongnized:", action);
}

function downloadText(filename, text) {
  const blob = new Blob([text], { type: "text/plain" });

  var link = document.createElement("a"); // Or maybe get it from the current document
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}`;
  link.click();
  URL.revokeObjectURL(link);
}
