const { execPath } = require("process");
var utils = require("./utils.js");
const input = utils.readLinesFromFile("./input/day03.txt");

function day03P1(input) {
  let countTrees = 0;
  const IL = input.length;
  const WL = input[0].length;
  const copy = [input[0]];
  for (let i = 0; i < IL - 1; i++) {
    const element = input[i + 1];

    const x = (i * 3 + 3) % WL;
    const isTree = element.charAt(x) === "#";
    let c = element.split("");
    c[x] = isTree ? "X" : "0";

    copy.push(c.join(""));
    if (isTree) {
      countTrees++;
    }
  }
  console.log(copy);
  return countTrees;
}

function day03P2(input) {
  let x = 0;

  return x;
}

function day03(input) {
  return {
    p1: day03P1(input),
    p2: day03P2(input),
  };
}

const sol = day03(input);
console.log({ sol });

const test = `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`;

const expected = 7;
function testF() {
  const actual = day03P1(utils.splitLines(test));
  console.assert(actual === expected, `Expected: ${expected}==${actual}. Diff`);
}
