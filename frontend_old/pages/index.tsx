import {
    Box,
    Text,
    Container,
    Heading,
    Center,
    flexbox,
} from '@chakra-ui/react';
import { ChessInstance } from 'chess.js';
import { observer } from 'mobx-react-lite';
import dynamic from 'next/dynamic';
import { Suspense, useContext, useEffect, useState } from 'react';
import ResetButton from '../components/ResetButton';
import { GameContext } from './_app';

const Board = dynamic(() => import('../components/Board'), {
    ssr: false,
});

function Home() {
    let gameStore = useContext(GameContext);
    let game: ChessInstance = gameStore.get;

    let [currentPlayer, setCurrentPlayer] = useState(game.turn());

    // useEffect(() => {
    //     setCurrentPlayer(game.turn());
    //     console.log('object');
    // }, [gameStore.game]);

    return (
        <Container minW={'800px'}>
            <Box my={8} textAlign={'center'}>
                <Heading mb={4} size='2xl'>
                    Sigmund
                </Heading>
                <Text>A Chess Engine</Text>
            </Box>
            <Box
                textAlign={'center'}
                display={'flex'}
                justifyContent={'center'}
            >
                <Box boxShadow={'6xl'}>
                    <Board />
                </Box>
            </Box>
            <Box textAlign={'center'} my={4}>
                {/* <Text mb={4}>
                    Current player: {currentPlayer == 'w' ? 'White' : 'Black'}
                </Text> */}
                <ResetButton />
            </Box>
        </Container>
    );
}

export default observer(Home);
