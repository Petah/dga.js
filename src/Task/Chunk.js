Chunk = function(data, position, length) {
    inherit(Serializable, this, ['Chunk']);
    this.data = data;
    this.position = position;
    this.length = length;
    this.complete = false;
    this.progress = 0;
};

Chunk.prototype.isAvailable = function() {
    return !this.progress;
};
