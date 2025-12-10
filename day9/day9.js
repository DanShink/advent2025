const grabFile = require('../util');

function parseData(path) {
  const fileContent = grabFile(path);
  const lineArray = fileContent.split('\n');
  lineArray.pop();
  return lineArray.map(line => {
    const values = line.split(',');
    return {
      x: Number(values[0]),
      y: Number(values[1]),
    }
  })
}

function part1(data) {
  let result = 0;
  for (let coord1 = 0; coord1 < data.length - 1; coord1++) {
    for (let coord2 = coord1; coord2 < data.length; coord2++) {
      const currArea = (Math.abs(data[coord1].x - data[coord2].x) + 1) * (Math.abs(data[coord1].y - data[coord2].y) + 1);
      if (currArea > result) {
        result = currArea;
      }
    }
  }
  console.log(result);
}

function isPointInside(coord, verticalEdges) {
  let intersections = 0;

  for (const edge of verticalEdges) {
    if (edge.x > coord.x) {
      if (edge.yMin <= coord.y && coord.y < edge.yMax) {
        intersections += 1;
      }
    }
  }
  return intersections % 2 === 1;
}

function intersectsRectangle(verticalEdges, horizontalEdges, xMin, xMax, yMin, yMax) {
  for (const edge of verticalEdges) {
    if (xMin < edge.x && edge.x < xMax) {
      const overlapMin = Math.max(edge.yMin, yMin);
      const overlapMax = Math.min(edge.yMax, yMax);
      if (overlapMin < overlapMax) {
        return true;
      }
    }
  }

  for (const edge of horizontalEdges) {
    if (yMin < edge.y && edge.y < yMax) {
      const overlapMin = Math.max(edge.xMin, xMin);
      const overlapMax = Math.min(edge.xMax, xMax);
      if (overlapMin < overlapMax) {
        return true;
      }
    }
  }
  return false;

}

function part2(data) {
  const redTiles = data;
  const verticalEdges = [];
  const horizontalEdges = [];

  for (let corner = 0; corner < redTiles.length; corner++) {
    const t1 = redTiles.at(corner);
    const t2 = redTiles.at(corner + 1 < redTiles.length ? corner + 1 : 0);
    if (t1.x === t2.x) {
      const minY = Math.min(t1.y, t2.y);
      const maxY = Math.max(t1.y, t2.y);
      verticalEdges.push({
        x: t1.x,
        yMin: minY,
        yMax: maxY,
      })
    }
    if (t1.y === t2.y) {
      const minX = Math.min(t1.x, t2.x);
      const maxX = Math.max(t1.x, t2.x);
      horizontalEdges.push({
        xMin: minX,
        xMax: maxX,
        y: t1.y,
      })
    }
  }
  let result = 0;
  for (let c1 = 0; c1 < redTiles.length - 1; c1++) {
    for (let c2 = c1 + 1; c2 < redTiles.length; c2++) {
      const t1 = redTiles[c1];
      const t2 = redTiles[c2];
      const width = Math.abs(t1.x - t2.x) + 1;
      const height = Math.abs(t1.y - t2.y) + 1;
      const area = width * height;
      if (area <= result) continue;
      const xMin = Math.min(t1.x, t2.x);
      const xMax = Math.max(t1.x, t2.x);
      const yMin = Math.min(t1.y, t2.y);
      const yMax = Math.max(t1.y, t2.y);

      const interiorPoint = { x: xMin + 0.1, y: yMin + 0.1 };
      if (isPointInside(interiorPoint, verticalEdges)) {
        if (!intersectsRectangle(verticalEdges, horizontalEdges, xMin, xMax, yMin, yMax)) {
          result = area;
        }
      }
    }
  }
  console.log(result);

}

function day9() {
  const testData = parseData('./test_input.txt');
  const data = parseData('./input.txt');
  part1(testData);
  part1(data);
  part2(testData);
  part2(data);
}

day9();
