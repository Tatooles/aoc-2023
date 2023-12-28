const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\n");

const instructions = lines[0];

let steps = 0;

const main = () => {
  const network = lines.slice(2);
  console.log(instructions, network);

  const map = createMap(network);
  console.log(map);

  let current = network[0].split(" ")[0];

  // While loop to keep reusing instructions
  while (current !== "ZZZ") {
    steps++;

    // TODO: Need better loop through instructions
    for (const char of instructions) {
      console.log(char);
      if (char === "L") {
        // Go left
        current = map.get(current)[0];
      } else {
        current = map.get(current)[1];
      }
    }
  }
  console.log(steps);
};

// Convert string into more useable map
const createMap = (network: string[]) => {
  const map = new Map();

  for (const section of network) {
    // Parse the section
    const str = section.split(" ");
    const source = str[0];
    const left = str[2].slice(1, -1);
    const right = str[3].slice(0, -1);

    map.set(source, [left, right]);
  }

  return map;
};

main();
