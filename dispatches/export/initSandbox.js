const esm = ({ raw }, ...vals) => URL.createObjectURL(new Blob([String.raw({ raw }, ...vals)], {type: 'text/javascript'}));

const b64Encode = moduleData => "data:text/javascript;base64," + btoa(moduleData);


export function initSandbox(engineString) {
  const sandbox = document.querySelector(".iframe-sandbox");

  const string = `
    <style>
      body {
        margin: 0px;
      }
    </style>
    <script defer type="module">
      import evalUserCode from "${b64Encode(engineString)}";
      window.onmessage = function(e) {
        const { data } = e;
        const { program } = data;
        try {
          evalUserCode(program);
        } catch (err) {
          e.source.postMessage(err, e.origin);
        }
      };
    </script>
    <body>hello world</body>
  `
  // maybe would be better if iframe didn't have src
  // console.log(sandbox.contentWindow);
  // sandbox.contentWindow.document.write(string);

  const blob = new Blob([string], { type: 'text/html' });
  sandbox.src = URL.createObjectURL(blob);

  // sandbox.contentWindow.test = "test";

  // sandbox.srcDoc = string;
}