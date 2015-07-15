var BestCompression = function() {
	this.best = {
		length: Number.MAX_VALUE
	};
	this.iterations = 1;
	this.encoder = null;
};

BestCompression.prototype.encode = function(data) {
	for (var i = 0; i < this.iterations; i++) {
		var result = this.encoder.encode(data);
		if (result.length < this.best.length) {
			this.best = result;
        	console.log('Best: ' + result.length);
		} else if (i % 100 === 0) {
        	console.log('Iteration: ' + i + ', current: ' + result.length + ', sum: ' + result.sum());
        	console.log();
		}
	}
	return this.best;
};

BestCompression.prototype.decode = function(data) {
	var result = data;
	for (var i = 0; i < this.iterations; i++) {
		result = this.encoder.decode(result);
	}
	return result;
};

BestCompression.prototype.setIterations = function(iterations) {
    this.iterations = iterations;
    return this;
};

BestCompression.prototype.getIterations = function() {
    return this.iterations;
};

BestCompression.prototype.setEncoder = function(encoder) {
    this.encoder = encoder;
    return this;
};

BestCompression.prototype.getEncoder = function() {
    return this.encoder;
};
