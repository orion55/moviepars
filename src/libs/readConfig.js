const fs = require('fs-extra');

const readConfig = async (fullName) => {
  await fs.pathExists(fullName);
  return fs.readJson(fullName);
};

export default readConfig;
