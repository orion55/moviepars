const axios = require('axios');
const _ = require('lodash');

const scrapApi = async (config) => {
  let res = await axios.get(`${config.apiUrl}search/person`, {
    params: {
      api_key: config.apiKey,
      query: config.nameDirector,
    },
  });

  if (res.data.total_results === 0) {
    throw new Error(`Информация по режисёру ${config.nameDirector} не найдена!`);
  }
  const directorId = res.data.results[0].id;

  res = await axios.get(`${config.apiUrl}person/${directorId}/movie_credits`, {
    params: {
      api_key: config.apiKey,
    },
  });

  const { crew } = res.data;
  const result = _.filter(crew, { job: 'Director' });

  return result.map((elem) => {
    const curDate = elem.release_date;
    const curYear = curDate !== undefined ? curDate.slice(0, 4) * 1 : 0;
    return { title: elem.title, year: curYear, rate: elem.vote_average };
  });
};

export default scrapApi;
