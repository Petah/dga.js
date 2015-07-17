Task = function(data, length) {
    this.data = data;
    this.length = length;
    this.chunks = [];
};

Task.prototype.split = function(chunks) {
    var chunkSize = this.length / chunks;
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
