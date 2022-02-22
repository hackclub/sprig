import core from "puppeteer-core";
import puppeteer from "puppeteer";
import chrome from "chrome-aws-lambda";

/** @type {import("@vercel/node").VercelApiHandler} */
export default async function handler(req, res, dev = false) {
  const { id } = req.query;

  if (!id) {
    res
      .status(400)
      .setHeader("Content-Type", "text/plain")
      .send("What kinda wacky shenanigans ya tryin' to pull here????");
    return;
  }

  const browser = dev
    ? await puppeteer.launch()
    : await core.launch({
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless,
      });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 600 });
  await page.goto(
    dev
      ? `http://${req.headers.host}/?id=${id}`
      : `https://${req.headers.host}/?id=${id}`,
    {
      waitUntil: "domcontentloaded",
    }
  );
  await page.evaluate(() => {
    return Promise.all([
      document.fonts.ready,
      new Promise((resolve) => {
        document.addEventListener("init_done", resolve);
      }),
    ]);
  });
  await (await page.$(".sprite-entry"))?.click();
  await page.click(".run-button");
  const file = await page.screenshot();

  res.setHeader("Content-Type", "image/png");
  res.setHeader(
    "Cache-Control",
    `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`
  );
  res.end(file);
}
