var utils = require("./utils.js");
const input = utils.readLinesFromFile("./input/day18.txt");

function extractBigParenthesis(input) {
  const q = [...input];
  const subQ = [];
  // an operation without the first parenthesis
  let openParenthesisCount = 1;
  let c = q.shift();
  let started = false;
  while (openParenthesisCount) {
    c = q.shift();
    if (c === "(") {
      openParenthesisCount++;
    } else if (c === ")") {
      openParenthesisCount--;
      if (openParenthesisCount == 0) {
        continue;
      }
    }
    subQ.push(c);
  }
  console.assert(subQ.length, subQ);
  //console.log({ subQ, q });
  return [subQ, q];
}

function solveEquation(input = []) {
  //console.log({input});
  let q = [...input];
  let leftV, operator, rightV;
  let c;
  while (q.length) {
    //console.log(q);
    c = q.shift();
    if (c === "+" || c === "*") {
      operator = c;
      continue;
    }
    if (c === "(") {
      q.unshift(c);
      const [subQ, newQ] = extractBigParenthesis(q);
      q = newQ;
      c = solveEquation(subQ);
    } else if (c === ")") {
      continue;
    }
    if (!leftV) {
      leftV = Number(c);
    } else {
      rightV = Number(c);
      const newV = operator === "+" ? leftV + rightV : leftV * rightV;
      //console.log(leftV, operator, rightV, "=", newV);
      q.unshift(newV);
      leftV = undefined;
      operator = undefined;
      rightV = undefined;
    }
  }
  // console.log(leftV);
  console.assert(Number(c), leftV);
  return c;
}
function isOperator(o, oRank) {
  return oRank[o] != null;
}

function getInfixToPostFix(infix, operatorsRank) {
  const postfixOutput = [],
    operators = [];
  let infixCopy = [...infix];
  let c;
  while (infixCopy.length) {
    c = infixCopy.shift();
    if (c === "(") {
      infixCopy.unshift(c);
      const [subQ, newQ] = extractBigParenthesis(infixCopy);
      infixCopy = newQ;
      c = solveEquationInfixPostFix(subQ, operatorsRank);
    }
    if (!isNaN(c)) {
      postfixOutput.push(Number(c));
    }
    if (isOperator(c, operatorsRank)) {
      const lastOperator = operators.pop();
      if (!lastOperator) {
        operators.push(c);
        continue;
      }
      if (operatorsRank[c] > operatorsRank[lastOperator]) {
        operators.push(lastOperator, c);
      } else {
        operators.push(c);
        postfixOutput.push(lastOperator);
      }
      continue;
    }
  }
  postfixOutput.push(...operators.reverse());
 // console.log(postfixOutput);
  return postfixOutput;
}

const operations = { "+": (a, b) => a + b, "*": (a, b) => a * b };
function solvePostfix(postfix) {
  const copy = [...postfix];
  let n = [];
  let i = 0;
  while (copy.length) {
    const c = copy.shift();
    if (typeof c === "number") {
      n.push(c);
    } else {
      n.push(operations[c](n.pop(), n.pop()));
    }
  }
  console.assert(n.length);
  return n.pop();
}
function solveEquationInfixPostFix(infix, operatorsRank) {
  const postfixOutput = getInfixToPostFix(infix, operatorsRank);
  const sol = solvePostfix(postfixOutput);
  return sol;
}

function day18P1(input) {
  const regex = new RegExp("([0-9]+)|([+()*]{1})", "g");
  const res = input.map((line) => {
    const inputParts = line.match(regex);
    //return solveEquation(inputParts);
    return solveEquationInfixPostFix(inputParts, { "+": 0, "*": 0 });
  });
  return res.reduce((a, b) => a + b, 0);
}

function day18P2(input) {
  const regex = new RegExp("([0-9]+)|([+()*]{1})", "g");
  const res = input.map((line) => {
    const inputParts = line.match(regex);
    // addition is evaluated before multiplication.
    return solveEquationInfixPostFix(inputParts, { "+": 1, "*": 0 });
  });
  return res.reduce((a, b) => a + b, 0);
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

const tA1 = `1 + 2 * 3 + 4 * 5 + 6
1 + (2 * 3) + (4 * (5 + 6))`;
const t1 = `1 + 2 * 3 + 4 * 5 + 6`;
const t2 = `1 + (2 * 3) + (4 * (5 + 6))`;

const t3 = `(8 + 4 + 9 + (7 * 9 + 4 + 6 + 9) * 3) + 6 + 5 + ((8 * 2) + 2 * 9) * 5`;
const t4 = `3 + (4 + 8 + 3 + 4 + 7 + 6) + 4 + 3 * 4 + ((5 * 6) + 2 * 5 * 2 + 8 * 3)`;
///e :6024
const t5 = `((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2`;

const testCases = [
  [t1, 71, 231],
  [t2, 51, 51],
  [tA1, 71 + 51, 231 + 51],
  [t3, 2410, 1],
  [t4, 1152, 1],
  [t5, 13632, 23340],
];
function testDemoP1() {
  for (let i = 0; i < testCases.length; i++) {
    const [aInput, expected] = testCases[i];
    const actual = day18P1(utils.splitLines(aInput));
    console.assert(
      actual === expected,
      `Expected: ${expected} actual ${actual}.`
    );
  }
}

function testDemoP2() {
  const l = testCases.length;
  for (let i = 0; i < l; i++) {
    const [aInput, , expected] = testCases[i];
    const actual = day18P2(utils.splitLines(aInput));
    console.assert(
      actual === expected,
      `Expected: ${expected} actual ${actual}.`
    );
  }
}

testDemoP1();
testDemoP2();
