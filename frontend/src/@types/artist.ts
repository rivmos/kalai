export type Artwork = {
    id?:number,
    imageUrls?: string[],
    artist?: string,
    itemCode?:number,
    title: string,
    description: string,
    category: number,
    width: number,
    height: number,
    sizeUnit: string,
    price: number,
    medium: string,
    deliveredAs:string,
    createdIn:number,
    isSold:boolean
}

export type Artist = {
    artworks: Artwork[],
    name: string,
    bio: string,
    website: string,
    id: string
}

export type Category = {
    id:number,
    name:string
}