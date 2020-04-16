import readConfig from './libs/readConfig';

const path = require('path');
const clc = require('cli-color');

const appRootPath = process.cwd();

console.log(clc.blue('Начало работы скрипта'));

const main = async () => {
  const fullNameConfig = path.join(appRootPath, 'config.json');
  const config = await readConfig(fullNameConfig);
  console.log(config);
};

main()
  .catch((error) => {
    console.error(error);
  });
