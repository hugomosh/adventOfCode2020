var utils = require("./utils.js");
const input = utils.readLinesFromFile("./input/day11.txt");

function day11P1(input) {
  let validPassCount = 0;
  let currentMap = input;
  let nextMap = getNextMap(input);
  while (nextMap.join("") !== currentMap.join("") && validPassCount < 1000000) {
    // console.log(nextMap.join("\n"), "\n");
    validPassCount++;
    currentMap = nextMap;
    nextMap = getNextMap(currentMap);
  }
  return nextMap.join("").split("#").length - 1;
}

function getNextMap(mapa) {
  const newMap = [];
  for (let i = 0; i < mapa.length; i++) {
    const element = mapa[i];
    let newLine = "";
    for (let j = 0; j < element.length; j++) {
      const seat = element.charAt(j);

      /* 
If a seat is empty (L) and there are no occupied seats adjacent to it, the seat becomes occupied.
If a seat is occupied (#) and four or more seats adjacent to it are also occupied, the seat becomes empty.
Otherwise, the seat's state does not change. 
*/
      //console.log({ i, j, seat, c: countNumberOfSeats(mapa, i, j) });
      let numberOfSeats = 0;
      switch (seat) {
        case ".":
          newLine += ".";
          break;

        case "L":
          numberOfSeats = countNumberOfSeats(mapa, i, j);
          if (numberOfSeats == 0) {
            newLine += "#";
          } else {
            newLine += "L";
          }
          break;
        case "#":
          numberOfSeats = countNumberOfSeats(mapa, i, j);
          if (numberOfSeats >= 4) {
            newLine += "L";
          } else {
            newLine += "#";
          }
          break;

        default:
          break;
      }
    } //end
    newMap.push(newLine);
  }
  return newMap;
}
function getNextMap2(mapa) {
  const newMap = [];
  for (let i = 0; i < mapa.length; i++) {
    const element = mapa[i];
    let newLine = "";
    for (let j = 0; j < element.length; j++) {
      const seat = element.charAt(j);

      /* 
  If a seat is empty (L) and there are no occupied seats adjacent to it, the seat becomes occupied.
  If a seat is occupied (#) and four or more seats adjacent to it are also occupied, the seat becomes empty.
  Otherwise, the seat's state does not change. 
  */
      //console.log({ i, j, seat, c: countNumberOfSeats(mapa, i, j) });
      let numberOfSeats = 0;
      switch (seat) {
        case ".":
          newLine += ".";
          break;

        case "L":
          numberOfSeats = countNumberOfSeats2(mapa, i, j);
          if (numberOfSeats == 0) {
            newLine += "#";
          } else {
            newLine += "L";
          }
          break;
        case "#":
          numberOfSeats = countNumberOfSeats2(mapa, i, j);
          if (numberOfSeats >= 5) {
            newLine += "L";
          } else {
            newLine += "#";
          }
          break;

        default:
          break;
      }
    } //end
    newMap.push(newLine);
  }
  return newMap;
}

function countNumberOfSeats(mapa, i, j) {
  const neighbors = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  let count = 0;
  for (const [x, y] of neighbors) {
    if (
      i + x >= 0 &&
      j + y >= 0 &&
      i + x < mapa.length &&
      j + y < mapa[0].length
    ) {
      if (mapa[i + x].charAt(j + y) === "#") {
        count++;
      }
    }
  }
  return count;
}

function countNumberOfSeats2(mapa, a, b) {
  const neighbors = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  let count = 0;
  for (let [x, y] of neighbors) {
    let i = a,
      j = b;
    while (
      i + x >= 0 &&
      j + y >= 0 &&
      i + x < mapa.length &&
      j + y < mapa[0].length
    ) {
      if (mapa[i + x].charAt(j + y) === "#") {
        count++;
        break;
      } else if (mapa[i + x].charAt(j + y) === "L") {
        break;
      }
      i = i + x;
      j = j + y;
    }
  }
  return count;
}

function day11P2(input) {
  let validPassCount = 0;
  let currentMap = input;
  let nextMap = getNextMap2(input);
  while (nextMap.join("") !== currentMap.join("") && validPassCount < 1000000) {
    console.log(nextMap.join("\n"), "\n");
    validPassCount++;
    currentMap = nextMap;
    nextMap = getNextMap2(currentMap);
  }
  return nextMap.join("").split("#").length - 1;
}

function day11(input) {
  return {
    p1: day11P1(input),
    p2: day11P2(input),
  };
}

let sol;
/*Execute solution*/
sol = day11(input);

console.log({ sol });

const test = `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`;

function testDemoP1() {
  const actual = day11P1(utils.splitLines(test));
  const expected = 37;

  console.assert(
    actual === expected,
    `Expected: ${expected} actual ${actual}.`
  );
}

function testDemoP2() {
  const actual = day11P2(utils.splitLines(test));
  const expected = 26;
  console.assert(
    actual === expected,
    `Expected: ${expected} actual ${actual}.`
  );
}

//testDemoP1();
testDemoP2();
