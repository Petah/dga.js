require('.');

const fs = require('fs');
const data = fs.readFileSync(__dirname + '/../data/random-key-smash.bin');
const hex = new Hex();

for (const byte of data) {
    hex.write(String.fromCharCode(byte));
}
hex.flush();
