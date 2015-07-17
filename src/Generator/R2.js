R2 = function() {
    inherit(R1, this);
    this.name = 'R2';
    this.chars = 'abcdefghijklmnopqrstuvwxyz-ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789';
}


R2.prototype.getChar = function (i) {
    return this.chars[this.getInt(i) % this.chars.length];
};
