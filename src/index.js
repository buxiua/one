const fse = require("fs-extra");
const { file } = require("./utils");
const path = require("path");

const targetDir = path.resolve(__dirname, "../anzhiyu");

const sources = file.readFileRecursive(targetDir)
// console.log(sources);
const target = path.resolve(__dirname, "../_config.anzhiyu.yml");

const targetFiles = sources.map((item) => path.resolve(targetDir, item));

file.concat(targetFiles, target);
