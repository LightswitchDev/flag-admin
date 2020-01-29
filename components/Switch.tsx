import {
    AccordionHeader,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    IconButton,
    Switch,
    Text,
    useToast,
    Grid,
} from '@chakra-ui/core';
import * as React from 'react';
import { createUpdateSwitch, SwitchFromOrg } from '../data/switches';
import { CodeSnippet } from './CodeSnippets';

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
    const [accordianDisabled, disableAccordian] = React.useState(false);

    return (
        <AccordionItem isDisabled={accordianDisabled}>
            <AccordionHeader _disabled={{ opacity: 1, cursor: 'allowed' }}>
                <Grid width="100%" templateColumns=".2fr .4fr 1fr 1fr .4fr" alignItems="center" justifyItems="">
                    <AccordionIcon />
                    <Text justifySelf="start" d="grid" px="5" color="gray.600" fontSize="md">
                        {lightswitch.name}
                    </Text>
                    <Text justifySelf="start" d="grid" color="gray.300" fontSize="sm">
                        {lightswitch.key}
                    </Text>

                    <Switch
                        onMouseEnter={() => {
                            disableAccordian(true);
                        }}
                        onMouseOver={() => {
                            disableAccordian(true);
                        }}
                        onMouseLeave={e => {
                            disableAccordian(false);
                        }}
                        onChange={async e => {
                            try {
                                const enabled = (e.target as HTMLInputElement).checked;
                                const result = await createUpdateSwitch(
                                    organizationId,
                                    { ...lightswitch, enabled },
                                    { shouldMutate: true, shouldRevalidate: false },
                                );

                                switchToggledToast({
                                    title: enabled ? `${lightswitch.name} enabled` : `${lightswitch.name} disabled`,
                                    status: enabled ? 'success' : 'warning',
                                    duration: 2 * 1000,
                                    isClosable: true,
                                });
                                console.log(e);
                                e.preventDefault();
                                e.stopPropagation();
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
                        justifySelf="right"
                        size="md"
                        px="5"
                    ></Switch>
                    <IconButton
                        justifySelf="right"
                        variant="ghost"
                        icon="edit"
                        aria-label="Edit Switch"
                        size="sm"
                        mr="8px"
                        onMouseEnter={() => {
                            disableAccordian(true);
                        }}
                        onMouseOver={() => {
                            disableAccordian(true);
                        }}
                        onMouseLeave={e => {
                            disableAccordian(false);
                        }}
                        onClick={() => {
                            setCurrentLightswitch(lightswitch);
                            onOpen();
                        }}
                    ></IconButton>
                </Grid>
            </AccordionHeader>
            <AccordionPanel>
                <CodeSnippet snippet={getSnippet(lightswitch)}></CodeSnippet>
            </AccordionPanel>
        </AccordionItem>
    );
};

export default LightSwitch;
