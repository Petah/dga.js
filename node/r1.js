require('./index');

var r1 = new R1();
var i = 1;

while (true) {
    process.stdout.write(r1.getChar(i++));
}
