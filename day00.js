var utils = require("./utils.js");
const input = utils.readLinesFromFile("./input/day00.txt");


function day00P1(input) {
  let validPassCount = 0;
  const res = input.map((line) => {
    const inputParts = line.split();
    return inputParts;
  });
  console.log(res);

  return validPassCount;
}

function day00P2(input) {
    let x = 0;
    const res = input.map((line) => {
      const inputParts = line.split();
      return inputParts;
    });
    console.log(res);
  
    return x;
  }

function day00(input) {
  return {
    p1: day00P1(input),
    p2: day00P2(input),
  };
}

const sol = day00(input);
console.log({ sol });
