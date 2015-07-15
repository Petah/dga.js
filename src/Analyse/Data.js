var Data = function() {
};

Data.prototype.splice = Array.prototype.splice;

Data.prototype.load = function(url) {
    return new Promise(function(resolve, reject) {
	    var xhr = new XMLHttpRequest();
	    xhr.open('GET', url, true);
	    xhr.responseType = 'arraybuffer';

	    xhr.onload = function() {
	        var arrayBuffer = xhr.response;
	        if (arrayBuffer) {
	            var binary = new Uint8Array(arrayBuffer);
	            for (var i = 0; i < binary.length; i++) {
	                this[i] = binary[i];
	            }
	            this.length = binary.length;
	            resolve(this);
	        }
	    }.bind(this);

	    xhr.send(null);
    }.bind(this));
};

Data.prototype.toString = function() {
	return String.fromCharCode.apply(null, this);
};

Data.prototype.sum = function() {
	var sum = 0;
	for (var i = 0; i < this.length; i++) {
		sum += this[i];
	}
	return sum;
};

Data.prototype.toUint8Array = function() {
	return new Uint8Array(this);
};

Data.fromString = function(string) {
	var array = [];
	for (var i = 0; i < string.length; i++) {
	    var charCode = string.charCodeAt(i);
	    array.push((charCode & 0xFF00) >> 8);
	    array.push(charCode & 0xFF);
	}
	return Data.fromArray(array);
};

Data.fromArray = function(array) {
	var data = new Data();
	for (var i = 0; i < array.length; i++) {
		data[i] = array[i];
	}
	data.length = array.length;
	return data;
};
