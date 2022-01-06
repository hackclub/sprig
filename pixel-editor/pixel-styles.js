import { render, html, svg } from '/uhtml.js';

export const pixelStyles = html`
<style>
  canvas {
      image-rendering: optimizeSpeed;
      image-rendering: -moz-crisp-edges;
      image-rendering: -o-crisp-edges;
      image-rendering: -webkit-optimize-contrast;
      image-rendering: optimize-contrast;
      image-rendering: crisp-edges;
      image-rendering: pixelated;
      -ms-interpolation-mode: nearest-neighbor;
  }

  .canvas-container {
    display: grid;
    background: grey;
    width: 100%;
    height: 100%;
    place-content: center;
  }

  .drawing-canvas {
    background: white;
  }

  .toolbox {
    position: fixed;
    right: 10px;
    top: 10px;
    display: flex;
    flex-direction: column;
    border: 2px solid black;
    padding: 5px;
    background: lightgrey;
  }

  .toolbox > * {
    margin-bottom: 5px;
  }

  .colors {
    position: fixed;
    right: 10px;
    bottom: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .colors > * {
    margin-right: 5px;
  }

  .gridsize {
    width: 50px;
  }

  .view-window {
    background: lightgrey;
    padding: 5px;
    border: 2px solid black;
  }
</style>
`
