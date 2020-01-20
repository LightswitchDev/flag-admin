import { useMutation } from '@apollo/react-hooks';
import { Box, Switch, Text, useToast } from '@chakra-ui/core';
import * as React from 'react';
import { SwitchFromOrg, TOGGLE_SWITCH } from '../gql/switches';

type Props = {
    lightswitch: SwitchFromOrg;
};

const LightSwitch: React.FunctionComponent<Props> = ({ lightswitch }) => {
    const [toggleSwitch] = useMutation<SwitchFromOrg>(TOGGLE_SWITCH);
    const switchToggledToast = useToast();
    return (
        <Box
            justifyContent="space-between"
            marginBottom="4px"
            rounded="lg"
            paddingTop="12px"
            d="flex"
            minH="50px"
            id={lightswitch.name}
            alignItems="baseline"
        >
            <Text px="5" color="gray.600" fontSize="md">
                {lightswitch.name}
            </Text>
            <Text px="5" color="gray.200" fontSize="sm"></Text>

            <Switch
                onChange={async e => {
                    try {
                        const enabled = (e.target as HTMLInputElement).checked;
                        const result = await toggleSwitch({
                            variables: {
                                id: lightswitch.id,
                                enabled,
                            },
                        });

                        console.log(result);
                        switchToggledToast({
                            title: enabled ? `${lightswitch.name} enabled` : `${lightswitch.name} disabled`,
                            status: enabled ? 'success' : 'warning',
                            duration: 2 * 1000,
                            isClosable: true,
                        });
                    } catch (e) {
                        switchToggledToast({
                            title: `Failed to toggle ${lightswitch.name}`,
                            status: 'error',
                            duration: 2 * 1000,
                            isClosable: true,
                        });
                    }
                }}
                defaultIsChecked={lightswitch.enabled}
                color="gray"
                d="flex"
                alignItems="right"
                size="md"
                px="5"
            ></Switch>
        </Box>
    );
};

export default LightSwitch;
