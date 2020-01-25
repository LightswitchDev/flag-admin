import * as React from 'react';
import { Box, IconButton, Text, Tooltip, useToast } from '@chakra-ui/core';
import { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Organization, ORG_URL_KEY } from '../data/organizations';
import useSWR from 'swr';

type Props = {
    organizationId: string;
};

const TooltipWithCopy: React.FunctionComponent<{ text: string }> = ({ children, text }) => {
    const toast = useToast();
    return (
        <Tooltip
            shouldWrapChildren={true}
            placement="left-end"
            aria-label="Click to copy secret"
            label="Click to copy."
        >
            <CopyToClipboard
                onCopy={() =>
                    toast({
                        title: 'Copied!',
                        duration: 750,
                        position: 'top',
                    })
                }
                text={text}
            >
                {children}
            </CopyToClipboard>
        </Tooltip>
    );
};

const SecretDisplay: React.FunctionComponent<{ k: string }> = ({ k }) => {
    const [isVisible, displayKey] = useState(false);
    return (
        <Box marginBottom="4px" rounded="lg" borderColor="gray.400" justifyContent="left" d="flex" maxW="small">
            <Text fontWeight={600} w="120px">
                Client Secret
            </Text>

            <TooltipWithCopy text={k}>
                <Text pl="5px" pr="5px" as="button" textAlign="left" fontSize="s">
                    {isVisible ? k : '*'.repeat(15)}
                </Text>
            </TooltipWithCopy>
            <Box>
                <TooltipWithCopy text={k}>
                    <IconButton
                        variant="outline"
                        aria-label="Show Key"
                        size="xs"
                        ml="8px"
                        hidden={isVisible}
                        icon={isVisible ? 'view-off' : 'view'}
                        onClick={() => displayKey(!isVisible)}
                    ></IconButton>
                </TooltipWithCopy>
            </Box>
        </Box>
    );
};

const APIKeysList: React.FunctionComponent<Props> = ({ organizationId }) => {
    // const { data, loading, error } = useQuery<{ organization: Organization }>(GET_ORGANIZATION, {
    //     variables: { id: organizationId },
    // });

    const { data: organization, error } = useSWR<Organization>(`${ORG_URL_KEY}/${organizationId}`, {
        refreshWhenHidden: true,
        revalidateOnFocus: true,
    });
    if (!organization) return <p>Loading</p>;
    if (error) return <p>ERROR: {error.message}</p>;

    const { key, id } = organization;

    return (
        <Box>
            <Box maxW="s" display="flex">
                <Text w="120px" fontWeight={600}>
                    Client Id
                </Text>
                <TooltipWithCopy text={id}>
                    <Text pl="5px" pr="5px" as="button" fontSize="s">
                        {id}
                    </Text>
                </TooltipWithCopy>
            </Box>

            <SecretDisplay k={key} />
        </Box>
    );
};

export default APIKeysList;
