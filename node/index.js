Duration = require('duration');
os = require('os');
cluster = require('cluster');
extend = require('extend');
numeral = require('numeral');
ss = require('simple-statistics');

dump = function() {
    console.log.apply(console, arguments);
    console.trace();
    process.exit();
};

log = function() {
    console.log.apply(console, arguments);
};

inherit = function(parent, child, args) {
    for (var key in parent.prototype) {
        if (!child[key]) {
            child[key] = parent.prototype[key];
        }
    }
    parent.apply(child, args || []);
};

require('require-dir')(__dirname + '/../src', {
    recurse: true,
});
