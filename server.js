import {
  createApp,
  serveStatic,
} from "https://deno.land/x/servest@v1.3.1/mod.ts";

const app = createApp();
app.use(serveStatic("./"));

function listen(port, attempts = 0) {
  try {
    app.listen({ port });
  } catch (err) {
    if (attempts < 10) listen(port + 1, attempts + 1);
    else console.log(err);
  }
}

listen(3000);
