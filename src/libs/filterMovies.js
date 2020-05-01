const _ = require('lodash');

const filterMovies = (movies, config) => {
  if (movies.length === 0) {
    return null;
  }

  let objects = _.filter(movies, (v) => v.rate >= config.excludeRating);

  if (Object.prototype.hasOwnProperty.call(objects[0], 'countries')) {
    objects = _.filter(objects, (elem) => {
      const { countries } = elem;
      if ((countries.length === 1) && (_.includes(config.excludeCountries, countries[0]))) {
        return null;
      }
      return elem;
    });
  }

  objects = _.orderBy(objects, 'rate', 'desc');

  return objects;
};

export default filterMovies;
