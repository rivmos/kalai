export type ArtworkState = {
    id?:string,
    imgList?: {id:string, name:string, img:string}[],
    artist?: string,
    itemCode?:number,
    title?: string,
    description?: string,
    category?: number,
    width?: number,
    height?: number,
    sizeUnit?: string,
    price?: number,
    medium?: string,
    deliveredAs?:string,
    createdIn?:number,
    isSold?:boolean
}

export type CategoryState = {
    id:number,
    name:string
}

export type ArtistState = {
    id?: string
    name?: string,
    website?: string,
    bio?: string,
    artworks?: ArtworkState[],
}



export type Artists = ArtistState[]
export type Artworks = ArtworkState[]
export type Categories = CategoryState[]



export type GetArtworkResponse = {
    data: Artworks
    total: number
}

export type GetArtistResponse = {
    data: Artists
    total: number
}

export type GetCategoriesResponse = {
    data: Categories
    total: number
}