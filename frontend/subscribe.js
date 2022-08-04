const WebSocket = require('ws');
const { WebPubSubServiceClient } = require('@azure/web-pubsub');

// import useWebSocket, { ReadyState } from 'react-use-websocket';

async function main() {
    let service = new WebPubSubServiceClient(
        process.env.WebPubSubConnectionString,
        'fen'
    );
    let token = await service.getClientAccessToken();
    console.log(token.url);
    let ws = new WebSocket(token.url);
    ws.on('open', () => console.log('connected'));
    ws.on('message', (data) => console.log('Message received: %s', data));
}

main();
