import { Box, Button, HStack, IconButton, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, VStack } from "@chakra-ui/react";
import { FaAirbnb, FaLock, FaMoon, FaUserNinja } from "react-icons/fa";
import { Outlet } from "react-router-dom";

export default function Root() {
    const { isOpen, onClose, onOpen } = useDisclosure();
    return (
    <Box>
        <HStack 
            justifyContent={"space-between"}
            py={5} px={10}
            borderBottomWidth={1}
        >
            <Box color="red.500">
                <FaAirbnb size={"48"}/>
            </Box>
            <HStack spacing={2}>
                <IconButton
                    variant={"ghost"}
                    aria-label="Toggle dark mode"
                    icon={<FaMoon />}
                />
                <Button onClick={onOpen}>Log in</Button>
                <Button colorScheme={"red"}>Sign up</Button>
            </HStack>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Log In</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack>
                            <InputGroup>
                                <InputLeftElement children={
                                    <Box color="gray.500">
                                        <FaUserNinja />
                                    </Box>
                                }
                                />
                                <Input
                                    variant={"filled"}
                                    placeholder="Username"
                                />
                            </InputGroup>
                            <InputGroup>
                            <InputLeftElement children={
                                    <Box color="gray.500">
                                        <FaLock />
                                    </Box>
                                }
                                />
                                <Input
                                    variant={"filled"}
                                    placeholder="Password"
                                />
                            </InputGroup>
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme={"red"} w="100%">Log in</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </HStack>
        <Outlet />
    </Box>
    );
}