import { Alert, AlertIcon } from '@chakra-ui/react';
import React from 'react'

const ErrorComponent = () => {
    return (
        <Alert
            status="error"
            position={"fixed"}
            center={"4"}
            left={"50%"}
            right={"50%"}
            bottom={"50%"}
            top={"50%"}
            transform={"translateX(-50%)"}
            w={"container.sm"}
        >
            <AlertIcon />
            Page Not Found!
        </Alert>
    );
}

export default ErrorComponent