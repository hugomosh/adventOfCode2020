var utils = require("./utils.js");
const input = utils.readLinesFromFile("./input/day17.txt");

class ConwayGameOfLife {
  activeCubes = 0;
  matrix = new Map();
  liveNodes = [];
  setNode(n) {
    this.matrix.set(n.coordinates.toString(), n);
    if (n.isAlive) {
      this.activeCubes++;
    } else {
      this.activeCubes--;
    }
  }

  getNeighbors(coordinates, matrix) {}

  nextIteration() {
    let visited = new Set();
    let toVisit = Array.from(this.matrix.keys());
    const newMatrix = new Map();
    while (toVisit.length) {
      const nCoordinates = toVisit.pop();
      visited.add(nCoordinates);
      nca = nCoordinates.split(",");
      const neighbors = getNeighbors(nca, this.matrix);
      const nCount = neighbors.length;
      if (this.matrix.has(nCoordinates)) {
        if (nCount == 3 || nCount == 2) {
          //Sobrevive
          if (nCount == 2) {
            //Add vecinos para visitarlos
          
          }
          
        }
      } else {
        if (nCount == 3) {
          //Revive 
          
        }
      }
    }
  }
}

class Node {
  isAlive = 0;
  neighbors = [];
  coordinates = [];
  constructor(coordinates, isAlive = true) {
    this.coordinates = coordinates;
    this.isAlive = isAlive;
  }
}

function buildGame(input) {
  const game = new ConwayGameOfLife();
  const res = input.forEach((line, i) => {
    const inputParts = line.split("");
    for (let j = 0; j < inputParts.length; j++) {
      const element = inputParts[j];
      if (element === "#") {
        console.log(i, j);
        const n = new Node([i, j, 0]);
        game.setNode(n);
      }
    }
  });
  return game;
}
function day17P1(input, iterations) {
  const game = buildGame(input);
  console.log({ game });
  for (let i = 0; i < iterations.length; i++) {
    const element = iterations[i];
  }
}

function day17P2(input) {
  let x = 0;
  return x;
}

function day17(input) {
  return {
    p1: day17P1(input),
    p2: day17P2(input),
  };
}

let sol;
/*Execute solution*/
//sol = day17(input);

console.log({ sol });

const test = `.#.
..#
###
`;

function testDemoP1() {
  const actual = day17P1(utils.splitLines(test), 6);
  const expected = 123123123;

  console.assert(
    actual === expected,
    `Expected: ${expected} actual ${actual}.`
  );
}

function testDemoP2() {
  const actual = day17P2(utils.splitLines(test));
  const expected = 123123123;
  console.assert(
    actual === expected,
    `Expected: ${expected} actual ${actual}.`
  );
}

testDemoP1();
//testDemoP2();
