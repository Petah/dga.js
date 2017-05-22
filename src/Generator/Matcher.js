Matcher = function () {
    inherit(Eventable, this);
    inherit(Loggable, this);

    this.generator = null;
    this.chunk = null;
    this.bestMatch = {
        position: null,
        start: null,
        length: 0,
        content: null,
        complete: false,
    };
};

Matcher.prototype.work = function () {
    var data = this.generator.getChar(this.i++);
    for (var i = 0; i < this.chunk.data.length; i++) {
        if (data === this.chunk.data[i]) {
            this.traceMatch(i);
        }
    }
    if (this.i >= this.chunk.position + this.chunk.length) {
        throw new CompleteException();
    }
};

Matcher.prototype.traceMatch = function (start) {
    var data;
    var length = 0;
    var content = '';

    do {
        content += this.chunk.data[start + length];
        length++;
        data = this.generator.getChar(this.i + length);
    } while (data === this.chunk.data[start + length]);
    if (this.bestMatch.length < length) {
        this.bestMatch = {
            position: this.i,
            start: start,
            length: length,
            content: content,
            complete: length === this.chunk.data.length,
        };
    }
};

Matcher.prototype.getLogData = function () {
    return {
        'Seed': this.seed,
        'Iteration': this.i,
        'Max iteration': this.chunk.position + this.chunk.length,
        'Best match': this.bestMatch.content,
        'Best match position': this.bestMatch.position,
        'Best match start': this.bestMatch.start,
    };
};

Matcher.prototype.getData = function () {
    return this.data;
};

Matcher.prototype.setData = function (data) {
    this.data = data;
    return this;
};

Matcher.prototype.getChunk = function () {
    return this.chunk;
};

Matcher.prototype.setChunk = function (chunk) {
    this.chunk = chunk;
    this.seed = chunk.position;
    this.i = chunk.position;
    return this;
};

Matcher.prototype.getGenerator = function () {
    return this.generator;
};

Matcher.prototype.setGenerator = function (generator) {
    this.generator = generator;
    return this;
};


Matcher.prototype.isComplete = function () {
    return this.bestMatch.complete || this.i >= this.chunk.position + this.chunk.length;
};
