const fs = require('fs');
const { open } = require('node:fs/promises');

const polarity = {
  'R': 1,
  'L': -1,
}

const mod = (num, mod) => {
  return ((num % mod) + mod) % mod;
}

async function find_zeroes() {
  const file = await open('./values.txt');
  let result_1 = 0;
  let result_2 = 0;
  let position = 50;

  for await (const line of file.readLines()) {
    const direction = polarity[line[0]];
    const clicks = Number(line.substring(1));
    const rotations = Math.floor(clicks / 100);
    const remainder = clicks - (rotations * 100);

    const newPosition = mod((position + (direction * clicks)), 100);
    if (newPosition === 0) {
      result_1 += 1;
    }
    result_2 += rotations;
    // See if we go outside of bounds after full rotations
    if (position !== 0 && (position + direction * remainder) <= 0 || position + direction * remainder > 99) {
      result_2 += 1;
    }

    position = newPosition;

  }
  console.log(result_1);
  console.log(result_2);
}

find_zeroes();
