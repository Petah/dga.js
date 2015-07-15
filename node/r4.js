require('./index');

var r4 = new R4(Seed.int());
var i = 1;

while (true) {
    process.stdout.write(r4.getChar(i++));
}
