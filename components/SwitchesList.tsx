import {
    Accordion,
    AccordionHeader,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Grid,
    IconButton,
    Switch,
    useToast,
    Text,
} from '@chakra-ui/core';
import * as React from 'react';
import { createUpdateSwitch, SwitchFromOrg } from '../data/switches';
import { CodeSnippet } from './CodeSnippets';
import { useState } from 'react';
import LightSwitch from './Switch';

type Props = {
    lightswitches: SwitchFromOrg[];
    onOpen: () => void;
    organizationId: string;
    setCurrentLightswitch: (lightswitch: SwitchFromOrg) => void;
};

const getSnippet = (lightswitch: SwitchFromOrg) => {
    return `
    import { useSwitch } from '@lightswitch/client';

    const ExampleComponent = () => {
    const ${lightswitch.key} = useSwitch('${lightswitch.key}', false);
    return (
        <div>
            {${lightswitch.key} ? 
              <div>Your feature is enabled</div> : 
              <div>Your feature is disabled</div>
            }
        </div>
    );
};
    `;
};

const SwitchesList: React.FunctionComponent<Props> = ({
    lightswitches,
    organizationId,
    onOpen,
    setCurrentLightswitch,
}) => {
    const switchToggledToast = useToast();
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
