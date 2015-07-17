Generator = function() {
};

Generator.prototype.intToByte = function(value) {
    return value % 256;
};

Generator.prototype.floatToByte = function(value) {
    return this.intToByte(this.floatToInt(value));
};

Generator.prototype.floatToInt = function(value) {
    return value.toString().replace(/[.e-]/g, '');
};

Generator.prototype.getInt = function(i) {
    return this.floatToInt(this.getFloat(i));
};

Generator.prototype.getByte = function(i) {
    return this.floatToByte(this.getFloat(i));
};

Generator.prototype.getChar = function(i) {
    return String.fromCharCode(this.getByte(i));
};

Generator.prototype.generateString = function(length) {
    var result = '';
    for (var i = 0; i < length; i++) {
        result += this.getChar(i);
    }
    return result;
};

Generator.prototype.generateByteArray = function(length) {
    var result = [];
    for (var i = 0; i < length; i++) {
        result.push(this.getByte(i));
    }
    return result;
};
