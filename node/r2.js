require('./index');

var r2 = new R2();
var i = 1;

while (true) {
    process.stdout.write(r2.getChar(i++));
}
