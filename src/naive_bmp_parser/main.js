const fs = require('fs');

const bmpSignature = {
  'B': 66,
  'M': 77,
};

function checkSignature(buffer) {
  if (buffer[0] === bmpSignature.B && buffer[1] === bmpSignature.M) return true;
  return false;
}

function parse(filepath) {
  const buffer = fs.readFileSync(filepath);

  if (!buffer) return {};

  if (!checkSignature(buffer)) return {};

  const x = buffer[18];
  const y = buffer[22];
  // const dataFieldBytesCount = buffer[34];
  const dataFieldPadding = buffer[18] % 4;
  const dataFieldIndex = 54;

  console.log(`**** ${x}X${y} ****`);

  for (let i = dataFieldIndex; i < buffer.length; i = i + (x * 3) + dataFieldPadding ) {
    for (let j = 0; j < (3 * x); j = j + 3) {
      console.log(`buffer[${i + j + 0}]: ${buffer[dataFieldIndex + j + 0]}`);
      console.log(`buffer[${i + j + 1}]: ${buffer[dataFieldIndex + j + 1]}`);
      console.log(`buffer[${i + j + 2}]: ${buffer[dataFieldIndex + j + 2]}`);
    }
  }

  console.log('')
  console.log('************************')
  console.log('')
}

const filePathsList = [
'../../src/bmp_files/111111_filled_templates/1x1_111111.bmp',
'../../src/bmp_files/111111_filled_templates/2x1_111111.bmp',
'../../src/bmp_files/111111_filled_templates/3x1_111111.bmp',
'../../src/bmp_files/111111_filled_templates/4x1_111111.bmp',
'../../src/bmp_files/111111_filled_templates/1x2_111111.bmp',
'../../src/bmp_files/111111_filled_templates/2x2_111111.bmp',
'../../src/bmp_files/111111_filled_templates/3x2_111111.bmp',
'../../src/bmp_files/111111_filled_templates/4x2_111111.bmp',
]

for (let i = 0; i < filePathsList.length; i++) {
  parse(filePathsList[i]);
}

module.exports = parse;