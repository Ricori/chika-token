const fs = require('fs');
const files = fs.readdirSync('artifacts/build-info');
const info = JSON.parse(fs.readFileSync('artifacts/build-info/' + files[0]));
fs.writeFileSync('input.json', JSON.stringify(info.input, null, 2));
console.log('done');