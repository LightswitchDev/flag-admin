import * as React from 'react';
import { CodeSnippet } from "./CodeSnippets";
import { Box } from '@chakra-ui/core';

const useTheClientSnippet = `
const switch = client.getSwitch("YOUR_SWITCH_KEY");
console.log(switch.enabled);
// OR, if it is a variant:
// switch.variants.forEach(v => console.log(v.value));
`;

const UseTheClientSnippet: React.FunctionComponent = () => (<Box>
  <p>
    The client automatically polls for your feature toggles. You can call the getSwitch function to get your feature toggle.
  </p>
  <CodeSnippet snippet={useTheClientSnippet}></CodeSnippet>
</Box>);

export { UseTheClientSnippet };