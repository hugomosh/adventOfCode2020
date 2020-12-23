var utils = require("./utils.js");
const input = utils.readLinesFromFile("./input/day12.txt");

function day12P1(input) {
  let validPassCount = 0;
  const res = input.map((line) => {
    const inputParts = line.split();
    return inputParts;
  });
  console.log(res);
  return validPassCount;
}

function day12P2(input) {
  let x = 0;
  return x;
}

function day12(input) {
  return {
    p1: day12P1(input),
    p2: day12P2(input),
  };
}

let sol;
/*Execute solution*/
sol = day12(input);

console.log({ sol });

const test = `cxxx`;

function testDemoP1() {
  const actual = day12P1(utils.splitLines(test));
  const expected = 123123123;

  console.assert(
    actual === expected,
    `Expected: ${expected} actual ${actual}.`
  );
}

function testDemoP2() {
  const actual = day12P2(utils.splitLines(test));
  const expected = 123123123;
  console.assert(
    actual === expected,
    `Expected: ${expected} actual ${actual}.`
  );
}

//testDemoP1();
//testDemoP2();
