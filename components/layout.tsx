import { Box } from '@chakra-ui/react';
import Head from 'next/head';
import Footer from './footer';
import Header from './header';

type LayoutProps = {
    user?: any;
    loading?: boolean;
    children: React.ReactNode;
};

const Layout = ({ user, loading = false, children }: LayoutProps) => {
    return (
        <>
            <Head>
                <title>Theseus - A Chess Web App</title>
            </Head>

            <Header user={user} loading={loading} />

            <main>
                <Box backgroundColor={'gray.500'} className='container'>
                    {children}
                </Box>
            </main>
            <Footer />
        </>
    );
};

export default Layout;
