import { Avatar, Box, Button, Container, Grid, GridItem, Heading, HStack, Image, Skeleton, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { IReview, IRoomDetail } from "../types";
import { checkBooking, getRoom, getRoomReviews } from "./api";
import { useEffect, useState } from "react";

export default function RoomDetail() {
    const { roomPk } = useParams();
    const { isLoading, data } = useQuery<IRoomDetail>(
        ["rooms", roomPk],
        getRoom,
    );
    const [dates ,setDates] = useState<Date[]>();
    const {data: checkBookingData, isLoading: isCheckingBooking, refetch } = useQuery(
        ["check", roomPk, dates],
        checkBooking, {
            cacheTime: 0,
            enabled: dates !== undefined,
        }
    );
    const { data: reviewsData } =
    useQuery<IReview[]>(
        ["rooms", roomPk, "reviews"],
        getRoomReviews,
    );
    console.log(checkBookingData, isCheckingBooking)
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
                        {data?.photos && data.photos.length > 4 ? (
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
        <Grid
            gap={20}
            templateColumns={{
                md: "1fr",
                lg: "2fr 1fr",
            }}
            maxW="container.lg"
        >
            <Box>
                <HStack
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
            </Box>
            <Box pt={{
                md: 0,
                lg: 20,
            }}>
                <Calendar
                    onChange={setDates}
                    minDate={new Date()}
                    maxDate={new Date(Date.now() + (60*60*24*7*4*6*1000))}
                    minDetail="month"
                    prev2Label={null}
                    next2Label={null}
                    selectRange
                />
                <Button
                    disabled={!checkBookingData?.ok}
                    w="100%"
                    mt={5}
                    colorScheme={"red"}
                >
                    Make Booking
                </Button>
                {!isCheckingBooking && !checkBookingData?.ok ? (
                    <Text color="red.500">Can't book on those dates</Text>
                ) : null}
            </Box>
        </Grid>

    </Box>;
}