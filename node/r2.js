require('.');

const r2 = new R2();
const hex = new Hex();

for (let i = 0; i < 1024; i++) {
    hex.write(r2.getChar(i++));
}
hex.flush();
