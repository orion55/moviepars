import logger from '../init/winston';

const fs = require('fs-extra');
const papa = require('papaparse');
const path = require('path');

const exportCsv = async (movies, outDir) => {
  const outFile = path.join(outDir, 'out.csv');
  const data = papa.unparse(movies, { delimiter: ';' });
  await fs.outputFile(outFile, data);
  logger.info(`Результаты парсинга экспортированы ${outFile}`);
};

export default exportCsv;
