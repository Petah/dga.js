var io = require('socket.io').listen(80);

io.sockets.on('connection', function (socket) {
    socket.on('work', function (data) {
        io.sockets.emit('work', data);
    });
    socket.on('register-worker', function (data) {
        io.sockets.emit('register-worker', data);
    });
});
