const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\n");

let total = 0;

const workingList = [...lines];

const map = new Map();

console.log(lines.length);

for (const line of workingList) {
  // console.log(line);
  const number = parseInt(line.split(":")[0].split(" ")[1]) - 1;
  const split = line.split(":")[1].split("|");
  // console.log(number, split);

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

  // Now we nened logic to add the new rows
  for (let i = 0; i < winCount; i++) {
    // Need to parse out the number of this row
    // console.log(lines[number + i + 1]);
    const index = number + i + 1;
    console.log(index);
    if (index < lines.length - 1) {
      workingList.push(lines[index]);
    }
  }

  total++;

  // console.log("winners", winners);
  // console.log("actual", actual);
}
console.log(total);
