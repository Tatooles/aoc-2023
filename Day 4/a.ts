const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\n");

let total = 0;

for (const line of lines) {
  // console.log(line);
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

  if (winCount > 0) {
    total += Math.pow(2, winCount - 1);
  }

  // console.log("winners", winners);
  // console.log("actual", actual);
}
console.log(total);
