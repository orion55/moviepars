const fs = require('fs-extra');
const path = require('path');

const readConfig = async (filename) => {
  const fullName = path.join(process.cwd(), filename);
  try {
    await fs.pathExists(fullName);
    return await fs.readJson(fullName);
  } catch (error) {
    console.log(`${error.name}: ${error.message}`);
    throw error;
  }
};

export default readConfig;
