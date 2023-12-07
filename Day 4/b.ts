const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\n");

const workingList = [];

for (const line of lines) {
  const number = parseInt(line.split(":")[0].replace("Card", ""));
  const split = line.split(":")[1].split("|");

  const winners = split[0]
    .trim()
    .split(" ")
    .map((x) => parseInt(x))
    .filter((x) => !isNaN(x));
  const actual = split[1]
    .trim()
    .split(" ")
    .map((x) => parseInt(x))
    .filter((x) => !isNaN(x));

  let winCount = 0;
  actual.forEach((num) => {
    if (winners.includes(num)) winCount++;
  });

  workingList.push({ number, winners, actual, winCount });
}

const cards = [...workingList];

for (let i = 0; i < cards.length; i++) {
  for (let j = 0; j < cards[i].winCount; j++) {
    cards.push(workingList[cards[i].number + j]);
  }
}

console.log(cards.length);
