Seed = {};

Seed.int = function() {
    var string = Math.random()
            .toString()
            .replace(/[.e-]/g, '')
            .replace(/^0+/, '')
            .substr(0, 15);
    
    return parseInt(string);
};
