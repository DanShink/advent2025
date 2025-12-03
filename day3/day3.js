const fs = require('fs');

function grabFile() {
  try {
    const fileContent = fs.readFileSync('./input.txt', 'utf8');
    return fileContent;
  } catch (err) {
    console.error('Error reading file');
  }
  return 0;
}

function findLargestNumber(value) {
  // Can't use the last number because that would only be one digit
  let firstDigit = value[0];
  let firstIndex = 0;
  // First pass
  for (let x = 1; x < value.length - 1; x++) {
    if (Number(firstDigit) < Number(value[x])) {
      firstDigit = value[x];
      firstIndex = x;
    }
  }
  let secondDigit = value[firstIndex + 1];
  let secondIndex = firstIndex + 1;
  for (let y = firstIndex + 1; y < value.length; y++) {
    if (Number(secondDigit) < Number(value[y])) {
      secondDigit = value[y];
      secondIndex = y;
    }
  }
  return Number(`${firstDigit}${secondDigit}`);
}

function part1(values) {
  let total = 0;
  for (let i = 0; i < values.length; i++) {
    total += findLargestNumber(values[i]);
  }
  return total;
}

function findLargestNumber12(value) {
  let result = "";
  let index = 0;
  while (result.length < 12) {
    // Keep going until the amount of free spaces remaining is less than the amount of digits we need
    for (let i = index; i <= value.length - (12 - result.length); i++) {
      if (Number(value[index]) < Number(value[i])) {
        index = i;
      }
    }
    result = `${result}${value[index]}`;
    index += 1;
  }
  return Number(result);
}

function findLargestNumberX(value, digits) {
  let result = "";
  let index = 0;
  while (result.length < digits) {
    // Keep going until the amount of free spaces remaining is less than the amount of digits we need
    for (let i = index; i <= value.length - (digits - result.length); i++) {
      if (Number(value[index]) < Number(value[i])) {
        index = i;
      }
    }
    result = `${result}${value[index]}`;
    index += 1;
  }
  return Number(result);
}

function part2(values) {
  let total = 0;
  for (let i = 0; i < values.length; i++) {
    total += findLargestNumber12(values[i]);
  }
  return total;
}

function generalizedSolution(values) {
  let total1 = 0;
  let total2 = 0;
  for (let i = 0; i < values.length; i++) {
    total1 += findLargestNumberX(values[i], 2);
    total2 += findLargestNumberX(values[i], 12)
  }
  console.log(total1);
  console.log(total2);
}

function day3() {
  const fileContent = grabFile();
  const numberArray = fileContent.split('\n');
  numberArray.pop();
  console.log(part1(numberArray));
  console.log(part2(numberArray));
  generalizedSolution(numberArray);
}

day3();
