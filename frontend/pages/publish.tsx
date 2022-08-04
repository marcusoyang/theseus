import { WebPubSubServiceClient, AzureKeyCredential } from '@azure/web-pubsub';
import { Box, Button } from '@chakra-ui/react';
import { useEffect } from 'react';

const Publish = () => {
    const key = new AzureKeyCredential(process.env.AZURE_KEY as string);
    const serviceClient = new WebPubSubServiceClient(
        'https://chess.webpubsub.azure.com',
        key,
        'fen'
    );

    console.log(serviceClient);
    const handleClick = () => {
        serviceClient.sendToAll('message', { contentType: 'text/plain' });
    };

    return (
        <Box>
            <Button onClick={handleClick}>Send</Button>
        </Box>
    );
};

export default Publish;
