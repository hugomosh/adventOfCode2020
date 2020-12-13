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
  return splitLines(readFromFile(fileName));
}

function splitLines(txt) {
  return txt.split(/\r?\n/);
}

const utils = {
  readFromFile,
  readLinesFromFile,
  splitLines,
};

module.exports = utils;
