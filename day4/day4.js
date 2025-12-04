const grabFile = require('../util')

function parseData(path) {
  const fileContent = grabFile(path);
  const data = fileContent.trim('\n').split('\n').map(line => line.split(""));
  return data;
}

function withinRange(value, min, max) {
  if (value >= min && value < max) return true;
  return false;
}

// This data will be accessible like rolls[0][1], where 0 would be the row, and 1 is a column
function part1(rolls) {
  let result = [];
  const totalLength = rolls.length * rolls[0].length;
  // To access, use equation i * rolls.length + j
  for (let i = 0; i < rolls.length; i++) {
    for (let j = 0; j < rolls[0].length; j++) {
      if (rolls[i][j] === '@') {
        let adjacent = 0;
        if (i - 1 >= 0 && j - 1 >= 0 && rolls[i - 1][j - 1] === '@') { adjacent += 1; }
        if (i - 1 >= 0 && rolls[i - 1][j] === '@') { adjacent += 1; }
        if (i - 1 >= 0 && j + 1 < rolls[0].length && rolls[i - 1][j + 1] === '@') { adjacent += 1; }
        if (j - 1 >= 0 && rolls[i][j - 1] === '@') { adjacent += 1; }
        if (j + 1 < rolls[0].length && rolls[i][j + 1] === '@') { adjacent += 1; }
        if (i + 1 < rolls.length && j - 1 >= 0 && rolls[i + 1][j - 1] === '@') { adjacent += 1; }
        if (i + 1 < rolls.length && rolls[i + 1][j] === '@') { adjacent += 1; }
        if (i + 1 < rolls.length && j + 1 < rolls[0].length && rolls[i + 1][j + 1] === '@') { adjacent += 1; }
        if (adjacent < 4) result.push({ x: i, y: j });
      }
    }
  }

  return result;
}

function part2(rolls) {
  const currentArray = rolls;
  let removed = part1(currentArray);
  let result = 0;
  while (removed.length > 0) {
    result += removed.length;
    removed.forEach(item => {
      currentArray[item.x][item.y] = '.';
    });
    removed = part1(currentArray);
  }
  return result;
}

function day4() {
  const testData = parseData('./test_input.txt');
  const realData = parseData('./input.txt');

  console.log(part1(testData).length);
  console.log(part1(realData).length);
  console.log(part2(testData));
  console.log(part2(realData));
}

day4();
