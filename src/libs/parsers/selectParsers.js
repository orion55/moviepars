import scrapMovies from './scrapMovies';
import scrapApi from './scrapApi';

const selectParsers = (html, config) => {
  let movies = null;

  if (config.type === 'url') {
    movies = scrapMovies(html);
  }

  if (config.type === 'api') {
    movies = scrapApi(config);
  }

  return movies;
};

export default selectParsers;
