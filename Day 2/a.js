import { constants } from "buffer";
import { promises as fsPromises } from "fs";

// Read text file, separating by line
const filename = "input.txt";

const data = await fsPromises.readFile(filename, "utf-8");

const arr = data.split(/\r?\n/);

let total = 0;

const colors = new Map([
  ["red", 12],
  ["green", 13],
  ["blue", 14],
]);

for (const row of arr) {
  let valid = true;
  const [game, values] = row.split(":");
  const gameNumber = parseInt(game.split(" ")[1]);

  const draws = values.split(";");
  for (const draw of draws) {
    const cubes = draw.split(",");
    for (const cube of cubes) {
      const split = cube.split(" ");
      console.log(split[1], split[2]);
      if (colors.get(split[2]) < parseInt(split[1])) {
        valid = false;
      }
    }
  }
  if (valid) total += gameNumber;
}

console.log(total);
