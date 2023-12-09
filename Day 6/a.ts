const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\n");

let total = 1;

const parsed = [];

// Parse input
for (const line of lines) {
  parsed.push(
    line
      .split(":")[1]
      .trim()
      .split(" ")
      .filter((x) => x !== "")
  );
}

// Run calculations
for (let i = 0; i < parsed[0].length; i++) {
  const duration = parseInt(parsed[0][i]);
  const record = parseInt(parsed[1][i]);

  let wins = 0;

  // Loop all the way up until duration to hit all possible outcomes
  for (let j = 0; j < duration; j++) {
    let distance = 0;
    const remainingDuration = duration - j;
    distance = j * remainingDuration;
    if (distance > record) {
      wins++;
    }
  }
  total *= wins;
}

console.log(total);
