var amount = 2;
var log = {};
var logger = new MasterLogger();

var task = new Task('Hello world!', 10000000);
task.split(amount);

function fork() {
    var chunk = task.getChunk();
    if (chunk) {
        console.log('Forked process');
        var worker = cluster.fork();
        worker.send({
            type: 'Chunk',
            payload: chunk,
        });
        worker.on('message', function(message) {
            log[worker.process.pid] = message;
            logger.log(log);
        });
    }
};

//function bindWorker(worker) {
//    worker.on('message', function(message) {
//        log[worker.process.pid] = message;
//        logger.log(log);
//    });
//}

for (var i = 0; i < amount; i++) {
    fork();
}

cluster.on('exit', function (worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
});
