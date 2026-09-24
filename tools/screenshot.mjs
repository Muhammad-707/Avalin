import puppeteer from "puppeteer-core";
import fs from "fs";

const OUT = process.argv[2] || "shots";
const routes = process.argv[3]
  ? process.argv[3].split(",")
  : ["", "chat", "orders", "wallet", "options", "tariffs", "calculator", "delivery", "lessons", "news", "referral", "notifications", "pickup", "profile", "language"];

fs.mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars"],
});
const page = await browser.newPage();
await page.setViewport({ width: 440, height: 900, deviceScaleFactor: 2 });

const errors = [];
page.on("pageerror", (e) => errors.push("PAGEERROR: " + e.message));
page.on("console", (m) => {
  if (m.type() === "error") errors.push("CONSOLE: " + m.text());
});

for (const r of routes) {
  await page.goto(`http://localhost:5177/#/${r}`, { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 700));
  const name = r === "" ? "home" : r.replace(/\//g, "_");
  await page.screenshot({ path: `${OUT}/${name}.png` });
  console.log("shot", name);
}

console.log(errors.length ? errors.join("\n") : "NO ERRORS");
await browser.close();
