R3 = function() {
    inherit(Generator, this);
    this.name = 'R3';
    this.seed = 0;
};

R3.prototype.getFloat = function(i) {
    return Math.random();
};
