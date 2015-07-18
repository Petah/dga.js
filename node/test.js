test = function() {
    dump(this);
    dump(this.t);
}
test.prototype.t = function(){};

new test();