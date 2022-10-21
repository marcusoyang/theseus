import { useUser } from '@auth0/nextjs-auth0';
import Layout from '../../components/layout';
import {
    Box,
    Button,
    Flex,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import Link from 'next/link';
import { io } from 'socket.io-client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Chess, Move, Square } from 'chess.js';
import { Piece } from 'chessboardjsx';
import dynamic from 'next/dynamic';

const ChessBoard = dynamic(() => import('chessboardjsx'), { ssr: false });

const URL = 'http://localhost:8080';
const socket = io(URL);

const local = 'http://localhost:3000';
let chess = new Chess();

const PlayGame = () => {
    // Socket Logic
    const { user, isLoading } = useUser();
    const [gameId, setGameId] = useState();
    const router = useRouter();

    useEffect(() => {
        if (!router.isReady) return;
        // @ts-ignore
        setGameId(router.query.gameId);
    }, [router.isReady]);

    useEffect(() => {
        socket.on('startGame', () => {
            console.log('starting game');
        });
        socket.on('move', (move) => {
            console.log(move);
            chess.move(move);
            setFen(chess.fen());
        });
    }, []);

    useEffect(() => {
        if (!gameId) return;
        socket.emit('join', gameId);
    }, [gameId]);

    // Game Logic
    const [FEN, setFen] = useState<string>('start');

    const onDrop = (props: {
        sourceSquare: Square;
        targetSquare: Square;
        piece: Piece;
    }) => {
        // const move = chess.move({
        //     from: sourceSquare,
        //     to: targetSquare,
        //     promotion: 'q',
        // });

        let possibleMoves = chess.moves({ verbose: true });
        // @ts-ignore
        let move = possibleMoves.find((move: Move) => {
            return (
                move.from === props.sourceSquare &&
                move.to === props.targetSquare
            );
        });
        if (!move) return;
        chess.move(move.san);
        setFen(chess.fen());

        // send to server
        socket.emit('move', move);
        console.log('emitting');
    };

    return (
        <Layout user={user} loading={isLoading}>
            <Box textAlign={'center'} m={12}>
                <Heading size={'2xl'}>Chess</Heading>
            </Box>
            <Flex justifyContent={'center'}>
                <ChessBoard position={FEN} onDrop={onDrop} />
            </Flex>
        </Layout>
    );
};

// fast/cached SSR page
export default PlayGame;
