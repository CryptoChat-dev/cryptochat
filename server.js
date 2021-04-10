const express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const port = 6969;

// API Routes

app.get('/', (req, res) => {
    res.sendFile('templates/client_chat.html', { root: __dirname });
});

app.use(express.static('public'));

app.get('/cryptojs', (req, res) => {
    res.sendFile('bower_components/crypto-js/crypto-js.js', { root: __dirname })
})

// SocketIO

io.on('connection', (connection) => {
    connection.on('chat event', (data) => {
        try{
            JSON.parse(data)
        } catch {
            return
        }
        io.emit('my response', data);
    });
});

// Server start

server.listen(port, () => {
    console.log('listening on *:' + port);
});
