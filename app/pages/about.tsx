import { useUser } from '@auth0/nextjs-auth0';
import { Heading, Box, Text } from '@chakra-ui/react';
import Layout from '../components/layout';

const About = () => {
    const { user, isLoading } = useUser();

    return (
        <Layout user={user} loading={isLoading}>
            <Box p={10}>
                <Heading mb={2}>Multiplayer Chess App</Heading>
                <Text>
                    A multiplayer chess web-application project using React,
                    NextJS, Chakra UI, TypeScript, SocketIO.
                </Text>
            </Box>
        </Layout>
    );
};

export default About;
