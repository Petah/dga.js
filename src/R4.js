R4 = function() {
    inherit(Generator, this);
    this.name = 'R4';
    this.chars = 'abcdefghijklmnopqrstuvwxyz-ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789';
    this.middleSquare = new MiddleSquare();
};

R4.prototype.getChar = function (i) {
    return this.chars[this.getInt(i) % this.chars.length];
};

R4.prototype.getInt = function (i) {
    return this.middleSquare.nextInt(i);
};
