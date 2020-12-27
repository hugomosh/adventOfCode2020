var utils = require("./utils.js");
const input = utils.readLinesFromFile("./input/day14.txt");

function day14P1(input) {
  const memories = {};
  let mask, mask1, mask0;
  for (let i = 0; i < input.length; i++) {
    const element = input[i];

    if (isMask(element)) {
      mask = getMask(element);
      /* console.log(
        { mask },
        mask.replace(/X/g, 1),
        parseInt(mask.replace(/X/g, 1), 2)
      ); */
      mask1 = parseInt(mask.replace(/X/g, 1), 2);
      mask0 = parseInt(mask.replace(/X/g, 0), 2);
      //console.log(mask, mask1.toString(2), mask0.toString(2), mask1, mask0);
    } else {
      const [memIndex, binValue] = getMemAndBinValue(element);
      const binValueWithMask = getBinValueWithMasks(binValue, mask0, mask1);
      //const binValueWithMask = getBinValueWithMask(binValue, mask);

      // console.log(binValue, binValueWithMask, binValueWithMask.toString(2));

      memories[memIndex] = binValueWithMask;
    }
  }
  console.log({ memories });
  return Object.values(memories).reduce((a, c) => a + c, 0);
}

function isMask(line) {
  return /mask/.test(line);
}

function getMask(line) {
  return line.split(/mask = /)[1];
}

function getMemAndBinValue(line) {
  const [, mem, num] = line.split(/mem\[|\] = /);
  return [mem, Number(num)];
}

function getBinValueWithMasks(binValue, mask0, mask1) {
  //console.log((binValue | mask0) & mask1, binValue, mask0, mask1);
  return and(or(binValue, mask0), mask1);
}

function and(v1, v2) {
  var hi = 0x80000000;
  var low = 0x7fffffff;
  var hi1 = ~~(v1 / hi);
  var hi2 = ~~(v2 / hi);
  var low1 = v1 & low;
  var low2 = v2 & low;
  var h = hi1 & hi2;
  var l = low1 & low2;
  return h * hi + l;
}
function or(v1, v2) {
  var hi = 0x80000000;
  var low = 0x7fffffff;
  var hi1 = ~~(v1 / hi);
  var hi2 = ~~(v2 / hi);
  var low1 = v1 & low;
  var low2 = v2 & low;
  var h = hi1 | hi2;
  var l = low1 | low2;
  return h * hi + l;
}
function getBinValueWithMask(binValue, mask) {
  //console.log((binValue | mask0) & mask1, binValue, mask0, mask1);

  return (binValue | mask0) & mask1;
}

function day14P2(input) {
  let x = 0;
  return x;
}

function day14(input) {
  return {
    p1: day14P1(input),
    p2: day14P2(input),
  };
}

let sol;
/*Execute solution*/
sol = day14(input);

console.log({ sol });

const test = `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0`;

function testDemoP1() {
  const actual = day14P1(utils.splitLines(test));
  const expected = 165;

  console.assert(
    actual === expected,
    `Expected: ${expected} actual ${actual}.`
  );
}

function testDemoP2() {
  const actual = day14P2(utils.splitLines(test));
  const expected = 123123123;
  console.assert(
    actual === expected,
    `Expected: ${expected} actual ${actual}.`
  );
}

function test_getBinValueWithMask() {
  let mask = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X";
  let binValueWithMask = getBinValueWithMask(
    11,
    parseInt(mask.replace(/X/g, 0), 2),
    parseInt(mask.replace(/X/g, 1), 2)
  );
  console.assert(75, binValueWithMask, "Non");
}

function test2() {
  const test2 = `mask = 0010X01001X010000110100000X000010X11
  mem[41717] = 288
  mem[54146] = 1656
  mem[30135] = 4799584`;
  const actual = day14P1(utils.splitLines(test2));

  const expected = 165;

  console.assert(
    actual === expected,
    `Expected: ${expected} actual ${actual}.`
  );
}
const test2 = `mask = 000000000000000000000000000000X1001X
mem[42] = 100
mask = 00000000000000000000000000000000X0XX
mem[26] = 1`;
function testDemoP2() {
  const actual = day14P2(utils.splitLines(test2));
  const expected = 123123123;
  console.assert(
    actual === expected,
    `Expected: ${expected} actual ${actual}.`
  );
}
testDemoP2();
/* test_getBinValueWithMask();
testDemoP1();
test2(); */
//testDemoP2();
