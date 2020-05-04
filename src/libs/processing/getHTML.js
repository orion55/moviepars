import logger from '../init/winston';

const axios = require('axios');

const getHTML = async (config) => {
  if (config.type === 'url') {
    logger.info(`Загрузка страницы ${config.url}...`);
    const { data } = await axios.get(config.url);
    return data;
  }
  return null;
};

export default getHTML;
