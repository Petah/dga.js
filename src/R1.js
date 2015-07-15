R1 = function() {
    inherit(Generator, this);
    this.name = 'R1';
    this.seed = 0;
};

R1.prototype.getFloat = function(i) {
    var x = Math.sin(this.seed + i) * 10000;
    return x - Math.floor(x);
};

R1.prototype.getInt = function(i) {
    return this.floatToInt(this.getFloat(i));
};

R1.prototype.getByte = function(i) {
    return this.floatToByte(this.getFloat(i));
};

R1.prototype.getChar = function(i) {
    return String.fromCharCode(this.getByte(i));
};

R1.prototype.generateString = function(length) {
    var result = '';
    for (var i = 0; i < length; i++) {
        result += this.getChar(i);
    }
    return result;
};

R1.prototype.generateByteArray = function(length) {
    var result = [];
    for (var i = 0; i < length; i++) {
        result.push(this.getByte(i));
    }
    return result;
};

R1.prototype.setSeed = function(seed) {
    this.seed = seed;
    return this;
};

R1.prototype.getSeed = function() {
    return this.seed;
};
