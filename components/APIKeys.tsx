import * as React from 'react';
import { Organization, GET_ORGANIZATION, Key } from '../gql/organizations';
import { Box, IconButton, Text, Tooltip, useToast } from '@chakra-ui/core';
import { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

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

const SecretDisplay: React.FunctionComponent<{ k: Key }> = ({ k }) => {
    const [isVisible, displayKey] = useState(false);
    return (
        <Box marginBottom="4px" rounded="lg" borderColor="gray.400" justifyContent="left" d="flex" maxW="small">
            <Text fontWeight={600} w="120px">
                Client Secret
            </Text>

            <TooltipWithCopy text={k.id}>
                <Text pl="5px" pr="5px" as="button" textAlign="left" fontSize="s">
                    {isVisible ? k.id : '*'.repeat(15)}
                </Text>
            </TooltipWithCopy>
            <Box>
                <TooltipWithCopy text={k.id}>
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
    // if (loading) return <p>Loading</p>;
    // if (error) return <p>ERROR: {error.message}</p>;
    // if (!data) return <p>Not found</p>;
    const {
        organization: { keys, id },
    } = { organization: { keys: [], id: '' } };
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
            {keys.map(k => (
                <SecretDisplay k={k} />
            ))}
        </Box>
    );
};

export default APIKeysList;
