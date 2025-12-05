const grabFile = require('../util')

function parseData(path) {
  const [rangesPart, numbersPart] = grabFile(path).trim().split(/\n\s*\n/);
  const ranges = rangesPart.split('\n').map(range => {
    const [min, max] = range.split('-');
    return {
      min: Number(min),
      max: Number(max),
    }
  });
  const numbers = numbersPart.split('\n').map(number => Number(number));
  return [ranges, numbers];
}

function part1(path) {
  // const ranges, ids = parseData(path);
  const [ranges, numbers] = parseData(path);
  let result = 0;
  numbers.forEach(number => {
    let included = false;
    for (let i = 0; i < ranges.length; i++) {
      if (number >= ranges[i].min && number <= ranges[i].max) {
        included = true;
        break;
      }
    }
    if (included) {
      result += 1;
    }
  });
  console.log(result);
}

function mergeRanges(ranges) {
  const sorted = ranges.sort((a, b) => a.min - b.min);
  const result = [];
  result.push(sorted[0]);
  for (let i = 1; i < sorted.length; i++) {
    const last = result[result.length - 1];
    const current = sorted[i];

    if (current.min <= last.max) {
      last.max = Math.max(last.max, current.max);
    } else {
      result.push(current);
    }
  }

  return result;
}

function part2(path) {
  const [ranges, numbers] = parseData(path);
  const merged = mergeRanges(ranges);
  let result = 0;
  merged.forEach(merge => {
    result += (merge.max - merge.min + 1);
  })
  console.log(result);
}

function day5() {
  part1('./test_input.txt');
  part1('./input.txt');
  part2('./test_input.txt');
  part2('./input.txt');
}

day5();
