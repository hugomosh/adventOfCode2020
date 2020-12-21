var utils = require("./utils.js");
const input = utils.readLinesFromFile("./input/day18.txt");

function day18P1(input) {
  let validPassCount = 0;
  const res = input.map((line) => {
    const inputParts = eval(line);
    validPassCount += inputParts;
    return inputParts;
  });
  console.log(res);
  return validPassCount;
}

function day18P2(input) {
  let x = 0;
  return x;
}

function day18(input) {
  return {
    p1: day18P1(input),
    p2: day18P2(input),
  };
}

let sol;
/*Execute solution*/
sol = day18(input);

console.log({ sol });

const test = `2 * 3 + (4 * 5)
5 + (8 * 3 + 9 + 3 * 4 * 3)
5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))
((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2`;

function testDemo() {
  const actual = day18P1(utils.splitLines(test));
  const expected = [26, 437, 12240, 13632].reduce((acc, cur) => acc + cur);

  console.assert(
    actual === expected,
    `Expected: ${expected} actual ${actual}.`
  );
}

function testDemo2() {
  const actual = day18P2(utils.splitLines(test));
  const expected = 123123123;
  console.assert(
    actual === expected,
    `Expected: ${expected} actual ${actual}.`
  );
}

testDemo();
//testDemo2();
