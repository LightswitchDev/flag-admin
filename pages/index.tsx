import { useQuery } from '@apollo/react-hooks';
import { Box, Button, SimpleGrid, useDisclosure } from '@chakra-ui/core';
import { NextPage } from 'next';
import Link from 'next/link';
import * as React from 'react';
import Layout from '../components/Layout';
import LightSwitch from '../components/Switch';
import { GET_SWITCHES_BY_ORG, SwitchFromOrg } from '../gql/switches';
import { SwitchDrawer } from '../components/SwitchDrawer';

const IndexPage: NextPage = () => {
    const id = 'ck5dcn0980000ixw1e9fjiqfh';
    const { data, loading, error } = useQuery<{ switches: SwitchFromOrg[] }>(GET_SWITCHES_BY_ORG, {
        variables: { id },
    });

    const btnRef = React.useRef();
    const { isOpen, onOpen, onClose } = useDisclosure();

    if (loading) return <p>Loading</p>;
    if (error) return <p>ERROR: {error.message}</p>;
    if (!data) return <p>Not found</p>;
    const { switches } = data;
    return (
        <Layout title="Home | Next.js + TypeScript Example">
            <h1>Hello Next.js 👋</h1>
            <p>
                <Link href="/about">
                    <a>About</a>
                </Link>
            </p>
            <SimpleGrid maxW="2xl" margin="0 auto" columns={1}>
                <Box justifySelf="end">
                    <Button ref={btnRef} size="sm" mb="3" variant="outline" onClick={onOpen}>
                        +
                    </Button>
                    <SwitchDrawer isOpen={isOpen} onClose={onClose} btnRef={btnRef}></SwitchDrawer>
                </Box>
                <Box>
                    {switches.map(lightswitch => (
                        <LightSwitch lightswitch={lightswitch}></LightSwitch>
                    ))}
                </Box>
            </SimpleGrid>
        </Layout>
    );
};

export default IndexPage;
