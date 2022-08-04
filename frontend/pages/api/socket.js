import { WebPubSubServiceClient, AzureKeyCredential } from '@azure/web-pubsub';

const handler = async (req, res) => {
    const key = new AzureKeyCredential(process.env.AZURE_KEY);
    const serviceClient = new WebPubSubServiceClient(
        'https://chess.webpubsub.azure.com;Version=1.0;',
        key,
        'fed'
    );
    let token = await serviceClient.getClientAccessToken();
    res.json(token);
};

export default handler;
