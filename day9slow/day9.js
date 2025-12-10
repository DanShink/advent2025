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

function part2(data) {
  const redTiles = data;
  const greenTiles = [];
  for (let tile = 0; tile < redTiles.length - 1; tile++) {
    const tile1 = data[tile];
    const tile2 = data[tile + 1];
    if (tile1.x === tile2.x) {
      const minTile = Math.min(tile1.y, tile2.y);
      const maxTile = Math.max(tile1.y, tile2.y);
      for (let i = minTile + 1; i < maxTile; i++) {
        greenTiles.push({
          x: tile1.x,
          y: i,
        })
      }
    }
    if (tile1.y === tile2.y) {
      const minTile = Math.min(tile1.x, tile2.x);
      const maxTile = Math.max(tile1.x, tile2.x);
      for (let i = minTile + 1; i < maxTile; i++) {
        greenTiles.push({
          x: i,
          y: tile1.y,
        })
      }
    }
  }
  const tile1 = data[0];
  const tile2 = data[data.length - 1];
  if (tile1.x === tile2.x) {
    const minTile = Math.min(tile1.y, tile2.y);
    const maxTile = Math.max(tile1.y, tile2.y);
    for (let i = minTile + 1; i < maxTile; i++) {
      greenTiles.push({
        x: tile1.x,
        y: i,
      })
    }
  }
  if (tile1.y === tile2.y) {
    const minTile = Math.min(tile1.x, tile2.x);
    const maxTile = Math.max(tile1.x, tile2.x);
    for (let i = minTile + 1; i < maxTile; i++) {
      greenTiles.push({
        x: i,
        y: tile1.y,
      })
    }
  }
  const fullBoundary = [...redTiles, ...greenTiles];
  const xSort = redTiles.sort((a, b) => a.x - b.x);
  const minX = xSort[0].x;
  const maxX = xSort[xSort.length - 1].x;
  const ySort = redTiles.sort((a, b) => a.y - b.y);
  const minY = ySort[0].y;
  const maxY = ySort[ySort.length - 1].y;
  // let stringArray = "";
  // for (let y = minY; y <= maxY; y++) {
  //   for (let x = minX; x <= maxX; x++) {
  //     if (redTiles.some(obj => obj.x === x && obj.y === y)) {
  //       stringArray += '#';
  //       continue;
  //     }
  //     if (greenTiles.some(obj => obj.x === x && obj.y === y)) {
  //       stringArray += 'X';
  //       continue;
  //     }
  //     stringArray += '.';
  //   }
  //   stringArray += '\n';
  // }

  let result = 0;
  for (let c1 = 0; c1 < redTiles.length; c1++) {
    for (let c2 = c1 + 1; c2 < redTiles.length; c2++) {
      const t1 = redTiles[c1];
      const t2 = redTiles[c2];
      const minX = Math.min(t1.x, t2.x);
      const minY = Math.min(t1.y, t2.y);
      const maxX = Math.max(t1.x, t2.x);
      const maxY = Math.max(t1.y, t2.y);
      const currArea = (maxY - minY + 1) * (maxX - minX + 1);
      let exit = false;
      if (currArea > result) {
        for (let x = minX; x < maxX + 1; x++) {
          if (!inBounds(fullBoundary, { x, y: minY }) || !inBounds(fullBoundary, { x, y: maxY })) exit = true;
          if (exit) break;
        }
        if (exit) break;
        for (let y = minY; y < maxY + 1; y++) {
          if (!inBounds(fullBoundary, { x: minX, y }) || !inBounds(fullBoundary, { x: maxX, y: y })) exit = true;
          if (exit) break;
        }
        if (!(exit)) {
          result = currArea;
        }
      }
    }
    console.log(`${c1} / ${redTiles.length}`);
  }
  console.log(result);
}

function inBounds(tiles, coords) {
  // Check Up
  if (!tiles.some(obj => obj.x === coords.x && obj.y >= coords.y)) return false;
  // Check Down
  if (!tiles.some(obj => obj.x === coords.x && obj.y <= coords.y)) return false;
  // Check Left;
  if (!tiles.some(obj => obj.x <= coords.x && obj.y === coords.y)) return false;
  // Check Right
  if (!tiles.some(obj => obj.x >= coords.x && obj.y === coords.y)) return false;

  return true;
}

function day9() {
  const testData = parseData('./test_input.txt');
  const data = parseData('./input.txt');
  // part1(testData);
  // part1(data);
  part2(testData);
  part2(data);
}

day9();
