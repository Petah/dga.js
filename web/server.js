require('../node/index');

const express = require('express');
const http = require('http');

const app = express();
app.use(express.static(__dirname));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

const server = http.Server(app);
console.log('Starting server...');
server.listen(3000, function () {
    console.log('Listening on *:3000');
});

const io = require('socket.io')(server);

const tasks = [];

io.on('connection', function (socket) {
    console.log('New connection from ' + socket.request.connection.remoteAddress);
    socket.emit('tasks', tasks);
    socket.on('log', function(log) {
        io.emit('log', log);
    });
//    socket.on('task', function(log) {
//        io.emit('task', log);
//    });
    socket.on('register-task', function(task) {
        task = Serializable.deserialize(task);
        console.log('Registed task.');
        tasks.push(task);
        io.emit('tasks', tasks);
    });
    socket.on('get-chunk', function() {
        console.log('Getting chunk.');
        for (const i = 0, l = tasks.length; i < l; i++) {
            if (tasks[i].isAvailable()) {
                const chunk = tasks[i].getChunk();
                socket.emit('chunk', chunk);
                return;
            }
        }
    });
});
