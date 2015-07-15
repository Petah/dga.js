var amount = 8;
for (var i = 0; i < amount; i++) {
    cluster.fork();
}

cluster.on('exit', function (worker, code, signal) {
    console.log('Worker ' + worker.process.pid + ' died');
});
