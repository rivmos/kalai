import ApiService from "./ApiService";

export async function apiGetArtists<T>() {
    return ApiService.fetchData<T>({
        url: '/artists',
        method: 'get',
    })
}

export async function apiGetCategories<T>() {
    return ApiService.fetchData<T>({
        url: '/categories',
        method: 'get',
    })
}

export async function apiGetArtistProfile<T>(id:string) {
    return ApiService.fetchData<T>({
        url: `/artists/${id}`,
        method: 'get',
    })
}

export async function apiGetArtworkDetail<T>(id:string) {
    return ApiService.fetchData<T>({
        url: `/artworks/${id}`,
        method: 'get',
    })
}

export async function apiAddArtist<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/artists/save',
        method: 'post',
        data,
    })
}

export async function apiAddCategory<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/categories/save',
        method: 'post',
        data,
    })
}

export async function apiAddArtwork<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/artworks/new',
        method: 'post',
        data,
        headers:{
            "Content-Type":'multipart/form-data'
        }
    })
}
