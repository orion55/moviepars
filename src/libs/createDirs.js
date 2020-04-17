const fs = require('fs-extra');

const createDirs = async (arrTmp) => {
  if (arrTmp.length > 0) {
    arrTmp.forEach((element) => fs.emptyDir(element));
  }
};

export default createDirs;
