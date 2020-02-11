import { Box, IconButton } from '@chakra-ui/core';

import TooltipWithCopy from '../TooltipWithCopy';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import * as codeThemes from 'react-syntax-highlighter/dist/cjs/styles/prism';

const CodeSnippet: React.FunctionComponent<{ snippet: string }> = ({ snippet }) => {
    return (
        <Box maxWidth={["100%", "100%", "80%", "70%"]}>
            <SyntaxHighlighter style={codeThemes.vs} language="tsx">
                {snippet}
            </SyntaxHighlighter>
            <TooltipWithCopy text={snippet}>
                <IconButton variant="outline" aria-label="Show Key" size="xs" ml="8px" icon="copy"></IconButton>
            </TooltipWithCopy>
        </Box>
    );
};

export { CodeSnippet };
