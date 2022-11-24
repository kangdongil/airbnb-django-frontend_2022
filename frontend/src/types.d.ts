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