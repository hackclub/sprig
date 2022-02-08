import core from "puppeteer-core";
import chrome from "chrome-aws-lambda";

/** @type {import("@vercel/node").VercelApiHandler} */
export default async function handler(req, res) {
  const browser = await core.launch({
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: chrome.headless,
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto("https://google.com");
  const file = await page.screenshot();

  res.setHeader("Content-Type", "image/png");
  res.end(file);
}
