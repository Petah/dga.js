require('.');

const r4 = new R4(Seed.int());
const hex = new Hex();

for (let i = 0; i < 1024; i++) {
    hex.write(r4.getChar(i++));
}
hex.flush();
