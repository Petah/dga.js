test = function() {
    console.log(this);
    console.log(this.t);
}
test.prototype.t = function(){};

new test();