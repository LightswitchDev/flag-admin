import * as React from 'react';
import { CodeSnippet } from "./CodeSnippets";

const getClientSnippet = (clientId: string, apiKey: string) => `
import { LightswitchClient, LightswitchProvider } from '@lightswitch/client';

const client = new LightswitchClient({
    clientId: '${clientId}',
    apiKey: '${apiKey}',
    frequencyInSeconds: 30,
});`;

const KeysSnippet: React.FunctionComponent<{ clientId: string; apiKey: string }> = ({ clientId, apiKey }) => (
  <CodeSnippet snippet={getClientSnippet(clientId, apiKey)}></CodeSnippet>
);

export { KeysSnippet };