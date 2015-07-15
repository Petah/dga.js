var Shift = function() {
    this.key = null;
};

Shift.prototype.encode = function(data) {
    var result = [],
        key = this.getKeyArray();
    for (var i = 0; i < data.length; i++) {
        var shifted = data[i] + key[i % key.length];
        if (shifted > 255) {
            shifted -= 256;
        }
        result[i] = shifted;
    }
    return Data.fromArray(result);
};

Shift.prototype.decode = function(data) {
    var result = [],
        key = this.getKeyArray();
    for (var i = 0; i < data.length; i++) {
        var shifted = data[i] - key[i % key.length];
        if (shifted < 0) {
            shifted += 256;
        }
        result[i] = shifted;
    }
    return Data.fromArray(result);
};

Shift.prototype.getKeyArray = function() {
    var key;
    if (typeof this.key === 'string') {
        key = [];
        for (var i = 0; i < this.key.length; i++) {
            key[i] = this.key.charCodeAt(i);
        }
    } else if (typeof this.key === 'function') {
        key = this.key();
    }
    return key;
};

Shift.prototype.setKey = function(key) {
    this.key = key;
    return this;
};

Shift.prototype.getKey = function(key) {
    return this.key;
};
