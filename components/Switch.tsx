import { Box, Switch, Text, useToast, IconButton } from '@chakra-ui/core';
import * as React from 'react';
import { SwitchFromOrg, createUpdateSwitch } from '../data/switches';

type Props = {
    lightswitch: SwitchFromOrg;
    organizationId: string;
    onOpen: () => void;
    setCurrentLightswitch: (lightswitch: SwitchFromOrg) => void;
};

const LightSwitch: React.FunctionComponent<Props> = ({
    lightswitch,
    organizationId,
    onOpen,
    setCurrentLightswitch,
}) => {
    const switchToggledToast = useToast();
    console.log(lightswitch.enabled);
    return (
        <Box
            gridColumnGap="15px"
            marginBottom="4px"
            rounded="lg"
            paddingTop="12px"
            alignItems="center"
            justifyItems="end"
            d="grid"
            gridTemplateColumns=".5fr 1.5fr .4fr .3fr"
            minH="50px"
            id={lightswitch.name}
        >
            <Text px="5" justifySelf="start" color="gray.600" fontSize="md">
                {lightswitch.name}
            </Text>
            <Text justifySelf="start" color="gray.300" fontSize="sm">
                {lightswitch.key}
            </Text>

            <Switch
                onChange={async e => {
                    try {
                        const enabled = (e.target as HTMLInputElement).checked;
                        const result = await createUpdateSwitch(
                            organizationId,
                            { ...lightswitch, enabled },
                            { shouldMutate: true, shouldRevalidate: false },
                        );

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
                isChecked={lightswitch.enabled}
                color="gray"
                d="grid"
                size="md"
                justifySelf="end"
                px="5"
            ></Switch>
            <IconButton
                variant="ghost"
                icon="edit"
                d="grid"
                justifySelf="end"
                aria-label="Edit Switch"
                size="sm"
                mr="8px"
                onClick={() => {
                    setCurrentLightswitch(lightswitch);
                    onOpen();
                }}
            ></IconButton>
        </Box>
    );
};

export default LightSwitch;
