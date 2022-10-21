import { Button } from '@chakra-ui/react';
import { ChessInstance } from 'chess.js';
import { useContext } from 'react';
import { GameContext } from '../pages/_app';
import { getClient } from './_utils';

const ResetButton = () => {
    let gameStore = useContext(GameContext);
    let game: ChessInstance = gameStore.get;
    const client = getClient();

    const resetGame = async () => {
        game.reset();
        console.log('reset');
        gameStore.updatePosition();
        await client.sendToAll(game.fen());
    };

    return <Button onClick={resetGame}>Reset game.</Button>;
};

export default ResetButton;
