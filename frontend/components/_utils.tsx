import { AzureKeyCredential, WebPubSubServiceClient } from '@azure/web-pubsub';

const dev = process.env.NODE_ENV !== 'production';

export const server = dev
    ? 'http://localhost:3000'
    : 'https://your_deployment.server.com';

export const getClient = () => {
    const key = new AzureKeyCredential(process.env.AZURE_KEY as string);
    const serviceClient = new WebPubSubServiceClient(
        'https://chess.webpubsub.azure.com',
        key,
        'fen'
    );
    return serviceClient;
};
