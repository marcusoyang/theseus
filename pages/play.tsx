// This page is not required

import { useUser } from '@auth0/nextjs-auth0';
import { Box, Center, Flex, Heading } from '@chakra-ui/react';
import Layout from '../components/layout';
import { Chess, Square, Move } from 'chess.js';
import { Piece } from 'chessboardjsx';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const ChessBoard = dynamic(() => import('chessboardjsx'), { ssr: false });

const URL = 'http://localhost:8080';
const socket = io(URL);

let chess = new Chess();

const Play = () => {
    const { user, isLoading } = useUser();
    const [FEN, setFen] = useState<string>('start');

    useEffect(() => {
        // let timeout = setInterval(() => {
        //     makeRandomMove();
        // }, 1000);
        socket.on('move', (move) => {
            console.log(move);
            chess.move(move);
            setFen(chess.fen());
        });
    }, []);

    const makeRandomMove = () => {
        let possibleMoves = chess.moves();
        console.log(possibleMoves);
        let randomIndex = Math.floor(Math.random() * possibleMoves.length);
        chess.move(possibleMoves[randomIndex]);
        setFen(chess.fen());
    };

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

export default Play;
