import { Box, IconButton, Text } from '@chakra-ui/core';
import * as React from 'react';
import { useState } from 'react';

import useSWR from 'swr';
import { Organization, ORG_URL_KEY } from '../../data/organizations';
import TooltipWithCopy from '../TooltipWithCopy';
import { KeysSnippet } from './KeysSnippet';

type Props = {
    organizationId: string;
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
            <KeysSnippet clientId={id} apiKey={key}></KeysSnippet>
        </Box>
    );
};

export default APIKeysList;
