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

function createNewDay(dayNumber) {
  const copyWithCurrentDay = readFromFile("./day00.js").replace(
    /day00/g,
    "day" + dayNumber
  );
  fs.writeFile(
    `day${dayNumber}.js`,
    copyWithCurrentDay,
    "utf-8",
    function (err, data) {
      if (err) throw err;
      console.log(`Done creating new day${dayNumber}.js`);
    }
  );
  fs.writeFile(
    `./input/day${dayNumber}.txt`,
    "",
    "utf-8",
    function (err, data) {
      if (err) throw err;
      console.log(`...and day${dayNumber}.txt`);
    }
  );
}

const utils = {
  readFromFile,
  readLinesFromFile,
  splitLines,
  createNewDay,
};
module.exports = utils;
