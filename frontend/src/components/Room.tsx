import { Box, Button, Grid, HStack, Image, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import React from "react";
import { FaCamera, FaRegHeart, FaStar } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

interface IRoomProps {
    pk: number;
    imageUrl: string;
    name: string;
    city: string;
    country: string;
    price: number;
    rating: number;
    isOwner: boolean;
}

export default function Room({ 
    pk, name, city, country, price, rating, imageUrl, isOwner
}: IRoomProps) {
    console.log(pk, name)
    const gray = useColorModeValue("gray.600", "gray.300");
    const navigate = useNavigate();
    const onCameraClick = (event:React.SyntheticEvent<HTMLButtonElement>) => {
        event.preventDefault();
        navigate(`/rooms/${pk}/photos`)
    }
    return (
        <Link to={`/rooms/${pk}`}>
            <VStack align={"flex-start"}>
                <Box
                    w="100%"
                    position="relative"
                    overflow={"hidden"}
                    mb={3}
                    rounded="2xl"
                >
                    {imageUrl ? (
                        <Image
                            objectFit={"cover"}
                            minH="280"
                            src={imageUrl}
                        />
                    ): (
                        <Box
                            minH="280"
                            h="100%"
                            w="100%"
                            p={10}
                            bg="green.400"
                        />
                    )}
                    
                    <Button
                        variant={"unstyled"}
                        position="absolute"
                        top={2}
                        right={0}
                        color="white"
                        onClick={onCameraClick}
                    >
                        {!isOwner ? (
                            <FaRegHeart size="20px" />
                        ): (
                            <FaCamera size="20px"/>
                        )}
                        
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
        </Link>
    );
}