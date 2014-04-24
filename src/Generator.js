function Generator() {
};

Generator.prototype.intToByte = function(value) {
    return value % 256;
};

Generator.prototype.floatToByte = function(value) {
    return this.intToByte(value.toString().replace(/0?\./, ''));
};

Generator.prototype.floatToInt = function(value) {
    return value.toString().replace(/0?\./, '');
};

module.exports = Generator;
