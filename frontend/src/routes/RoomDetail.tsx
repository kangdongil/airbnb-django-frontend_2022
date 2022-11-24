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
            {data?.photos.slice(0, 5).map(
                (photo, index) => (
                <GridItem
                    key={photo.pk}
                    overflow={"hidden"}
                    colSpan={index === 0 ? 2:1}
                    rowSpan={index === 0 ? 2:1}
                >
                    <Image
                        w="100%"
                        h="100%"
                        src={photo.file}
                        objectFit={"cover"}
                    />
                </GridItem>
            ))}
        </Grid>
    </Box>;
}