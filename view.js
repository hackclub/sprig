import { html } from "./uhtml.js";
import "./codemirror/codemirror-html.js";
import "./codemirror/codemirror-js.js";

// <button @click=${() => dispatch("SHARE", { type: "link" })}>link</button>
function shareOptions(state) {
	return html`
		<div class="expand-menu menu-option menu-choice">
			save
			<div class="menu-choices">
				<input type="text" .placeholder=${state.name} @keyup=${e => { 
					state.name = e.target.value === "" ? "anon" : e.target.value 
				}}></input>
				<button @click=${() => dispatch("SHARE", { type: "file" })}>file</button>
			</div>
		</div>
	`
}

const toggleHide = (className) => document.querySelector(`.${className}`).classList.toggle("hide");

// <button class="menu-option" @click=${() => toggleHide("examples")}>examples</button>
// <button class="menu-option" @click=${() => toggleHide("options")}>options</button>

export function view(state) {
	return html`
		<style>
			:root {
				--horizontal-bar: 60%;
			}

			.right-pane {
				display: flex;
				flex-direction: column;
				overflow: hidden;
				width: 100%;
				flex: 1;
			}

			.game-output {
				display: flex;
				justify-content: center;
				align-items: center;
				background: #000067;
				width: 100%;
				height: var(--horizontal-bar);
			}

			.pixel-editor-container {
				display: flex;
				background: green;
				width: 100%;
				flex: 1;
				z-index: 9;
				overflow: hidden;
			}

			.list-of-sprites {
				display: flex;
				flex-direction: column;
				background: orange;
				min-height: 100%;
				max-height: 100%;
				height: 100%;
				min-width: 40px;
				width: max-content;
				padding: 5px;
			}

			.list-of-sprites > * {
				padding-bottom: 3px;
			}

			.pixel-editor {
				overflow: scroll;
				position: relative;
				flex: 1;
			}

			.horizontal-bar {
				position: absolute;
				left: var(--vertical-bar);
				top: calc(var(--horizontal-bar) - 5px);
				background: none;
				height: 10px;
				width: 100%;
				z-index: 10;
			}


			.horizontal-bar:hover {
				background: black;
				cursor: row-resize;
			}

			.sprite-entry {
				display: flex;
				box-sizing: border-box;
				border: 2px solid #ffffff00;
				padding: 3px;
			}

			.sprite-name {
				cursor: pointer;
				flex: 3;
				padding-right: 10px;
			}

			.sprite-name:hover {
				background: yellow;
			}

			.sprite-delete {
				display: flex;
				justify-content: flex-end;
				color: red;
				flex: 1;
				cursor: pointer;
			}

			.sprite-delete:hover {
				color: yellow;
			}

			.selected-sprite {
				border: 2px solid blue;
			}


		</style>
		<div class="left-pane">
			<codemirror-js id="code-editor"></codemirror-js>
			<div class=${["log", state.error ? "error" : "", state.logs.length === 0 ? "shrink" : ""].join(" ")}>
				${state.logs.map(x => html`<div>${JSON.stringify(x)}</div>`)}
			</div>
			<div class="menu">
				<button class="menu-option" @click=${() => dispatch("RUN")}>run (shift + enter)</button>
				${shareOptions(state)}
			</div>
		</div>
		<div class="right-pane">
			<div class="game-output">
				<canvas class="game-canvas"></canvas>
			</div>
			<div class="pixel-editor-container">
				<div class="list-of-sprites">
					${Object.keys(state.sprites).map(x => html`
						<div class=${["sprite-entry", x === state.selected_sprite ? "selected-sprite" : ""].join(" ")}>
							<div class="sprite-name" @mousedown=${() => dispatch("SELECT_SPRITE", { name: x })}>${x}</div>
							<div class="sprite-delete" @mousedown=${() => dispatch("DELETE_SPRITE", { name: x })}>x</div>
						</div>
					`)}
					<button @click=${() => dispatch("CREATE_SPRITE")}>add</button>
				</div>
				<div class="pixel-editor"></div>
			</div>
			<div class="horizontal-bar"></div>
		</div>
		<div id="vertical-bar"></div>
		${renderExamples(state)}
		${renderOptions(state)}
		${renderShared(state)}
	`
}

const renderShared = state => html`
	<div class="shared-modal hide">
		Sharing link copied to clip board.
	</div>
`

const renderExamples = (state) => html`
	<div class="examples hide">
		${state.examples.map((x, i) => html`
			<span 
				class="example" 
				@click=${() => dispatch("LOAD_EXAMPLE", { content: x["Content"] })}>
				${x["Name"]}
			</span>
		`)}
		<button class="close" @click=${() => toggleHide("examples")}>close</button>
	</div>
`

const renderOptions = (state) => { 
	const rendererClasses = { option: true, hide: state.editorType !== "html" };

	return html`
		<div class="options hide">
			<div class="option">
				<span>Link Share Method:</span>
				<select 
					@change=${(e) => dispatch("SHARE_TYPE", { type: e.target.value})}
					.value=${state.shareType}>
					<option value="binary-url">Binary URL</option>
					<option value="airtable">Airtable</option>
				</select>
			</div>
			<button class="close" @click=${() => toggleHide("options")}>close</button>
		</div>
	`
}



