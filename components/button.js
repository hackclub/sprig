import { dispatch } from "../dispatch.js"
import { html } from "../uhtml.js";

const mouseEnter = () => dispatch("SOUND", "hover")

const click = () => dispatch("SOUND", "confirm")

export default ({ buttonImage, tooltipText, width, click, buttonPadding, className }) => {
  width = width || "24px";
  className = className || "";
  
  return html`
    <style>
      .button {
        display: flex;
        position: relative;
        box-sizing: border-box;
        justify-content: center;
        align-items: center;
      }

      .button:hover {
        transform: translateY(1px);
      }

      .tooltip {
        visibility: hidden;
        background-color: black;
        color: #fff;
        padding: 5px;
        position: absolute;
        top: 130%;
        left: 50%;
        width: max-content;
        z-index: 99;
        transform: translate(-50%, 0);
        border-radius: 5px;
      }

      .button:hover .tooltip {
        visibility: visible;
      }

      .run-button {
        margin-left: 10px;
        margin-right: 30px;
      }
    </style>

    <button class=${"button " + className} @click=${click}>
      <span class="tooltip">${tooltipText}</span>
      <img src=${buttonImage} width=${width} />
    </button>
  `
}