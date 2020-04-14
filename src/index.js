import readConfig from './libs/readConfig';

const clc = require('cli-color');

readConfig('config.json');
console.log(clc.red('Text in red'));
