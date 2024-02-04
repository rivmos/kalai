import ApiService from "./ApiService";

export async function apiGetArtists<T>() {
    return ApiService.fetchData<T>({
        url: '/artists',
        method: 'get',
    })
}

export async function apiGetArtistProfile<T>(id:string) {
    return ApiService.fetchData<T>({
        url: `/artists/${id}`,
        method: 'get',
    })
}