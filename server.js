// Imports

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
//const RateLimit = require('express-rate-limit');

const port = 6969;

/*const limiter = new RateLimit({
    windowMs: 1 * 60 * 1000,
    max: 50
});*/

const router = express.Router();

// apply rate limiter to all requests
//router.use(limiter);
router.use(express.static('public'));


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
app.use('/', router)

server.listen(port, () => {
    console.log('listening on *:' + port);
});
