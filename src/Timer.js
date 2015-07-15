Timer = function () {
    this.before = null;
};

Timer.prototype.now = function () {
    if (typeof performance !== 'undefined') {
        return performance.now();
    }
    var now = process.hrtime()
    return (now[0] * 1e9 + now[1]) / 1e6;
};

Timer.prototype.start = function () {
    this.before = this.now();
};

Timer.prototype.current = function () {
    return this.now() - this.before;
};
