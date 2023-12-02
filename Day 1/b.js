import { promises as fsPromises } from "fs";

// Read text file, separating by line
const filename = "input.txt";

const data = await fsPromises.readFile(filename, "utf-8");

const arr = data.split(/\r?\n/);

const stringNumbers = new Map([
  ["one", "1"],
  ["two", "2"],
  ["three", "3"],
  ["four", "4"],
  ["five", "5"],
  ["six", "6"],
  ["seven", "7"],
  ["eight", "8"],
  ["nine", "9"],
]);

let total = 0;

for (const row of arr) {
  let firstNumIndex = Number.MAX_SAFE_INTEGER;
  let firstNum;
  let lastNumIndex = -1;
  let lastNum;

  // Just go through twice, once starting from beginning, once from end
  for (let i = 0; i < row.length; i++) {
    if (!isNaN(parseInt(row[i])) && i < firstNumIndex) {
      firstNumIndex = i;
      firstNum = row[i];
      break;
    }

    for (const [key, value] of stringNumbers) {
      const index = row.indexOf(key);
      if (index !== -1 && index < firstNumIndex) {
        firstNumIndex = index;
        firstNum = value;
        break;
      }
    }
  }

  for (let i = row.length - 1; i >= 0; i--) {
    if (!isNaN(parseInt(row[i])) && i > lastNumIndex) {
      lastNumIndex = i;
      lastNum = row[i];
      break;
    }

    for (const [key, value] of stringNumbers) {
      const index = row.indexOf(key, i);
      if (index > lastNumIndex) {
        lastNumIndex = index;
        lastNum = value;
        break;
      }
    }
  }
  total += parseInt(firstNum.concat(lastNum));
  // console.log(row, firstNum, lastNum);
}

console.log(total);
