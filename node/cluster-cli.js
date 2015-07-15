require('./index');

if (cluster.isMaster) {
    require('./cluster/master-cli')
} else if (cluster.isWorker) {
    require('./cluster/worker-cli')
}
