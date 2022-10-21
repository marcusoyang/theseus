// declare var require: any;
const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: { origin: '*' },
});

const PORT = 8080;

// const Chess = require('chess.js');
// let chess;

// while (!chess.isGameOver()) {
//     const moves = chess.moves();
//     const move = moves[Math.floor(Math.random() * moves.length)];
//     chess.move(move);
// }
// console.log(chess.pgn());

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

io.on('connection', (socket) => {
    console.log('a user connected');

    // socket.on('start', (data) => {
    //     console.log('start', data);
    //     socket.broadcast.emit('start', data);
    // });
    // socket.emit('update', chess.fen());

    // socket.on('move', (source, target) => {
    //     console.log(source, target);
    //     chess.move({ from: source, to: target });
    // });

    socket.on('join', (gameId) => {
        console.log('joining game', gameId);
        socket.join(gameId);
        socket.in(gameId).emit('startGame', gameId);
    });

    socket.on('move', (move) => {
        console.log('received move', move);
        socket.broadcast.emit('move', move);
    });
});

server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
