const toNumber = require('lodash/toNumber');
const cheerio = require('cheerio');

const scrapMovies = (html) => {
  const $ = cheerio.load(html);
  return $('div.js-rating div[data-id]').map(function parse() {
    const title = $(this).find('a.link-holder').text();
    const year = $(this).find('div.color_black span.nowrap a.color_black').text() * 1;
    const rate = $(this).find('div.p-rates span.p-rates__rating-value').text() * 1;
    const countries = $(this).find('div.color_black a.color_black').map(function select() {
      const val = $(this).text();
      return !toNumber(val) ? val : null;
    }).get();
    return {
      title, year, rate, countries,
    };
  }).get();
};

export default scrapMovies;
