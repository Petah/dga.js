function R1() {
    this.name = 'R1';
};

R1.prototype = Object.create(Generator.prototype);

R1.prototype.current = function() {
    var x = Math.sin(this.seed) * 10000;
    return this.floatToByte(x - Math.floor(x));
};

R1.prototype.next = function() {
    var result = this.current();
    this.seed++;
    return result;
};
