import Link from 'next/link';

import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Icon,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
} from '@chakra-ui/react';

type HeaderProps = {
    user?: any;
    loading: boolean;
};

const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
];

const navItemsLoggedIn = [
    { label: 'Profile', href: '/profile' },
    { label: 'Logout', href: '/api/auth/logout' },
];

const Header = ({ user, loading }: HeaderProps) => {
    return (
        <Box>
            <Flex
                bg={useColorModeValue('white', 'gray.600')}
                color={useColorModeValue('gray.600', 'white')}
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}
                justify={'space-between'}
            >
                <Stack direction={'row'} spacing={4}>
                    {navItems.map((navItem) => (
                        <Link href={navItem.href} key={navItem.label}>
                            <Button
                                as={'a'}
                                fontSize={'md'}
                                fontWeight={400}
                                variant={'link'}
                                href={'#'}
                                color={useColorModeValue('gray.600', 'white')}
                            >
                                {navItem.label}
                            </Button>
                        </Link>
                    ))}
                </Stack>
                <Stack
                    flex={{ base: 1, md: 0 }}
                    justify={'flex-end'}
                    direction={'row'}
                    spacing={6}
                >
                    {!loading &&
                        (user ? (
                            navItemsLoggedIn.map((navItem) => (
                                <Link href={navItem.href} key={navItem.label}>
                                    <Button
                                        as={'a'}
                                        fontSize={'md'}
                                        fontWeight={400}
                                        variant={'link'}
                                        href={'#'}
                                        color={useColorModeValue(
                                            'gray.600',
                                            'white'
                                        )}
                                    >
                                        {navItem.label}
                                    </Button>
                                </Link>
                            ))
                        ) : (
                            <Link href='/api/auth/login'>
                                <Button
                                    as={'a'}
                                    fontSize={'md'}
                                    fontWeight={400}
                                    variant={'link'}
                                    href={'#'}
                                    borderRadius={'md'}
                                    color={useColorModeValue(
                                        'gray.600',
                                        'white'
                                    )}
                                    bg={'green.300'}
                                    border={'1px solid transparent'}
                                    padding={'0.5rem 1rem'}
                                    rounded={'md'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                >
                                    Sign In
                                </Button>
                            </Link>
                        ))}
                </Stack>
            </Flex>
        </Box>
    );
};

export default Header;
{
    /* <li>
<Link href="/advanced/ssr-profile">
<a>Server rendered profile (advanced)</a>
</Link>
</li> */
}

{
    /* <li>
<Link href="/advanced/api-profile">
<a>API rendered profile (advanced)</a>
</Link>
</li> */
}
