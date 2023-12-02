import { promises as fsPromises } from "fs";

// Read text file, separating by line
const filename = "input.txt";

const data = await fsPromises.readFile(filename, "utf-8");

const arr = data.split(/\r?\n/);

let total = 0;

for (const row of arr) {
  let firstNum;
  let lastNum;

  // Just go through twice, once starting from beginning, once from end
  for (let i = 0; i < row.length; i++) {
    if (!isNaN(parseInt(row[i]))) {
      firstNum = row[i];
      break;
    }
  }

  for (let i = row.length - 1; i >= 0; i--) {
    if (!isNaN(parseInt(row[i]))) {
      lastNum = row[i];
      break;
    }
  }
  total += parseInt(firstNum.concat(lastNum));
}

console.log(total);
