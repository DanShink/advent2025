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
      z: Number(values[2]),
    }
  })
}

function distance(coord1, coord2) {
  return Math.hypot(coord1.x - coord2.x, coord1.y - coord2.y, coord1.z - coord2.z);
}

class DisjointUnionSets {
  constructor(n) {
    this.rank = new Array(n).fill(0);
    this.parent = Array.from({ length: n }, (_, i) => i);

    // Initially, each element is in its own set
  }

  find(i) {

    let root = this.parent[i];

    if (this.parent[root] !== root) {
      return this.parent[i] = this.find(root);
    }

    return root;
  }

  unionSets(x, y) {
    const xRoot = this.find(x);
    const yRoot = this.find(y);

    // If they are in the same set, no need to union
    if (xRoot === yRoot) return;

    // Union by rank
    if (this.rank[xRoot] < this.rank[yRoot]) {
      this.parent[xRoot] = yRoot;
    } else if (this.rank[yRoot] < this.rank[xRoot]) {
      this.parent[yRoot] = xRoot;
    } else {
      this.parent[yRoot] = xRoot;
      this.rank[xRoot]++;
    }
  }
}

function part1(data, connections) {
  const N = data.length;
  const edges = [];

  // Step 1: Build all edges with weights
  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      edges.push({ u: i, v: j, w: distance(data[i], data[j]) });
    }
  }

  // Step 2: Sort edges by ascending weight
  edges.sort((a, b) => a.w - b.w);

  // Step3 3: Add however many connections to the set
  const dus = new DisjointUnionSets(data.length);
  for (let i = 0; i < connections && i < edges.length; i++) {
    dus.unionSets(edges[i].u, edges[i].v);
  }

  // Step 4: Count component sizes
  const counts = new Map(); // root → size
  for (let i = 0; i < N; i++) {
    const root = dus.find(i);
    counts.set(root, (counts.get(root) || 0) + 1);
  }

  // Step 5: Extract size list and return top 3 largest sets
  const top3 = [...counts.values()]
    .sort((a, b) => b - a)   // descending
    .slice(0, 3);

  console.log(top3[0] * top3[1] * top3[2]);
  return top3;

}

function part2(data) {
  const N = data.length;
  const edges = [];

  // Step 1: Build all edges with weights
  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      edges.push({ u: i, v: j, w: distance(data[i], data[j]) });
    }
  }

  // Step 2: Sort edges by ascending weight
  edges.sort((a, b) => a.w - b.w);

  // Step3 3: Add however many connections to the set
  const dus = new DisjointUnionSets(data.length);
  let components = N;

  for (let i = 0; i < edges.length; i++) {
    const { u, v } = edges[i];
    const rootU = dus.find(u);
    const rootV = dus.find(v);
    if (rootU !== rootV) {
      dus.unionSets(rootU, rootV);
      components--;
      if (components === 1) {
        console.log(data[u].x * data[v].x);
      }
    }
  }
}

function day8() {
  const testData = parseData('./test_input.txt');
  const data = parseData('./input.txt');
  part1(testData, 10);
  part1(data, 1000);
  part2(testData);
  part2(data);
}

day8();
