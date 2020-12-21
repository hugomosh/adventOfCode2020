var utils = require("./utils.js");
const input = utils.readLinesFromFile("./input/day09.txt");

function day09P1(input, window) {
  let numbers = input.map((x) => Number(x));
  let invalidNumber = 0;
  for (let i = window; i < numbers.length; i++) {
    const element = numbers[i];
    const canBeSummed = canElementBySumByAnyPairOfThisNumbers(
      element,
      numbers.slice(i - window, i).sort((a, b) => a - b)
    );
    /*  console.log(
      element,
      canBeSummed,
      numbers.slice(i - window, i).sort((a, b) => a - b)
    ); */

    if (!canBeSummed) {
      return [element, i];
    }
  }
  return [invalidNumber, false];
}

function canElementBySumByAnyPairOfThisNumbers(e, sortedArray) {
  let canBeSummed = false;
  let x = 0,
    j = sortedArray.length - 1;
  while (!canBeSummed && e > sortedArray[x] && x !== j) {
    if (e === sortedArray[x] + sortedArray[j]) {
      canBeSummed = true;
    }
    if (x < j) {
      j--;
      if (x == j) {
        x++;
        j = sortedArray.length - 1;
      }
    }
  }
  return canBeSummed;
}

function day09P2(input, window) {
  let [invalidNumber, maxIndex] = day09P1(input, window);
  let numbers = input.slice(0, maxIndex).map((x) => Number(x));
  let i = 0,
    j = 1;
  console.log(i, j);
  let sumaActual = 0;
  for (let k = 0; k < j; k++) {
    sumaActual += numbers[i];
    //optimization? if(sumaActual>invalidNumber)
  }
  //console.log(numbers, sumaActual, invalidNumber);

  while (sumaActual !== invalidNumber && i < maxIndex - 1) {
    //console.log({ i, j, sumaActual });
    if (sumaActual < invalidNumber) {
      j++;
      sumaActual += numbers[j];
    } else {
      sumaActual = 0;
      i++;
      //optimization? ir removiendo j hasta que la suma sea menor
      j = i + 1;
      sumaActual = numbers[i] + numbers[j];
    }
  }

  console.log({ i, j, sumaActual, invalidNumber });

  const x = numbers.slice(i, j + 1);
  console.log({ x });
  return Math.min(...x) + Math.max(...x);
}

function day09(input) {
  return {
    p1: day09P1(input, 25),
    p2: day09P2(input, 25),
  };
}

let sol;
/*Execute solution*/
sol = day09(input);
console.log({ sol });

const test = `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`;

function testDemo() {
  const [actual] = day09P1(utils.splitLines(test), 5);
  const expected = 127;

  console.assert(
    actual === expected,
    `Expected: ${expected} actual ${actual}.`
  );
}

function testDemo2() {
  const actual = day09P2(utils.splitLines(test), 5);
  const expected = 62;
  console.assert(
    actual === expected,
    `Expected: ${expected} actual ${actual}.`
  );
}

//testDemo();
//testDemo2();

console.log("End day09!");
