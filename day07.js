var utils = require("./utils.js");
const input = utils.readLinesFromFile("./input/day07.txt");

function day07P1(input) {
  const bagRules = {};

  input.forEach((line) => {
    const [bag, contains] = line.split(" bags contain ");
    const rules = contains.split(/ bag[s]?[,.]?/);

    // upsert
    if (!bagRules[bag]) {
      bagRules[bag] = { parents: new Map([]), children: new Map([]) };
    }

    for (let i = 0; i < rules.length - 1; i++) {
      const rule = rules[i].trim(); // `number color1 color2` ex. '1 bright white'

      if ("no other" !== rule) {
        const [n, childBag] = rule.split(/\s(.+)/);
        const peso = Number(n);
        console.assert(
          typeof peso === "number" && peso > 0,
          `Not integer: ${peso}`
        ); //Ya he fallado bastante en esto
        bagRules[bag].children.set(childBag, peso);
        // upsert childen
        if (!bagRules[childBag]) {
          bagRules[childBag] = { parents: new Map([]), children: new Map([]) };
        }

        bagRules[childBag].parents.set(bag, peso);
      }
    }
  });

  const GOAL_NODE = "shiny gold";
  const visited = new Set([GOAL_NODE]);
  // console.log(bagRules);

  function cuentaPadres(nodoKey) {
    const parents = Array.from(bagRules[nodoKey].parents.keys());
    let cuenta = 0;

    for (let i = 0; i < parents.length; i++) {
      const element = parents[i];
      if (!visited.has(element)) {
        visited.add(element);
        cuenta += 1 + cuentaPadres(element);
      }
    }

    return cuenta;
  }

  function cuentaPadresPrimerIntetnto(nodoKey) {
    // console.log(nodoKey, visited);
    return Array.from(bagRules[nodoKey].parents.keys())
      .filter((c) => !visited.has(c))
      .reduce((acc, curr) => {
        visited.add(curr);
        return acc + 1 + cuentaPadres(curr);
      }, 0);
  }

  /*   for (const [k, v] of Object.entries(bagRules)) {
    console.log(v.parents);
    console.log(v.children);
  } */

  let bagsThatCanContainShiny = cuentaPadres(GOAL_NODE);

  return bagsThatCanContainShiny;
}

function sumBags(node, bagRules) {
  return (
    bagRules[node].length +
    bagRules[node].reduce(
      (acc, [current, count]) => acc + count * sumBags(current, bagRules),
      0
    )
  );
}

function day07P2(input) {
  const bagRules = {};

  input.forEach((line) => {
    const [bag, contains] = line.split(" bags contain ");
    const rules = contains.split(/ bag[s]?[,.]?/);

    // upsert
    if (!bagRules[bag]) {
      bagRules[bag] = { parents: new Map([]), children: new Map([]) };
    }

    for (let i = 0; i < rules.length - 1; i++) {
      const rule = rules[i].trim(); // `number color1 color2` ex. '1 bright white'

      if ("no other" !== rule) {
        const [n, childBag] = rule.split(/\s(.+)/);
        const peso = Number(n);
        console.assert(
          typeof peso === "number" && peso > 0,
          `Not integer: ${peso}`
        ); //Ya he fallado bastante en esto
        bagRules[bag].children.set(childBag, peso);
        // upsert childen
        if (!bagRules[childBag]) {
          bagRules[childBag] = { parents: new Map([]), children: new Map([]) };
        }

        bagRules[childBag].parents.set(bag, peso);
      }
    }
  });

  const GOAL_NODE = "shiny gold";
  const visited = new Set([GOAL_NODE]);
  //console.log(bagRules);

  function cuentaBolsas(nodoKey) {
    const children = Array.from(bagRules[nodoKey].children.entries());
    let cuenta = 0;

    for (let i = 0; i < children.length; i++) {
      const [element, peso] = children[i];
      cuenta += peso + peso * cuentaBolsas(element);
    }

    return cuenta;
  }

  /*   for (const [k, v] of Object.entries(bagRules)) {
    console.log(v.parents);
    console.log(v.children);
  } */

  let bagsThatCanContainShiny = cuentaBolsas(GOAL_NODE);

  return bagsThatCanContainShiny;
}

function day07(input) {
  return {
    p1: day07P1(input),
    p2: day07P2(input),
  };
}

let sol;
sol = day07(input);
console.log({ sol });

const test = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`;

function testDemo() {
  const actual = day07P1(utils.splitLines(test));
  const objectBag = "shiny gold";
  const expected = 4;
  console.assert(actual === expected, `Expected: ${expected}==${actual}.`);
}

function testDemo2() {
  const actual = day07P2(utils.splitLines(test));
  const expected = 32;
  console.assert(actual === expected, `Expected: ${expected}==${actual}.`);
}

const test2 = `shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.`;

function testDemo2_2() {
  const actual = day07P2(utils.splitLines(test2));
  const expected = 126;
  console.assert(actual === expected, `Expected: ${expected}==${actual}.`);
}
testDemo();
testDemo2();
testDemo2_2();
