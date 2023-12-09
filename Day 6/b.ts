const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\n");

const parsed = [];

// Parse input
for (const line of lines) {
  parsed.push(
    line
      .split(":")[1]
      .trim()
      .split(" ")
      .filter((x) => x !== "")
      .join("")
  );
}

// Run calculations
const duration = parseInt(parsed[0]);
const record = parseInt(parsed[1]);

let wins = 0;

// Loop all the way up until duration to hit all possible outcomes
for (let j = 0; j < duration; j++) {
  if (j * (duration - j) > record) wins++;
}

console.log(wins);
