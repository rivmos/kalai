export type ArtworkState = {
    id?:string,
    imgList?: string[],
    artist?: string,
    itemCode?:number,
    title?: string,
    description?: string,
    category?: string,
    width?: number,
    height?: number,
    sizeUnit?: string,
    price?: number,
    medium?: string,
    deliveredAs?:string,
    createdIn?:string,
    isSold?:boolean
}

export type CategoryState = {
    id?:string,
    name?:string
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