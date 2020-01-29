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
import { createOrganization, ORG_URL_KEY, Organization } from '../data/organizations';
import { SwitchFromOrg } from '../data/switches';
import { ProviderSnippet } from '../components/CodeSnippets';
import SwitchesList from '../components/SwitchesList';
type Props = {
    organizationId: string;
};
const IndexPage: NextPage<Props> = ({ organizationId }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();
    const { data: organization, error } = useSWR<Organization>(`${ORG_URL_KEY}/${organizationId}`, {
        refreshWhenHidden: true,
        revalidateOnFocus: false,
    });
    const [currentLightswitch, setCurrentLightswitch] = React.useState<SwitchFromOrg | undefined>();

    if (!organization) return <p>Loading</p>;
    if (error) return <p>ERROR: {error.message}</p>;

    const { lightswitches } = organization;
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
                        <AccordionItem>
                            <AccordionHeader>
                                <AccordionIcon />
                                <Box flex="1" ml="9px" color="gray.600" textAlign="left">
                                    Add Provider
                                </Box>
                            </AccordionHeader>
                            <AccordionPanel pb={4}>
                                <ProviderSnippet></ProviderSnippet>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </Box>

                <Box flex="1">
                    <SwitchDrawer
                        lightswitch={currentLightswitch}
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
                    <SwitchesList
                        onOpen={onOpen}
                        lightswitches={lightswitches}
                        organizationId={organizationId}
                        setCurrentLightswitch={setCurrentLightswitch}
                    ></SwitchesList>
                </Box>
            </Stack>
        </Layout>
    );
};

IndexPage.getInitialProps = async (ctx: NextPageContext): Promise<Props> => {
    const cookies = parseCookies(ctx);
    let organizationId: string = cookies['lightswitch'];
    if (!organizationId) {
        const { organization } = await createOrganization({ shouldMutate: true });
        organizationId = organization.id;

        if (organizationId) {
            setCookie(ctx, 'lightswitch', organizationId, { maxAge: 60 * 60 * 24 * 30 * 1000 });
        }
    }

    return { organizationId };
};

export default IndexPage;
