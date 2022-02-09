import core from "puppeteer-core";
import chrome from "chrome-aws-lambda";

/** @type {import("@vercel/node").VercelApiHandler} */
export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    res.send("What kinda wacky shenanigans ya tryin' to pull here????");
    return;
  }

  const browser = await core.launch({
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: chrome.headless,
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 600 });
  await page.goto(`https://hackclub.gamelab.com/?id=${id}`);
  await page.click(".run-button");
  const file = await page.screenshot();

  res.setHeader("Content-Type", "image/png");
  res.end(file);
}
