import { Box } from '@chakra-ui/react';
import { Chess, Square, ChessInstance, Move } from 'chess.js';
import Chessboard from 'chessboardjsx';
import { Piece } from 'chessboardjsx';
import { observer } from 'mobx-react';

import React, { useContext, useEffect } from 'react';
import { GameContext } from '../pages/_app';

const Board = () => {
    let gameStore = useContext(GameContext);
    let game: ChessInstance = gameStore.get;
    let [position, setPosition] = React.useState<string>(game.fen);
    gameStore.initializeSetPosition(setPosition);

    const handleDrop = (props: {
        sourceSquare: Square;
        targetSquare: Square;
        piece: Piece;
    }) => {
        let source = props.sourceSquare;
        let target = props.targetSquare;

        let possibleMoves = game.moves({ verbose: true });

        let move = possibleMoves.find((move: Move) => {
            return (
                move.from === source &&
                move.to === target &&
                move.piece === move.piece
            );
        });

        if (!move) {
            // Invalid move
            return;
        }

        game.move({ from: source, to: target });
        gameStore.updatePosition();
    };

    return <Chessboard position={position} onDrop={handleDrop} />;
};

export default Board;

// Game loop so makeRandomMove keeps running
// useEffect(() => {
//     setInterval(() => {
//         game.makeRandomMove();
//         setPosition(game.fen);
//     }, 2000);
// }, []);
