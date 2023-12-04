const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\n");

const main = (lines: string[]) => {
  let total = 0;

  lines.forEach((line, i) => {
    let currentNumber = "";
    let nearSymbol = false;

    Array.from(line).forEach((char, j) => {
      if (isNumber(char)) {
        // Found number
        currentNumber = currentNumber.concat(char);
        // Just check symbol every time and set flag
        if (checkAdjacent(i, j) === true) nearSymbol = true;
      } else {
        // Not a number, start looking for next number
        if (nearSymbol) {
          // console.log("adding", currentNumber);
          total += parseInt(currentNumber);
        }

        currentNumber = "";
        nearSymbol = false;
      }
    });
    // Check at the end of the line
    if (nearSymbol) {
      // console.log("adding", currentNumber);
      total += parseInt(currentNumber);
    }
  });

  console.log(total);
};

const isNumber = (num: string) => {
  return !isNaN(parseInt(num));
};

const isSymbol = (symbol: string | undefined) => {
  if (!symbol) return false;
  return ["$", "&", "/", "@", "-", "%", "#", "*", "+", "="].includes(symbol);
};

const checkAdjacent = (i: number, j: number) => {
  if (
    isSymbol(lines[i - 1]?.charAt(j)) ||
    isSymbol(lines[i + 1]?.charAt(j)) ||
    isSymbol(lines[i]?.charAt(j - 1)) ||
    isSymbol(lines[i]?.charAt(j + 1)) ||
    isSymbol(lines[i - 1]?.charAt(j - 1)) ||
    isSymbol(lines[i - 1]?.charAt(j + 1)) ||
    isSymbol(lines[i + 1]?.charAt(j - 1)) ||
    isSymbol(lines[i + 1]?.charAt(j + 1))
  ) {
    return true;
  }
  return false;
};

main(lines);
