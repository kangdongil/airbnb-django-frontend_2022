import Cookie from "js-cookie";
import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import { formatDate } from "../lib/utils";

const GP_BACKEND_NAME = process.env.REACT_APP_GITPOD_BACKEND_NAME
const GP_SUBDOMAIN = process.env.REACT_APP_GITPOD_SUBDOMAIN

const instance = axios.create({
    baseURL: process.env.NODE_ENV === "development"
        ? `https://${GP_BACKEND_NAME}.${GP_SUBDOMAIN}.gitpod.io/api/v1/`
        : "https://airbnbclone-uk8m.onrender.com/api/v1/",
    withCredentials: true,
})

export const getRooms = () => 
    instance.get("rooms/").then((response) => response.data["content"]);

export const getRoom = ({queryKey}: QueryFunctionContext) => {
    const [_, roomPk] = queryKey;
    return instance.get(`rooms/${roomPk}`).then((response) => response.data);
};

export const getRoomReviews = ({queryKey}: QueryFunctionContext) => {
    const [_, roomPk] = queryKey;
    return instance.get(`rooms/${roomPk}/reviews`)
        .then((response) => response.data["content"]);
};

export const getMe = () =>
    instance.get("users/me")
    .then( response => response.data);

export const logOut = () =>
    instance.post("users/log-out", null, {
        headers: {
            "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
    })
    .then(response => response.data);

export const githubLogin = (code:string) =>
    instance.post(
        "/users/github",
        { code },
        {
            headers: {
                "X-CSRFToken": Cookie.get("csrftoken") || "",
            },
        },
    )
    .then((response) => response.status);

export const kakaoLogin = (code:string) =>
instance.post(
    "/users/kakao",
    { code },
    {
        headers: {
            "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
    },
)
.then((response) => response.status);

export interface IUsernameLoginVariables {
    username: string;
    password: string;
}

export interface IUsernameLoginSuccess {
    ok: string;
}

export interface IUsernameLoginError {
    error: string;
}

export const usernameLogin = ({ username, password }: IUsernameLoginVariables) =>
instance.post(
    "/users/log-in",
    { username, password },
    {
        headers: {
            "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
    },
)
.then((response) => response.data);

export const getAmenities = () => 
    instance.get("rooms/amenities").then((response) => response.data["content"]);

export const getRoomCategories = () => 
    instance.get("categories/rooms").then((response) => response.data["content"]);

export const getExperienceCategories = () => 
    instance.get("categories/experiences").then((response) => response.data["content"]);

export interface IUploadRoomVariables {
        name: string;
        description: string;
        country: string;
        city: string;
        address: string;
        price: number;
        rooms: number;
        toilets: number;
        kind: string;
        owner: string;
        pet_friendly: boolean;
        amenities: number[];
        category: number;
    }

export const uploadRoom = (variables: IUploadRoomVariables) =>
    instance.post(
        "rooms/",
        variables,
        {
            headers: {
                "X-CSRFToken": Cookie.get("csrftoken") || "",
            },
        }
    )
    .then((response) => response.data);

export const getUploadURL = () =>
        instance.post(
            "medias/photos/get-url",
            null,
            {
                headers: {
                    "X-CSRFToken": Cookie.get("csrftoken") || "",
                },
            }
        )
        .then((response) => response.data);

export interface IUploadImageVariables {
    file: FileList;
    uploadURL: string;
}

export const uploadImage = ({file, uploadURL}: IUploadImageVariables) => {
    const form = new FormData();
    form.append("file", file[0]);
    return axios.post(uploadURL, form, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    }).then(response => response.data);
}

export interface ICreatePhotoVariables {
    description: string;
    file: string;
    roomPk: string;
}

export const createPhoto = ({ description, file, roomPk }: ICreatePhotoVariables) => 
    instance.post(
        `rooms/${roomPk}/photos`,
        { description, file },
        {
            headers: {
                "X-CSRFToken": Cookie.get("csrftoken") || "",
            },
        }
    )
    .then((response) => response.data);

type CheckBookingQueryKey = [string, string?, Date[]?];

export const checkBooking = ({ queryKey }: QueryFunctionContext<CheckBookingQueryKey>) => {
    const [_, roomPk, dates] = queryKey;
    if (dates) {
        const [firstDate, secondDate] = dates;
        const checkIn = formatDate(firstDate);
        const checkOut = formatDate(secondDate);
        return instance.get(
            `rooms/${roomPk}/bookings/check?check_in=${checkIn}&check_out=${checkOut}`
        ).then(response => response.data);
    }
}