import * as React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { Box, Heading, Flex, Text, Button, Icon, useDisclosure } from '@chakra-ui/core';
import styled from '@emotion/styled';
import { useRouter } from 'next/router'
import AuthModal from './AuthModal';
import { useAuth } from '../lib/auth';

const MenuItems: React.FC = ({ children }) => (
    <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
        {children}
    </Text>
);

const Header: React.FC = props => {
    const [show, setShow] = React.useState(true);
    const handleToggle = () => setShow(!show);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLogin, setIsLogin] = React.useState(false);
    const openLogin = () => {
        setIsLogin(true);
        onOpen();
    };

    const openSignUp = () => {
        setIsLogin(false);
        onOpen();
    };


    const auth = useAuth();
    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            padding="1.5rem"
            bg="gray.600"
            mb="30px"
            color="white"
            {...props}
        >
            <Flex align="center" mr={5}>
                <Heading as="h1" size="lg" letterSpacing={'-.1rem'}>
                    <Link href="/"><a>Lightswitch</a></Link>
                </Heading>
            </Flex>

            <Box display={{ sm: 'auto', md: 'none' }} onClick={handleToggle}>
                <svg fill="white" width="12px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <title>Menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
            </Box>

            <Box
                display={{ sm: show ? 'block' : 'none', md: 'flex' }}
                width={{ sm: 'full', md: 'auto' }}
                alignItems="center"
                flexGrow={1}
            >
                <MenuItems><Link href="/get-started"><a>Docs</a></Link></MenuItems>
                <MenuItems>Examples</MenuItems>
                <MenuItems>Blog</MenuItems>
                <MenuItems><a href="https://github.com/LightswitchDev/flag-client">GitHub</a></MenuItems>
            </Box>

            <AuthModal isLogin={isLogin} onClose={onClose} isOpen={isOpen}></AuthModal>
            <Box display={{ sm: show ? 'block' : 'none', md: 'block' }} mt={{ base: 4, md: 0 }}>
              {auth?.user ? (
                <Button ml="5px" width="100px" variant="outline" onClick={auth?.signout}>
                  Logout
                </Button>
                ) : (
                    <>
                        <Button variant="solid" width="100px" borderColor="gray.400" color="black" onClick={openSignUp}>
                            Get Started
                        </Button>
                        <Button ml="5px" width="100px" variant="outline" onClick={openLogin}>
                            Login
                        </Button>
                    </>
                )}
            </Box>
        </Flex>
    );
};
type Props = {
    title?: string;
};

const Navigation: React.FunctionComponent<Props> = ({ children, title = '' }) => {

  return (<div>
        <Head>
            <title>{title ? `${title} | Lightswitch` : "Lightswitch"}</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Header />
        {children}
    </div>);
}

const NavigationSection = styled.div`
  margin-top: 0.5em;
`;

type LeftPaneLinkProps = {
  href: string;
  title: string;
};
const LeftPaneLink: React.FunctionComponent<LeftPaneLinkProps> = ({ href, title }) => (<Box>
  <Link href={href}><a>{title}</a></Link>
</Box>);

const WithLeftPaneNavigation: React.FC = ({ children }) => {
  const router = useRouter();
  return (
    <Flex flexDirection={["column", "column", "row", "row"]}>
      <Box w={["100%", "100%", "30%", "20%"]} padding="1em" marginBottom="1em" borderBottom={["solid 1px black", "solid 1px black", "none", "none"]}>
        <Heading as="h1" size="lg">Documentation</Heading>

        <NavigationSection>
          <Heading as="h2" size="md" style={{ "textDecoration": router.pathname === "/" ? "underline" : "normal" }}>Getting Started</Heading>
          <LeftPaneLink href="/get-started" title="Get your Client keys" />
          <LeftPaneLink href="/get-started#using-the-client" title="Using the client" />
          <Heading as="h2" size="md" style={{ "textDecoration": router.pathname === "/" ? "underline" : "normal" }}>Middleware</Heading>
          <LeftPaneLink href="/middleware#react" title="React" />
        </NavigationSection>
      </Box>
      <Box w={["100%", "100%", "70%", "80%"]} padding="1em">
        {children}
      </Box>
    </Flex>
  );
}

type RightPaneAnchorProps = {
  anchor: string;
  title?: string;
};

const RightPaneIcon = styled.a`
  font-size: 0.5em;
  color: gray;
  vertical-align: middle;
`;
const RightPaneAnchor: React.FunctionComponent<RightPaneAnchorProps> = ({ anchor, title }) => (
  <Heading><RightPaneIcon href={`#${anchor}`}><Icon name="link" /></RightPaneIcon> {title}</Heading>
);

export { Navigation, WithLeftPaneNavigation, RightPaneAnchor };
