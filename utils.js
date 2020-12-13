var fs = require("fs");

function readFromFile(fileName) {
  try {
    const data = fs.readFileSync(fileName, "utf8");
    return data;
  } catch (e) {
    console.log("Error:", e.stack);
  }
  return [];
}

function readLinesFromFile(fileName) {
  return readFromFile(fileName).split(/\r?\n/);
}

const utils = {
  readFromFile,
  readLinesFromFile,
};

module.exports = utils;
