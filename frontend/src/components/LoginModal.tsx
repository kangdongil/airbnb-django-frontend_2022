import { Box, Button, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useToast, VStack } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FaLock, FaUserNinja } from "react-icons/fa";
import { IUsernameLoginError, IUsernameLoginSuccess, IUsernameLoginVariables, usernameLogin } from "../routes/api";
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
    const { register, handleSubmit, formState: {errors} } = useForm<IForm>();
    const toast = useToast();
    const queryClient = useQueryClient();
    const mutation = useMutation<
        IUsernameLoginSuccess,
        IUsernameLoginError,
        IUsernameLoginVariables
    >(usernameLogin, {
        onMutate: () => {
            console.log("mutation starting");
        },
        onSuccess: (data) => {
            // redirect to Homepage and Welcome
            console.log("mutation is successful");
            toast({
                title: "welcome back!",
                status: "success",
            })
            onClose();
            queryClient.refetchQueries(["me"]);
        },
        onError: (error) => {
            // Error Msg to Login Modal
            console.log("mutation has an error");
        },
    });
    const onSubmit = ({username, password}: IForm) => {
        mutation.mutate({ username, password });
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
                        isLoading={mutation.isLoading}
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