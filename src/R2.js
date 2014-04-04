function R2() {
    this.name = 'R2';
    this.chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/';
};

R2.prototype = Object.create(R1.prototype);

R2.prototype.current = function() {
    return this.chars.charCodeAt(R1.prototype.current.apply(this, arguments) % 64);
};
