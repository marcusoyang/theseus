import { useUser } from '@auth0/nextjs-auth0';
import {
    Box,
    Center,
    Text,
    Heading,
    useClipboard,
    Button,
    Editable,
    EditableInput,
    EditablePreview,
    Flex,
    Input,
} from '@chakra-ui/react';
import Layout from '../components/layout';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';

const URL = process.env.BACKEND_URL || 'http://localhost:8080';
const socket = io(URL);

const deployment_url = process.env.DEPLOYMENT_URL || 'http://localhost:3000';

const CreateGame = () => {
    const { user, isLoading } = useUser();
    const [gameId, setGameId] = useState<string>(uuidv4());
    const { hasCopied, onCopy } = useClipboard(
        `${deployment_url}/play/${gameId}?c=w`
    );
    const router = useRouter();

    console.log(process.env.BACKEND_URL);
    // create and join room in socket.io
    useEffect(() => {
        socket.emit('create', gameId);
        console.log(gameId);
        socket.on('startGame', (game) => {
            console.log('starting game');
            router.push(`/play/${gameId}?c=b`);
        });
    }, []);

    return (
        <Layout user={user} loading={isLoading}>
            <Box textAlign={'center'}>
                <Heading mt={12} size={'2xl'}>
                    Theseus
                </Heading>
                <Text m={4}>
                    Send the invite link below to start the game. The game will
                    start once another player has joined.
                </Text>
                <Flex mx={'auto'} justify={'center'} mb={2}>
                    <Button
                        _hover={{
                            bg: 'green.500',
                        }}
                        onClick={onCopy}
                        ml={2}
                    >
                        {hasCopied ? 'Copied' : 'Copy'}
                    </Button>
                </Flex>
            </Box>
        </Layout>
    );
};

export default CreateGame;
