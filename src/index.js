import readConfig from './libs/readConfig';
import createDirs from './libs/createDirs';
import logger from './libs/winston';

const path = require('path');

const appRootPath = process.cwd();
logger.info('Начало работы скрипта');

const main = async () => {
  const fullNameConfig = path.join(appRootPath, 'config.json');
  const config = await readConfig(fullNameConfig);

  const tmpDir = path.join(appRootPath, 'tmp');
  const outDir = path.join(appRootPath, 'out');
  await createDirs([tmpDir, outDir]);
};

main()
  .catch((error) => {
    logger.error(error.toString());
  });
