import { CompletionContext } from "@codemirror/autocomplete";
import { javascriptLanguage } from "@codemirror/lang-javascript";
import { compiledContent } from "../../../docs/docs.md";

const sprigDocs = compiledContent();

function completeSprigFunctions(context: CompletionContext) {
	let word = context.matchBefore(/\w*/);
	if (!word || (word.from == word.to && !context.explicit)) return null;

	function option(label: string, docId: string, info?: string) {
		const docs = document.createElement("div");
		docs.innerHTML = sprigDocs;

		const reg = new RegExp(
			`<h3 id="${docId}">([\n]|.)+?(?=<h2|<h3|<!)`,
			"g"
		);
		const match = reg.exec(docs.innerHTML);

		const infoEl = document.createElement("div");
		infoEl.innerHTML = match ? match[0] : info ?? "";

		return {
			label,
			type: "function",
			detail: "Sprig",
			info: () => infoEl,
		};
	}

	return {
		from: word.from,
		options: [
			option("setLegend()", "setlegendbitmaps"),
			option("setBackground()", "setbackgroundbitmapkey"),
			option("setMap()", "setmaplevel"),
			option("setSolids()", "setsolidsbitmapkey"),
			option("setPushables()", "setpushablespushmap"),
			option("width()", "width"),
			option("height()", "height"),
			option("onInput()", "oninputtype-callback"),
			option("afterInput()", "afterinputcallback"),
			option("getTile()", "gettilex-y"),
			option("tilesWith()", "tileswithtype"),
			option("addSprite()", "addspritex-y-spritetype"),
			option("clearTile()", "cleartilex-y"),
			option("getAll()", "getalltype"),
			option("getFirst()", "getfirsttype"),
			option("addText()", "addtextstring-options---x-y-color"),
			option("clearText()", "cleartext"),
			option("playTune()", "playTune", "Play a tune"),

			option("bitmap``", "bitmap", "Create a bitmap"),
			option("map``", "map", "Create a map"),
			option("tune``", "tune", "Create a tune"),
			option("color``", "color", "Create a color"),
		],
	};
}

export const sprigFunctionCompletion = javascriptLanguage.data.of({
	autocomplete: completeSprigFunctions,
});
