var utils = require("./utils.js");
const input = utils.readLinesFromFile("./input/day05.txt");

function day05P1(input) {
  const res = input.map((line) => {
    const inputParts = line.split("");
    //console.log({ inputParts });
    let row = 0,
      col = 0;
    for (let i = 0; i < inputParts.length - 3; i++) {
      // Putting together the binary number FBF -> 010
      row += (inputParts[i] == "B") << (6 - i);
    }
    for (let i = 0; i < 3; i++) {
      // Putting together the binary number RLL -> 100
      col += (inputParts[i + 7] == "R") << (2 - i);
    }
    //console.log(row, col);
    return row * 8 + col;
  });
  //console.log(res);
  return Math.max(...res);
}

function day05P2(input) {
  const res = input.map((line) => {
    const inputParts = line.split("");
    //console.log({ inputParts });
    let row = 0,
      col = 0;
    for (let i = 0; i < inputParts.length - 3; i++) {
      // Putting together the binary number FBF -> 010
      row += (inputParts[i] == "B") << (6 - i);
    }
    for (let i = 0; i < 3; i++) {
      // Putting together the binary number RLL -> 100
      col += (inputParts[i + 7] == "R") << (2 - i);
    }
    //console.log(row, col);
    return row * 8 + col;
  });
  const x = res.sort().filter((x, i) => x - res[i - 1] == 2);
  return x - 1;
}

function day05(input) {
  return {
    p1: day05P1(input),
    p2: day05P2(input),
  };
}

const sol = day05(input);
console.log({ sol });

const test = `BFFFBBFRRR
FFFBBBFRRR
BBFFBBFRLL`;

function testDemo() {
  const actual = day05P1(utils.splitLines(test));
  const expected = 820;

  console.assert(actual === expected, `Expected: ${expected}==${actual}.`);
}

function testP2() {
  const actual = day05P2(utils.splitLines(test));
  const expected = 123123123;
  console.assert(actual === expected, `Expected: ${expected}==${actual}.`);
}
testDemo();
//testP1();
//testP2();
