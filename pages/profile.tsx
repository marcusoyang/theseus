import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Box, Center, Heading, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Layout from '../components/layout';
import { User } from '../interfaces';

type ProfileCardProps = {
    user: User;
};

const ProfileCard = ({ user }: ProfileCardProps) => {
    return (
        <Box textAlign={'center'} p={10}>
            <Heading mb={4}>Profile</Heading>

            <Box>
                {/* <Heading mb={4}>Profile (client rendered)</Heading> */}
                {/* <Image
                    src={user.picture}
                    alt='user picture'
                    width={200}
                    height={200}
                /> */}
                <Center mb={4}>
                    <img src={user.picture} alt='user picture' />
                </Center>
                <Text mb={4}>Nickname: {user.nickname}</Text>
                <Text mb={4}>Name: {user.name}</Text>
                {/* {user.sub} */}
            </Box>
        </Box>
    );
};

const Profile = ({ user, isLoading }) => {
    return (
        <Layout user={user} loading={isLoading}>
            {isLoading ? <>Loading...</> : <ProfileCard user={user} />}
        </Layout>
    );
};

// Protected route, checking user authentication client-side.(CSR)
export default withPageAuthRequired(Profile);
