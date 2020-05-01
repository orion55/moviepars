import readConfig from './libs/readConfig';
import createDirs from './libs/createDirs';
import logger from './libs/winston';
import getHTML from './libs/getHTML';
import scrapMovies from './libs/scrapMovies';
import filterMovies from './libs/filterMovies';

const path = require('path');

const appRootPath = process.cwd();
logger.info('Начало работы скрипта');

const main = async () => {
  const fullNameConfig = path.join(appRootPath, 'config.json');
  const config = await readConfig(fullNameConfig);

  const tmpDir = path.join(appRootPath, 'tmp');
  const outDir = path.join(appRootPath, 'out');
  await createDirs([tmpDir, outDir]);

  logger.info(`Загрузка страницы ${config.url}`);
  const html = await getHTML(config.url);

  let movies = scrapMovies(html);
  if (movies.length === 0) {
    throw new Error(`На странице ${config.url} фильмы не найдены!`);
  }
  movies = filterMovies(movies, config);
  console.table(movies);
};

main()
  .catch((error) => {
    logger.error(error.toString());
  });
