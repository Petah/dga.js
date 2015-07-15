var Validator = function() {
    this.data = null;
    this.encoder = null;
};

Validator.prototype.isValid = function() {
    var original = this.data.toUint8Array();
    var result;
    result = this.encoder.encode(this.data);
    result = this.encoder.decode(result);
    if (original.length != result.length) {
        return false;
    }
    for (var i = 0; i < original.length; i++) {
        if (original[i] !== result[i]) {
            return false;
        }
    }
    return true;
};

Validator.prototype.setData = function(data) {
    this.data = data;
    return this;
};

Validator.prototype.getData = function() {
    return this.data;
};

Validator.prototype.setEncoder = function(encoder) {
    this.encoder = encoder;
    return this;
};

Validator.prototype.getEncoder = function() {
    return this.encoder;
};
