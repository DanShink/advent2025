const fs = require('fs');

function grabFile(path) {
  try {
    const fileContent = fs.readFileSync(path, 'utf8');
    return fileContent;
  } catch (err) {
    console.error('Error reading file');
  }
  return 0;
}

module.exports = grabFile;
