var utils = require("./utils.js");
//const input = utils.readLinesFromFile("./input/day06.txt");
const inputPre = utils.readFromFile("./input/day06.txt");
const input = inputPre.split(/\n\n/);

function day06P1(input) {
  const res = input.map((line) => {
    const inputParts = line.split(`\n`).join("").split("");
    const s = new Set(inputParts);
    return s.size;
  });
  return res.reduce((ac, c) => ac + c, 0);
}

function day06P2(input) {
  const res = input.map((line) => {
    const inputParts = line.split(`\n`);
    //console.log(inputParts);

    const answers = {};
    for (let i = 0; i < inputParts.length; i++) {
      const passenger = inputParts[i];
      passenger.split("").forEach((answer) => {
        if (!answers[answer]) {
          answers[answer] = 0;
        }
        answers[answer] += 1;
      });
    }
    let count = 0;
    for (const [k, v] of Object.entries(answers)) {
      //console.log(inputParts.length, v);
      if (inputParts.length == v) {
        count++;
      }
    }
    return count;
  });
  return res.reduce((ac, c) => ac + c, 0);
}

function day06(input) {
  return {
    p1: day06P1(input),
    p2: day06P2(input),
  };
}

const sol = day06(input);
console.log({ sol });

const test = `abc

a
b
c

ab
ac

a
a
a
a

b`;

function testDemo() {
  const actual = day06P1(test.split(/\n\n/));
  const expected = 11;

  console.assert(actual === expected, `Expected: ${expected}==${actual}.`);
}

function testDemo2() {
  const actual = day06P2(test.split(/\n\n/));
  const expected = 6;

  console.assert(actual === expected, `Expected: ${expected}==${actual}.`);
}

function testP2() {
  const actual = day06P2(utils.splitLines(test));
  const expected = 123123123;
  console.assert(actual === expected, `Expected: ${expected}==${actual}.`);
}

testDemo();
testDemo2();

//testP1();
//testP2();
