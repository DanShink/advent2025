const fs = require('fs')

function rangeSolverPart1(lower, upper) {
  let total = 0;
  for (let i = lower; i <= upper; i++) {
    const stringNum = i.toString();
    if (stringNum.length % 2 === 0) {
      // If Even and the front half equals the back half
      if (stringNum.slice(0, stringNum.length / 2) === stringNum.slice(stringNum.length / 2, stringNum.length)) {
        total += i;
      }
    } else {
      // Didn't read the problem closely enough, odds don't matter here;
      continue;
      // If Odd, the middle doesn't matter. Check 
      if (stringNum.length === 1) {
        total += i;
      } else if (stringNum.slice(0, Math.floor(stringNum.length / 2)) === stringNum.slice(Math.ceil(stringNum.length / 2), stringNum.length)) {
        total += i;
      }
    }
  }
  return total;
}

function rangeSolverPart2(lower, upper) {
  let total = 0;
  for (let i = lower; i <= upper; i++) {
    const stringNum = i.toString();
    if (stringNum.length === 1) continue;
    // Now we're working with a single string number
    // let's loop up to halfway of the string to find some substring repeats;
    for (let j = 1; j < stringNum.length / 2 + 1; j++) {
      const numSubString = stringNum.slice(0, j); 
      if (numSubString.repeat(Math.ceil(stringNum.length / numSubString.length)) === stringNum) {
        total += i;
        break;
      }
    }
  }
  return total;
}

function grabFile() {
  try {
    const fileContent = fs.readFileSync('./input.txt', 'utf8');
    return fileContent;
  } catch (err) {
    console.error('Error reading file');
  }
  return 0;
}

function day2Solver() {
  const fileContent = grabFile();
  let result1 = 0;
  let result2 = 0;
  const rangesArray = fileContent.split(',');
  rangesArray.forEach(range => {
    const lowerAndUpper = range.split('-');
    result1 += rangeSolverPart1(Number(lowerAndUpper[0]), Number(lowerAndUpper[1]));
    result2 += rangeSolverPart2(Number(lowerAndUpper[0]), Number(lowerAndUpper[1]));
  });
  console.log(result1);
  console.log(result2);
}

day2Solver();
