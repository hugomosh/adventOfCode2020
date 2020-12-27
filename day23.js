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
class Node {
  constructor(value) {
    this.value = value;
    this.next = undefined;
  }
}

function day23P2(input) {
  let currentNode,
    lastNodeIndex = 0;
  const CUPS = [];
  const initialCups = input[0].split("").map((x = Number));
  //Create initial linked list
  for (let i = 0; i < initialCups.length; i++) {
    const node = new Node(initialCups[i]);
    const cupIndex = CUPS.push(node) - 1;
    node.cupIndex = cupIndex;
    if (i == 0) {
      currentNode = cupIndex;
      lastNodeIndex = 0;
    } else {
      CUPS[lastNodeIndex].next = cupIndex;
      lastNodeIndex = cupIndex;
    }
  }
  //
  /*   while (CUPS[currentNode].next) {
    console.log({ v:CUPS[currentNode].value });
    currentNode = CUPS[currentNode].next;
  }
  return 0; */
  //Add additional number up to 1000000
  for (let j = 9; j <= 1000000; j++) {
    const node = new Node(j);
    const cupIndex = CUPS.push(node) - 1;
    CUPS[lastNodeIndex].next = cupIndex;
    lastNodeIndex = cupIndex;
  }
  CUPS[lastNodeIndex].next = currentNode;

  for (let x = 0; x < 10000000; x++) {
    //get current node
    currentNode;
    //grab next 3
    const nextNodeIndexes = [
      CUPS[currentNode].next,
      CUPS[CUPS[currentNode].next].next,
      CUPS[CUPS[CUPS[currentNode].next].next].next,
    ];
    //cut 3 nodes ut
    CUPS[currentNode].next = CUPS[nextNodeIndexes[2]].next;
    // console.log({ CUPS,nextNodeIndexes, current: CUPS[currentNode] });
    //find next destination
    let dest = CUPS[currentNode].value - 1;
    //Value not inside the trio and not the smallest one

    let destIndex = dest - 1;
    while (CUPS[destIndex].value !== dest) {
      if (dest < 1) {
        //dest = 9;
        dest = 1000000;
      }
      destIndex = CUPS[destIndex].next;
      console.log(dest,destIndex,CUPS[destIndex])
    }

    //insert trio next to destination
    const temp = CUPS[destIndex].next;
    CUPS[destIndex].next = nextNodeIndexes[0];
    CUPS[nextNodeIndexes[2]].next = temp;
    //move currentNodeIndex to next
  }
  //Find node with value 1
  let find1 = 0;
  while (CUPS[find1].next && CUPS[find1].value !== 1) {
    find1 = CUPS[find1].next;
  }
  // Return and multiple next two nodes
  return CUPS[CUPS[find1].next].value * CUPS[CUPS[CUPS[find1].next].next].value;

  return 0;
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
  console.log("F");
}

//testDemoP1();
testDemoP2();
