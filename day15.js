var utils = require("./utils.js");
const input = utils.readLinesFromFile("./input/day15.txt");

function day15P1(input) {
  let validPassCount = 0;
  const res = input.map((line) => {
    const inputParts = line.split();
    return inputParts;
  });
  console.log(res);
  return validPassCount;
}

function day15P2(input) {
  let x = 0;
  return x;
}

function day15(input) {
  return {
    p1: day15P1(input),
    p2: day15P2(input),
  };
}

function game(initialNumbers, iteration) {
  const lastIndex = {};
  initialNumbers.forEach((n, i) => (lastIndex[n] = i));
  //const nums = [...initialNumbers];
  let last = initialNumbers[initialNumbers.length - 1],
    prevLast = last;
  for (let i = initialNumbers.length; i <= iteration; i++) {
    const prev = last;
    const numHistory = lastIndex[prev];
    const nL = numHistory.length;
    //console.log(i, nums[i - 1], nL);
    let r;
    if (nL < 2) {
      r = 0;
    } else {
      r = lastIndex[prev][nL - 1] - lastIndex[prev][nL - 2];
    }
    prevLast = last;
    last = r;
    //nums.push(r);
    if (!lastIndex[r] || lastIndex[r].length < 1) {
      lastIndex[r] = [i];
    } else {
      lastIndex[r] = [lastIndex[r][lastIndex[r].length - 1], i];
    }
  }
  //console.log(nums);
  return prevLast;
}
let sol;
/*Execute solution*/
sol = day15(input);

console.log({ sol });

const test = `cxxx`;
let tests = [
  //[[0, 3, 6], 30000000, 175594],
  [[0, 3, 6], 10, 0],

  [[0, 3, 6], 2020, 436],
  [[1, 3, 2], 2020, 1],
  [[2, 1, 3], 2020, 10],
  [[1, 2, 3], 2020, 27],
  [[2, 3, 1], 2020, 78],
  [[3, 2, 1], 2020, 438],
  [[3, 1, 2], 2020, 1836],
];
tests = tests.slice(0, 1);
function testDemoP1() {
  for (const [arr, iteration, expected] of tests) {
    const actual = game(arr, iteration);
    console.assert(
      actual == expected,
      `Failed ${arr}. Expected: ${expected} actual ${actual}.`
    );
  }
}

function testDemoP2() {
  const actual = day15P2(utils.splitLines(test));
  const expected = 123123123;
  console.assert(
    actual === expected,
    `Expected: ${expected} actual ${actual}.`
  );
}

//console.log(game([11, 18, 0, 20, 1, 7, 16], 30000000));
testDemoP1();
//testDemoP2();
