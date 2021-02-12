var utils = require("./utils.js");
const input = utils.readLinesFromFile("./input/day16.txt");

class Ticket {
  constructor(nums) {
    this.nums = nums;
  }
}

class Restriction {
  constructor(name, range1, range2) {
    this.name = name;
    this.range1 = range1;
    this.range2 = range2;
  }
}
class Tickets {
  restrictions = [];
  yourTicket;
  nearbyTickets = [];
}

function getTickets(input) {
  const t = new Tickets();
  const yT = `your ticket:`,
    nT = `nearby tickets:`;
  const res = input.map((line) => {
    const inputParts = line.split(": ");
    const i0 = inputParts[0];
    if (i0 === "" || i0 === yT || i0 === nT) {
      state++;
      //console.log(inputParts);
      return "";
    }
    switch (state) {
      case 0:
        const [name, ranges] = inputParts;
        let [r1, r2] = ranges.split(" or ");
        r1 = r1.split("-").map(Number);
        r2 = r2.split("-").map(Number);
        //console.log(r1, name);
        t.restrictions.push([r1, r2, name]);
        break;
      case 2:
        //console.log(i0);
        t.yourTicket = new Ticket(i0.split(",").map(Number));
      //console.log(t.yourTicket);
      case 4:
        //console.log(i0);
        const a = t.nearbyTickets.push(new Ticket(i0.split(",").map(Number)));
        //console.log(a);

        break;
      default:
        break;
    }
  });
  return t;
}
function isInRange(n, r) {
  //console.log({n,r});

  return n <= r[1] && n >= r[0];
}
function getInvalidNumbers(n, r) {
  let res = [];
  for (let i = 0; i < n.length; i++) {
    const e = n[i];
    let valid = false;
    for (let j = 0; j < r.length; j++) {
      const [r1, r2] = r[j];
      valid = valid || isInRange(e, r1) || isInRange(e, r2);
    }
    if (!valid) {
      console.log(e);
      res.push(e);
    }
  }
  return res;
}

function day16P1(input) {
  let validPassCount = 0;

  state = 0;
  const t = getTickets(input);

  for (let i = 0; i < t.nearbyTickets.length; i++) {
    const e = t.nearbyTickets[i];
    //console.log(e);
    validPassCount += getInvalidNumbers(e.nums, t.restrictions).reduce((a, b) => a + b,0);

  }

  return validPassCount;
}

function day16P2(input) {
  let x = 0;
  return x;
}

function day16(input) {
  return {
    p1: day16P1(input),
    p2: day16P2(input),
  };
}

let sol;
/*Execute solution*/
sol = day16(input);

console.log({ sol });

const test = `class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12`;

function testDemoP1() {
  const actual = day16P1(utils.splitLines(test));
  const expected = 71;

  console.assert(
    actual === expected,
    `Expected: ${expected} actual ${actual}.`
  );
}

function testDemoP2() {
  const actual = day16P2(utils.splitLines(test));
  const expected = 123123123;
  console.assert(
    actual === expected,
    `Expected: ${expected} actual ${actual}.`
  );
}

testDemoP1();
//testDemoP2();
