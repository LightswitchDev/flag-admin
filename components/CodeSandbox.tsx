import React from 'react';
import ContentLoader from 'react-content-loader';
import { Box } from '@chakra-ui/core';

type SandboxProps = {
    maxWidth: string;
    height: string;
};

const CodeSandbox: React.FC<SandboxProps> = props => {
    const [showSpinner, setSpinner] = React.useState(true);

    return (
        <Box {...props} margin="auto">
            {showSpinner && (
                <ContentLoader height="100%" width="100%" speed={2}>
                    <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
                </ContentLoader>
            )}
            <iframe
                src="https://codesandbox.io/embed/bitter-water-hjb4s?fontsize=14&hidenavigation=1&theme=dark"
                onLoad={() => {
                    setSpinner(false);
                }}
                style={{
                    width: '100%',
                    height: '100%',
                    border: '0px',
                    margin: 'auto',
                    visibility: showSpinner ? 'hidden' : 'visible',
                    borderRadius: '4px',
                    overflow: 'hidden',
                }}
                sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
            ></iframe>
        </Box>
    );
};

export default CodeSandbox;
