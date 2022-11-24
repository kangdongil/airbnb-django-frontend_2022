import { Avatar, Box, Grid, GridItem, Heading, HStack, Image, Skeleton, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { IRoomDetail } from "../types";
import { getRoom } from "./api";

export default function RoomDetail() {
    const { roomPk } = useParams();
    const { isLoading, data } = useQuery<IRoomDetail>(
        ["rooms", roomPk],
        getRoom,
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
                        <Image
                            w="100%"
                            h="100%"
                            src={data?.photos[index].file}
                            objectFit={"cover"}
                        />
                    </Skeleton>
                </GridItem>
            ))}
        </Grid>
        <HStack
            w={"40%"}
            justify={"space-between"}
            mt={10}
        >
            <VStack>
                <Heading fontSize={"2xl"}>
                    House hosted by {data?.owner.name}
                </Heading>
                <HStack
                    justify={"flex-start"}
                    w="100%"
                >
                    <Text>{data?.toilets} toilet{data?.toilets === 1 ? "" : "s"}</Text>
                    <Text>∙</Text>
                    <Text>{data?.rooms} room{data?.toilets === 1 ? "" : "s"}</Text>
                </HStack>
            </VStack>
            <Avatar
                name={data?.owner.name}
                size={"xl"}
                src={data?.owner.avatar}
            />
        </HStack>
    </Box>;
}