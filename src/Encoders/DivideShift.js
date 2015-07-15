var DivideShift = function() {
    this.shiftAmount = 2;
};

DivideShift.prototype.setKey = function(shiftAmount) {
    this.shiftAmount = shiftAmount;
    return this;
};

DivideShift.prototype.getKey = function(shiftAmount) {
    return this.shiftAmount;
};

DivideShift.prototype.shiftByte = function(byte) {
    var shiftSize = 256 / this.shiftAmount,
        decimal = 1 / this.shiftAmount,
        currentDecimal = decimal,
        shiftCount = 1;
    byte = byte / this.shiftAmount;
    while (numberLessThan(currentDecimal, 1)) {
        if (numberEquals(byte - Math.floor(byte), currentDecimal)) {
            return Math.ceil(shiftSize * shiftCount) + Math.floor(byte);
        }
        currentDecimal += decimal;
        shiftCount++;
    }
    return Math.floor(byte);
};

DivideShift.prototype.encode = function(data) {
    var result = [];
    for (var i = 0; i < data.length; i++) {
        result[i] = shiftByte(data[i]);
    }
    return result;
};

DivideShift.prototype.decode = function(data) {

};
