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

lines.sort((a, b) => {
  // Parse hand itself
  const firstHand = a.split(" ")[0];
  const secondHand = b.split(" ")[0];

  console.log(firstHand, secondHand);
  // Implement sorting algo highest number returned at top

  // 5 of a kind

  // 4 of a kind

  // Full house

  // 3 of a kind

  // 2 pair

  // 1 pair

  // high card

  // Else they are equal (only if exactly the same cards)
  return 0;
});

for (const line of lines) {
  // console.log(line);
}
