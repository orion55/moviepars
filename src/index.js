import readConfig from './libs/readConfig';
import createDirs from './libs/createDirs';
import logger from './libs/winston';

const path = require('path');
const clc = require('cli-color');

const appRootPath = process.cwd();

console.log(clc.blue('Начало работы скрипта'));
logger.info('Hello world');
logger.debug('Debugging info');

const main = async () => {
  const fullNameConfig = path.join(appRootPath, 'config.json');
  const config = await readConfig(fullNameConfig);

  const tmpDir = path.join(appRootPath, 'tmp');
  const outDir = path.join(appRootPath, 'out');
  const logDir = path.join(appRootPath, 'log');
  await createDirs([tmpDir, outDir], [logDir]);
};

main()
  .catch((error) => {
    console.error(error);
  });
