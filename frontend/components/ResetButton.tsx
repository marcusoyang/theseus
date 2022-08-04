import { Button } from '@chakra-ui/react';
import { ChessInstance } from 'chess.js';
import { useContext } from 'react';
import { GameContext } from '../pages/_app';

const ResetButton = () => {
    let gameStore = useContext(GameContext);
    let game: ChessInstance = gameStore.get;

    const resetGame = () => {
        game.reset();
        console.log('reset');
        gameStore.updatePosition();
    };

    return <Button onClick={resetGame}>Reset game.</Button>;
};

export default ResetButton;
