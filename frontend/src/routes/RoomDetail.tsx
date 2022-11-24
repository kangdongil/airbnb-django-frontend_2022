import { Box, Grid, GridItem, Heading, Image, Skeleton } from "@chakra-ui/react";
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
    </Box>;
}