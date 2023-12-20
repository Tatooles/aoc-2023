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
    const fiveCheck = checkXofAKind(firstHand, secondHand, 5);

    if (fiveCheck !== 0) return fiveCheck;

    // 4 of a kind
    const fourCheck = checkXofAKind(firstHand, secondHand, 4);

    if (fourCheck !== 0) return fourCheck;

    // Full house
    const fullHouseCheck = checkFullHouse(firstHand, secondHand);

    if (fullHouseCheck !== 0) return fullHouseCheck;

    // 3 of a kind
    const threeCheck = checkXofAKind(firstHand, secondHand, 3);

    if (threeCheck !== 0) return threeCheck;

    // 2 pair

    // 1 pair
    // AKA 2 of a kind

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

const checkX = (
  hand: Map<string, number>,
  number: number
): [boolean, string] => {
  for (const [key, value] of hand) {
    if (value === number) {
      // found x of a kind
      return [true, key];
    }
  }
  return [false, ""];
};

for (const line of lines) {
  // console.log(line);
}

const checkXofAKind = (
  firstHand: Map<string, number>,
  secondHand: Map<string, number>,
  number: number
) => {
  const [firstHasX, firstXNumber] = checkX(firstHand, number);
  const [secondHasX, secondXNumber] = checkX(secondHand, number);
  if (firstHasX && secondHasX) {
    // Compare value of 5 card number
    if (cardStrength.get(firstXNumber)! > cardStrength.get(secondXNumber)!)
      return -1;
    return 1;
  } else if (!firstHasX && !secondHasX) {
    // Move on to next check
    return 0;
  } else {
    // Return whichever one is true
    return firstHasX ? -1 : 1;
  }
};

const checkFullHouse = (
  firstHand: Map<string, number>,
  secondHand: Map<string, number>
) => {
  // Reverse the map
  const firstMap = new Map();
  const secondMap = new Map();
  for (const [key, value] of firstHand) {
    firstMap.set(value, key);
  }
  for (const [key, value] of secondHand) {
    secondMap.set(value, key);
  }
  const firstFullHouse = firstMap.has(3) && firstMap.has(2);
  const secondFullHouse = secondMap.has(3) && secondMap.has(2);

  if (firstFullHouse && secondFullHouse) {
    // TODO: There are two tiebreakers
    // Not that hard tho
    return 0;
  } else if (!firstFullHouse && !secondFullHouse) {
    return 0;
  } else {
    return firstFullHouse ? -1 : 1;
  }
};

main();
