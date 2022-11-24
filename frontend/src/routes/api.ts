import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";


const instance = axios.create({
    baseURL: "https://8000-kangdongil-gpreactdjang-ijumdskuh65.ws-us77.gitpod.io/api/v1/"
})

export const getRooms = () => 
    instance.get("rooms/").then((response) => response.data["content"]);

export const getRoom = ({queryKey}: QueryFunctionContext) => {
    const [_, roomPk] = queryKey;
    return instance.get(`rooms/1`).then((response) => response.data);
};

export const getRoomReviews = ({queryKey}: QueryFunctionContext) => {
    const [_, roomPk] = queryKey;
    return instance.get(`rooms/${roomPk}/reviews`)
        .then((response) => response.data["content"]);
};

/*
export async function getRooms() {
    const response = await axios.get(`rooms/`);
    return response.data["content"];
}
*/