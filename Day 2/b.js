import { constants } from "buffer";
import { promises as fsPromises } from "fs";

// Read text file, separating by line
const filename = "input.txt";

const data = await fsPromises.readFile(filename, "utf-8");

const arr = data.split(/\r?\n/);

let total = 0;

for (const row of arr) {
  const colors = new Map([
    ["red", -1],
    ["green", -1],
    ["blue", -1],
  ]);

  const draws = row.split(":")[1].split(";");
  for (const draw of draws) {
    const cubes = draw.split(",");
    for (const cube of cubes) {
      const split = cube.split(" ");
      if (colors.get(split[2]) < parseInt(split[1])) {
        colors.set(split[2], split[1]);
      }
    }
  }

  total += colors.get("red") * colors.get("blue") * colors.get("green");
}

console.log(total);
