export type Artwork = {
    title: string ,
    description: string,
    imageUrl: string,
    id: string
}

export type Artist = {
    artworks: Artwork[],
    name: string,
    bio: string,
    website: string,
    id: string
}