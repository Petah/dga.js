var amount = 8;
var log = {};
var logger = new MasterLogger();

function bindWorker(worker) {
    worker.on('message', function(message) {
        log[worker.process.pid] = message;
    });
}

setInterval(function() {
    logger.log(log);
}, 1000);

for (var i = 0; i < amount; i++) {
    bindWorker(cluster.fork());
}

cluster.on('exit', function (worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
});
