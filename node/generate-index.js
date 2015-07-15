var fs = require('fs');
var output = 'module.exports = {\n';
require('fs').readdirSync(__dirname + '/../src').forEach(function(file) {
	output += '    ' + file.slice(0, -3) + ': require("../src/' + file + '"),\n';
});
output += '};\n';
fs.writeFile(__dirname + '/index.js', output);