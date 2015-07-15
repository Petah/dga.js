// https://gist.github.com/Protonk/5388511
MiddleSquare = function(seed) {
    this.seed = seed;
};

MiddleSquare.prototype.nextInt = function(seed) {
    seed = seed || this.seed;
    var middle = (seed * seed).toString();
    while (middle.length < 8) {
        middle = '0' + middle;
    }
    this.seed = parseInt(middle.slice(2, 6), 10);
    return this.seed;
};
