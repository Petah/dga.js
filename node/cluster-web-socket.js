require('./index');

if (cluster.isMaster) {
    require('./cluster/master-web-socket')
} else if (cluster.isWorker) {
    require('./cluster/worker-web-socket')
}
