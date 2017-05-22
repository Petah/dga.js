require('.');

const r1 = new R1();
const hex = new Hex();

for (let i = 0; i < 1024; i++) {
    hex.write(r1.getChar(i++));
}
hex.flush();
