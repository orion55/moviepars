import readConfig from './libs/readConfig';
import createDirs from './libs/createDirs';
import logger from './libs/winston';
import getHTML from './libs/getHTML';
import scrapMovies from './libs/scrapMovies';

const path = require('path');

const appRootPath = process.cwd();
logger.info('Начало работы скрипта');

const main = async () => {
  const fullNameConfig = path.join(appRootPath, 'config.json');
  const config = await readConfig(fullNameConfig);

  const tmpDir = path.join(appRootPath, 'tmp');
  const outDir = path.join(appRootPath, 'out');
  await createDirs([tmpDir, outDir]);
  const html = await getHTML(config.url);
  const movies = scrapMovies(html);
  console.log(movies);
};

main()
  .catch((error) => {
    logger.error(error.toString());
  });
