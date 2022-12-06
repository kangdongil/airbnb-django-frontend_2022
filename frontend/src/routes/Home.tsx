import { Grid } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Room from "../components/Room";
import RoomSkeleton from "../components/RoomSkeleton";
import { IRoomList } from "../types";
import { getRooms } from "./api";

export default function Home() {

    const { isLoading, data } = useQuery<IRoomList[]>(["rooms"], getRooms);
    return (
        <Grid
            mt={10}
            px={{
                sm: 10,
                lg: 40,
            }}
            columnGap={4}
            rowGap={8}
            templateColumns={{
                sm: "1fr",
                md: "1fr 1fr",
                lg: "repeat(3, 1fr)",
                xl: "repeat(4, 1fr)",
                "2xl": "repeat(5, 1fr)",
            }}
        >
            {isLoading ? (
                <>
                    <RoomSkeleton />
                    <RoomSkeleton />
                    <RoomSkeleton />
                    <RoomSkeleton />
                    <RoomSkeleton />
                    <RoomSkeleton />
                </>
            ) : null}
            {data?.map((room) => (
                <Room
                    key={room.pk}
                    pk={room.pk}
                    isOwner={room.is_owner}
                    imageUrl={room.preview_photo?.file}
                    name={room.name}
                    city={room.city}
                    country={room.country}
                    price={room.price}
                    rating={room.rating}
                />
            ))}
        </Grid>
    );
}