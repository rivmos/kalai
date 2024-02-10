export type Artwork = {
    id:number,
    title: string,
    description: string,
    imageUrl: string,
    artist: string,
    width: number,
    height: number,
    sizeUnit: string,
    price: number,
    medium: string,
    deliveredAs:string,
    createdIn:number,
    itemCode:number,
    isSold:false
}

export type Artist = {
    artworks: Artwork[],
    name: string,
    bio: string,
    website: string,
    id: string
}