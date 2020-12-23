var utils = require("./utils.js");
const input = utils.readLinesFromFile("./input/day12.txt");

function day12P1(input) {
  let status = {
    0: 0,
    90: 0,
    180: 0,
    270: 0,
    pointing: 90,
  };

  for (let i = 0; i < input.length; i++) {
    const instruction = input[i];
    const [d, stepsStr] = instruction.split(/(\d+)/);
    const step = Number(stepsStr);
    // console.log({ d, step, instruction, ...status });
    switch (d) {
      case "R":
        status.pointing = (status.pointing + step) % 360;
        break;
      case "L":
        status.pointing = (status.pointing + 360 - step) % 360;
        break;
      case "F":
        status[status.pointing] += step;
        break;
      case "N":
        status[0] += step;
        break;
      case "E":
        status[90] += step;
        break;
      case "S":
        status[180] += step;
        break;

      case "W":
        status[270] += step;
        break;
      default:
        console.log("Nop");
        break;
    }
  }
  console.log({ status });
  return Math.abs(status[0] - status[180]) + Math.abs(status[90] - status[270]);
}

function day12P2(input) {
  let status = {
    0: 0,
    90: 0,
    180: 0,
    270: 0,
    pointing: 90,
  };
  let waypoint = {
    0: 1,
    90: 10,
    180: 0,
    270: 0,
  };

  for (let i = 0; i < input.length; i++) {
    const instruction = input[i];
    const [d, stepsStr] = instruction.split(/(\d+)/);
    const step = Number(stepsStr);

    switch (d) {
      case "R":

        waypoint = {
          0: waypoint[(0 + 360 - step) % 360],
          90: waypoint[(90 + 360 - step) % 360],
          180: waypoint[(180 + 360 - step) % 360],
          270: waypoint[(270 + 360 - step) % 360],
        };

        break;
      case "L":
        waypoint = {
          0: waypoint[(0 + step) % 360],
          90: waypoint[(90 + step) % 360],
          180: waypoint[(180 + step) % 360],
          270: waypoint[(270 + step) % 360],
        };
        break;
      case "F":
        status[0] += (waypoint[0] - waypoint[180]) * step;
        status[90] += (waypoint[90] - waypoint[270]) * step;
        break;
      case "N":
        waypoint[0] += step;
        break;
      case "E":
        waypoint[90] += step;
        break;
      case "S":
        waypoint[180] += step;
        break;
      case "W":
        waypoint[270] += step;
        break;
      default:
        console.log("Nop");
        break;
    }
  }
  console.log({ status });
  return Math.abs(status[0] - status[180]) + Math.abs(status[90] - status[270]);
}

function day12(input) {
  return {
    p1: day12P1(input),
    p2: day12P2(input),
  };
}

let sol;
/*Execute solution*/
sol = day12(input);

console.log({ sol });

const test = `F10
N3
F7
R90
F11`;

function testDemoP1() {
  const actual = day12P1(utils.splitLines(test));
  const expected = 25;

  console.assert(
    actual === expected,
    `Expected: ${expected} actual ${actual}.`
  );
}

function testDemoP2() {
  const actual = day12P2(utils.splitLines(test));
  const expected = 286;
  console.assert(
    actual === expected,
    `Expected: ${expected} actual ${actual}.`
  );
}

//testDemoP1();
testDemoP2();
