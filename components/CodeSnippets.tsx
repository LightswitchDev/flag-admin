import { Box, IconButton, Code } from '@chakra-ui/core';

import TooltipWithCopy from './TooltipWithCopy';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import * as codeThemes from 'react-syntax-highlighter/dist/cjs/styles/prism';

const getClientSnippet = (clientId: string, apiKey: string) => `
import { LightswitchClient, LightswitchProvider } from '@lightswitch/client';

const client = new LightswitchClient({
    clientId: '${clientId}',
    apiKey: '${apiKey}',
    frequencyInSeconds: 30,
});`;

const CodeSnippet: React.FunctionComponent<{ snippet: string }> = ({ snippet }) => {
    return (
        <Box>
            <TooltipWithCopy text={snippet}>
                <SyntaxHighlighter style={codeThemes.vs} language="tsx">
                    {snippet}
                </SyntaxHighlighter>
            </TooltipWithCopy>
            <TooltipWithCopy text={snippet}>
                <IconButton variant="outline" aria-label="Show Key" size="xs" ml="8px" icon="copy"></IconButton>
            </TooltipWithCopy>
        </Box>
    );
};

const providerSnippet = `
const App = () => (
    <LightswitchProvider lightswitchClient={client}>
        <ExampleComponent></ExampleComponent>
    </LightswitchProvider>
);
`;

const KeysSnippet: React.FunctionComponent<{ clientId: string; apiKey: string }> = ({ clientId, apiKey }) => (
    <CodeSnippet snippet={getClientSnippet(clientId, apiKey)}></CodeSnippet>
);

const ProviderSnippet: React.FunctionComponent = () => <CodeSnippet snippet={providerSnippet}></CodeSnippet>;

export { KeysSnippet, CodeSnippet, ProviderSnippet };
