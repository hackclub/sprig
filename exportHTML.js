
export function exportHTML(saveJSON) {
  const string = `
    <style>
      html, body {
        margin: 0px;
      }

      .outer-container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: blue;
      }

      .inner-container {
        width: min-content;
        height: min-content;
        position: relative;
      }

      .text-container {
        position: absolute;
        left: 0px;
        top: 0px;
        overflow: show;
      }
    </style>
    <script defer type="module">
      import { createEval } from "${window.location.href}evalGameScript.js";

      const evalGameScript = createEval();

      const saveObj = JSON.parse(${saveJSON});

      const { assets, prog } = saveObj;

      const gameCanvas = document.querySelector(".game-canvas");

      const err = evalGameScript({ assets, prog, gameCanvas });

      if (err) e.source.postMessage(err, e.origin);
    </script>
    <div class="outer-container">
      <div class="inner-container">
        <canvas class="game-canvas"></canvas>
        <div class="text-container"></div>
      </div>
    </div>
  `;

  

  
}
