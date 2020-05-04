const puppeteer = require('puppeteer');

const config = {
  trackerName: 'Saturn27',
  trackerPass: '9CYgHuoBT3',
};
const movie = {
  title: 'Dark Waters',
  year: 2019,
  rate: 7.4,
};

const options = {
  launch: { headless: false },
  setViewport: { width: 1280, height: 1024 },
};

const login = async (page, config) => {
  await page.goto('https://rutracker.org/forum/index.php');
  await page.click('div#page_header div.topmenu td.tCenter div a:nth-of-type(2)');

  await page.click('form#login-form-quick input#top-login-uname');
  await page.keyboard.type(config.trackerName);

  await page.click('form#login-form-quick input#top-login-pwd');
  await page.keyboard.type(config.trackerPass);

  await page.click('form#login-form-quick input#top-login-btn');
  // await page.waitForNavigation();
  // await page.waitFor(6000);
};

const search = async (page, movie) => {
  await page.goto('https://rutracker.org/forum/search.php');

  await page.click('form#quick-search input#search-text');
  await page.keyboard.type(`${movie.title} ${movie.year}`);
  await page.click('form#quick-search input#search-submit');
  await page.waitFor(5000);

  await page.select('td fieldset div.med p.select select#o', '10');
  await page.click('div.tCenter input#tr-submit-btn.bold');
};

const scrape = async (movie, config) => {
  const browser = await puppeteer.launch(options.launch);
  const page = await browser.newPage();
  await page.setViewport(options.setViewport);
  await login(page, config);
  await search(page, movie);

  await page.screenshot({ path: 'example.png' });

  await browser.close();
};

scrape(movie, config);
