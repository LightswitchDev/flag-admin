import {
    Accordion,
    AccordionHeader,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Stack,
    useDisclosure,
} from '@chakra-ui/core';
import { NextPage, NextPageContext } from 'next';
import { parseCookies, setCookie } from 'nookies';
import * as React from 'react';
import useSWR from 'swr';
import APIKeysList from '../components/APIKeys';
import { ProviderSnippet } from '../components/CodeSnippets';
import { Header, Layout } from '../components/Layout';
import { SwitchDrawer } from '../components/SwitchDrawer';
import SwitchesList from '../components/SwitchesList';
import { createOrganization, Organization, ORG_URL_KEY } from '../data/organizations';
import { SwitchFromOrg } from '../data/switches';

import { useAuth } from '../lib/auth';
import CodeSandbox from '../components/CodeSandbox';

type Props = {
    organizationId: string;
};

const IndexPage: NextPage<Props> = ({ organizationId }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();

    const auth = useAuth();
    console.log();
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
            <Header></Header>
            <Stack maxW="2xl" margin="0 auto" pb="10px">
                <Box shadow="md" borderWidth="1px" flex="1" rounded="md">
                    <Accordion allowToggle defaultIndex={lightswitches.length === 0 ? 0 : -1}>
                        <AccordionItem>
                            <AccordionHeader>
                                <AccordionIcon />
                                <Box flex="1" ml="9px" fontWeight="bold" color="gray.600" textAlign="left">
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
                                <Box flex="1" ml="9px" fontWeight="bold" color="gray.600" textAlign="left">
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
                    <Popover returnFocusOnClose={true} placement="bottom" defaultIsOpen={lightswitches.length === 0}>
                        <PopoverTrigger>
                            <Button
                                float="right"
                                borderColor="gray.300"
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
                                onClick={() => {
                                    setCurrentLightswitch(undefined);
                                    onOpen();
                                }}
                            >
                                +
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent zIndex={4} color="black" bg="white">
                            <PopoverHeader pt={4} fontWeight="bold" color="gray.600" border="0">
                                Create your first Switch!
                            </PopoverHeader>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverBody>
                                A Switch will allow you to toggle features on and off in your environments.
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                </Box>
                {lightswitches?.length > 0 && (
                    <Box shadow="md" borderWidth="1px" flex="1" rounded="md">
                        <SwitchesList
                            onOpen={onOpen}
                            lightswitches={lightswitches}
                            organizationId={organizationId}
                            setCurrentLightswitch={setCurrentLightswitch}
                        ></SwitchesList>
                    </Box>
                )}
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
