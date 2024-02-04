import ApiService from "./ApiService";

export async function apiGetArtists<T>() {
    return ApiService.fetchData<T>({
        url: '/artists',
        method: 'get',
    })
}
