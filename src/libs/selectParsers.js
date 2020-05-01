import scrapMovies from './parsers/scrapMovies';
import scrapKinopoisk from './parsers/scrapKinopoisk';

const selectParsers = (html, config) => {
  let movies = null;

  if (config.type === 'url') {
    movies = scrapMovies(html);
  }

  if (config.type === 'file') {
    movies = scrapKinopoisk(html);
  }

  return movies;
};

export default selectParsers;
