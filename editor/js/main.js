import { dispatch } from "./dispatch.js";

window.dispatch = dispatch;

window.addEventListener("load", () => {
	dispatch("INIT");
});