const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\n");

const main = (lines: string[]) => {
  let total = 0;

  lines.forEach((line, i) => {
    Array.from(line).forEach((char, j) => {
      if (char === "*") {
        total += checkAdjacent(i, j);
      }
    });
  });

  console.log(total);
};

const isNumber = (num: string) => {
  return !isNaN(parseInt(num));
};

const checkNumbers = (i: number, j: number) => {
  if (isNumber(lines[i].charAt(j))) {
    let num = "";
    while (j - 1 >= 0 && isNumber(lines[i].charAt(j - 1))) {
      j--;
    }
    while (j <= lines[i].length && isNumber(lines[i].charAt(j))) {
      num = num.concat(lines[i].charAt(j));
      j++;
    }
    // console.log(num);
    return parseInt(num);
  }
  return false;
};

const checkAdjacent = (i: number, j: number) => {
  const nums = new Set<number>();
  const possibleSpots = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  for (const spot of possibleSpots) {
    const number = checkNumbers(i + spot[0], j + spot[1]);
    if (number) {
      nums.add(number);
    }
  }
  console.log(nums);
  if (nums.size > 1) {
    let gear = 1;
    for (const num of nums) {
      gear *= num;
    }
    return gear;
  }
  return 0;
};

main(lines);
