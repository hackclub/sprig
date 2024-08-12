import { CompletionContext } from "@codemirror/autocomplete";
import { javascriptLanguage } from "@codemirror/lang-javascript";

function completeSprigFunctions(context: CompletionContext) {
	let word = context.matchBefore(/\w*/);
	if (!word || (word.from == word.to && !context.explicit)) return null;

	return {
		from: word.from,
		options: [
			{
				label: "setLegend()",
				type: "function",
				info: "",
			},
			{ label: "setBackground()", type: "function", info: "" },
			{ label: "setMap()", type: "function", info: "" },
			{ label: "setSolids()", type: "function", info: "" },
			{ label: "setPushables()", type: "function", info: "" },
			{ label: "width()", type: "function", info: "" },
			{ label: "height()", type: "function", info: "" },
			{ label: "onInput()", type: "function", info: "" },
			{ label: "afterInput()", type: "function", info: "" },
			{ label: "getTile()", type: "function", info: "" },
			{ label: "tilesWith()", type: "function", info: "" },
			{ label: "addSprite()", type: "function", info: "" },
			{ label: "clearTile()", type: "function", info: "" },
			{ label: "getAll()", type: "function", info: "" },
			{ label: "getFirst()", type: "function", info: "" },
			{ label: "addText()", type: "function", info: "" },
			{ label: "clearText()", type: "function", info: "" },
			{ label: "playTune()", type: "function", info: "" },

			{ label: "bitmap``", type: "function", info: "" },
			{ label: "map``", type: "function", info: "" },
			{ label: "tune``", type: "function", info: "" },
			{ label: "color``", type: "function", info: "" },
		],
	};
}

export const sprigFunctionCompletion = javascriptLanguage.data.of({
	autocomplete: completeSprigFunctions,
});
