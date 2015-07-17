FloatConverter = function() {
};

FloatConverter.prototype.getInt = function(i) {
    return this.floatToInt(this.getFloat(i));
};

FloatConverter.prototype.getByte = function(i) {
    return this.floatToByte(this.getFloat(i));
};

FloatConverter.prototype.getChar = function(i) {
    return String.fromCharCode(this.getByte(i));
};
