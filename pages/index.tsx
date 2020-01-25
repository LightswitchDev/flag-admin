import useSWR, { mutate } from 'swr';

import {
    Accordion,
    AccordionHeader,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Stack,
    useDisclosure,
    Divider,
} from '@chakra-ui/core';

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
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();

    // const { data, loading, error } = useQuery<{ switches: SwitchFromOrg[] }>(GET_SWITCHES_BY_ORG, {
    //     variables: { id: organizationId },
    // });

    // if (loading) return <p>Loading</p>;
    // if (error) return <p>ERROR: {error.message}</p>;
    // if (!data) return <p>Not found</p>;
    const { switches } = { switches: [] };
    return (
        <Layout title="Lightswitch">
            <Stack maxW="2xl" margin="0 auto" pb="10px">
                <Box shadow="md" borderWidth="1px" flex="1" rounded="md">
                    <Accordion allowToggle defaultIndex={-1}>
                        <AccordionItem>
                            <AccordionHeader>
                                <AccordionIcon />
                                <Box flex="1" ml="9px" color="gray.600" textAlign="left">
                                    Get your Client Keys
                                </Box>
                            </AccordionHeader>
                            <AccordionPanel pb={4}>
                                <APIKeysList organizationId={organizationId} />
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </Box>

                <Box flex="1">
                    <SwitchDrawer
                        isOpen={isOpen}
                        onClose={onClose}
                        btnRef={btnRef}
                        organizationId={organizationId}
                    ></SwitchDrawer>
                    <Button
                        float="right"
                        borderColor="gray.200"
                        color="gray.500"
                        ref={btnRef}
                        size="sm"
                        shadow="sm"
                        rounded="md"
                        borderWidth="1px"
                        mr="20px"
                        backgroundColor="white"
                        height="22px"
                        minW="40px"
                        variant="solid"
                        onClick={onOpen}
                    >
                        +
                    </Button>
                </Box>
                <Box shadow="md" borderWidth="1px" flex="1" rounded="md">
                    {switches.map((lightswitch, i) => (
                        <Box>
                            <LightSwitch lightswitch={lightswitch}></LightSwitch>
                            {i !== switches.length - 1 && <Divider />}
                        </Box>
                    ))}
                </Box>
            </Stack>
        </Layout>
    );
};

IndexPage.getInitialProps = async (ctx: NextPageContext): Promise<Props> => {
    const cookies = parseCookies(ctx);
    let organizationId: string | undefined = cookies['lightswitch'];
    if (!organizationId) {
        // const { data } = await ctx.apolloClient.mutate<CreateOneOrganizationResult>({
        //     mutation: CREATE_ORGANIZATION,
        //     variables: { organization: { keys: { create: [{}] } } },
        // });

        if (organizationId) {
            setCookie(ctx, 'lightswitch', organizationId, { maxAge: 60 * 60 * 24 * 30 * 1000 });
            // ctx.apolloClient.writeData({ data: { organizationId } });
        }
    }

    return { organizationId };
};

export default IndexPage;
