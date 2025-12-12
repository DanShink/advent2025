const grabFile = require('../util');

function parseData(path) {
  const fileContent = grabFile(path).split('\n\n');
  const areas = [];
  for (let i = 0; i < fileContent.length - 1; i++) {
    areas.push(fileContent[i].split('#').length - 1);
  }
  const grids = fileContent[fileContent.length - 1].split('\n');
  grids.pop();
  const gridObjects = [];
  grids.forEach(grid => {
    const dimMatch = grid.match(/^(\d+)x(\d+):/);
    const width = Number(dimMatch[1]);
    const height = Number(dimMatch[2]);
    gridObjects.push({
      area: width * height,
      values: grid.split(":")[1].trim().split(/\s+/).map(Number)
    });
  });
  return {
    areas,
    gridObjects
  }
}

function part1(data) {
  let result = 0;
  for (let region of data.gridObjects) {
    let areaComp = 0;

    region.values.forEach((v, index) => {
      areaComp += v * data.areas[index];
    });
    if (areaComp <= region.area) {
      result += 1;
    }
  }
  console.log(result);
}

function day12() {
  const testData = parseData('./test_input.txt');
  const data = parseData('./input.txt');
  part1(testData);
  part1(data);
}

day12();
