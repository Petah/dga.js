var fs = require('fs');
var buffer = new Buffer(256);

for (var i = 0x0; i < 0xff; i++) {
	buffer.writeUInt8(i, i);
}

fs.writeFile(__dirname + '/../data/all-bytes.bin', buffer);
