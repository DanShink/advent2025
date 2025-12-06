const grabFile = require('../util');

function parseData(path) {
  const fileData = grabFile(path);
  const lineArray = fileData.split('\n');
  lineArray.pop();
  const arrayOfArrays = lineArray.map(element => element.trim().split(/\s+/));
  return arrayOfArrays;
}

function calc(operand) {
  if (operand.includes('*')) return (num1, num2) => (Number(num1) * Number(num2));
  if (operand.includes('+')) return (num1, num2) => (Number(num1) + Number(num2));
  return () => {};
}

function part1(data) {
  let sum = 0;
  for (let i = 0; i < data[0].length; i++) {
    let result = data[0][i];
    const operate = calc(data[data.length-1][i]);
    for (let j = 1; j < data.length-1; j++) {
      result = operate(result, data[j][i]);
    }
    sum += result;
  }
  console.log(sum);
}

function parseData2(path) {
  const fileData = grabFile(path);
  const lineArray = fileData.split('\n');
  lineArray.pop();
  const width = lineArray[0].length;
  const numRows = lineArray.length;
  const result = Array.from({ length: numRows }, () => []);

  let colStart = 0;

  const isSpaceCol = (col) => lineArray.every(row => row[col] === ' ');

  for (let col = 1; col <= width; col++) {
    const prevSpace = isSpaceCol(col - 1);
    const currSpace = col < width ? isSpaceCol(col) : true;

    if (prevSpace !== currSpace) {
      const slice = lineArray.map(row => row.slice(colStart, col));

      // Check if slice contains ONLY spaces (in all rows)
      const isEmptySlice = slice.every(s => s.trim() === "");

      if (!isEmptySlice) {
        for (let r = 0; r < numRows; r++) {
          result[r].push(slice[r]);
        }
      }

      colStart = col;
    }
  }

  return result;
}

function part2(data) {
  let sum = 0;
  const numRows = data.length - 1; // last row is operators
  const numCols = data[0].length;

  let result;
  let num = "";
  for (let col = 0; col < numCols; col++) {
    const operatorFn = calc(data[numRows][col]);
    // Go From End of of number "1234" (start at 4) to start "1"
    for (let i = data[0][col].length-1; i >= 0; i--) {
      // For the ammount of rows, add digit to num
      for (let row = 0; row < numRows; row++) {
        num += data[row][col].at(i);
      }
      num = num.replaceAll(' ', '');
      if (i === data[0][col].length-1) {
        result = num;
      } else {
        result = operatorFn(result, num);
      }
      num = "";
    }
    sum += result;
  }

  console.log(sum);
}

function day6() {
  const fileDataTest = parseData('./test_input.txt');
  const fileData = parseData('./input.txt');
  const fileDataTest2 = parseData2('./test_input.txt');
  const fileData2 = parseData2('./input.txt');
  part1(fileDataTest);
  part1(fileData);
  part2(fileDataTest2);
  part2(fileData2);
  
}

day6();
