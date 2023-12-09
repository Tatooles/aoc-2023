const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\n");

let total = 1;

let parsed = [];

// Parse input
for (const line of lines) {
  let nums = line
    .split(":")[1]
    .trim()
    .split(" ")
    .filter((x) => x !== "");

  parsed.push(nums);
}

for (let i = 0; i < parsed[0].length; i++) {
  // Here is the calculation logic
  const duration = parseInt(parsed[0][i]);
  const record = parseInt(parsed[1][i]);

  let wins = 0;
  // Calculate distance
  // I think we have to loop all the way up until duration
  for (let j = 0; j < duration; j++) {
    let distance = 0;
    const speed = j;
    const remainingDuration = duration - j;
    distance = speed * remainingDuration;
    if (distance > record) {
      wins++;
    }
  }
  total *= wins;
}
console.log(total);
