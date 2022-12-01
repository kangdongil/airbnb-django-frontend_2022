import { Avatar, Box, Button, HStack, IconButton, LightMode, Menu, MenuButton, MenuItem, MenuList, Stack, useColorMode, useColorModeValue, useDisclosure, useToast } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { FaAirbnb, FaMoon, FaSun } from "react-icons/fa";
import useUser from "../lib/useUser";
import { logOut } from "../routes/api";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";

export default function Header() {
    const { userLoading, isLoggedIn, user } = useUser();
    const { isOpen: isLoginOpen, onClose:onLoginClose,
        onOpen: onLoginOpen } = useDisclosure();
    const { isOpen: isSignUpOpen, onClose:onSignUpClose,
        onOpen: onSignUpOpen } = useDisclosure();
    const { toggleColorMode } = useColorMode();
    const logoColor = useColorModeValue("red.500", "red.300");
    const Icon = useColorModeValue(FaMoon, FaSun);
    const toast = useToast();
    const queryClient = useQueryClient()
    const onLogOut = async() => {
        const toastId = toast({
            title: "Good Bye",
            description: "Sad to see you go :(",
            status: "info",
            position: "bottom-right",
            isClosable: true,
        });
        await logOut();
        queryClient.refetchQueries(["me"]);
        toast.update(toastId, {
            status: "success",
            title:"Done!",
            description: "See you later!",
            isClosable: true,
            });
    }
    return(
        <Stack 
            justify={"space-between"}
            align={"center"}
            py={5} px={40}
            direction={{
                sm: "column",
                md: "row",
            }}
            spacing={{
                sm: 3,
                md: 0,
            }}
            borderBottomWidth={1}
        >
            <Box color={logoColor}>
                <FaAirbnb size={"48"}/>
            </Box>
            <HStack spacing={2}>
                <IconButton
                    onClick={toggleColorMode}
                    variant={"ghost"}
                    aria-label="Toggle dark mode"
                    icon={<Icon />}
                />
                {!userLoading ? (
                    !isLoggedIn ? (
                    <>
                        <Button onClick={onLoginOpen}>Log in</Button>
                        <LightMode>
                            <Button 
                                colorScheme={"red"}
                                onClick={onSignUpOpen}
                            >
                                Sign up
                            </Button>
                        </LightMode>
                    </>
                    ) : (
                        <Menu>
                            <MenuButton>
                                <Avatar
                                    name={user?.name}
                                    src={user?.avatar}
                                    size={"md"}
                                />
                            </MenuButton>
                            <MenuList>
                                <MenuItem
                                    onClick={onLogOut}
                                >
                                    Log Out
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    )
                ) : null }
            </HStack>
            <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
            <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
        </Stack>
    );
}