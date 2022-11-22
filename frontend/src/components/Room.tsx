import { Box, Button, Grid, HStack, Image, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { FaRegHeart, FaStar } from "react-icons/fa";

interface IRoomProps {
    imageUrl: string;
    name: string;
    city: string;
    country: string;
    price: number;
    rating: number;
}

export default function Room({ 
    name, city, country, price, rating, imageUrl
}: IRoomProps) {
    const gray = useColorModeValue("gray.600", "gray.300");
    return (
        <VStack align={"flex-start"}>
            <Box position="relative" overflow={"hidden"} mb={2} rounded="2xl">
                <Image
                    minH="280"
                    src={imageUrl}
                />
                <Button variant={"unstyled"} position="absolute" top={2} right={0} color="white">
                    <FaRegHeart size="20px" />
                </Button>
            </Box>
            <Box>
                <Grid templateColumns={"5fr 1fr"}>
                    <Text as="b" noOfLines={1} fontSize="md">
                        {name}
                    </Text>
                    <HStack _hover={{ color: "red.500", }} spacing={1}>
                        <FaStar size={15} />
                        <Text>{rating}</Text>
                    </HStack>
                </Grid>
                <Text fontSize={"sm"} color={gray}>
                    {city}, {country}
                </Text>
            </Box>
            <Text color={gray}>
                <Text as="b">${price}</Text> / night
            </Text>
        </VStack>
    );
}