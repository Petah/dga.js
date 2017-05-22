require('.');

const r3 = new R3();
const hex = new Hex();

for (let i = 0; i < 1024; i++) {
    hex.write(r3.getChar(i++));
}
hex.flush();
