import { Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { FaComment, FaGithub } from "react-icons/fa";

export default function SocialLogin() {
    const githubParams = {
        client_id: "1bd2d388cbbcf713de7b",
        scope: "read:user,user:email",
    }
    const kakaoParams = {
        client_id: "d10eb532115da07d88f76bde78b9c993",
        redirect_uri: "https://3000-kangdongil-gpreactdjang-ijumdskuh65.ws-us77.gitpod.io/social/kakao",
        response_type: "code",
    }
    const githubURLParams = new URLSearchParams(githubParams).toString();
    const kakaoURLParams = new URLSearchParams(kakaoParams).toString();
    return (
        <Box mb={4}>
            <HStack my={8}>
                <Divider />
                <Text 
                    textTransform={"uppercase"}
                    color="gray.500"
                    fontSize="xs"
                    as="b">
                        Or
                </Text>
                <Divider />
            </HStack>
            <VStack>
                <Button
                    w="100%"
                    leftIcon={<FaGithub />}
                    as="a"
                    href={`https://github.com/login/oauth/authorize?${githubURLParams}`}
                >
                    Continue with Github
                </Button>
                <Button
                    w="100%"
                    leftIcon={<FaComment />}
                    colorScheme={"yellow"}
                    as="a"
                    href={`https://kauth.kakao.com/oauth/authorize?${kakaoURLParams}`}
                >
                    Continue with Kakao
                </Button>
            </VStack>
        </Box>
    );
}