import { UserProvider } from '@auth0/nextjs-auth0';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import theme from '../theme';

export default function App({ Component, pageProps }) {
    // optionally pass the 'user' prop from pages that require server-side
    // rendering to prepopulate the 'useUser' hook.
    const { user } = pageProps;

    return (
        <ChakraProvider theme={theme}>
            <UserProvider user={user}>
                <Component {...pageProps} />
            </UserProvider>
        </ChakraProvider>
    );
}
