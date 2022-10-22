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
    Container,
    chakra,
    VisuallyHidden,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { FaBars, FaTimes, FaGithub, FaTwitter } from 'react-icons/fa';

const SocialButton = ({
    children,
    label,
    href,
}: {
    children: ReactNode;
    label: string;
    href: string;
}) => {
    return (
        <chakra.button
            bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
            rounded={'full'}
            w={8}
            h={8}
            cursor={'pointer'}
            as={'a'}
            href={href}
            display={'inline-flex'}
            alignItems={'center'}
            justifyContent={'center'}
            transition={'background 0.3s ease'}
            _hover={{
                bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
            }}
        >
            <VisuallyHidden>{label}</VisuallyHidden>
            {children}
        </chakra.button>
    );
};

const Footer = () => {
    return (
        <Box
            as='footer'
            bg={useColorModeValue('gray.50', 'gray.600')}
            color={useColorModeValue('gray.700', 'gray.100')}
            bottom={'0'}
            position={'fixed'}
            width={'100%'}
        >
            <Container
                as={Stack}
                py={4}
                direction={{ base: 'column', md: 'row' }}
                spacing={4}
                justify={{ base: 'center', md: 'space-between' }}
                align={{ base: 'center', md: 'center' }}
            >
                <Text>Created by Marcus O'Yang.</Text>
                <Stack direction={'row'} spacing={6}>
                    <SocialButton
                        label={'Github'}
                        href={'https://github.com/marcusoyang'}
                    >
                        <FaGithub />
                    </SocialButton>
                    {/* <SocialButton label={'YouTube'} href={'#'}>
            <FaYoutube />
          </SocialButton>
          <SocialButton label={'Instagram'} href={'#'}>
            <FaInstagram />
          </SocialButton> */}
                </Stack>
            </Container>
        </Box>
    );
};

export default Footer;
