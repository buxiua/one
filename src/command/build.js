const fse = require("fs-extra");
const path = require("path");

const targetDir = path.resolve(__dirname, "..", "anzhiyu");

const targetFiles = fse.readdirSync(targetDir, { recursive: true });

const result = targetFiles
  .map((filename) => {
    const target = path.resolve(targetDir, filename);
    return fse.readFileSync(target).toString();
  })
  .reduce((pre, next) => {
    pre += next + "\n";
    return pre;
  }, "");

fse.writeFileSync(path.resolve(__dirname, "..", "_config.anzhiyu.yml"), result);
