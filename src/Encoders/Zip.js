var Zip = function() {
};

Zip.prototype.encode = function(data) {
    return Data.fromArray(pako.deflate(data));
};

Zip.prototype.decode = function(data) {
    return Data.fromArray(pako.inflate(data));
};
