const WebSocket = require('ws');

let clients = [];

const setupWebSocket = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        console.log('A new client connected.');
        clients.push(ws);

        ws.on('close', () => {
            clients = clients.filter(client => client !== ws);
            console.log('Client disconnected.');
        });
    });
};

const broadcastMessage = (message) => {
    clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
        }
    });
};

module.exports = { setupWebSocket, broadcastMessage };
