const grabFile = require('../util');

function parseData(path) {
  const fileContent = grabFile(path);
  const data = fileContent.split('\n');
  data.pop();
  return data;
}

String.prototype.replaceAt = function(index, replacement) {
  return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

function part1(data) {
  let result = 0;
  const sLoc = data[0].indexOf('S');
  data[1] = data[1].replaceAt(sLoc, '|');
  for (let row = 2; row < data.length; row++) {
    for (let col = 0; col < data[row].length; col++) {
      // If the char above isn't '|' go to next
      if (data[row-1][col] !== '|') continue;
      // If '|' we have two options
      // Current Char is not '^'
      if (data[row][col] !== '^') {
        data[row] = data[row].replaceAt(col, '|');
        continue;
      }
      // Current Char is '^'
      data[row] = data[row].replaceAt(col-1, '|')
      data[row] = data[row].replaceAt(col+1, '|')
      result++;
    }
  }
  console.log(result);
  return result;
}

function part2Recurse(data, row, col) {
  if (row === data.length - 1) return 1;
  if (data[row-1][col] === '|' && data[row][col] === '^') {
    data[row] = data[row].replaceAt(col-1, '|');
    data[row] = data[row].replaceAt(col+1, '|');
    return part2Recurse(data, row+1, col-1) + part2Recurse(data, row+1, col+1);
  }
  if (data[row-1][col] === '|') {
    data[row] = data[row].replaceAt(col, '|');
    return part2Recurse(data, row+1, col);
  }
  return 0;
}

function part2(data) {
  let result = 0;
  const sLoc = data[0].indexOf('S');
  data[1] = data[1].replaceAt(sLoc, '|');
  console.log(part2Recurse(data, 2, sLoc));
}

function part2NoRecurse(data) {
  let result = 0;
  const sLoc = data[0].indexOf('S');
  data[1] = data[1].replaceAt(sLoc, '|');
  const map = new Map();
  map.set(`1,${sLoc}`, 1);
  for (let row = 2; row < data.length; row++) {
    const newRow = data[row].split("");
    for (let col = 0; col < data[row].length; col++) {
      if (data[row-1][col] === '|' && data[row][col] !== '^') {
        // map.set(`${row},${col}`, (map.get(`${row},${col}`) ?? 0) + 1);
        const parent = map.get(`${row-1},${col}`) ?? 0;
        map.set(`${row},${col}`, (map.get(`${row},${col}`) ?? 0) + parent);
        newRow[col] = '|';
      }
    }
    for (let col = 0; col < data[row].length; col++) {
      if (data[row-1][col] !== '|') continue;
      if (data[row][col] === '^') {
        const parent = map.get(`${row-1},${col}`) ?? 0;
        // map.set(`${row},${col-1}`, (map.get(`${row},${col-1}`) ?? 0) + parent);
        // map.set(`${row},${col+1}`, (map.get(`${row},${col+1}`) ?? 0) + parent);
        // newRow[col-1] = '|';
        // newRow[col+1] = '|';
        if (col > 0) {
          map.set(`${row},${col-1}`, (map.get(`${row},${col-1}`) ?? 0) + parent);
          newRow[col-1] = '|';
        }

        if (col < data[row].length - 1) {
          map.set(`${row},${col+1}`, (map.get(`${row},${col+1}`) ?? 0) + parent);
          newRow[col+1] = '|';
        }
      }
    }
    data[row] = newRow.join("");
  }
  const lastRow = data.length - 1;
  for (let col = 0; col < data[lastRow].length; col++) {
    result += (map.get(`${lastRow},${col}`) ?? 0);
  }
  console.log(result);
}

function day7() {
  const testData = parseData('./test_input.txt');
  const data = parseData('./input.txt');
  // part1(testData);
  // part1(data);
  part2NoRecurse(testData);
  part2NoRecurse(data);
}

day7();
