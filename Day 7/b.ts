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
  ["T", 10],
  ["J", 1],
  ["Q", 12],
  ["K", 13],
  ["A", 14],
]);

let total = 0;

const main = () => {
  const sorted = lines.sort((b, a) => {
    // Parse hand itself
    const firstRawHand = a.split(" ")[0];
    const secondRawHand = b.split(" ")[0];
    const firstHand = convertToMap(firstRawHand);
    const secondHand = convertToMap(secondRawHand);

    // Implement sorting algo highest number returned at top

    // 5 of a kind
    const fiveCheck = checkXofAKind(
      firstHand,
      secondHand,
      5,
      firstRawHand,
      secondRawHand
    );

    if (fiveCheck !== 0) return fiveCheck;

    // 4 of a kind
    const fourCheck = checkXofAKind(
      firstHand,
      secondHand,
      4,
      firstRawHand,
      secondRawHand
    );

    if (fourCheck !== 0) return fourCheck;

    // Full house
    const fullHouseCheck = checkFullHouse(
      firstHand,
      secondHand,
      firstRawHand,
      secondRawHand
    );

    if (fullHouseCheck !== 0) return fullHouseCheck;

    // 3 of a kind
    const threeCheck = checkXofAKind(
      firstHand,
      secondHand,
      3,
      firstRawHand,
      secondRawHand
    );

    if (threeCheck !== 0) return threeCheck;

    // 2 pair
    const twoPairCheck = checkTwoPair(
      firstHand,
      secondHand,
      firstRawHand,
      secondRawHand
    );

    if (twoPairCheck !== 0) return twoPairCheck;

    // 1 pair
    const twoCheck = checkXofAKind(
      firstHand,
      secondHand,
      2,
      firstRawHand,
      secondRawHand
    );

    if (twoCheck !== 0) return twoCheck;

    // high card (misleading in prompt)
    return checkSecondaryRule(firstRawHand, secondRawHand);
  });

  // Now calculate total
  sorted
    .map((x) => x.split(" "))
    .forEach((hand, i) => {
      total += (i + 1) * parseInt(hand[1]);
    });
  console.log(total);
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

const checkSecondaryRule = (firstHand: string, secondHand: string) => {
  for (let i = 0; i < 5; i++) {
    if (cardStrength.get(firstHand[i])! > cardStrength.get(secondHand[i])!) {
      return -1;
    } else if (
      cardStrength.get(firstHand[i])! < cardStrength.get(secondHand[i])!
    ) {
      return 1;
    }
  }
  return 0;
};

const checkX = (hand: Map<string, number>, number: number) => {
  // Jokers are considered one of the x
  let jokers = hand.get("J");
  if (!jokers) jokers = 0;
  if (jokers === 5) return true;

  const copiedHand = new Map(hand);
  copiedHand.delete("J");

  // Or number - jokers. Prob just pass a param for joker count
  for (const value of copiedHand.values()) {
    if (value === number - jokers) {
      // found x of a kind
      return true;
    }
  }
  return false;
};

const checkXofAKind = (
  firstHand: Map<string, number>,
  secondHand: Map<string, number>,
  number: number,
  firstRawHand: string,
  secondRawHand: string
) => {
  const firstHasX = checkX(firstHand, number);
  const secondHasX = checkX(secondHand, number);
  if (firstHasX && secondHasX) {
    return checkSecondaryRule(firstRawHand, secondRawHand);
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
  secondHand: Map<string, number>,
  firstRawHand: string,
  secondRawHand: string
) => {
  // Reverse the map
  const firstMap = new Map();
  const secondMap = new Map();
  for (const [key, value] of firstHand) firstMap.set(value, key);
  for (const [key, value] of secondHand) secondMap.set(value, key);

  let firstJokers = firstHand.get("J");
  if (!firstJokers) firstJokers = 0;

  let secondJokers = secondHand.get("J");
  if (!secondJokers) secondJokers = 0;

  // Essentially we want to check if it's two pair plus a joker
  const firstFullHouse =
    (firstMap.has(3) && firstMap.has(2)) ||
    (checkStandardTwoPair(firstHand) && firstJokers === 1);
  const secondFullHouse =
    (secondMap.has(3) && secondMap.has(2)) ||
    (checkStandardTwoPair(secondHand) && secondJokers === 1);

  if (firstFullHouse && secondFullHouse) {
    return checkSecondaryRule(firstRawHand, secondRawHand);
  } else if (!firstFullHouse && !secondFullHouse) {
    return 0;
  } else {
    return firstFullHouse ? -1 : 1;
  }
};

const checkTwoPair = (
  firstHand: Map<string, number>,
  secondHand: Map<string, number>,
  firstRawHand: string,
  secondRawHand: string
) => {
  let firstJokers = firstHand.get("J");
  if (!firstJokers) firstJokers = 0;

  let secondJokers = secondHand.get("J");
  if (!secondJokers) secondJokers = 0;

  // Here would only need a pair and a joker or 2 jokers
  let firstPairCount = 0;
  for (const value of firstHand.values()) {
    if (value === 2) firstPairCount++;
  }

  let secondPairCount = 0;
  for (const value of secondHand.values()) {
    if (value === 2) secondPairCount++;
  }

  let firstHasTwoPair = false;
  let secondHasTwoPair = false;

  if (
    firstPairCount === 2 ||
    firstJokers === 2 ||
    (firstPairCount === 1 && firstJokers === 1)
  ) {
    firstHasTwoPair = true;
  }

  if (
    secondPairCount === 2 ||
    secondJokers === 2 ||
    (secondPairCount === 1 && secondJokers === 1)
  ) {
    secondHasTwoPair = true;
  }

  if (firstHasTwoPair && secondHasTwoPair) {
    return checkSecondaryRule(firstRawHand, secondRawHand);
  } else if (!firstHasTwoPair && !secondHasTwoPair) {
    return 0;
  } else {
    return firstHasTwoPair ? -1 : 1;
  }
};

const checkStandardTwoPair = (hand: Map<string, number>) => {
  let count = 0;
  for (const value of hand.values()) {
    if (value === 2) count++;
  }

  if (count === 2) return true;
};

main();
