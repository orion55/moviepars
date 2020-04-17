const fs = require('fs-extra');

const createDirs = async (arrTmp, arrConst) => {
  if (arrTmp.length > 0) {
    arrTmp.forEach((element) => fs.emptyDir(element));
  }

  if (arrConst.length > 0) {
    arrConst.forEach((element) => fs.ensureDir(element));
  }
};

export default createDirs;
