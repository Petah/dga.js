Task = function(data, length) {
    inherit(Serializable, this, ['Task']);
    this.data = data;
    this.length = length;
    this.chunks = [];
};

Task.prototype.split = function(chunks) {
    var chunkSize = this.length / chunks;
    if (!chunkSize.toString().match(/^[0-9]+$/)) {
        throw new Error('Chunk size must split evenly: ' + chunkSize);
    }
    for (var i = 0; i < this.length; i += chunkSize) {
        this.chunks.push(new Chunk(this.data, i, chunkSize));
    }
};

Task.prototype.getChunk = function() {
    for (var i = 0, l = this.chunks.length; i < l; i++) {
        if (this.chunks[i].isAvailable()) {
            this.chunks[i].progress = true;
            return this.chunks[i];
        }
    }
};

Task.prototype.isAvailable = function() {
    for (var i = 0, l = this.chunks.length; i < l; i++) {
        if (this.chunks[i].isAvailable()) {
            return true;
        }
    }
    return false;
};
