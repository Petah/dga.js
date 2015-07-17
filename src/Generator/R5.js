R5 = function() {
    inherit(Generator, this);
    this.name = 'R5';
    this.chars = 'abcdefghijklmnopqrstuvwxyz-ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789';
};

R5.prototype.getChar = function (i) {
    return this.chars[this.getInt(i) % this.chars.length];
};

R5.prototype.getFloat = function(i) {
    return Math.random();
};
