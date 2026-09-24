import puppeteer from "puppeteer-core";
const OUT = process.argv[2];
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args: ["--hide-scrollbars"] });
const p = await b.newPage();
await p.setViewport({ width: 440, height: 900, deviceScaleFactor: 1 });
const errors = [];
p.on("pageerror", (e) => errors.push(e.message));
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
await p.goto("http://localhost:5177/", { waitUntil: "networkidle0" });
for (const theme of ["light", "dark"]) {
  await p.evaluate((theme) => localStorage.setItem("avalin.state.v1", JSON.stringify({ registered: true, theme, user: { firstName: "Muhammad", lastName: "Gadoev", name: "Muhammad Gadoev", phone: "+992 90 090 59 55" } })), theme);
  await p.goto("http://localhost:5177/#/", { waitUntil: "networkidle0" });
  await p.reload({ waitUntil: "networkidle0" });
  await wait(10500); // splash + demo push gone
  for (const r of ["", "notifications", "wallet", "options", "chat", "orders", "calculator"]) {
    await p.goto(`http://localhost:5177/#/${r}`, { waitUntil: "networkidle0" });
    await wait(900);
    await p.screenshot({ path: `${OUT}/${theme}-${r || "home"}.png` });
  }
  await p.goto(`http://localhost:5177/#/notifications`, { waitUntil: "networkidle0" });
  await wait(700);
  await p.evaluate(() => { const s = document.querySelector(".scroll"); s.scrollTop = 260; document.querySelector(".nt")?.click(); });
  await wait(600);
  await p.screenshot({ path: `${OUT}/${theme}-notif-scrolled.png` });
}
console.log(errors.length ? errors.join("\n") : "NO ERRORS");
await b.close();
