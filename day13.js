var utils = require("./utils.js");
const input = utils.readLinesFromFile("./input/day13.txt");

function day13P1(input) {
  const beginning = Number(input[0]);
  const busesIds = input[1]
    .split(",")
    .filter((id) => id !== "x")
    .map((id) => Number(id));
  console.log({ beginning, busesIds });
  let min = Infinity,
    minSol = 0;
  for (let i = 0; i < busesIds.length; i++) {
    const element = busesIds[i];
    const next = nextDeparture(beginning, element);
    if (next - beginning < min) {
      min = next - beginning;
      minSol = min * element;
    }
  }
  return minSol;
}
function nextDeparture(beginning, id) {
  return beginning % id === 0
    ? beginning
    : (Math.floor(beginning / id) + 1) * id;
}
function day13P2(input) {
  //const beginning = Number(input[0]);
  const busesIds = input[1]
    .split(",")
    .map((id, i) => (id === "x" ? null : [Number(id), i]))
    .filter((x) => !!x)
    //t +i =_ 0 mod ID => t =_ ID- I mode ID
    //.map(([id, i]) => [id, (id - i) % id])
    .sort((a, b) => a[0] - b[0]);

  let busIndex = busesIds.length - 1;
  let t = busesIds[busIndex][0] + busesIds[busIndex][1];
  while (busIndex != 0) {
    if ((t + busesIds[busIndex - 1][1]) % busesIds[busIndex - 1][0]) {
      busIndex--;
    } else {
      t += busesIds[busIndex][0];
    }
  }
  //t % e1 = r1;
  //t % e2 = r2;
  console.log({ busesIds });
  return 0;
  let min = Infinity,
    minSol = 0;
  for (let i = 0; i < busesIds.length; i++) {
    const element = busesIds[i];
    const next = nextDeparture(beginning, element);
    if (next - beginning < min) {
      min = next - beginning;
      minSol = min * element;
    }
  }
  return minSol;
}
function day13(input) {
  return {
    p1: day13P1(input),
    p2: day13P2(input),
  };
}

let sol;
/*Execute solution*/
//sol = day13(input);

console.log({ sol });

const test = `939
7,13,x,x,59,x,31,19`;

function testDemoP1() {
  const actual = day13P1(utils.splitLines(test));
  const expected = 295;

  console.assert(
    actual === expected,
    `Expected: ${expected} actual ${actual}.`
  );
}

function testDemoP2() {
  const actual = day13P2(utils.splitLines(test));
  const expected = 1068781;
  console.assert(
    actual === expected,
    `Expected: ${expected} actual ${actual}.`
  );
}

testDemoP1();
testDemoP2();
