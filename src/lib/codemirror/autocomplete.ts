import { CompletionContext } from "@codemirror/autocomplete";
import { javascriptLanguage } from "@codemirror/lang-javascript";
import { syntaxTree } from "@codemirror/language";

const tagOptions = [
	"constructor",
	"deprecated",
	"link",
	"param",
	"returns",
	"type",
].map((tag) => ({ label: "@" + tag, type: "keyword" }));

function completeJSDoc(context: CompletionContext) {
	let nodeBefore = syntaxTree(context.state).resolveInner(context.pos, -1);
	if (
		nodeBefore.name != "BlockComment" ||
		context.state.sliceDoc(nodeBefore.from, nodeBefore.from + 3) != "/**"
	)
		return null;
	let textBefore = context.state.sliceDoc(nodeBefore.from, context.pos);
	let tagBefore = /@\w*$/.exec(textBefore);
	if (!tagBefore && !context.explicit) return null;
	return {
		from: tagBefore ? nodeBefore.from + tagBefore.index : context.pos,
		options: tagOptions,
		validFor: /^(@\w*)?$/,
	};
}

export const jsDocCompletions = javascriptLanguage.data.of({
	autocomplete: completeJSDoc,
});
