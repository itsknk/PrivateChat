var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();
var server = app.listen(4000, function(){
    console.log('listening for requests on port 4000,');
});

// Main files
app.use(express.static('public'));

// Socket setup
var io = socket(server);
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    // Handling the chat data sent by frontend
    socket.on('chat', function(data){
        // console.log(data);
        io.sockets.emit('chat', data);
    });

    // Handling the typing data sent by frontend
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

});
