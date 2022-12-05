import { Avatar, Box, Container, Grid, GridItem, Heading, HStack, Image, Skeleton, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { IReview, IRoomDetail } from "../types";
import { getRoom, getRoomReviews } from "./api";

export default function RoomDetail() {
    const { roomPk } = useParams();
    const { isLoading, data } = useQuery<IRoomDetail>(
        ["rooms", roomPk],
        getRoom,
    );
    const { isLoading: isReviewLoading, data: reviewsData } =
    useQuery<IReview[]>(
        ["rooms", roomPk, "reviews"],
        getRoomReviews,
    );

    return <Box
        mt={10}
        px={{
            sm: 10,
            lg: 40,
        }}
    >
        <Skeleton h={"43px"} isLoaded={!isLoading}>
            <Heading>{data?.name}</Heading>
        </Skeleton>
        <Grid
            h="60vh"
            mt={8}
            rounded="xl"
            overflow={"hidden"}
            templateRows={"1fr 1fr"}
            templateColumns={"repeat(4, 1fr)"}
            gap={3}
        >
            {[0, 1, 2, 3, 4].map(
                (index) => (
                <GridItem
                    key={index}
                    overflow={"hidden"}
                    colSpan={index === 0 ? 2:1}
                    rowSpan={index === 0 ? 2:1}
                >
                    <Skeleton isLoaded={!isLoading} h="100%" w="100%">
                        {data?.photos && data.photos.length > 0 ? (
                            <Image
                                w="100%"
                                h="100%"
                                src={data?.photos[index].file}
                                objectFit={"cover"}
                            />
                        ): null}
                        
                    </Skeleton>
                </GridItem>
            ))}
        </Grid>
        <HStack
            w={"80%"}
            justify={"space-between"}
            mt={10}
        >
            <VStack align={"flex-start"}>
                <Skeleton
                    isLoaded={!isLoading}
                    height={"30px"}
                >
                    <Heading fontSize={"2xl"}>
                        House hosted by {data?.owner.name}
                    </Heading>
                </Skeleton>
                <Skeleton
                    isLoaded={!isLoading}
                    height={"30px"}
                >
                    <HStack
                        align={"flex-start"}
                        w="100%"
                    >
                        <Text>{data?.toilets} toilet{data?.toilets === 1 ? "" : "s"}</Text>
                        <Text>∙</Text>
                        <Text>{data?.rooms} room{data?.toilets === 1 ? "" : "s"}</Text>
                    </HStack>
                </Skeleton>
            </VStack>
            <Avatar
                name={data?.owner.name}
                size={"xl"}
                src={data?.owner.avatar}
            />
        </HStack>
        <Box mt={10}>
            <Heading mb={5} fontSize={"2xl"}>
                <HStack>
                    <FaStar /> <Text>{data?.rating}</Text>
                    <Text>∙</Text>
                    <Text>
                        {reviewsData?.length} review{reviewsData?. length === 1 ? "" : "s"}
                    </Text>
                </HStack>
            </Heading>
            <Container
                mt={16}
                marginX="none"
                maxW="container.lg"
            >
                <Grid
                    templateColumns={"1fr 1fr"}
                    gap={10}
                >
                    {reviewsData?.map((review, index) => (
                        <VStack align={"flex-start"} key={index}>
                            <HStack>
                                <Avatar
                                    name={review.user.name}
                                    src={review.user.avatar}
                                    size="md"
                                />
                                <VStack
                                    align={"flex-start"}
                                    spacing={0}
                                >
                                    <Heading fontSize={"md"}>
                                        {review.user.name}
                                    </Heading>
                                    <Text>{review.created_at}</Text>
                                </VStack>
                            </HStack>
                            <Text>{review.payload}</Text>
                        </VStack>
                    ))}
                </Grid>
            </Container>
        </Box>
    </Box>;
}