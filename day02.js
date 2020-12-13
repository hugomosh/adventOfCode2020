var utils = require("./utils.js");
const input = utils.readLinesFromFile("./input/day02.txt");

function countSubstring(str, subStr) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] == subStr) count++;
  }
  return count;
}
function isValueBetweenRange(x, min, max) {
  return x <= max && x >= min;
}

function day02P2(input) {
  let validPassCount = 0;
  const res = input.map((line) => {
    const inputParts = line.split(/[\s-(: )]/);
    const [min, max, c, , pass] = inputParts;

    const p1 = pass[Number(min) - 1] === c;
    const p2 = pass[Number(max) - 1] === c;
    const isValid = p1 ^ p2; //XOR

    if (isValid) validPassCount++;
    inputParts[3] = isValid;
    return inputParts;
  });
  console.log(res);

  return validPassCount;
}

function day02P1(input) {
  let validPassCount = 0;
  const res = input.map((line) => {
    const inputParts = line.split(/[\s-(: )]/);
    const [min, max, c, , pass] = inputParts;
    const count = countSubstring(pass, c);
    const isValid = isValueBetweenRange(count, Number(min), Number(max));
    if (isValid) validPassCount++;
    inputParts[3] = count;
    return inputParts;
  });
  console.log(res);

  return validPassCount;
}

function day02(input) {
  return {
    p1: day02P1(input),
    p2: day02P2(input),
  };
}

const sol = day02(input);
console.log({ sol });
