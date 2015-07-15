Duration = require('duration');
cluster = require('cluster');
extend = require('extend');
numeral = require('numeral');
ss = require('simple-statistics');

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
