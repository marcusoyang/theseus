import { ChakraProvider } from '@chakra-ui/react';
import ChessStore from '../mobx/ChessStore';
import { observer } from 'mobx-react-lite';
import { createContext, useContext } from 'react';

interface AppProps {
    Component: React.ComponentType;
    pageProps: any;
}

export const GameContext = createContext<ChessStore>(new ChessStore());

export default function App({ Component, pageProps }: AppProps) {
    return (
        <GameContext.Provider value={new ChessStore()}>
            <ChakraProvider>
                <Component {...pageProps} />
            </ChakraProvider>
        </GameContext.Provider>
    );
}
