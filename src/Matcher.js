function Matcher(data, generator, seed) {
    this.data = data;
    this.generator = generator;
    this.seed = seed;
    this.bestFind = localStorage.getItem('bestFind') || null;
};

Matcher.prototype.trace = function(i, next) {
    var length = 0;
    while (next == this.data.charCodeAt(i)) {
        length++;
        next = this.generator.next();
    }
    if (this.bestFind === null || this.bestFind[1] < length) {
        this.bestFind = [i, length, this.seed, this.generator.name];
        localStorage.setItem('bestFind', this.bestFind);
    }
};

Matcher.prototype.run = function() {
    this.generator.seed = this.seed;
    var next = this.generator.next();
    for (var i = 0; i < this.data.length; i++) {
        if (next === this.data.charCodeAt(i)) {
            this.trace(i, next);
        }
    }

    this.seed++;
};
