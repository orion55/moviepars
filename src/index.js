import readConfig from './libs/readConfig';
import createDirs from './libs/createDirs';
import logger from './libs/winston';
import getHTML from './libs/getHTML';
import filterMovies from './libs/filterMovies';
import selectParsers from './libs/selectParsers';
import exportCsv from './libs/exportCsv';

const path = require('path');

const appRootPath = process.cwd();
logger.info('Начало работы скрипта');

const main = async () => {
  const fullNameConfig = path.join(appRootPath, 'config.json');
  const config = await readConfig(fullNameConfig);

  const inDir = path.join(appRootPath, 'in');
  const tmpDir = path.join(appRootPath, 'tmp');
  const outDir = path.join(appRootPath, 'out');
  await createDirs({ tmp: [tmpDir, outDir], constant: [inDir] });

  logger.info('Загрузка страницы...');
  const html = await getHTML(config, inDir);

  let movies = selectParsers(html, config);
  if (movies === null || movies.length === 0) {
    throw new Error(`На странице ${config.url} фильмы не найдены!`);
  }

  movies = filterMovies(movies, config);
  if (movies.length === 0) {
    throw new Error('После фильтрации фильмы не найдены!');
  }
  console.table(movies);

  exportCsv(movies, outDir);
};

main()
  .catch((error) => {
    logger.error(error.toString());
  });
