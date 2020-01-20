import { useQuery } from '@apollo/react-hooks';
import { Box, Button, SimpleGrid, useDisclosure } from '@chakra-ui/core';
import { ApolloClient } from 'apollo-boost';
import { NextPage, NextPageContext } from 'next';
import { parseCookies, setCookie } from 'nookies';
import * as React from 'react';
import APIKeysList from '../components/APIKeys';
import Layout from '../components/Layout';
import LightSwitch from '../components/Switch';
import { SwitchDrawer } from '../components/SwitchDrawer';
import { CreateOneOrganizationResult, CREATE_ORGANIZATION } from '../gql/organizations';
import { GET_SWITCHES_BY_ORG, SwitchFromOrg } from '../gql/switches';
type Props = {
    organizationId: string;
};
const IndexPage: NextPage<Props> = ({ organizationId }) => {
    const { data, loading, error } = useQuery<{ switches: SwitchFromOrg[] }>(GET_SWITCHES_BY_ORG, {
        variables: { id: organizationId },
    });

    const btnRef = React.useRef();
    const { isOpen, onOpen, onClose } = useDisclosure();

    if (loading) return <p>Loading</p>;
    if (error) return <p>ERROR: {error.message}</p>;
    if (!data) return <p>Not found</p>;
    const { switches } = data;
    return (
        <Layout title="Lightswitch">
            <SimpleGrid maxW="2xl" margin="0 auto" columns={1}>
                <APIKeysList organizationId={organizationId} />

                <Box justifySelf="end">
                    <Button borderColor="gray.500" ref={btnRef} size="sm" mb="3" variant="outline" onClick={onOpen}>
                        +
                    </Button>
                    <SwitchDrawer
                        isOpen={isOpen}
                        onClose={onClose}
                        btnRef={btnRef}
                        organizationId={organizationId}
                    ></SwitchDrawer>
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

IndexPage.getInitialProps = async (ctx: NextPageContext & { apolloClient: ApolloClient<any> }): Promise<Props> => {
    const cookies = parseCookies(ctx);
    let organizationId: string | undefined = cookies['lightswitch'];
    if (!organizationId) {
        console.log('no cookie');
        const { data } = await ctx.apolloClient.mutate<CreateOneOrganizationResult>({
            mutation: CREATE_ORGANIZATION,
            variables: { organization: { keys: { create: [{}] } } },
        });
        organizationId = data?.createOneOrganization?.id ?? '';

        if (organizationId) {
            setCookie(ctx, 'lightswitch', organizationId, { maxAge: 60 * 60 * 24 * 30 * 1000 });
            ctx.apolloClient.writeData({ data: { organizationId } });
        }
    }

    console.log(organizationId);

    return { organizationId };
};

export default IndexPage;
