var extend = require('extend');
var Loggable = require('./Loggable');

function Matcher() {
	Loggable.call(this);

    this.generator = null;
    this.data = null;
    this.i = 0;
    this.complete = false;
    this.bestMatch = {
    	position: null,
    	start: null,
    	length: 0,
    	content: null,
    };
};

extend(Matcher.prototype, Loggable.prototype);

Matcher.prototype.work = function() {
    var data = this.generator.getChar(this.i++);
    for (var i = 0; i < this.data.length; i++) {
        if (data === this.data[i]) {
        	this.traceMatch(i);
        }
    }
};

Matcher.prototype.traceMatch = function(start) {
	var data,
		match = true,
		length = 0,
		content = '';
	do {
		content += this.data[start + length];
		length++;
    	data = this.generator.getChar(this.i + length);
	} while (data === this.data[start + length]);
	if (this.bestMatch.length < length) {
		this.bestMatch = {
			position: this.i,
			start: start,
			length: length,
			content: content,
		};
		if (length === this.data.length) {
			this.complete = true;
		}
	}
};

Matcher.prototype.getLogData = function() {
	return {
		'Best match': JSON.stringify(this.bestMatch, undefined, 4),
	};
};

Matcher.prototype.getData = function() {
	return this.data;
};

Matcher.prototype.setData = function(data) {
	this.data = data;
	return this;
};

Matcher.prototype.getGenerator = function() {
	return this.generator;
};

Matcher.prototype.setGenerator = function(generator) {
	this.generator = generator;
	return this;
};

module.exports = Matcher;
