import core from "puppeteer-core";
import chrome from "chrome-aws-lambda";

function wait(ms) {
  return new Promise((r) => {
    setTimeout(r, ms);
  });
}

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
  await page.goto(`https://gamelab.hackclub.com/?id=${id}`);
  await wait(100);
  //   await page.click(".run-button");
  const file = await page.screenshot();

  res.setHeader("Content-Type", "image/png");
  res.end(file);
}
