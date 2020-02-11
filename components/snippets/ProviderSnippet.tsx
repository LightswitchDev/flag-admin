import * as React from 'react';
import { CodeSnippet } from "./CodeSnippets";

const providerSnippet = `
const App = () => (
    <LightswitchProvider lightswitchClient={client}>
        <ExampleComponent></ExampleComponent>
    </LightswitchProvider>
);
`;

const ProviderSnippet: React.FunctionComponent = () => <CodeSnippet snippet={providerSnippet}></CodeSnippet>;

export { ProviderSnippet };