var utils = require("./utils.js");
const inputPre = utils.readFromFile("./input/day04.txt");
const input = inputPre.split(/\n\n/);
/* const inputPost = passData.map((line) => {
    const inputParts = line.split(/[:\s]/);
    return inputParts;
}); */
const IDS = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid", "cid"];

function day04P1(input) {
  let validPassCount = 0;
  for (let i = 0; i < input.length; i++) {
    let valid = true;
    for (let j = 0; j < IDS.length - 1; j++) {
      //avoid 'cid
      const index = input[i].indexOf(IDS[j]);
      if (index == -1) {
        valid = false;
        break;
      }
    }
    if (valid) {
      validPassCount++;
    }
  }
  return validPassCount;
}

function day04P2(input) {
  let validPassCount = 0;

  for (let i = 0; i < input.length; i++) {
    let valid = true;
    for (let j = 0; j < IDS.length - 1; j++) {
      //avoid 'cid
      const index = input[i].indexOf(IDS[j]);
      if (index == -1) {
        valid = false;
        break;
      }
      /* 
      byr (Birth Year) - four digits; at least 1920 and at most 2002.
iyr (Issue Year) - four digits; at least 2010 and at most 2020.
eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
hgt (Height) - a number followed by either cm or in:
If cm, the number must be at least 150 and at most 193.
If in, the number must be at least 59 and at most 76.
hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
pid (Passport ID) - a nine-digit number, including leading zeroes.
cid (Country ID) - ignored, missing or not. */
      const inputParts = input[i].split(/[:\s]/);

      const value = inputParts[inputParts.indexOf(IDS[j]) + 1];
      // console.log({ value });
      switch (IDS[j]) {
        case "byr":
          const byr = Number(value);
          if (byr < 1920 || byr > 2002) {
            //console.info({ byr });
            valid = false;
          }
          break;
        case "iyr":
          const iyr = Number(value);

          if (iyr < 2010 || iyr > 2020) {
            //console.info({ iyr });
            valid = false;
          }
          break;
        case "eyr":
          const eyr = Number(value);
          if (eyr < 2020 || eyr > 2030) {
            //console.info({ eyr });
            valid = false;
          }
          break;
        case "hgt":
          const cm = value.indexOf("cm");
          const inch = value.indexOf("in");
          //El Error: const hgt = Number(value.substring(-2));

          const hgt = Number(value.substring(0, value.length - 2));
          // console.info({ value, hgt });

          /*  const hgtT = /((1[5-8]\d|19[0-3])cm|(59|6\d|7[0-6])in)/.test(value);
          if (!hgtT) {
            console.info({ value });
            valid = false;
            break;
          } */
          if (cm !== -1) {
            if (hgt < 150 || hgt > 193) {
              //console.info({ hgt }, "cm");
              valid = false;
            }
          } else if (inch !== -1) {
            if (hgt < 59 || hgt > 76) {
              //console.info({ hgt }, "in");
              valid = false;
            }
          } else {
            valid = false;
            //console.info({ hgt, value });
          } /**/
          //console.info({ hgt }, "in");
          break;
        case "hcl":
          let hcl = value;
          const hi = /^#[a-z0-f]{6}($|\s)/.test(hcl);
          if (!hi) {
            //console.info({ hcl });
            valid = false;
          }
          break;
        case "ecl":
          let ecl = value;
          const eclT = /^(amb|blu|brn|gry|grn|hzl|oth)($|\s)/.test(ecl);
          if (!eclT) {
            valid = false;
          }

          break;
        case "pid":
          let pid = value;
          const pidT = /^[0-9]{9}($|\s)/.test(pid);
          if (!pidT) {
            valid = false;
          }
          break;
        default:
          break;
      }
      if (!valid) {
        break;
      }
    }
    if (valid) {
      //console.log(input[i].split(/[:\s]/), input[i].split(/[:\s]/).length);
      validPassCount++;
    }
  }
  return validPassCount;
}

function day04(input) {
  return {
    p1: day04P1(input),
    p2: day04P2(input),
  };
}

const sol = day04(input);
console.log({ sol });

const test = `ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in`;

function testDemo() {
  const actual = day04P1(test.split(/\n\n/));
  const expected = 2;
  console.assert(actual === expected, `Expected: ${expected}==${actual}.`);
}
const test2 = `eyr:1972 cid:100
hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926

iyr:2019
hcl:#602927 eyr:1967 hgt:170cm
ecl:grn pid:012533040 byr:1946

hcl:dab227 iyr:2012
ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277

hgt:59cm ecl:zzz
eyr:2038 hcl:74454a iyr:2023
pid:3556412378 byr:2007

pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
hcl:#623a2f

eyr:2029 ecl:blu cid:129 byr:1989
iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm

hcl:#888785
hgt:164cm byr:2001 iyr:2015 cid:88
pid:545766238 ecl:hzl
eyr:2022

iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719`;

function testDemo2() {
  const actual = day04P2(test2.split(/\n\n/));
  const expected = 4;
  console.assert(actual === expected, `Expected: ${expected}==${actual}.`);
}

function testP2() {
  const actual = day04P2(utils.splitLines(test));
  const expected = 123123123;
  console.assert(actual === expected, `Expected: ${expected}==${actual}.`);
}

testDemo();
testDemo2();

//testP1();
//testP2();
