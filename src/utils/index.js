const fse = require("fs-extra");
const path = require("path");
/**
 * 将sources指示的文件合并为一个文件
 * @param {string[]} sources
 * @param {string} target
 */
const concat = (sources, target) => {
  const result = sources
    .map((item) => {
      return fse.readFileSync(item).toString() + "\n";
    })
    .reduce((pre, next) => {
      pre += next;
      return pre;
    }, "");
  fse.writeFileSync(target, result);
};

/**
 * 删除指定的文件
 * @param {string[]} targets
 */
const deleteFile = (...targets) => {
  targets.forEach((item) => {
    if (fse.existsSync(item)) {
      fse.rm(item).catch((e) => {
        console.error(`删除文件 ${item} 失败`, e);
      });
    }
  });
};

/**
 * @param {string} target
 * @param {string=} source
 * @returns {string[]}
 */
const readFileRecursive = (target, source) => {
  const result = fse.readdirSync(target, { withFileTypes: true });
  return result.flatMap((item) => {
    if (item.isDirectory()) {
      return readFileRecursive(path.resolve(target, item.name), item.name);
    }
    return source ? path.join(source, item.name) : item.name;
  });
};

module.exports.file = {
  readFileRecursive,
  concat,
  delete: deleteFile,
};
