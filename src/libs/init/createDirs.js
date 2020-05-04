const fs = require('fs-extra');

const createDirs = async (param) => {
  const { tmp, constant } = param;
  if (tmp.length > 0) {
    tmp.forEach((element) => fs.emptyDir(element));
  }

  if (constant.length > 0) {
    constant.forEach((element) => fs.ensureDir(element));
  }
};

export default createDirs;
