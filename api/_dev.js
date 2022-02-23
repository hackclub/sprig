import express from "express";

import preview from "./preview.js";

const app = express();

app.get("/api/preview", (req, res) => preview(req, res, true));

app.use(express.static("."));

app.listen(3000, () => {
  console.log("Started on port 3000");
});
