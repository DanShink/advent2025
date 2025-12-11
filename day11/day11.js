const grabFile = require('../util');

function parseData(path) {
  let fileContent = grabFile(path).split('\n');
  fileContent.pop();

  fileContent = fileContent.map(f => {
    const sep = f.split(' ');
    sep[0] = sep[0].substring(0, sep[0].length - 1);
    return {
      key: sep[0],
      values: sep.slice(1, sep.length)
    }
  });
  return fileContent;
}

function findPaths(start, data) {
  if (!start) {
    return 1;
  }
  let result = 0;
  start.values.forEach(v => {
    const newStart = data.find(obj => obj.key === v);
    result += findPaths(newStart, data);
  });
  return result;
}

function part1(data) {
  let you = data.find(obj => obj.key === 'you');
  let result = findPaths(you, data);
  console.log(result);
}

function buildMap(data) {
  const map = {};
  for (const item of data) {
    map[item.key] = item.values;
  }
  return map;
}

function findPaths2(key, map, hasFFT, hasDAC, memo) {
  // If we saw this already, return the already computed result
  const memoKey = `${key}|${hasFFT}|${hasDAC}`;
  if (memoKey in memo) return memo[memoKey];

  if (key === 'fft') hasFFT = true;
  if (key === 'dac') hasDAC = true;
  // If at the end, add this path to memo,and return whether it has FFT & DAC
  if (key === 'out') {
    return memo[memoKey] = (hasFFT && hasDAC ? 1 : 0);
  }

  const nextKeys = map[key];
  if (!nextKeys) return 0;

  let total = 0;
  for (const next of nextKeys) {
    total += findPaths2(next, map, hasFFT, hasDAC, memo);
  }

  memo[memoKey] = total;
  return total;
}


function part2(data) {
  const map = buildMap(data);
  const memo = {};
  let result = findPaths2('svr', map, false, false, memo);
  console.log(result);
}

function day11() {
  const testData = parseData('./test_input.txt');
  const testData2 = parseData('./test_input2.txt');
  const data = parseData('./input.txt');
  part1(testData);
  part1(data);
  part2(testData2);
  part2(data);

}

day11();
