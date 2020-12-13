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
  //console.log(copy);
  return countTrees;
}

function calculateTreesInSlop(map, right, down) {
  let countTrees = 0;
  const IL = map.length;
  const WL = map[0].length;
  const copy = Array(down)
    .fill("")
    .map((_, i) => map[i]);
  for (let i = 0; i < IL - down; i += down) {
    // console.info(i);
    const element = map[i + down];
    const x = ((i / down) * right + right) % WL;
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

function day03P2(map) {
  let x = [
    calculateTreesInSlop(map, 1, 1),
    calculateTreesInSlop(map, 3, 1),
    calculateTreesInSlop(map, 5, 1),
    calculateTreesInSlop(map, 7, 1),
    calculateTreesInSlop(map, 1, 2),
  ];
  console.log(x);
  return x.reduce((a, b) => a * b);
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

function testP1() {
  const actual = day03P1(utils.splitLines(test));
  const expected = 7;

  console.assert(actual === expected, `Expected: ${expected}==${actual}. Diff`);
}

function testP2() {
  const actual = day03P2(utils.splitLines(test));
  const expected = 336;
  console.assert(actual === expected, `Expected: ${expected}==${actual}. Diff`);
}

function test2() {
  const actual = day03P1(input);
  const expected = calculateTreesInSlop(3, 1);

  console.assert(actual === expected, `Expected: ${expected}==${actual}. Diff`);
}
//testP2();
testP2();
