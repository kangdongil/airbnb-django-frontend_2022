import { Box, Button, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaLock, FaUserNinja } from "react-icons/fa";
import SocialLogin from "./SocialLogin";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface IForm {
    username: string;
    password: string;
}

export default function LoginModal({ isOpen, onClose }:
    LoginModalProps) {
    const { register, watch, handleSubmit, formState: {errors} } = useForm<IForm>();
    // console.log(watch());
    const onSubmit = (data: IForm) => {
        console.log("submitted");
        console.log(data)
    };
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
                    onSubmit={handleSubmit(onSubmit)}
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
                                isInvalid={Boolean(errors.username?.message)}
                                required
                                {...register("username", {
                                    required: "Please write a username.",
                                })}
                                variant={"filled"}
                                placeholder="Username"
                            />
                        </InputGroup>
                        <Text
                            w="100%"
                            fontSize={"sm"}
                            color="red.500"
                        >
                            {errors.username?.message}
                        </Text>
                        <InputGroup>
                            <InputLeftElement children={
                                <Box color="gray.500">
                                    <FaLock />
                                </Box>
                            }
                            />
                            <Input
                                isInvalid={Boolean(errors.username?.message)}
                                type="password"
                                {...register("password", {
                                    required: "Please write a password.",
                                })}
                                required
                                variant={"filled"}
                                placeholder="Password"
                            />
                        </InputGroup>
                        <Text
                            w="100%"
                            fontSize={"sm"}
                            color="red.500"
                        >
                            {errors.password?.message}
                        </Text>
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