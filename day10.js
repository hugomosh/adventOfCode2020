var utils = require("./utils.js");
const input = utils.readLinesFromFile("./input/day10.txt");
function day10P1(inputA) {
  const input = inputA.map((a) => Number(a)).sort((a, b) => a - b);
  let validPassCount = { 1: 0, 2: 0, 3: 0 };
  let previousElement = 0;
  for (let i = 0; i < input.length; i++) {
    const element = input[i];

    const diff = element - previousElement;
    console.assert(
      diff > 0 && diff < 4,
      `Diff mismatch ${diff} ${previousElement} i:${i} e:${element}`
    );
    validPassCount[diff] = validPassCount[diff] + 1;
    previousElement = element;
  }
  console.log(validPassCount);
  return validPassCount[1] * (1 + validPassCount[3]);
}

function day10P2(inputA) {
  const input = inputA.map((a) => Number(a)).sort((a, b) => a - b);
  const END = input[input.length - 1] + 3;
  console.log(END, input.length);
  input.push(END);
  const BEGINING = 0;
  let validPassCount = { 1: [], 2: [], 3: [], options: [] };

  const visited = new Set([input.join(".")]);
  let validArrangement = 0;
  let previousElement = 0;
  for (let i = 0; i < input.length; i++) {
    const element = input[i];
    const diff = element - previousElement;
    validPassCount[diff].push(i);
    //Let's count the number of valid options between that 3delta and the last one
    //At the end the solution is the multiplication of all the different segments. I think.
    if (diff == 3) {
      arrayBetweenDelta3 = input.slice(
        validPassCount[diff][validPassCount[diff].length - 2] || 0,
        i
      );
      console.log({ arrayBetweenDelta3 });
      const countOptions = countPossibleBetweenDelta3(arrayBetweenDelta3);

      validPassCount.options.push(countOptions);
    }
    if (!(diff > 0 && diff < 4)) {
      break;
    }

    previousElement = element;
  }

  console.log(input);

  console.log(validPassCount);
  return validPassCount.options.reduce((acc, curr) => acc * curr, 1);
}

function countPossibleBetweenDelta3(input) {
  const END = input[input.length - 1] + 3;
  input.push(END);
  const BEGINNING = input[0] - 3 > 0 ? input[0] - 3 : 0;
  //let validPassCount = { 1: [], 2: [], 3: [] };
  const que = [[...input]];
  const visited = new Set([input.join(".")]);
  let validArrangement = 0;

  while (que.length) {
    const currentInput = que.pop();
    let previousElement = BEGINNING;
    let valid = true;
    for (let i = 0; i < currentInput.length; i++) {
      const element = currentInput[i];
      const diff = element - previousElement;
      if (!(diff > 0 && diff < 4)) {
        break;
      }
      if (diff < 3 && element !== END) {
        const tryInput = [...currentInput];
        tryInput.splice(i, 1);
        const newDiff = tryInput[i] - (i === 0 ? 0 : tryInput[i - 1]);
        console.assert(
          !isNaN(newDiff),
          `${i},${tryInput.length} ${tryInput[i]} ,${tryInput[i - 1]}`
        );
        if (newDiff < 4 && !visited.has(tryInput.join("."))) {
          visited.add(tryInput.join("."));
          //console.log({ newDiff });
          que.push(tryInput);
        }
      }
      previousElement = element;
    }
    if (valid) {
      //console.log(validArrangement, que.length);
      validArrangement++;
    }
  }
  // console.log(input);

  return validArrangement;
}

function day10P2_Naive(inputA) {
  const input = inputA.map((a) => Number(a)).sort((a, b) => a - b);
  const END = input[input.length - 1] + 3;
  input.push(END);
  const BEGINNING = 0;
  //let validPassCount = { 1: [], 2: [], 3: [] };
  const que = [[...input]];
  const visited = new Set([input.join(".")]);
  let validArrangement = 0;

  while (que.length) {
    const currentInput = que.pop();
    let previousElement = 0;
    let valid = true;
    for (let i = 0; i < currentInput.length; i++) {
      const element = currentInput[i];
      const diff = element - previousElement;
      if (!(diff > 0 && diff < 4)) {
        break;
      }
      if (diff < 3 && element !== END) {
        const tryInput = [...currentInput];
        tryInput.splice(i, 1);
        const newDiff = tryInput[i] - (i === 0 ? 0 : tryInput[i - 1]);
        console.assert(
          !isNaN(newDiff),
          `${i},${tryInput.length} ${tryInput[i]} ,${tryInput[i - 1]}`
        );
        if (newDiff < 4 && !visited.has(tryInput.join("."))) {
          visited.add(tryInput.join("."));
          //console.log({ newDiff });
          que.push(tryInput);
        }
      }
      previousElement = element;
    }
    if (valid) {
      //console.log(validArrangement, que.length);
      validArrangement++;
    }
  }
  // console.log(input);

  return validArrangement;
}

function day10(input) {
  return {
    p1: day10P1(input),
    p2: day10P2(input),
  };
}

let sol;
/*Execute solution*/
sol = day10(input);

console.log({ sol });

const test = `16
10
15
5
1
11
7
19
6
12
4`;

const test2 = `28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`;

function testDemoP1() {
  const actual = day10P1(utils.splitLines(test));
  const expected = 7 * 5;

  console.assert(
    actual === expected,
    `Expected: ${expected} actual ${actual}.`
  );
}

function testDemoP2_2() {
  const actual = day10P2(utils.splitLines(test2));
  const expected = 22 * 10;

  console.assert(
    actual === expected,
    `Expected: ${expected} actual ${actual}.`
  );
}

function testDemoP2() {
  const actual = day10P2(utils.splitLines(test));
  const expected = 8;

  console.assert(
    actual === expected,
    `Expected: ${expected} actual ${actual}.`
  );
}

function testDemoP2_2() {
  const actual = day10P2(utils.splitLines(test2));
  const expected = 19208;

  console.assert(
    actual === expected,
    `Expected: ${expected} actual ${actual}.`
  );
}

testDemoP2();
testDemoP2_2();

//testDemo2();
