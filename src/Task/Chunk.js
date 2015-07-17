Chunk = function(data, position, length) {
    this.data = data;
    this.position = position;
    this.length = length;
    this.complete = false;
    this.progress = 0;
};

Chunk.prototype.isAvailable = function() {
    return !this.progress;
};
