// Imports

const express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const port = 6969;

app.use(express.static('public'));

// API Routes

app.get('/', (req, res) => {
    res.sendFile('public/templates/client_chat.html', { root: __dirname });
});

// Legal

app.get('/legal', (req, res) => {
    res.sendFile('public/templates/legal.html', { root: __dirname });
});

app.get('/terms', (req, res) => {
    res.sendFile('public/templates/terms.html', { root: __dirname });
});

app.get('/privacy', (req, res) => {
    res.sendFile('public/templates/privacy.html', { root: __dirname });
});

// SocketIO

io.on('connection', (connection) => {
    connection.on('chat event', (data) => {
        if (typeof data === 'object') {
            io.emit('my response', data);
        }
    });
});

// Server start

server.listen(port, () => {
    console.log('listening on *:' + port);
});
