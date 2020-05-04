const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1240,
    height: 680,
  });
  await page.goto('https://rutracker.org/forum/index.php');
  await page.screenshot({ path: 'example.png' });

  await browser.close();
})();
