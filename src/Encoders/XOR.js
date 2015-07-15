var XOR = function() {
    this.key = 1;
};

XOR.prototype.setKey = function(key) {
    this.key = key;
    return this;
};

XOR.prototype.getKey = function(key) {
    return this.key;
};

XOR.prototype.encode = function(data) {
    var result = [];
    for (var i = 0; i < data.length; i++) {
        result[i] = data[i] ^ this.key;
    }
    return result;
};

XOR.prototype.decode = XOR.prototype.encode;
