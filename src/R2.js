var extend = require('extend');
var R1 = require('./R1');

function R2() {
	R1.call(this);
    this.name = 'R2';
    this.chars = 'abcdefghijklmnopqrstuvwxyz-ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789';
};

extend(R2.prototype, R1.prototype);

R2.prototype.getChar = function(i) {
    return this.chars[this.getInt(i) % this.chars.length];
};

module.exports = R2;
