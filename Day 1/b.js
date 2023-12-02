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
  let firstNum;
  let lastNum;

  let parsedRow = row;

  // We can go through and replace any of the string numbers with the digit then just run this code lol
  for (const [key, value] of stringNumbers) {
    parsedRow = parsedRow.replace(key, value);
    // This doesn't work because it starts with the lowest number, need to start at the beginning of the string :(
  }

  // Just go through twice, once starting from beginning, once from end
  for (let i = 0; i < parsedRow.length; i++) {
    if (!isNaN(parseInt(parsedRow[i]))) {
      firstNum = parsedRow[i];
      break;
    }
  }

  for (let i = parsedRow.length - 1; i >= 0; i--) {
    if (!isNaN(parseInt(parsedRow[i]))) {
      lastNum = parsedRow[i];
      break;
    }
  }
  total += parseInt(firstNum.concat(lastNum));
  // console.log(row, parsedRow);
}

console.log(total);
