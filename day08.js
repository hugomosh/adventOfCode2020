var utils = require("./utils.js");
const input = utils.readLinesFromFile("./input/day08.txt");

function day08P1(input) {
  let accumulator = 0;
  const instructions = new Set();
  let nextInstructionIndex = 0;
  while (
    !instructions.has(nextInstructionIndex) &&
    nextInstructionIndex < input.length
  ) {
    instructions.add(nextInstructionIndex);
    const [inst, n] = input[nextInstructionIndex].split(/ [+]?/);
    const num = Number(n);
    console.assert(typeof num === "number");
    switch (inst) {
      case "nop":
        nextInstructionIndex++;
        break;
      case "jmp":
        nextInstructionIndex += num;
        break;
      case "acc":
        accumulator += num;
        nextInstructionIndex++;
        break;

      default:
        break;
    }
    //console.log({ inst, n, accumulator });
  }
  return accumulator;
}

function day08P2(input) {
  let accumulator,
    nextInstructionIndex = 0;
  let instructions = new Set();
  const queue = [[...input]];
  const consideredChanges = new Set();
  while (nextInstructionIndex < input.length && queue.length) {
    const tryInstructions = queue.pop();
    instructions = new Set();
    accumulator = 0;
    nextInstructionIndex = 0;
    while (
      !instructions.has(nextInstructionIndex) &&
      nextInstructionIndex < input.length
    ) {
      instructions.add(nextInstructionIndex);
      const [inst, n] = tryInstructions[nextInstructionIndex].split(/ [+]?/);
      const num = Number(n);
      console.assert(typeof num === "number");
      switch (inst) {
        case "nop":
          if (!consideredChanges.has(nextInstructionIndex)) {
            consideredChanges.add(nextInstructionIndex);
            const replacement = [...input];
            replacement[nextInstructionIndex] = input[
              nextInstructionIndex
            ].replace("nop", "jmp");
           /*  console.log(
              replacement[nextInstructionIndex],
              input[nextInstructionIndex]
            ); */
            queue.push(replacement);
          }
          nextInstructionIndex++;
          break;
        case "jmp":
          if (!consideredChanges.has(nextInstructionIndex)) {
            consideredChanges.add(nextInstructionIndex);
            const replacement = [...input];
            replacement[nextInstructionIndex] = input[
              nextInstructionIndex
            ].replace("jmp", "nop");
            queue.push(replacement);
          }
          nextInstructionIndex += num;
          break;
        case "acc":
          instructions.delete(nextInstructionIndex);
          accumulator += num;
          nextInstructionIndex++;
          break;

        default:
          break;
      }
      //console.log({ inst, n, accumulator });
    }
  }
  return accumulator;
}

function day08(input) {
  return {
    p1: day08P1(input),
    p2: day08P2(input),
  };
}

let sol;
/*Execute solution*/
sol = day08(input);

console.log({ sol });

const test = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`;

function testDemo() {
  const actual = day08P1(utils.splitLines(test));
  const expected = 5;

  console.assert(
    actual === expected,
    `Expected: ${expected} actual ${actual}.`
  );
}

function testDemo2() {
  const actual = day08P2(utils.splitLines(test));
  const expected = 8;
  console.assert(
    actual === expected,
    `Expected: ${expected} actual ${actual}.`
  );
}

testDemo();
testDemo2();
