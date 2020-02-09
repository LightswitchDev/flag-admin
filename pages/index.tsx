import {
    Box,
    Button,
    useDisclosure,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverTrigger,
    Heading,
    PopoverContent,
    PopoverHeader,
    PopoverCloseButton,
} from '@chakra-ui/core';
import { NextPage, NextPageContext } from 'next';
import * as React from 'react';
import useSWR from 'swr';
import APIKeysList from '../components/snippets/APIKeys';
import { Navigation } from '../components/Navigation';
import { SwitchDrawer } from '../components/SwitchDrawer';
import SwitchesList from '../components/SwitchesList';
import { Organization, ORG_URL_KEY } from '../data/organizations';
import { SwitchFromOrg } from '../data/switches';
import { getOrganizationId } from "./helpers/getOrganization";

import { useAuth } from '../lib/auth';

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
        <Navigation>
            <Box padding="1em">
                <Heading>Get your Client Keys</Heading>

                <APIKeysList organizationId={organizationId} />

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
            </Box>
        </Navigation>
    );
};

IndexPage.getInitialProps = async (ctx: NextPageContext): Promise<Props> => {
    const organizationId = await getOrganizationId(ctx);

    return { organizationId };
};

export default IndexPage;
