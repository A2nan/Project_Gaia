const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

let counterValue = 0;

function broadcastCounter() {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(counterValue.toString());
        }
    });
}

wss.on('connection', (ws) => {
    console.log('Nouveau client connecté');
    ws.send(counterValue.toString());

    ws.on('message', (message) => {
        counterValue = parseInt(message, 10);
        console.log(`Nouvelle valeur du compteur : ${counterValue}`);
        broadcastCounter();
    });
});

console.log('Serveur WebSocket démarré sur ws://10.0.3.241:8080');
