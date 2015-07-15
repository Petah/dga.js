var Aggregate = function() {
	this.encoders = [];
};

Aggregate.prototype.addEncoder = function(encoder) {
	this.encoders.push(encoder);
};

Aggregate.prototype.encode = function(data) {
	var result = data;
	for (var i = 0; i < this.encoders.length; i++) {
		result = this.encoders[i].encode(result);
	}
	return result;
};

Aggregate.prototype.decode = function(data) {
	var result = data;
	for (var i = this.encoders.length - 1; i >= 0; i--) {
		result = this.encoders[i].decode(result);
	}
	return result;
};
