var Generator = require('./Generator');

function R1() {
    this.name = 'R1';
};

R1.prototype = Object.create(Generator.prototype, R1.prototype);

R1.prototype.getFloat = function(i) {
    var x = Math.sin(i) * 10000;
    return x - Math.floor(x);
};

R1.prototype.getInt = function(i) {
    return this.floatToInt(this.getFloat(i));
};

R1.prototype.getChar = function(i) {
    return String.fromCharCode(this.getInt(i));
};

module.exports = R1;
