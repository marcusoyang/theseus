import { useUser } from '@auth0/nextjs-auth0';
import Layout from '../components/layout';
import {
    Box,
    Button,
    Flex,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import Link from 'next/link';

const Home = () => {
    const { user, isLoading } = useUser();

    return (
        <Layout user={user} loading={isLoading}>
            <Box textAlign={'center'}>
                <Heading mt={12} size={'2xl'}>
                    Theseus
                </Heading>
            </Box>

            {isLoading && <Text>Loading login info...</Text>}

            {!isLoading && !user && (
                <Box mt={8} textAlign={'center'}>
                    <Text>Please sign in.</Text>
                </Box>
            )}

            {user && (
                <Box textAlign={'center'}>
                    <Heading mt={8} mb={5} size={'sm'}>
                        <Flex justify={'center'} w={'auto'}>
                            Signed in as&nbsp;
                            <Text color={'green.300'}>{user.name}</Text>
                        </Flex>
                    </Heading>
                    <Link href={'/createGame'}>
                        <Button
                            borderRadius={'md'}
                            color={useColorModeValue('gray.600', 'white')}
                            bg={'gray.200'}
                            border={'1px solid transparent'}
                            padding={'0.5rem 1rem'}
                            rounded={'md'}
                            _hover={{
                                bg: 'green.500',
                            }}
                        >
                            Create a game
                        </Button>
                    </Link>
                </Box>
            )}
        </Layout>
    );
};

// fast/cached SSR page
export default Home;
