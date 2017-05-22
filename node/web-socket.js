require('./index');

var chunkAmount = 10;
var task = new Task('Hello world!', 10000000);
task.split(chunkAmount);

var socket = require('socket.io-client')(socketHost);
socket.on('connect', function () {
    log('Connected to server ' + socketHost);
    socket.emit('register-task', task);
    socket.disconnect();
});
