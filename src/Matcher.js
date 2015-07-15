Matcher = function (seed) {
    inherit(Loggable, this);

    this.generator = null;
    this.data = null;
    this.seed = seed || 0;
    this.i = this.seed;
    this.complete = false;
    this.bestMatch = {
        position: null,
        start: null,
        length: 0,
        content: null,
    };
};

Matcher.prototype.work = function () {
    var data = this.generator.getChar(this.i++);
    for (var i = 0; i < this.data.length; i++) {
        if (data === this.data[i]) {
            this.traceMatch(i);
        }
    }
};

Matcher.prototype.traceMatch = function (start) {
    var data;
    var match = true;
    var length = 0;
    var content = '';

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

Matcher.prototype.getLogData = function () {
    return {
        'Seed': this.seed,
        'I': this.i,
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

Matcher.prototype.getGenerator = function () {
    return this.generator;
};

Matcher.prototype.setGenerator = function (generator) {
    this.generator = generator;
    return this;
};
