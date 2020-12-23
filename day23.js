var utils = require("./utils.js");
const input = utils.readLinesFromFile("./input/day23.txt");

function day23P1(input) {
  let cups = input[0].split("").map((x = Number));

  const cupsLen = cups.length;
  let currentIndex = 0;

  for (let i = 0; i < 100; i++) {
    const currentCup = cups[currentIndex];
    let label = currentCup - 1;
    const pickUp = cups.splice(currentIndex + 1, 3);

    if (currentIndex == cupsLen) {
      pickUp.push(...cups.splice(0, 3));
    } else if (currentIndex + 1 + 3 - cupsLen > 0) {
      pickUp.push(...cups.splice(0, currentIndex + 1 + 3 - cupsLen));
    }
    console.assert(pickUp.length == 3, currentIndex);
    //console.log({ pickUp, cups });

    let destinationIndex = cups.indexOf(label);
    let c = 0;
    while (destinationIndex === -1 && c < 100) {
      label--;
      if (label < 1) {
        label = 9;
      }
      destinationIndex = cups.indexOf(label);
      c++;
    }
    console.assert(c < 100, label);

    cups.splice(destinationIndex + 1, 0, ...pickUp);
    /*     console.log({
      i,
      currentCup,
      label,
      destinationIndex,
      cups,
      i,
      pickUp,
    }); */
    currentIndex = (cups.indexOf(currentCup) + 1) % cupsLen;
  }
  return cups.join("");
}

function day23P2(input) {
  let cups = input[0].split("").map((x = Number));
  for (let j = 9; j <= 1000000; j++) {
    cups.push(j);
  }
  const cupsLen = cups.length;
  let currentIndex = 0;

  for (let i = 0; i < 10000000; i++) {
    const currentCup = cups[currentIndex];
    let label = currentCup - 1;
    const pickUp = cups.splice(currentIndex + 1, 3);

    if (currentIndex == cupsLen) {
      pickUp.push(...cups.splice(0, 3));
    } else if (currentIndex + 1 + 3 - cupsLen > 0) {
      pickUp.push(...cups.splice(0, currentIndex + 1 + 3 - cupsLen));
    }
    console.assert(pickUp.length == 3, currentIndex);
    //console.log({ pickUp, cups });

    let destinationIndex = cups.indexOf(label);
    let c = 0;
    while (destinationIndex === -1 && c < 100) {
      label--;
      if (label < 1) {
        label = 9;
      }
      destinationIndex = cups.indexOf(label);
      c++;
    }
    console.assert(c < 100, label);

    cups.splice(destinationIndex + 1, 0, ...pickUp);
    /*     console.log({
      i,
      currentCup,
      label,
      destinationIndex,
      cups,
      i,
      pickUp,
    }); */
    currentIndex = (cups.indexOf(currentCup) + 1) % cupsLen;
  }
  const c1 = cups.indexOf(1);
  return cups[(c1 + 1) % cupsLen] * cups[(c1 + 2) % cupsLen];
}

function day23(input) {
  return {
    p1: day23P1(input),
    p2: day23P2(input),
  };
}

let sol;
/*Execute solution*/
//sol = day23(input);
console.log({ sol });

const test = `389125467`;

function testDemoP1() {
  const actual = day23P1(utils.splitLines(test));
  //const expected = "67384529";
  const expected = "291673845";

  console.assert(
    actual === expected,
    `Expected: ${expected} actual ${actual}.`
  );
}

function testDemoP2() {
  const actual = day23P2(utils.splitLines(test));
  const expected = 149245887792;
  console.assert(
    actual === expected,
    `Expected: ${expected} actual ${actual}.`
  );
}

testDemoP1();
testDemoP2();
