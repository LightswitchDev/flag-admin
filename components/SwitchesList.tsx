import { Accordion, Box } from '@chakra-ui/core';
import * as React from 'react';
import { SwitchFromOrg } from '../data/switches';
import LightSwitch from './Switch';

type Props = {
    lightswitches: SwitchFromOrg[];
    onOpen: () => void;
    organizationId: string;
    setCurrentLightswitch: (lightswitch: SwitchFromOrg) => void;
};

const SwitchesList: React.FunctionComponent<Props> = ({
    lightswitches,
    organizationId,
    onOpen,
    setCurrentLightswitch,
}) => {
    return (
        <Box shadow="md" borderWidth="1px" flex="1" rounded="md">
            <Accordion allowToggle defaultIndex={-1}>
                {lightswitches.map((lightswitch, i) => (
                    <LightSwitch
                        lightswitch={lightswitch}
                        organizationId={organizationId}
                        onOpen={onOpen}
                        setCurrentLightswitch={setCurrentLightswitch}
                    ></LightSwitch>
                ))}
            </Accordion>
        </Box>
    );
};

export default SwitchesList;
