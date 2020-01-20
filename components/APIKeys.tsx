import * as React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Organization, GET_ORGANIZATION, Key } from '../gql/organizations';
import { Box, IconButton, Text } from '@chakra-ui/core';
import { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

type Props = {
    organizationId: string;
};

const SecretDisplay: React.FunctionComponent<{ k: Key }> = ({ k }) => {
    const [isVisible, displayKey] = useState(false);
    return (
        <Box
            marginBottom="4px"
            rounded="lg"
            borderColor="red.400 !important"
            justifyContent="space-between"
            d="flex"
            overflow="hidden"
            maxW="xs"
        >
            <Text fontSize="xs">
                {isVisible
                    ? k.id
                    : k.id
                          .split('')
                          .map(() => '*')
                          .join('')}{' '}
            </Text>
            <IconButton
                variant="outline"
                alignItems="right"
                aria-label="Show Key"
                size="xs"
                mr="2px"
                d="flex"
                icon={isVisible ? 'view-off' : 'view'}
                onClick={() => displayKey(!isVisible)}
            ></IconButton>
            <CopyToClipboard text={k.id}>
                <IconButton
                    alignItems="right"
                    d="flex"
                    variant="solid"
                    aria-label="Copy Key"
                    size="xs"
                    ml="2px"
                    icon="copy"
                    onClick={() => null}
                ></IconButton>
            </CopyToClipboard>
        </Box>
    );
};

const APIKeysList: React.FunctionComponent<Props> = ({ organizationId }) => {
    const { data, loading, error } = useQuery<{ organization: Organization }>(GET_ORGANIZATION, {
        variables: { id: organizationId },
    });
    if (loading) return <p>Loading</p>;
    if (error) return <p>ERROR: {error.message}</p>;
    if (!data) return <p>Not found</p>;
    const {
        organization: { name, keys, id },
    } = data;
    return (
        <div>
            <div>{name}</div>
            <div>{id}</div>
            {keys.map(k => (
                <SecretDisplay k={k} />
            ))}
        </div>
    );
};

export default APIKeysList;
