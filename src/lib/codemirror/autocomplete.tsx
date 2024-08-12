import { CompletionContext } from "@codemirror/autocomplete";
import { javascriptLanguage } from "@codemirror/lang-javascript";

function completeSprigFunctions(context: CompletionContext) {
	let word = context.matchBefore(/\w*/);
	if (!word || (word.from == word.to && !context.explicit)) return null;

	function option(label: string, docId: string, info: string) {
		const div = document.createElement("div");

		const linkEl = document.createElement("a");
		linkEl.textContent = label;
		linkEl.href = `#${docId}`;
		div.appendChild(linkEl);

		const infoEl = document.createElement("p");
		infoEl.textContent = info;
		div.appendChild(infoEl);

		return {
			label,
			type: "function",
			detail: "Sprig",
			info: () => div,
		};
	}

	return {
		from: word.from,
		options: [
			option(
				"setLegend()",
				"setLegend",
				"Tell Sprig what types of sprites are available in your game. Bitmap keys must be a single character. We recommend storing character keys in variables."
			),
			option(
				"setBackground()",
				"setBackground",
				"Tiles a bitmap as the background of the game. This only changes the visuals of the game."
			),
			option(
				"setMap()",
				"setMap",
				"Clears the game and loads a new level."
			),
			option("setSolids()", "setSolids", "Set the solids of the game."),
			option(
				"setPushables()",
				"setPushables",
				"Set the pushables of the game"
			),
			option("width()", "width", "Get the width of the current map"),
			option("height()", "height", "Get the height of the current map"),
			option(
				"onInput()",
				"onInput",
				"Do something when the player presses a control."
			),
			option(
				"afterInput()",
				"afterInput",
				"Runs after every input event has finished being handled. Useful for tasks like checking win states."
			),
			option(
				"getTile()",
				"getTile",
				"Returns a list of the sprites in the specified tile."
			),
			option(
				"tilesWith()",
				"tilesWith",
				"Returns a list of the tiles that contain type."
			),
			option(
				"addSprite()",
				"addSprite",
				"Creates a new sprite of the given type."
			),
			option(
				"clearTile()",
				"clearTile",
				"Removes all sprites from the specified tile."
			),
			option(
				"getAll()",
				"getAll",
				"Returns all sprites of the given type. If no bitmap key is specified, it returns all the sprites in the game."
			),
			option(
				"getFirst()",
				"getFirst",
				"Returns the first sprite of a given type. Useful if you know there’s only one of a sprite, such as with a player character."
			),
			option("addText()", "addText", "Add text to the game"),
			option(
				"clearText()",
				"clearText",
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
