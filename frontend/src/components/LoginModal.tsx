import { Box, Button, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaLock, FaUserNinja } from "react-icons/fa";
import SocialLogin from "./SocialLogin";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }:
    LoginModalProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const onChange = (event:React.SyntheticEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget;
        switch (name) {
            case "username":
                setUsername(value);
                break;
            case "password":
                setPassword(value);
                break;
        }
    }
    const onSubmit = (event:React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        setUsernameError("");
        if(username.length > 20) {
            setUsernameError(
                "Username should be shorter than 20 character."
            )
        }
        // console.log(username, password);
    }
    return(
        <Modal
        isOpen={isOpen}
        onClose={onClose}
    >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Log In</ModalHeader>
                <ModalCloseButton />
                <ModalBody
                    as="form"
                    onSubmit={onSubmit as any}
                >
                    <VStack>
                        <InputGroup>
                            <InputLeftElement children={
                                <Box color="gray.500">
                                    <FaUserNinja />
                                </Box>
                            }
                            />
                            <Input
                                name="username"
                                value={username}
                                required
                                onChange={onChange}
                                variant={"filled"}
                                placeholder="Username"
                            />
                        </InputGroup>
                        { usernameError ? (
                            <Text
                                w="100%"
                                fontSize="sm"
                                color="red"
                            >
                                {usernameError}
                            </Text>
                        ) : ""}
                        <InputGroup>
                            <InputLeftElement children={
                                <Box color="gray.500">
                                    <FaLock />
                                </Box>
                            }
                            />
                            <Input
                                name="password"
                                type="password"
                                value={password}
                                required
                                onChange={onChange}
                                variant={"filled"}
                                placeholder="Password"
                            />
                        </InputGroup>
                    </VStack>
                    <Button
                        type="submit"
                        mt={4}
                        colorScheme={"red"}
                        w="100%"
                    >
                        Log in
                    </Button>
                    <SocialLogin />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}