
// server.js
const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (socket) => {
    console.log('Client connected');

    // Send a welcome message on connection
    socket.send('Welcome to the WebSocket server!');

    // Listen for messages from the client
    socket.on('message', (message) => {
        console.log(`Received message: ${message}`);

        // Echo the message back to the client
        socket.send(`You said: ${message}`);
    });

    // Listen for the socket to close
    socket.on('close', () => {
        console.log('Client disconnected');
    });
});
