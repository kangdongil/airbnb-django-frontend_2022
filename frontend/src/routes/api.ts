import axios from "axios";


const Instance = axios.create({
    baseURL: "https://8000-kangdongil-gpreactdjang-ijumdskuh65.ws-us77.gitpod.io/api/v1/"
})

export const getRooms = () => 
    Instance.get("rooms/").then((response) => response.data["content"]);

/*
export async function getRooms() {
    const response = await axios.get(`rooms/`);
    return response.data["content"];
}
*/