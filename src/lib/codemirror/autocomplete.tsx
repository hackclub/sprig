import { CompletionContext } from "@codemirror/autocomplete";
import { javascriptLanguage } from "@codemirror/lang-javascript";
import { compiledContent } from "../../../docs/docs.md";

const sprigDocs = compiledContent();

function completeSprigFunctions(context: CompletionContext) {
	let word = context.matchBefore(/\w*/);
	if (!word || (word.from == word.to && !context.explicit)) return null;

	function option(label: string, docId: string, info: string) {
		const reg = new RegExp(
			`<h3 id="${docId}">([\n]|.)+?(?=<h2|<h3|<!)`,
			"g"
		);
		const match = reg.exec(sprigDocs);
		console.log(match?.[0]);

		const infoEl = document.createElement("div");
		infoEl.innerHTML = match ? match[0] : info;

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
			option(
				"setLegend()",
				"setlegendbitmaps",
				"Tell Sprig what types of sprites are available in your game. Bitmap keys must be a single character. We recommend storing character keys in variables."
			),
			option(
				"setBackground()",
				"setbackgroundbitmapkey",
				"Tiles a bitmap as the background of the game. This only changes the visuals of the game."
			),
			option(
				"setMap()",
				"setmaplevel",
				"Clears the game and loads a new level."
			),
			option(
				"setSolids()",
				"setsolidsbitmapkey",
				"Set the solids of the game."
			),
			option(
				"setPushables()",
				"setpushablespushmap",
				"Set the pushables of the game"
			),
			option("width()", "width", "Get the width of the current map"),
			option("height()", "height", "Get the height of the current map"),
			option(
				"onInput()",
				"oninputtype-callback",
				"Do something when the player presses a control."
			),
			option(
				"afterInput()",
				"afterinputcallback",
				"Runs after every input event has finished being handled. Useful for tasks like checking win states."
			),
			option(
				"getTile()",
				"gettilex-y",
				"Returns a list of the sprites in the specified tile."
			),
			option(
				"tilesWith()",
				"tileswithtype",
				"Returns a list of the tiles that contain type."
			),
			option(
				"addSprite()",
				"addspritex-y-spritetype",
				"Creates a new sprite of the given type."
			),
			option(
				"clearTile()",
				"cleartilex-y",
				"Removes all sprites from the specified tile."
			),
			option(
				"getAll()",
				"getalltype",
				"Returns all sprites of the given type. If no bitmap key is specified, it returns all the sprites in the game."
			),
			option(
				"getFirst()",
				"getfirsttype",
				"Returns the first sprite of a given type. Useful if you know there’s only one of a sprite, such as with a player character."
			),
			option(
				"addText()",
				"addtextstring-options---x-y-color",
				"Add text to the game"
			),
			option(
				"clearText()",
				"cleartext",
				"Clears all text on the screen."
			),
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
