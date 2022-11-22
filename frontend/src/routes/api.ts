const BASE_URL = "https://8000-kangdongil-gpreactdjang-ijumdskuh65.ws-us77.gitpod.io/api/v1"

export async function getRooms() {
    const response = await fetch(`${BASE_URL}/rooms/`);
    const json = await response.json();
    return json["content"];
}