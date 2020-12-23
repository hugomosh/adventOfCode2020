const process = require("process");
const { createNewDay } = require("./utils.js");
console.log(process.argv);
createNewDay(process.argv[2]);
