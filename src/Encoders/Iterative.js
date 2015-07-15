var Iterative = function() {
	this.iterations = 1;
	this.encoder = null;
};

Iterative.prototype.encode = function(data) {
	var result = data;
	for (var i = 0; i < this.iterations; i++) {
		result = this.encoder.encode(result);
        console.log('Size: ' + result.length);
	}
	return result;
};

Iterative.prototype.decode = function(data) {
	var result = data;
	for (var i = 0; i < this.iterations; i++) {
		result = this.encoder.decode(result);
	}
	return result;
};

Iterative.prototype.setIterations = function(iterations) {
    this.iterations = iterations;
    return this;
};

Iterative.prototype.getIterations = function() {
    return this.iterations;
};

Iterative.prototype.setEncoder = function(encoder) {
    this.encoder = encoder;
    return this;
};

Iterative.prototype.getEncoder = function() {
    return this.encoder;
};
