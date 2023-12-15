const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\n");

const cardStrength = new Map([
  ["2", 2],
  ["3", 3],
  ["4", 4],
  ["5", 5],
  ["6", 6],
  ["7", 7],
  ["8", 8],
  ["9", 9],
  ["10", 10],
  ["J", 11],
  ["Q", 12],
  ["K", 13],
  ["A", 14],
]);

let total = 0;

const main = () => {
  const sorted = lines.sort((a, b) => {
    // Parse hand itself
    const firstHand = convertToMap(a.split(" ")[0]);
    const secondHand = convertToMap(b.split(" ")[0]);

    // Implement sorting algo highest number returned at top

    // 5 of a kind
    const firstHas5 = check5(firstHand);
    const secondHas5 = check5(secondHand);
    console.log(firstHand, firstHas5);
    if (firstHas5 === secondHas5) {
      // Move on the next check
    } else {
      // Return whichever one is true
      return firstHas5 ? -1 : 1;
    }

    // 4 of a kind

    // Full house

    // 3 of a kind

    // 2 pair

    // 1 pair

    // high card

    // Else they are equal (only if exactly the same cards)
    return 0;
  });
  console.log(sorted);
};

const convertToMap = (hand: string) => {
  const handMap = new Map<string, number>();

  for (const char of hand) {
    if (handMap.has(char)) {
      handMap.set(char, handMap.get(char)! + 1);
    } else {
      handMap.set(char, 1);
    }
  }

  return handMap;
};

const check5 = (hand: Map<string, number>) => {
  // Check
  for (const [key, value] of hand) {
    if (value === 5) {
      // found 5 of a kind
      console.log("has 5 of a kind:", hand);
      return true;
    }
  }
  return false;
};

for (const line of lines) {
  // console.log(line);
}

main();
