_ = require('lodash');
Duration = require('duration');
cluster = require('cluster');
extend = require('extend');
numeral = require('numeral');
os = require('os');
ss = require('simple-statistics');

socketHost = 'http://localhost:3000';

dump = function() {
    console.log('-- Dump ----------------------------------');
    console.log.apply(console, arguments);
    console.trace();
    process.exit();
};

dumpcounter = 0;
dumpcount = function() {
    dumpcounter++;
    if (arguments[0] == dumpcounter) {
        console.log('-- Dump Count ----------------------------');
        console.log.apply(console, arguments);
        console.trace();
        process.exit();
    }
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
    parent.apply(child, args ? Array.prototype.slice.call(args, 0) : []);
};

require('require-dir')(__dirname + '/../src', {
    recurse: true,
});
