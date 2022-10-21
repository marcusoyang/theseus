import { useUser } from '@auth0/nextjs-auth0';
import Layout from '../../components/layout';
import {
    Box,
    Button,
    Center,
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
    const { user, isLoading } = useUser();
    const [gameId, setGameId] = useState();
    const [color, setColor] = useState();
    const [playerTurn, setPlayerTurn] = useState(false);
    const [gameOver, setGameOver] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (!router.isReady) return;
        // @ts-ignore
        setGameId(router.query.gameId);
        // @ts-ignore
        setColor(router.query.c === 'w' ? 'white' : 'black');
    }, [router.isReady]);

    useEffect(() => {
        socket.on('startGame', () => {
            console.log('starting game');
        });
        socket.on('move', (move) => {
            console.log(move);
            chess.move(move);
            setFen(chess.fen());
            setPlayerTurn(true);

            // Game Over
            if (chess.isGameOver()) {
                if (chess.isCheckmate()) {
                    setGameOver('Checkmate');
                } else if (chess.isDraw()) {
                    setGameOver('Draw');
                } else if (chess.isStalemate()) {
                    setGameOver('Stalemate');
                } else if (chess.isThreefoldRepetition()) {
                    setGameOver('Threefold Repetition');
                } else if (chess.isInsufficientMaterial()) {
                    setGameOver('Insufficient Material');
                }
                socket.emit('gameOver', gameId);
            }
        });
        socket.on('gameOver', () => {
            setGameOver('You won!');
        });
    }, []);

    useEffect(() => {
        if (!gameId) return;
        socket.emit('join', gameId);
    }, [gameId]);

    useEffect(() => {
        if (!color) return;
        setPlayerTurn(color === 'white');
    }, [color]);

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
        setPlayerTurn(false);

        // send to server
        socket.emit('move', move);
    };

    // const allowDrag = (props: { piece: Piece }) => {
    //     let pieceColor = props.piece['color'] === 'w' ? 'white' : 'black';
    //     console.log(pieceColor);
    //     console.log(color);
    //     // return props.piece[0] == color;
    //     console.log(pieceColor == color);
    //     return true;
    // };

    const endGame = () => {
        setGameOver('Game ended manually.');
        socket.emit('gameOver', gameId);
    };

    return (
        <Layout user={user} loading={isLoading}>
            {/* <Box textAlign={'center'} m={12}>
                <Heading size={'2xl'}>Chess</Heading>
            </Box> */}
            <Box
                textAlign={'center'}
                w={'100%'}
                mt={12}
                display={gameOver != '' ? 'inline-block' : 'none'}
            >
                <Heading>Game Over!</Heading>
                <Text>Reason: {gameOver}</Text>
            </Box>
            <Flex mt={12} justifyContent={'center'}>
                <ChessBoard
                    position={FEN}
                    orientation={color}
                    onDrop={onDrop}
                    draggable={gameOver == '' && playerTurn}
                    // allowDrag={allowDrag}
                />
            </Flex>
            <Center>
                <Button onClick={endGame}>end game</Button>
            </Center>
        </Layout>
    );
};

// fast/cached SSR page
export default PlayGame;
