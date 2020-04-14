import readConfig from './libs/readConfig';

const clc = require('cli-color');

console.log(clc.blue('Начало работы скрипта'));

const main = async () => {
  const config = await readConfig('config.json');
  console.log(config);
};

main()
  .catch((error) => {
    console.error(error);
  });
