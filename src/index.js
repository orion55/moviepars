import readConfig from './libs/init/readConfig';
import createDirs from './libs/init/createDirs';
import logger from './libs/init/winston';
import getHTML from './libs/processing/getHTML';
import filterMovies from './libs/processing/filterMovies';
import selectParsers from './libs/parsers/selectParsers';
import exportCsv from './libs/processing/exportCsv';

const path = require('path');

const appRootPath = process.cwd();
logger.info('Начало работы скрипта');

const main = async () => {
  const fullNameConfig = path.join(appRootPath, 'config.json');
  const config = await readConfig(fullNameConfig);

  const outDir = path.join(appRootPath, 'out');
  await createDirs({ tmp: [outDir], constant: [] });

  const html = await getHTML(config);

  let movies = await selectParsers(html, config);
  if (movies === null || movies.length === 0) {
    throw new Error('Фильмы не найдены!');
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
