require('./index');

var r3 = new R3();
var i = 1;

while (true) {
    process.stdout.write(r3.getChar(i++));
}
