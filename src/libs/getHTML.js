const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

const getHTML = async (config, inDir) => {
  let record = null;

  if (config.type === 'url') {
    const { data } = await axios.get(config.url);
    record = data;
  }

  if (config.type === 'file') {
    const inFile = path.join(inDir, config.file);
    await fs.pathExists(inFile);
    record = await fs.readFile(inFile, 'utf8');
  }

  return record;
};

export default getHTML;
