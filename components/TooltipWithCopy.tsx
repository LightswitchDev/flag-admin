import { Tooltip, useToast } from '@chakra-ui/core';
import CopyToClipboard from 'react-copy-to-clipboard';

const TooltipWithCopy: React.FunctionComponent<{ text: string }> = ({ children, text }) => {
    const toast = useToast();

    return (
        <Tooltip shouldWrapChildren={true} placement="right-end" aria-label="Click to copy" label="Click to copy.">
            <CopyToClipboard
                onCopy={() =>
                    toast({
                        title: 'Copied!',
                        duration: 750,
                        position: 'top',
                    })
                }
                text={text}
            >
                {children}
            </CopyToClipboard>
        </Tooltip>
    );
};

export default TooltipWithCopy;
