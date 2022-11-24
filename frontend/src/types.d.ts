export interface IRoomPhoto {
    pk : string;
    file: string;
    description :string;
}

export interface IRoomList {
    pk: number;
    name: string;
    country: string;
    city: string;
    price: number;
    rating: number;
    is_owner: boolean;
    preview_photo: IRoomPhoto;
}

export interface IRoomOwner {
    name: string;
    avatar: string;
    username: string;
}

export interface IAmenity {
    name: string;
    description: string;
}

export interface IRoomDetail extends IRoomList {
    description: string;
    address: string;
    rooms: number;
    toilets: number;
    kind: string;
    owner: IRoomOwner;
    amenities: IAmenity[];
    category: {
        name: string;
        kind: string;
    };
    is_liked: boolean;
    photos: IRoomPhoto[];
}

export interface IReview {
    payload: string;
    rating: number;
    user: IRoomOwner;
    created_at: string;
}

export interface IUser {
    last_login: string;
    username: string;
    email: string;
    date_joined: string;
    avatar: string;
    name: string;
    is_host: boolean;
    gender: string;
    language: string;
    currency: string;
}