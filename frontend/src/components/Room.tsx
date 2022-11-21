import { Box, Button, Grid, HStack, Image, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { FaRegHeart, FaStar } from "react-icons/fa";

export default function Room() {
    const ROOM_PHOTO_URL = "https://a0.muscache.com/im/pictures/miso/Hosting-716674445310682476/original/3dbb1597-6ac6-4877-bb08-7188742b8203.jpeg"
    const ROOM_ADDRESS = "Daegwalnyeong-myeon, Pyeongchang-gun, Gangwon Province, South Korea"
    const gray = useColorModeValue("gray.600", "gray.300");
    return (
        <VStack align={"flex-start"}>
            <Box position="relative" overflow={"hidden"} mb={2} rounded="2xl">
                <Image
                    minH="280"
                    src={ROOM_PHOTO_URL}
                />
                <Button variant={"unstyled"} position="absolute" top={2} right={0} color="white">
                    <FaRegHeart size="20px" />
                </Button>
            </Box>
            <Box>
                <Grid templateColumns={"5fr 1fr"}>
                    <Text as="b" noOfLines={1} fontSize="md">
                        {ROOM_ADDRESS}
                    </Text>
                    <HStack _hover={{ color: "red.500", }} spacing={1}>
                        <FaStar size={15} />
                        <Text>5.0</Text>
                    </HStack>
                </Grid>
                <Text fontSize={"sm"} color={gray}>
                    Seoul, S. Korea
                </Text>
            </Box>
            <Text color={gray}>
                <Text as="b">$72</Text>/ night
            </Text>
        </VStack>
    );
}